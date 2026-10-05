export const restaurant = {
  name: "奄美島料理てぃだ",
  alternateName: ["てぃだ", "Amami Island Food"],
  title: "奄美島料理てぃだ｜大阪・天神橋の鶏飯・島料理",
  description:
    "大阪市北区天神橋の奄美島料理てぃだ。鶏飯・油ソーメン・海ぶどう・角煮と、税抜5,500円の豚しゃぶコース。18:00〜23:00、月・火定休。天神橋筋六丁目駅徒歩3分。06-6881-3639",
  schemaDescription:
    "大阪市北区天神橋の奄美島料理店。定休日は月曜・火曜（祝日やイベントにより変動することがあります）。",
  slogan: "島の夕餉を、天神橋で。",
  cuisine: "奄美料理",
  phoneDisplay: "06-6881-3639",
  phoneHref: "tel:+81668813639",
  phoneSchema: "+81-6-6881-3639",
  postalCode: "530-0041",
  region: "大阪府",
  locality: "大阪市北区",
  streetAddress: "天神橋5-5-32 川合ビル2階",
  instagram: "https://www.instagram.com/tidataiyo/",
  tabelog: "https://tabelog.com/osaka/A2701/A270103/27009167/",
  mapQuery: "大阪市北区天神橋5-5-32 川合ビル",
  openDays: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "18:00",
  closes: "23:00",
  ogImageAlt: "奄美島料理てぃだの徳之島ずくし豚しゃぶコース",
} as const;

export const mapHref =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(restaurant.mapQuery);

export const mapEmbed =
  "https://maps.google.com/maps?q=" + encodeURIComponent(restaurant.mapQuery) + "&hl=ja&z=17&output=embed";

export const dishes = [
  {
    no: "01",
    name: "海ぶどう",
    price: "780",
    priceValue: "780",
    text: "プチプチとはじける食感。島の海から届く一皿です。",
  },
  {
    no: "02",
    name: "油ソーメン",
    alias: "ソーメンチャンプル",
    price: "750",
    priceValue: "750",
    text: "細麺に野菜と肉を絡めて炒めた、てぃだで名前のあがる一皿です。",
  },
  {
    no: "03",
    name: "鶏飯",
    price: "1,000",
    priceValue: "1000",
    text: "鶏、錦糸卵、椎茸、ねぎ、紅生姜。温かいだしをかけていただきます。",
  },
  {
    no: "04",
    name: "ニガウリ豆腐炒め",
    alias: "ゴーヤチャンプル",
    price: "700",
    priceValue: "700",
    text: "苦みのあるニガウリに、豆腐と卵を合わせた炒め物です。",
  },
  {
    no: "05",
    name: "自家製皮付き豚の角煮",
    price: "900",
    priceValue: "900",
    text: "皮を残した豚肉を、時間をかけて煮込んでいます。",
  },
] as const;

export const course = {
  name: "徳之島ずくし 豚しゃぶコース",
  priceLabel: "5,500",
  priceValue: "5500",
  priceNote: "税抜・お一人様",
  lead: "徳之島から直送した豚肉を中心に、前菜から甘味まで通すコースです。4名様から。前日までにお電話ください。貸切も承ります。",
  note: "前菜などは、日によって変わることがあります。",
  meta: ["90分飲み放題", "週末ライブ", "徳之島直送", "貸切可"],
  items: [
    "島の前菜 三種盛り",
    "徳之島産豚の炙りローストポーク",
    "徳之島産豚しゃぶ（ロース・バラ・野菜）",
    "〆の雑炊",
    "〆のてぃだ名物 油ソーメン",
    "手作りサータアンダギー",
  ],
} as const;

export function buildJsonLd(origin?: string) {
  const page = origin ? new URL("/", origin).href : undefined;
  const image = origin ? new URL("/ogp.jpg", origin).href : "/ogp.jpg";
  const restaurantId = page ? `${page}#restaurant` : undefined;

  const graph: Record<string, unknown>[] = [];

  if (page && restaurantId) {
    graph.push({
      "@type": "WebSite",
      "@id": `${page}#website`,
      name: restaurant.name,
      url: page,
      inLanguage: "ja",
      publisher: { "@id": restaurantId },
    });
  }

  graph.push({
    "@type": "Restaurant",
    ...(restaurantId ? { "@id": restaurantId } : {}),
    ...(page ? { url: page, image, hasMap: mapHref } : { image, hasMap: mapHref }),
    name: restaurant.name,
    alternateName: restaurant.alternateName,
    slogan: restaurant.slogan,
    description: restaurant.schemaDescription,
    servesCuisine: restaurant.cuisine,
    priceRange: "¥700–¥5500",
    telephone: restaurant.phoneSchema,
    currenciesAccepted: "JPY",
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      postalCode: restaurant.postalCode,
      addressRegion: restaurant.region,
      addressLocality: restaurant.locality,
      streetAddress: restaurant.streetAddress,
      addressCountry: "JP",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: restaurant.openDays,
        opens: restaurant.opens,
        closes: restaurant.closes,
      },
    ],
    hasMenu: {
      "@type": "Menu",
      ...(page ? { "@id": `${page}#menu`, url: `${page}#menu` } : {}),
      name: "奄美島料理てぃだの料理",
      inLanguage: "ja",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "よく選ばれる料理",
          hasMenuItem: dishes.map((dish) => ({
            "@type": "MenuItem",
            name: dish.name,
            ...("alias" in dish ? { alternateName: dish.alias } : {}),
            description: dish.text,
            offers: {
              "@type": "Offer",
              price: dish.priceValue,
              priceCurrency: "JPY",
            },
          })),
        },
        {
          "@type": "MenuSection",
          name: course.name,
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: course.name,
              description: `${course.items.join("、")}。${course.priceNote}。4名様から。前日までの予約。`,
              offers: {
                "@type": "Offer",
                price: course.priceValue,
                priceCurrency: "JPY",
              },
            },
          ],
        },
      ],
    },
    sameAs: [restaurant.instagram, restaurant.tabelog],
    potentialAction: {
      "@type": "ReserveAction",
      name: "電話で予約する",
      target: restaurant.phoneHref,
    },
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
