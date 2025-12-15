#!/usr/bin/env python3
"""
Add Audio URLs to Existing Tatoeba Sentences

Searches the Tatoeba database for matching sentences and adds audio URLs
to the existing beginner.js, intermediate.js, and advanced.js files.
"""

import bz2
import csv
import os
import re
import unicodedata

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
TEMP_DIR = os.path.join(SCRIPT_DIR, "temp")
DATA_DIR = os.path.join(PROJECT_DIR, "src", "data", "tatoeba")

def normalize_text(text):
    """Normalize text for comparison (remove diacritics, lowercase)."""
    # Remove diacritics
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    # Lowercase and strip
    text = text.lower().strip()
    # Remove punctuation for matching
    text = re.sub(r'[^\w\s]', '', text)
    # Collapse whitespace
    text = ' '.join(text.split())
    return text

def load_romanian_sentences():
    """Load Romanian sentences from Tatoeba with their IDs."""
    print("Loading Romanian sentences from Tatoeba...")

    ron_file = os.path.join(TEMP_DIR, "ron_sentences.tsv.bz2")
    if not os.path.exists(ron_file):
        print(f"  Error: {ron_file} not found. Run process_tatoeba.py first.")
        return {}

    sentences = {}  # normalized_text -> (id, original_text)
    with bz2.open(ron_file, 'rt', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 3:
                sentence_id = row[0]
                text = row[2].strip()
                if text:
                    normalized = normalize_text(text)
                    if normalized not in sentences:
                        sentences[normalized] = (sentence_id, text)

    print(f"  Loaded {len(sentences)} unique Romanian sentences")
    return sentences

def load_audio_ids():
    """Load sentence IDs that have audio."""
    print("Loading audio data...")

    audio_file = os.path.join(TEMP_DIR, "sentences_with_audio.csv")
    if not os.path.exists(audio_file):
        print(f"  Error: {audio_file} not found. Run process_tatoeba.py first.")
        return set()

    audio_ids = set()
    with open(audio_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:
                audio_ids.add(row[1])

    print(f"  Loaded {len(audio_ids)} sentence IDs with audio")
    return audio_ids

def extract_sentences_from_js(filepath):
    """Extract sentence data from a JS file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all sentence objects
    pattern = r"\{\s*id:\s*'([^']+)',\s*romanian:\s*'([^']*)',\s*english:\s*'([^']*)',\s*difficulty:\s*(\d+),\s*wordCount:\s*(\d+),\s*hasAudio:\s*(true|false),\s*audioUrl:\s*(null|'[^']*')\s*\}"

    sentences = []
    for match in re.finditer(pattern, content):
        sentences.append({
            'id': match.group(1),
            'romanian': match.group(2).replace("\\'", "'"),
            'english': match.group(3).replace("\\'", "'"),
            'difficulty': int(match.group(4)),
            'wordCount': int(match.group(5)),
            'hasAudio': match.group(6) == 'true',
            'audioUrl': None if match.group(7) == 'null' else match.group(7).strip("'"),
            'original_match': match.group(0)
        })

    return sentences, content

def update_js_file(filepath, sentences, tatoeba_db, audio_ids):
    """Update a JS file with audio URLs where matches are found."""
    updated_sentences, content = extract_sentences_from_js(filepath)

    matches_found = 0
    audio_added = 0

    for sent in updated_sentences:
        normalized = normalize_text(sent['romanian'])

        if normalized in tatoeba_db:
            tat_id, original_text = tatoeba_db[normalized]
            matches_found += 1

            if tat_id in audio_ids:
                audio_url = f"https://audio.tatoeba.org/sentences/ron/{tat_id}.mp3"
                audio_added += 1

                # Create updated sentence object
                old_pattern = sent['original_match']
                new_obj = old_pattern.replace(
                    f"hasAudio: {str(sent['hasAudio']).lower()}",
                    "hasAudio: true"
                ).replace(
                    f"audioUrl: {sent['audioUrl'] if sent['audioUrl'] else 'null'}",
                    f"audioUrl: '{audio_url}'"
                ).replace(
                    "audioUrl: null",
                    f"audioUrl: '{audio_url}'"
                )

                content = content.replace(old_pattern, new_obj)

    # Write updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return matches_found, audio_added

def main():
    print("=" * 60)
    print("Add Audio URLs to Existing Tatoeba Sentences")
    print("=" * 60)

    # Load Tatoeba data
    tatoeba_db = load_romanian_sentences()
    if not tatoeba_db:
        return

    audio_ids = load_audio_ids()
    if not audio_ids:
        return

    # Filter to only Romanian audio
    ron_ids = set(data[0] for data in tatoeba_db.values())
    audio_ids = audio_ids.intersection(ron_ids)
    print(f"  {len(audio_ids)} Romanian sentences have audio")

    # Update each file
    files = ['beginner.js', 'intermediate.js', 'advanced.js']

    total_matches = 0
    total_audio = 0

    print("\nUpdating files...")
    for filename in files:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            matches, audio = update_js_file(filepath, None, tatoeba_db, audio_ids)
            print(f"  {filename}: {matches} matches found, {audio} with audio")
            total_matches += matches
            total_audio += audio
        else:
            print(f"  {filename}: not found")

    print("\n" + "=" * 60)
    print(f"Total: {total_matches} matches, {total_audio} audio URLs added")
    print("=" * 60)

if __name__ == '__main__':
    main()
