#!/usr/bin/env python3
"""
RO-Stories Romanian Literature Processor

Downloads and processes Romanian literature excerpts from HuggingFace.
Generates story entries to add to the existing stories.js file.

Source: huggingface.co/datasets/readerbench/ro-stories
License: Apache 2.0
"""

import json
import os
import re
import sys
import urllib.request
from datetime import datetime

# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_DIR, "src", "data")
TEMP_DIR = os.path.join(SCRIPT_DIR, "temp")

# HuggingFace API endpoint for the dataset
HF_API_URL = "https://datasets-server.huggingface.co/rows?dataset=readerbench%2Fro-stories&config=default&split=train&offset={offset}&length={length}"

# Author difficulty baselines (keys are lowercase for matching)
AUTHOR_CONFIG = {
    'ion creanga': {'base_difficulty': 3, 'genre': 'folktale', 'era': 'traditional', 'display': 'Ion Creanga'},
    'ion creangă': {'base_difficulty': 3, 'genre': 'folktale', 'era': 'traditional', 'display': 'Ion Creanga'},
    'mihai eminescu': {'base_difficulty': 6, 'genre': 'poetry', 'era': '19th-century', 'display': 'Mihai Eminescu'},
    'petre ispirescu': {'base_difficulty': 4, 'genre': 'folktale', 'era': '19th-century', 'display': 'Petre Ispirescu'},
    'ioan slavici': {'base_difficulty': 5, 'genre': 'fiction', 'era': '19th-century', 'display': 'Ioan Slavici'},
    'liviu rebreanu': {'base_difficulty': 6, 'genre': 'fiction', 'era': '20th-century', 'display': 'Liviu Rebreanu'},
    'george calinescu': {'base_difficulty': 6, 'genre': 'fiction', 'era': '20th-century', 'display': 'George Calinescu'},
    'mihail sadoveanu': {'base_difficulty': 5, 'genre': 'fiction', 'era': '20th-century', 'display': 'Mihail Sadoveanu'},
    'ion luca caragiale': {'base_difficulty': 5, 'genre': 'fiction', 'era': '19th-century', 'display': 'Ion Luca Caragiale'},
    'tudor arghezi': {'base_difficulty': 7, 'genre': 'poetry', 'era': '20th-century', 'display': 'Tudor Arghezi'},
    'lucian blaga': {'base_difficulty': 7, 'genre': 'poetry', 'era': '20th-century', 'display': 'Lucian Blaga'},
    'barbu stefanescu delavrancea': {'base_difficulty': 5, 'genre': 'fiction', 'era': '19th-century', 'display': 'Barbu Stefanescu Delavrancea'},
    'barbu ştefănescu delavrancea': {'base_difficulty': 5, 'genre': 'fiction', 'era': '19th-century', 'display': 'Barbu Stefanescu Delavrancea'},
}

DEFAULT_CONFIG = {'base_difficulty': 5, 'genre': 'fiction', 'era': 'modern'}

def ensure_dirs():
    """Create necessary directories."""
    os.makedirs(TEMP_DIR, exist_ok=True)

def fetch_hf_data(offset=0, length=100):
    """Fetch data from HuggingFace datasets API."""
    url = HF_API_URL.format(offset=offset, length=length)
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"  Error fetching data: {e}")
        return None

def calculate_difficulty(text, author_base):
    """
    Calculate difficulty based on text complexity and author baseline.
    """
    words = text.split()
    word_count = len(words)

    # Start with author baseline
    difficulty = author_base

    # Adjust for word count
    if word_count > 200:
        difficulty += 1
    if word_count > 350:
        difficulty += 1
    if word_count < 100:
        difficulty -= 1

    # Adjust for sentence complexity (average words per sentence)
    sentences = re.split(r'[.!?]', text)
    if sentences:
        avg_words = word_count / max(len([s for s in sentences if s.strip()]), 1)
        if avg_words > 20:
            difficulty += 1
        if avg_words < 10:
            difficulty -= 1

    # Adjust for complex Romanian markers
    text_lower = text.lower()
    if re.search(r'\bca\s+sa\b', text_lower):  # Subjunctive
        difficulty += 1
    if re.search(r'\bfiindca\b|\bdeoarece\b|\bintrucat\b', text_lower):  # Complex conjunctions
        difficulty += 1

    # Cap at 1-10
    return max(1, min(10, difficulty))

def slugify(text):
    """Convert text to URL-friendly slug."""
    # Remove diacritics
    diacritics = {
        'a': 'a', 'a': 'a', 'i': 'i', 's': 's', 't': 't',
        'A': 'A', 'A': 'A', 'I': 'I', 'S': 'S', 'T': 'T'
    }
    for diac, plain in diacritics.items():
        text = text.replace(diac, plain)

    # Convert to lowercase and replace spaces/special chars with hyphens
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text[:50]  # Limit length

def escape_js_string(s):
    """Escape a string for use in JavaScript template literals."""
    if s is None:
        return ''
    s = s.replace('\\', '\\\\')
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    return s

def get_author_config(author):
    """Get configuration for an author."""
    author_lower = author.lower().strip()

    # Try exact match first
    if author_lower in AUTHOR_CONFIG:
        config = AUTHOR_CONFIG[author_lower]
        return config, config.get('display', author)

    # Try partial match
    for known_author, config in AUTHOR_CONFIG.items():
        if known_author in author_lower or author_lower in known_author:
            return config, config.get('display', author)

    return DEFAULT_CONFIG, author

