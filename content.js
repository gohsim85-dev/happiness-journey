/* ============================================================
   Jom Cuti — content.js
   All website copy and data lives here. Edit this file to
   update destinations, activities, itineraries, tips, etc.
   ============================================================ */

const CONTENT = {

  site: {
    name: "Jom Cuti",
    tagline: "Your Malaysia, your way",
    heroTitle: "Jom, let's explore Malaysia.",
    heroSubtitle:
      "From limestone islands to misty tea hills, hawker lanes to rainforest canopy walks — find where to go, what to do, and how to string it all into a trip.",
  },

  /* ---------------- STATES / REGIONS ---------------- */
  regions: [
    { id: "kedah", name: "Kedah", area: "Peninsular — North" },
    { id: "penang", name: "Penang", area: "Peninsular — North" },
    { id: "perak", name: "Perak", area: "Peninsular — North" },
    { id: "pahang", name: "Pahang", area: "Peninsular — Central" },
    { id: "kl", name: "Kuala Lumpur", area: "Peninsular — Central" },
    { id: "melaka", name: "Melaka", area: "Peninsular — South" },
    { id: "terengganu", name: "Terengganu", area: "Peninsular — East Coast" },
    { id: "sabah", name: "Sabah", area: "East Malaysia — Borneo" },
    { id: "sarawak", name: "Sarawak", area: "East Malaysia — Borneo" },
  ],

  /* ---------------- ACTIVITY CATEGORIES ---------------- */
  categories: [
    { id: "food", name: "Food", icon: "food" },
    { id: "nature", name: "Nature", icon: "nature" },
    { id: "beaches", name: "Beaches", icon: "beach" },
    { id: "culture", name: "Culture", icon: "culture" },
    { id: "adventure", name: "Adventure", icon: "adventure" },
    { id: "family", name: "Family", icon: "family" },
  ],

  /* ---------------- DESTINATIONS ---------------- */
  destinations: [
    {
      id: "langkawi",
      name: "Langkawi",
      region: "kedah",
      scene: "beach",
      tags: ["beaches", "nature", "family"],
      tagline: "Duty-free islands under a cable-car sky",
      description:
        "An archipelago of 99 islands off Kedah, Langkawi pairs powder-fine beaches at Pantai Cenang with the jungle-clad peaks of Gunung Mat Cincang. Ride the SkyCab up to the Sky Bridge, kayak through the mangroves of Kilim Geoforest Park, or just watch the sun drop into the Andaman Sea with a duty-free drink in hand.",
      highlights: [
        "Langkawi SkyCab and Sky Bridge",
        "Kilim Geoforest Park mangrove tour",
        "Pantai Cenang sunset and beach bars",
        "Island-hopping to Pulau Dayang Bunting",
      ],
      bestFor: "Beach time, families, easy island pace",
      idealDays: 3,
    },
    {
      id: "penang",
      name: "Penang (George Town)",
      region: "penang",
      scene: "city",
      tags: ["food", "culture"],
      tagline: "Malaysia's street-food capital, wrapped in heritage streets",
      description:
        "George Town's UNESCO-listed core is a living museum of shophouses, clan jetties, and street art tucked between temples, mosques, and churches. It's also, unofficially, the best place in the country to eat — char koay teow at a corner stall, asam laksa at a hawker centre, and cendol whenever the heat gets to you.",
      highlights: [
        "Armenian Street and the clan jetties",
        "Hawker trail: char koay teow, asam laksa, cendol",
        "Kek Lok Si Temple",
        "Penang Hill funicular at sunrise",
      ],
      bestFor: "Food lovers, heritage walks, first-timers",
      idealDays: 2,
    },
    {
      id: "cameron-highlands",
      name: "Cameron Highlands",
      region: "pahang",
      scene: "hills",
      tags: ["nature", "family"],
      tagline: "Rolling tea terraces at 1,500 metres",
      description:
        "A hill-station legacy from the colonial era, Cameron Highlands trades Malaysia's usual heat for cool mountain air, tea plantations that stripe the hillsides in green, and strawberry farms you can pick your own fruit from. The BOH Sungei Palas estate is the postcard shot; the Mossy Forest boardwalk is the quieter, stranger highlight.",
      highlights: [
        "BOH Sungei Palas Tea Centre",
        "Mossy Forest boardwalk",
        "Strawberry and lavender farms",
        "Cameron Valley tea tasting",
      ],
      bestFor: "Cool weather, nature walks, tea",
      idealDays: 2,
    },
    {
      id: "perhentian",
      name: "Perhentian Islands",
      region: "terengganu",
      scene: "beach",
      tags: ["beaches", "nature", "adventure"],
      tagline: "Turquoise water, turtles, and no cars",
      description:
        "Two small islands off Terengganu with no roads and barely any Wi-Fi — Perhentian Besar for a quieter stay, Perhentian Kecil for the backpacker energy. Snorkel straight off the beach to see reef sharks and green turtles, or take a boat out to Turtle Point and the coral gardens further offshore.",
      highlights: [
        "Snorkelling at Turtle Point",
        "Long Beach on Perhentian Kecil",
        "Night walks to spot hawksbill turtles nesting",
        "Diving trips to nearby coral reefs",
      ],
      bestFor: "Snorkelling, diving, unplugging",
      idealDays: 3,
    },
    {
      id: "melaka",
      name: "Melaka City",
      region: "melaka",
      scene: "city",
      tags: ["culture", "food", "family"],
      tagline: "500 years of trade routes in one riverside city",
      description:
        "Melaka's Jonker Street and the Dutch Square tell the story of Portuguese, Dutch, and British rule layered over Malay and Peranakan culture. Cruise the Melaka River at night, browse the weekend Jonker Walk night market, and try Nyonya specialities like ayam pongteh in a Peranakan-run shophouse restaurant.",
      highlights: [
        "A Famosa and the Dutch Square",
        "Jonker Street weekend night market",
        "Melaka River night cruise",
        "Baba Nyonya Heritage Museum",
      ],
      bestFor: "History, weekend trips, food",
      idealDays: 2,
    },
    {
      id: "kuala-lumpur",
      name: "Kuala Lumpur",
      region: "kl",
      scene: "city",
      tags: ["food", "culture", "family"],
      tagline: "Petronas Towers by day, hawker lanes by night",
      description:
        "KL is the easy hub for most Malaysia trips — the Petronas Twin Towers and KLCC Park on one side, the century-old lanes of Chinatown and Kampung Baru on the other. Batu Caves is a half-day trip north, while Bukit Bintang and Jalan Alor cover the shopping and street food after dark.",
      highlights: [
        "Petronas Twin Towers Skybridge",
        "Batu Caves",
        "Jalan Alor night food street",
        "Central Market and Chinatown",
      ],
      bestFor: "First landing point, city comforts, food",
      idealDays: 2,
    },
    {
      id: "kota-kinabalu",
      name: "Kota Kinabalu",
      region: "sabah",
      scene: "beach",
      tags: ["nature", "adventure", "beaches"],
      tagline: "Gateway to Mount Kinabalu and Borneo's reefs",
      description:
        "KK is the launch point for Sabah's headline acts: Mount Kinabalu, South-East Asia's highest peak outside the Himalayas; the coral islands of Tunku Abdul Rahman Park just offshore; and orangutan and proboscis monkey encounters further along the coast. Save an evening for the Tanjung Aru sunset — regularly ranked among the world's best.",
      highlights: [
        "Mount Kinabalu climb or foothills day-trip",
        "Tunku Abdul Rahman Marine Park islands",
        "Tanjung Aru sunset",
        "Mari Mari Cultural Village",
      ],
      bestFor: "Adventure, diving, mountains and reef in one trip",
      idealDays: 4,
    },
    {
      id: "kuching",
      name: "Kuching",
      region: "sarawak",
      scene: "rainforest",
      tags: ["nature", "culture", "adventure"],
      tagline: "Cat statues, longhouses, and orangutans upriver",
      description:
        "Sarawak's laid-back capital sits on the Sarawak River, waterfront lined with cafés and the pale Astana palace across the water. Use it as a base for Bako National Park's proboscis monkeys and rock formations, or Semenggoh Nature Reserve for a near-guaranteed orangutan sighting during feeding time.",
      highlights: [
        "Semenggoh Wildlife Centre orangutan feeding",
        "Bako National Park day-trip",
        "Kuching Waterfront at dusk",
        "Sarawak Cultural Village longhouses",
      ],
      bestFor: "Wildlife, indigenous culture, slower travel",
      idealDays: 3,
    },
    {
      id: "taman-negara",
      name: "Taman Negara",
      region: "pahang",
      scene: "rainforest",
      tags: ["nature", "adventure"],
      tagline: "130-million-year-old rainforest, canopy walk included",
      description:
        "One of the world's oldest rainforests, reached by a longboat ride up the Tembeling River from Kuala Tahan. The canopy walkway strings between trees 45 metres up; night safaris and river tubing fill the rest of a stay, along with the chance — if you're lucky and quiet — of spotting tapir or hornbills.",
      highlights: [
        "Canopy walkway",
        "Night jungle safari",
        "Longboat ride up Sungai Tembeling",
        "Gua Telinga cave trek",
      ],
      bestFor: "Jungle trekking, wildlife, off-grid nights",
      idealDays: 3,
    },
    {
      id: "redang",
      name: "Redang Island",
      region: "terengganu",
      scene: "beach",
      tags: ["beaches", "adventure"],
      tagline: "Marine-park water in shades of glass",
      description:
        "A marine park island off Terengganu, open roughly April to October when the sea is calmest. Resorts here run their own boat transfers and snorkelling trips, so a Redang stay is usually all-inclusive by design — reef right off the jetty, giant clams at Marine Park Centre, and very little else to plan.",
      highlights: [
        "Marine Park Centre snorkelling",
        "Giant clam sanctuary",
        "Turtle sanctuary at Chagar Hutang (seasonal)",
        "Sunset from the jetty",
      ],
      bestFor: "Resort beach breaks, snorkelling, honeymoons",
      idealDays: 3,
    },
  ],

  /* ---------------- THINGS TO DO (by category) ---------------- */
  thingsToDo: {
    food: [
      {
        title: "Hawker trail through George Town",
        location: "Penang",
        blurb:
          "Work through char koay teow, asam laksa, and Hokkien mee across three or four stalls in one evening — locals rate stalls, not restaurants.",
      },
      {
        title: "Jalan Alor after dark",
        location: "Kuala Lumpur",
        blurb:
          "A full street of open-air grills and seafood tanks that only gets going after 7pm. Go hungry and share everything.",
      },
      {
        title: "Nyonya home-style dinner",
        location: "Melaka",
        blurb:
          "Ayam pongteh, itik tim, and cincaluk-laced dishes from Peranakan family kitchens turned restaurants along Jonker Street.",
      },
    ],
    nature: [
      {
        title: "Mossy Forest boardwalk",
        location: "Cameron Highlands",
        blurb:
          "A stunted, fog-wrapped forest at altitude — moss on every branch, orchids underfoot, cool enough for a jacket.",
      },
      {
        title: "Kilim mangrove river safari",
        location: "Langkawi",
        blurb:
          "A boat winds through limestone karsts and mangrove roots, with eagle-feeding stops and a floating fish farm.",
      },
      {
        title: "Semenggoh orangutan feeding",
        location: "Kuching",
        blurb:
          "Semi-wild orangutans drop in for scheduled morning and afternoon feedings — no guarantee, but very good odds.",
      },
    ],
    beaches: [
      {
        title: "Long Beach snorkel-in",
        location: "Perhentian Kecil",
        blurb:
          "Wade straight off the sand into reef and, most mornings, a resting green turtle or two.",
      },
      {
        title: "Pantai Cenang sunset",
        location: "Langkawi",
        blurb:
          "Beach bars, parasailing, and one of the most reliable sunsets on the west coast.",
      },
      {
        title: "Tanjung Aru sundowner",
        location: "Kota Kinabalu",
        blurb:
          "Grab a mat on the grass strip above the beach as the sky over the South China Sea turns orange.",
      },
    ],
    culture: [
      {
        title: "Batu Caves temple climb",
        location: "Kuala Lumpur",
        blurb:
          "272 rainbow steps up to a limestone cave temple guarded by a 42.7-metre gold Lord Murugan statue.",
      },
      {
        title: "Baba Nyonya Heritage Museum",
        location: "Melaka",
        blurb:
          "A restored Peranakan townhouse showing how Straits Chinese families actually lived — furniture, porcelain, wedding customs and all.",
      },
      {
        title: "Sarawak Cultural Village",
        location: "Kuching",
        blurb:
          "Longhouses representing Sarawak's main indigenous groups, with dance shows and blowpipe demonstrations.",
      },
    ],
    adventure: [
      {
        title: "Mount Kinabalu climb",
        location: "Kota Kinabalu",
        blurb:
          "A two-day summit trek to 4,095m for sunrise above the clouds — book permits months ahead in peak season.",
      },
      {
        title: "Taman Negara canopy walk",
        location: "Pahang",
        blurb:
          "A swaying 45-metre-high walkway through primary rainforest canopy, one of the longest of its kind.",
      },
      {
        title: "White-water rafting, Kampar River",
        location: "Perak",
        blurb:
          "Grade 2–3 rapids about two hours from KL, a popular day-trip add-on for adventure groups.",
      },
    ],
    family: [
      {
        title: "Strawberry-picking farms",
        location: "Cameron Highlands",
        blurb:
          "Pick-your-own strawberry patches plus lavender gardens and honey-bee farms nearby — an easy half-day with kids.",
      },
      {
        title: "Island-hopping day trip",
        location: "Langkawi",
        blurb:
          "A gentle boat circuit to a few nearby islands, with a stop for swimming and, often, an eagle-feeding show.",
      },
      {
        title: "KLCC Park and Aquaria",
        location: "Kuala Lumpur",
        blurb:
          "Splash fountains and skyline views at the park, with an underwater tunnel aquarium a short walk away.",
      },
    ],
  },

  /* ---------------- TRAVEL RECOMMENDATIONS ---------------- */
  recommendations: {
    duration: [
      {
        id: "weekend",
        label: "Long weekend (2–3 days)",
        text:
          "Stay close to one hub. Penang or Melaka give you food, heritage, and walkability without needing a rental car.",
        picks: ["penang", "melaka"],
      },
      {
        id: "week",
        label: "One week",
        text:
          "Pair a city with a coast or a hill station: Kuala Lumpur plus Langkawi, or Penang plus Cameron Highlands, works well with a single domestic flight or a scenic drive.",
        picks: ["kuala-lumpur", "langkawi"],
      },
      {
        id: "twoweeks",
        label: "Two weeks or more",
        text:
          "Split the trip across Peninsular and East Malaysia — a few days in KL and the east coast islands, then fly to Sabah or Sarawak for rainforest and reef.",
        picks: ["kota-kinabalu", "kuching", "perhentian"],
      },
    ],
    style: [
      {
        id: "budget",
        label: "Budget backpacker",
        text:
          "Perhentian Kecil, George Town, and Kuala Lumpur all have strong hostel scenes and cheap, excellent hawker food.",
        picks: ["perhentian", "penang", "kuala-lumpur"],
      },
      {
        id: "midrange",
        label: "Comfortable mid-range",
        text:
          "Langkawi and Melaka offer boutique hotels and easy transport without resort prices.",
        picks: ["langkawi", "melaka"],
      },
      {
        id: "luxury",
        label: "Resort and honeymoon",
        text:
          "Redang and the quieter side of Langkawi specialise in all-inclusive island resorts built for slowing down.",
        picks: ["redang", "langkawi"],
      },
      {
        id: "adventure-style",
        label: "Adventure-first",
        text:
          "Kota Kinabalu and Taman Negara are built around the trek, the dive, and the climb rather than the pool.",
        picks: ["kota-kinabalu", "taman-negara"],
      },
    ],
  },

  /* ---------------- ITINERARY SUGGESTIONS (curated, static) ---------------- */
  itineraries: [
    {
      id: "kl-langkawi-5",
      title: "KL + Langkawi, 5 days",
      days: 5,
      summary: "City food and skyline, then three days of island time.",
      plan: [
        { day: 1, focus: "Kuala Lumpur", activities: ["Petronas Towers Skybridge", "KLCC Park", "Jalan Alor dinner"] },
        { day: 2, focus: "Kuala Lumpur", activities: ["Batu Caves", "Chinatown and Central Market", "Bukit Bintang"] },
        { day: 3, focus: "Langkawi", activities: ["Fly in", "Pantai Cenang beach", "Sunset at a beach bar"] },
        { day: 4, focus: "Langkawi", activities: ["SkyCab and Sky Bridge", "Kilim mangrove tour"] },
        { day: 5, focus: "Langkawi", activities: ["Island-hopping trip", "Duty-free shopping before flight out"] },
      ],
    },
    {
      id: "penang-cameron-4",
      title: "Penang + Cameron Highlands, 4 days",
      days: 4,
      summary: "Heritage streets and hawker food, then cool tea-country air.",
      plan: [
        { day: 1, focus: "Penang", activities: ["George Town heritage walk", "Armenian Street street art", "Hawker dinner"] },
        { day: 2, focus: "Penang", activities: ["Penang Hill sunrise", "Kek Lok Si Temple", "Clan jetties"] },
        { day: 3, focus: "Cameron Highlands", activities: ["Drive up via Ipoh", "BOH tea plantation tour", "Strawberry farm"] },
        { day: 4, focus: "Cameron Highlands", activities: ["Mossy Forest boardwalk", "Tea tasting before heading down"] },
      ],
    },
    {
      id: "borneo-6",
      title: "Sabah wildlife and reef, 6 days",
      days: 6,
      summary: "Rainforest, mountain foothills, and marine park islands in one province.",
      plan: [
        { day: 1, focus: "Kota Kinabalu", activities: ["Arrive, Tanjung Aru sunset", "Night market dinner"] },
        { day: 2, focus: "Kota Kinabalu", activities: ["Tunku Abdul Rahman island-hopping", "Snorkelling"] },
        { day: 3, focus: "Kinabalu foothills", activities: ["Kinabalu Park day-trip", "Poring hot springs"] },
        { day: 4, focus: "Kota Kinabalu", activities: ["Mari Mari Cultural Village", "Local seafood dinner"] },
        { day: 5, focus: "Kota Kinabalu", activities: ["Free day: dive trip or rest", "Signal Hill viewpoint"] },
        { day: 6, focus: "Kota Kinabalu", activities: ["Last-morning market", "Depart"] },
      ],
    },
  ],

  /* ---------------- TRAVEL TIPS ---------------- */
  tips: [
    {
      title: "Best time to go",
      text:
        "The west coast (Langkawi, Penang) is driest roughly November to March; the east coast (Perhentian, Redang, Tioman) is best April to October and largely shut during the November–February monsoon.",
    },
    {
      title: "Getting between states",
      text:
        "AirAsia and Malaysia Airlines cover domestic routes cheaply; the ETS train line links KL, Ipoh, and Butterworth (Penang) if you'd rather not fly.",
    },
    {
      title: "Money and SIM cards",
      text:
        "Ringgit (RM) is cash-friendly for hawker stalls; e-wallets like Touch 'n Go are widely accepted in cities. Airport SIM or eSIM counters are the easiest way to get connected on arrival.",
    },
    {
      title: "What to pack",
      text:
        "Light, breathable clothing plus one warm layer if Cameron Highlands or a Kinabalu climb is on the list — it drops close to 10°C at altitude at night.",
    },
    {
      title: "Respecting local customs",
      text:
        "Cover shoulders and knees when visiting mosques and temples (sarongs are usually provided at the door); remove shoes before entering homes and some guesthouses.",
    },
    {
      title: "Haze season",
      text:
        "Some years bring haze from regional land-clearing fires, typically July to October — worth checking air quality if outdoor-heavy plans (hiking, diving days) fall in that window.",
    },
  ],

  /* ---------------- ABOUT ---------------- */
  about: {
    heading: "About Jom Cuti",
    paragraphs: [
      "Jom Cuti — roughly \"let's take a break\" in Malay — started as a shared notes document between friends trying to plan trips around the country without re-researching the same routes every time.",
      "It's built to answer the three questions every trip starts with: where should I go, what's actually worth doing there, and how do I turn that into a schedule I'll follow. The destination guides, activity lists, and itinerary planner are all here for that.",
      "Everything on this site focuses on Malaysia specifically — no generic \"top 10 Asia\" filler, just the states, islands, and hill towns worth the trip, with enough detail to book confidently.",
    ],
  },

  /* ---------------- CONTACT ---------------- */
  contact: {
    heading: "Get in touch",
    text:
      "Spotted something out of date, or planning a trip and want it double-checked? Send a note.",
    email: "hello@jomcuti.my",
    phone: "+60 3-1234 5678",
    address: "Level 12, Menara Cuti, Jalan Ampang, 50450 Kuala Lumpur, Malaysia",
    hours: "Mon–Fri, 9am–6pm (MYT)",
  },
};
