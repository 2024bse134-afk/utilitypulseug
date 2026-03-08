// Comprehensive Uganda districts with their towns, villages, and localities
export type LocationData = {
  [district: string]: string[];
};

export const UGANDA_DISTRICTS_TOWNS: LocationData = {
  // Central Region
  "Kampala": [
    "Nakasero", "Kololo", "Wandegeya", "Makerere", "Kamwokya", "Ntinda",
    "Naguru", "Bukoto", "Kisementi", "Old Kampala", "Mengo", "Kisenyi",
    "Katwe", "Nsambya", "Kabalagala", "Kansanga", "Ggaba", "Bugolobi",
    "Muyenga", "Makindye", "Kibuli", "Kawempe", "Bwaise", "Mulago",
    "Nakulabye", "Lubaga", "Ndeeba", "Rubaga", "Kibuye", "Namirembe",
    "Kasubi", "Lungujja", "Busega", "Nansana", "Zana", "Najjanankumbi"
  ],
  "Wakiso": [
    "Entebbe", "Nansana", "Kira", "Makindye Ssabagabo", "Kajjansi",
    "Abayita Ababiri", "Bweyogerere", "Namugongo", "Gayaza", "Kasangati",
    "Matugga", "Kakiri", "Wakiso Town", "Nabweru", "Ssenge", "Katabi",
    "Nsangi", "Buloba", "Gobero", "Namulanda", "Kisubi", "Mpala",
    "Kitende", "Seguku", "Bwebajja", "Nalumunye", "Sonde", "Seeta",
    "Namanve", "Kyaliwajjala", "Kireka", "Nalya", "Naalya", "Bukasa"
  ],
  "Mukono": [
    "Mukono Town", "Seeta", "Namataba", "Lugazi", "Katosi", "Ntenjeru",
    "Buikwe", "Njeru", "Mpatta", "Nakisunga", "Goma", "Nama",
    "Kyampisi", "Koome", "Kasawo", "Nabbaale", "Ssi", "Kimenyedde"
  ],
  "Mpigi": [
    "Mpigi Town", "Nkozi", "Buwama", "Muduma", "Kamengo", "Muduuma",
    "Sekiwunga", "Kiringente", "Bukasa", "Kampiringisa", "Buyinja"
  ],
  "Luwero": [
    "Luwero Town", "Wobulenzi", "Bombo", "Zirobwe", "Bamunanika",
    "Katikamu", "Makulubita", "Nyimbwa", "Kikyusa", "Kamira"
  ],
  "Kayunga": [
    "Kayunga Town", "Busana", "Kangulumira", "Nazigo", "Galiraaya",
    "Kayonza", "Kitimbwa", "Bbaale", "Wantoni", "Nabuganyi"
  ],
  "Buikwe": [
    "Lugazi", "Njeru", "Ssi Bukunja", "Nkokonjeru", "Kawolo",
    "Nyenga", "Buikwe Town", "Ngogwe", "Wakisi", "Nabitula"
  ],
  "Masaka": [
    "Masaka City", "Nyendo", "Kimanya", "Bukakkata", "Kijjabwemi",
    "Bukakata", "Kyesiiga", "Buwunga", "Mukungwe", "Kabonera"
  ],
  "Mityana": [
    "Mityana Town", "Busimbi", "Malangala", "Kalangalo", "Namutamba",
    "Ssekanyonyi", "Zigoti", "Butayunja", "Kakindu", "Kikandwa"
  ],
  "Nakasongola": [
    "Nakasongola Town", "Lwampanga", "Nakitoma", "Kalungi", "Wabinyonyi",
    "Kakooge", "Lwabyata", "Nabiswera"
  ],
  "Nakaseke": [
    "Nakaseke Town", "Semuto", "Kinyogoga", "Ngoma", "Kasangombe",
    "Wakyato", "Kikamulo", "Nakaseke Central"
  ],

  // Western Region
  "Mbarara": [
    "Mbarara City", "Kakoba", "Kamukuzi", "Nyamitanga", "Biharwe",
    "Kakiika", "Rubindi", "Rugando", "Kashare", "Nyakayojo",
    "Rwampara", "Bugamba", "Ndeija", "Mwizi", "Kashari"
  ],
  "Bushenyi": [
    "Bushenyi Town", "Ishaka", "Kizinda", "Nyabubare", "Kyeizooba",
    "Kakanju", "Bumbaire", "Kyamuhunga", "Ruhumuro", "Nsiika"
  ],
  "Sheema": [
    "Kabwohe", "Itendero", "Shuuku", "Masheruka", "Kigarama",
    "Kagango", "Kyangyenyi", "Rwanama", "Bugongi"
  ],
  "Ntungamo": [
    "Ntungamo Town", "Rubaare", "Kitwe", "Rwashamaire", "Itojo",
    "Kayonza", "Nyakyera", "Rugarama", "Ngoma", "Bwongyera"
  ],
  "Kabale": [
    "Kabale Town", "Katuna", "Rubanda", "Kisoro", "Maziba",
    "Kaharo", "Buhara", "Kyanamira", "Hamurwa", "Kamwezi"
  ],
  "Kasese": [
    "Kasese Town", "Hima", "Kilembe", "Muhokya", "Maliba",
    "Bwera", "Mpondwe", "Kagando", "Karusandara", "Kiburara"
  ],
  "Fort Portal": [
    "Fort Portal City", "Kabarole", "Rwimi", "Kibiito", "Kijura",
    "Harugongo", "Rubona", "Mugusu", "Kichwamba", "Bukuku"
  ],
  "Hoima": [
    "Hoima City", "Buhimba", "Kigorobya", "Kitoba", "Buseruka",
    "Kyabigambire", "Kabwoya", "Bugahya", "Mparo", "Kiziranfumbi"
  ],
  "Masindi": [
    "Masindi Town", "Kigumba", "Bwijanga", "Pakanyi", "Budongo",
    "Miirya", "Karujubu", "Kimengo", "Nyantonzi"
  ],
  "Ibanda": [
    "Ibanda Town", "Ishongororo", "Bisheshe", "Nyarukiika",
    "Kagongo", "Kikyenkye", "Rukiri", "Bufunda"
  ],
  "Isingiro": [
    "Isingiro Town", "Kabuyanda", "Rugaaga", "Endiinzi",
    "Birere", "Nakivale", "Rushasha", "Mbaare"
  ],
  "Kiruhura": [
    "Kiruhura Town", "Kinoni", "Sanga", "Kanyaryeru",
    "Kazo", "Rwemikoma", "Kanoni", "Buremba"
  ],
  "Kibaale": [
    "Kibaale Town", "Kagadi", "Mugarama", "Muhoro",
    "Mabaale", "Kakumiro", "Nalweyo", "Kisiita"
  ],
  "Kyenjojo": [
    "Kyenjojo Town", "Katooke", "Butunduzi", "Kyarusozi",
    "Kihuura", "Nyankwanzi", "Rwangaaju"
  ],
  "Kamwenge": [
    "Kamwenge Town", "Kibale", "Biguli", "Mahyoro",
    "Nkoma", "Kahunge", "Ntara"
  ],
  "Rubirizi": [
    "Rubirizi Town", "Ryeru", "Magambo", "Katunguru",
    "Kichwamba", "Bunyaruguru"
  ],
  "Buhweju": [
    "Nsiika", "Bihanga", "Engaju", "Karungu",
    "Burere", "Nyakishana"
  ],
  "Mitooma": [
    "Mitooma Town", "Kanyabwanga", "Bitereko", "Kashenshero",
    "Rweibare", "Mutara"
  ],
  "Kanungu": [
    "Kanungu Town", "Kambuga", "Butogota", "Kihihi",
    "Kayonza", "Mpungu", "Rutenga"
  ],
  "Kisoro": [
    "Kisoro Town", "Bunagana", "Cyanika", "Nyakabande",
    "Muramba", "Nyarusiza", "Nyundo"
  ],
  "Rubanda": [
    "Rubanda Town", "Ikumba", "Hamurwa", "Bufundi",
    "Muko", "Bubaare"
  ],
  "Bundibugyo": [
    "Bundibugyo Town", "Nyahuka", "Bubandi", "Bukonzo",
    "Ntandi", "Harugale", "Kirumya"
  ],

  // Eastern Region
  "Jinja": [
    "Jinja City", "Bugembe", "Kakira", "Buwenge", "Mafubira",
    "Budondo", "Busede", "Buyengo", "Kakaire", "Kimaka",
    "Walukuba", "Mpumudde", "Masese"
  ],
  "Mbale": [
    "Mbale City", "Nakaloke", "Wanale", "Bungokho", "Bufumbo",
    "Namanyonyi", "Busoba", "Busiu", "Industrial Division",
    "Nkoma", "Malukhu"
  ],
  "Tororo": [
    "Tororo Town", "Nagongera", "Mukujju", "Malaba", "Rubongi",
    "Mulanda", "Paya", "Kwapa", "Mella", "Osukuru"
  ],
  "Iganga": [
    "Iganga Town", "Busembatia", "Nakigo", "Bugweri",
    "Nakalama", "Namungalwe", "Buyanga", "Ibulanku"
  ],
  "Soroti": [
    "Soroti City", "Arapai", "Kamuda", "Katine", "Tubur",
    "Asuret", "Gweri", "Lale", "Aloet", "Opiyai"
  ],
  "Bugiri": [
    "Bugiri Town", "Busia", "Nankoma", "Kapyanga",
    "Bulidha", "Nabukalu", "Muterere"
  ],
  "Busia": [
    "Busia Town", "Majanji", "Lumino", "Dabani",
    "Masafu", "Busitema", "Buhehe"
  ],
  "Sironko": [
    "Sironko Town", "Budadiri", "Buyobo", "Masaba",
    "Buginyanya", "Bumulimba", "Bukiise"
  ],
  "Kapchorwa": [
    "Kapchorwa Town", "Sipi", "Kween", "Kapchesombe",
    "Tegeres", "Bukwo", "Chepkwasta"
  ],
  "Pallisa": [
    "Pallisa Town", "Kibuku", "Budaka", "Kameruka",
    "Butebo", "Kamuge", "Gogonyo"
  ],
  "Kamuli": [
    "Kamuli Town", "Namwendwa", "Mbulamuti", "Balawoli",
    "Nabwigulu", "Namugongo", "Kitayunjwa", "Bugulumbya"
  ],
  "Kumi": [
    "Kumi Town", "Ngora", "Malera", "Ongino",
    "Mukongoro", "Atutur", "Kolir"
  ],
  "Katakwi": [
    "Katakwi Town", "Ngariam", "Toroma", "Magoro",
    "Usuk", "Kapujan", "Obalanga"
  ],
  "Amuria": [
    "Amuria Town", "Asamuk", "Kapelebyong", "Orungo",
    "Acowa", "Morungatuny", "Wera"
  ],
  "Butaleja": [
    "Butaleja Town", "Busolwe", "Mazimasa", "Budumba",
    "Nawanjofu", "Himutu"
  ],
  "Manafwa": [
    "Manafwa Town", "Bubulo", "Bukigai", "Bupoto",
    "Butiru", "Bumbo", "Nalondo"
  ],
  "Bududa": [
    "Bududa Town", "Bukigai", "Bukalasi", "Bumayoka",
    "Bulucheke", "Bushika", "Bududa Central"
  ],

  // Northern Region
  "Gulu": [
    "Gulu City", "Laroo", "Layibi", "Pece", "Bardege",
    "Bungatira", "Bobi", "Patiko", "Lakwana", "Awach",
    "Unyama", "Lalogi", "Koro"
  ],
  "Lira": [
    "Lira City", "Ojwina", "Adyel", "Barr", "Agali",
    "Ogur", "Aromo", "Lira Palwo", "Amach", "Agweng",
    "Railways Division", "Central Division"
  ],
  "Kitgum": [
    "Kitgum Town", "Mucwini", "Labongo Akwang", "Namokora",
    "Omiya Anyima", "Orom", "Palavek", "Kitgum Matidi"
  ],
  "Pader": [
    "Pader Town", "Atanga", "Lacekocot", "Pajule",
    "Awere", "Kilak", "Ogom", "Puranga"
  ],
  "Arua": [
    "Arua City", "Manibe", "Oli", "Pajulu", "Dadamu",
    "Adumi", "Vurra", "Ayivu", "Arivu", "Offaka",
    "Logiri", "River Oli Division"
  ],
  "Nebbi": [
    "Nebbi Town", "Pakwach", "Panyimur", "Wadelai",
    "Erussi", "Kucwiny", "Nyaravur", "Parombo"
  ],
  "Moyo": [
    "Moyo Town", "Obongi", "Metu", "Lefori",
    "Itula", "Dufile", "Moyo Central"
  ],
  "Adjumani": [
    "Adjumani Town", "Ciforo", "Pakele", "Dzaipi",
    "Ofua", "Itirikwa", "Adropi"
  ],
  "Apac": [
    "Apac Town", "Aduku", "Ibuje", "Chegere",
    "Inomo", "Nambieso", "Chawente"
  ],
  "Oyam": [
    "Oyam Town", "Minakulu", "Aber", "Ngai",
    "Iceme", "Kamdini", "Loro"
  ],
  "Dokolo": [
    "Dokolo Town", "Agwata", "Bata", "Kangai",
    "Okwongodul", "Amwoma"
  ],
  "Amolatar": [
    "Amolatar Town", "Namasale", "Kioga", "Muntu",
    "Awelo", "Etam"
  ],
  "Nwoya": [
    "Anaka", "Koch Goma", "Alero", "Purongo",
    "Got Apwoyo"
  ],
  "Agago": [
    "Kalongo", "Adilang", "Paimol", "Lira Palwo",
    "Lamiyo", "Omot", "Wol"
  ],
  "Lamwo": [
    "Padibe", "Palabek Kal", "Agoro", "Lokung",
    "Madi Opei", "Palabek Gem"
  ],
  "Kotido": [
    "Kotido Town", "Kacheri", "Rengen", "Nakapelimoru",
    "Panyangara", "Kanawat"
  ],
  "Kaabong": [
    "Kaabong Town", "Kapedo", "Kathile", "Lolelia",
    "Karenga", "Lobalangit"
  ],
  "Moroto": [
    "Moroto Town", "Nadunget", "Katikekile", "Rupa",
    "Tapac", "Ngoleriet"
  ],
  "Nakapiripirit": [
    "Nakapiripirit Town", "Amudat", "Karita", "Loroo",
    "Lolachat", "Namalu"
  ],
  "Abim": [
    "Abim Town", "Alerek", "Lotuke", "Morulem",
    "Nyakwae", "Abim Central"
  ],
  "Yumbe": [
    "Yumbe Town", "Midigo", "Kei", "Romogi",
    "Drajini", "Lodonga"
  ],
  "Koboko": [
    "Koboko Town", "Ludara", "Lobule", "Kuluba",
    "Dranya", "Midia"
  ],
  "Maracha": [
    "Maracha Town", "Nyadri", "Oluvu", "Tara",
    "Yivu", "Oleba"
  ],
  "Zombo": [
    "Zombo Town", "Paidha", "Warr", "Nyapea",
    "Atyak", "Kango"
  ],

  // West Nile
  "Pakwach": [
    "Pakwach Town", "Panyimur", "Pakwach Central",
    "Albert Nile", "Alwi"
  ],
  "Madi-Okollo": [
    "Okollo", "Offaka", "Ogoko", "Aii-vu"
  ],

  // Ankole Sub-region
  "Bwizibwera": [
    "Bwizibwera Town", "Rwanyamahembe", "Nyakashashara",
    "Kakoba", "Rugando", "Biharwe"
  ],

  // Rwenzori Sub-region
  "Kabarole": [
    "Fort Portal City", "Rwimi", "Kibiito", "Kijura",
    "Harugongo", "Rubona", "Mugusu"
  ],

  // Bunyoro Sub-region
  "Kiryandongo": [
    "Kiryandongo Town", "Bweyale", "Kigumba", "Mutunda",
    "Kiryandongo Central"
  ],
  "Kagadi": [
    "Kagadi Town", "Muhoro", "Mabaale", "Ndaiga",
    "Muganzi", "Kyaterekera"
  ],
  "Kakumiro": [
    "Kakumiro Town", "Kibaale", "Nalweyo", "Igayaza",
    "Kakindo"
  ],
  "Buliisa": [
    "Buliisa Town", "Biiso", "Butiaba", "Kigwera",
    "Ngwedo"
  ],
};

