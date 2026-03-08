// Comprehensive Uganda districts with their towns, villages, and localities
// All 135+ districts of Uganda with key towns and trading centers
export type LocationData = {
  [district: string]: string[];
};

export const UGANDA_DISTRICTS_TOWNS: LocationData = {
  // ========== CENTRAL REGION ==========
  "Bukomansimbi": [
    "Bukomansimbi Town", "Kibinge", "Bigasa", "Butenga", "Kitanda",
    "Kabaale", "Butaama", "Kyankoole"
  ],
  "Buikwe": [
    "Lugazi", "Njeru", "Ssi Bukunja", "Nkokonjeru", "Kawolo",
    "Nyenga", "Buikwe Town", "Ngogwe", "Wakisi", "Nabitula",
    "Ssi", "Naminya", "Najjembe"
  ],
  "Butambala": [
    "Gombe", "Butambala Town", "Kalamba", "Budde", "Ngando",
    "Bulo", "Kitimba", "Kibibi"
  ],
  "Gomba": [
    "Kanoni", "Gomba Town", "Maddu", "Kabulasoke",
    "Mpenja", "Kyamulibwa"
  ],
  "Kalangala": [
    "Kalangala Town", "Bufumira", "Bukasa Island", "Mazinga",
    "Bujumba", "Mugoye", "Kyamuswa"
  ],
  "Kalungu": [
    "Kalungu Town", "Lukaya", "Bukulula", "Lwabenge",
    "Kyamulibwa", "Ndagwe"
  ],
  "Kampala": [
    "Nakasero", "Kololo", "Wandegeya", "Makerere", "Kamwokya", "Ntinda",
    "Naguru", "Bukoto", "Kisementi", "Old Kampala", "Mengo", "Kisenyi",
    "Katwe", "Nsambya", "Kabalagala", "Kansanga", "Ggaba", "Bugolobi",
    "Muyenga", "Makindye", "Kibuli", "Kawempe", "Bwaise", "Mulago",
    "Nakulabye", "Lubaga", "Ndeeba", "Rubaga", "Kibuye", "Namirembe",
    "Kasubi", "Lungujja", "Busega", "Nansana", "Zana", "Najjanankumbi",
    "Luzira", "Mutungo", "Butabika", "Kireka", "Banda", "Kyambogo",
    "Kiwatule", "Naalya", "Kyanja", "Komamboga", "Mpererwe", "Kisaasi"
  ],
  "Kassanda": [
    "Kassanda Town", "Myanzi", "Kalwana", "Bukuya",
    "Kitumbi", "Nalutuntu"
  ],
  "Kayunga": [
    "Kayunga Town", "Busana", "Kangulumira", "Nazigo", "Galiraaya",
    "Kayonza", "Kitimbwa", "Bbaale", "Wantoni", "Nabuganyi",
    "Ntenjeru", "Busaana"
  ],
  "Kiboga": [
    "Kiboga Town", "Dwaniro", "Bukomero", "Kapeke",
    "Lwamata", "Muwanga"
  ],
  "Kyankwanzi": [
    "Kyankwanzi Town", "Butemba", "Ntwetwe", "Gayaza",
    "Nsambya", "Wattuba"
  ],
  "Luwero": [
    "Luwero Town", "Wobulenzi", "Bombo", "Zirobwe", "Bamunanika",
    "Katikamu", "Makulubita", "Nyimbwa", "Kikyusa", "Kamira",
    "Kasana", "Butuntumula", "Luwero Central"
  ],
  "Lwengo": [
    "Lwengo Town", "Kyazanga", "Ndagwe", "Kisekka",
    "Lwengo Central", "Kkingo"
  ],
  "Lyantonde": [
    "Lyantonde Town", "Kinuuka", "Lyantonde Central",
    "Mpumudde", "Kaliiro"
  ],
  "Masaka": [
    "Masaka City", "Nyendo", "Kimanya", "Bukakkata", "Kijjabwemi",
    "Bukakata", "Kyesiiga", "Buwunga", "Mukungwe", "Kabonera",
    "Katwe", "Senyange", "Kimaanya-Kyabakuza"
  ],
  "Mityana": [
    "Mityana Town", "Busimbi", "Malangala", "Kalangalo", "Namutamba",
    "Ssekanyonyi", "Zigoti", "Butayunja", "Kakindu", "Kikandwa",
    "Maanyi", "Bbanda"
  ],
  "Mpigi": [
    "Mpigi Town", "Nkozi", "Buwama", "Muduma", "Kamengo", "Muduuma",
    "Sekiwunga", "Kiringente", "Bukasa", "Kampiringisa", "Buyinja",
    "Bujuuko", "Kituntu"
  ],
  "Mubende": [
    "Mubende Town", "Kasambya", "Kitenga", "Kiganda",
    "Madudu", "Bagezza", "Butoloogo", "Bukuya"
  ],
  "Mukono": [
    "Mukono Town", "Seeta", "Namataba", "Lugazi", "Katosi", "Ntenjeru",
    "Mpatta", "Nakisunga", "Goma", "Nama", "Kyampisi", "Koome",
    "Kasawo", "Nabbaale", "Kimenyedde", "Kyetume", "Kalagi"
  ],
  "Nakaseke": [
    "Nakaseke Town", "Semuto", "Kinyogoga", "Ngoma", "Kasangombe",
    "Wakyato", "Kikamulo", "Nakaseke Central", "Kiwoko"
  ],
  "Nakasongola": [
    "Nakasongola Town", "Lwampanga", "Nakitoma", "Kalungi", "Wabinyonyi",
    "Kakooge", "Lwabyata", "Nabiswera", "Kaliro"
  ],
  "Rakai": [
    "Rakai Town", "Kyotera", "Kalisizo", "Byakabanda",
    "Lwamaggwa", "Kasasa", "Nabigasa", "Kifamba"
  ],
  "Sembabule": [
    "Sembabule Town", "Mateete", "Lugusulu", "Ntuusi",
    "Mijwala", "Sembabule Central"
  ],
  "Wakiso": [
    "Entebbe", "Nansana", "Kira", "Makindye Ssabagabo", "Kajjansi",
    "Abayita Ababiri", "Bweyogerere", "Namugongo", "Gayaza", "Kasangati",
    "Matugga", "Kakiri", "Wakiso Town", "Nabweru", "Ssenge", "Katabi",
    "Nsangi", "Buloba", "Gobero", "Namulanda", "Kisubi", "Mpala",
    "Kitende", "Seguku", "Bwebajja", "Nalumunye", "Sonde", "Seeta",
    "Namanve", "Kyaliwajjala", "Kireka", "Nalya", "Naalya", "Bukasa",
    "Kigungu", "Bulenga", "Dundu", "Katale", "Ssisa"
  ],

  // ========== WESTERN REGION ==========
  "Buhweju": [
    "Nsiika", "Bihanga", "Engaju", "Karungu", "Burere",
    "Nyakishana", "Bihanga Town"
  ],
  "Buliisa": [
    "Buliisa Town", "Biiso", "Butiaba", "Kigwera",
    "Ngwedo", "Buliisa Central"
  ],
  "Bundibugyo": [
    "Bundibugyo Town", "Nyahuka", "Bubandi", "Bukonzo",
    "Ntandi", "Harugale", "Kirumya", "Kasitu"
  ],
  "Bushenyi": [
    "Bushenyi Town", "Ishaka", "Kizinda", "Nyabubare", "Kyeizooba",
    "Kakanju", "Bumbaire", "Kyamuhunga", "Ruhumuro", "Nsiika",
    "Kyanamira", "Nyakabirizi"
  ],
  "Fort Portal": [
    "Fort Portal City", "Kabarole", "Rwimi", "Kibiito", "Kijura",
    "Harugongo", "Rubona", "Mugusu", "Kichwamba", "Bukuku",
    "Karambi", "Kicwamba"
  ],
  "Hoima": [
    "Hoima City", "Buhimba", "Kigorobya", "Kitoba", "Buseruka",
    "Kyabigambire", "Kabwoya", "Bugahya", "Mparo", "Kiziranfumbi",
    "Munteme", "Kahoora"
  ],
  "Ibanda": [
    "Ibanda Town", "Ishongororo", "Bisheshe", "Nyarukiika",
    "Kagongo", "Kikyenkye", "Rukiri", "Bufunda", "Kitura"
  ],
  "Isingiro": [
    "Isingiro Town", "Kabuyanda", "Rugaaga", "Endiinzi",
    "Birere", "Nakivale", "Rushasha", "Mbaare", "Kabingo",
    "Rwembogo", "Ngarama"
  ],
  "Kabale": [
    "Kabale Town", "Katuna", "Maziba", "Kaharo", "Buhara",
    "Kyanamira", "Hamurwa", "Kamwezi", "Kitumba", "Bukinda",
    "Rubaya", "Ikumba", "Muko"
  ],
  "Kabarole": [
    "Fort Portal City", "Rwimi", "Kibiito", "Kijura",
    "Harugongo", "Rubona", "Mugusu", "Kichwamba", "Hakibale"
  ],
  "Kagadi": [
    "Kagadi Town", "Muhoro", "Mabaale", "Ndaiga",
    "Muganzi", "Kyaterekera", "Isunga"
  ],
  "Kakumiro": [
    "Kakumiro Town", "Kibaale", "Nalweyo", "Igayaza",
    "Kakindo", "Kitegwa"
  ],
  "Kamwenge": [
    "Kamwenge Town", "Kibale", "Biguli", "Mahyoro",
    "Nkoma", "Kahunge", "Ntara", "Bwizi"
  ],
  "Kanungu": [
    "Kanungu Town", "Kambuga", "Butogota", "Kihihi",
    "Kayonza", "Mpungu", "Rutenga", "Bwindi"
  ],
  "Kasese": [
    "Kasese Town", "Hima", "Kilembe", "Muhokya", "Maliba",
    "Bwera", "Mpondwe", "Kagando", "Karusandara", "Kiburara",
    "Katwe", "Kahendero", "Kyondo", "Isango"
  ],
  "Kazo": [
    "Kazo Town", "Rwemikoma", "Buremba", "Engari",
    "Nkungu", "Magondo"
  ],
  "Kibaale": [
    "Kibaale Town", "Kagadi", "Mugarama", "Muhoro",
    "Mabaale", "Nalweyo", "Kisiita", "Kakabara"
  ],
  "Kiruhura": [
    "Kiruhura Town", "Kinoni", "Sanga", "Kanyaryeru",
    "Kanoni", "Kashongi", "Kenshunga"
  ],
  "Kiryandongo": [
    "Kiryandongo Town", "Bweyale", "Kigumba", "Mutunda",
    "Kiryandongo Central", "Karuma"
  ],
  "Kisoro": [
    "Kisoro Town", "Bunagana", "Cyanika", "Nyakabande",
    "Muramba", "Nyarusiza", "Nyundo", "Nkuringo", "Mgahinga"
  ],
  "Kyegegwa": [
    "Kyegegwa Town", "Hapuuyo", "Mpara", "Kakabara",
    "Kasule", "Migongwe"
  ],
  "Kyenjojo": [
    "Kyenjojo Town", "Katooke", "Butunduzi", "Kyarusozi",
    "Kihuura", "Nyankwanzi", "Rwangaaju", "Katoke"
  ],
  "Masindi": [
    "Masindi Town", "Kigumba", "Bwijanga", "Pakanyi", "Budongo",
    "Miirya", "Karujubu", "Kimengo", "Nyantonzi", "Masindi Port"
  ],
  "Mbarara": [
    "Mbarara City", "Kakoba", "Kamukuzi", "Nyamitanga", "Biharwe",
    "Kakiika", "Rubindi", "Rugando", "Kashare", "Nyakayojo",
    "Rwampara", "Bugamba", "Ndeija", "Mwizi", "Kashari",
    "Ruti", "Bwizibwera", "Rubaya"
  ],
  "Mitooma": [
    "Mitooma Town", "Kanyabwanga", "Bitereko", "Kashenshero",
    "Rweibare", "Mutara", "Kigezi"
  ],
  "Ntoroko": [
    "Ntoroko Town", "Karugutu", "Rwebisengo", "Kanara",
    "Butungama"
  ],
  "Ntungamo": [
    "Ntungamo Town", "Rubaare", "Kitwe", "Rwashamaire", "Itojo",
    "Kayonza", "Nyakyera", "Rugarama", "Ngoma", "Bwongyera",
    "Ruhaama", "Kyaruhanga"
  ],
  "Rubanda": [
    "Rubanda Town", "Ikumba", "Hamurwa", "Bufundi",
    "Muko", "Bubaare", "Nyamweru"
  ],
  "Rubirizi": [
    "Rubirizi Town", "Ryeru", "Magambo", "Katunguru",
    "Kichwamba", "Bunyaruguru", "Hamukungu"
  ],
  "Rukiga": [
    "Rukiga Town", "Kamwezi", "Rwamucucu", "Mparo",
    "Muhanga", "Kashambya"
  ],
  "Rukungiri": [
    "Rukungiri Town", "Nyakagyeme", "Buyanja", "Kebisoni",
    "Nyarushanje", "Ruhinda", "Bwambara", "Nyakishenyi"
  ],
  "Rwampara": [
    "Rwampara Town", "Mugamba", "Mwizi", "Bugamba",
    "Ndeija", "Kashari"
  ],
  "Sheema": [
    "Kabwohe", "Itendero", "Shuuku", "Masheruka", "Kigarama",
    "Kagango", "Kyangyenyi", "Rwanama", "Bugongi", "Kagango"
  ],

  // ========== EASTERN REGION ==========
  "Amuria": [
    "Amuria Town", "Asamuk", "Kapelebyong", "Orungo",
    "Acowa", "Morungatuny", "Wera", "Kuju"
  ],
  "Budaka": [
    "Budaka Town", "Kamonkoli", "Iki-Iki", "Kaderuna",
    "Naboa", "Lyama"
  ],
  "Bududa": [
    "Bududa Town", "Bukigai", "Bukalasi", "Bumayoka",
    "Bulucheke", "Bushika", "Bududa Central", "Nalwanza"
  ],
  "Bugiri": [
    "Bugiri Town", "Nankoma", "Kapyanga", "Bulidha",
    "Nabukalu", "Muterere", "Buwunga", "Nawandala"
  ],
  "Bugweri": [
    "Bugweri Town", "Idudi", "Nsinze", "Iganga",
    "Busesa", "Namalemba"
  ],
  "Bukwo": [
    "Bukwo Town", "Suam", "Chepkwasta", "Riwo",
    "Chesower", "Kaptokoi"
  ],
  "Bulambuli": [
    "Bulambuli Town", "Simu", "Bwikhonge", "Muyembe",
    "Bulegeni", "Sisiyi"
  ],
  "Busia": [
    "Busia Town", "Majanji", "Lumino", "Dabani",
    "Masafu", "Busitema", "Buhehe", "Masinya", "Buyengo"
  ],
  "Butaleja": [
    "Butaleja Town", "Busolwe", "Mazimasa", "Budumba",
    "Nawanjofu", "Himutu", "Kachonga"
  ],
  "Butebo": [
    "Butebo Town", "Kabwangasi", "Petete", "Kadama",
    "Kibale"
  ],
  "Iganga": [
    "Iganga Town", "Busembatia", "Nakigo", "Bugweri",
    "Nakalama", "Namungalwe", "Buyanga", "Ibulanku",
    "Nakavule", "Busime"
  ],
  "Jinja": [
    "Jinja City", "Bugembe", "Kakira", "Buwenge", "Mafubira",
    "Budondo", "Busede", "Buyengo", "Kakaire", "Kimaka",
    "Walukuba", "Mpumudde", "Masese", "Wanyange", "Buwenda"
  ],
  "Kaliro": [
    "Kaliro Town", "Bumanya", "Namugongo", "Bukamba",
    "Namwiwa", "Gadumire"
  ],
  "Kamuli": [
    "Kamuli Town", "Namwendwa", "Mbulamuti", "Balawoli",
    "Nabwigulu", "Namugongo", "Kitayunjwa", "Bugulumbya",
    "Buyende", "Wankole"
  ],
  "Kapchorwa": [
    "Kapchorwa Town", "Sipi", "Kween", "Kapchesombe",
    "Tegeres", "Chepkwasta", "Sipi Falls", "Kapkwata"
  ],
  "Katakwi": [
    "Katakwi Town", "Ngariam", "Toroma", "Magoro",
    "Usuk", "Kapujan", "Obalanga", "Ongongoja"
  ],
  "Kibuku": [
    "Kibuku Town", "Kadama", "Kasasira", "Tirinyi",
    "Bulangira", "Kabweri"
  ],
  "Kumi": [
    "Kumi Town", "Ngora", "Malera", "Ongino",
    "Mukongoro", "Atutur", "Kolir", "Kanyum"
  ],
  "Kween": [
    "Kween Town", "Binyiny", "Kwosir", "Kaproron",
    "Kitawoi", "Moyok"
  ],
  "Luuka": [
    "Luuka Town", "Bukanga", "Irongo", "Nawaikona",
    "Bulongo", "Ikumbya"
  ],
  "Manafwa": [
    "Manafwa Town", "Bubulo", "Bukigai", "Bupoto",
    "Butiru", "Bumbo", "Nalondo", "Bugobero"
  ],
  "Mayuge": [
    "Mayuge Town", "Malongo", "Baitambogwe", "Wairasa",
    "Imanyiro", "Jaguzi Island", "Bukabooli"
  ],
  "Mbale": [
    "Mbale City", "Nakaloke", "Wanale", "Bungokho", "Bufumbo",
    "Namanyonyi", "Busoba", "Busiu", "Industrial Division",
    "Nkoma", "Malukhu", "Namatala", "Nabumali"
  ],
  "Namayingo": [
    "Namayingo Town", "Lolwe Island", "Sigulu Island", "Mutumba",
    "Banda", "Buyinja"
  ],
  "Namutumba": [
    "Namutumba Town", "Nsinze", "Bulange", "Ivukula",
    "Magada", "Kibaale"
  ],
  "Ngora": [
    "Ngora Town", "Mukura", "Kapir", "Kobwin",
    "Ngora Central"
  ],
  "Pallisa": [
    "Pallisa Town", "Kibuku", "Budaka", "Kameruka",
    "Butebo", "Kamuge", "Gogonyo", "Kasodo"
  ],
  "Serere": [
    "Serere Town", "Kadungulu", "Kyere", "Olio",
    "Pingire", "Bugondo"
  ],
  "Sironko": [
    "Sironko Town", "Budadiri", "Buyobo", "Masaba",
    "Buginyanya", "Bumulimba", "Bukiise", "Buwalasi"
  ],
  "Soroti": [
    "Soroti City", "Arapai", "Kamuda", "Katine", "Tubur",
    "Asuret", "Gweri", "Lale", "Aloet", "Opiyai",
    "Western Division", "Eastern Division"
  ],
  "Tororo": [
    "Tororo Town", "Nagongera", "Mukujju", "Malaba", "Rubongi",
    "Mulanda", "Paya", "Kwapa", "Mella", "Osukuru",
    "Busia Road", "Kisoko"
  ],

  // ========== NORTHERN REGION ==========
  "Abim": [
    "Abim Town", "Alerek", "Lotuke", "Morulem",
    "Nyakwae", "Abim Central", "Karenga"
  ],
  "Adjumani": [
    "Adjumani Town", "Ciforo", "Pakele", "Dzaipi",
    "Ofua", "Itirikwa", "Adropi", "Ogujebe"
  ],
  "Agago": [
    "Kalongo", "Adilang", "Paimol", "Lira Palwo",
    "Lamiyo", "Omot", "Wol", "Patongo"
  ],
  "Alebtong": [
    "Alebtong Town", "Apala", "Abia", "Aloi",
    "Abako", "Omoro"
  ],
  "Amolatar": [
    "Amolatar Town", "Namasale", "Kioga", "Muntu",
    "Awelo", "Etam", "Agikdak"
  ],
  "Amudat": [
    "Amudat Town", "Karita", "Loroo", "Amudat Central",
    "Lorengecora"
  ],
  "Amuru": [
    "Amuru Town", "Atiak", "Lamogi", "Pabbo",
    "Bibia", "Elegu"
  ],
  "Apac": [
    "Apac Town", "Aduku", "Ibuje", "Chegere",
    "Inomo", "Nambieso", "Chawente", "Akokoro"
  ],
  "Arua": [
    "Arua City", "Manibe", "Oli", "Pajulu", "Dadamu",
    "Adumi", "Vurra", "Ayivu", "Arivu", "Offaka",
    "Logiri", "River Oli Division", "Onduparaka", "Ediofe"
  ],
  "Dokolo": [
    "Dokolo Town", "Agwata", "Bata", "Kangai",
    "Okwongodul", "Amwoma", "Adeknino"
  ],
  "Gulu": [
    "Gulu City", "Laroo", "Layibi", "Pece", "Bardege",
    "Bungatira", "Bobi", "Patiko", "Lakwana", "Awach",
    "Unyama", "Lalogi", "Koro", "Cwero", "Palenga"
  ],
  "Kaabong": [
    "Kaabong Town", "Kapedo", "Kathile", "Lolelia",
    "Karenga", "Lobalangit", "Sidok"
  ],
  "Kitgum": [
    "Kitgum Town", "Mucwini", "Labongo Akwang", "Namokora",
    "Omiya Anyima", "Orom", "Palavek", "Kitgum Matidi"
  ],
  "Koboko": [
    "Koboko Town", "Ludara", "Lobule", "Kuluba",
    "Dranya", "Midia", "Koboko Central"
  ],
  "Kole": [
    "Kole Town", "Aboke", "Ayer", "Bala",
    "Okwerodot", "Alito"
  ],
  "Kotido": [
    "Kotido Town", "Kacheri", "Rengen", "Nakapelimoru",
    "Panyangara", "Kanawat", "Kotido Central"
  ],
  "Kwania": [
    "Kwania Town", "Aduku", "Nambieso", "Maruzi",
    "Kwania Central"
  ],
  "Lamwo": [
    "Padibe", "Palabek Kal", "Agoro", "Lokung",
    "Madi Opei", "Palabek Gem", "Lamwo Central"
  ],
  "Lira": [
    "Lira City", "Ojwina", "Adyel", "Barr", "Agali",
    "Ogur", "Aromo", "Lira Palwo", "Amach", "Agweng",
    "Railways Division", "Central Division", "Adekokwok"
  ],
  "Madi-Okollo": [
    "Okollo", "Offaka", "Ogoko", "Aii-vu", "Pakwach"
  ],
  "Maracha": [
    "Maracha Town", "Nyadri", "Oluvu", "Tara",
    "Yivu", "Oleba", "Oluffe"
  ],
  "Moroto": [
    "Moroto Town", "Nadunget", "Katikekile", "Rupa",
    "Tapac", "Ngoleriet", "Moroto Central"
  ],
  "Moyo": [
    "Moyo Town", "Obongi", "Metu", "Lefori",
    "Itula", "Dufile", "Moyo Central"
  ],
  "Nakapiripirit": [
    "Nakapiripirit Town", "Karita", "Loroo",
    "Lolachat", "Namalu", "Nabilatuk"
  ],
  "Napak": [
    "Napak Town", "Lorengechora", "Iriiri", "Lokopo",
    "Matany", "Lopei"
  ],
  "Nebbi": [
    "Nebbi Town", "Panyimur", "Wadelai",
    "Erussi", "Kucwiny", "Nyaravur", "Parombo", "Pakwach"
  ],
  "Nwoya": [
    "Anaka", "Koch Goma", "Alero", "Purongo",
    "Got Apwoyo", "Nwoya Central"
  ],
  "Obongi": [
    "Obongi Town", "Itula", "Gimara", "Moyo Central"
  ],
  "Omoro": [
    "Omoro Town", "Lakwana", "Bobi", "Koro",
    "Lalogi"
  ],
  "Otuke": [
    "Otuke Town", "Olilim", "Adwari", "Orum",
    "Okwang"
  ],
  "Oyam": [
    "Oyam Town", "Minakulu", "Aber", "Ngai",
    "Iceme", "Kamdini", "Loro", "Acaba"
  ],
  "Pader": [
    "Pader Town", "Atanga", "Lacekocot", "Pajule",
    "Awere", "Kilak", "Ogom", "Puranga", "Acholi-Bur"
  ],
  "Pakwach": [
    "Pakwach Town", "Panyimur", "Pakwach Central",
    "Albert Nile", "Alwi", "Pakwach Ferry"
  ],
  "Yumbe": [
    "Yumbe Town", "Midigo", "Kei", "Romogi",
    "Drajini", "Lodonga", "Kerwa"
  ],
  "Zombo": [
    "Zombo Town", "Paidha", "Warr", "Nyapea",
    "Atyak", "Kango", "Zeu"
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

// Search districts by name
export const searchDistricts = (query: string): string[] => {
  if (!query.trim()) return getDistricts();
  const lower = query.toLowerCase();
  return getDistricts().filter(d => d.toLowerCase().includes(lower));
};

// All regions for filtering
export const UGANDA_REGIONS: Record<string, string[]> = {
  "Central": [
    "Bukomansimbi", "Buikwe", "Butambala", "Gomba", "Kalangala", "Kalungu",
    "Kampala", "Kassanda", "Kayunga", "Kiboga", "Kyankwanzi", "Luwero",
    "Lwengo", "Lyantonde", "Masaka", "Mityana", "Mpigi", "Mubende",
    "Mukono", "Nakaseke", "Nakasongola", "Rakai", "Sembabule", "Wakiso"
  ],
  "Western": [
    "Buhweju", "Buliisa", "Bundibugyo", "Bushenyi", "Fort Portal", "Hoima",
    "Ibanda", "Isingiro", "Kabale", "Kabarole", "Kagadi", "Kakumiro",
    "Kamwenge", "Kanungu", "Kasese", "Kazo", "Kibaale", "Kiruhura",
    "Kiryandongo", "Kisoro", "Kyegegwa", "Kyenjojo", "Masindi", "Mbarara",
    "Mitooma", "Ntoroko", "Ntungamo", "Rubanda", "Rubirizi", "Rukiga",
    "Rukungiri", "Rwampara", "Sheema"
  ],
  "Eastern": [
    "Amuria", "Budaka", "Bududa", "Bugiri", "Bugweri", "Bukwo",
    "Bulambuli", "Busia", "Butaleja", "Butebo", "Iganga", "Jinja",
    "Kaliro", "Kamuli", "Kapchorwa", "Katakwi", "Kibuku", "Kumi",
    "Kween", "Luuka", "Manafwa", "Mayuge", "Mbale", "Namayingo",
    "Namutumba", "Ngora", "Pallisa", "Serere", "Sironko", "Soroti", "Tororo"
  ],
  "Northern": [
    "Abim", "Adjumani", "Agago", "Alebtong", "Amolatar", "Amudat",
    "Amuru", "Apac", "Arua", "Dokolo", "Gulu", "Kaabong", "Kitgum",
    "Koboko", "Kole", "Kotido", "Kwania", "Lamwo", "Lira", "Madi-Okollo",
    "Maracha", "Moroto", "Moyo", "Nakapiripirit", "Napak", "Nebbi",
    "Nwoya", "Obongi", "Omoro", "Otuke", "Oyam", "Pader", "Pakwach",
    "Yumbe", "Zombo"
  ],
};
