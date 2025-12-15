/**
 * Vocabulary Database
 * Core vocabulary for the Error Garden feature
 *
 * Total words: 500+
 *
 * Difficulty scale:
 * 1 - Basic words (essentials, greetings, numbers 1-10, colors)
 * 2 - Common words (time, family, food, body, places, animals, numbers 11-100)
 * 3 - Intermediate (months, verbs, adjectives, weather, nature, clothing)
 * 4 - Upper intermediate (abstract concepts, emotions, professions, travel)
 * 5 - Advanced (complex vocabulary, formal language, expressions)
 *
 * Categories:
 * - basics, greetings, pronouns, connectors, questions
 * - numbers, colors, time, family, food, body, places, animals
 * - weather, nature, clothing, household, professions, travel, sports
 * - nouns, verbs, adjectives, adverbs, expressions
 */

export const VOCABULARY_DATABASE = [
  // ============================================
  // DIFFICULTY 1 - Essential Basics
  // ============================================
  { ro: 'da', en: 'yes', difficulty: 1, category: 'basics' },
  { ro: 'nu', en: 'no', difficulty: 1, category: 'basics' },
  { ro: 'bună', en: 'hello/good', difficulty: 1, category: 'greetings' },
  { ro: 'salut', en: 'hi', difficulty: 1, category: 'greetings' },
  { ro: 'mulțumesc', en: 'thank you', difficulty: 1, category: 'greetings' },
  { ro: 'te rog', en: 'please', difficulty: 1, category: 'greetings' },
  { ro: 'scuze', en: 'sorry/excuse me', difficulty: 1, category: 'greetings' },
  { ro: 'eu', en: 'I', difficulty: 1, category: 'pronouns' },
  { ro: 'tu', en: 'you', difficulty: 1, category: 'pronouns' },
  { ro: 'el', en: 'he', difficulty: 1, category: 'pronouns' },
  { ro: 'ea', en: 'she', difficulty: 1, category: 'pronouns' },
  { ro: 'noi', en: 'we', difficulty: 1, category: 'pronouns' },
  { ro: 'și', en: 'and', difficulty: 1, category: 'connectors' },
  { ro: 'sau', en: 'or', difficulty: 1, category: 'connectors' },
  { ro: 'dar', en: 'but', difficulty: 1, category: 'connectors' },
  { ro: 'apă', en: 'water', difficulty: 1, category: 'nouns' },
  { ro: 'casă', en: 'house', difficulty: 1, category: 'nouns' },
  { ro: 'carte', en: 'book', difficulty: 1, category: 'nouns' },
  { ro: 'om', en: 'man/person', difficulty: 1, category: 'nouns' },
  { ro: 'femeie', en: 'woman', difficulty: 1, category: 'nouns' },

  // ============================================
  // DIFFICULTY 1 - Numbers
  // ============================================
  { ro: 'unu', en: 'one', difficulty: 1, category: 'numbers' },
  { ro: 'doi', en: 'two', difficulty: 1, category: 'numbers' },
  { ro: 'trei', en: 'three', difficulty: 1, category: 'numbers' },
  { ro: 'patru', en: 'four', difficulty: 1, category: 'numbers' },
  { ro: 'cinci', en: 'five', difficulty: 1, category: 'numbers' },
  { ro: 'sase', en: 'six', difficulty: 1, category: 'numbers' },
  { ro: 'sapte', en: 'seven', difficulty: 1, category: 'numbers' },
  { ro: 'opt', en: 'eight', difficulty: 1, category: 'numbers' },
  { ro: 'noua', en: 'nine', difficulty: 1, category: 'numbers' },
  { ro: 'zece', en: 'ten', difficulty: 1, category: 'numbers' },
  { ro: 'zero', en: 'zero', difficulty: 1, category: 'numbers' },

  // ============================================
  // DIFFICULTY 1 - Colors
  // ============================================
  { ro: 'rosu', en: 'red', difficulty: 1, category: 'colors' },
  { ro: 'albastru', en: 'blue', difficulty: 1, category: 'colors' },
  { ro: 'verde', en: 'green', difficulty: 1, category: 'colors' },
  { ro: 'galben', en: 'yellow', difficulty: 1, category: 'colors' },
  { ro: 'alb', en: 'white', difficulty: 1, category: 'colors' },
  { ro: 'negru', en: 'black', difficulty: 1, category: 'colors' },
  { ro: 'portocaliu', en: 'orange', difficulty: 2, category: 'colors' },
  { ro: 'roz', en: 'pink', difficulty: 2, category: 'colors' },
  { ro: 'maro', en: 'brown', difficulty: 2, category: 'colors' },
  { ro: 'gri', en: 'gray', difficulty: 2, category: 'colors' },

  // ============================================
  // DIFFICULTY 2 - Common Words
  // ============================================
  { ro: 'prieten', en: 'friend', difficulty: 2, category: 'nouns' },
  { ro: 'prieteni', en: 'friends', difficulty: 2, category: 'nouns' },
  { ro: 'familie', en: 'family', difficulty: 2, category: 'nouns' },
  { ro: 'drum', en: 'road', difficulty: 2, category: 'nouns' },
  { ro: 'mâncare', en: 'food', difficulty: 2, category: 'nouns' },
  { ro: 'timp', en: 'time', difficulty: 2, category: 'nouns' },
  { ro: 'zi', en: 'day', difficulty: 2, category: 'nouns' },
  { ro: 'noapte', en: 'night', difficulty: 2, category: 'nouns' },
  { ro: 'frumos', en: 'beautiful', difficulty: 2, category: 'adjectives' },
  { ro: 'bun', en: 'good', difficulty: 2, category: 'adjectives' },
  { ro: 'rău', en: 'bad', difficulty: 2, category: 'adjectives' },
  { ro: 'mare', en: 'big/sea', difficulty: 2, category: 'adjectives' },
  { ro: 'mic', en: 'small', difficulty: 2, category: 'adjectives' },
  { ro: 'nou', en: 'new', difficulty: 2, category: 'adjectives' },
  { ro: 'vechi', en: 'old', difficulty: 2, category: 'adjectives' },
  { ro: 'a fi', en: 'to be', difficulty: 2, category: 'verbs' },
  { ro: 'a avea', en: 'to have', difficulty: 2, category: 'verbs' },
  { ro: 'a merge', en: 'to go', difficulty: 2, category: 'verbs' },
  { ro: 'a veni', en: 'to come', difficulty: 2, category: 'verbs' },
  { ro: 'a face', en: 'to do/make', difficulty: 2, category: 'verbs' },
  { ro: 'poate', en: 'maybe', difficulty: 2, category: 'adverbs' },
  { ro: 'acum', en: 'now', difficulty: 2, category: 'adverbs' },
  { ro: 'aici', en: 'here', difficulty: 2, category: 'adverbs' },
  { ro: 'acolo', en: 'there', difficulty: 2, category: 'adverbs' },

  // ============================================
  // DIFFICULTY 2 - Time
  // ============================================
  { ro: 'luni', en: 'Monday', difficulty: 2, category: 'time' },
  { ro: 'marti', en: 'Tuesday', difficulty: 2, category: 'time' },
  { ro: 'miercuri', en: 'Wednesday', difficulty: 2, category: 'time' },
  { ro: 'joi', en: 'Thursday', difficulty: 2, category: 'time' },
  { ro: 'vineri', en: 'Friday', difficulty: 2, category: 'time' },
  { ro: 'sambata', en: 'Saturday', difficulty: 2, category: 'time' },
  { ro: 'duminica', en: 'Sunday', difficulty: 2, category: 'time' },
  { ro: 'azi', en: 'today', difficulty: 2, category: 'time' },
  { ro: 'ieri', en: 'yesterday', difficulty: 2, category: 'time' },
  { ro: 'maine', en: 'tomorrow', difficulty: 2, category: 'time' },
  { ro: 'dimineata', en: 'morning', difficulty: 2, category: 'time' },
  { ro: 'seara', en: 'evening', difficulty: 2, category: 'time' },
  { ro: 'ora', en: 'hour', difficulty: 2, category: 'time' },
  { ro: 'minut', en: 'minute', difficulty: 2, category: 'time' },

  // ============================================
  // DIFFICULTY 2 - Family
  // ============================================
  { ro: 'mama', en: 'mother/mom', difficulty: 2, category: 'family' },
  { ro: 'tata', en: 'father/dad', difficulty: 2, category: 'family' },
  { ro: 'frate', en: 'brother', difficulty: 2, category: 'family' },
  { ro: 'sora', en: 'sister', difficulty: 2, category: 'family' },
  { ro: 'copil', en: 'child', difficulty: 2, category: 'family' },
  { ro: 'fiu', en: 'son', difficulty: 2, category: 'family' },
  { ro: 'fiica', en: 'daughter', difficulty: 2, category: 'family' },
  { ro: 'bunica', en: 'grandmother', difficulty: 2, category: 'family' },
  { ro: 'bunic', en: 'grandfather', difficulty: 2, category: 'family' },
  { ro: 'sot', en: 'husband', difficulty: 2, category: 'family' },
  { ro: 'sotie', en: 'wife', difficulty: 2, category: 'family' },

  // ============================================
  // DIFFICULTY 2 - Food
  // ============================================
  { ro: 'paine', en: 'bread', difficulty: 2, category: 'food' },
  { ro: 'lapte', en: 'milk', difficulty: 2, category: 'food' },
  { ro: 'carne', en: 'meat', difficulty: 2, category: 'food' },
  { ro: 'peste', en: 'fish', difficulty: 2, category: 'food' },
  { ro: 'oua', en: 'eggs', difficulty: 2, category: 'food' },
  { ro: 'fructe', en: 'fruits', difficulty: 2, category: 'food' },
  { ro: 'legume', en: 'vegetables', difficulty: 2, category: 'food' },
  { ro: 'cafea', en: 'coffee', difficulty: 2, category: 'food' },
  { ro: 'ceai', en: 'tea', difficulty: 2, category: 'food' },
  { ro: 'vin', en: 'wine', difficulty: 2, category: 'food' },
  { ro: 'bere', en: 'beer', difficulty: 2, category: 'food' },

  // ============================================
  // DIFFICULTY 2 - Body
  // ============================================
  { ro: 'cap', en: 'head', difficulty: 2, category: 'body' },
  { ro: 'mana', en: 'hand', difficulty: 2, category: 'body' },
  { ro: 'picior', en: 'leg/foot', difficulty: 2, category: 'body' },
  { ro: 'ochi', en: 'eye/eyes', difficulty: 2, category: 'body' },
  { ro: 'nas', en: 'nose', difficulty: 2, category: 'body' },
  { ro: 'gura', en: 'mouth', difficulty: 2, category: 'body' },
  { ro: 'ureche', en: 'ear', difficulty: 2, category: 'body' },
  { ro: 'inima', en: 'heart', difficulty: 2, category: 'body' },

  // ============================================
  // DIFFICULTY 2 - Places
  // ============================================
  { ro: 'oras', en: 'city', difficulty: 2, category: 'places' },
  { ro: 'sat', en: 'village', difficulty: 2, category: 'places' },
  { ro: 'tara', en: 'country', difficulty: 2, category: 'places' },
  { ro: 'strada', en: 'street', difficulty: 2, category: 'places' },
  { ro: 'scoala', en: 'school', difficulty: 2, category: 'places' },
  { ro: 'magazin', en: 'store', difficulty: 2, category: 'places' },
  { ro: 'piata', en: 'market', difficulty: 2, category: 'places' },
  { ro: 'biserica', en: 'church', difficulty: 2, category: 'places' },
  { ro: 'spital', en: 'hospital', difficulty: 2, category: 'places' },
  { ro: 'restaurant', en: 'restaurant', difficulty: 2, category: 'places' },
  { ro: 'hotel', en: 'hotel', difficulty: 2, category: 'places' },
  { ro: 'aeroport', en: 'airport', difficulty: 2, category: 'places' },
  { ro: 'gara', en: 'train station', difficulty: 2, category: 'places' },

  // ============================================
  // DIFFICULTY 2 - Animals
  // ============================================
  { ro: 'caine', en: 'dog', difficulty: 2, category: 'animals' },
  { ro: 'pisica', en: 'cat', difficulty: 2, category: 'animals' },
  { ro: 'cal', en: 'horse', difficulty: 2, category: 'animals' },
  { ro: 'vaca', en: 'cow', difficulty: 2, category: 'animals' },
  { ro: 'pasare', en: 'bird', difficulty: 2, category: 'animals' },
  { ro: 'urs', en: 'bear', difficulty: 2, category: 'animals' },
  { ro: 'lup', en: 'wolf', difficulty: 2, category: 'animals' },

  // ============================================
  // DIFFICULTY 3 - Months
  // ============================================
  { ro: 'ianuarie', en: 'January', difficulty: 3, category: 'time' },
  { ro: 'februarie', en: 'February', difficulty: 3, category: 'time' },
  { ro: 'martie', en: 'March', difficulty: 3, category: 'time' },
  { ro: 'aprilie', en: 'April', difficulty: 3, category: 'time' },
  { ro: 'mai', en: 'May', difficulty: 3, category: 'time' },
  { ro: 'iunie', en: 'June', difficulty: 3, category: 'time' },
  { ro: 'iulie', en: 'July', difficulty: 3, category: 'time' },
  { ro: 'august', en: 'August', difficulty: 3, category: 'time' },
  { ro: 'septembrie', en: 'September', difficulty: 3, category: 'time' },
  { ro: 'octombrie', en: 'October', difficulty: 3, category: 'time' },
  { ro: 'noiembrie', en: 'November', difficulty: 3, category: 'time' },
  { ro: 'decembrie', en: 'December', difficulty: 3, category: 'time' },

  // ============================================
  // DIFFICULTY 3 - Intermediate
  // ============================================
  { ro: 'înțeleg', en: 'I understand', difficulty: 3, category: 'verbs' },
  { ro: 'întrebare', en: 'question', difficulty: 3, category: 'nouns' },
  { ro: 'răspuns', en: 'answer', difficulty: 3, category: 'nouns' },
  { ro: 'dragoste', en: 'love', difficulty: 3, category: 'nouns' },
  { ro: 'viață', en: 'life', difficulty: 3, category: 'nouns' },
  { ro: 'lucru', en: 'thing/work', difficulty: 3, category: 'nouns' },
  { ro: 'trebuie', en: 'must/need', difficulty: 3, category: 'verbs' },
  { ro: 'a ști', en: 'to know', difficulty: 3, category: 'verbs' },
  { ro: 'a crede', en: 'to believe', difficulty: 3, category: 'verbs' },
  { ro: 'a vedea', en: 'to see', difficulty: 3, category: 'verbs' },
  { ro: 'a auzi', en: 'to hear', difficulty: 3, category: 'verbs' },
  { ro: 'a vorbi', en: 'to speak', difficulty: 3, category: 'verbs' },
  { ro: 'a citi', en: 'to read', difficulty: 3, category: 'verbs' },
  { ro: 'a scrie', en: 'to write', difficulty: 3, category: 'verbs' },
  { ro: 'a învăța', en: 'to learn', difficulty: 3, category: 'verbs' },
  { ro: 'sigur', en: 'sure/safe', difficulty: 3, category: 'adjectives' },
  { ro: 'destul', en: 'enough', difficulty: 3, category: 'adjectives' },
  { ro: 'deja', en: 'already', difficulty: 3, category: 'adverbs' },
  { ro: 'încă', en: 'still/yet', difficulty: 3, category: 'adverbs' },
  { ro: 'mereu', en: 'always', difficulty: 3, category: 'adverbs' },
  { ro: 'niciodată', en: 'never', difficulty: 3, category: 'adverbs' },
  { ro: 'uneori', en: 'sometimes', difficulty: 3, category: 'adverbs' },
  { ro: 'pentru că', en: 'because', difficulty: 3, category: 'connectors' },
  { ro: 'dacă', en: 'if', difficulty: 3, category: 'connectors' },
  { ro: 'când', en: 'when', difficulty: 3, category: 'connectors' },

  // ============================================
  // DIFFICULTY 3 - More Nouns
  // ============================================
  { ro: 'loc', en: 'place', difficulty: 3, category: 'nouns' },
  { ro: 'problema', en: 'problem', difficulty: 3, category: 'nouns' },
  { ro: 'solutie', en: 'solution', difficulty: 3, category: 'nouns' },
  { ro: 'idee', en: 'idea', difficulty: 3, category: 'nouns' },
  { ro: 'cuvant', en: 'word', difficulty: 3, category: 'nouns' },
  { ro: 'limba', en: 'language/tongue', difficulty: 3, category: 'nouns' },
  { ro: 'poveste', en: 'story', difficulty: 3, category: 'nouns' },
  { ro: 'carte', en: 'book', difficulty: 3, category: 'nouns' },
  { ro: 'muzica', en: 'music', difficulty: 3, category: 'nouns' },
  { ro: 'film', en: 'movie/film', difficulty: 3, category: 'nouns' },
  { ro: 'masina', en: 'car', difficulty: 3, category: 'nouns' },
  { ro: 'telefon', en: 'phone', difficulty: 3, category: 'nouns' },
  { ro: 'calculator', en: 'computer', difficulty: 3, category: 'nouns' },
  { ro: 'bani', en: 'money', difficulty: 3, category: 'nouns' },
  { ro: 'job', en: 'job', difficulty: 3, category: 'nouns' },
  { ro: 'munca', en: 'work', difficulty: 3, category: 'nouns' },
  { ro: 'vacanta', en: 'vacation', difficulty: 3, category: 'nouns' },
  { ro: 'soare', en: 'sun', difficulty: 3, category: 'nouns' },
  { ro: 'luna', en: 'moon/month', difficulty: 3, category: 'nouns' },
  { ro: 'cer', en: 'sky', difficulty: 3, category: 'nouns' },
  { ro: 'pamant', en: 'earth/ground', difficulty: 3, category: 'nouns' },

  // ============================================
  // DIFFICULTY 3 - More Verbs
  // ============================================
  { ro: 'a dormi', en: 'to sleep', difficulty: 3, category: 'verbs' },
  { ro: 'a manca', en: 'to eat', difficulty: 3, category: 'verbs' },
  { ro: 'a bea', en: 'to drink', difficulty: 3, category: 'verbs' },
  { ro: 'a lucra', en: 'to work', difficulty: 3, category: 'verbs' },
  { ro: 'a iubi', en: 'to love', difficulty: 3, category: 'verbs' },
  { ro: 'a pleca', en: 'to leave', difficulty: 3, category: 'verbs' },
  { ro: 'a sta', en: 'to stay/sit', difficulty: 3, category: 'verbs' },
  { ro: 'a astepta', en: 'to wait', difficulty: 3, category: 'verbs' },
  { ro: 'a intelege', en: 'to understand', difficulty: 3, category: 'verbs' },
  { ro: 'a explica', en: 'to explain', difficulty: 3, category: 'verbs' },
  { ro: 'a intreba', en: 'to ask', difficulty: 3, category: 'verbs' },
  { ro: 'a raspunde', en: 'to answer', difficulty: 3, category: 'verbs' },
  { ro: 'a cumpara', en: 'to buy', difficulty: 3, category: 'verbs' },
  { ro: 'a vinde', en: 'to sell', difficulty: 3, category: 'verbs' },
  { ro: 'a plati', en: 'to pay', difficulty: 3, category: 'verbs' },
  { ro: 'a deschide', en: 'to open', difficulty: 3, category: 'verbs' },
  { ro: 'a inchide', en: 'to close', difficulty: 3, category: 'verbs' },
  { ro: 'a incepe', en: 'to begin', difficulty: 3, category: 'verbs' },
  { ro: 'a termina', en: 'to finish', difficulty: 3, category: 'verbs' },

  // ============================================
  // DIFFICULTY 3 - More Adjectives
  // ============================================
  { ro: 'tanar', en: 'young', difficulty: 3, category: 'adjectives' },
  { ro: 'batran', en: 'old (person)', difficulty: 3, category: 'adjectives' },
  { ro: 'cald', en: 'warm/hot', difficulty: 3, category: 'adjectives' },
  { ro: 'rece', en: 'cold', difficulty: 3, category: 'adjectives' },
  { ro: 'usor', en: 'easy/light', difficulty: 3, category: 'adjectives' },
  { ro: 'greu', en: 'difficult/heavy', difficulty: 3, category: 'adjectives' },
  { ro: 'rapid', en: 'fast', difficulty: 3, category: 'adjectives' },
  { ro: 'lent', en: 'slow', difficulty: 3, category: 'adjectives' },
  { ro: 'bogat', en: 'rich', difficulty: 3, category: 'adjectives' },
  { ro: 'sarac', en: 'poor', difficulty: 3, category: 'adjectives' },
  { ro: 'sanatos', en: 'healthy', difficulty: 3, category: 'adjectives' },
  { ro: 'bolnav', en: 'sick', difficulty: 3, category: 'adjectives' },
  { ro: 'ocupat', en: 'busy', difficulty: 3, category: 'adjectives' },
  { ro: 'liber', en: 'free', difficulty: 3, category: 'adjectives' },
  { ro: 'gol', en: 'empty', difficulty: 3, category: 'adjectives' },
  { ro: 'plin', en: 'full', difficulty: 3, category: 'adjectives' },

  // ============================================
  // DIFFICULTY 4 - Upper Intermediate
  // ============================================
  { ro: 'suflet', en: 'soul', difficulty: 4, category: 'nouns' },
  { ro: 'gând', en: 'thought', difficulty: 4, category: 'nouns' },
  { ro: 'simțire', en: 'feeling', difficulty: 4, category: 'nouns' },
  { ro: 'amintire', en: 'memory', difficulty: 4, category: 'nouns' },
  { ro: 'speranță', en: 'hope', difficulty: 4, category: 'nouns' },
  { ro: 'putere', en: 'power/strength', difficulty: 4, category: 'nouns' },
  { ro: 'întotdeauna', en: 'always', difficulty: 4, category: 'adverbs' },
  { ro: 'aproape', en: 'almost/near', difficulty: 4, category: 'adverbs' },
  { ro: 'departe', en: 'far', difficulty: 4, category: 'adverbs' },
  { ro: 'a simți', en: 'to feel', difficulty: 4, category: 'verbs' },
  { ro: 'a încerca', en: 'to try', difficulty: 4, category: 'verbs' },
  { ro: 'a găsi', en: 'to find', difficulty: 4, category: 'verbs' },
  { ro: 'a părea', en: 'to seem', difficulty: 4, category: 'verbs' },
  { ro: 'a rămâne', en: 'to stay/remain', difficulty: 4, category: 'verbs' },
  { ro: 'a ajunge', en: 'to arrive/reach', difficulty: 4, category: 'verbs' },
  { ro: 'fericit', en: 'happy', difficulty: 4, category: 'adjectives' },
  { ro: 'trist', en: 'sad', difficulty: 4, category: 'adjectives' },
  { ro: 'obosit', en: 'tired', difficulty: 4, category: 'adjectives' },
  { ro: 'îndrăgostit', en: 'in love', difficulty: 4, category: 'adjectives' },
  { ro: 'ciudat', en: 'strange', difficulty: 4, category: 'adjectives' },

  // ============================================
  // DIFFICULTY 4 - More Nouns
  // ============================================
  { ro: 'libertate', en: 'freedom', difficulty: 4, category: 'nouns' },
  { ro: 'adevar', en: 'truth', difficulty: 4, category: 'nouns' },
  { ro: 'minciuna', en: 'lie', difficulty: 4, category: 'nouns' },
  { ro: 'bucurie', en: 'joy', difficulty: 4, category: 'nouns' },
  { ro: 'tristete', en: 'sadness', difficulty: 4, category: 'nouns' },
  { ro: 'frica', en: 'fear', difficulty: 4, category: 'nouns' },
  { ro: 'fericire', en: 'happiness', difficulty: 4, category: 'nouns' },
  { ro: 'viitor', en: 'future', difficulty: 4, category: 'nouns' },
  { ro: 'trecut', en: 'past', difficulty: 4, category: 'nouns' },
  { ro: 'prezent', en: 'present', difficulty: 4, category: 'nouns' },
  { ro: 'sens', en: 'meaning/sense', difficulty: 4, category: 'nouns' },
  { ro: 'scop', en: 'purpose/goal', difficulty: 4, category: 'nouns' },
  { ro: 'vis', en: 'dream', difficulty: 4, category: 'nouns' },
  { ro: 'realitate', en: 'reality', difficulty: 4, category: 'nouns' },
  { ro: 'schimbare', en: 'change', difficulty: 4, category: 'nouns' },

  // ============================================
  // DIFFICULTY 4 - More Verbs
  // ============================================
  { ro: 'a alege', en: 'to choose', difficulty: 4, category: 'verbs' },
  { ro: 'a decide', en: 'to decide', difficulty: 4, category: 'verbs' },
  { ro: 'a propune', en: 'to propose', difficulty: 4, category: 'verbs' },
  { ro: 'a accepta', en: 'to accept', difficulty: 4, category: 'verbs' },
  { ro: 'a refuza', en: 'to refuse', difficulty: 4, category: 'verbs' },
  { ro: 'a promite', en: 'to promise', difficulty: 4, category: 'verbs' },
  { ro: 'a uita', en: 'to forget', difficulty: 4, category: 'verbs' },
  { ro: 'a-si aminti', en: 'to remember', difficulty: 4, category: 'verbs' },
  { ro: 'a construi', en: 'to build', difficulty: 4, category: 'verbs' },
  { ro: 'a distruge', en: 'to destroy', difficulty: 4, category: 'verbs' },
  { ro: 'a repara', en: 'to repair', difficulty: 4, category: 'verbs' },
  { ro: 'a schimba', en: 'to change', difficulty: 4, category: 'verbs' },

  // ============================================
  // DIFFICULTY 5 - Advanced
  // ============================================
  { ro: 'răbdare', en: 'patience', difficulty: 5, category: 'nouns' },
  { ro: 'curaj', en: 'courage', difficulty: 5, category: 'nouns' },
  { ro: 'înțelepciune', en: 'wisdom', difficulty: 5, category: 'nouns' },
  { ro: 'îndoială', en: 'doubt', difficulty: 5, category: 'nouns' },
  { ro: 'provocare', en: 'challenge', difficulty: 5, category: 'nouns' },
  { ro: 'a reuși', en: 'to succeed', difficulty: 5, category: 'verbs' },
  { ro: 'a eșua', en: 'to fail', difficulty: 5, category: 'verbs' },
  { ro: 'a susține', en: 'to support/claim', difficulty: 5, category: 'verbs' },
  { ro: 'a dezvolta', en: 'to develop', difficulty: 5, category: 'verbs' },
  { ro: 'a îndrăzni', en: 'to dare', difficulty: 5, category: 'verbs' },
  { ro: 'minunat', en: 'wonderful', difficulty: 5, category: 'adjectives' },
  { ro: 'copleșitor', en: 'overwhelming', difficulty: 5, category: 'adjectives' },
  { ro: 'neobișnuit', en: 'unusual', difficulty: 5, category: 'adjectives' },
  { ro: 'de nădejde', en: 'reliable', difficulty: 5, category: 'adjectives' },
  { ro: 'totuși', en: 'however/yet', difficulty: 5, category: 'connectors' },
  { ro: 'prin urmare', en: 'therefore', difficulty: 5, category: 'connectors' },
  { ro: 'deși', en: 'although', difficulty: 5, category: 'connectors' },
  { ro: 'în schimb', en: 'instead', difficulty: 5, category: 'connectors' },

  // ============================================
  // DIFFICULTY 5 - More Advanced
  // ============================================
  { ro: 'necunoscut', en: 'unknown', difficulty: 5, category: 'adjectives' },
  { ro: 'imposibil', en: 'impossible', difficulty: 5, category: 'adjectives' },
  { ro: 'posibil', en: 'possible', difficulty: 5, category: 'adjectives' },
  { ro: 'necesar', en: 'necessary', difficulty: 5, category: 'adjectives' },
  { ro: 'important', en: 'important', difficulty: 5, category: 'adjectives' },
  { ro: 'complicat', en: 'complicated', difficulty: 5, category: 'adjectives' },
  { ro: 'simplu', en: 'simple', difficulty: 5, category: 'adjectives' },
  { ro: 'profund', en: 'deep/profound', difficulty: 5, category: 'adjectives' },
  { ro: 'superficial', en: 'superficial', difficulty: 5, category: 'adjectives' },
  { ro: 'autentic', en: 'authentic', difficulty: 5, category: 'adjectives' },
  { ro: 'a merita', en: 'to deserve', difficulty: 5, category: 'verbs' },
  { ro: 'a continua', en: 'to continue', difficulty: 5, category: 'verbs' },
  { ro: 'a opri', en: 'to stop', difficulty: 5, category: 'verbs' },
  { ro: 'a compara', en: 'to compare', difficulty: 5, category: 'verbs' },
  { ro: 'a demonstra', en: 'to demonstrate', difficulty: 5, category: 'verbs' },
  { ro: 'a influenta', en: 'to influence', difficulty: 5, category: 'verbs' },
  { ro: 'a reflecta', en: 'to reflect', difficulty: 5, category: 'verbs' },
  { ro: 'a transforma', en: 'to transform', difficulty: 5, category: 'verbs' },
  { ro: 'consecinta', en: 'consequence', difficulty: 5, category: 'nouns' },
  { ro: 'responsabilitate', en: 'responsibility', difficulty: 5, category: 'nouns' },
  { ro: 'oportunitate', en: 'opportunity', difficulty: 5, category: 'nouns' },
  { ro: 'experienta', en: 'experience', difficulty: 5, category: 'nouns' },
  { ro: 'cunostinta', en: 'knowledge', difficulty: 5, category: 'nouns' },
  { ro: 'educatie', en: 'education', difficulty: 5, category: 'nouns' },
  { ro: 'cultura', en: 'culture', difficulty: 5, category: 'nouns' },
  { ro: 'traditie', en: 'tradition', difficulty: 5, category: 'nouns' },
  { ro: 'obicei', en: 'habit/custom', difficulty: 5, category: 'nouns' },
  { ro: 'caracter', en: 'character', difficulty: 5, category: 'nouns' },
  { ro: 'personalitate', en: 'personality', difficulty: 5, category: 'nouns' },

  // ============================================
  // DIFFICULTY 2 - Numbers 11-100
  // ============================================
  { ro: 'unsprezece', en: 'eleven', difficulty: 2, category: 'numbers' },
  { ro: 'doisprezece', en: 'twelve', difficulty: 2, category: 'numbers' },
  { ro: 'treisprezece', en: 'thirteen', difficulty: 2, category: 'numbers' },
  { ro: 'paisprezece', en: 'fourteen', difficulty: 2, category: 'numbers' },
  { ro: 'cincisprezece', en: 'fifteen', difficulty: 2, category: 'numbers' },
  { ro: 'sasesprezece', en: 'sixteen', difficulty: 2, category: 'numbers' },
  { ro: 'saptesprezece', en: 'seventeen', difficulty: 2, category: 'numbers' },
  { ro: 'optsprezece', en: 'eighteen', difficulty: 2, category: 'numbers' },
  { ro: 'nouasprezece', en: 'nineteen', difficulty: 2, category: 'numbers' },
  { ro: 'douazeci', en: 'twenty', difficulty: 2, category: 'numbers' },
  { ro: 'treizeci', en: 'thirty', difficulty: 2, category: 'numbers' },
  { ro: 'patruzeci', en: 'forty', difficulty: 2, category: 'numbers' },
  { ro: 'cincizeci', en: 'fifty', difficulty: 2, category: 'numbers' },
  { ro: 'saizeci', en: 'sixty', difficulty: 2, category: 'numbers' },
  { ro: 'saptezeci', en: 'seventy', difficulty: 2, category: 'numbers' },
  { ro: 'optzeci', en: 'eighty', difficulty: 2, category: 'numbers' },
  { ro: 'nouazeci', en: 'ninety', difficulty: 2, category: 'numbers' },
  { ro: 'o suta', en: 'one hundred', difficulty: 2, category: 'numbers' },
  { ro: 'o mie', en: 'one thousand', difficulty: 3, category: 'numbers' },
  { ro: 'un milion', en: 'one million', difficulty: 3, category: 'numbers' },

  // ============================================
  // DIFFICULTY 1 - Question Words
  // ============================================
  { ro: 'ce', en: 'what', difficulty: 1, category: 'questions' },
  { ro: 'cine', en: 'who', difficulty: 1, category: 'questions' },
  { ro: 'unde', en: 'where', difficulty: 1, category: 'questions' },
  { ro: 'cand', en: 'when', difficulty: 1, category: 'questions' },
  { ro: 'de ce', en: 'why', difficulty: 1, category: 'questions' },
  { ro: 'cum', en: 'how', difficulty: 1, category: 'questions' },
  { ro: 'cat', en: 'how much', difficulty: 1, category: 'questions' },
  { ro: 'cati', en: 'how many', difficulty: 2, category: 'questions' },
  { ro: 'care', en: 'which', difficulty: 2, category: 'questions' },
  { ro: 'al cui', en: 'whose', difficulty: 3, category: 'questions' },

  // ============================================
  // DIFFICULTY 2 - More Food
  // ============================================
  { ro: 'mar', en: 'apple', difficulty: 2, category: 'food' },
  { ro: 'banana', en: 'banana', difficulty: 2, category: 'food' },
  { ro: 'portocala', en: 'orange', difficulty: 2, category: 'food' },
  { ro: 'struguri', en: 'grapes', difficulty: 2, category: 'food' },
  { ro: 'capsuni', en: 'strawberries', difficulty: 2, category: 'food' },
  { ro: 'rosie', en: 'tomato', difficulty: 2, category: 'food' },
  { ro: 'cartof', en: 'potato', difficulty: 2, category: 'food' },
  { ro: 'morcov', en: 'carrot', difficulty: 2, category: 'food' },
  { ro: 'ceapa', en: 'onion', difficulty: 2, category: 'food' },
  { ro: 'usturoi', en: 'garlic', difficulty: 2, category: 'food' },
  { ro: 'varza', en: 'cabbage', difficulty: 2, category: 'food' },
  { ro: 'salata', en: 'salad/lettuce', difficulty: 2, category: 'food' },
  { ro: 'branza', en: 'cheese', difficulty: 2, category: 'food' },
  { ro: 'unt', en: 'butter', difficulty: 2, category: 'food' },
  { ro: 'smantana', en: 'sour cream', difficulty: 2, category: 'food' },
  { ro: 'iaurt', en: 'yogurt', difficulty: 2, category: 'food' },
  { ro: 'pui', en: 'chicken', difficulty: 2, category: 'food' },
  { ro: 'porc', en: 'pork', difficulty: 2, category: 'food' },
  { ro: 'vita', en: 'beef', difficulty: 2, category: 'food' },
  { ro: 'orez', en: 'rice', difficulty: 2, category: 'food' },
  { ro: 'paste', en: 'pasta', difficulty: 2, category: 'food' },
  { ro: 'supa', en: 'soup', difficulty: 2, category: 'food' },
  { ro: 'ciorba', en: 'sour soup', difficulty: 2, category: 'food' },
  { ro: 'desert', en: 'dessert', difficulty: 2, category: 'food' },
  { ro: 'prajitura', en: 'cake', difficulty: 2, category: 'food' },
  { ro: 'inghetata', en: 'ice cream', difficulty: 2, category: 'food' },
  { ro: 'ciocolata', en: 'chocolate', difficulty: 2, category: 'food' },
  { ro: 'sare', en: 'salt', difficulty: 2, category: 'food' },
  { ro: 'piper', en: 'pepper', difficulty: 2, category: 'food' },
  { ro: 'zahar', en: 'sugar', difficulty: 2, category: 'food' },
  { ro: 'ulei', en: 'oil', difficulty: 2, category: 'food' },
  { ro: 'otet', en: 'vinegar', difficulty: 3, category: 'food' },

  // ============================================
  // DIFFICULTY 2 - More Animals
  // ============================================
  { ro: 'porc', en: 'pig', difficulty: 2, category: 'animals' },
  { ro: 'oaie', en: 'sheep', difficulty: 2, category: 'animals' },
  { ro: 'capra', en: 'goat', difficulty: 2, category: 'animals' },
  { ro: 'gaina', en: 'hen/chicken', difficulty: 2, category: 'animals' },
  { ro: 'cocos', en: 'rooster', difficulty: 2, category: 'animals' },
  { ro: 'rata', en: 'duck', difficulty: 2, category: 'animals' },
  { ro: 'iepure', en: 'rabbit', difficulty: 2, category: 'animals' },
  { ro: 'peste', en: 'fish', difficulty: 2, category: 'animals' },
  { ro: 'vulpe', en: 'fox', difficulty: 2, category: 'animals' },
  { ro: 'cerb', en: 'deer', difficulty: 3, category: 'animals' },
  { ro: 'elefant', en: 'elephant', difficulty: 2, category: 'animals' },
  { ro: 'leu', en: 'lion', difficulty: 2, category: 'animals' },
  { ro: 'tigru', en: 'tiger', difficulty: 2, category: 'animals' },
  { ro: 'maimuta', en: 'monkey', difficulty: 2, category: 'animals' },
  { ro: 'sarpe', en: 'snake', difficulty: 2, category: 'animals' },
  { ro: 'broasca', en: 'frog', difficulty: 2, category: 'animals' },
  { ro: 'fluture', en: 'butterfly', difficulty: 3, category: 'animals' },
  { ro: 'albina', en: 'bee', difficulty: 3, category: 'animals' },
  { ro: 'furnica', en: 'ant', difficulty: 3, category: 'animals' },
  { ro: 'paianjen', en: 'spider', difficulty: 3, category: 'animals' },

  // ============================================
  // DIFFICULTY 3 - Weather
  // ============================================
  { ro: 'vreme', en: 'weather', difficulty: 3, category: 'weather' },
  { ro: 'soare', en: 'sun', difficulty: 2, category: 'weather' },
  { ro: 'ploaie', en: 'rain', difficulty: 2, category: 'weather' },
  { ro: 'zapada', en: 'snow', difficulty: 2, category: 'weather' },
  { ro: 'vant', en: 'wind', difficulty: 2, category: 'weather' },
  { ro: 'nor', en: 'cloud', difficulty: 2, category: 'weather' },
  { ro: 'nori', en: 'clouds', difficulty: 2, category: 'weather' },
  { ro: 'ceata', en: 'fog', difficulty: 3, category: 'weather' },
  { ro: 'furtuna', en: 'storm', difficulty: 3, category: 'weather' },
  { ro: 'tunet', en: 'thunder', difficulty: 3, category: 'weather' },
  { ro: 'fulger', en: 'lightning', difficulty: 3, category: 'weather' },
  { ro: 'gheata', en: 'ice', difficulty: 3, category: 'weather' },
  { ro: 'insorit', en: 'sunny', difficulty: 3, category: 'weather' },
  { ro: 'ploios', en: 'rainy', difficulty: 3, category: 'weather' },
  { ro: 'noros', en: 'cloudy', difficulty: 3, category: 'weather' },
  { ro: 'cald', en: 'hot/warm', difficulty: 2, category: 'weather' },
  { ro: 'rece', en: 'cold', difficulty: 2, category: 'weather' },
  { ro: 'frig', en: 'cold (noun)', difficulty: 2, category: 'weather' },
  { ro: 'caldura', en: 'heat', difficulty: 3, category: 'weather' },
  { ro: 'curcubeu', en: 'rainbow', difficulty: 3, category: 'weather' },

  // ============================================
  // DIFFICULTY 3 - Nature
  // ============================================
  { ro: 'copac', en: 'tree', difficulty: 2, category: 'nature' },
  { ro: 'floare', en: 'flower', difficulty: 2, category: 'nature' },
  { ro: 'frunza', en: 'leaf', difficulty: 2, category: 'nature' },
  { ro: 'iarba', en: 'grass', difficulty: 2, category: 'nature' },
  { ro: 'padure', en: 'forest', difficulty: 2, category: 'nature' },
  { ro: 'munte', en: 'mountain', difficulty: 2, category: 'nature' },
  { ro: 'deal', en: 'hill', difficulty: 3, category: 'nature' },
  { ro: 'vale', en: 'valley', difficulty: 3, category: 'nature' },
  { ro: 'rau', en: 'river', difficulty: 2, category: 'nature' },
  { ro: 'lac', en: 'lake', difficulty: 2, category: 'nature' },
  { ro: 'mare', en: 'sea', difficulty: 2, category: 'nature' },
  { ro: 'ocean', en: 'ocean', difficulty: 2, category: 'nature' },
  { ro: 'plaja', en: 'beach', difficulty: 2, category: 'nature' },
  { ro: 'nisip', en: 'sand', difficulty: 3, category: 'nature' },
  { ro: 'piatra', en: 'stone/rock', difficulty: 2, category: 'nature' },
  { ro: 'camp', en: 'field', difficulty: 3, category: 'nature' },
  { ro: 'gradina', en: 'garden', difficulty: 2, category: 'nature' },
  { ro: 'parc', en: 'park', difficulty: 2, category: 'nature' },
  { ro: 'stea', en: 'star', difficulty: 2, category: 'nature' },
  { ro: 'luna', en: 'moon', difficulty: 2, category: 'nature' },

  // ============================================
  // DIFFICULTY 3 - Clothing
  // ============================================
  { ro: 'haine', en: 'clothes', difficulty: 2, category: 'clothing' },
  { ro: 'camasa', en: 'shirt', difficulty: 2, category: 'clothing' },
  { ro: 'tricou', en: 't-shirt', difficulty: 2, category: 'clothing' },
  { ro: 'pantaloni', en: 'pants', difficulty: 2, category: 'clothing' },
  { ro: 'blugi', en: 'jeans', difficulty: 2, category: 'clothing' },
  { ro: 'fusta', en: 'skirt', difficulty: 2, category: 'clothing' },
  { ro: 'rochie', en: 'dress', difficulty: 2, category: 'clothing' },
  { ro: 'pulover', en: 'sweater', difficulty: 2, category: 'clothing' },
  { ro: 'jacheta', en: 'jacket', difficulty: 2, category: 'clothing' },
  { ro: 'palton', en: 'coat', difficulty: 3, category: 'clothing' },
  { ro: 'geaca', en: 'jacket (casual)', difficulty: 3, category: 'clothing' },
  { ro: 'costum', en: 'suit', difficulty: 3, category: 'clothing' },
  { ro: 'cravata', en: 'tie', difficulty: 3, category: 'clothing' },
  { ro: 'sosete', en: 'socks', difficulty: 2, category: 'clothing' },
  { ro: 'pantofi', en: 'shoes', difficulty: 2, category: 'clothing' },
  { ro: 'cizme', en: 'boots', difficulty: 3, category: 'clothing' },
  { ro: 'adidasi', en: 'sneakers', difficulty: 2, category: 'clothing' },
  { ro: 'palarie', en: 'hat', difficulty: 2, category: 'clothing' },
  { ro: 'sapca', en: 'cap', difficulty: 2, category: 'clothing' },
  { ro: 'manusi', en: 'gloves', difficulty: 3, category: 'clothing' },
  { ro: 'esarfa', en: 'scarf', difficulty: 3, category: 'clothing' },
  { ro: 'curea', en: 'belt', difficulty: 3, category: 'clothing' },
  { ro: 'geanta', en: 'bag/purse', difficulty: 2, category: 'clothing' },
  { ro: 'rucsac', en: 'backpack', difficulty: 2, category: 'clothing' },

  // ============================================
  // DIFFICULTY 3 - Household
  // ============================================
  { ro: 'masa', en: 'table', difficulty: 2, category: 'household' },
  { ro: 'scaun', en: 'chair', difficulty: 2, category: 'household' },
  { ro: 'canapea', en: 'sofa', difficulty: 2, category: 'household' },
  { ro: 'pat', en: 'bed', difficulty: 2, category: 'household' },
  { ro: 'dulap', en: 'wardrobe/cabinet', difficulty: 3, category: 'household' },
  { ro: 'usa', en: 'door', difficulty: 2, category: 'household' },
  { ro: 'fereastra', en: 'window', difficulty: 2, category: 'household' },
  { ro: 'perete', en: 'wall', difficulty: 3, category: 'household' },
  { ro: 'podea', en: 'floor', difficulty: 3, category: 'household' },
  { ro: 'tavan', en: 'ceiling', difficulty: 3, category: 'household' },
  { ro: 'camera', en: 'room', difficulty: 2, category: 'household' },
  { ro: 'bucatarie', en: 'kitchen', difficulty: 2, category: 'household' },
  { ro: 'baie', en: 'bathroom', difficulty: 2, category: 'household' },
  { ro: 'dormitor', en: 'bedroom', difficulty: 2, category: 'household' },
  { ro: 'sufragerie', en: 'living room', difficulty: 3, category: 'household' },
  { ro: 'scari', en: 'stairs', difficulty: 3, category: 'household' },
  { ro: 'lift', en: 'elevator', difficulty: 2, category: 'household' },
  { ro: 'frigider', en: 'refrigerator', difficulty: 2, category: 'household' },
  { ro: 'cuptor', en: 'oven', difficulty: 3, category: 'household' },
  { ro: 'aragaz', en: 'stove', difficulty: 3, category: 'household' },
  { ro: 'masina de spalat', en: 'washing machine', difficulty: 3, category: 'household' },
  { ro: 'televizor', en: 'television', difficulty: 2, category: 'household' },
  { ro: 'lampa', en: 'lamp', difficulty: 2, category: 'household' },
  { ro: 'oglinda', en: 'mirror', difficulty: 3, category: 'household' },
  { ro: 'ceas', en: 'clock/watch', difficulty: 2, category: 'household' },
  { ro: 'cheie', en: 'key', difficulty: 2, category: 'household' },
  { ro: 'farfurie', en: 'plate', difficulty: 2, category: 'household' },
  { ro: 'pahar', en: 'glass', difficulty: 2, category: 'household' },
  { ro: 'cana', en: 'mug', difficulty: 2, category: 'household' },
  { ro: 'lingura', en: 'spoon', difficulty: 2, category: 'household' },
  { ro: 'furculita', en: 'fork', difficulty: 2, category: 'household' },
  { ro: 'cutit', en: 'knife', difficulty: 2, category: 'household' },
  { ro: 'oala', en: 'pot', difficulty: 3, category: 'household' },
  { ro: 'tigaie', en: 'pan', difficulty: 3, category: 'household' },

  // ============================================
  // DIFFICULTY 4 - Professions
  // ============================================
  { ro: 'doctor', en: 'doctor', difficulty: 2, category: 'professions' },
  { ro: 'profesor', en: 'teacher/professor', difficulty: 2, category: 'professions' },
  { ro: 'student', en: 'student', difficulty: 2, category: 'professions' },
  { ro: 'elev', en: 'pupil', difficulty: 3, category: 'professions' },
  { ro: 'inginer', en: 'engineer', difficulty: 3, category: 'professions' },
  { ro: 'avocat', en: 'lawyer', difficulty: 3, category: 'professions' },
  { ro: 'politist', en: 'police officer', difficulty: 3, category: 'professions' },
  { ro: 'pompier', en: 'firefighter', difficulty: 3, category: 'professions' },
  { ro: 'bucatar', en: 'cook/chef', difficulty: 3, category: 'professions' },
  { ro: 'sofer', en: 'driver', difficulty: 3, category: 'professions' },
  { ro: 'mecanic', en: 'mechanic', difficulty: 3, category: 'professions' },
  { ro: 'electrician', en: 'electrician', difficulty: 3, category: 'professions' },
  { ro: 'contabil', en: 'accountant', difficulty: 4, category: 'professions' },
  { ro: 'secretar', en: 'secretary', difficulty: 3, category: 'professions' },
  { ro: 'director', en: 'director/manager', difficulty: 3, category: 'professions' },
  { ro: 'actor', en: 'actor', difficulty: 2, category: 'professions' },
  { ro: 'cantaret', en: 'singer', difficulty: 3, category: 'professions' },
  { ro: 'pictor', en: 'painter', difficulty: 3, category: 'professions' },
  { ro: 'scriitor', en: 'writer', difficulty: 3, category: 'professions' },
  { ro: 'fotograf', en: 'photographer', difficulty: 3, category: 'professions' },
  { ro: 'programator', en: 'programmer', difficulty: 3, category: 'professions' },
  { ro: 'ziarist', en: 'journalist', difficulty: 4, category: 'professions' },
  { ro: 'vanzator', en: 'salesperson', difficulty: 3, category: 'professions' },
  { ro: 'fermier', en: 'farmer', difficulty: 3, category: 'professions' },
  { ro: 'frizer', en: 'barber/hairdresser', difficulty: 3, category: 'professions' },

  // ============================================
  // DIFFICULTY 4 - Travel
  // ============================================
  { ro: 'calatorie', en: 'trip/journey', difficulty: 3, category: 'travel' },
  { ro: 'vacanta', en: 'vacation', difficulty: 2, category: 'travel' },
  { ro: 'pasaport', en: 'passport', difficulty: 2, category: 'travel' },
  { ro: 'viza', en: 'visa', difficulty: 3, category: 'travel' },
  { ro: 'bilet', en: 'ticket', difficulty: 2, category: 'travel' },
  { ro: 'bagaj', en: 'luggage', difficulty: 3, category: 'travel' },
  { ro: 'valiza', en: 'suitcase', difficulty: 3, category: 'travel' },
  { ro: 'avion', en: 'airplane', difficulty: 2, category: 'travel' },
  { ro: 'tren', en: 'train', difficulty: 2, category: 'travel' },
  { ro: 'autobuz', en: 'bus', difficulty: 2, category: 'travel' },
  { ro: 'taxi', en: 'taxi', difficulty: 2, category: 'travel' },
  { ro: 'metrou', en: 'subway', difficulty: 2, category: 'travel' },
  { ro: 'vapor', en: 'ship', difficulty: 3, category: 'travel' },
  { ro: 'bicicleta', en: 'bicycle', difficulty: 2, category: 'travel' },
  { ro: 'motocicleta', en: 'motorcycle', difficulty: 3, category: 'travel' },
  { ro: 'harta', en: 'map', difficulty: 2, category: 'travel' },
  { ro: 'rezervare', en: 'reservation', difficulty: 4, category: 'travel' },
  { ro: 'check-in', en: 'check-in', difficulty: 3, category: 'travel' },
  { ro: 'plecare', en: 'departure', difficulty: 3, category: 'travel' },
  { ro: 'sosire', en: 'arrival', difficulty: 3, category: 'travel' },
  { ro: 'intarziere', en: 'delay', difficulty: 4, category: 'travel' },
  { ro: 'turist', en: 'tourist', difficulty: 2, category: 'travel' },
  { ro: 'ghid', en: 'guide', difficulty: 3, category: 'travel' },
  { ro: 'muzeu', en: 'museum', difficulty: 2, category: 'travel' },
  { ro: 'castel', en: 'castle', difficulty: 2, category: 'travel' },

  // ============================================
  // DIFFICULTY 3 - Sports & Activities
  // ============================================
  { ro: 'sport', en: 'sport', difficulty: 2, category: 'sports' },
  { ro: 'fotbal', en: 'soccer/football', difficulty: 2, category: 'sports' },
  { ro: 'baschet', en: 'basketball', difficulty: 2, category: 'sports' },
  { ro: 'tenis', en: 'tennis', difficulty: 2, category: 'sports' },
  { ro: 'inot', en: 'swimming', difficulty: 2, category: 'sports' },
  { ro: 'alergare', en: 'running', difficulty: 2, category: 'sports' },
  { ro: 'plimbare', en: 'walk', difficulty: 2, category: 'sports' },
  { ro: 'dans', en: 'dance', difficulty: 2, category: 'sports' },
  { ro: 'muzica', en: 'music', difficulty: 2, category: 'sports' },
  { ro: 'citit', en: 'reading', difficulty: 2, category: 'sports' },
  { ro: 'gatit', en: 'cooking', difficulty: 2, category: 'sports' },
  { ro: 'calatorit', en: 'traveling', difficulty: 3, category: 'sports' },
  { ro: 'fotografie', en: 'photography', difficulty: 3, category: 'sports' },
  { ro: 'pictura', en: 'painting', difficulty: 3, category: 'sports' },
  { ro: 'gradinarit', en: 'gardening', difficulty: 3, category: 'sports' },
  { ro: 'pescuit', en: 'fishing', difficulty: 3, category: 'sports' },
  { ro: 'echipa', en: 'team', difficulty: 2, category: 'sports' },
  { ro: 'meci', en: 'match/game', difficulty: 2, category: 'sports' },
  { ro: 'joc', en: 'game', difficulty: 2, category: 'sports' },
  { ro: 'victorie', en: 'victory', difficulty: 3, category: 'sports' },
  { ro: 'infrangere', en: 'defeat', difficulty: 4, category: 'sports' },
  { ro: 'campion', en: 'champion', difficulty: 3, category: 'sports' },

  // ============================================
  // DIFFICULTY 2 - More Body Parts
  // ============================================
  { ro: 'brat', en: 'arm', difficulty: 2, category: 'body' },
  { ro: 'deget', en: 'finger', difficulty: 2, category: 'body' },
  { ro: 'par', en: 'hair', difficulty: 2, category: 'body' },
  { ro: 'fata', en: 'face', difficulty: 2, category: 'body' },
  { ro: 'dinti', en: 'teeth', difficulty: 2, category: 'body' },
  { ro: 'limba', en: 'tongue', difficulty: 2, category: 'body' },
  { ro: 'gat', en: 'neck/throat', difficulty: 2, category: 'body' },
  { ro: 'umar', en: 'shoulder', difficulty: 3, category: 'body' },
  { ro: 'spate', en: 'back', difficulty: 2, category: 'body' },
  { ro: 'piept', en: 'chest', difficulty: 3, category: 'body' },
  { ro: 'burta', en: 'belly', difficulty: 2, category: 'body' },
  { ro: 'genunchi', en: 'knee', difficulty: 3, category: 'body' },
  { ro: 'piele', en: 'skin', difficulty: 3, category: 'body' },
  { ro: 'sange', en: 'blood', difficulty: 3, category: 'body' },
  { ro: 'os', en: 'bone', difficulty: 3, category: 'body' },

  // ============================================
  // DIFFICULTY 4 - Emotions & States
  // ============================================
  { ro: 'furios', en: 'angry', difficulty: 3, category: 'emotions' },
  { ro: 'suparat', en: 'upset', difficulty: 3, category: 'emotions' },
  { ro: 'ingrijorat', en: 'worried', difficulty: 4, category: 'emotions' },
  { ro: 'confuz', en: 'confused', difficulty: 4, category: 'emotions' },
  { ro: 'surprins', en: 'surprised', difficulty: 3, category: 'emotions' },
  { ro: 'dezamagit', en: 'disappointed', difficulty: 4, category: 'emotions' },
  { ro: 'mandru', en: 'proud', difficulty: 3, category: 'emotions' },
  { ro: 'rusinos', en: 'shy/ashamed', difficulty: 4, category: 'emotions' },
  { ro: 'gelos', en: 'jealous', difficulty: 4, category: 'emotions' },
  { ro: 'nervos', en: 'nervous', difficulty: 3, category: 'emotions' },
  { ro: 'linistit', en: 'calm', difficulty: 3, category: 'emotions' },
  { ro: 'relaxat', en: 'relaxed', difficulty: 3, category: 'emotions' },
  { ro: 'entuziasmat', en: 'excited', difficulty: 4, category: 'emotions' },
  { ro: 'plictisit', en: 'bored', difficulty: 3, category: 'emotions' },
  { ro: 'singur', en: 'alone/lonely', difficulty: 3, category: 'emotions' },
  { ro: 'recunoscator', en: 'grateful', difficulty: 4, category: 'emotions' },
  { ro: 'curios', en: 'curious', difficulty: 3, category: 'emotions' },
  { ro: 'increzator', en: 'confident', difficulty: 4, category: 'emotions' },
  { ro: 'frustrat', en: 'frustrated', difficulty: 4, category: 'emotions' },
  { ro: 'stresat', en: 'stressed', difficulty: 3, category: 'emotions' },

  // ============================================
  // DIFFICULTY 3-4 - Common Expressions
  // ============================================
  { ro: 'bine', en: 'well/good/fine', difficulty: 1, category: 'expressions' },
  { ro: 'foarte bine', en: 'very well', difficulty: 2, category: 'expressions' },
  { ro: 'nu stiu', en: "I don't know", difficulty: 2, category: 'expressions' },
  { ro: 'nu inteleg', en: "I don't understand", difficulty: 2, category: 'expressions' },
  { ro: 'imi pare rau', en: "I'm sorry", difficulty: 2, category: 'expressions' },
  { ro: 'cu placere', en: "you're welcome", difficulty: 2, category: 'expressions' },
  { ro: 'la revedere', en: 'goodbye', difficulty: 2, category: 'expressions' },
  { ro: 'pe curand', en: 'see you soon', difficulty: 2, category: 'expressions' },
  { ro: 'noapte buna', en: 'good night', difficulty: 2, category: 'expressions' },
  { ro: 'noroc', en: 'cheers/good luck', difficulty: 2, category: 'expressions' },
  { ro: 'pofta buna', en: 'enjoy your meal', difficulty: 2, category: 'expressions' },
  { ro: 'sanatate', en: 'bless you/health', difficulty: 2, category: 'expressions' },
  { ro: 'la multi ani', en: 'happy birthday/anniversary', difficulty: 2, category: 'expressions' },
  { ro: 'craciun fericit', en: 'merry Christmas', difficulty: 3, category: 'expressions' },
  { ro: 'paste fericit', en: 'happy Easter', difficulty: 3, category: 'expressions' },
  { ro: 'felicitari', en: 'congratulations', difficulty: 3, category: 'expressions' },
  { ro: 'succes', en: 'good luck/success', difficulty: 2, category: 'expressions' },
  { ro: 'exact', en: 'exactly', difficulty: 3, category: 'expressions' },
  { ro: 'desigur', en: 'of course', difficulty: 3, category: 'expressions' },
  { ro: 'bineinteles', en: 'of course', difficulty: 3, category: 'expressions' },
  { ro: 'perfect', en: 'perfect', difficulty: 2, category: 'expressions' },
  { ro: 'grozav', en: 'great', difficulty: 3, category: 'expressions' },
  { ro: 'minunat', en: 'wonderful', difficulty: 3, category: 'expressions' },
  { ro: 'interesant', en: 'interesting', difficulty: 3, category: 'expressions' },
  { ro: 'serios', en: 'seriously', difficulty: 3, category: 'expressions' },
  { ro: 'cat de curand', en: 'as soon as possible', difficulty: 4, category: 'expressions' },
  { ro: 'din pacate', en: 'unfortunately', difficulty: 4, category: 'expressions' },
  { ro: 'din fericire', en: 'fortunately', difficulty: 4, category: 'expressions' },
  { ro: 'de fapt', en: 'actually/in fact', difficulty: 4, category: 'expressions' },
  { ro: 'in general', en: 'in general', difficulty: 4, category: 'expressions' },
  { ro: 'in special', en: 'especially', difficulty: 4, category: 'expressions' },
  { ro: 'de obicei', en: 'usually', difficulty: 3, category: 'expressions' },
  { ro: 'in sfarsit', en: 'finally', difficulty: 4, category: 'expressions' },
  { ro: 'pe de alta parte', en: 'on the other hand', difficulty: 5, category: 'expressions' },

  // ============================================
  // DIFFICULTY 2-3 - Prepositions
  // ============================================
  { ro: 'in', en: 'in', difficulty: 1, category: 'prepositions' },
  { ro: 'pe', en: 'on', difficulty: 1, category: 'prepositions' },
  { ro: 'la', en: 'at/to', difficulty: 1, category: 'prepositions' },
  { ro: 'de', en: 'of/from', difficulty: 1, category: 'prepositions' },
  { ro: 'cu', en: 'with', difficulty: 1, category: 'prepositions' },
  { ro: 'fara', en: 'without', difficulty: 2, category: 'prepositions' },
  { ro: 'pentru', en: 'for', difficulty: 2, category: 'prepositions' },
  { ro: 'despre', en: 'about', difficulty: 2, category: 'prepositions' },
  { ro: 'intre', en: 'between', difficulty: 2, category: 'prepositions' },
  { ro: 'langa', en: 'next to/beside', difficulty: 2, category: 'prepositions' },
  { ro: 'sub', en: 'under', difficulty: 2, category: 'prepositions' },
  { ro: 'peste', en: 'over/across', difficulty: 2, category: 'prepositions' },
  { ro: 'inainte', en: 'before', difficulty: 2, category: 'prepositions' },
  { ro: 'dupa', en: 'after', difficulty: 2, category: 'prepositions' },
  { ro: 'prin', en: 'through', difficulty: 3, category: 'prepositions' },
  { ro: 'spre', en: 'towards', difficulty: 3, category: 'prepositions' },
  { ro: 'impotriva', en: 'against', difficulty: 4, category: 'prepositions' },
  { ro: 'in loc de', en: 'instead of', difficulty: 4, category: 'prepositions' },
  { ro: 'in afara de', en: 'except for', difficulty: 4, category: 'prepositions' },
  { ro: 'datorita', en: 'thanks to/due to', difficulty: 4, category: 'prepositions' },
];

/**
 * Get vocabulary filtered by difficulty
 */
export const getVocabByDifficulty = (minDiff, maxDiff = minDiff) => {
  return VOCABULARY_DATABASE.filter(v => v.difficulty >= minDiff && v.difficulty <= maxDiff);
};

/**
 * Get vocabulary by category
 */
export const getVocabByCategory = (category) => {
  return VOCABULARY_DATABASE.filter(v => v.category === category);
};

/**
 * Get random vocabulary item
 */
export const getRandomVocab = (filter = null) => {
  const items = filter ? VOCABULARY_DATABASE.filter(filter) : VOCABULARY_DATABASE;
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Get weighted random vocab (prioritizes error words)
 */
export const getWeightedRandomVocab = (errorWords = []) => {
  // 50% chance to get an error word if available
  if (errorWords.length > 0 && Math.random() > 0.5) {
    return errorWords[Math.floor(Math.random() * errorWords.length)];
  }
  return getRandomVocab();
};

export default VOCABULARY_DATABASE;
