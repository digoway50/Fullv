// Regional & Brand-Specific SEO Keywords Dataset
// Focus: Readymade, Ready to Wear & Garments across Hyderabad, Mithi, and Islamkot (Sindh, Pakistan)
// Target Brands: J. (Junaid Jamshed), Sapphire, Ideas by Gul Ahmed, Fleex Garment

export interface LocationMetadata {
  city: string;
  short_code: string;
  region: string;
  retail_tier: string;
}

export const TARGET_LOCATIONS: LocationMetadata[] = [
  {
    city: "Hyderabad",
    short_code: "Hyd",
    region: "Sindh, Pakistan",
    retail_tier: "Tier-2 Hub (Physical Brand Outlets + Local Bazaars)"
  },
  {
    city: "Mithi",
    short_code: "Mithi",
    region: "Tharparkar, Sindh, Pakistan",
    retail_tier: "District HQ (High COD E-Commerce Demand + Local Garment Retailers)"
  },
  {
    city: "Islamkot",
    short_code: "Islamkot",
    region: "Tharparkar, Sindh, Pakistan",
    retail_tier: "Emerging Commercial Hub (Online COD Delivery + Local Readymade Shops)"
  }
];

export const CORE_SEED_KEYWORD_ANALYSIS = {
  readymade: {
    search_intent: "Transactional & Local Commercial",
    buyer_persona: "Mass-market shoppers, families, wedding shoppers, and wholesale/retail buyers looking for stitched suits, kids clothes, and gents shalwar kameez.",
    relative_search_volume: "Very High (Especially in Hyderabad, Mithi, and Islamkot local searches)",
    keyword_difficulty: "Medium",
    top_variations: [
      "readymade garments",
      "readymade suits online pakistan",
      "ladies readymade dresses",
      "readymade 3 piece suit",
      "gents readymade shalwar kameez",
      "kids readymade clothes",
      "readymade party wear dresses",
      "wholesale readymade garments"
    ]
  },
  ready_to_wear: {
    search_intent: "Branded Commercial & High-Intent Transactional",
    buyer_persona: "Brand-conscious shoppers searching for stitched pret collections from Sapphire, J., and Ideas by Gul Ahmed.",
    relative_search_volume: "High (Dominates branded fashion e-commerce searches)",
    keyword_difficulty: "High",
    top_variations: [
      "ready to wear pakistan",
      "ready to wear 3 piece suits",
      "embroidered ready to wear",
      "ready to wear summer collection",
      "ready to wear winter khaddar",
      "luxury pret ready to wear",
      "daily wear ready to wear kurtis",
      "co-ord sets ready to wear"
    ]
  },
  garments: {
    search_intent: "Local Navigational, B2B Wholesale & Multi-Category Retail",
    buyer_persona: "Shoppers looking for physical clothing stores, baby/kids clothing shops, men's western/eastern wear, or wholesale suppliers.",
    relative_search_volume: "High (Strong Google Maps & 'Near Me' intent)",
    keyword_difficulty: "Low to Medium",
    top_variations: [
      "garments shop near me",
      "readymade garments store",
      "baby and kids garments",
      "ladies and gents garments",
      "imported garments pakistan",
      "wholesale garments market",
      "branded garments outlet",
      "winter garments sale"
    ]
  }
};

export const BRAND_SPECIFIC_KEYWORDS = {
  j_junaid_jamshed: {
    ready_to_wear: [
      "j. ready to wear",
      "j. stitched collection",
      "junaid jamshed ready to wear 3 piece",
      "j. women ready to wear kurti",
      "j. festive ready to wear",
      "j. teen girls ready to wear"
    ],
    readymade_and_garments: [
      "j. readymade shalwar kameez men",
      "junaid jamshed readymade kurta",
      "j. kids readymade garments",
      "j. readymade dresses with price",
      "junaid jamshed garments outlet hyderabad"
    ]
  },
  sapphire: {
    ready_to_wear: [
      "sapphire ready to wear",
      "sapphire ready to wear sale",
      "sapphire stitched 2 piece",
      "sapphire ready to wear 3 piece lawn",
      "sapphire winter ready to wear khaddar",
      "sapphire luxury pret ready to wear",
      "sapphire west ready to wear"
    ],
    readymade_and_garments: [
      "sapphire readymade suits online",
      "sapphire readymade dresses price in pakistan",
      "sapphire ladies garments",
      "sapphire stitched garments boulevard mall hyderabad"
    ]
  },
  ideas_by_gul_ahmed: {
    ready_to_wear: [
      "ideas ready to wear",
      "gul ahmed ready to wear sale",
      "ideas pret stitched suits",
      "ideas ready to wear co-ord sets",
      "gul ahmed stitched 3 piece suit",
      "ideas everyday ready to wear"
    ],
    readymade_and_garments: [
      "gul ahmed readymade dresses",
      "ideas readymade kurtis under 3000",
      "ideas salt western garments",
      "gul ahmed gents readymade kurta",
      "ideas kids garments sale"
    ]
  }
};

