#!/usr/bin/env python3
"""
Tatoeba Romanian-English Sentence Processor

Downloads and processes Romanian-English sentence pairs from Tatoeba.org
Generates JavaScript files organized by difficulty level.

Source: tatoeba.org
License: CC-BY 2.0 FR
"""

import csv
import json
import os
import re
import sys
import urllib.request
from datetime import datetime
from collections import defaultdict

# URLs for Tatoeba data
RON_SENTENCES_URL = "https://downloads.tatoeba.org/exports/per_language/ron/ron_sentences_detailed.tsv"
LINKS_URL = "https://downloads.tatoeba.org/exports/links.tar.bz2"
ENG_SENTENCES_URL = "https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences_detailed.tsv"
AUDIO_URL = "https://downloads.tatoeba.org/exports/sentences_with_audio.csv"

# Output directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_DIR, "src", "data", "tatoeba")
TEMP_DIR = os.path.join(SCRIPT_DIR, "temp")

def ensure_dirs():
    """Create necessary directories."""
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)

def download_file(url, filename):
    """Download a file with progress indication."""
    filepath = os.path.join(TEMP_DIR, filename)
    if os.path.exists(filepath):
        print(f"  Using cached: {filename}")
        return filepath

    print(f"  Downloading: {filename}...")
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"  Downloaded: {filename}")
        return filepath
    except Exception as e:
        print(f"  Error downloading {filename}: {e}")
        return None

def calculate_difficulty(romanian_text):
    """
    Calculate difficulty based on word count and complexity markers.

    Base difficulty from word count:
    1-2 words: 1, 3-4 words: 2, 5-6 words: 3, 7-9 words: 4,
    10-12 words: 5, 13-15 words: 6, 16-20 words: 7,
    21-25 words: 8, 26-35 words: 9, 36+ words: 10

    Modifiers (+1 each):
    - Contains subjunctive (sa + verb)
    - Contains conditional (ar, as, ai, am, ati)
    - Contains reflexive verbs (se, ma, te, ne, va)
    - Sentence length > 80 characters
    """
    words = romanian_text.split()
    word_count = len(words)

    # Base difficulty from word count
    if word_count <= 2:
        difficulty = 1
    elif word_count <= 4:
        difficulty = 2
    elif word_count <= 6:
        difficulty = 3
    elif word_count <= 9:
        difficulty = 4
    elif word_count <= 12:
        difficulty = 5
    elif word_count <= 15:
        difficulty = 6
    elif word_count <= 20:
        difficulty = 7
    elif word_count <= 25:
        difficulty = 8
    elif word_count <= 35:
        difficulty = 9
    else:
        difficulty = 10

    text_lower = romanian_text.lower()

    # Subjunctive marker (sa + verb)
    if re.search(r'\bsa\s+\w+', text_lower):
        difficulty += 1

    # Conditional markers
    if re.search(r'\b(ar|as|ai|am|ati)\s+\w+', text_lower):
        difficulty += 1

    # Reflexive markers
    if re.search(r'\b(se|ma|te|ne|va)\s+', text_lower):
        difficulty += 1

    # Long sentence
    if len(romanian_text) > 80:
        difficulty += 1

    # Cap at 10
    return min(difficulty, 10)

def escape_js_string(s):
    """Escape a string for use in JavaScript."""
    if s is None:
        return ''
    # Escape backslashes first, then quotes
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('"', '\\"')
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '\\r')
    return s