def process_stories():
    """Process stories from HuggingFace dataset."""
    print("Step 1: Fetching RO-stories from HuggingFace...")

    all_rows = []
    offset = 0
    batch_size = 100

    # Fetch data in batches
    while True:
        print(f"  Fetching rows {offset} to {offset + batch_size}...")
        data = fetch_hf_data(offset=offset, length=batch_size)

        if not data or 'rows' not in data or not data['rows']:
            break

        all_rows.extend(data['rows'])
        offset += batch_size

        # Limit to 1500 rows for more content
        if offset >= 1500:
            break

    print(f"  Retrieved {len(all_rows)} total rows")

    if not all_rows:
        print("  No data retrieved from HuggingFace")
        return []

    print("\nStep 2: Processing story excerpts...")

    stories = []
    seen_content = set()  # Track by content hash to avoid exact duplicates
    title_counts = {}  # Count excerpts per title

    for row in all_rows:
        row_data = row.get('row', {})

        # Get text and title - field is 'paragraph' in this dataset
        text = row_data.get('paragraph', '').strip()
        title = row_data.get('title', '').strip()

        if not text or not title:
            continue

        # Get word count from data or calculate
        word_count = row_data.get('word_count', len(text.split()))
        if word_count < 80 or word_count > 600:
            continue

        # Skip exact duplicate content
        content_hash = hash(text[:200])  # Hash first 200 chars
        if content_hash in seen_content:
            continue
        seen_content.add(content_hash)

        # Track how many excerpts we have per title
        title_normalized = title.lower().strip()
        title_counts[title_normalized] = title_counts.get(title_normalized, 0) + 1
        excerpt_num = title_counts[title_normalized]

        # Limit to 3 excerpts per title to avoid repetition
        if excerpt_num > 3:
            continue

        # Get author info
        author = row_data.get('author', 'Unknown').strip()
        config, display_author = get_author_config(author)

        # Generate ID with excerpt number
        base_slug = slugify(title)
        story_id = f"story-ro-{base_slug}-{excerpt_num}" if excerpt_num > 1 else f"story-ro-{base_slug}"

        # Calculate difficulty
        difficulty = calculate_difficulty(text, config['base_difficulty'])

        stories.append({
            'id': story_id,
            'title': title,
            'titleEn': '',  # Would need translation API
            'author': display_author,
            'excerpt': text,
            'difficulty': difficulty,
            'genre': config['genre'],
            'era': config['era'],
            'wordCount': word_count,
            'source': 'HuggingFace ro-stories dataset',
            'license': 'Apache 2.0'
        })

    print(f"  Processed {len(stories)} unique story excerpts")
    return stories

def generate_stories_addition(stories):
    """Generate JavaScript code to add to stories.js."""
    date_str = datetime.now().strftime('%Y-%m-%d')

    output_path = os.path.join(TEMP_DIR, "ro_stories_addition.js")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f'''  // ============================================
  // RO-STORIES DATASET - Added {date_str}
  // Source: huggingface.co/datasets/readerbench/ro-stories
  // License: Apache 2.0
  // Count: {len(stories)}
  // ============================================
''')

        for story in stories:
            excerpt_escaped = escape_js_string(story['excerpt'])

            f.write(f'''  {{
    id: '{story["id"]}',
    title: '{escape_js_string(story["title"])}',
    titleEn: '{escape_js_string(story["titleEn"])}',
    author: '{escape_js_string(story["author"])}',
    excerpt: `{excerpt_escaped}`,
    difficulty: {story["difficulty"]},
    genre: '{story["genre"]}',
    era: '{story["era"]}',
    wordCount: {story["wordCount"]},
    source: '{story["source"]}',
    license: '{story["license"]}',
  }},
''')

    print(f"\nGenerated addition file: {output_path}")
    return output_path

def main():
    print("=" * 60)
    print("RO-Stories Romanian Literature Processor")
    print("=" * 60)

    ensure_dirs()

    # Process stories
    stories = process_stories()

    if not stories:
        print("\nNo stories processed. Exiting.")
        sys.exit(1)

    # Generate output
    print("\nStep 3: Generating JavaScript addition...")
    output_path = generate_stories_addition(stories)

    # Show statistics
    print("\n" + "=" * 60)
    print("Statistics:")
    print("=" * 60)

    genres = {}
    eras = {}
    difficulties = {}
    authors = {}

    for story in stories:
        genres[story['genre']] = genres.get(story['genre'], 0) + 1
        eras[story['era']] = eras.get(story['era'], 0) + 1
        difficulties[story['difficulty']] = difficulties.get(story['difficulty'], 0) + 1
        authors[story['author']] = authors.get(story['author'], 0) + 1

    print(f"\nTotal stories: {len(stories)}")
    print(f"\nBy genre: {genres}")
    print(f"\nBy era: {eras}")
    print(f"\nBy difficulty: {dict(sorted(difficulties.items()))}")
    print(f"\nTop authors: {dict(sorted(authors.items(), key=lambda x: -x[1])[:10])}")

    print("\n" + "=" * 60)
    print("Done! Review the generated file and add to stories.js")
    print("=" * 60)

if __name__ == '__main__':
    main()