export const CITY_WISE_KEYWORDS = {
  hyderabad_hyd: {
    market_context: "Major urban center in Sindh with flagship outlets for J., Sapphire, and Ideas at Boulevard Mall (Auto Bhan Road) and Saddar Cantt, plus thriving local markets in Latifabad, Qasimabad, and Resham Gali.",
    branded_local_keywords: [
      "sapphire ready to wear hyderabad",
      "sapphire boulevard mall autobhan road hyderabad",
      "j. outlet hyderabad saddar cantt",
      "junaid jamshed boulevard mall hyderabad",
      "ideas by gul ahmed autobhan road hyderabad",
      "gul ahmed ready to wear hyderabad branch",
      "branded ready to wear outlets in hyd"
    ],
    readymade_and_garments_local: [
      "readymade garments shop in hyderabad sindh",
      "best readymade clothing stores autobhan road hyd",
      "ladies readymade suits in hyderabad",
      "wholesale readymade garments market hyderabad",
      "resham gali hyderabad readymade dresses",
      "latifabad readymade garments shop",
      "qasimabad hyderabad boutique and ready to wear",
      "kids readymade garments in hyd",
      "gents readymade shalwar kameez hyderabad"
    ],
    transactional_and_near_me: [
      "ready to wear dresses cash on delivery hyderabad",
      "same day delivery garments in hyd",
      "readymade bridal and party wear hyderabad",
      "garments sale in hyderabad malls"
    ]
  },
  mithi_tharparkar: {
    market_context: "District headquarters of Tharparkar. High demand for Cash on Delivery (COD) from national brands (J., Sapphire, Ideas) and strong local foot traffic in Mithi bazaars for readymade garments, wedding shopping, and kids/men's clothing.",
    branded_cod_and_online_keywords: [
      "j. online shopping delivery in mithi",
      "sapphire ready to wear delivery in mithi",
      "gul ahmed ideas online delivery mithi tharparkar",
      "branded ready to wear suits cash on delivery mithi",
      "stitched pret dresses delivery mithi"
    ],
    readymade_and_garments_local: [
      "readymade garments in mithi",
      "best garments shop in mithi tharparkar",
      "ladies readymade suits mithi bazaar",
      "gents shalwar kameez readymade mithi",
      "kids wear garments shop mithi",
      "wedding readymade dresses mithi"
    ],
    transactional_and_near_me: [
      "online clothes shopping in mithi with cod",
      "fastest clothes delivery in mithi",
      "readymade cloth store near me mithi"
    ]
  },
  islamkot_tharparkar: {
    market_context: "Emerging commercial hub in Tharparkar with rising demand for branded pret and quality readymade garments, supported by growing digital connectivity and COD courier services.",
    branded_cod_and_online_keywords: [
      "j. stitched suits delivery islamkot",
      "sapphire ready to wear cod islamkot",
      "ideas gul ahmed garments delivery islamkot tharparkar",
      "buy branded pret online islamkot"
    ],
    readymade_and_garments_local: [
      "readymade garments shop islamkot",
      "garments store islamkot main bazaar",
      "kids readymade clothes islamkot",
      "ladies stitched suits in islamkot",
      "gents readymade kurta shalwar islamkot"
    ],
    transactional_and_near_me: [
      "cash on delivery garments in islamkot",
      "readymade clothes online shopping islamkot",
      "clothes store near me islamkot tharparkar"
    ]
  }
};

export const ROMAN_URDU_KEYWORDS: string[] = [
  "readymade kapre online delivery",
  "ready to wear suits kahan se milenge",
  "hyderabad mein readymade garments ki achi dukan",
  "mithi me sapphire aur junaid jamshed ke kapre",
  "islamkot me cash on delivery kapre",
  "bachon ke readymade kapre",
  "mardana readymade shalwar kameez online"
];

// Flat aggregate array of high-intent regional keywords for meta tags and search indexing
export const ALL_REGIONAL_SEO_KEYWORDS: string[] = [
  ...CORE_SEED_KEYWORD_ANALYSIS.readymade.top_variations,
  ...CORE_SEED_KEYWORD_ANALYSIS.ready_to_wear.top_variations,
  ...CORE_SEED_KEYWORD_ANALYSIS.garments.top_variations,
  ...BRAND_SPECIFIC_KEYWORDS.j_junaid_jamshed.ready_to_wear,
  ...BRAND_SPECIFIC_KEYWORDS.j_junaid_jamshed.readymade_and_garments,
  ...BRAND_SPECIFIC_KEYWORDS.sapphire.ready_to_wear,
  ...BRAND_SPECIFIC_KEYWORDS.sapphire.readymade_and_garments,
  ...BRAND_SPECIFIC_KEYWORDS.ideas_by_gul_ahmed.ready_to_wear,
  ...BRAND_SPECIFIC_KEYWORDS.ideas_by_gul_ahmed.readymade_and_garments,
  ...CITY_WISE_KEYWORDS.hyderabad_hyd.branded_local_keywords,
  ...CITY_WISE_KEYWORDS.hyderabad_hyd.readymade_and_garments_local,
  ...CITY_WISE_KEYWORDS.hyderabad_hyd.transactional_and_near_me,
  ...CITY_WISE_KEYWORDS.mithi_tharparkar.branded_cod_and_online_keywords,
  ...CITY_WISE_KEYWORDS.mithi_tharparkar.readymade_and_garments_local,
  ...CITY_WISE_KEYWORDS.mithi_tharparkar.transactional_and_near_me,
  ...CITY_WISE_KEYWORDS.islamkot_tharparkar.branded_cod_and_online_keywords,
  ...CITY_WISE_KEYWORDS.islamkot_tharparkar.readymade_and_garments_local,
  ...CITY_WISE_KEYWORDS.islamkot_tharparkar.transactional_and_near_me,
  ...ROMAN_URDU_KEYWORDS
];