def load_ron_eng_pairs():
    """
    Load Romanian-English sentence pairs.
    Downloads individual sentence files and links them.
    """
    print("Step 1: Downloading Tatoeba data files...")

    # Download Romanian sentences
    ron_sentences_path = download_file(
        "https://downloads.tatoeba.org/exports/per_language/ron/ron_sentences.tsv.bz2",
        "ron_sentences.tsv.bz2"
    )

    # Download English sentences
    eng_sentences_path = download_file(
        "https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2",
        "eng_sentences.tsv.bz2"
    )

    # Download links (sentence translations)
    links_path = download_file(
        "https://downloads.tatoeba.org/exports/links.tar.bz2",
        "links.tar.bz2"
    )

    # If we couldn't get the big files, try a smaller alternative
    if not all([ron_sentences_path, eng_sentences_path, links_path]):
        print("  Trying alternative download method...")
        return load_pairs_alternative()

    print("\nStep 2: Extracting and parsing files...")

    # Extract Romanian sentences
    import bz2
    import tarfile

    ron_sentences = {}
    print("  Parsing Romanian sentences...")
    with bz2.open(ron_sentences_path, 'rt', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 3:
                sentence_id = row[0]
                text = row[2]
                if text.strip():
                    ron_sentences[sentence_id] = text.strip()
    print(f"    Found {len(ron_sentences)} Romanian sentences")

    # Extract English sentences
    eng_sentences = {}
    print("  Parsing English sentences...")
    with bz2.open(eng_sentences_path, 'rt', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 3:
                sentence_id = row[0]
                text = row[2]
                if text.strip():
                    eng_sentences[sentence_id] = text.strip()
    print(f"    Found {len(eng_sentences)} English sentences")

    # Extract and parse links
    print("  Parsing translation links...")
    links_extracted = os.path.join(TEMP_DIR, "links.csv")
    if not os.path.exists(links_extracted):
        with tarfile.open(links_path, 'r:bz2') as tar:
            for member in tar.getmembers():
                if 'links' in member.name and member.name.endswith('.csv'):
                    member.name = 'links.csv'
                    tar.extract(member, TEMP_DIR)
                    break

    # Build pairs
    pairs = []
    seen_ron = set()
    with open(links_extracted, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:
                sent1_id = row[0]
                sent2_id = row[1]

                # Check if this is a Romanian-English pair
                if sent1_id in ron_sentences and sent2_id in eng_sentences:
                    if sent1_id not in seen_ron:
                        seen_ron.add(sent1_id)
                        ron_text = ron_sentences[sent1_id]
                        eng_text = eng_sentences[sent2_id]

                        # Skip very long sentences
                        if len(ron_text) <= 500:
                            pairs.append({
                                'ron_id': sent1_id,
                                'romanian': ron_text,
                                'eng_id': sent2_id,
                                'english': eng_text
                            })

                # Also check reverse (English -> Romanian)
                elif sent1_id in eng_sentences and sent2_id in ron_sentences:
                    if sent2_id not in seen_ron:
                        seen_ron.add(sent2_id)
                        ron_text = ron_sentences[sent2_id]
                        eng_text = eng_sentences[sent1_id]

                        if len(ron_text) <= 500:
                            pairs.append({
                                'ron_id': sent2_id,
                                'romanian': ron_text,
                                'eng_id': sent1_id,
                                'english': eng_text
                            })

    print(f"  Found {len(pairs)} Romanian-English pairs")
    return pairs


def load_pairs_alternative():
    """Alternative method using sentences_base.tar.bz2"""
    print("  Using alternative download method...")
    # Return empty - we'll create manual content if downloads fail
    return []

def load_audio_sentences(ron_sentence_ids):
    """Load set of sentence IDs that have audio."""
    print("\nStep 3: Loading audio availability data...")

    audio_path = download_file(AUDIO_URL, "sentences_with_audio.csv")

    # The format is: audio_id, sentence_id, username, license, url
    # We need to check if sentence_id is in our Romanian sentences
    all_audio_ids = set()
    if audio_path and os.path.exists(audio_path):
        with open(audio_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                if len(row) >= 2:
                    all_audio_ids.add(row[1])  # sentence_id is column 2

    # Filter to only Romanian sentences
    ron_audio_ids = all_audio_ids.intersection(ron_sentence_ids)
    print(f"  Found {len(ron_audio_ids)} Romanian sentences with audio")

    return ron_audio_ids

def process_sentences(pairs, audio_ids):
    """Process sentence pairs into the required format."""
    print("\nStep 4: Processing sentences...")

    sentences = []
    seen_romanian = set()  # Deduplicate by Romanian text

    for pair in pairs:
        romanian = pair['romanian']

        # Skip duplicates
        romanian_normalized = romanian.lower().strip()
        if romanian_normalized in seen_romanian:
            continue
        seen_romanian.add(romanian_normalized)

        ron_id = pair['ron_id']
        has_audio = ron_id in audio_ids

        word_count = len(romanian.split())
        difficulty = calculate_difficulty(romanian)

        # Build audio URL if available
        audio_url = f"https://audio.tatoeba.org/sentences/ron/{ron_id}.mp3" if has_audio else None

        sentences.append({
            'id': f'tat-{ron_id}',
            'romanian': romanian,
            'english': pair['english'],
            'difficulty': difficulty,
            'wordCount': word_count,
            'hasAudio': has_audio,
            'audioUrl': audio_url
        })

    print(f"  Processed {len(sentences)} unique sentences")
    return sentences

def split_by_difficulty(sentences):
    """Split sentences into beginner, intermediate, and advanced groups."""
    # Sort by difficulty first
    sentences.sort(key=lambda x: (x['difficulty'], x['wordCount']))

    # Prioritize sentences with audio
    beginner = [s for s in sentences if 1 <= s['difficulty'] <= 3]
    intermediate = [s for s in sentences if 4 <= s['difficulty'] <= 6]
    advanced = [s for s in sentences if 7 <= s['difficulty'] <= 10]

    # Sort each group: audio first, then by difficulty
    for group in [beginner, intermediate, advanced]:
        group.sort(key=lambda x: (not x['hasAudio'], x['difficulty'], x['wordCount']))

    return {
        'beginner': beginner[:600],  # Take top 600 (prioritizing audio)
        'intermediate': intermediate[:600],
        'advanced': advanced[:600]
    }

def generate_js_file(sentences, level, filename):
    """Generate a JavaScript file with the sentences."""
    filepath = os.path.join(DATA_DIR, filename)

    date_str = datetime.now().strftime('%Y-%m-%d')

    # Determine difficulty range
    if level == 'beginner':
        diff_range = '1-3'
        export_name = 'TATOEBA_BEGINNER_EXTENDED'
    elif level == 'intermediate':
        diff_range = '4-6'
        export_name = 'TATOEBA_INTERMEDIATE_EXTENDED'
    else:
        diff_range = '7-10'
        export_name = 'TATOEBA_ADVANCED_EXTENDED'

    audio_count = len([s for s in sentences if s['hasAudio']])

    with open(filepath, 'w', encoding='utf-8') as f:
        # File header
        f.write(f'''/**
 * Tatoeba Extended Sentences - {level.capitalize()}
 * Source: tatoeba.org
 * License: CC-BY 2.0 FR
 * Attribution: https://tatoeba.org
 *
 * Generated: {date_str}
 * Sentence count: {len(sentences)}
 * With audio: {audio_count}
 * Difficulty range: {diff_range}
 */

export const {export_name} = [
''')

        # Write each sentence
        for i, s in enumerate(sentences):
            romanian_escaped = escape_js_string(s['romanian'])
            english_escaped = escape_js_string(s['english'])
            audio_url = f"'{s['audioUrl']}'" if s['audioUrl'] else 'null'

            f.write(f"  {{ id: '{s['id']}', romanian: '{romanian_escaped}', english: '{english_escaped}', difficulty: {s['difficulty']}, wordCount: {s['wordCount']}, hasAudio: {str(s['hasAudio']).lower()}, audioUrl: {audio_url} }}")

            if i < len(sentences) - 1:
                f.write(',')
            f.write('\n')

        f.write('];\n')

    print(f"  Generated {filename}: {len(sentences)} sentences ({audio_count} with audio)")

def main():
    print("=" * 60)
    print("Tatoeba Romanian-English Sentence Processor")
    print("=" * 60)

    ensure_dirs()

    # Load data
    pairs = load_ron_eng_pairs()
    if not pairs:
        print("\nError: No sentence pairs found. Check your internet connection.")
        sys.exit(1)

    # Get Romanian sentence IDs for audio lookup
    ron_sentence_ids = set(p['ron_id'] for p in pairs)
    audio_ids = load_audio_sentences(ron_sentence_ids)

    # Process sentences
    sentences = process_sentences(pairs, audio_ids)

    # Split by difficulty
    print("\nStep 5: Splitting by difficulty level...")
    groups = split_by_difficulty(sentences)

    print(f"  Beginner (1-3): {len(groups['beginner'])} sentences")
    print(f"  Intermediate (4-6): {len(groups['intermediate'])} sentences")
    print(f"  Advanced (7-10): {len(groups['advanced'])} sentences")

    # Generate files
    print("\nStep 6: Generating JavaScript files...")
    generate_js_file(groups['beginner'], 'beginner', 'beginner_extended.js')
    generate_js_file(groups['intermediate'], 'intermediate', 'intermediate_extended.js')
    generate_js_file(groups['advanced'], 'advanced', 'advanced_extended.js')

    print("\n" + "=" * 60)
    print("Done! Extended Tatoeba files have been generated.")
    print("=" * 60)

if __name__ == '__main__':
    main()
