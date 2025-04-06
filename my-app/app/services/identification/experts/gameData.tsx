const games = {
  "the legend of zelda: breath of the wild": {
    keywords: [
      "open world", "adventure", "exploration", "puzzles", "action",
      "fantasy", "shrines", "weapons", "crafting", "nintendo", "zelda",
      "2017", "legend", "breath", "wild", "link", "hyrule", "korok",
      "master sword", "divine beasts", "ganon", "runes", "cooking",
      "stamina", "glider", "climbing", "great plateau", "guardians",
      "champions", "sheikah slate", "trial of the sword"
    ]
  },
  "minecraft": {
    keywords: [
      "sandbox", "crafting", "building", "survival", "creativity", "blocks",
      "exploration", "multiplayer", "mods", "open world", "creeper", "java",
      "bedrock", "notch", "herobrine", "pickaxe", "enderman", "stone",
      "2009", "minecraft", "redstone", "nether", "end", "villager",
      "biomes", "diamonds", "zombies", "skeletons", "farming", "house",
      "minecart", "enchantment", "elytra", "stronghold", "beacon"
    ]
  },
  "wii sports": {
    keywords: [
      "bowling", "tennis", "wii", "sports", "boxing", "golf", "baseball",
      "mii", "nintendo", "2006", "remote", "multiplayer", "nunchuk",
      "single player", "fitness", "meme", "music", "motion controls",
      "family", "exercise", "casual", "fun", "party game", "arm workout",
      "stamina", "training mode", "champs", "gold medal"
    ]
  },
  "fortnite": {
    keywords: [
      "battle royale", "shooter", "building", "multiplayer", "cartoony",
      "competitive", "skins", "cross platform", "live events", "free to play",
      "crafting", "epic games", "third person", "online", "2017", "fortnite",
      "emotes", "victory royale", "storm", "loot", "weapons", "tilted towers",
      "battle pass", "dances", "battle bus", "bus", "challenges", "default dance"
    ]
  },
  "the witcher 3: wild hunt": {
    keywords: [
      "open world", "rpg", "story", "fantasy", "choices", "monsters",
      "quests", "characters", "mature", "geralt", "white hair", "past",
      "witcher", "hunt", "horse", "prophecy", "swords", "fighting", "2015",
      "magic", "potions", "alchemy", "romance", "expansive world",
      "cd projekt red", "triss", "yennefer", "griffin", "wild hunt", "gwent"
    ]
  },
  "animal crossing: new horizons": {
    keywords: [
      "life", "simulation", "relaxing", "customization", "villagers", "fishing",
      "decorating", "island", "multiplayer", "chill", "nintendo", "bubblegum",
      "isabelle", "nook", "gardening", "turnips", "trading", "2020",
      "cute", "seasonal events", "house design", "DIY crafting", "shops",
      "KK Slider", "museum", "Brewster", "bells", "terraforming"
    ]
  },
  "call of duty: warzone": {
    keywords: [
      "battle royale", "fps", "shooter", "multiplayer", "competitive",
      "modern warfare", "guns", "cross-platform", "teamwork", "fast", "paced",
      "realistic", "loadouts", "killstreaks", "drop zone",
      "vehicles", "gulag", "operators", "snipers", "warzone", "perks"
    ]
  },
  "stardew valley": {
    keywords: [
      "farming", "simulation", "relaxing", "crafting", "relationships",
      "exploration", "pixel art", "indie", "co-op", "chill", "star", "pc",
      "nintendo", "2016", "harvest", "seasons", "mining", "villagers",
      "festival", "small town", "romance", "crops", "animals", "farm life",
      "cooking", "greenhouse", "joja", "mart", "community center"
    ]
  },
  "among us": {
    keywords: [
      "social", "multiplayer", "teamwork", "deception", "space", "imposter",
      "strategy", "party", "quick matches", "fun", "killer", "victim",
      "tasks", "colored avatars", "vote", "2018", "crewmates",
      "emergency", "meeting", "sus", "discussion", "vent", "sabotage",
      "eject", "map", "spaceship"
    ]
  },
  "grand theft auto v": {
    keywords: [
      "open world", "action", "crime", "sandbox", "story-driven",
      "multiplayer", "cars", "heists", "mature", "gta online", "rob", "2013",
      "los santos", "shooting", "money", "gangs", "missions", "violence",
      "franklin", "trevor", "michael", "flying", "police", "chases",
      "bank", "stock market"
    ]
  },
  "plants vs. zombies": {
    keywords: [
      "plants", "zombies", "sun", "flower", "dave", "crazy", "strategy",
      "garden", "lawnmower", "horde", "waves", "shooting", "app",
      "potato", "ea", "popcap", "2009", "pea shooter", "walnut",
      "cherry bomb", "defense", "tower defense", "brains"
    ]
  },
  "job simulator": {
    keywords: [
      "computers", "vr", "htc", "vive", "psvr", "single player", "job", "desk",
      "convenience store", "humor", "gloves", "chef", "cartridge", "innovative",
      "pc", "robot", "mechanic", "cooking", "doughnut", "steam", "simulation",
      "owlchemy labs", "2016", "simulator"
    ]
  },
  "clash of clans": {
    keywords: [
      "clash", "clans", "goblins", "loot", "elixir", "gold", "multiplayer",
      "free", "ranked", "townhall", "app", "supercell", "dark elixir",
      "wizard", "attack", "mortar", "barbarian", "archer", "building",
      "challenges", "pekka", "base", "bomber", "witch", "mine", "collector",
      "2012"
    ]
  },
  "super mario odyssey": {
    keywords: [
      "platformer", "adventure", "nintendo", "exploration", "collectibles",
      "mario", "creativity", "colorful", "fun", "family friendly", "switch",
      "hat", "eyes", "single player", "worlds", "peach", "odyssey", "super",
      "2017", "city", "64", "cappy"
    ]
  },
  "cyberpunk 2077": {
    keywords: [
      "open world", "rpg", "futuristic", "story-driven", "choices", "cyberpunk",
      "mature", "characters", "first-person", "keanu reeves", "ps5", "robot",
      "gun", "night city", "future", "megalopolis", "power", "2020", "2077"
    ]
  },
  "rocket league": {
    keywords: [
      "sports", "cars", "soccer", "competitive", "multiplayer", "fast-paced",
      "team", "cross-platform", "fun", "physics", "football", "ps", "online",
      "2015", "rocket", "league"
    ]
  },
  "elden ring": {
    keywords: [
      "open world", "action rpg", "difficult", "boss fights", "dark fantasy",
      "exploration", "lore", "challenging", "fromsoftware", "george r.r. martin",
      "2022", "elden", "ring", "combat", "summons", "knights", "magic",
      "epic battles", "mystery", "runes", "spells", "great runes",
      "maidenless", "tarnished"
    ]
  },
  "overwatch": {
    keywords: [
      "fps", "hero shooter", "multiplayer", "teamwork", "competitive",
      "characters", "abilities", "esports", "fast-paced", "blizzard", "2016",
      "overwatch"
    ]
  },
  "mario kart": {
    keywords: [
      "mario", "karting", "multiplayer", "cars", "peach", "banana", "blue shell",
      "shell", "wii", "nintendo", "switch", "toad", "wii u", "ds", "yoshi",
      "item", "customize", "star", "super", "1992", "kart", "grand prix",
      "tracks", "speed boost", "rainbow", "road", "racing", "drifting", "mushroom"
    ]
  },
  "the last of us": {
    keywords: [
      "open world", "post-apocalyptic", "story-driven", "parent", "survival",
      "realistic", "award-winning", "mature", "exploration", "naughty dog",
      "2013", "ps3", "ps4", "cordyceps", "zombie", "infected", "tv adaptation",
      "sony", "fireflies", "soundtrack", "last", "us", "apocalypse", "daughter", 
      "man", "girl"
    ]
  }
};


export default games;
