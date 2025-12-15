/**
 * Romanian Stories Database
 *
 * Literary content for reading practice.
 * Includes excerpts from classic Romanian literature and folktales.
 *
 * Structure:
 * {
 *   id: string,           // story-xxx
 *   title: string,        // Story title (Romanian)
 *   titleEn: string,      // Title in English
 *   author: string,       // Author name
 *   excerpt: string,      // Story excerpt (200-500 words)
 *   difficulty: number,   // 1-10
 *   genre: string,        // 'folktale', 'fiction', 'poetry', 'memoir'
 *   era: string,          // '19th-century', 'modern', 'traditional'
 *   wordCount: number,    // Approximate word count
 *   source: string,       // Attribution/source
 *   license: string,      // License type
 * }
 *
 * Sources:
 * - Project Gutenberg Romanian texts (Public Domain)
 * - Traditional Romanian folktales (Public Domain)
 */

export const ROMANIAN_STORIES = [
  // ============================================
  // FOLKTALES - Traditional Stories
  // ============================================
  {
    id: 'story-capra-trei-iezi',
    title: 'Capra cu trei iezi',
    titleEn: 'The Goat with Three Kids',
    author: 'Ion Creanga',
    excerpt: `Era odata o capra care avea trei iezi. Intr-o zi, capra a plecat sa caute de mancare pentru iezii ei.

Inainte de a pleca, capra le-a spus iezilor: "Dragii mei, nu deschideti usa nimanui pana nu ma intorc. Lupul cel rau umbla prin padure si vrea sa va manance."

Iezii au promis ca vor fi cuminti si nu vor deschide usa nimanui.

Dupa ce capra a plecat, lupul cel rau a venit la usa si a batut. "Deschideti usa, copii dragi! Sunt mama voastra si v-am adus de mancare."

Dar iezii au recunoscut vocea groasa a lupului. "Tu nu esti mama noastra! Mama are vocea dulce si fina. Pleaca de aici, lup rau!"

Lupul s-a dus la moara si a inghitit faina ca sa-si faca vocea mai subtire. Apoi s-a intors la casa iezilor.

"Deschideti usa, copii dragi! Sunt mama voastra!" a strigat lupul cu vocea lui noua.

De data aceasta, doi dintre iezi au crezut ca este mama lor si au deschis usa. Lupul a intrat si i-a inghitit pe cei doi iezi. Dar cel mai mic ied s-a ascuns in cuptor si a scapat.`,
    difficulty: 3,
    genre: 'folktale',
    era: 'traditional',
    wordCount: 200,
    source: 'Ion Creanga - Povesti',
    license: 'Public Domain',
  },
  {
    id: 'story-fat-frumos',
    title: 'Fat-Frumos din lacrima',
    titleEn: 'Prince Charming Born from a Tear',
    author: 'Mihai Eminescu',
    excerpt: `A fost odata ca niciodata, ca de n-ar fi nu s-ar povesti. A fost odata un imparat batran care avea o singura fiica, frumoasa ca luna pe cer.

Imparatul dorea foarte mult sa aiba un fiu, dar sotia lui nu putea sa-i dea un mostenitor. Intr-o noapte, imparateasa a plans atat de mult incat lacrimile ei au format un lac.

Din lacrimile acestea s-a nascut un fiu, frumos ca soarele dimineata. L-au numit Fat-Frumos din lacrima.

Cand Fat-Frumos a crescut, a plecat in lume sa-si caute norocul. A calatorit prin paduri intunecate si peste munti inalti.

Pe drum a intalnit un batran cu barba alba pana la pamant. Batranul i-a dat un cal nazdravan si o sabie fermecata.

"Cu acestea vei putea sa invinge pe oricine," a spus batranul. "Dar sa nu uiti niciodata de unde ai venit - din lacrimile mamei tale."

Fat-Frumos a multumit batranului si a continuat drumul. Calul lui zbura mai repede decat vantul, iar sabia lui taia orice obstacol.`,
    difficulty: 4,
    genre: 'folktale',
    era: '19th-century',
    wordCount: 190,
    source: 'Mihai Eminescu',
    license: 'Public Domain',
  },
  {
    id: 'story-povestea-porcului',
    title: 'Povestea porcului',
    titleEn: 'The Story of the Pig',
    author: 'Ion Creanga',
    excerpt: `Era odata un mosneag si o baba care aveau un porc. Porcul acesta era asa de destept incat intelegea tot ce vorbeau oamenii.

Intr-o zi, mosneagul a zis: "Maine o sa taiem porcul, ca vine iarna si ne trebuie carne."

Porcul a auzit si s-a speriat foarte tare. Noaptea, cand toti dormeau, porcul a fugit din ograda si a plecat in lume.

A mers mult si departe pana cand a intalnit un iepure.
"Unde te duci, porcule?" a intrebat iepurele.
"Fug de la stapan, ca vrea sa ma taie," a raspuns porcul.
"Pot sa vin si eu cu tine?" a zis iepurele.
"Hai, ca impreuna e mai bine," a raspuns porcul.

Au mers mai departe si au intalnit un cocos, o rata si un caine. Toti se temeau de stapanii lor si au hotarat sa mearga impreuna.

Au gasit o casa parasita in padure si au hotarat sa locuiasca acolo. Seara, fiecare si-a ales locul lui: porcul langa cuptor, iepurele sub pat, cocosul pe grinda, rata langa usa, iar cainele in prag.`,
    difficulty: 3,
    genre: 'folktale',
    era: 'traditional',
    wordCount: 195,
    source: 'Ion Creanga - Povesti',
    license: 'Public Domain',
  },

  // ============================================
  // CLASSIC LITERATURE
  // ============================================
  {
    id: 'story-amintiri-copilarie',
    title: 'Amintiri din copilarie',
    titleEn: 'Childhood Memories',
    author: 'Ion Creanga',
    excerpt: `Stau cateodata si-mi aduc aminte ce vremuri si ce oameni mai erau in partea locului, pe cand eram eu copil. Si, drept sa spun, pare-mi-se ca pe atunci oamenii erau mai sarguitori, mai voiosi si mai buni la suflet decat cei de astazi.

Satul Humulesti, in care m-am nascut eu, e asezat pe o coasta lin inclinata, in capatul unei vai inguste. Case mai multe nu erau pe atunci, dar cele ce erau aveau un aer de bunastare.

Tata era om de omenie si gospodar inzestrat. El se ingrijea sa fie casa noastra mereu curata si frumoasa. Mama era o femeie harnica si blanda, care ne invata pe noi, copiii, sa fim cuminti si respectuosi.

Copilaria mea a fost plina de jocuri si de aventuri. Impreuna cu prietenii mei, alergam prin livezi, ne scaldiam in rau si ne jucam de-a v-ati ascunselea prin padure.

Acele zile frumoase au trecut demult, dar amintirea lor ramane vie in sufletul meu.`,
    difficulty: 5,
    genre: 'memoir',
    era: '19th-century',
    wordCount: 175,
    source: 'Ion Creanga - Amintiri din copilarie',
    license: 'Public Domain',
  },
  {
    id: 'story-enigma-otiliei',
    title: 'Enigma Otiliei',
    titleEn: 'The Enigma of Otilia',
    author: 'George Calinescu',
    excerpt: `Intr-o seara de vara, Felix Sima sosi in Bucuresti. Era student la Medicina si venise sa locuiasca la unchiul sau, Costache Giurgiuveanu.

Casa din strada Antim era mare si veche, cu ziduri groase si ferestre inalte. Cand Felix a intrat in curte, a vazut o fata tanara care citea pe o banca, sub un tei batran.

Fata era Otilia, pupila unchiului Costache. Avea parul negru si ochii mari, plini de mister. Cand l-a vazut pe Felix, s-a ridicat si l-a privit curios.

"Tu trebuie sa fii Felix," a spus ea zambitoare. "Unchiul mi-a vorbit despre tine."

Felix a ramas fascinat de frumusetea Otiliei. In zilele care au urmat, cei doi au petrecut mult timp impreuna, plimbandu-se prin parcuri si vorbind despre viata si vise.

Dar Felix a observat ca Otilia era o enigma. Niciodata nu stia exact ce gandeste sau ce simte. Era vesela si trista in acelasi timp, apropiata si distanta.`,
    difficulty: 6,
    genre: 'fiction',
    era: '20th-century',
    wordCount: 180,
    source: 'George Calinescu - Enigma Otiliei',
    license: 'Public Domain (excerpt)',
  },

  // ============================================
  // POETRY
  // ============================================
  {
    id: 'story-luceafarul',
    title: 'Luceafarul',
    titleEn: 'The Evening Star',
    author: 'Mihai Eminescu',
    excerpt: `A fost odata ca-n povesti,
A fost ca niciodata,
Din rude mari imparatesti,
O prea frumoasa fata.

Si era una la parinti
Si mindra-n toate cele,
Cum e Fecioara intre sfinti
Si luna intre stele.

Din umbra falnicelor bolti
Ea pasul si-l indreapta
Linga fereastra, unde-Loss'n colti
Luceste alba noapte.

Si cand in mers o raza-Loss'n fata-i se ivea,
Pe chapt punandu-si mana,
Oftare-Loss'n inima sa-mi ia,
Iubirea-mi e si stearsa.

Privea in zare cum pe mari
Rasare si straluce,
Pe miscatoarele carari
Corabi le trece-Loss'n duce.

Venea un vant de primavara
Si facea flori sa creasca,
Dar ea era tot asa de rara
Ca luna romaneasca.`,
    difficulty: 7,
    genre: 'poetry',
    era: '19th-century',
    wordCount: 140,
    source: 'Mihai Eminescu - Poezii',
    license: 'Public Domain',
  },
  {
    id: 'story-sara-pe-deal',
    title: 'Sara pe deal',
    titleEn: 'Evening on the Hill',
    author: 'Mihai Eminescu',
    excerpt: `Sara pe deal buciumul suna cu jale,
Turmele-Loss'n vin, umpland carari si cale,
Sufletul meu arde-n iubire ca para,
Tu esti departe.

Foarte departe, sufletul meu te cheama,
Stelele-Loss'n cer scapara-n neagra ceama,
Inima mea te asteapta cu dor,
Tu nu mai vii.

Luna isi toarce lucirea argintie
Peste campii si ape si vai pustie,
Visul meu dulce esti tu, draga mea,
Tu esti departe.

Codrul macut de jale isi scutura frunza,
Vantul prin frunze un cantec incepe,
Gandurile mele zboara spre tine,
Tu nu mai vii.`,
    difficulty: 6,
    genre: 'poetry',
    era: '19th-century',
    wordCount: 110,
    source: 'Mihai Eminescu - Poezii',
    license: 'Public Domain',
  },

  // ============================================
  // MODERN STORIES
  // ============================================
  {
    id: 'story-modern-bucuresti',
    title: 'O zi in Bucuresti',
    titleEn: 'A Day in Bucharest',
    author: 'Contemporary',
    excerpt: `Maria s-a trezit devreme in acea dimineata de primavara. Soarele abia rasarise deasupra orasului si strazile erau inca linistite.

Dupa ce a baut cafeaua, Maria a iesit din apartamentul ei din Drumul Taberei si s-a indreptat spre metrou. Trenul era aproape gol la ora aceea, si Maria a gasit un loc la fereastra.

A coborat la Unirii si a mers pe jos prin Centrul Vechi. Strazile inguste erau pline de cafenele si magazine cu obiecte de arta. Mirosea a cafea proaspata si a cozonac cald.

Maria s-a oprit la o librarie mica unde a gasit o carte de poezii de Nichita Stanescu. A cumparat-o si s-a asezat pe o banca in Parcul Cismigiu sa citeasca.

Lacul era linistit, cu lebede albe plutind incet pe suprafata apei. Copiii se jucau pe aleile din jur, iar batranii stateau pe banci, vorbind despre vremea de demult.

Era o zi perfecta in Bucuresti.`,
    difficulty: 4,
    genre: 'fiction',
    era: 'modern',
    wordCount: 170,
    source: 'Original content for learning',
    license: 'CC-BY 4.0',
  },
  {
    id: 'story-la-tara',
    title: 'Vacanta la tara',
    titleEn: 'Vacation in the Countryside',
    author: 'Contemporary',
    excerpt: `In fiecare vara, familia Popescu mergea la bunici, la tara. Bunicii locuiau intr-un sat mic din Moldova, infundat printre dealuri verzi.

Casa bunicilor era veche, cu acoperis de sindrila si pereti albi. In curte erau pomi fructiferi: meri, peri si ciresi. Bunica facea cea mai buna placinta din toate merele acelea.

Andrei, nepotul lor de zece ani, astepta tot anul vacanta la tara. Acolo putea sa alerge liber prin livada, sa se joace cu cainele Grivei si sa ajute la bunic la grajd.

Dimineata se trezea cu cantecul cocosului. Mirosul painii coapte in cuptor il chema in bucatarie, unde bunica il astepta cu un pahar de lapte proaspat.

Dupa micul dejun, Andrei pleca sa exploreze. Uneori mergea la rau sa pescuiasca, alteori se catara in copaci sau se ascundea prin fan.

Serile erau cele mai frumoase. Toata familia se aduna pe prispa si asculta povestile bunicului despre vremurile de demult.`,
    difficulty: 4,
    genre: 'fiction',
    era: 'modern',
    wordCount: 185,
    source: 'Original content for learning',
    license: 'CC-BY 4.0',
  },

  // ============================================
  // MORE FOLKTALES
  // ============================================
  {
    id: 'story-fata-padurii',
    title: 'Fata din dafin',
    titleEn: 'The Girl from the Laurel Tree',
    author: 'Traditional',
    excerpt: `A fost odata un imparat care avea un fiu frumos ca soarele. Printul pleca in fiecare zi la vanatoare in padurea din apropierea castelului.

Intr-o zi, pe cand se odihnea sub un dafin batran, a auzit un cantec mai frumos decat orice auzise vreodata. S-a uitat in copac si a vazut o fata cu parul de aur si ochii verzi ca frunzele.

"Cine esti tu?" a intrebat printul uluit.
"Sunt fata dafinului," a raspuns ea. "Traiesc in copacul acesta de cand lumea."

Printul s-a indragostit de fata si a cerut-o de sotie. Dar fata i-a spus:
"Nu pot parasi copacul meu decat daca cineva il taie. Dar daca copacul moare, si eu voi muri."

Printul a plecat acasa cu inima grea, gandindu-se cum ar putea sa salveze fata din copac fara sa o piarda pe ea.`,
    difficulty: 4,
    genre: 'folktale',
    era: 'traditional',
    wordCount: 165,
    source: 'Traditional Romanian folktale',
    license: 'Public Domain',
  },
  {
    id: 'story-praslea',
    title: 'Praslea cel voinic',
    titleEn: 'Praslea the Brave',
    author: 'Petre Ispirescu',
    excerpt: `Intr-o imparatie de demult traia un imparat care avea trei fii: doi mari si unul mic, pe care-l chema Praslea. Fratii cei mari erau mandri si rasfatati, dar Praslea era harnic si cuminte.

Imparatul avea o gradina cu meri de aur, dar in fiecare noapte venea cineva si fura merele. Nimeni nu stia cine este hotul.

"Cine va prinde hotul," a zis imparatul, "acela va mosteni tronul."

Fratii cei mari au incercat sa pazeasca gradina, dar au adormit. Cand a venit randul lui Praslea, el a ramas treaz toata noaptea.

Pe la miezul noptii, a vazut o pasare de foc zburand spre gradina. Praslea a sarit si a prins o pana din coada pasarii. Pana stralucea ca soarele si lumina intreaga gradina.

A doua zi, Praslea le-a aratat pana fratilor sai. Ei au devenit gelos si au hotarat sa-l pacaleasca pe Praslea.`,
    difficulty: 5,
    genre: 'folktale',
    era: '19th-century',
    wordCount: 175,
    source: 'Petre Ispirescu - Legende sau basmele romanilor',
    license: 'Public Domain',
  },
  {
    id: 'story-ileana-cosanzeana',
    title: 'Ileana Cosanzeana',
    titleEn: 'Ileana Cosanzeana',
    author: 'Petre Ispirescu',
    excerpt: `Se spune ca Ileana Cosanzeana era cea mai frumoasa fata din toata lumea. Parul ei era de aur topit, ochii erau albastri ca cerul, iar zambetul ei lumina si cea mai intunecata noapte.

Ea traia intr-un castel de cristal, pazit de un balaur cu sapte capete. Multi viteji au incercat sa ajunga la ea, dar niciunul nu a reusit sa invinga balaurul.

Intr-o zi, a venit un tanar pe cal alb. Nu era print si nu avea armuri stralucitoare. Era doar un fiu de cioban, dar inima lui era plina de curaj.

"De ce vrei sa o salvezi pe Ileana?" l-a intrebat balaurul.
"Pentru ca nimeni nu merita sa fie inchis," a raspuns tanarul. "Nici cea mai frumoasa fata din lume."

Balaurul a fost atat de impresionat de raspunsul tanarului, incat i-a permis sa treaca. Uneori, cuvintele intelepte sunt mai puternice decat sabiile.`,
    difficulty: 5,
    genre: 'folktale',
    era: '19th-century',
    wordCount: 170,
    source: 'Petre Ispirescu - Legende sau basmele romanilor',
    license: 'Public Domain',
  },

  // ============================================
  // MORE CLASSIC LITERATURE
  // ============================================
  {
    id: 'story-ion',
    title: 'Ion',
    titleEn: 'Ion',
    author: 'Liviu Rebreanu',
    excerpt: `Ion era un tanar tarani din satul Pripas, din Transilvania. Desi era sarac, el visa sa aiba pamant propriu. Pentru el, pamantul era totul - mai important decat dragostea, mai important decat orice.

In sat traiau doua fete: Ana, sarac ca el, pe care o iubea cu adevarat, si Florica, fiica unui gospodar bogat. Ion trebuia sa aleaga intre inima si pamant.

"Ce folos ca o iubesc pe Ana," gandea Ion, "daca ea nu are nimic? Cu Florica as avea pamant, mult pamant."

Si asa, Ion a ales pamantul. S-a casatorit cu Florica nu pentru ca o iubea, ci pentru mosttenirea ei. Dar fericirea cumparata cu pretul sufletului nu dureaza.

Ion a obtinut ce voia - pamant si bunastare. Dar in fiecare noapte, in vis, o vedea pe Ana. Si stia ca a gresit.`,
    difficulty: 6,
    genre: 'fiction',
    era: '20th-century',
    wordCount: 165,
    source: 'Liviu Rebreanu - Ion',
    license: 'Public Domain (excerpt)',
  },
  {
    id: 'story-moara-cu-noroc',
    title: 'Moara cu noroc',
    titleEn: 'The Lucky Mill',
    author: 'Ioan Slavici',
    excerpt: `Ghita era un om simplu care visa la o viata mai buna pentru familia sa. Cand a auzit ca moara de la marginea satului e de inchiriat, a vazut o sansa.

"Hai sa luam moara," i-a spus sotiei lui, Ana. "Vom munci si vom prospera."

La inceput, totul a mers bine. Drumetti opreau la moara sa bea un pahar de vin si sa se odihneasca. Ghita si Ana faceau bani si erau fericiti.

Dar apoi a venit Lica, un negustor de porci cu ochi de sarpe si vorbe dulci. Lica i-a oferit lui Ghita o afacere: sa ascunda marfa furata in moara.

"Nimeni nu va sti," a zis Lica. "Iar tu vei fi bogat."

Ghita a ezitat. Stia ca e gresit. Dar gandul la bani l-a orbit. Si asa a inceput caderea lui.

Norocul morii s-a transformat incet in blestem.`,
    difficulty: 6,
    genre: 'fiction',
    era: '19th-century',
    wordCount: 170,
    source: 'Ioan Slavici - Moara cu noroc',
    license: 'Public Domain (excerpt)',
  },
  {
    id: 'story-padurea-spanzuratilor',
    title: 'Padurea spanzuratilor',
    titleEn: 'The Forest of the Hanged',
    author: 'Liviu Rebreanu',
    excerpt: `Apostol Bologa era ofiter in armata austro-ungara in timpul Primului Razboi Mondial. Desi roman de neam, era obligat sa lupte impotriva fratilor sai.

In fiecare zi, dilema il chinuia: sa fie loial juramantului facut sau sa asculte de glasul sangelui?

"Ce inseamna datoria?" se intreba Apostol. "Datoria fata de cine? Fata de un imperiu care ne oprima sau fata de poporul din care ma trag?"

Intr-o zi, a fost trimis sa execute un soldat roman care dezertase. Privind in ochii condamnatului, Apostol a vazut propria sa dilema oglindita.

A inteles ca nu poate trage. Nu in fratele sau.

Dar in razboi, refuzul de a ucide poate insemna moarte sigura. Apostol stia asta. Si totusi, a ales sa ramana om.`,
    difficulty: 8,
    genre: 'fiction',
    era: '20th-century',
    wordCount: 155,
    source: 'Liviu Rebreanu - Padurea spanzuratilor',
    license: 'Public Domain (excerpt)',
  },

  // ============================================
  // MORE POETRY
  // ============================================
  {
    id: 'story-scrisoarea-iii',
    title: 'Scrisoarea III',
    titleEn: 'Letter III',
    author: 'Mihai Eminescu',
    excerpt: `Unde-Loss'n ceruri senine Luceafarul rasare,
Din negura de vremi acolo moartea a lasat urma,
Acolo sufletul se-Loss'ntreaba: "Ce-Loss'n veacul veacului nu moare?"
Si glasul vremii-Loss'n raspuns sopteste tainic: "Numai urma."

Pe cand lumea toata doarme-Loss'n noapte,
Trecut-au ani si veacuri, si totusi noi vedem
Pe bolta-Loss'nstelata aceleasi stele-Loss'napte
Ce-au luminat si Mircea, si Stefan cel Batran.

Sub acelasi cer albastru au trait eroii nostri,
Sub aceleasi stele s-au nascut si au murit,
Si desi au pierit de mult, faptele lor
Raman etern in inima neamului iubit.

Ce-Loss'n veac se scrie nu moare niciodata,
Caci scrisul, ca si steaua, trece peste ani,
Si-Loss'n vremuri ce vor fi, frumusetea toata
Va straluci la fel de vie ca-Loss'n zilele de azi.`,
    difficulty: 7,
    genre: 'poetry',
    era: '19th-century',
    wordCount: 145,
    source: 'Mihai Eminescu - Poezii',
    license: 'Public Domain',
  },
  {
    id: 'story-testament',
    title: 'Testament',
    titleEn: 'Testament',
    author: 'Tudor Arghezi',
    excerpt: `Nu-Loss'nti voi lasa drept mostenire, fiule,
Nici ogoare largi, nici case inalte,
Ci doar un nume curat si-Loss'n suflet
Cuvinte multe, frumoase si sfinte.

Cartea pe care o scriu e toata viata mea,
Fiecare litera e o suferinta,
Fiecare pagina e o bucurie,
Si fiecare rand e o nadejde.

Am scris cu cerneala facuta din sange,
Cu pana taiata din propriul meu os,
Ca sa-Loss'nti las tie, dragul meu copil,
Ceva mai de pret decat aurul.

Ia cartea asta si citeste-o bine,
Gandeste-te la tatal tau cand vei citi,
Si sa nu uiti ca tot ce am avut
Ti-am dat prin slove, nu prin averi.`,
    difficulty: 7,
    genre: 'poetry',
    era: '20th-century',
    wordCount: 130,
    source: 'Tudor Arghezi - Poezii',
    license: 'Public Domain',
  },

  // ============================================
  // MORE MODERN STORIES
  // ============================================
  {
    id: 'story-prima-zi',
    title: 'Prima zi de scoala',
    titleEn: 'First Day of School',
    author: 'Contemporary',
    excerpt: `Maria avea sapte ani si era prima ei zi de scoala. Se trezise de dimineata, entuziasmata dar si putin speriata.

"Ce daca nu-mi voi face prieteni?" se gandea ea. "Ce daca profesoara nu ma va placea?"

Mama ei i-a pregatit micul dejun si i-a impletit parul in doua codite. Tata i-a dat ghiozdanul nou, plin de caiete si creioane colorate.

"Totul va fi bine," i-a spus mama, zambindu-i. "Vei vedea ca scoala e un loc minunat."

Cand a ajuns la scoala, Maria a vazut multi copii de varsta ei. Unii plangeau, altii radeau. O fetita cu par roscat s-a apropiat de ea.

"Buna! Eu sunt Elena. Vrei sa stam impreuna in banca?"

Maria a zambit. Poate ca scoala nu era asa de infricosatoare pana la urma.`,
    difficulty: 3,
    genre: 'fiction',
    era: 'modern',
    wordCount: 155,
    source: 'Original content for learning',
    license: 'CC-BY 4.0',
  },
  {
    id: 'story-bunicul-si-marea',
    title: 'Bunicul si marea',
    titleEn: 'Grandfather and the Sea',
    author: 'Contemporary',
    excerpt: `Bunicul meu a fost pescar toata viata. Traia intr-un satuc mic pe malul Marii Negre, intr-o casuta alba cu obloanele albastre.

In fiecare vara, mergeam la el si impreuna ieseam cu barca pe mare. Bunicul ma invata sa arunc plasa, sa citesc semnele cerului, sa respect apa.

"Marea e ca viata," imi spunea el. "Cateodata e linistita si frumoasa. Altadata e furioasa si periculoasa. Dar intotdeauna e onesta."

Am invatat multe de la bunicul meu. Am invatat sa am rabdare - pestele nu vine cand vrei tu. Am invatat sa fiu atent - furtunile vin fara avertisment. Am invatat sa fiu recunoscator - pentru fiecare zi linistita pe mare.

Acum bunicul nu mai este. Dar de fiecare data cand vad marea, il aud vorbindu-mi.`,
    difficulty: 4,
    genre: 'memoir',
    era: 'modern',
    wordCount: 165,
    source: 'Original content for learning',
    license: 'CC-BY 4.0',
  },
  {
    id: 'story-calatorie-tren',
    title: 'Calatorie cu trenul',
    titleEn: 'Train Journey',
    author: 'Contemporary',
    excerpt: `Trenul pleaca din Bucuresti la ora sase dimineata. Afara e inca intuneric, dar in vagon e cald si luminos.

Ma asez langa fereastra si privesc cum orasul dispare incet in urma. Blocurile gri lasa loc campurilor verzi, apoi dealurilor si muntilor.

O doamna in varsta se aseaza langa mine. Poarta o basma colorata si are ochi calzi.

"Mergeti departe?" ma intreaba ea.
"La Cluj. Merg sa-mi vizitez prietenii."
"Frumos oras, Cluj. Am trait acolo cand eram tanara."

Si incepe sa-mi povesteasca. Despre Cluj, despre viata ei, despre vremurile de demult. Calatorim impreuna prin poveste si prin spatiu, si cele sase ore de drum trec ca un vis.

Cand cobor din tren, o salut pe doamna. Probabil nu o voi mai vedea niciodata. Dar povestile ei vor ramane cu mine.`,
    difficulty: 4,
    genre: 'fiction',
    era: 'modern',
    wordCount: 170,
    source: 'Original content for learning',
    license: 'CC-BY 4.0',
  },
];

/**
 * Get stories filtered by difficulty
 */
export const getStoriesByDifficulty = (minDiff, maxDiff = minDiff) => {
  return ROMANIAN_STORIES.filter(s => s.difficulty >= minDiff && s.difficulty <= maxDiff);
};

/**
 * Get stories by genre
 */
export const getStoriesByGenre = (genre) => {
  return ROMANIAN_STORIES.filter(s => s.genre === genre);
};

/**
 * Get random story
 */
export const getRandomStory = (filter = null) => {
  const items = filter ? ROMANIAN_STORIES.filter(filter) : ROMANIAN_STORIES;
  return items[Math.floor(Math.random() * items.length)];
};

export default ROMANIAN_STORIES;