// Helper to get sorted district names
export const getDistricts = (): string[] => {
  return Object.keys(UGANDA_DISTRICTS_TOWNS).sort();
};

// Helper to get towns/villages for a district
export const getTownsForDistrict = (district: string): string[] => {
  return UGANDA_DISTRICTS_TOWNS[district] || [];
};

// All regions for filtering
export const UGANDA_REGIONS: Record<string, string[]> = {
  "Central": ["Kampala", "Wakiso", "Mukono", "Mpigi", "Luwero", "Kayunga", "Buikwe", "Masaka", "Mityana", "Nakasongola", "Nakaseke"],
  "Western": ["Mbarara", "Bushenyi", "Sheema", "Ntungamo", "Kabale", "Kasese", "Fort Portal", "Hoima", "Masindi", "Ibanda", "Isingiro", "Kiruhura", "Kibaale", "Kyenjojo", "Kamwenge", "Rubirizi", "Buhweju", "Mitooma", "Kanungu", "Kisoro", "Rubanda", "Bundibugyo", "Kabarole", "Kiryandongo", "Kagadi", "Kakumiro", "Buliisa"],
  "Eastern": ["Jinja", "Mbale", "Tororo", "Iganga", "Soroti", "Bugiri", "Busia", "Sironko", "Kapchorwa", "Pallisa", "Kamuli", "Kumi", "Katakwi", "Amuria", "Butaleja", "Manafwa", "Bududa"],
  "Northern": ["Gulu", "Lira", "Kitgum", "Pader", "Arua", "Nebbi", "Moyo", "Adjumani", "Apac", "Oyam", "Dokolo", "Amolatar", "Nwoya", "Agago", "Lamwo", "Kotido", "Kaabong", "Moroto", "Nakapiripirit", "Abim", "Yumbe", "Koboko", "Maracha", "Zombo", "Pakwach", "Madi-Okollo"],
};
