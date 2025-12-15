/**
 * Romanian Recipes Database
 *
 * Traditional Romanian recipes for language learning.
 * Bilingual format helps learners connect vocabulary with practical context.
 *
 * Structure:
 * {
 *   id: string,           // recipe-xxx
 *   title: { ro, en },    // Bilingual title
 *   description: { ro, en }, // Short description
 *   difficulty: number,   // 1-10 (based on vocabulary complexity)
 *   prepTime: string,     // Preparation time
 *   cookTime: string,     // Cooking time
 *   servings: number,     // Number of servings
 *   ingredients: [{ ro, en, amount }],
 *   steps: [{ ro, en }],
 *   category: string,     // 'main', 'soup', 'dessert', 'appetizer', 'bread'
 *   region: string,       // Region of origin (if applicable)
 *   source: string,       // Attribution
 *   license: string,      // License type
 * }
 */

export const ROMANIAN_RECIPES = [
  // ============================================
  // MAIN DISHES
  // ============================================
  {
    id: 'recipe-sarmale',
    title: {
      ro: 'Sarmale',
      en: 'Stuffed Cabbage Rolls',
    },
    description: {
      ro: 'Sarmalele sunt un fel de mancare traditional romanesc, facut din carne tocata invelita in frunze de varza murata.',
      en: 'Sarmale are a traditional Romanian dish made of minced meat wrapped in pickled cabbage leaves.',
    },
    difficulty: 5,
    prepTime: '45 minute',
    cookTime: '3 ore',
    servings: 8,
    ingredients: [
      { ro: 'varza murata', en: 'sauerkraut', amount: '1 capatana' },
      { ro: 'carne tocata de porc', en: 'ground pork', amount: '500 g' },
      { ro: 'carne tocata de vita', en: 'ground beef', amount: '250 g' },
      { ro: 'orez', en: 'rice', amount: '150 g' },
      { ro: 'ceapa', en: 'onion', amount: '2 bucati' },
      { ro: 'bulion de rosii', en: 'tomato paste', amount: '3 linguri' },
      { ro: 'boia dulce', en: 'sweet paprika', amount: '2 linguri' },
      { ro: 'cimbru uscat', en: 'dried thyme', amount: '1 lingurita' },
      { ro: 'sare', en: 'salt', amount: 'dupa gust' },
      { ro: 'piper', en: 'pepper', amount: 'dupa gust' },
      { ro: 'frunze de dafin', en: 'bay leaves', amount: '3 bucati' },
      { ro: 'smantana', en: 'sour cream', amount: 'pentru servire' },
    ],
    steps: [
      {
        ro: 'Se desparte varza in frunze si se spala bine.',
        en: 'Separate the cabbage into leaves and wash well.',
      },
      {
        ro: 'Se caleste ceapa tocata in ulei pana devine aurie.',
        en: 'Saute the chopped onion in oil until golden.',
      },
      {
        ro: 'Se amesteca carnea tocata cu orezul, ceapa calita, boia si condimentele.',
        en: 'Mix the ground meat with rice, sauteed onion, paprika and seasonings.',
      },
      {
        ro: 'Se pune cate o lingura de compozitie pe fiecare frunza de varza si se ruleaza.',
        en: 'Place a spoonful of mixture on each cabbage leaf and roll.',
      },
      {
        ro: 'Se aseaza sarmalele in oala, alternand cu straturi de varza tocata.',
        en: 'Arrange the rolls in a pot, alternating with layers of shredded cabbage.',
      },
      {
        ro: 'Se adauga bulionul diluat cu apa, foile de dafin si se lasa la fiert incet 3 ore.',
        en: 'Add the tomato paste diluted with water, bay leaves and simmer for 3 hours.',
      },
      {
        ro: 'Se servesc calde cu smantana si mamaliga.',
        en: 'Serve hot with sour cream and polenta.',
      },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-mici',
    title: {
      ro: 'Mititei (Mici)',
      en: 'Grilled Minced Meat Rolls',
    },
    description: {
      ro: 'Mititei sunt rulouri de carne tocata condimentata, gatite la gratar. Sunt un simbol al bucatariei romanesti.',
      en: 'Mititei are seasoned minced meat rolls cooked on the grill. They are a symbol of Romanian cuisine.',
    },
    difficulty: 4,
    prepTime: '30 minute',
    cookTime: '15 minute',
    servings: 6,
    ingredients: [
      { ro: 'carne tocata de vita', en: 'ground beef', amount: '500 g' },
      { ro: 'carne tocata de porc', en: 'ground pork', amount: '250 g' },
      { ro: 'carne tocata de oaie', en: 'ground lamb', amount: '250 g' },
      { ro: 'usturoi', en: 'garlic', amount: '6 catei' },
      { ro: 'cimbru uscat', en: 'dried thyme', amount: '2 linguri' },
      { ro: 'boia de ardei', en: 'paprika', amount: '1 lingurita' },
      { ro: 'bicarbonat de sodiu', en: 'baking soda', amount: '1/2 lingurita' },
      { ro: 'sare', en: 'salt', amount: '1 lingurita' },
      { ro: 'piper negru', en: 'black pepper', amount: '1 lingurita' },
      { ro: 'zeama de carne', en: 'beef broth', amount: '100 ml' },
    ],
    steps: [
      {
        ro: 'Se amesteca toate tipurile de carne intr-un bol mare.',
        en: 'Mix all types of meat in a large bowl.',
      },
      {
        ro: 'Se adauga usturoiul pisat, cimbrul, boia, sarea si piperul.',
        en: 'Add the crushed garlic, thyme, paprika, salt and pepper.',
      },
      {
        ro: 'Se dizolva bicarbonatul in zeama de carne si se adauga peste amestec.',
        en: 'Dissolve the baking soda in the broth and add to the mixture.',
      },
      {
        ro: 'Se framanta bine timp de 10 minute pana compozitia devine omogena.',
        en: 'Knead well for 10 minutes until the mixture becomes homogeneous.',
      },
      {
        ro: 'Se acopera si se lasa la frigider cel putin 4 ore, ideal peste noapte.',
        en: 'Cover and refrigerate for at least 4 hours, ideally overnight.',
      },
      {
        ro: 'Se formeaza rulouri de aproximativ 8 cm lungime si 2 cm grosime.',
        en: 'Form rolls about 8 cm long and 2 cm thick.',
      },
      {
        ro: 'Se gatesc la gratar sau pe grill, intorcandu-se frecvent, timp de 10-15 minute.',
        en: 'Cook on the grill, turning frequently, for 10-15 minutes.',
      },
      {
        ro: 'Se servesc calzi cu mustar si paine proaspata.',
        en: 'Serve hot with mustard and fresh bread.',
      },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-tochitura',
    title: {
      ro: 'Tochitura Moldoveneasca',
      en: 'Moldavian Pork Stew',
    },
    description: {
      ro: 'Tochitura este o mancare traditionala din Moldova, facuta din carne de porc cu sos de rosii si servita cu mamaliga.',
      en: 'Tochitura is a traditional Moldavian dish made with pork in tomato sauce, served with polenta.',
    },
    difficulty: 5,
    prepTime: '20 minute',
    cookTime: '45 minute',
    servings: 4,
    ingredients: [
      { ro: 'carne de porc', en: 'pork meat', amount: '600 g' },
      { ro: 'carnati proaspeti', en: 'fresh sausages', amount: '200 g' },
      { ro: 'rosii pasate', en: 'crushed tomatoes', amount: '400 g' },
      { ro: 'vin rosu', en: 'red wine', amount: '100 ml' },
      { ro: 'usturoi', en: 'garlic', amount: '4 catei' },
      { ro: 'ardei iute', en: 'hot pepper', amount: '1 bucata' },
      { ro: 'boia dulce', en: 'sweet paprika', amount: '1 lingura' },
      { ro: 'ulei', en: 'oil', amount: '3 linguri' },
      { ro: 'oua', en: 'eggs', amount: '4 bucati' },
      { ro: 'branza de burduf', en: 'sheep cheese', amount: '100 g' },
    ],
    steps: [
      {
        ro: 'Se taie carnea de porc in cuburi si se prajeste in ulei pana se rumeneste.',
        en: 'Cut the pork into cubes and fry in oil until browned.',
      },
      {
        ro: 'Se adauga carnatii taiati felii si se prajesc impreuna cu carnea.',
        en: 'Add the sliced sausages and fry together with the meat.',
      },
      {
        ro: 'Se pune boia, usturoiul pisat si ardeiul iute tocat.',
        en: 'Add paprika, crushed garlic and chopped hot pepper.',
      },
      {
        ro: 'Se stinge cu vinul rosu si se lasa sa se evapore.',
        en: 'Deglaze with red wine and let it evaporate.',
      },
      {
        ro: 'Se adauga rosiile pasate si se lasa la fiert incet 30 minute.',
        en: 'Add the crushed tomatoes and simmer for 30 minutes.',
      },
      {
        ro: 'Se fac ochiuri in acelasi ulei in care s-a gatit carnea.',
        en: 'Fry eggs sunny-side up in the same oil used for the meat.',
      },
      {
        ro: 'Se serveste tochitura cu mamaliga, ochiuri si branza de burduf.',
        en: 'Serve the stew with polenta, fried eggs and sheep cheese.',
      },
    ],
    category: 'main',
    region: 'Moldova',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // SOUPS
  // ============================================
  {
    id: 'recipe-ciorba-burta',
    title: {
      ro: 'Ciorba de Burta',
      en: 'Tripe Soup',
    },
    description: {
      ro: 'Ciorba de burta este o supa traditionala romaneasca, acrisoara si cremoasa, facuta din burta de vita.',
      en: 'Tripe soup is a traditional Romanian soup, sour and creamy, made from beef tripe.',
    },
    difficulty: 6,
    prepTime: '30 minute',
    cookTime: '4 ore',
    servings: 6,
    ingredients: [
      { ro: 'burta de vita', en: 'beef tripe', amount: '1 kg' },
      { ro: 'morcovi', en: 'carrots', amount: '2 bucati' },
      { ro: 'telina', en: 'celery', amount: '1 bucata' },
      { ro: 'ceapa', en: 'onion', amount: '1 bucata' },
      { ro: 'smantana', en: 'sour cream', amount: '300 ml' },
      { ro: 'galbenusuri', en: 'egg yolks', amount: '3 bucati' },
      { ro: 'otet', en: 'vinegar', amount: '100 ml' },
      { ro: 'usturoi', en: 'garlic', amount: '6 catei' },
      { ro: 'sare', en: 'salt', amount: 'dupa gust' },
      { ro: 'ardei iute', en: 'hot pepper', amount: 'optional' },
    ],
    steps: [
      {
        ro: 'Se spala bine burta si se fierbe in apa cu sare 3-4 ore pana se inmoaie.',
        en: 'Wash the tripe well and boil in salted water for 3-4 hours until tender.',
      },
      {
        ro: 'Se taie burta fiarta in fasii subtiri.',
        en: 'Cut the boiled tripe into thin strips.',
      },
      {
        ro: 'In zeama in care a fiert burta se adauga legumele taiate si se fierb.',
        en: 'Add the chopped vegetables to the broth and boil.',
      },
      {
        ro: 'Se amesteca smantana cu galbenusurile intr-un bol.',
        en: 'Mix the sour cream with egg yolks in a bowl.',
      },
      {
        ro: 'Se adauga treptat cateva linguri de supa calda pentru a tempera amestecul.',
        en: 'Gradually add a few spoons of hot soup to temper the mixture.',
      },
      {
        ro: 'Se toarna amestecul in supa, amestecand continuu.',
        en: 'Pour the mixture into the soup, stirring continuously.',
      },
      {
        ro: 'Se acriseste cu otet dupa gust si se adauga usturoiul pisat.',
        en: 'Add vinegar to taste and the crushed garlic.',
      },
      {
        ro: 'Se serveste calda cu ardei iute si smantana.',
        en: 'Serve hot with hot pepper and sour cream.',
      },
    ],
    category: 'soup',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-ciorba-radauteana',
    title: {
      ro: 'Ciorba Radauteana',
      en: 'Radauti-style Chicken Soup',
    },
    description: {
      ro: 'Ciorba radauteana este o supa cremoasa de pui din Bucovina, acrisita cu smantana si usturoi.',
      en: 'Radauti soup is a creamy chicken soup from Bucovina, soured with cream and garlic.',
    },
    difficulty: 4,
    prepTime: '20 minute',
    cookTime: '1 ora',
    servings: 6,
    ingredients: [
      { ro: 'piept de pui', en: 'chicken breast', amount: '600 g' },
      { ro: 'morcovi', en: 'carrots', amount: '2 bucati' },
      { ro: 'telina', en: 'celery root', amount: '1/2 bucata' },
      { ro: 'ceapa', en: 'onion', amount: '1 bucata' },
      { ro: 'smantana', en: 'sour cream', amount: '400 ml' },
      { ro: 'galbenusuri', en: 'egg yolks', amount: '2 bucati' },
      { ro: 'otet', en: 'vinegar', amount: '3 linguri' },
      { ro: 'usturoi', en: 'garlic', amount: '4 catei' },
      { ro: 'patrunjel', en: 'parsley', amount: '1 legatura' },
    ],
    steps: [
      {
        ro: 'Se fierbe pieptul de pui cu legumele in apa cu sare.',
        en: 'Boil the chicken breast with vegetables in salted water.',
      },
      {
        ro: 'Se scoate carnea, se taie cubulete si se pune inapoi in supa.',
        en: 'Remove the meat, cut into cubes and put back in the soup.',
      },
      {
        ro: 'Se bate smantana cu galbenusurile.',
        en: 'Beat the sour cream with egg yolks.',
      },
      {
        ro: 'Se tempereaza amestecul cu supa calda, apoi se toarna in oala.',
        en: 'Temper the mixture with hot soup, then pour into the pot.',
      },
      {
        ro: 'Se acriseste cu otet si se adauga usturoiul pisat.',
        en: 'Add vinegar and crushed garlic.',
      },
      {
        ro: 'Se presara patrunjel proaspat tocat la servire.',
        en: 'Sprinkle with fresh chopped parsley when serving.',
      },
    ],
    category: 'soup',
    region: 'Bucovina',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // DESSERTS
  // ============================================
  {
    id: 'recipe-cozonac',
    title: {
      ro: 'Cozonac',
      en: 'Romanian Sweet Bread',
    },
    description: {
      ro: 'Cozonacul este o paine dulce traditionala, preparata de Paste si Craciun, cu umplutura de nuca sau cacao.',
      en: 'Cozonac is a traditional sweet bread, prepared for Easter and Christmas, with walnut or cocoa filling.',
    },
    difficulty: 7,
    prepTime: '2 ore',
    cookTime: '45 minute',
    servings: 12,
    ingredients: [
      { ro: 'faina', en: 'flour', amount: '1 kg' },
      { ro: 'lapte', en: 'milk', amount: '300 ml' },
      { ro: 'zahar', en: 'sugar', amount: '250 g' },
      { ro: 'oua', en: 'eggs', amount: '6 bucati' },
      { ro: 'unt', en: 'butter', amount: '200 g' },
      { ro: 'drojdie proaspata', en: 'fresh yeast', amount: '50 g' },
      { ro: 'coaja de lamaie', en: 'lemon zest', amount: '1 lamaie' },
      { ro: 'esenta de rom', en: 'rum extract', amount: '2 lingurite' },
      { ro: 'esenta de vanilie', en: 'vanilla extract', amount: '1 lingurita' },
      { ro: 'nuci macinate', en: 'ground walnuts', amount: '300 g' },
      { ro: 'cacao', en: 'cocoa powder', amount: '50 g' },
      { ro: 'sare', en: 'salt', amount: '1/2 lingurita' },
    ],
    steps: [
      {
        ro: 'Se incalzeste laptele si se dizolva drojdia cu o lingurita de zahar.',
        en: 'Warm the milk and dissolve the yeast with a teaspoon of sugar.',
      },
      {
        ro: 'Se amesteca faina cu sarea si se face o gaura in mijloc.',
        en: 'Mix flour with salt and make a well in the center.',
      },
      {
        ro: 'Se adauga ouale, zaharul, untul moale si maiaua.',
        en: 'Add eggs, sugar, soft butter and the yeast mixture.',
      },
      {
        ro: 'Se framanta aluatul 20-30 minute pana devine elastic.',
        en: 'Knead the dough for 20-30 minutes until elastic.',
      },
      {
        ro: 'Se acopera si se lasa la crescut 2 ore intr-un loc cald.',
        en: 'Cover and let rise for 2 hours in a warm place.',
      },
      {
        ro: 'Se pregateste umplutura: nuci cu zahar si cacao.',
        en: 'Prepare the filling: walnuts with sugar and cocoa.',
      },
      {
        ro: 'Se intinde aluatul, se presara umplutura si se ruleaza.',
        en: 'Roll out the dough, sprinkle with filling and roll up.',
      },
      {
        ro: 'Se aseaza in tava unsa si se lasa sa creasca inca 30 minute.',
        en: 'Place in a greased pan and let rise for another 30 minutes.',
      },
      {
        ro: 'Se coace la 180 grade C timp de 40-45 minute.',
        en: 'Bake at 180 degrees C for 40-45 minutes.',
      },
    ],
    category: 'dessert',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-papanasi',
    title: {
      ro: 'Papanasi',
      en: 'Romanian Cheese Doughnuts',
    },
    description: {
      ro: 'Papanasii sunt gogosi pufoase din branza de vaci, servite cu smantana si dulceata.',
      en: 'Papanasi are fluffy doughnuts made from cottage cheese, served with sour cream and jam.',
    },
    difficulty: 5,
    prepTime: '20 minute',
    cookTime: '15 minute',
    servings: 4,
    ingredients: [
      { ro: 'branza de vaci', en: 'cottage cheese', amount: '500 g' },
      { ro: 'oua', en: 'eggs', amount: '2 bucati' },
      { ro: 'faina', en: 'flour', amount: '150 g' },
      { ro: 'zahar', en: 'sugar', amount: '3 linguri' },
      { ro: 'gris', en: 'semolina', amount: '3 linguri' },
      { ro: 'bicarbonat', en: 'baking soda', amount: '1/2 lingurita' },
      { ro: 'coaja de lamaie', en: 'lemon zest', amount: '1 lamaie' },
      { ro: 'ulei pentru prajit', en: 'oil for frying', amount: '500 ml' },
      { ro: 'smantana', en: 'sour cream', amount: 'pentru servire' },
      { ro: 'dulceata de afine', en: 'blueberry jam', amount: 'pentru servire' },
    ],
    steps: [
      {
        ro: 'Se scurge bine branza de vaci si se paseaza.',
        en: 'Drain the cottage cheese well and mash it.',
      },
      {
        ro: 'Se amesteca branza cu ouale, zaharul si coaja de lamaie.',
        en: 'Mix the cheese with eggs, sugar and lemon zest.',
      },
      {
        ro: 'Se adauga faina, grisul si bicarbonatul, amestecand usor.',
        en: 'Add flour, semolina and baking soda, mixing gently.',
      },
      {
        ro: 'Se formeaza bile mari si bile mici (capacele).',
        en: 'Form large balls and small balls (the caps).',
      },
      {
        ro: 'Se fac gauri in bilele mari cu degetul inmuiat in faina.',
        en: 'Make holes in the large balls with a flour-dipped finger.',
      },
      {
        ro: 'Se prajesc in ulei incins pana se rumenesc uniform.',
        en: 'Fry in hot oil until evenly browned.',
      },
      {
        ro: 'Se aseaza pe farfurie: gogosile mari, smantana, dulceata si capacelele.',
        en: 'Arrange on plate: large doughnuts, sour cream, jam and the caps.',
      },
    ],
    category: 'dessert',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // APPETIZERS AND SIDES
  // ============================================
  {
    id: 'recipe-mamaliga',
    title: {
      ro: 'Mamaliga',
      en: 'Romanian Polenta',
    },
    description: {
      ro: 'Mamaliga este un preparat traditional din faina de porumb, servit ca garnitura sau fel principal.',
      en: 'Mamaliga is a traditional dish made from cornmeal, served as a side or main course.',
    },
    difficulty: 2,
    prepTime: '5 minute',
    cookTime: '30 minute',
    servings: 4,
    ingredients: [
      { ro: 'faina de porumb (malai)', en: 'cornmeal', amount: '250 g' },
      { ro: 'apa', en: 'water', amount: '1 litru' },
      { ro: 'sare', en: 'salt', amount: '1 lingurita' },
      { ro: 'unt', en: 'butter', amount: '50 g (optional)' },
    ],
    steps: [
      {
        ro: 'Se pune apa cu sare la fiert intr-o oala adanca.',
        en: 'Bring salted water to boil in a deep pot.',
      },
      {
        ro: 'Cand apa clocoteste, se adauga malaiul treptat, amestecand continuu.',
        en: 'When water boils, gradually add cornmeal, stirring continuously.',
      },
      {
        ro: 'Se amesteca cu o lingura de lemn timp de 25-30 minute.',
        en: 'Stir with a wooden spoon for 25-30 minutes.',
      },
      {
        ro: 'Mamaliga este gata cand se dezlipeste usor de peretii oalei.',
        en: 'Polenta is ready when it easily comes off the pot walls.',
      },
      {
        ro: 'Se rastoarna pe un tocator de lemn si se taie cu ata.',
        en: 'Turn onto a wooden board and cut with string.',
      },
    ],
    category: 'side',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-zacusca',
    title: {
      ro: 'Zacusca',
      en: 'Romanian Vegetable Spread',
    },
    description: {
      ro: 'Zacusca este un preparat din legume coapte si conservate, perfect pentru iarna.',
      en: 'Zacusca is a dish made from roasted and preserved vegetables, perfect for winter.',
    },
    difficulty: 4,
    prepTime: '1 ora',
    cookTime: '2 ore',
    servings: 20,
    ingredients: [
      { ro: 'vinete', en: 'eggplants', amount: '2 kg' },
      { ro: 'ardei copti', en: 'roasted peppers', amount: '1 kg' },
      { ro: 'ceapa', en: 'onion', amount: '500 g' },
      { ro: 'rosii pasate', en: 'crushed tomatoes', amount: '500 g' },
      { ro: 'ulei de floarea soarelui', en: 'sunflower oil', amount: '300 ml' },
      { ro: 'sare', en: 'salt', amount: 'dupa gust' },
      { ro: 'piper', en: 'pepper', amount: 'dupa gust' },
      { ro: 'frunze de dafin', en: 'bay leaves', amount: '2 bucati' },
    ],
    steps: [
      {
        ro: 'Se coc vinetele si ardeii pe flacara sau la cuptor.',
        en: 'Roast the eggplants and peppers over flame or in the oven.',
      },
      {
        ro: 'Se curata de coaja si se lasa la scurs cateva ore.',
        en: 'Peel and let drain for a few hours.',
      },
      {
        ro: 'Se toaca vinetele si ardeii fin, manual sau la masina.',
        en: 'Finely chop the eggplants and peppers by hand or machine.',
      },
      {
        ro: 'Se caleste ceapa tocata in ulei pana devine aurie.',
        en: 'Saute the chopped onion in oil until golden.',
      },
      {
        ro: 'Se adauga vinetele, ardeii si rosiile pasate.',
        en: 'Add the eggplants, peppers and crushed tomatoes.',
      },
      {
        ro: 'Se fierbe la foc mic 2 ore, amestecand des.',
        en: 'Simmer on low heat for 2 hours, stirring often.',
      },
      {
        ro: 'Se pune in borcane sterile si se conserva.',
        en: 'Place in sterilized jars and preserve.',
      },
    ],
    category: 'appetizer',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // MORE MAIN DISHES
  // ============================================
  {
    id: 'recipe-musaca',
    title: { ro: 'Musaca de vinete', en: 'Eggplant Moussaka' },
    description: {
      ro: 'Musacaua de vinete este o mancare populara de vara, facuta din straturi de vinete prajite si carne tocata.',
      en: 'Eggplant moussaka is a popular summer dish made from layers of fried eggplant and minced meat.',
    },
    difficulty: 5,
    prepTime: '30 minute',
    cookTime: '1 ora',
    servings: 6,
    ingredients: [
      { ro: 'vinete', en: 'eggplants', amount: '1 kg' },
      { ro: 'carne tocata de porc si vita', en: 'mixed ground meat', amount: '500 g' },
      { ro: 'ceapa', en: 'onion', amount: '2 bucati' },
      { ro: 'rosii', en: 'tomatoes', amount: '400 g' },
      { ro: 'oua', en: 'eggs', amount: '3 bucati' },
      { ro: 'smantana', en: 'sour cream', amount: '200 ml' },
      { ro: 'ulei', en: 'oil', amount: 'pentru prajit' },
      { ro: 'sare si piper', en: 'salt and pepper', amount: 'dupa gust' },
    ],
    steps: [
      { ro: 'Se taie vinetele felii si se prajesc in ulei.', en: 'Cut eggplants into slices and fry in oil.' },
      { ro: 'Se caleste ceapa si se adauga carnea tocata.', en: 'Saute onion and add the ground meat.' },
      { ro: 'Se adauga rosiile si se lasa sa fiarba 15 minute.', en: 'Add tomatoes and simmer for 15 minutes.' },
      { ro: 'Se aseaza straturile: vinete, carne, vinete, carne.', en: 'Layer: eggplant, meat, eggplant, meat.' },
      { ro: 'Se bate smantana cu ouale si se toarna deasupra.', en: 'Beat sour cream with eggs and pour on top.' },
      { ro: 'Se coace la cuptor 30-40 minute la 180 grade.', en: 'Bake in oven for 30-40 minutes at 180 degrees.' },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-ardei-umpluti',
    title: { ro: 'Ardei umpluti', en: 'Stuffed Peppers' },
    description: {
      ro: 'Ardeii umpluti sunt un preparat clasic romanesc, cu umplutura de carne si orez.',
      en: 'Stuffed peppers are a classic Romanian dish with a filling of meat and rice.',
    },
    difficulty: 4,
    prepTime: '30 minute',
    cookTime: '1 ora',
    servings: 6,
    ingredients: [
      { ro: 'ardei grasi', en: 'bell peppers', amount: '8 bucati' },
      { ro: 'carne tocata', en: 'ground meat', amount: '500 g' },
      { ro: 'orez', en: 'rice', amount: '100 g' },
      { ro: 'ceapa', en: 'onion', amount: '1 bucata' },
      { ro: 'bulion', en: 'tomato paste', amount: '2 linguri' },
      { ro: 'suc de rosii', en: 'tomato juice', amount: '500 ml' },
      { ro: 'smantana', en: 'sour cream', amount: 'pentru servire' },
    ],
    steps: [
      { ro: 'Se golesc ardeii si se pastreaza capacele.', en: 'Hollow out peppers and keep the caps.' },
      { ro: 'Se amesteca carnea cu orezul fiert pe jumatate si ceapa calita.', en: 'Mix meat with half-cooked rice and sauteed onion.' },
      { ro: 'Se umplu ardeii si se pun capacele.', en: 'Fill peppers and place the caps on top.' },
      { ro: 'Se aseaza in oala cu bulionul si sucul de rosii.', en: 'Place in pot with tomato paste and tomato juice.' },
      { ro: 'Se fierb la foc mic 1 ora.', en: 'Simmer on low heat for 1 hour.' },
      { ro: 'Se servesc cu smantana.', en: 'Serve with sour cream.' },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-ciulama',
    title: { ro: 'Ciulama de pui', en: 'Chicken in White Sauce' },
    description: {
      ro: 'Ciulama este un preparat cremos de pui in sos alb, servit cu mamaliga.',
      en: 'Ciulama is a creamy chicken dish in white sauce, served with polenta.',
    },
    difficulty: 3,
    prepTime: '15 minute',
    cookTime: '40 minute',
    servings: 4,
    ingredients: [
      { ro: 'piept de pui', en: 'chicken breast', amount: '600 g' },
      { ro: 'ciuperci', en: 'mushrooms', amount: '300 g' },
      { ro: 'smantana', en: 'sour cream', amount: '300 ml' },
      { ro: 'faina', en: 'flour', amount: '2 linguri' },
      { ro: 'unt', en: 'butter', amount: '50 g' },
      { ro: 'usturoi', en: 'garlic', amount: '3 catei' },
      { ro: 'patrunjel', en: 'parsley', amount: '1 legatura' },
    ],
    steps: [
      { ro: 'Se fierbe pieptul de pui si se taie cubulete.', en: 'Boil chicken breast and cut into cubes.' },
      { ro: 'Se calesc ciupercile in unt.', en: 'Saute mushrooms in butter.' },
      { ro: 'Se adauga faina si se amesteca.', en: 'Add flour and stir.' },
      { ro: 'Se toarna smantana si zeama de la pui.', en: 'Pour in sour cream and chicken broth.' },
      { ro: 'Se adauga puiul si usturoiul pisat.', en: 'Add chicken and crushed garlic.' },
      { ro: 'Se serveste cu mamaliga si patrunjel.', en: 'Serve with polenta and parsley.' },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-drob',
    title: { ro: 'Drob de miel', en: 'Lamb Haggis' },
    description: {
      ro: 'Drobul este preparatul traditional de Paste, facut din organe de miel.',
      en: 'Drob is the traditional Easter dish made from lamb organs.',
    },
    difficulty: 6,
    prepTime: '45 minute',
    cookTime: '1 ora',
    servings: 8,
    ingredients: [
      { ro: 'organe de miel', en: 'lamb organs', amount: '1 kg' },
      { ro: 'ceapa verde', en: 'green onions', amount: '2 legaturi' },
      { ro: 'marar', en: 'dill', amount: '1 legatura' },
      { ro: 'patrunjel', en: 'parsley', amount: '1 legatura' },
      { ro: 'oua', en: 'eggs', amount: '6 bucati' },
      { ro: 'paine alba', en: 'white bread', amount: '2 felii' },
      { ro: 'lapte', en: 'milk', amount: '100 ml' },
    ],
    steps: [
      { ro: 'Se fierb organele si se toaca marunt.', en: 'Boil organs and chop finely.' },
      { ro: 'Se amesteca cu ceapa, verdeata si painea inmuiata.', en: 'Mix with onion, herbs and soaked bread.' },
      { ro: 'Se adauga ouale si se amesteca bine.', en: 'Add eggs and mix well.' },
      { ro: 'Se pune in tava si se acopera cu foaie de aluat.', en: 'Place in pan and cover with dough sheet.' },
      { ro: 'Se coace la cuptor 1 ora la 180 grade.', en: 'Bake in oven for 1 hour at 180 degrees.' },
      { ro: 'Se serveste rece, feliat.', en: 'Serve cold, sliced.' },
    ],
    category: 'main',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // MORE SOUPS
  // ============================================
  {
    id: 'recipe-ciorba-fasole',
    title: { ro: 'Ciorba de fasole', en: 'Bean Soup' },
    description: {
      ro: 'Ciorba de fasole este o supa consistenta si hranitoare, perfecta pentru zilele reci.',
      en: 'Bean soup is a hearty and nourishing soup, perfect for cold days.',
    },
    difficulty: 3,
    prepTime: '20 minute',
    cookTime: '2 ore',
    servings: 6,
    ingredients: [
      { ro: 'fasole boabe', en: 'dried beans', amount: '400 g' },
      { ro: 'ceapa', en: 'onion', amount: '2 bucati' },
      { ro: 'morcov', en: 'carrot', amount: '1 bucata' },
      { ro: 'telina', en: 'celery', amount: '1 bucata' },
      { ro: 'boia dulce', en: 'sweet paprika', amount: '1 lingurita' },
      { ro: 'cimbru', en: 'thyme', amount: '1 lingurita' },
      { ro: 'otet', en: 'vinegar', amount: '2 linguri' },
    ],
    steps: [
      { ro: 'Se pune fasolea la inmuiat peste noapte.', en: 'Soak beans overnight.' },
      { ro: 'Se fierbe fasolea pana se inmoaie.', en: 'Boil beans until soft.' },
      { ro: 'Se caleste ceapa si se adauga legumele.', en: 'Saute onion and add vegetables.' },
      { ro: 'Se adauga fasolea si se continua fierberea.', en: 'Add beans and continue boiling.' },
      { ro: 'Se acriseste cu otet si se condimenteaza.', en: 'Add vinegar and season.' },
      { ro: 'Se serveste cu ardei iute.', en: 'Serve with hot pepper.' },
    ],
    category: 'soup',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-ciorba-perisoare',
    title: { ro: 'Ciorba de perisoare', en: 'Meatball Soup' },
    description: {
      ro: 'Ciorba de perisoare este una dintre cele mai populare supe romanesti.',
      en: 'Meatball soup is one of the most popular Romanian soups.',
    },
    difficulty: 4,
    prepTime: '30 minute',
    cookTime: '45 minute',
    servings: 6,
    ingredients: [
      { ro: 'carne tocata', en: 'ground meat', amount: '400 g' },
      { ro: 'orez', en: 'rice', amount: '50 g' },
      { ro: 'morcov', en: 'carrot', amount: '2 bucati' },
      { ro: 'pastarnac', en: 'parsnip', amount: '1 bucata' },
      { ro: 'bors', en: 'fermented bran liquid', amount: '200 ml' },
      { ro: 'leustean', en: 'lovage', amount: '1 legatura' },
      { ro: 'ou', en: 'egg', amount: '1 bucata' },
    ],
    steps: [
      { ro: 'Se amesteca carnea cu orezul si oul pentru perisoare.', en: 'Mix meat with rice and egg for meatballs.' },
      { ro: 'Se formeaza perisoare mici.', en: 'Form small meatballs.' },
      { ro: 'Se pune apa la fiert cu legumele taiate.', en: 'Boil water with chopped vegetables.' },
      { ro: 'Se adauga perisoarle si se fierb 20 minute.', en: 'Add meatballs and boil for 20 minutes.' },
      { ro: 'Se acriseste cu bors.', en: 'Add fermented bran liquid.' },
      { ro: 'Se serveste cu smantana si leustean.', en: 'Serve with sour cream and lovage.' },
    ],
    category: 'soup',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // MORE DESSERTS
  // ============================================
  {
    id: 'recipe-gogosi',
    title: { ro: 'Gogosi', en: 'Romanian Doughnuts' },
    description: {
      ro: 'Gogosile sunt prajituri pufoase prajite, presarate cu zahar pudra.',
      en: 'Gogosi are fluffy fried pastries dusted with powdered sugar.',
    },
    difficulty: 3,
    prepTime: '1 ora',
    cookTime: '20 minute',
    servings: 8,
    ingredients: [
      { ro: 'faina', en: 'flour', amount: '500 g' },
      { ro: 'lapte', en: 'milk', amount: '200 ml' },
      { ro: 'drojdie', en: 'yeast', amount: '25 g' },
      { ro: 'zahar', en: 'sugar', amount: '3 linguri' },
      { ro: 'oua', en: 'eggs', amount: '2 bucati' },
      { ro: 'unt', en: 'butter', amount: '50 g' },
      { ro: 'ulei pentru prajit', en: 'oil for frying', amount: '500 ml' },
      { ro: 'zahar pudra', en: 'powdered sugar', amount: 'pentru presarat' },
    ],
    steps: [
      { ro: 'Se dizolva drojdia in lapte cald cu zahar.', en: 'Dissolve yeast in warm milk with sugar.' },
      { ro: 'Se amesteca faina cu ouale si untul.', en: 'Mix flour with eggs and butter.' },
      { ro: 'Se adauga maiaua si se framanta.', en: 'Add yeast mixture and knead.' },
      { ro: 'Se lasa aluatul sa creasca 1 ora.', en: 'Let dough rise for 1 hour.' },
      { ro: 'Se taie cercuri si se prajesc in ulei.', en: 'Cut circles and fry in oil.' },
      { ro: 'Se presara cu zahar pudra.', en: 'Dust with powdered sugar.' },
    ],
    category: 'dessert',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-placinta-mere',
    title: { ro: 'Placinta cu mere', en: 'Apple Pie' },
    description: {
      ro: 'Placinta cu mere este un desert traditional de toamna.',
      en: 'Apple pie is a traditional autumn dessert.',
    },
    difficulty: 4,
    prepTime: '45 minute',
    cookTime: '40 minute',
    servings: 8,
    ingredients: [
      { ro: 'foi de placinta', en: 'phyllo dough', amount: '400 g' },
      { ro: 'mere', en: 'apples', amount: '1 kg' },
      { ro: 'zahar', en: 'sugar', amount: '150 g' },
      { ro: 'scortisoara', en: 'cinnamon', amount: '2 lingurite' },
      { ro: 'unt', en: 'butter', amount: '100 g' },
      { ro: 'pesmet', en: 'breadcrumbs', amount: '50 g' },
    ],
    steps: [
      { ro: 'Se curata merele si se dau pe razatoare.', en: 'Peel apples and grate them.' },
      { ro: 'Se amesteca merele cu zaharul si scortisoara.', en: 'Mix apples with sugar and cinnamon.' },
      { ro: 'Se intind foile si se ung cu unt topit.', en: 'Spread sheets and brush with melted butter.' },
      { ro: 'Se presara pesmet si se pune umplutura.', en: 'Sprinkle breadcrumbs and add filling.' },
      { ro: 'Se ruleaza si se aseaza in tava.', en: 'Roll up and place in pan.' },
      { ro: 'Se coace la 180 grade 40 minute.', en: 'Bake at 180 degrees for 40 minutes.' },
    ],
    category: 'dessert',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-clatite',
    title: { ro: 'Clatite', en: 'Romanian Crepes' },
    description: {
      ro: 'Clatitele sunt prajituri subtiri servite cu gem, ciocolata sau branza.',
      en: 'Crepes are thin pancakes served with jam, chocolate or cheese.',
    },
    difficulty: 2,
    prepTime: '10 minute',
    cookTime: '20 minute',
    servings: 6,
    ingredients: [
      { ro: 'faina', en: 'flour', amount: '200 g' },
      { ro: 'lapte', en: 'milk', amount: '400 ml' },
      { ro: 'oua', en: 'eggs', amount: '2 bucati' },
      { ro: 'zahar', en: 'sugar', amount: '2 linguri' },
      { ro: 'sare', en: 'salt', amount: '1 varf lingurita' },
      { ro: 'ulei', en: 'oil', amount: '2 linguri' },
      { ro: 'gem sau ciocolata', en: 'jam or chocolate', amount: 'pentru umplutura' },
    ],
    steps: [
      { ro: 'Se bate faina cu ouale si zaharul.', en: 'Beat flour with eggs and sugar.' },
      { ro: 'Se adauga laptele treptat, amestecand.', en: 'Gradually add milk, stirring.' },
      { ro: 'Se adauga uleiul si sarea.', en: 'Add oil and salt.' },
      { ro: 'Se incinge tigaia si se ung clatite subtiri.', en: 'Heat pan and make thin crepes.' },
      { ro: 'Se intinde umplutura si se ruleaza.', en: 'Spread filling and roll up.' },
      { ro: 'Se servesc calde.', en: 'Serve warm.' },
    ],
    category: 'dessert',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },

  // ============================================
  // REGIONAL SPECIALTIES
  // ============================================
  {
    id: 'recipe-bulz',
    title: { ro: 'Bulz', en: 'Cheese-filled Polenta Balls' },
    description: {
      ro: 'Bulzul este o specialitate din Ardeal, mamaliga umpluta cu branza.',
      en: 'Bulz is a Transylvanian specialty, polenta filled with cheese.',
    },
    difficulty: 3,
    prepTime: '15 minute',
    cookTime: '30 minute',
    servings: 4,
    ingredients: [
      { ro: 'mamaliga', en: 'polenta', amount: '500 g' },
      { ro: 'branza de burduf', en: 'sheep cheese', amount: '200 g' },
      { ro: 'smantana', en: 'sour cream', amount: '150 ml' },
      { ro: 'unt', en: 'butter', amount: '50 g' },
      { ro: 'ou', en: 'egg', amount: '1 bucata' },
    ],
    steps: [
      { ro: 'Se face mamaliga si se lasa sa se raceasca putin.', en: 'Make polenta and let it cool slightly.' },
      { ro: 'Se formeaza bile din mamaliga.', en: 'Form balls from polenta.' },
      { ro: 'Se pune branza in mijlocul fiecarei bile.', en: 'Put cheese in the center of each ball.' },
      { ro: 'Se aseaza in tava unsa cu unt.', en: 'Place in buttered pan.' },
      { ro: 'Se ung cu ou batut si se coc la cuptor 20 minute.', en: 'Brush with beaten egg and bake for 20 minutes.' },
      { ro: 'Se servesc cu smantana.', en: 'Serve with sour cream.' },
    ],
    category: 'main',
    region: 'Transilvania',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
  {
    id: 'recipe-salata-boeuf',
    title: { ro: 'Salata de boeuf', en: 'Romanian Beef Salad' },
    description: {
      ro: 'Salata de boeuf este nelipsita de pe masa de sarbatori.',
      en: 'Beef salad is a must-have at holiday celebrations.',
    },
    difficulty: 5,
    prepTime: '1 ora',
    cookTime: '1.5 ore',
    servings: 10,
    ingredients: [
      { ro: 'carne de vita', en: 'beef', amount: '500 g' },
      { ro: 'piept de pui', en: 'chicken breast', amount: '300 g' },
      { ro: 'cartofi', en: 'potatoes', amount: '500 g' },
      { ro: 'morcovi', en: 'carrots', amount: '300 g' },
      { ro: 'mazare', en: 'peas', amount: '200 g' },
      { ro: 'castraveti murati', en: 'pickled cucumbers', amount: '200 g' },
      { ro: 'maioneza', en: 'mayonnaise', amount: '400 g' },
      { ro: 'mustar', en: 'mustard', amount: '2 linguri' },
    ],
    steps: [
      { ro: 'Se fierb carnea, cartofii si morcovii separat.', en: 'Boil meat, potatoes and carrots separately.' },
      { ro: 'Se taie totul cubulete mici.', en: 'Cut everything into small cubes.' },
      { ro: 'Se adauga mazarea si castravetii taiati.', en: 'Add peas and chopped pickles.' },
      { ro: 'Se amesteca maioneza cu mustarul.', en: 'Mix mayonnaise with mustard.' },
      { ro: 'Se combina toate ingredientele.', en: 'Combine all ingredients.' },
      { ro: 'Se decoreaza si se serveste rece.', en: 'Decorate and serve cold.' },
    ],
    category: 'appetizer',
    region: 'National',
    source: 'Traditional Romanian cuisine',
    license: 'Public Domain',
  },
];

/**
 * Get recipes by difficulty
 */
export const getRecipesByDifficulty = (minDiff, maxDiff = minDiff) => {
  return ROMANIAN_RECIPES.filter(r => r.difficulty >= minDiff && r.difficulty <= maxDiff);
};

/**
 * Get recipes by category
 */
export const getRecipesByCategory = (category) => {
  return ROMANIAN_RECIPES.filter(r => r.category === category);
};

/**
 * Get random recipe
 */
export const getRandomRecipe = (filter = null) => {
  const items = filter ? ROMANIAN_RECIPES.filter(filter) : ROMANIAN_RECIPES;
  return items[Math.floor(Math.random() * items.length)];
};

export default ROMANIAN_RECIPES;
