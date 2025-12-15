#!/usr/bin/env python3
"""
Fix Tatoeba audio URLs to use correct format.

The correct URL format is: https://tatoeba.org/en/audio/download/{audio_id}
We need to map sentence_id -> audio_id from sentences_with_audio.csv
ONLY for sentences that are Romanian (in ron_sentences.tsv.bz2).
"""

import os
import re
import csv
import bz2

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
TEMP_DIR = os.path.join(SCRIPT_DIR, "temp")
DATA_DIR = os.path.join(PROJECT_DIR, "src", "data", "tatoeba")

def load_romanian_sentence_ids():
    """Load set of Romanian sentence IDs."""
    ron_file = os.path.join(TEMP_DIR, "ron_sentences.tsv.bz2")

    if not os.path.exists(ron_file):
        print(f"Error: {ron_file} not found")
        return set()

    ron_ids = set()
    with bz2.open(ron_file, 'rt', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 3:
                ron_ids.add(row[0])

    print(f"Loaded {len(ron_ids)} Romanian sentence IDs")
    return ron_ids

def load_sentence_to_audio_map(romanian_ids):
    """Load mapping from sentence_id to audio_id (only for Romanian sentences)."""
    audio_file = os.path.join(TEMP_DIR, "sentences_with_audio.csv")

    if not os.path.exists(audio_file):
        print(f"Error: {audio_file} not found")
        return {}

    # Map sentence_id -> audio_id (only if sentence is Romanian)
    sentence_to_audio = {}
    with open(audio_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:
                audio_id = row[0]
                sentence_id = row[1]
                # Only include if this is a Romanian sentence
                if sentence_id in romanian_ids and sentence_id not in sentence_to_audio:
                    sentence_to_audio[sentence_id] = audio_id

    print(f"Found {len(sentence_to_audio)} Romanian sentences with audio")
    return sentence_to_audio

def update_js_file(filepath, sentence_to_audio):
    """Update audio URLs in a JS file, using sentence IDs from Tatoeba."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to match the sentence text and look up by that
    # But actually, we have the Tatoeba sentence IDs in our data already as tat-X
    # The extended sentences have IDs like 'tat-ext-XXXXXX' where XXXXXX is the sentence_id

    updated_count = 0
    removed_count = 0
    kept_count = 0

    # Pattern to match sentence objects with audioUrl
    # { id: 'tat-ext-399606', romanian: '...', ..., hasAudio: true, audioUrl: '...' }
    pattern = r"\{\s*id:\s*'(tat-ext-\d+|tat-\d+)',\s*romanian:\s*'([^']*)',\s*english:\s*'([^']*)',\s*difficulty:\s*(\d+),\s*wordCount:\s*(\d+),\s*hasAudio:\s*(true|false),\s*audioUrl:\s*('[^']*'|null)\s*\}"

    def fix_sentence(match):
        nonlocal updated_count, removed_count, kept_count
        full_match = match.group(0)
        sentence_id = match.group(1)
        romanian = match.group(2)
        english = match.group(3)
        difficulty = match.group(4)
        word_count = match.group(5)
        has_audio = match.group(6)
        audio_url = match.group(7)

        # Extract numeric ID for extended sentences
        if sentence_id.startswith('tat-ext-'):
            tatoeba_id = sentence_id.replace('tat-ext-', '')
        else:
            # Original sentences don't have Tatoeba IDs in the ID field
            # We'd need to look them up by text, which is error-prone
            # For now, keep these as-is but check if they need fixing
            if audio_url != 'null' and 'tatoeba.org/en/audio/download/' in audio_url:
                kept_count += 1
            return full_match

        if tatoeba_id in sentence_to_audio:
            audio_id = sentence_to_audio[tatoeba_id]
            new_url = f"'https://tatoeba.org/en/audio/download/{audio_id}'"
            updated_count += 1
            return f"{{ id: '{sentence_id}', romanian: '{romanian}', english: '{english}', difficulty: {difficulty}, wordCount: {word_count}, hasAudio: true, audioUrl: {new_url} }}"
        else:
            # No audio for this sentence
            if has_audio == 'true':
                removed_count += 1
            return f"{{ id: '{sentence_id}', romanian: '{romanian}', english: '{english}', difficulty: {difficulty}, wordCount: {word_count}, hasAudio: false, audioUrl: null }}"

    new_content = re.sub(pattern, fix_sentence, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return updated_count, removed_count, kept_count

def main():
    print("=" * 60)
    print("Fixing Tatoeba Audio URLs (Romanian Only)")
    print("=" * 60)

    romanian_ids = load_romanian_sentence_ids()
    if not romanian_ids:
        return

    sentence_to_audio = load_sentence_to_audio_map(romanian_ids)
    if not sentence_to_audio:
        return

    files = ['beginner.js', 'intermediate.js', 'advanced.js']

    total_updated = 0
    total_removed = 0
    total_kept = 0

    print("\nProcessing files...")
    for filename in files:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            updated, removed, kept = update_js_file(filepath, sentence_to_audio)
            print(f"  {filename}: {updated} updated, {removed} audio removed, {kept} kept")
            total_updated += updated
            total_removed += removed
            total_kept += kept
        else:
            print(f"  {filename}: not found")

    print("\n" + "=" * 60)
    print(f"Total: {total_updated} URLs updated, {total_removed} removed, {total_kept} kept")
    print("=" * 60)

if __name__ == '__main__':
    main()
