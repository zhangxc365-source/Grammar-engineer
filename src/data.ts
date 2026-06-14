/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NounItem,
  VerbItem,
  ClassifierItem,
  PipeNode,
  LanguageCode,
  TranslationSet,
  GameLevel
} from "./types";

// Verbs Data Bank
const VERBS_DATA: Record<string, VerbItem> = {
  chi: {
    id: "chi",
    char: "吃",
    pinyin: "chī",
    allowedAttributes: ["food"],
    translations: {
      cn: "吃",
      en: "eat",
      mn: "идэх"
    }
  },
  he: {
    id: "he",
    char: "喝",
    pinyin: "hē",
    allowedAttributes: ["beverage"],
    translations: {
      cn: "喝",
      en: "drink",
      mn: "уух"
    }
  },
  qi: {
    id: "qi",
    char: "骑",
    pinyin: "qí",
    allowedAttributes: ["transport", "animal"], // e.g. ride bicycle, ride horse
    translations: {
      cn: "骑",
      en: "ride",
      mn: "унаж явах"
    }
  },
  kai: {
    id: "kai",
    char: "开",
    pinyin: "kāi",
    allowedAttributes: ["transport"], // drive car
    translations: {
      cn: "开",
      en: "drive",
      mn: "жолоодох"
    }
  },
  zuo: {
    id: "zuo",
    char: "坐",
    pinyin: "zuò",
    allowedAttributes: ["transport", "furniture"], // sit on chair, take plane/train/bus
    translations: {
      cn: "坐",
      en: "take / sit",
      mn: "суух"
    }
  },
  chuan: {
    id: "chuan",
    char: "穿",
    pinyin: "chuān",
    allowedAttributes: ["clothing"],
    translations: {
      cn: "穿",
      en: "wear",
      mn: "өмсөх"
    }
  },
  kan: {
    id: "kan",
    char: "看",
    pinyin: "kàn",
    allowedAttributes: ["media"], // read book, watch tv
    translations: {
      cn: "看",
      en: "read / watch",
      mn: "үзэх / унших"
    }
  },
  ting: {
    id: "ting",
    char: "听",
    pinyin: "tīng",
    allowedAttributes: ["music"], // listen to song
    translations: {
      cn: "听",
      en: "listen to",
      mn: "сонсох"
    }
  },
  mai: {
    id: "mai",
    char: "买",
    pinyin: "mǎi",
    allowedAttributes: ["food", "beverage", "clothing", "transport", "animal", "media", "furniture"], // can buy anything
    translations: {
      cn: "买",
      en: "buy",
      mn: "худалдаж авах"
    }
  }
};

// Classifiers Data Bank
const CLASSIFIERS_DATA: Record<string, ClassifierItem> = {
  ge: {
    id: "ge",
    char: "个",
    pinyin: "gè",
    translations: {
      cn: "个",
      en: "ge (general)",
      mn: "шүү (нийтлэг)"
    },
    usageHelp: {
      cn: "用于水果/人等通用名词",
      en: "General measure word for fruits, people",
      mn: "Жимс, хүн гэх мэт ерөнхий зүйлсд хэрэглэнэ"
    }
  },
  liang: {
    id: "liang",
    char: "辆",
    pinyin: "liàng",
    translations: {
      cn: "辆",
      en: "liàng (vehicles)",
      mn: "ширхэг (тээврийн хэрэгсэлд)"
    },
    usageHelp: {
      cn: "用于自行车/汽车等陆地车辆",
      en: "Used for land vehicles like bicycles, cars",
      mn: "Унадаг дугуй, машин зэрэг хуурай замын тээврийн хэрэгсэлд хэрэглэнэ"
    }
  },
  ben: {
    id: "ben",
    char: "本",
    pinyin: "běn",
    translations: {
      cn: "本",
      en: "běn (books)",
      mn: "боть (ном, хэвлэлд)"
    },
    usageHelp: {
      cn: "用于书本/报纸/杂志等册状物",
      en: "Used for bound items like books, papers",
      mn: "Ном, сонин, сэтгүүл зэрэг үдээстэй зүйлсд хэрэглэнэ"
    }
  },
  zhi: {
    id: "zhi",
    char: "只",
    pinyin: "zhī",
    translations: {
      cn: "只",
      en: "zhī (small animals)",
      mn: "ширхэг (жижиг амьтанд)"
    },
    usageHelp: {
      cn: "用于猫/狗/鸟等中小型动物",
      en: "Used for birds or animals like cats, dogs",
      mn: "Муур, нохой, шувуу зэрэг дунд, жижиг амьтанд хэрэглэнэ"
    }
  },
  tiao: {
    id: "tiao",
    char: "条",
    pinyin: "tiáo",
    translations: {
      cn: "条",
      en: "tiáo (long & thin)",
      mn: "ширхэг (нарийн урт)"
    },
    usageHelp: {
      cn: "用于鱼/裤子/河流等细长物",
      en: "Used for long thin objects like fish, trousers",
      mn: "Загас, өмд, гол зэрэг нарийн урт зүйлд хэрэглэнэ"
    }
  },
  jian: {
    id: "jian",
    char: "件",
    pinyin: "jiàn",
    translations: {
      cn: "件",
      en: "jiàn (clothes)",
      mn: "ширхэг (хувцас, хэрэгт)"
    },
    usageHelp: {
      cn: "用于衣服/衬衫等上衣物品",
      en: "Used for upper garments like shirts, coats",
      mn: "Цамц, хүрэм зэрэг дээд хэсгийн хувцас хэрэглэлд хэрэглэнэ"
    }
  },
  bei: {
    id: "bei",
    char: "杯",
    pinyin: "bēi",
    translations: {
      cn: "杯",
      en: "bēi (cups/beverages)",
      mn: "аяга (ундаанд)"
    },
    usageHelp: {
      cn: "用于杯装饮料 (水/牛奶)",
      en: "Used for cups of liquid/beverages",
      mn: "Аягатай ундаа (ус, сүү) зэрэгт хэрэглэнэ"
    }
  },
  wan: {
    id: "wan",
    char: "碗",
    pinyin: "wǎn",
    translations: {
      cn: "碗",
      en: "wǎn (food bowls)",
      mn: "аяга (хоолонд)"
    },
    usageHelp: {
      cn: "用于碗装食物 (米饭/面条)",
      en: "Used for bowls of food like rice, noodles",
      mn: "Аягатай хоол (будаа, гоомон) зэрэгт хэрэглэнэ"
    }
  },
  shou: {
    id: "shou",
    char: "首",
    pinyin: "shǒu",
    translations: {
      cn: "首",
      en: "shǒu (songs)",
      mn: "дуу (дуу шүлэгт)"
    },
    usageHelp: {
      cn: "用于歌曲 or 诗歌",
      en: "Used for songs or poems",
      mn: "Дуу болон шүлэг зохиолд хэрэглэнэ"
    }
  },
  zhang: {
    id: "zhang",
    char: "张",
    pinyin: "zhāng",
    translations: {
      cn: "张",
      en: "zhāng (flat objects)",
      mn: "ширхэг (хавтгай зүйл)"
    },
    usageHelp: {
      cn: "用于床面/桌子/纸张等扁平物品",
      en: "Used for flat objects like beds, tables, paper",
      mn: "Ор, ширээ, цаас зэрэг хавтгай гадаргуутай зүйлд хэрэглэнэ"
    }
  },
  shuang: {
    id: "shuang",
    char: "双",
    pinyin: "shuāng",
    translations: {
      cn: "双",
      en: "shuāng (pairs)",
      mn: "хос (гутал, савх)"
    },
    usageHelp: {
      cn: "用于成双成对物品 (鞋/筷子)",
      en: "Used for items in pairs like shoes, chopsticks",
      mn: "Гутал, савх зэрэг хос зүйлсд хэрэглэнэ"
    }
  },
  yixie: {
    id: "yixie",
    char: "一些",
    pinyin: "yīxiē",
    translations: {
      cn: "一些",
      en: "some",
      mn: "зарим / хэдэн"
    },
    usageHelp: {
      cn: "表示不确定的数量，适用于大部分名词",
      en: "Indicates an indefinite quantity / some. Used for most nouns.",
      mn: "Тодорхойгүй тоо ширхгийг заана, ихэнх нэр үгэнд хэрэглэнэ."
    }
  },
  yidianr: {
    id: "yidianr",
    char: "一点儿",
    pinyin: "yīdiǎnr",
    translations: {
      cn: "一点儿",
      en: "a little bit",
      mn: "жаахан / бага зэрэг"
    },
    usageHelp: {
      cn: "表示少量的，多用于不可数或微量名词",
      en: "Indicates a tiny amount / a little bit. Used for small or uncountable items.",
      mn: "Бага хэмжээг заана, тоологдохгүй болон маш бага зүйлд хэрэглэнэ."
    }
  }
};

// Nouns Data Bank
const NOUNS_DATA: Record<string, NounItem> = {
  baozhi: {
    id: "baozhi",
    char: "报纸",
    pinyin: "bàozhǐ",
    attribute: "media",
    classifiers: ["ben", "zhang"],
    translations: { cn: "报纸", en: "newspaper", mn: "сонин" }
  },
  feiji: {
    id: "feiji",
    char: "飞机",
    pinyin: "fēijī",
    attribute: "transport",
    classifiers: ["ge", "liang"],
    translations: { cn: "飞机", en: "airplane", mn: "онгоц" }
  },
  qiche: {
    id: "qiche",
    char: "汽车",
    pinyin: "qìchē",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "汽车", en: "car", mn: "машин" }
  },
  ge_sing: {
    id: "ge_sing",
    char: "歌",
    pinyin: "gē",
    attribute: "music",
    classifiers: ["shou"],
    translations: { cn: "歌", en: "song", mn: "дуу" }
  },
  baozi: {
    id: "baozi",
    char: "包子",
    pinyin: "bāo zi",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "包子", en: "Baozi", mn: "бууз" }
  },
  beizi: {
    id: "beizi",
    char: "杯子",
    pinyin: "bēi zi",
    attribute: "furniture",
    classifiers: ["ge"],
    translations: { cn: "杯子", en: "Cup", mn: "аяга" }
  },
  binggan: {
    id: "binggan",
    char: "饼干",
    pinyin: "bǐng gān",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "饼干", en: "Biscuit", mn: "жигнэмэг" }
  },
  caodi: {
    id: "caodi",
    char: "草地",
    pinyin: "cǎo dì",
    attribute: "furniture",
    classifiers: ["ge"],
    translations: { cn: "草地", en: "Lawn", mn: "зүлэг" }
  },
  cha: {
    id: "cha",
    char: "茶",
    pinyin: "chá",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "茶", en: "Tea", mn: "цай" }
  },
  chongzi: {
    id: "chongzi",
    char: "虫子",
    pinyin: "chóng zi",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "虫子", en: "Insect", mn: "хорхой" }
  },
  chuang: {
    id: "chuang",
    char: "床",
    pinyin: "chuáng",
    attribute: "furniture",
    classifiers: ["zhang"],
    translations: { cn: "床", en: "Bed", mn: "ор" }
  },
  cidian: {
    id: "cidian",
    char: "词典",
    pinyin: "cí diàn",
    attribute: "media",
    classifiers: ["ben"],
    translations: { cn: "词典", en: "Dictionary", mn: "толь бичиг" }
  },
  daxiang: {
    id: "daxiang",
    char: "大象",
    pinyin: "dà xiàng",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "大象", en: "Elephant", mn: "заан" }
  },
  dangao: {
    id: "dangao",
    char: "蛋糕",
    pinyin: "dàn gāo",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "蛋糕", en: "Cake", mn: "бялуу" }
  },
  ditie: {
    id: "ditie",
    char: "地铁",
    pinyin: "dì tiě",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "地铁", en: "Subway", mn: "метро" }
  },
  ditu: {
    id: "ditu",
    char: "地图",
    pinyin: "dì tú",
    attribute: "media",
    classifiers: ["zhang"],
    translations: { cn: "地图", en: "Map", mn: "газрын зураг" }
  },
  ertongche: {
    id: "ertongche",
    char: "儿童车",
    pinyin: "ér tóng chē",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "儿童车", en: "Stroller", mn: "хүүхдийн тэрэг" }
  },
  erduo: {
    id: "erduo",
    char: "耳朵",
    pinyin: "ěr duo",
    attribute: "clothing",
    classifiers: ["zhi"],
    translations: { cn: "耳朵", en: "Ear", mn: "чих" }
  },
  gonggongqiche: {
    id: "gonggongqiche",
    char: "公共汽车",
    pinyin: "gōng gòng qì chē",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "公共汽车", en: "Bus", mn: "автобус" }
  },
  gou: {
    id: "gou",
    char: "狗",
    pinyin: "gǒu",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "狗", en: "Dog", mn: "нохой" }
  },
  guozhi: {
    id: "guozhi",
    char: "果汁",
    pinyin: "guǒ zhī",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "果汁", en: "Fruit juice", mn: "жимсний шүү" }
  },
  houzi: {
    id: "houzi",
    char: "猴子",
    pinyin: "hóu zi",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "猴子", en: "Monkey", mn: "сармагчин" }
  },
  hudie: {
    id: "hudie",
    char: "蝴蝶",
    pinyin: "hú dié",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "蝴蝶", en: "Butterfly", mn: "эрвээхэй" }
  },
  hua: {
    id: "hua",
    char: "花",
    pinyin: "huā",
    attribute: "clothing",
    classifiers: ["ge"],
    translations: { cn: "花", en: "Flower", mn: "цэцэг" }
  },
  huoche: {
    id: "huoche",
    char: "火车",
    pinyin: "huǒ chē",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "火车", en: "Train", mn: "гал тэрэг" }
  },
  jidan: {
    id: "jidan",
    char: "鸡蛋",
    pinyin: "jī dàn",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "鸡蛋", en: "Egg", mn: "өндөг" }
  },
  jiaozi: {
    id: "jiaozi",
    char: "饺子",
    pinyin: "jiǎo zi",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "饺子", en: "Dumpling", mn: "банш" }
  },
  kafei: {
    id: "kafei",
    char: "咖啡",
    pinyin: "kā fēi",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "咖啡", en: "Coffee", mn: "кофе" }
  },
  kaoya: {
    id: "kaoya",
    char: "烤鸭",
    pinyin: "kǎo yā",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "烤鸭", en: "Roast duck", mn: "шарсан нугас" }
  },
  kuzi: {
    id: "kuzi",
    char: "裤子",
    pinyin: "kù zi",
    attribute: "clothing",
    classifiers: ["tiao"],
    translations: { cn: "裤子", en: "Trousers", mn: "өмд" }
  },
  kuaizi: {
    id: "kuaizi",
    char: "筷子",
    pinyin: "kuài zi",
    attribute: "clothing",
    classifiers: ["shuang"],
    translations: { cn: "筷子", en: "Chopsticks", mn: "савх" }
  },
  laohu: {
    id: "laohu",
    char: "老虎",
    pinyin: "lǎo hǔ",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "老虎", en: "Tiger", mn: "бар" }
  },
  liwu: {
    id: "liwu",
    char: "礼物",
    pinyin: "lǐ wù",
    attribute: "clothing",
    classifiers: ["ge"],
    translations: { cn: "礼物", en: "Gift", mn: "бэлэг" }
  },
  lu: {
    id: "lu",
    char: "路",
    pinyin: "lù",
    attribute: "furniture",
    classifiers: ["ge"],
    translations: { cn: "路", en: "Road", mn: "зам" }
  },
  mao: {
    id: "mao",
    char: "猫",
    pinyin: "māo",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "猫", en: "Cat", mn: "муур" }
  },
  mifan: {
    id: "mifan",
    char: "米饭",
    pinyin: "mǐ fàn",
    attribute: "food",
    classifiers: ["wan"],
    translations: { cn: "米饭", en: "Cooked rice", mn: "будаа" }
  },
  mianfen: {
    id: "mianfen",
    char: "面粉",
    pinyin: "miàn fěn",
    attribute: "food",
    classifiers: ["wan"],
    translations: { cn: "面粉", en: "Flour", mn: "гурил" }
  },
  miantiao: {
    id: "miantiao",
    char: "面条",
    pinyin: "miàn tiáo",
    attribute: "food",
    classifiers: ["wan"],
    translations: { cn: "面条", en: "Noodles", mn: "гоомон" }
  },
  miantiaoer: {
    id: "miantiaoer",
    char: "面条儿",
    pinyin: "miàn tiáo er",
    attribute: "food",
    classifiers: ["wan"],
    translations: { cn: "面条儿", en: "Noodles", mn: "гоомон" }
  },
  niao: {
    id: "niao",
    char: "鸟",
    pinyin: "niǎo",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "鸟", en: "Bird", mn: "шувуу" }
  },
  niunai: {
    id: "niunai",
    char: "牛奶",
    pinyin: "niú nǎi",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "牛奶", en: "Milk", mn: "сүү" }
  },
  paizi: {
    id: "paizi",
    char: "牌子",
    pinyin: "pái zi",
    attribute: "clothing",
    classifiers: ["ge"],
    translations: { cn: "牌子", en: "Brand", mn: "хаяг" }
  },
  panzi: {
    id: "panzi",
    char: "盘子",
    pinyin: "pán zi",
    attribute: "furniture",
    classifiers: ["ge"],
    translations: { cn: "盘子", en: "Plate", mn: "таваг" }
  },
  pingguo: {
    id: "pingguo",
    char: "苹果",
    pinyin: "píng guǒ",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "苹果", en: "Apple", mn: "алим" }
  },
  putao: {
    id: "putao",
    char: "葡萄",
    pinyin: "pú tao",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "葡萄", en: "Grape", mn: "усан үзэм" }
  },
  qianbi: {
    id: "qianbi",
    char: "铅笔",
    pinyin: "qiān bǐ",
    attribute: "clothing",
    classifiers: ["zhi"],
    translations: { cn: "铅笔", en: "Pencil", mn: "харандаа" }
  },
  qiaokeli: {
    id: "qiaokeli",
    char: "巧克力",
    pinyin: "qiǎo kè lì",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "巧克力", en: "Chocolate", mn: "шоколад" }
  },
  qunzi: {
    id: "qunzi",
    char: "裙子",
    pinyin: "qún zi",
    attribute: "clothing",
    classifiers: ["tiao"],
    translations: { cn: "裙子", en: "Skirt", mn: "юбка" }
  },
  shou: {
    id: "shou",
    char: "手",
    pinyin: "shǒu",
    attribute: "clothing",
    classifiers: ["zhi"],
    translations: { cn: "手", en: "Hand", mn: "гар" }
  },
  shoubiao: {
    id: "shoubiao",
    char: "手表",
    pinyin: "shǒu biǎo",
    attribute: "clothing",
    classifiers: ["zhi"],
    translations: { cn: "手表", en: "Watch", mn: "бугуйн цаг" }
  },
  shu: {
    id: "shu",
    char: "书",
    pinyin: "shū",
    attribute: "media",
    classifiers: ["ben"],
    translations: { cn: "书", en: "Book", mn: "ном" }
  },
  shui: {
    id: "shui",
    char: "水",
    pinyin: "shuǐ",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "水", en: "Water", mn: "ус" }
  },
  shuiguo: {
    id: "shuiguo",
    char: "水果",
    pinyin: "shuǐ guǒ",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "水果", en: "Fruit", mn: "жимс" }
  },
  tang: {
    id: "tang",
    char: "汤",
    pinyin: "tāng",
    attribute: "food",
    classifiers: ["wan"],
    translations: { cn: "汤", en: "Soup", mn: "шөл" }
  },
  tang_candy: {
    id: "tang_candy",
    char: "糖",
    pinyin: "táng",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "糖", en: "Candy", mn: "чихэр" }
  },
  tuzi: {
    id: "tuzi",
    char: "兔子",
    pinyin: "tù zi",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "兔子", en: "Rabbit", mn: "туулай" }
  },
  wanju: {
    id: "wanju",
    char: "玩具",
    pinyin: "wán jù",
    attribute: "clothing",
    classifiers: ["ge"],
    translations: { cn: "玩具", en: "Toy", mn: "тоглоом" }
  },
  wan_bowl: {
    id: "wan_bowl",
    char: "碗",
    pinyin: "wǎn",
    attribute: "furniture",
    classifiers: ["ge"],
    translations: { cn: "碗", en: "Bowl", mn: "аяга" }
  },
  xigua: {
    id: "xigua",
    char: "西瓜",
    pinyin: "xī guā",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "西瓜", en: "Watermelon", mn: "тарвас" }
  },
  xihongshi: {
    id: "xihongshi",
    char: "西红柿",
    pinyin: "xī hóng shì",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "西红柿", en: "Tomato", mn: "улаан лооль" }
  },
  xiangjiao: {
    id: "xiangjiao",
    char: "香蕉",
    pinyin: "xiāng jiāo",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "香蕉", en: "Banana", mn: "гадил" }
  },
  xiangquan: {
    id: "xiangquan",
    char: "项圈",
    pinyin: "xiàng quān",
    attribute: "clothing",
    classifiers: ["ge"],
    translations: { cn: "项圈", en: "Collar", mn: "хүзүүвч" }
  },
  xiaolongbao: {
    id: "xiaolongbao",
    char: "小笼包",
    pinyin: "xiǎo lóng bāo",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "小笼包", en: "Xaolongbao", mn: "бууз" }
  },
  xie: {
    id: "xie",
    char: "鞋",
    pinyin: "xié",
    attribute: "clothing",
    classifiers: ["shuang"],
    translations: { cn: "鞋", en: "Shoe", mn: "гутал" }
  },
  xiongmao: {
    id: "xiongmao",
    char: "熊猫",
    pinyin: "xióng māo",
    attribute: "animal",
    classifiers: ["zhi"],
    translations: { cn: "熊猫", en: "Panda", mn: "хулсны баавгай" }
  },
  yanjing: {
    id: "yanjing",
    char: "眼睛",
    pinyin: "yǎn jīng",
    attribute: "clothing",
    classifiers: ["zhi"],
    translations: { cn: "眼睛", en: "Eye", mn: "нүд" }
  },
  yangrou: {
    id: "yangrou",
    char: "羊肉",
    pinyin: "yáng ròu",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "羊肉", en: "Lamb", mn: "хонины мах" }
  },
  yao: {
    id: "yao",
    char: "药",
    pinyin: "yào",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "药", en: "Medicine", mn: "эм" }
  },
  yifu: {
    id: "yifu",
    char: "衣服",
    pinyin: "yī fu",
    attribute: "clothing",
    classifiers: ["jian"],
    translations: { cn: "衣服", en: "Clothes", mn: "хувцас" }
  },
  yinliao: {
    id: "yinliao",
    char: "饮料",
    pinyin: "yǐn liào",
    attribute: "beverage",
    classifiers: ["bei"],
    translations: { cn: "饮料", en: "Beverage", mn: "ундаа" }
  },
  yu: {
    id: "yu",
    char: "鱼",
    pinyin: "yú",
    attribute: "animal",
    classifiers: ["tiao"],
    translations: { cn: "鱼", en: "Fish", mn: "загас" }
  },
  yuebing: {
    id: "yuebing",
    char: "月饼",
    pinyin: "yuè bǐng",
    attribute: "food",
    classifiers: ["ge"],
    translations: { cn: "月饼", en: "Mooncake", mn: "сарны боов" }
  },
  zazhi: {
    id: "zazhi",
    char: "杂志",
    pinyin: "zá zhì",
    attribute: "media",
    classifiers: ["ben"],
    translations: { cn: "杂志", en: "Magazine", mn: "сэтгүүл" }
  },
  zhaopian: {
    id: "zhaopian",
    char: "照片",
    pinyin: "zhào piàn",
    attribute: "media",
    classifiers: ["zhang"],
    translations: { cn: "照片", en: "Photo", mn: "зураг" }
  },
  zhuozi: {
    id: "zhuozi",
    char: "桌子",
    pinyin: "zhuō zi",
    attribute: "furniture",
    classifiers: ["zhang"],
    translations: { cn: "桌子", en: "Table", mn: "ширээ" }
  },
  zixingche: {
    id: "zixingche",
    char: "自行车",
    pinyin: "zì xíng chē",
    attribute: "transport",
    classifiers: ["liang"],
    translations: { cn: "自行车", en: "Bicycle", mn: "унадаг дугуй" }
  }
};

export const DYNAMIC_CLASSIFIERS: Record<string, any> = {};

export const VERBS = new Proxy(VERBS_DATA, {
  get(target, prop) {
    if (typeof prop === "string") {
      if (target[prop]) return target[prop];
      const found = Object.values(target).find((item) => prop.startsWith(item.char) || item.char === prop);
      if (found) {
        return {
          ...found,
          char: prop,
          pinyin: getChPinyin(prop)
        };
      }
      if (prop.startsWith("画")) {
        return {
          id: "hua",
          char: prop,
          pinyin: "huà le",
          allowedAttributes: [],
          translations: { cn: "画了", en: "drew / painted", mn: "зурсан" }
        };
      }
    }
    if (typeof prop === "string" && !target[prop]) {
      return {
        id: prop,
        char: prop,
        pinyin: getChPinyin(prop),
        allowedAttributes: [],
        translations: { cn: prop, en: prop, mn: prop }
      };
    }
    return target[prop as string];
  }
});

export const CLASSIFIERS = new Proxy(CLASSIFIERS_DATA, {
  get(target, prop) {
    if (typeof prop === "string") {
      if (DYNAMIC_CLASSIFIERS[prop]) return DYNAMIC_CLASSIFIERS[prop];
      if (target[prop]) return target[prop];
      const found = Object.values(target).find((item) => prop.endsWith(item.char) || item.char === prop);
      if (found) {
        return {
          ...found,
          char: prop,
          pinyin: getChPinyin(prop)
        };
      }
    }
    if (typeof prop === "string" && !target[prop]) {
      return {
        id: prop,
        char: prop,
        pinyin: getChPinyin(prop),
        translations: { cn: prop, en: prop, mn: prop },
        usageHelp: { cn: "专属数量词搭配", en: "YCT specific classifier", mn: "" }
      };
    }
    return target[prop as string];
  }
});

export const NOUNS = new Proxy(NOUNS_DATA, {
  get(target, prop) {
    if (typeof prop === "string") {
      if (target[prop]) return target[prop];
      const found = Object.values(target).find((item) => item.char === prop || prop.startsWith(item.char));
      if (found) {
        return {
          ...found,
          char: prop,
          pinyin: getChPinyin(prop)
        };
      }
    }
    if (typeof prop === "string" && !target[prop]) {
      return {
        id: prop,
        char: prop,
        pinyin: getChPinyin(prop),
        attribute: "food" as any,
        classifiers: [prop],
        translations: { cn: prop, en: prop, mn: prop }
      };
    }
    return target[prop as string];
  }
});

// UI Multilingual Translations
export const UI_TEXTS: Record<string, Record<LanguageCode, string>> = {
  appName: {
    cn: "语法工程师",
    en: "Grammar Engineer",
    mn: "Грамматикийн инженер"
  },
  tagline: {
    cn: "汉语搭配管道维修中心 YCT 2-6",
    en: "Chinese collocation pipeline repair center YCT 2-6",
    mn: "Хятад хэлний холбоос үг засварын төв YCT 2-6"
  },
  noviceMode: {
    cn: "新手训练",
    en: "Novice Training",
    mn: "Шинэ хэрэглэгчийн сургалт"
  },
  noviceDesc: {
    cn: "日常经典搭配。适合YCT 2级，理解最基本量词逻辑如吃、喝、穿等。",
    en: "Classic daily combinations. Suitable for YCT Level 2.",
    mn: "Өдөр тутмын сонгодог холбоосууд. YCT 2-р түвшинд тохирно."
  },
  expertMode: {
    cn: "专家挑战",
    en: "Expert Challenge",
    mn: "Мэргэжилтний сорилт"
  },
  expertDesc: {
    cn: "高级量词与交通。适合YCT 3-6级，包含开、骑、坐、听歌等句式约束。",
    en: "Advanced classifiers & transit rules. Suitable for YCT Level 3-6.",
    mn: "Гүнзгий шатны ангилал үгс. YCT 3-6 түвшинд тохирно."
  },
  pkMode: {
    cn: "同屏竞速 PK 模式",
    en: "Same-Screen PK Mode",
    mn: "Нэг дэлгэцийн уралдаант PK горим"
  },
  pkDesc: {
    cn: "双人分屏对战！看谁修得又快又准。修好可给对手投掷阻碍物！",
    en: "2-Player split screen speed-run! Target opponent with slow-down rust!",
    mn: "2 тоглогчийн тулаан! Хэн нь илүү хурдан бөгөөд зөв засахыг үзээрэй."
  },
  aboutGame: {
    cn: "关于游戏",
    en: "About Game",
    mn: "Тоглоомын тухай"
  },
  instructionTitle: {
    cn: "汉字组装与管道维修指南",
    en: "Pipeline Assembly Instruction Guide",
    mn: "Ханз угсрах болон хоолой засах зааварчилгаа"
  },
  aboutText: {
    cn: "《语法工程师》是一款专为汉语二语学习者（YCT 2-4）设计的语法挑战游戏。在汉语中，动词、量词和名词之间有严格的物理与常识限制。比如：你不能‘吃一辆水’或者‘穿一本书’。不当的搭配会导致运输管道‘生锈断裂’。作为管道工程师，你的工作是找出红色断裂点，并用正确的量词和动作零件接通水流！",
    en: "Grammar Engineer is designed for Chinese learners (YCT 2-4) to mastercollocations (Verb + Measure Word + Noun). Wrong collocations break the logic pipeline! Fix the red leaks using proper matching chips to run the dynamic water flow.",
    mn: "'Грамматикийн инженер' бол Хятад хэлийг гадаад хэл болгон сурч буй хүүхдүүдэд (YCT 2-4) зориулсан хөгжилтэй тоглоом юм. Үйл үг, ангилал үг, нэр үг хоорондоо логик уялдаатай байх ёстой. Буруу холбоос хоолойг зэврүүлж зогсооно. Та инженер болж зөв хэсгүүдийг угсраарай!"
  },
  backToHome: {
    cn: "返回主页",
    en: "Back to Home",
    mn: "Эхлэл рүү буцах"
  },
  startPlaying: {
    cn: "开始游戏",
    en: "Start Game",
    mn: "Тоглоомыг эхлүүлэх"
  },
  demoBroken: {
    cn: "1. 管道断裂 (逻辑错误搭配)",
    en: "1. Broken Pipe (Grammar Mismatch)",
    mn: "1. Хоолой задрах (Логик алдаа)"
  },
  demoRepair: {
    cn: "2. 点击备件库选择正确词语",
    en: "2. Pick Correct Spares from Rack",
    mn: "2. Зөв хэсгийг сонгох"
  },
  demoFlow: {
    cn: "3. 管道合龙，绿色水流贯通！",
    en: "3. Pipeline connects, water flows!",
    mn: "3. Засагдаж урсгал сэргэнэ!"
  },
  prepTitle: {
    cn: "检测到工厂管道存在严重逻辑断裂！",
    en: "Serious logical breaks detected in the pipeline system!",
    mn: "Үйлдвэрийн дамжуулах хоолой алдаатай ажиллаж байна!"
  },
  prepDesc: {
    cn: "以下 5-8 处水管已被错误搭配堵塞，请立刻进入车间全面检修：",
    en: "These pipeline sections are clogged by bad combinations. Let's fix them:",
    mn: "Дараах хоолойнуудыг буруу холбож бөглөсөн тул засвар хийнэ үү:"
  },
  enterWorkshop: {
    cn: "进入工厂维修车间",
    en: "Enter Factory Workshop",
    mn: "Үйлдвэрийн засварын газар орох"
  },
  score: {
    cn: "维修分数",
    en: "Repair Score",
    mn: "Засварын оноо"
  },
  rustMeter: {
    cn: "生锈指数",
    en: "Rust Index",
    mn: "Зэврэлтийн хэмжээ"
  },
  progress: {
    cn: "维修进度",
    en: "Progress",
    mn: "Засварын явц"
  },
  pause: {
    cn: "暂停",
    en: "Pause",
    mn: "Түр зогсоох"
  },
  resume: {
    cn: "继续",
    en: "Resume",
    mn: "Үргэлжлүүлэх"
  },
  repairPopupTitle: {
    cn: "管道断裂聚焦维修",
    en: "Focused Pipe Maintenance",
    mn: "Хэсэгчилсэн хоолойн засвар хийх"
  },
  mismatchWarning: {
    cn: "⚠️ 搭配不匹配！警告：再错一次该节点将彻底生锈并锁定！",
    en: "⚠️ Collocation Mismatch! Warning: One more mistake will cause permanent rust lock!",
    mn: "⚠️ Буруу холбоос! Сануулга: Дахин нэг алдвал хоолой зэвэрч түгжигдэнэ."
  },
  nodeRustedLocked: {
    cn: "⚠️ 该管道已经彻底生锈，先修理其他管道，之后将进入「生锈复盘」解决！",
    en: "⚠️ This node is fully rusted & locked! Complete others, then you will fix this in 'Review Mode'!",
    mn: "⚠️ Энэ хоолой зэвэрсэн тул бусдыг засаад, дараа нь 'Зэврэлт шалгах' хэсэгт орно."
  },
  confirmRepair: {
    cn: "注入备件",
    en: "Deploy Spares",
    mn: "Угсрах"
  },
  verbCategory: {
    cn: "动词零件 (Verb Chip)",
    en: "Verb Spares",
    mn: "Үйл үгийн хэсэг"
  },
  classifierCategory: {
    cn: "量词零件 (Classifier)",
    en: "Classifier Spares",
    mn: "Ангилал үгийн хэсэг"
  },
  nounCategory: {
    cn: "名词零件 (Noun)",
    en: "Noun Spares",
    mn: "Нэр үгийн хэсэг"
  },
  correctFeedback: {
    cn: "🎉 搭配完美！水流成功通过！ +10",
    en: "🎉 Perfect collocation! Water flows! +10",
    mn: "🎉 Уялдаа холбоос төгс таарлаа! +10"
  },
  wrongFeedback: {
    cn: "⚠️ 搭配有误！请仔细核对语法！",
    en: "⚠️ Incorrect collocation! Please double check your grammar!",
    mn: "⚠️ Буруу холбоос! Дүрмээ дахин шалгана уу."
  }
};

export interface YctQuestionSpec {
  level: "YCT2" | "YCT3" | "YCT4" | "YCT5" | "YCT6";
  verb: string;
  classifier: string;
  noun: string;
  distractor1: string;
  distractor2: string;
  prototype?: string;
}

export const YCT_QUESTION_BANK_BASE: any[] = [
  // YCT2
  { level: "YCT2", verb: "吃了", classifier: "三个", noun: "苹果", distractor1: "五只", distractor2: "八条" },
  { level: "YCT2", verb: "画了", classifier: "七个", noun: "苹果", distractor1: "二杯", distractor2: "九件" },
  { level: "YCT2", verb: "买了", classifier: "两个", noun: "苹果", distractor1: "两只", distractor2: "两条" },
  { level: "YCT2", verb: "喝了", classifier: "五杯", noun: "牛奶", distractor1: "三个", distractor2: "五只" },
  { level: "YCT2", verb: "画了", classifier: "九杯", noun: "牛奶", distractor1: "二只", distractor2: "九个" },
  { level: "YCT2", verb: "买了", classifier: "四杯", noun: "牛奶", distractor1: "八支", distractor2: "四个" },
  { level: "YCT2", verb: "喝了", classifier: "一杯", noun: "水", distractor1: "十个", distractor2: "一只" },
  { level: "YCT2", verb: "画了", classifier: "八杯", noun: "水", distractor1: "五条", distractor2: "八个" },
  { level: "YCT2", verb: "买了", classifier: "三杯", noun: "水", distractor1: "九个", distractor2: "三只" },
  { level: "YCT2", verb: "画了", classifier: "六只", noun: "眼睛", distractor1: "四支", distractor2: "六个" },
  { level: "YCT2", verb: "画了", classifier: "两只", noun: "手", distractor1: "五支", distractor2: "两个" },
  { level: "YCT2", verb: "画了", classifier: "五只", noun: "耳朵", distractor1: "三支", distractor2: "五个" },
  { level: "YCT2", verb: "画了", classifier: "九只", noun: "猫", distractor1: "八支", distractor2: "九个" },
  { level: "YCT2", verb: "买了", classifier: "三只", noun: "猫", distractor1: "六支", distractor2: "三个" },
  { level: "YCT2", verb: "画了", classifier: "七只", noun: "狗", distractor1: "一支", distractor2: "七个" },
  { level: "YCT2", verb: "买了", classifier: "四只", noun: "狗", distractor1: "九支", distractor2: "四个" },
  { level: "YCT2", verb: "吃了", classifier: "两只", noun: "鱼", distractor1: "五支", distractor2: "两个" },
  { level: "YCT2", verb: "画了", classifier: "八只", noun: "鱼", distractor1: "三支", distractor2: "八个" },
  { level: "YCT2", verb: "买了", classifier: "五只", noun: "鱼", distractor1: "二支", distractor2: "五个" },
  { level: "YCT2", verb: "画了", classifier: "一只", noun: "鸟", distractor1: "七支", distractor2: "一个" },
  { level: "YCT2", verb: "买了", classifier: "六只", noun: "鸟", distractor1: "四支", distractor2: "六个" },
  { level: "YCT2", verb: "画了", classifier: "四支", noun: "铅笔", distractor1: "九个", distractor2: "四只" },
  { level: "YCT2", verb: "买了", classifier: "九支", noun: "铅笔", distractor1: "二只", distractor2: "九个" },
  { level: "YCT2", verb: "吃了", classifier: "三个", noun: "包子", distractor1: "六杯", distractor2: "三只" },
  { level: "YCT2", verb: "画了", classifier: "七个", noun: "包子", distractor1: "八只", distractor2: "七杯" },
  { level: "YCT2", verb: "买了", classifier: "两个", noun: "包子", distractor1: "五本", distractor2: "两只" },
  { level: "YCT2", verb: "喝了", classifier: "五杯", noun: "茶", distractor1: "三个", distractor2: "五只" },
  { level: "YCT2", verb: "画了", classifier: "八杯", noun: "茶", distractor1: "九只", distractor2: "八个" },
  { level: "YCT2", verb: "买了", classifier: "一杯", noun: "茶", distractor1: "四条", distractor2: "一个" },
  { level: "YCT2", verb: "喝了", classifier: "四杯", noun: "冰水", distractor1: "二个", distractor2: "四只" },
  { level: "YCT2", verb: "画了", classifier: "九杯", noun: "冰水", distractor1: "五支", distractor2: "九个" },
  { level: "YCT2", verb: "买了", classifier: "六杯", noun: "冰水", distractor1: "七只", distractor2: "六个" },
  { level: "YCT2", verb: "画了", classifier: "三本", noun: "书", distractor1: "八个", distractor2: "三只" },
  { level: "YCT2", verb: "买了", classifier: "七本", noun: "书", distractor1: "一杯", distractor2: "七个" },
  { level: "YCT2", verb: "画了", classifier: "两只", noun: "熊猫", distractor1: "六支", distractor2: "两个" },
  { level: "YCT2", verb: "买了", classifier: "五只", noun: "熊猫", distractor1: "九支", distractor2: "五个" },

  // YCT3
  { level: "YCT3", verb: "给你", classifier: "八个", noun: "苹果", distractor1: "二杯", distractor2: "八只" },
  { level: "YCT3", verb: "送你", classifier: "四个", noun: "苹果", distractor1: "六只", distractor2: "四杯" },
  { level: "YCT3", verb: "找到", classifier: "两个", noun: "苹果", distractor1: "三条", distractor2: "两只" },
  { level: "YCT3", verb: "丢了", classifier: "九个", noun: "苹果", distractor1: "五本", distractor2: "九只" },
  { level: "YCT3", verb: "买了", classifier: "三只", noun: "鞋", distractor1: "八支", distractor2: "三个" },
  { level: "YCT3", verb: "给你", classifier: "六只", noun: "鞋", distractor1: "五支", distractor2: "六个" },
  { level: "YCT3", verb: "送你", classifier: "一只", noun: "鞋", distractor1: "三支", distractor2: "一个" },
  { level: "YCT3", verb: "找到", classifier: "五只", noun: "鞋", distractor1: "四支", distractor2: "五个" },
  { level: "YCT3", verb: "丢了", classifier: "七只", noun: "鞋", distractor1: "二支", distractor2: "七个" },
  { level: "YCT3", verb: "穿了", classifier: "一只", noun: "鞋", distractor1: "六支", distractor2: "一个" },
  { level: "YCT3", verb: "给你", classifier: "四杯", noun: "牛奶", distractor1: "三个", distractor2: "四只" },
  { level: "YCT3", verb: "送你", classifier: "八杯", noun: "牛奶", distractor1: "一条", distractor2: "八个" },
  { level: "YCT3", verb: "找到", classifier: "三杯", noun: "牛奶", distractor1: "五只", distractor2: "三个" },
  { level: "YCT3", verb: "给你", classifier: "六杯", noun: "水", distractor1: "二个", distractor2: "六只" },
  { level: "YCT3", verb: "送你", classifier: "两杯", noun: "水", distractor1: "两条", distractor2: "两个" },
  { level: "YCT3", verb: "找到", classifier: "九杯", noun: "水", distractor1: "四只", distractor2: "九个" },
  { level: "YCT3", verb: "给你", classifier: "五只", noun: "猫", distractor1: "二支", distractor2: "五个" },
  { level: "YCT3", verb: "送你", classifier: "三只", noun: "猫", distractor1: "六支", distractor2: "三个" },
  { level: "YCT3", verb: "找到", classifier: "七只", noun: "猫", distractor1: "八支", distractor2: "七个" },
  { level: "YCT3", verb: "丢了", classifier: "一只", noun: "猫", distractor1: "九支", distractor2: "一个" },
  { level: "YCT3", verb: "给你", classifier: "四只", noun: "狗", distractor1: "八支", distractor2: "四个" },
  { level: "YCT3", verb: "送你", classifier: "八只", noun: "狗", distractor1: "三支", distractor2: "八个" },
  { level: "YCT3", verb: "找到", classifier: "两只", noun: "狗", distractor1: "五支", distractor2: "两个" },
  { level: "YCT3", verb: "丢了", classifier: "六只", noun: "狗", distractor1: "一支", distractor2: "六个" },
  { level: "YCT3", verb: "给你", classifier: "三只", noun: "鱼", distractor1: "九支", distractor2: "三个" },
  { level: "YCT3", verb: "送你", classifier: "九只", noun: "鱼", distractor1: "二支", distractor2: "九个" },
  { level: "YCT3", verb: "找到", classifier: "五只", noun: "鱼", distractor1: "八支", distractor2: "五个" },
  { level: "YCT3", verb: "丢了", classifier: "七只", noun: "鱼", distractor1: "三支", distractor2: "七个" },
  { level: "YCT3", verb: "给你", classifier: "两只", noun: "鸟", distractor1: "六支", distractor2: "两个" },
  { level: "YCT3", verb: "送你", classifier: "四只", noun: "鸟", distractor1: "五支", distractor2: "四个" },
  { level: "YCT3", verb: "找到", classifier: "六只", noun: "鸟", distractor1: "九支", distractor2: "六个" },
  { level: "YCT3", verb: "丢了", classifier: "八只", noun: "鸟", distractor1: "五支", distractor2: "八个" },
  { level: "YCT3", verb: "给你", classifier: "一支", noun: "铅笔", distractor1: "三个", distractor2: "一只" },
  { level: "YCT3", verb: "送你", classifier: "三支", noun: "铅笔", distractor1: "七只", distractor2: "三个" },
  { level: "YCT3", verb: "找到", classifier: "五支", noun: "铅笔", distractor1: "二杯", distractor2: "五个" },
  { level: "YCT3", verb: "丢了", classifier: "七支", noun: "铅笔", distractor1: "九条", distractor2: "七个" },
  { level: "YCT3", verb: "给你", classifier: "九个", noun: "包子", distractor1: "四只", distractor2: "九杯" },
  { level: "YCT3", verb: "送你", classifier: "四个", noun: "包子", distractor1: "八本", distractor2: "四只" },
  { level: "YCT3", verb: "找到", classifier: "两个", noun: "包子", distractor1: "两只", distractor2: "两本" },
  { level: "YCT3", verb: "丢了", classifier: "六个", noun: "包子", distractor1: "一条", distractor2: "六只" },
  { level: "YCT3", verb: "给你", classifier: "三杯", noun: "茶", distractor1: "五个", distractor2: "三只" },
  { level: "YCT3", verb: "送你", classifier: "八杯", noun: "茶", distractor1: "二只", distractor2: "八个" },
  { level: "YCT3", verb: "找到", classifier: "五杯", noun: "茶", distractor1: "九条", distractor2: "五个" },
  { level: "YCT3", verb: "给你", classifier: "七杯", noun: "冰水", distractor1: "四个", distractor2: "七只" },
  { level: "YCT3", verb: "送你", classifier: "两杯", noun: "冰水", distractor1: "六只", distractor2: "两个" },
  { level: "YCT3", verb: "找到", classifier: "四杯", noun: "冰水", distractor1: "八本", distractor2: "四个" },
  { level: "YCT3", verb: "给你", classifier: "六本", noun: "书", distractor1: "三个", distractor2: "六个" },
  { level: "YCT3", verb: "送你", classifier: "一本", noun: "书", distractor1: "五只", distractor2: "一个" },
  { level: "YCT3", verb: "找到", classifier: "九本", noun: "书", distractor1: "二杯", distractor2: "九个" },
  { level: "YCT3", verb: "丢了", classifier: "三本", noun: "书", distractor1: "七条", distractor2: "三个" },
  { level: "YCT3", verb: "给你", classifier: "五只", noun: "熊猫", distractor1: "八支", distractor2: "五个" },
  { level: "YCT3", verb: "送你", classifier: "八只", noun: "熊猫", distractor1: "三支", distractor2: "八个" },
  { level: "YCT3", verb: "找到", classifier: "两只", noun: "熊猫", distractor1: "两支", distractor2: "两个" },
  { level: "YCT3", verb: "画了", classifier: "四只", noun: "老虎", distractor1: "二支", distractor2: "四个" },
  { level: "YCT3", verb: "买了", classifier: "七只", noun: "老虎", distractor1: "五支", distractor2: "七个" },
  { level: "YCT3", verb: "给你", classifier: "一只", noun: "老虎", distractor1: "六支", distractor2: "一个" },
  { level: "YCT3", verb: "送你", classifier: "六只", noun: "老虎", distractor1: "八支", distractor2: "六个" },
  { level: "YCT3", verb: "找到", classifier: "三只", noun: "老虎", distractor1: "九支", distractor2: "三个" },

  // YCT4
  { level: "YCT4", verb: "卖了", classifier: "八只", noun: "鞋", distractor1: "二支", distractor2: "八个" },
  { level: "YCT4", verb: "拿着", classifier: "两只", noun: "鞋", distractor1: "两条", distractor2: "两个" },
  { level: "YCT4", verb: "卖了", classifier: "五个", noun: "苹果", distractor1: "三只", distractor2: "五杯" },
  { level: "YCT4", verb: "拿着", classifier: "九个", noun: "苹果", distractor1: "四条", distractor2: "九只" },
  { level: "YCT4", verb: "卖了", classifier: "三杯", noun: "牛奶", distractor1: "七个", distractor2: "三只" },
  { level: "YCT4", verb: "拿着", classifier: "七杯", noun: "牛奶", distractor1: "二只", distractor2: "七个" },
  { level: "YCT4", verb: "卖了", classifier: "四只", noun: "鱼", distractor1: "八支", distractor2: "四个" },
  { level: "YCT4", verb: "拿着", classifier: "六只", noun: "鱼", distractor1: "三支", distractor2: "六个" },
  { level: "YCT4", verb: "卖了", classifier: "一杯", noun: "茶", distractor1: "五条", distractor2: "一个" },
  { level: "YCT4", verb: "拿着", classifier: "八杯", noun: "茶", distractor1: "三个", distractor2: "八个" },
  { level: "YCT4", verb: "卖了", classifier: "两只", noun: "熊猫", distractor1: "二支", distractor2: "两个" },
  { level: "YCT4", verb: "拿着", classifier: "五只", noun: "熊猫", distractor1: "六支", distractor2: "五个" },
  { level: "YCT4", verb: "穿了", classifier: "三条", noun: "裙子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT4", verb: "拿着", classifier: "七条", noun: "裙子", distractor1: "二杯", distractor2: "七只" },
  { level: "YCT4", verb: "带了", classifier: "九条", noun: "裙子", distractor1: "五只", distractor2: "九件" },
  { level: "YCT4", verb: "选了", classifier: "四条", noun: "裙子", distractor1: "六件", distractor2: "四个" },
  { level: "YCT4", verb: "画了", classifier: "两件", noun: "衣服", distractor1: "九条", distractor2: "五个" },
  { level: "YCT4", verb: "买了", classifier: "六件", noun: "衣服", distractor1: "三个", distractor2: "六条" },
  { level: "YCT4", verb: "给你", classifier: "八件", noun: "衣服", distractor1: "一杯", distractor2: "八个" },
  { level: "YCT4", verb: "卖了", classifier: "一件", noun: "衣服", distractor1: "四只", distractor2: "一个" },
  { level: "YCT4", verb: "送你", classifier: "五件", noun: "衣服", distractor1: "七条", distractor2: "五个" },
  { level: "YCT4", verb: "找到", classifier: "三件", noun: "衣服", distractor1: "二个", distractor2: "三条" },
  { level: "YCT4", verb: "丢了", classifier: "七件", noun: "衣服", distractor1: "九只", distractor2: "七个" },
  { level: "YCT4", verb: "穿了", classifier: "四件", noun: "衣服", distractor1: "八条", distractor2: "四个" },
  { level: "YCT4", verb: "拿着", classifier: "九件", noun: "衣服", distractor1: "二杯", distractor2: "九个" },
  { level: "YCT4", verb: "带了", classifier: "两件", noun: "衣服", distractor1: "六只", distractor2: "两只" },
  { level: "YCT4", verb: "选了", classifier: "六件", noun: "衣服", distractor1: "五个", distractor2: "六个" },
  { level: "YCT4", verb: "画了", classifier: "三条", noun: "裤子", distractor1: "八件", distractor2: "三个" },
  { level: "YCT4", verb: "买了", classifier: "五条", noun: "裤子", distractor1: "一只", distractor2: "五个" },
  { level: "YCT4", verb: "给你", classifier: "八条", noun: "裤子", distractor1: "二个", distractor2: "八件" },
  { level: "YCT4", verb: "卖了", classifier: "一条", noun: "裤子", distractor1: "七杯", distractor2: "一件" },
  { level: "YCT4", verb: "送你", classifier: "七条", noun: "裤子", distractor1: "四件", distractor2: "七个" },
  { level: "YCT4", verb: "找到", classifier: "四条", noun: "裤子", distractor1: "九只", distractor2: "四个" },
  { level: "YCT4", verb: "丢了", classifier: "两条", noun: "裤子", distractor1: "五个", distractor2: "两件" },
  { level: "YCT4", verb: "穿了", classifier: "九条", noun: "裤子", distractor1: "六件", distractor2: "九只" },
  { level: "YCT4", verb: "拿着", classifier: "六条", noun: "裤子", distractor1: "三只", distractor2: "六个" },
  { level: "YCT4", verb: "带了", classifier: "三条", noun: "裤子", distractor1: "八个", distractor2: "三件" },
  { level: "YCT4", verb: "选了", classifier: "五条", noun: "裤子", distractor1: "二只", distractor2: "五个" },
  { level: "YCT4", verb: "吃了", classifier: "九条", noun: "鱼", distractor1: "七个", distractor2: "九个" },
  { level: "YCT4", verb: "画了", classifier: "五条", noun: "鱼", distractor1: "三只", distractor2: "五个" },
  { level: "YCT4", verb: "买了", classifier: "一条", noun: "鱼", distractor1: "八杯", distractor2: "一个" },
  { level: "YCT4", verb: "给你", classifier: "七条", noun: "鱼", distractor1: "二件", distractor2: "七个" },
  { level: "YCT4", verb: "卖了", classifier: "两条", noun: "鱼", distractor1: "九个", distractor2: "两只" },
  { level: "YCT4", verb: "送你", classifier: "四条", noun: "鱼", distractor1: "六只", distractor2: "四个" },
  { level: "YCT4", verb: "找到", classifier: "八条", noun: "鱼", distractor1: "一杯", distractor2: "八个" },
  { level: "YCT4", verb: "丢了", classifier: "六条", noun: "鱼", distractor1: "五个", distractor2: "六个" },
  { level: "YCT4", verb: "拿着", classifier: "三条", noun: "鱼", distractor1: "七件", distractor2: "三个" },
  { level: "YCT4", verb: "画了", classifier: "两件", noun: "礼物", distractor1: "九个", distractor2: "两条" },
  { level: "YCT4", verb: "买了", classifier: "九件", noun: "礼物", distractor1: "四只", distractor2: "九个" },
  { level: "YCT4", verb: "给你", classifier: "六件", noun: "礼物", distractor1: "三条", distractor2: "六个" },
  { level: "YCT4", verb: "卖了", classifier: "三件", noun: "礼物", distractor1: "八杯", distractor2: "三个" },
  { level: "YCT4", verb: "送你", classifier: "五件", noun: "礼物", distractor1: "二只", distractor2: "五个" },
  { level: "YCT4", verb: "找到", classifier: "七件", noun: "礼物", distractor1: "一条", distractor2: "七个" },
  { level: "YCT4", verb: "丢了", classifier: "一件", noun: "礼物", distractor1: "六个", distractor2: "一条" },
  { level: "YCT4", verb: "拿着", classifier: "八件", noun: "礼物", distractor1: "二只", distractor2: "八个" },
  { level: "YCT4", verb: "画了", classifier: "八个", noun: "杯子", distractor1: "五条", distractor2: "八只" },
  { level: "YCT4", verb: "买了", classifier: "两个", noun: "杯子", distractor1: "九件", distractor2: "两只" },
  { level: "YCT4", verb: "给你", classifier: "六个", noun: "杯子", distractor1: "三只", distractor2: "六只" },
  { level: "YCT4", verb: "卖了", classifier: "九个", noun: "杯子", distractor1: "一条", distractor2: "九只" },
  { level: "YCT4", verb: "送你", classifier: "三个", noun: "杯子", distractor1: "八只", distractor2: "三支" },
  { level: "YCT4", verb: "找到", classifier: "五个", noun: "杯子", distractor1: "二件", distractor2: "五个" },
  { level: "YCT4", verb: "丢了", classifier: "七个", noun: "杯子", distractor1: "四条", distractor2: "七只" },
  { level: "YCT4", verb: "拿着", classifier: "一个", noun: "杯子", distractor1: "六只", distractor2: "一只" },
  { level: "YCT4", verb: "喝了", classifier: "五杯", noun: "果汁", distractor1: "三个", distractor2: "五只" },
  { level: "YCT4", verb: "画了", classifier: "七杯", noun: "果汁", distractor1: "二条", distractor2: "七个" },
  { level: "YCT4", verb: "买了", classifier: "一杯", noun: "果汁", distractor1: "六只", distractor2: "一个" },
  { level: "YCT4", verb: "给你", classifier: "四杯", noun: "果汁", distractor1: "八件", distractor2: "四个" },
  { level: "YCT4", verb: "卖了", classifier: "八杯", noun: "果汁", distractor1: "五个", distractor2: "八个" },
  { level: "YCT4", verb: "送你", classifier: "两杯", noun: "果汁", distractor1: "九条", distractor2: "两个" },
  { level: "YCT4", verb: "找到", classifier: "六杯", noun: "果汁", distractor1: "三只", distractor2: "六个" },
  { level: "YCT4", verb: "拿着", classifier: "九杯", noun: "果汁", distractor1: "一件", distractor2: "九个" },
  { level: "YCT4", verb: "画了", classifier: "五条", noun: "路", distractor1: "三个", distractor2: "五只" },
  { level: "YCT4", verb: "找到", classifier: "七条", noun: "路", distractor1: "二只", distractor2: "七个" },
  { level: "YCT4", verb: "走", classifier: "一条", noun: "路", distractor1: "九杯", distractor2: "一个" },
  { level: "YCT4", verb: "画了", classifier: "四条", noun: "裙子", distractor1: "六只", distractor2: "四个" },
  { level: "YCT4", verb: "买了", classifier: "八条", noun: "裙子", distractor1: "二个", distractor2: "八只" },
  { level: "YCT4", verb: "给你", classifier: "两条", noun: "裙子", distractor1: "九件", distractor2: "两只" },
  { level: "YCT4", verb: "卖了", classifier: "六条", noun: "裙子", distractor1: "三只", distractor2: "六件" },
  { level: "YCT4", verb: "送你", classifier: "九条", noun: "裙子", distractor1: "一杯", distractor2: "九个" },
  { level: "YCT4", verb: "找到", classifier: "三条", noun: "裙子", distractor1: "五只", distractor2: "三个" },
  { level: "YCT4", verb: "丢了", classifier: "五条", noun: "裙子", distractor1: "八个", distractor2: "五只" },

  // YCT5
  { level: "YCT5", verb: "放了", classifier: "三只", noun: "鞋", distractor1: "八支", distractor2: "三个" },
  { level: "YCT5", verb: "带了", classifier: "七只", noun: "鞋", distractor1: "五支", distractor2: "七个" },
  { level: "YCT5", verb: "放了", classifier: "六条", noun: "裙子", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "放了", classifier: "四件", noun: "衣服", distractor1: "八条", distractor2: "四个" },
  { level: "YCT5", verb: "放了", classifier: "九条", noun: "裤子", distractor1: "五件", distractor2: "九个" },
  { level: "YCT5", verb: "放了", classifier: "两条", noun: "鱼", distractor1: "七只", distractor2: "两个" },
  { level: "YCT5", verb: "放了", classifier: "八件", noun: "礼物", distractor1: "三条", distractor2: "八个" },
  { level: "YCT5", verb: "放了", classifier: "五个", noun: "杯子", distractor1: "四只", distractor2: "五条" },
  { level: "YCT5", verb: "放了", classifier: "一杯", noun: "果汁", distractor1: "九个", distractor2: "一只" },
  { level: "YCT5", verb: "拿着", classifier: "三碗", noun: "苹果", distractor1: "八只", distractor2: "三个" },
  { level: "YCT5", verb: "放了", classifier: "七碗", noun: "苹果", distractor1: "二只", distractor2: "七个" },
  { level: "YCT5", verb: "拿着", classifier: "四碗", noun: "牛奶", distractor1: "一只", distractor2: "四个" },
  { level: "YCT5", verb: "放了", classifier: "六碗", noun: "牛奶", distractor1: "三支", distractor2: "六个" },
  { level: "YCT5", verb: "拿着", classifier: "两碗", noun: "水", distractor1: "九只", distractor2: "两个" },
  { level: "YCT5", verb: "放了", classifier: "八碗", noun: "水", distractor1: "五支", distractor2: "八个" },
  { level: "YCT5", verb: "拿着", classifier: "五碗", noun: "茶", distractor1: "六只", distractor2: "五个" },
  { level: "YCT5", verb: "放了", classifier: "十碗", noun: "茶", distractor1: "二支", distractor2: "十个" },
  { level: "YCT5", verb: "拿着", classifier: "三碗", noun: "冰水", distractor1: "七只", distractor2: "三个" },
  { level: "YCT5", verb: "放了", classifier: "九碗", noun: "冰水", distractor1: "四支", distractor2: "九个" },
  { level: "YCT5", verb: "拿着", classifier: "六碗", noun: "水果", distractor1: "二只", distractor2: "六个" },
  { level: "YCT5", verb: "放了", classifier: "四碗", noun: "水果", distractor1: "八支", distractor2: "四个" },
  { level: "YCT5", verb: "拿着", classifier: "七碗", noun: "香蕉", distractor1: "三只", distractor2: "七个" },
  { level: "YCT5", verb: "放了", classifier: "两碗", noun: "香蕉", distractor1: "九支", distractor2: "两个" },
  { level: "YCT5", verb: "拿着", classifier: "八碗", noun: "面条儿", distractor1: "五只", distractor2: "八个" },
  { level: "YCT5", verb: "放了", classifier: "一碗", noun: "面条儿", distractor1: "六支", distractor2: "一个" },
  { level: "YCT5", verb: "拿着", classifier: "五碗", noun: "饺子", distractor1: "四只", distractor2: "五个" },
  { level: "YCT5", verb: "放了", classifier: "三碗", noun: "饺子", distractor1: "二支", distractor2: "三个" },
  { level: "YCT5", verb: "拿着", classifier: "九碗", noun: "糖", distractor1: "七只", distractor2: "九个" },
  { level: "YCT5", verb: "放了", classifier: "四碗", noun: "糖", distractor1: "六支", distractor2: "四个" },
  { level: "YCT5", verb: "拿着", classifier: "六碗", noun: "西瓜", distractor1: "一只", distractor2: "六个" },
  { level: "YCT5", verb: "放了", classifier: "两碗", noun: "西瓜", distractor1: "八支", distractor2: "两个" },
  { level: "YCT5", verb: "吃了", classifier: "八碗", noun: "菜", distractor1: "三只", distractor2: "八个" },
  { level: "YCT5", verb: "买了", classifier: "五碗", noun: "菜", distractor1: "六支", distractor2: "五个" },
  { level: "YCT5", verb: "给你", classifier: "三碗", noun: "菜", distractor1: "九只", distractor2: "三个" },
  { level: "YCT5", verb: "卖了", classifier: "七碗", noun: "菜", distractor1: "二支", distractor2: "七个" },
  { level: "YCT5", verb: "送你", classifier: "四碗", noun: "菜", distractor1: "八只", distractor2: "四个" },
  { level: "YCT5", verb: "找到", classifier: "九碗", noun: "菜", distractor1: "一支", distractor2: "九个" },
  { level: "YCT5", verb: "拿着", classifier: "六碗", noun: "菜", distractor1: "四只", distractor2: "六个" },
  { level: "YCT5", verb: "放了", classifier: "两碗", noun: "菜", distractor1: "七支", distractor2: "两个" },
  { level: "YCT5", verb: "拿着", classifier: "五碗", noun: "米饭", distractor1: "三只", distractor2: "五个" },
  { level: "YCT5", verb: "画了", classifier: "七只", noun: "兔子", distractor1: "四支", distractor2: "七个" },
  { level: "YCT5", verb: "买了", classifier: "三只", noun: "兔子", distractor1: "六支", distractor2: "三个" },
  { level: "YCT5", verb: "给你", classifier: "九只", noun: "兔子", distractor1: "二支", distractor2: "九个" },
  { level: "YCT5", verb: "卖了", classifier: "四只", noun: "兔子", distractor1: "八支", distractor2: "四个" },
  { level: "YCT5", verb: "送你", classifier: "六只", noun: "兔子", distractor1: "一支", distractor2: "六个" },
  { level: "YCT5", verb: "找到", classifier: "两只", noun: "兔子", distractor1: "二支", distractor2: "两个" },
  { level: "YCT5", verb: "丢了", classifier: "八只", noun: "兔子", distractor1: "九支", distractor2: "八个" },
  { level: "YCT5", verb: "拿着", classifier: "五只", noun: "兔子", distractor1: "三支", distractor2: "五个" },
  { level: "YCT5", verb: "放了", classifier: "一只", noun: "兔子", distractor1: "四支", distractor2: "一个" },
  { level: "YCT5", verb: "带了", classifier: "十只", noun: "兔子", distractor1: "七支", distractor2: "十个" },
  { level: "YCT5", verb: "选了", classifier: "四只", noun: "兔子", distractor1: "八支", distractor2: "四个" },
  { level: "YCT5", verb: "画了", classifier: "六只", noun: "大象", distractor1: "三支", distractor2: "六个" },
  { level: "YCT5", verb: "买了", classifier: "两只", noun: "大象", distractor1: "二支", distractor2: "两个" },
  { level: "YCT5", verb: "给你", classifier: "八只", noun: "大象", distractor1: "五支", distractor2: "八个" },
  { level: "YCT5", verb: "卖了", classifier: "五只", noun: "大象", distractor1: "四支", distractor2: "五个" },
  { level: "YCT5", verb: "送你", classifier: "三只", noun: "大象", distractor1: "七支", distractor2: "三个" },
  { level: "YCT5", verb: "找到", classifier: "九只", noun: "大象", distractor1: "二支", distractor2: "九个" },
  { level: "YCT5", verb: "拿着", classifier: "四只", noun: "大象", distractor1: "六支", distractor2: "四个" },
  { level: "YCT5", verb: "放了", classifier: "七只", noun: "大象", distractor1: "一支", distractor2: "七个" },
  { level: "YCT5", verb: "带了", classifier: "一只", noun: "大象", distractor1: "八支", distractor2: "一个" },
  { level: "YCT5", verb: "选了", classifier: "六只", noun: "大象", distractor1: "二支", distractor2: "六个" },
  { level: "YCT5", verb: "画了", classifier: "三只", noun: "蝴蝶", distractor1: "七支", distractor2: "三个" },
  { level: "YCT5", verb: "买了", classifier: "九只", noun: "蝴蝶", distractor1: "四支", distractor2: "九个" },
  { level: "YCT5", verb: "给你", classifier: "五只", noun: "蝴蝶", distractor1: "一支", distractor2: "五个" },
  { level: "YCT5", verb: "卖了", classifier: "两只", noun: "蝴蝶", distractor1: "八支", distractor2: "两个" },
  { level: "YCT5", verb: "送你", classifier: "八只", noun: "蝴蝶", distractor1: "三支", distractor2: "八个" },
  { level: "YCT5", verb: "找到", classifier: "四只", noun: "蝴蝶", distractor1: "九支", distractor2: "四个" },
  { level: "YCT5", verb: "丢了", classifier: "六只", noun: "蝴蝶", distractor1: "二支", distractor2: "六个" },
  { level: "YCT5", verb: "拿着", classifier: "一只", noun: "蝴蝶", distractor1: "七支", distractor2: "一个" },
  { level: "YCT5", verb: "放了", classifier: "十只", noun: "蝴蝶", distractor1: "四支", distractor2: "十个" },
  { level: "YCT5", verb: "带了", classifier: "三只", noun: "蝴蝶", distractor1: "六支", distractor2: "三个" },
  { level: "YCT5", verb: "选了", classifier: "七只", noun: "蝴蝶", distractor1: "二支", distractor2: "七个" },
  { level: "YCT5", verb: "画了", classifier: "五只", noun: "虫子", distractor1: "三支", distractor2: "五个" },
  { level: "YCT5", verb: "买了", classifier: "九只", noun: "虫子", distractor1: "七支", distractor2: "九个" },
  { level: "YCT5", verb: "给你", classifier: "四只", noun: "虫子", distractor1: "一支", distractor2: "四个" },
  { level: "YCT5", verb: "卖了", classifier: "六只", noun: "虫子", distractor1: "八支", distractor2: "六个" },
  { level: "YCT5", verb: "送你", classifier: "两只", noun: "虫子", distractor1: "四支", distractor2: "两个" },
  { level: "YCT5", verb: "找到", classifier: "八只", noun: "虫子", distractor1: "二支", distractor2: "八个" },
  { level: "YCT5", verb: "丢了", classifier: "三只", noun: "虫子", distractor1: "九支", distractor2: "三个" },
  { level: "YCT5", verb: "拿着", classifier: "七只", noun: "虫子", distractor1: "六支", distractor2: "七个" },
  { level: "YCT5", verb: "放了", classifier: "一只", noun: "虫子", distractor1: "五支", distractor2: "一个" },
  { level: "YCT5", verb: "带了", classifier: "四只", noun: "虫子", distractor1: "三支", distractor2: "四个" },
  { level: "YCT5", verb: "选了", classifier: "十只", noun: "虫子", distractor1: "七支", distractor2: "十个" },
  { level: "YCT5", verb: "画了", classifier: "六条", noun: "虫子", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两条", noun: "虫子", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八条", noun: "虫子", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五条", noun: "虫子", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三条", noun: "虫子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九条", noun: "虫子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "丢了", classifier: "四条", noun: "虫子", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "七条", noun: "虫子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "放了", classifier: "一条", noun: "虫子", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十条", noun: "虫子", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "四条", noun: "虫子", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "喝了", classifier: "三杯", noun: "咖啡", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九杯", noun: "咖啡", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "五杯", noun: "咖啡", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "两杯", noun: "咖啡", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "送你", classifier: "八杯", noun: "咖啡", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "找到", classifier: "四杯", noun: "咖啡", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "六杯", noun: "咖啡", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "放了", classifier: "一杯", noun: "咖啡", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十杯", noun: "咖啡", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "三杯", noun: "咖啡", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "戴了", classifier: "七条", noun: "项圈", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "买了", classifier: "三条", noun: "项圈", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "给你", classifier: "九条", noun: "项圈", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "卖了", classifier: "四条", noun: "项圈", distractor1: "一个", distractor2: "四只" },
  { level: "YCT5", verb: "送你", classifier: "六条", noun: "项圈", distractor1: "八个", distractor2: "六只" },
  { level: "YCT5", verb: "找到", classifier: "两条", noun: "项圈", distractor1: "三个", distractor2: "两只" },
  { level: "YCT5", verb: "丢了", classifier: "八条", noun: "项圈", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "拿着", classifier: "五条", noun: "项圈", distractor1: "七个", distractor2: "五只" },
  { level: "YCT5", verb: "放了", classifier: "一条", noun: "项圈", distractor1: "四个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十条", noun: "项圈", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "四条", noun: "项圈", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "喝了", classifier: "六杯", noun: "饮料", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两杯", noun: "饮料", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八杯", noun: "饮料", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五杯", noun: "饮料", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三杯", noun: "饮料", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九杯", noun: "饮料", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四杯", noun: "饮料", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七杯", noun: "饮料", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一杯", noun: "饮料", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十杯", noun: "饮料", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "吃了", classifier: "三块", noun: "巧克力", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "画了", classifier: "九块", noun: "巧克力", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "买了", classifier: "五块", noun: "巧克力", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "给你", classifier: "两块", noun: "巧克力", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "卖了", classifier: "八块", noun: "巧克力", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "送你", classifier: "四块", noun: "巧克力", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "找到", classifier: "六块", noun: "巧克力", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "丢了", classifier: "一块", noun: "巧克力", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "拿着", classifier: "十块", noun: "巧克力", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "放了", classifier: "三块", noun: "巧克力", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "带了", classifier: "七块", noun: "巧克力", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "选了", classifier: "四块", noun: "巧克力", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "吃了", classifier: "六块", noun: "饼干", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "画了", classifier: "两块", noun: "饼干", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "买了", classifier: "八块", noun: "饼干", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "给你", classifier: "五块", noun: "饼干", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "三块", noun: "饼干", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "送你", classifier: "九块", noun: "饼干", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "找到", classifier: "四块", noun: "饼干", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "丢了", classifier: "七块", noun: "饼干", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "一块", noun: "饼干", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "放了", classifier: "十块", noun: "饼干", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "带了", classifier: "三块", noun: "饼干", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七块", noun: "饼干", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "吃了", classifier: "三碗", noun: "冰淇淋", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九碗", noun: "冰淇淋", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "五碗", noun: "冰淇淋", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "两碗", noun: "冰淇淋", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "送你", classifier: "八碗", noun: "冰淇淋", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "找到", classifier: "四碗", noun: "冰淇淋", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "六碗", noun: "冰淇淋", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "放了", classifier: "一碗", noun: "冰淇淋", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十碗", noun: "冰淇淋", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "三碗", noun: "冰淇淋", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "画了", classifier: "七件", noun: "玩具", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "买了", classifier: "三件", noun: "玩具", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "给你", classifier: "九件", noun: "玩具", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "卖了", classifier: "四件", noun: "玩具", distractor1: "一个", distractor2: "四只" },
  { level: "YCT5", verb: "送你", classifier: "六件", noun: "玩具", distractor1: "八个", distractor2: "六只" },
  { level: "YCT5", verb: "找到", classifier: "两件", noun: "玩具", distractor1: "三个", distractor2: "两只" },
  { level: "YCT5", verb: "丢了", classifier: "八件", noun: "玩具", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "拿着", classifier: "五件", noun: "玩具", distractor1: "七个", distractor2: "五只" },
  { level: "YCT5", verb: "放了", classifier: "一件", noun: "玩具", distractor1: "四个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十件", noun: "玩具", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "四件", noun: "玩具", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "画了", classifier: "六块", noun: "手表", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两块", noun: "手表", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八块", noun: "手表", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五块", noun: "手表", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三块", noun: "手表", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九块", noun: "手表", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "丢了", classifier: "四块", noun: "手表", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "七块", noun: "手表", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "放了", classifier: "一块", noun: "手表", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十块", noun: "手表", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "三块", noun: "手表", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "吃了", classifier: "七碗", noun: "烤鸭", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "买了", classifier: "三碗", noun: "烤鸭", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "给你", classifier: "九碗", noun: "烤鸭", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "卖了", classifier: "四碗", noun: "烤鸭", distractor1: "一个", distractor2: "四只" },
  { level: "YCT5", verb: "送你", classifier: "六碗", noun: "烤鸭", distractor1: "八个", distractor2: "六只" },
  { level: "YCT5", verb: "找到", classifier: "两碗", noun: "烤鸭", distractor1: "三个", distractor2: "两只" },
  { level: "YCT5", verb: "拿着", classifier: "八碗", noun: "烤鸭", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "放了", classifier: "五碗", noun: "烤鸭", distractor1: "七个", distractor2: "五只" },
  { level: "YCT5", verb: "带了", classifier: "一碗", noun: "烤鸭", distractor1: "四个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十碗", noun: "烤鸭", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "吃了", classifier: "六盘", noun: "烤鸭", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两盘", noun: "烤鸭", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八盘", noun: "烤鸭", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五盘", noun: "烤鸭", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三盘", noun: "烤鸭", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九盘", noun: "烤鸭", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四盘", noun: "烤鸭", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七盘", noun: "烤鸭", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一盘", noun: "烤鸭", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十盘", noun: "烤鸭", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "吃了", classifier: "三块", noun: "烤鸭", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "画了", classifier: "九块", noun: "烤鸭", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "买了", classifier: "五块", noun: "烤鸭", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "给你", classifier: "两块", noun: "烤鸭", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "卖了", classifier: "八块", noun: "烤鸭", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "送你", classifier: "四块", noun: "烤鸭", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "找到", classifier: "六块", noun: "烤鸭", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "丢了", classifier: "一块", noun: "烤鸭", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "拿着", classifier: "十块", noun: "烤鸭", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "放了", classifier: "三块", noun: "烤鸭", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "带了", classifier: "七块", noun: "烤鸭", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "选了", classifier: "四块", noun: "烤鸭", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "吃了", classifier: "六只", noun: "烤鸭", distractor1: "二支", distractor2: "六个" },
  { level: "YCT5", verb: "画了", classifier: "两只", noun: "烤鸭", distractor1: "九支", distractor2: "两个" },
  { level: "YCT5", verb: "买了", classifier: "八只", noun: "烤鸭", distractor1: "五支", distractor2: "八个" },
  { level: "YCT5", verb: "给你", classifier: "五只", noun: "烤鸭", distractor1: "三支", distractor2: "五个" },
  { level: "YCT5", verb: "卖了", classifier: "三只", noun: "烤鸭", distractor1: "七支", distractor2: "三个" },
  { level: "YCT5", verb: "送你", classifier: "九只", noun: "烤鸭", distractor1: "四支", distractor2: "九个" },
  { level: "YCT5", verb: "找到", classifier: "四只", noun: "烤鸭", distractor1: "六支", distractor2: "四个" },
  { level: "YCT5", verb: "丢了", classifier: "七只", noun: "烤鸭", distractor1: "二支", distractor2: "七个" },
  { level: "YCT5", verb: "拿着", classifier: "一只", noun: "烤鸭", distractor1: "五支", distractor2: "一个" },
  { level: "YCT5", verb: "放了", classifier: "十只", noun: "烤鸭", distractor1: "三支", distractor2: "十个" },
  { level: "YCT5", verb: "带了", classifier: "三只", noun: "烤鸭", distractor1: "九支", distractor2: "三个" },
  { level: "YCT5", verb: "选了", classifier: "七只", noun: "烤鸭", distractor1: "四支", distractor2: "七个" },
  { level: "YCT5", verb: "画了", classifier: "三个", noun: "盘子", distractor1: "七只", distractor2: "三条" },
  { level: "YCT5", verb: "买了", classifier: "九个", noun: "盘子", distractor1: "四只", distractor2: "九条" },
  { level: "YCT5", verb: "给你", classifier: "五个", noun: "盘子", distractor1: "一只", distractor2: "五条" },
  { level: "YCT5", verb: "卖了", classifier: "两个", noun: "盘子", distractor1: "八只", distractor2: "两条" },
  { level: "YCT5", verb: "送你", classifier: "八个", noun: "盘子", distractor1: "三只", distractor2: "八条" },
  { level: "YCT5", verb: "找到", classifier: "四个", noun: "盘子", distractor1: "九只", distractor2: "四条" },
  { level: "YCT5", verb: "丢了", classifier: "六个", noun: "盘子", distractor1: "二只", distractor2: "六条" },
  { level: "YCT5", verb: "拿着", classifier: "一个", noun: "盘子", distractor1: "七只", distractor2: "一条" },
  { level: "YCT5", verb: "放了", classifier: "十个", noun: "盘子", distractor1: "四只", distractor2: "十条" },
  { level: "YCT5", verb: "带了", classifier: "三个", noun: "盘子", distractor1: "六只", distractor2: "三条" },
  { level: "YCT5", verb: "选了", classifier: "七个", noun: "盘子", distractor1: "二只", distractor2: "七条" },
  { level: "YCT5", verb: "画了", classifier: "六个", noun: "碗", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两个", noun: "碗", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八个", noun: "碗", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五个", noun: "碗", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三个", noun: "碗", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九个", noun: "碗", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "丢了", classifier: "四个", noun: "碗", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "七个", noun: "碗", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "放了", classifier: "一个", noun: "碗", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十个", noun: "碗", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "三个", noun: "碗", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "画了", classifier: "三双", noun: "筷子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九双", noun: "筷子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "五双", noun: "筷子", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "两双", noun: "筷子", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "送你", classifier: "八双", noun: "筷子", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "找到", classifier: "四双", noun: "筷子", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "丢了", classifier: "六双", noun: "筷子", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "拿着", classifier: "一双", noun: "筷子", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "放了", classifier: "十双", noun: "筷子", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "带了", classifier: "三双", noun: "筷子", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七双", noun: "筷子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "画了", classifier: "六双", noun: "鞋", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "买了", classifier: "两双", noun: "鞋", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "给你", classifier: "八双", noun: "鞋", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "卖了", classifier: "五双", noun: "鞋", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "送你", classifier: "三双", noun: "鞋", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "九双", noun: "鞋", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "丢了", classifier: "四双", noun: "鞋", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "七双", noun: "鞋", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "放了", classifier: "一双", noun: "鞋", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十双", noun: "鞋", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "穿了", classifier: "三双", noun: "鞋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七双", noun: "筷子", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "画了", classifier: "三张", noun: "照片", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九张", noun: "照片", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "五张", noun: "照片", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "两张", noun: "照片", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "送你", classifier: "八张", noun: "照片", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "找到", classifier: "四张", noun: "照片", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "丢了", classifier: "六张", noun: "照片", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "带了", classifier: "三碗", noun: "米饭", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七碗", noun: "米饭", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "八碗", noun: "苹果", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "选了", classifier: "四碗", noun: "苹果", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "带了", classifier: "六盘", noun: "苹果", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "选了", classifier: "两盘", noun: "苹果", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "带了", classifier: "五块", noun: "苹果", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "选了", classifier: "三块", noun: "苹果", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "带了", classifier: "九杯", noun: "牛奶", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "选了", classifier: "四杯", noun: "牛奶", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "带了", classifier: "七碗", noun: "牛奶", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "选了", classifier: "一碗", noun: "牛奶", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "带了", classifier: "十杯", noun: "水", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "选了", classifier: "三杯", noun: "水", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "带了", classifier: "七碗", noun: "水", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "选了", classifier: "四碗", noun: "水", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "带了", classifier: "六块", noun: "蛋糕", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "选了", classifier: "两块", noun: "蛋糕", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "选了", classifier: "八双", noun: "手", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "带了", classifier: "五只", noun: "狗", distractor1: "三支", distractor2: "五个" },
  { level: "YCT5", verb: "选了", classifier: "三只", noun: "狗", distractor1: "七支", distractor2: "三个" },
  { level: "YCT5", verb: "带了", classifier: "九只", noun: "鱼", distractor1: "四支", distractor2: "九个" },
  { level: "YCT5", verb: "选了", classifier: "四只", noun: "鱼", distractor1: "六支", distractor2: "四个" },
  { level: "YCT5", verb: "带了", classifier: "七条", noun: "鱼", distractor1: "二支", distractor2: "七个" },
  { level: "YCT5", verb: "选了", classifier: "一条", noun: "鱼", distractor1: "五支", distractor2: "一个" },
  { level: "YCT5", verb: "带了", classifier: "十盘", noun: "鱼", distractor1: "三支", distractor2: "十个" },
  { level: "YCT5", verb: "选了", classifier: "三盘", noun: "鱼", distractor1: "九支", distractor2: "三个" },
  { level: "YCT5", verb: "带了", classifier: "七块", noun: "鱼", distractor1: "四支", distractor2: "七个" },
  { level: "YCT5", verb: "选了", classifier: "四块", noun: "鱼", distractor1: "九支", distractor2: "四个" },
  { level: "YCT5", verb: "带了", classifier: "六张", noun: "床", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "选了", classifier: "两张", noun: "床", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "带了", classifier: "八张", noun: "桌子", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "选了", classifier: "五张", noun: "桌子", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "带了", classifier: "三盘", noun: "包子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "九盘", noun: "包子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "带了", classifier: "四杯", noun: "茶", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "七杯", noun: "茶", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一碗", noun: "茶", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十碗", noun: "茶", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "带了", classifier: "三杯", noun: "冰水", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七杯", noun: "冰水", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "四碗", noun: "冰水", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "两碗", noun: "冰水", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "带了", classifier: "八碗", noun: "水果", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "选了", classifier: "五碗", noun: "水果", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "带了", classifier: "三块", noun: "水果", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "九块", noun: "水果", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "带了", classifier: "四碗", noun: "香蕉", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "七碗", noun: "香蕉", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一只", noun: "熊猫", distractor1: "三支", distractor2: "一个" },
  { level: "YCT5", verb: "选了", classifier: "十只", noun: "熊猫", distractor1: "二支", distractor2: "十个" },
  { level: "YCT5", verb: "带了", classifier: "三碗", noun: "面条儿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七碗", noun: "面条儿", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "四盘", noun: "面条儿", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "两盘", noun: "面条儿", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "带了", classifier: "八碗", noun: "饺子", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "选了", classifier: "五碗", noun: "饺子", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "带了", classifier: "三盘", noun: "饺子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "九盘", noun: "饺子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "带了", classifier: "四件", noun: "礼物", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "七件", noun: "礼物", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一碗", noun: "糖", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十碗", noun: "糖", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "带了", classifier: "三块", noun: "糖", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七块", noun: "糖", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "四碗", noun: "西瓜", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "两碗", noun: "西瓜", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "带了", classifier: "八盘", noun: "西瓜", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "选了", classifier: "五盘", noun: "西瓜", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "带了", classifier: "三块", noun: "西瓜", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "九块", noun: "西瓜", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "带了", classifier: "四个", noun: "杯子", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "七个", noun: "杯子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "一杯", noun: "果汁", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "选了", classifier: "十杯", noun: "果汁", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "带了", classifier: "三碗", noun: "菜", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "选了", classifier: "七碗", noun: "菜", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "带了", classifier: "四盘", noun: "菜", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "选了", classifier: "两盘", noun: "菜", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "拿着", classifier: "八盘", noun: "苹果", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "放了", classifier: "五盘", noun: "苹果", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "拿着", classifier: "三块", noun: "苹果", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "九块", noun: "苹果", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四块", noun: "蛋糕", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七块", noun: "蛋糕", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "一双", noun: "手", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "放了", classifier: "十双", noun: "手", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "拿着", classifier: "三盘", noun: "鱼", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "七盘", noun: "鱼", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "四块", noun: "鱼", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "两块", noun: "鱼", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "卖了", classifier: "八张", noun: "床", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "拿着", classifier: "五张", noun: "床", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "放了", classifier: "三张", noun: "床", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "卖了", classifier: "九张", noun: "桌子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四张", noun: "桌子", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七张", noun: "桌子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "一盘", noun: "包子", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "放了", classifier: "十盘", noun: "包子", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "拿着", classifier: "三块", noun: "水果", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "七块", noun: "水果", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "四盘", noun: "面条儿", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "两盘", noun: "面条儿", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "拿着", classifier: "八盘", noun: "饺子", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "放了", classifier: "五盘", noun: "饺子", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "拿着", classifier: "三块", noun: "糖", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "九块", noun: "糖", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四盘", noun: "西瓜", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七盘", noun: "西瓜", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "一块", noun: "西瓜", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "放了", classifier: "十块", noun: "西瓜", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "吃了", classifier: "三盘", noun: "菜", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九盘", noun: "菜", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "五盘", noun: "菜", distractor1: "一个", distractor2: "五只" },
  { level: "YCT5", verb: "卖了", classifier: "两盘", noun: "菜", distractor1: "八个", distractor2: "两只" },
  { level: "YCT5", verb: "送你", classifier: "八盘", noun: "菜", distractor1: "三个", distractor2: "八只" },
  { level: "YCT5", verb: "找到", classifier: "四盘", noun: "菜", distractor1: "九个", distractor2: "四只" },
  { level: "YCT5", verb: "拿着", classifier: "六盘", noun: "菜", distractor1: "二个", distractor2: "六只" },
  { level: "YCT5", verb: "放了", classifier: "一盘", noun: "菜", distractor1: "七个", distractor2: "一只" },
  { level: "YCT5", verb: "拿着", classifier: "十张", noun: "照片", distractor1: "四个", distractor2: "十只" },
  { level: "YCT5", verb: "放了", classifier: "三张", noun: "照片", distractor1: "六个", distractor2: "三只" },
  { level: "YCT5", verb: "吃了", classifier: "七碗", noun: "羊肉", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "买了", classifier: "三碗", noun: "羊肉", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "给你", classifier: "九碗", noun: "羊肉", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "卖了", classifier: "四碗", noun: "羊肉", distractor1: "一个", distractor2: "四只" },
  { level: "YCT5", verb: "送你", classifier: "六碗", noun: "羊肉", distractor1: "八个", distractor2: "六只" },
  { level: "YCT5", verb: "找到", classifier: "两碗", noun: "羊肉", distractor1: "三个", distractor2: "两只" },
  { level: "YCT5", verb: "拿着", classifier: "八碗", noun: "羊肉", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "放了", classifier: "五碗", noun: "羊肉", distractor1: "七个", distractor2: "五只" },
  { level: "YCT5", verb: "吃了", classifier: "一块", noun: "羊肉", distractor1: "四个", distractor2: "一只" },
  { level: "YCT5", verb: "画了", classifier: "十块", noun: "羊肉", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "买了", classifier: "三块", noun: "羊肉", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "给你", classifier: "七块", noun: "羊肉", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "卖了", classifier: "四块", noun: "羊肉", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "送你", classifier: "两块", noun: "羊肉", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "找到", classifier: "八块", noun: "羊肉", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "丢了", classifier: "五块", noun: "羊肉", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "拿着", classifier: "三块", noun: "羊肉", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "九块", noun: "羊肉", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "喝了", classifier: "四碗", noun: "汤", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "买了", classifier: "七碗", noun: "汤", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "给你", classifier: "一碗", noun: "汤", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "卖了", classifier: "十碗", noun: "汤", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "送你", classifier: "三碗", noun: "汤", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "找到", classifier: "七碗", noun: "汤", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "拿着", classifier: "四碗", noun: "汤", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "两碗", noun: "汤", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "画了", classifier: "八张", noun: "地图", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "买了", classifier: "五张", noun: "地图", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "给你", classifier: "三张", noun: "地图", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "卖了", classifier: "九张", noun: "地图", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "送你", classifier: "四张", noun: "地图", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "找到", classifier: "七张", noun: "地图", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "丢了", classifier: "一张", noun: "地图", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "拿着", classifier: "十张", noun: "地图", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "放了", classifier: "三张", noun: "地图", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "画了", classifier: "七本", noun: "地图", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "买了", classifier: "四本", noun: "地图", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "给你", classifier: "两本", noun: "地图", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "卖了", classifier: "八本", noun: "地图", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "送你", classifier: "五本", noun: "地图", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "找到", classifier: "三本", noun: "地图", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "丢了", classifier: "九本", noun: "地图", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "拿着", classifier: "四本", noun: "地图", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "放了", classifier: "七本", noun: "地图", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "吃了", classifier: "一碗", noun: "小笼包", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "买了", classifier: "十碗", noun: "小笼包", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "给你", classifier: "三碗", noun: "小笼包", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "卖了", classifier: "七碗", noun: "小笼包", distractor1: "四个", distractor2: "七只" },
  { level: "YCT5", verb: "送你", classifier: "四碗", noun: "小笼包", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "找到", classifier: "两碗", noun: "小笼包", distractor1: "九个", distractor2: "两只" },
  { level: "YCT5", verb: "拿着", classifier: "八碗", noun: "小笼包", distractor1: "五个", distractor2: "八只" },
  { level: "YCT5", verb: "放了", classifier: "五碗", noun: "小笼包", distractor1: "三个", distractor2: "五只" },
  { level: "YCT5", verb: "吃了", classifier: "三盘", noun: "小笼包", distractor1: "七个", distractor2: "三只" },
  { level: "YCT5", verb: "买了", classifier: "九盘", noun: "小笼包", distractor1: "四个", distractor2: "九只" },
  { level: "YCT5", verb: "给你", classifier: "四盘", noun: "小笼包", distractor1: "六个", distractor2: "四只" },
  { level: "YCT5", verb: "卖了", classifier: "七盘", noun: "小笼包", distractor1: "二个", distractor2: "七只" },
  { level: "YCT5", verb: "送你", classifier: "一盘", noun: "小笼包", distractor1: "五个", distractor2: "一只" },
  { level: "YCT5", verb: "找到", classifier: "十盘", noun: "小笼包", distractor1: "三个", distractor2: "十只" },
  { level: "YCT5", verb: "拿着", classifier: "三盘", noun: "小笼包", distractor1: "九个", distractor2: "三只" },
  { level: "YCT5", verb: "放了", classifier: "七盘", noun: "小笼包", distractor1: "四个", distractor2: "七只" },

  // More levels (YCT4, YCT5, YCT6)
  { level: "YCT5", verb: "放了", classifier: "四碗", noun: "米饭", distractor1: "六个", distractor2: "四只" },
  { level: "YCT6", verb: "画了", classifier: "三只", noun: "猴子", distractor1: "八支", distractor2: "三个" },
  { level: "YCT6", verb: "买了", classifier: "七只", noun: "猴子", distractor1: "二支", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "六只", noun: "猴子", distractor1: "一支", distractor2: "六个" },
  { level: "YCT6", verb: "卖了", classifier: "四只", noun: "猴子", distractor1: "九支", distractor2: "四个" },
  { level: "YCT6", verb: "送你", classifier: "九只", noun: "猴子", distractor1: "三支", distractor2: "九个" },
  { level: "YCT6", verb: "找到", classifier: "两只", noun: "猴子", distractor1: "五支", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八只", noun: "猴子", distractor1: "四支", distractor2: "八个" },
  { level: "YCT6", verb: "放了", classifier: "五只", noun: "猴子", distractor1: "七支", distractor2: "五个" },
  { level: "YCT6", verb: "带了", classifier: "十只", noun: "猴子", distractor1: "二支", distractor2: "十个" },
  { level: "YCT6", verb: "选了", classifier: "三只", noun: "猴子", distractor1: "六支", distractor2: "三个" },
  { level: "YCT6", verb: "买了", classifier: "七斤", noun: "面粉", distractor1: "二盒", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "三斤", noun: "面粉", distractor1: "八盒", distractor2: "三个" },
  { level: "YCT6", verb: "卖了", classifier: "九斤", noun: "面粉", distractor1: "四盒", distractor2: "九个" },
  { level: "YCT6", verb: "送你", classifier: "四斤", noun: "面粉", distractor1: "六盒", distractor2: "四个" },
  { level: "YCT6", verb: "找到", classifier: "六斤", noun: "面粉", distractor1: "二盒", distractor2: "六个" },
  { level: "YCT6", verb: "拿着", classifier: "两斤", noun: "面粉", distractor1: "九盒", distractor2: "二斤" },
  { level: "YCT6", verb: "放了", classifier: "八斤", noun: "面粉", distractor1: "五盒", distractor2: "八个" },
  { level: "YCT6", verb: "带了", classifier: "五斤", noun: "面粉", distractor1: "三盒", distractor2: "五个" },
  { level: "YCT6", verb: "选了", classifier: "一斤", noun: "面粉", distractor1: "七盒", distractor2: "一个" },
  { level: "YCT6", verb: "吃了", classifier: "三碗", noun: "葡萄", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九碗", noun: "葡萄", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五碗", noun: "葡萄", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两碗", noun: "葡萄", distractor1: "八个", distractor2: "二碗" },
  { level: "YCT6", verb: "送你", classifier: "八碗", noun: "葡萄", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四碗", noun: "葡萄", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "拿着", classifier: "六碗", noun: "葡萄", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "放了", classifier: "一碗", noun: "葡萄", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十碗", noun: "葡萄", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三碗", noun: "葡萄", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盘", noun: "葡萄", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盘", noun: "葡萄", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盘", noun: "葡萄", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盘", noun: "葡萄", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盘", noun: "葡萄", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两盘", noun: "葡萄", distractor1: "四个", distractor2: "二盘" },
  { level: "YCT6", verb: "拿着", classifier: "八盘", noun: "葡萄", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五盘", noun: "葡萄", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一盘", noun: "葡萄", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十盘", noun: "葡萄", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "三斤", noun: "葡萄", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九斤", noun: "葡萄", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五斤", noun: "葡萄", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两斤", noun: "葡萄", distractor1: "八个", distractor2: "二斤" },
  { level: "YCT6", verb: "送你", classifier: "八斤", noun: "葡萄", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四斤", noun: "葡萄", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "拿着", classifier: "六斤", noun: "葡萄", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "放了", classifier: "一斤", noun: "葡萄", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十斤", noun: "葡萄", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三斤", noun: "葡萄", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "葡萄", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "画了", classifier: "三盒", noun: "葡萄", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九盒", noun: "葡萄", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "四盒", noun: "葡萄", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "卖了", classifier: "六盒", noun: "葡萄", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "送你", classifier: "两盒", noun: "葡萄", distractor1: "四个", distractor2: "二盒" },
  { level: "YCT6", verb: "找到", classifier: "八盒", noun: "葡萄", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "丢了", classifier: "五盒", noun: "葡萄", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "拿着", classifier: "一盒", noun: "葡萄", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "放了", classifier: "十盒", noun: "葡萄", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "带了", classifier: "三盒", noun: "葡萄", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "选了", classifier: "七盒", noun: "葡萄", distractor1: "四个", distractor2: "七只" },
  { level: "YCT6", verb: "画了", classifier: "三本", noun: "词典", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九本", noun: "词典", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五本", noun: "词典", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两本", noun: "词典", distractor1: "八个", distractor2: "二本" },
  { level: "YCT6", verb: "送你", classifier: "八本", noun: "词典", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四本", noun: "词典", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "丢了", classifier: "六本", noun: "词典", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "拿着", classifier: "一本", noun: "词典", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "放了", classifier: "十本", noun: "词典", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "带了", classifier: "三本", noun: "词典", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "选了", classifier: "七本", noun: "词典", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "给你", classifier: "三页", noun: "词典", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "送你", classifier: "九页", noun: "词典", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "找到", classifier: "五页", noun: "词典", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "丢了", classifier: "两页", noun: "词典", distractor1: "八个", distractor2: "二页" },
  { level: "YCT6", verb: "选了", classifier: "八页", noun: "词典", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "画了", classifier: "四辆", noun: "儿童车", distractor1: "六辆", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七辆", noun: "儿童车", distractor1: "二辆", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一辆", noun: "儿童车", distractor1: "五辆", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十辆", noun: "儿童车", distractor1: "三辆", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三辆", noun: "儿童车", distractor1: "九辆", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七辆", noun: "儿童车", distractor1: "四辆", distractor2: "七个" },
  { level: "YCT6", verb: "丢了", classifier: "四辆", noun: "儿童车", distractor1: "六辆", distractor2: "四个" },
  { level: "YCT6", verb: "拿着", classifier: "两辆", noun: "儿童车", distractor1: "九辆", distractor2: "二辆" },
  { level: "YCT6", verb: "放了", classifier: "八辆", noun: "儿童车", distractor1: "五辆", distractor2: "八个" },
  { level: "YCT6", verb: "带了", classifier: "五辆", noun: "儿童车", distractor1: "三辆", distractor2: "五个" },
  { level: "YCT6", verb: "选了", classifier: "一辆", noun: "儿童车", distractor1: "七辆", distractor2: "一个" },
  { level: "YCT6", verb: "画了", classifier: "三辆", noun: "地铁", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "找到", classifier: "九列", noun: "地铁", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "开", classifier: "五辆", noun: "地铁", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "等", classifier: "两辆", noun: "地铁", distractor1: "八个", distractor2: "二辆" },
  { level: "YCT6", verb: "画了", classifier: "八块", noun: "草地", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "画了", classifier: "四张", noun: "报纸", distractor1: "六张", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七张", noun: "报纸", distractor1: "二张", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一张", noun: "报纸", distractor1: "五张", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十张", noun: "报纸", distractor1: "三张", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三张", noun: "报纸", distractor1: "九张", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七张", noun: "报纸", distractor1: "四张", distractor2: "七个" },
  { level: "YCT6", verb: "丢了", classifier: "四张", noun: "报纸", distractor1: "六张", distractor2: "四个" },
  { level: "YCT6", verb: "拿着", classifier: "两张", noun: "报纸", distractor1: "九张", distractor2: "二张" },
  { level: "YCT6", verb: "放了", classifier: "八张", noun: "报纸", distractor1: "五张", distractor2: "八个" },
  { level: "YCT6", verb: "带了", classifier: "五张", noun: "报纸", distractor1: "三张", distractor2: "五个" },
  { level: "YCT6", verb: "选了", classifier: "一张", noun: "报纸", distractor1: "七张", distractor2: "一个" },
  { level: "YCT6", verb: "给你", classifier: "三页", noun: "报纸", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "送你", classifier: "九页", noun: "报纸", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "找到", classifier: "五页", noun: "报纸", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "丢了", classifier: "两页", noun: "报纸", distractor1: "八个", distractor2: "二页" },
  { level: "YCT6", verb: "选了", classifier: "八页", noun: "报纸", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "画了", classifier: "四本", noun: "杂志", distractor1: "六本", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七本", noun: "杂志", distractor1: "二本", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一本", noun: "杂志", distractor1: "五本", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十本", noun: "杂志", distractor1: "三本", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三本", noun: "杂志", distractor1: "九本", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七本", noun: "杂志", distractor1: "四本", distractor2: "七个" },
  { level: "YCT6", verb: "丢了", classifier: "四本", noun: "杂志", distractor1: "六本", distractor2: "四个" },
  { level: "YCT6", verb: "拿着", classifier: "两本", noun: "杂志", distractor1: "九本", distractor2: "二本" },
  { level: "YCT6", verb: "放了", classifier: "八本", noun: "杂志", distractor1: "五本", distractor2: "八个" },
  { level: "YCT6", verb: "带了", classifier: "五本", noun: "杂志", distractor1: "三本", distractor2: "五个" },
  { level: "YCT6", verb: "选了", classifier: "一本", noun: "杂志", distractor1: "七本", distractor2: "一个" },
  { level: "YCT6", verb: "给你", classifier: "三页", noun: "杂志", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "送你", classifier: "九页", noun: "杂志", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "找到", classifier: "五页", noun: "杂志", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "丢了", classifier: "二页", noun: "杂志", distractor1: "八个", distractor2: "二只" },
  { level: "YCT6", verb: "选了", classifier: "八页", noun: "杂志", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "吃了", classifier: "四盘", noun: "月饼", distractor1: "六盘", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七盘", noun: "月饼", distractor1: "二盘", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一盘", noun: "月饼", distractor1: "五盘", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十盘", noun: "月饼", distractor1: "三盘", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三盘", noun: "月饼", distractor1: "九盘", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七盘", noun: "月饼", distractor1: "四盘", distractor2: "七个" },
  { level: "YCT6", verb: "拿着", classifier: "四盘", noun: "月饼", distractor1: "六盘", distractor2: "四个" },
  { level: "YCT6", verb: "放了", classifier: "两盘", noun: "月饼", distractor1: "九盘", distractor2: "二盘" },
  { level: "YCT6", verb: "带了", classifier: "八盘", noun: "月饼", distractor1: "五盘", distractor2: "八个" },
  { level: "YCT6", verb: "选了", classifier: "五盘", noun: "月饼", distractor1: "三盘", distractor2: "五个" },
  { level: "YCT6", verb: "吃了", classifier: "一盒", noun: "月饼", distractor1: "七盒", distractor2: "一个" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "月饼", distractor1: "九盒", distractor2: "三个" },
  { level: "YCT6", verb: "给你", classifier: "七盒", noun: "月饼", distractor1: "四盒", distractor2: "七个" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "月饼", distractor1: "六盒", distractor2: "四个" },
  { level: "YCT6", verb: "送你", classifier: "两盒", noun: "月饼", distractor1: "九盒", distractor2: "二盒" },
  { level: "YCT6", verb: "找到", classifier: "八盒", noun: "月饼", distractor1: "五盒", distractor2: "八个" },
  { level: "YCT6", verb: "丢了", classifier: "五盒", noun: "月饼", distractor1: "三盒", distractor2: "五个" },
  { level: "YCT6", verb: "拿着", classifier: "一盒", noun: "月饼", distractor1: "七盒", distractor2: "一个" },
  { level: "YCT6", verb: "放了", classifier: "十盒", noun: "月饼", distractor1: "三盒", distractor2: "十个" },
  { level: "YCT6", verb: "带了", classifier: "三盒", noun: "月饼", distractor1: "九盒", distractor2: "三个" },
  { level: "YCT6", verb: "选了", classifier: "七盒", noun: "月饼", distractor1: "四盒", distractor2: "七个" },
  { level: "YCT6", verb: "吃了", classifier: "四块", noun: "月饼", distractor1: "六块", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七块", noun: "月饼", distractor1: "二块", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一块", noun: "月饼", distractor1: "五块", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十块", noun: "月饼", distractor1: "三块", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三块", noun: "月饼", distractor1: "九块", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七块", noun: "月饼", distractor1: "四块", distractor2: "七个" },
  { level: "YCT6", verb: "丢了", classifier: "四块", noun: "月饼", distractor1: "六块", distractor2: "四个" },
  { level: "YCT6", verb: "拿着", classifier: "两块", noun: "月饼", distractor1: "九块", distractor2: "二块" },
  { level: "YCT6", verb: "放了", classifier: "八块", noun: "月饼", distractor1: "五块", distractor2: "八个" },
  { level: "YCT6", verb: "带了", classifier: "五块", noun: "月饼", distractor1: "三块", distractor2: "五个" },
  { level: "YCT6", verb: "选了", classifier: "一块", noun: "月饼", distractor1: "七块", distractor2: "一个" },
  { level: "YCT6", verb: "画了", classifier: "三辆", noun: "火车", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "找到", classifier: "九辆", noun: "火车", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "开", classifier: "五辆", noun: "火车", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "等", classifier: "两辆", noun: "火车", distractor1: "八个", distractor2: "二辆" },
  { level: "YCT6", verb: "吃了", classifier: "三碗", noun: "西红柿", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九碗", noun: "西红柿", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五碗", noun: "西红柿", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两碗", noun: "西红柿", distractor1: "八个", distractor2: "二碗" },
  { level: "YCT6", verb: "送你", classifier: "八碗", noun: "西红柿", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四碗", noun: "西红柿", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "拿着", classifier: "六碗", noun: "西红柿", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "放了", classifier: "一碗", noun: "西红柿", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十碗", noun: "西红柿", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三碗", noun: "西红柿", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盘", noun: "西红柿", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盘", noun: "西红柿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盘", noun: "西红柿", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盘", noun: "西红柿", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盘", noun: "西红柿", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两盘", noun: "西红柿", distractor1: "四个", distractor2: "二盘" },
  { level: "YCT6", verb: "拿着", classifier: "八盘", noun: "西红柿", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五盘", noun: "西红柿", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一盘", noun: "西红柿", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十盘", noun: "西红柿", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "三斤", noun: "西红柿", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九斤", noun: "西红柿", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五斤", noun: "西红柿", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两斤", noun: "西红柿", distractor1: "八个", distractor2: "二斤" },
  { level: "YCT6", verb: "送你", classifier: "八斤", noun: "西红柿", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四斤", noun: "西红柿", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "拿着", classifier: "六斤", noun: "西红柿", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "放了", classifier: "一斤", noun: "西红柿", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十斤", noun: "西红柿", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三斤", noun: "西红柿", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "西红柿", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "西红柿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "西红柿", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "西红柿", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "西红柿", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两盒", noun: "西红柿", distractor1: "四个", distractor2: "二盒" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "西红柿", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "西红柿", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "西红柿", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "西红柿", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "西红柿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七块", noun: "西红柿", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三块", noun: "西红柿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九块", noun: "西红柿", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四块", noun: "西红柿", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六块", noun: "西红柿", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两块", noun: "西红柿", distractor1: "四个", distractor2: "二块" },
  { level: "YCT6", verb: "丢了", classifier: "八块", noun: "西红柿", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五块", noun: "西红柿", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一块", noun: "西红柿", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十块", noun: "西红柿", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三块", noun: "西红柿", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "画了", classifier: "三个", noun: "牌子", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九个", noun: "牌子", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "五个", noun: "牌子", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "卖了", classifier: "两个", noun: "牌子", distractor1: "八个", distractor2: "二个" },
  { level: "YCT6", verb: "送你", classifier: "八个", noun: "牌子", distractor1: "三个", distractor2: "八只" },
  { level: "YCT6", verb: "找到", classifier: "四个", noun: "牌子", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "丢了", classifier: "六个", noun: "牌子", distractor1: "二个", distractor2: "六只" },
  { level: "YCT6", verb: "挂了", classifier: "一个", noun: "牌子", distractor1: "七个", distractor2: "一只" },
  { level: "YCT6", verb: "拿着", classifier: "十个", noun: "牌子", distractor1: "四个", distractor2: "十只" },
  { level: "YCT6", verb: "放了", classifier: "三个", noun: "牌子", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "带了", classifier: "七个", noun: "牌子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "选了", classifier: "四个", noun: "牌子", distractor1: "九个", distractor2: "四只" },
  { level: "YCT6", verb: "买了", classifier: "七块", noun: "牌子", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "给你", classifier: "三块", noun: "牌子", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "卖了", classifier: "九块", noun: "牌子", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "送你", classifier: "四块", noun: "牌子", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "找到", classifier: "六块", noun: "牌子", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "丢了", classifier: "两块", noun: "牌子", distractor1: "四个", distractor2: "二块" },
  { level: "YCT6", verb: "挂了", classifier: "八块", noun: "牌子", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五块", noun: "牌子", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一块", noun: "牌子", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十块", noun: "牌子", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三块", noun: "牌子", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "画了", classifier: "四辆", noun: "自行车", distractor1: "六辆", distractor2: "四个" },
  { level: "YCT6", verb: "买了", classifier: "七辆", noun: "自行车", distractor1: "二辆", distractor2: "七个" },
  { level: "YCT6", verb: "给你", classifier: "一辆", noun: "自行车", distractor1: "五辆", distractor2: "一个" },
  { level: "YCT6", verb: "卖了", classifier: "十辆", noun: "自行车", distractor1: "三辆", distractor2: "十个" },
  { level: "YCT6", verb: "送你", classifier: "三辆", noun: "自行车", distractor1: "九辆", distractor2: "三个" },
  { level: "YCT6", verb: "找到", classifier: "七辆", noun: "自行车", distractor1: "四辆", distractor2: "七个" },
  { level: "YCT6", verb: "丢了", classifier: "四辆", noun: "自行车", distractor1: "六辆", distractor2: "四个" },
  { level: "YCT6", verb: "骑了", classifier: "两辆", noun: "自行车", distractor1: "九辆", distractor2: "二辆" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "面条", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "面条", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "面条", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "面条", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "面条", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两斤", noun: "面条", distractor1: "四个", distractor2: "二斤" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "面条", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "面条", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "面条", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "面条", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "苹果", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "苹果", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "苹果", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "苹果", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "苹果", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两斤", noun: "苹果", distractor1: "四个", distractor2: "二斤" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "苹果", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "苹果", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "苹果", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "苹果", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "喝了", classifier: "七盒", noun: "牛奶", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "牛奶", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "牛奶", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "牛奶", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "牛奶", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两盒", noun: "牛奶", distractor1: "四个", distractor2: "二盒" },
  { level: "YCT6", verb: "拿着", classifier: "八盒", noun: "牛奶", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五盒", noun: "牛奶", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一盒", noun: "牛奶", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十盒", noun: "牛奶", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "蛋糕", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "蛋糕", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "蛋糕", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "蛋糕", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "蛋糕", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两斤", noun: "蛋糕", distractor1: "四个", distractor2: "二斤" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "蛋糕", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "蛋糕", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "蛋糕", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "蛋糕", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "鱼", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "鱼", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "鱼", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "鱼", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "鱼", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "两斤", noun: "鱼", distractor1: "四个", distractor2: "二斤" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "鱼", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "鱼", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "鱼", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "鱼", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "买了", classifier: "七盒", noun: "铅笔", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "给你", classifier: "三盒", noun: "铅笔", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "卖了", classifier: "九盒", noun: "铅笔", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "送你", classifier: "四盒", noun: "铅笔", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "找到", classifier: "六盒", noun: "铅笔", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "丢了", classifier: "两盒", noun: "铅笔", distractor1: "四个", distractor2: "二盒" },
  { level: "YCT6", verb: "拿着", classifier: "八盒", noun: "铅笔", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五盒", noun: "铅笔", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一盒", noun: "铅笔", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十盒", noun: "铅笔", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "水果", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "水果", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "水果", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "水果", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "水果", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "水果", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "水果", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "水果", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "水果", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "水果", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "香蕉", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "香蕉", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "香蕉", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "香蕉", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "香蕉", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "香蕉", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "香蕉", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "香蕉", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "香蕉", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "香蕉", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "糖", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "糖", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "糖", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "糖", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "糖", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "糖", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "糖", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "糖", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "糖", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "糖", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "糖", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "糖", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "糖", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "糖", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "糖", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "糖", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "糖", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "糖", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "糖", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "糖", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "糖", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "西瓜", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "西瓜", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "西瓜", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "西瓜", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "西瓜", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "西瓜", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "西瓜", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "西瓜", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "西瓜", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "西瓜", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "西瓜", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "西瓜", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "西瓜", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "西瓜", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "西瓜", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "西瓜", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "西瓜", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "西瓜", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "西瓜", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "西瓜", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "西瓜", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "鸡蛋", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "鸡蛋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "鸡蛋", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "鸡蛋", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "鸡蛋", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "鸡蛋", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "鸡蛋", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "鸡蛋", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "鸡蛋", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "鸡蛋", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "鸡蛋", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "鸡蛋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "鸡蛋", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "鸡蛋", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "鸡蛋", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "鸡蛋", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "鸡蛋", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "鸡蛋", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "鸡蛋", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "鸡蛋", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "鸡蛋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "药", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "喝了", classifier: "三盒", noun: "药", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "买了", classifier: "九盒", noun: "药", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "给你", classifier: "四盒", noun: "药", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "卖了", classifier: "六盒", noun: "药", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "送你", classifier: "二盒", noun: "药", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "找到", classifier: "八盒", noun: "药", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "丢了", classifier: "五盒", noun: "药", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "拿着", classifier: "一盒", noun: "药", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "放了", classifier: "十盒", noun: "药", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "带了", classifier: "三盒", noun: "药", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "选了", classifier: "七盒", noun: "药", distractor1: "四个", distractor2: "七只" },
  { level: "YCT6", verb: "喝了", classifier: "七盒", noun: "果汁", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "果汁", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "果汁", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "果汁", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "果汁", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "果汁", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "果汁", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "果汁", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "果汁", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "果汁", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "果汁", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "菜", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "菜", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "菜", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "菜", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "菜", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "菜", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "菜", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "菜", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "菜", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "菜", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "画了", classifier: "三辆", noun: "公共汽车", distractor1: "七个", distractor2: "三只" },
  { level: "YCT6", verb: "找到", classifier: "九辆", noun: "公共汽车", distractor1: "四个", distractor2: "九只" },
  { level: "YCT6", verb: "开", classifier: "五辆", noun: "公共汽车", distractor1: "一个", distractor2: "五只" },
  { level: "YCT6", verb: "等", classifier: "两辆", noun: "公共汽车", distractor1: "八个", distractor2: "二辆" },
  { level: "YCT6", verb: "喝了", classifier: "七盒", noun: "咖啡", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "咖啡", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "咖啡", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "咖啡", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "咖啡", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "咖啡", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "咖啡", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "咖啡", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "咖啡", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "咖啡", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "咖啡", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "喝了", classifier: "七盒", noun: "饮料", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "饮料", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "饮料", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "饮料", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "饮料", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "饮料", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "饮料", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "饮料", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "饮料", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "饮料", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "饮料", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "巧克力", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "巧克力", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "巧克力", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "巧克力", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "巧克力", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "巧克力", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "巧克力", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "巧克力", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "巧克力", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "巧克力", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "巧克力", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "饼干", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "饼干", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "饼干", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "饼干", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "饼干", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "饼干", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "饼干", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "饼干", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "饼干", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "饼干", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "饼干", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七盒", noun: "冰淇淋", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三盒", noun: "冰淇淋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九盒", noun: "冰淇淋", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四盒", noun: "冰淇淋", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六盒", noun: "冰淇淋", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二盒", noun: "冰淇淋", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "丢了", classifier: "八盒", noun: "冰淇淋", distractor1: "六个", distractor2: "八只" },
  { level: "YCT6", verb: "拿着", classifier: "五盒", noun: "冰淇淋", distractor1: "二个", distractor2: "五只" },
  { level: "YCT6", verb: "放了", classifier: "一盒", noun: "冰淇淋", distractor1: "五个", distractor2: "一只" },
  { level: "YCT6", verb: "带了", classifier: "十盒", noun: "冰淇淋", distractor1: "三个", distractor2: "十只" },
  { level: "YCT6", verb: "选了", classifier: "三盒", noun: "冰淇淋", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "吃了", classifier: "七斤", noun: "羊肉", distractor1: "二个", distractor2: "七只" },
  { level: "YCT6", verb: "买了", classifier: "三斤", noun: "羊肉", distractor1: "九个", distractor2: "三只" },
  { level: "YCT6", verb: "给你", classifier: "九斤", noun: "羊肉", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "卖了", classifier: "四斤", noun: "羊肉", distractor1: "三个", distractor2: "四只" },
  { level: "YCT6", verb: "送你", classifier: "六斤", noun: "羊肉", distractor1: "七个", distractor2: "六只" },
  { level: "YCT6", verb: "找到", classifier: "二斤", noun: "羊肉", distractor1: "四个", distractor2: "二只" },
  { level: "YCT6", verb: "拿着", classifier: "八斤", noun: "羊肉", distractor1: "六个", distractor2: "三只" },
  { level: "YCT6", verb: "放了", classifier: "五斤", noun: "羊肉", distractor1: "二个", distractor2: "八只" },
  { level: "YCT6", verb: "带了", classifier: "一斤", noun: "羊肉", distractor1: "五个", distractor2: "九只" },
  { level: "YCT6", verb: "选了", classifier: "十斤", noun: "羊肉", distractor1: "三个", distractor2: "七只" },
  { level: "YCT6", verb: "挂了", classifier: "三条", noun: "裙子", distractor1: "七个", distractor2: "八个" },
  { level: "YCT6", verb: "挂了", classifier: "九条", noun: "裤子", distractor1: "四个", distractor2: "六个" },
  { level: "YCT6", verb: "挂了", classifier: "五张", noun: "照片", distractor1: "一个", distractor2: "三个" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "喝了", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "喝了", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "礼物", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "礼物", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "礼物", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "礼物", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "花", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "花", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "花", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "花", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "喝了", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "喝了", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "吃了", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "买了", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "给你", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "送你", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT4", verb: "拿着", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "喝了", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "咖啡", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "喝了", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "饮料", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "巧克力", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "饼干", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "冰淇淋", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "玩具", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "烤鸭", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "苹果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "牛奶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "水", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "蛋糕", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "鱼", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "包子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "包子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "茶", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "冰水", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "水果", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "香蕉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "面条儿", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "饺子", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "礼物", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "花", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "糖", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "西瓜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "药", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "果汁", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "带了", classifier: "一点儿", noun: "菜", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "羊肉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "喝了", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "汤", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "吃了", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "买了", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "给你", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "送你", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "拿着", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "放了", classifier: "一点儿", noun: "小笼包", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "买了", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "给你", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "送你", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "拿着", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "放了", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "带了", classifier: "一点儿", noun: "面粉", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "吃了", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "买了", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "给你", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "送你", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "尝", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "拿着", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "放了", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "带了", classifier: "一点儿", noun: "葡萄", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "买了", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "给你", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "送你", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "拿着", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "放了", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT6", verb: "带了", classifier: "一点儿", noun: "杂志", distractor1: "有点儿", distractor2: "两点儿" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "巧克力", distractor1: "两本", distractor2: "一张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "饼干", distractor1: "三本", distractor2: "五张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "烤鸭", distractor1: "四本", distractor2: "六张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "苹果", distractor1: "五本", distractor2: "十张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "蛋糕", distractor1: "六本", distractor2: "四张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "水果", distractor1: "七本", distractor2: "五张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "糖", distractor1: "八本", distractor2: "六张" },
  { level: "YCT5", verb: "尝", classifier: "一块", noun: "西瓜", distractor1: "九本", distractor2: "七张" },
  { level: "YCT6", verb: "尝", classifier: "一块", noun: "月饼", distractor1: "十本", distractor2: "八张" },
  { level: "YCT6", verb: "尝", classifier: "一块", noun: "西红柿", distractor1: "一本", distractor2: "九张" },

  // --- NEW YCT3 "一些" QUESTIONS ---
  { level: "YCT3", verb: "吃了", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "喝了", classifier: "一些", noun: "牛奶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "牛奶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "喝了", classifier: "一些", noun: "水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "吃了", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "吃了", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "喝了", classifier: "一些", noun: "茶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "茶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "喝了", classifier: "一些", noun: "冰水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "冰水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "熊猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "熊猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "苹果", distractor1: "反了", distractor2: "两些" }, // Wait, distractor1 is "有些"!
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "苹果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "穿了", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "牛奶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "牛奶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "牛奶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "狗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "鱼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "鸟", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "铅笔", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "包子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "茶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "茶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "茶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "冰水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "冰水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "冰水", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "丢了", classifier: "一些", noun: "书", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "熊猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "熊猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "熊猫", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "画了", classifier: "一些", noun: "老虎", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "买了", classifier: "一些", noun: "老虎", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "给你", classifier: "一些", noun: "老虎", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "送你", classifier: "一些", noun: "老虎", distractor1: "有些", distractor2: "两些" },
  { level: "YCT3", verb: "找到", classifier: "一些", noun: "老虎", distractor1: "有些", distractor2: "两些" },

  // --- NEW YCT4 "一些" QUESTIONS ---
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "鞋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "穿了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "带了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "选了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "丢了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "穿了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "带了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "选了", classifier: "一些", noun: "衣服", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "丢了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "穿了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "带了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "选了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "杯子", distractor1: "有机", distractor2: "两些" }, // wait, NO ! "有些"!
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "丢了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "果汁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "路", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "走", classifier: "一些", noun: "路", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "卖了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "找到", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "丢了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "水果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "水果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "水果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "水果", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "香蕉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "香蕉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "香蕉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "香蕉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "饺子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "饺子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "饺子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "饺子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "花", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "花", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "花", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "花", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "糖", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "糖", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "糖", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "糖", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "西瓜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "西瓜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "西瓜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "西瓜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "药", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "药", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "药", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "药", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "买了", classifier: "一些", noun: "菜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "给你", classifier: "一些", noun: "菜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "送你", classifier: "一些", noun: "菜", distractor1: "有些", distractor2: "两些" },
  { level: "YCT4", verb: "拿着", classifier: "一些", noun: "菜", distractor1: "有些", distractor2: "两些" },

  // --- NEW YCT5 "一些" QUESTIONS ---
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "兔子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "兔子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "兔子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "兔子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "兔子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "大象", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "大象", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "大象", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "大象", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "大象", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "蝴蝶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "蝴蝶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "蝴蝶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "蝴蝶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "蝴蝶", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "虫子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "虫子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "虫子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "虫子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "虫子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "咖啡", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "咖啡", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "咖啡", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "咖啡", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "咖啡", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "戴了", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "项圈", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "饮料", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "饮料", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "饮料", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "饮料", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "饮料", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "巧克力", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "巧克力", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "巧克力", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "巧克力", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "巧克力", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "饼干", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "饼干", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "饼干", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "饼干", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "饼干", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "冰淇淋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "冰淇淋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "冰淇淋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "冰淇淋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "冰淇淋", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "玩具", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "玩具", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "玩具", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "玩具", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "玩具", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "手表", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "手表", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "手表", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "手表", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "手表", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "烤鸭", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "烤鸭", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "烤鸭", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "烤鸭", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "烤鸭", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "盘子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "盘子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "盘子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "盘子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "盘子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "碗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "碗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "碗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "碗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "碗", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "筷子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "筷子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "筷子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "筷子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "筷子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "照片", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "带了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "选了", classifier: "一些", noun: "杯子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "照片", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "照片", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "羊肉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "羊肉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "羊肉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "汤", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "汤", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "汤", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "地图", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "地图", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "地图", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "卖了", classifier: "一些", noun: "小笼包", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "拿着", classifier: "一些", noun: "小笼包", distractor1: "有些", distractor2: "两些" },
  { level: "YCT5", verb: "放了", classifier: "一些", noun: "小笼包", distractor1: "有些", distractor2: "两些" },

  // --- NEW YCT6 "一些" QUESTIONS ---
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "猴子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "猴子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "猴子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "猴子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "猴子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "面粉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "面粉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "面粉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "面粉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "面粉", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "葡萄", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "词典", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "儿童车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "开", classifier: "一些", noun: "地铁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "等", classifier: "一些", noun: "地铁", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "报纸", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "杂志", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "月饼", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "开", classifier: "一些", noun: "火车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "等", classifier: "一些", noun: "火车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "西红柿", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "挂了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "拿着", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "放了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "带了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "选了", classifier: "一些", noun: "牌子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "卖了", classifier: "一些", noun: "自行车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "丢了", classifier: "一些", noun: "自行车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "骑了", classifier: "一些", noun: "自行车", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "挂了", classifier: "一些", noun: "裙子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "挂了", classifier: "一些", noun: "裤子", distractor1: "有些", distractor2: "两些" },
  { level: "YCT6", verb: "挂了", classifier: "一些", noun: "照片", distractor1: "有些", distractor2: "两些" }
];


export const YCT_QUESTION_BANK_EXTRA: any[] = [
  { level: "YCT3", verb: "游了", classifier: "三十分钟", noun: "泳", distractor1: "三十个分钟", distractor2: "三十分", prototype: "游泳" },
  { level: "YCT3", verb: "打了", classifier: "四十五分钟", noun: "篮球", distractor1: "四十五个分钟", distractor2: "四十五分", prototype: "打篮球" },
  { level: "YCT3", verb: "踢了", classifier: "六十分钟", noun: "足球", distractor1: "六十个分钟", distractor2: "六十分", prototype: "踢足球" },
  { level: "YCT3", verb: "跑了", classifier: "二十分钟", noun: "步", distractor1: "二十个分钟", distractor2: "二分", prototype: "跑步" },
  { level: "YCT3", verb: "唱了", classifier: "十分钟", noun: "歌", distractor1: "十个分钟", distractor2: "十分", prototype: "唱歌" },
  { level: "YCT3", verb: "跳了", classifier: "三十分钟", noun: "舞", distractor1: "三十个分钟", distractor2: "三十分", prototype: "跳舞" },
  { level: "YCT3", verb: "游了", classifier: "三年", noun: "泳", distractor1: "三个年", distractor2: "二年", prototype: "游泳" },
  { level: "YCT3", verb: "打了", classifier: "五年", noun: "篮球", distractor1: "五个年", distractor2: "二年", prototype: "打篮球" },
  { level: "YCT3", verb: "踢了", classifier: "十年", noun: "足球", distractor1: "十个年", distractor2: "二年", prototype: "踢足球" },
  { level: "YCT3", verb: "跑了", classifier: "两年", noun: "步", distractor1: "二个年", distractor2: "二年", prototype: "跑步" },
  { level: "YCT3", verb: "唱了", classifier: "八年", noun: "歌", distractor1: "八个年", distractor2: "二年", prototype: "唱歌" },
  { level: "YCT3", verb: "跳了", classifier: "四年", noun: "舞", distractor1: "四个年", distractor2: "二年", prototype: "跳舞" },
  { level: "YCT4", verb: "上了", classifier: "五十分钟", noun: "网", distractor1: "五十个分钟", distractor2: "五十分", prototype: "上网" },
  { level: "YCT4", verb: "洗了", classifier: "二十分钟", noun: "澡", distractor1: "二十个分钟", distractor2: "二十分", prototype: "洗澡" },
  { level: "YCT4", verb: "上了", classifier: "三年", noun: "网", distractor1: "三个年", distractor2: "二年", prototype: "上网" },
  { level: "YCT4", verb: "说了", classifier: "两个小时", noun: "话", distractor1: "两时", distractor2: "二个小时", prototype: "说话" },
  { level: "YCT4", verb: "睡了", classifier: "八个小时", noun: "觉", distractor1: "八时", distractor2: "二个小时", prototype: "睡觉" },
  { level: "YCT4", verb: "做了", classifier: "三个小时", noun: "饭", distractor1: "三时", distractor2: "二个小时", prototype: "做饭" },
  { level: "YCT4", verb: "打了", classifier: "两个小时", noun: "电话", distractor1: "两时", distractor2: "二个小时", prototype: "打电话" },
  { level: "YCT4", verb: "打了", classifier: "五个小时", noun: "电话", distractor1: "五时", distractor2: "二个小时", prototype: "打电话" },
  { level: "YCT4", verb: "游了", classifier: "两个小时", noun: "泳", distractor1: "两时", distractor2: "二个小时", prototype: "游泳" },
  { level: "YCT4", verb: "打了", classifier: "三个小时", noun: "篮球", distractor1: "三时", distractor2: "二个小时", prototype: "打篮球" },
  { level: "YCT4", verb: "踢了", classifier: "两个小时", noun: "足球", distractor1: "两时", distractor2: "二个小时", prototype: "踢足球" },
  { level: "YCT4", verb: "跑了", classifier: "一个小时", noun: "步", distractor1: "一时", distractor2: "二个小时", prototype: "跑步" },
  { level: "YCT4", verb: "唱了", classifier: "两个小时", noun: "歌", distractor1: "两时", distractor2: "二个小时", prototype: "唱歌" },
  { level: "YCT4", verb: "跳了", classifier: "三个小时", noun: "舞", distractor1: "三时", distractor2: "二个小时", prototype: "跳舞" },
  { level: "YCT4", verb: "上了", classifier: "四个小时", noun: "网", distractor1: "四时", distractor2: "二个小时", prototype: "上网" },
  { level: "YCT4", verb: "洗了", classifier: "两个小时", noun: "澡", distractor1: "两时", distractor2: "二个小时", prototype: "洗澡" },
  { level: "YCT5", verb: "弹了", classifier: "四十分钟", noun: "钢琴", distractor1: "四十个分钟", distractor2: "四十分", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "二十分钟", noun: "步", distractor1: "二十个分钟", distractor2: "二十分", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "六十分钟", noun: "山", distractor1: "六十个分钟", distractor2: "六十分", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "五分钟", noun: "相", distractor1: "五个分钟", distractor2: "五分", prototype: "照相" },
  { level: "YCT5", verb: "堆了", classifier: "四十分钟", noun: "雪人", distractor1: "四十个分钟", distractor2: "四十分", prototype: "堆雪人" },
  { level: "YCT5", verb: "刷了", classifier: "三分钟", noun: "牙", distractor1: "三个分钟", distractor2: "三分", prototype: "刷牙" },
  { level: "YCT5", verb: "考了", classifier: "五十分钟", noun: "试", distractor1: "五十个分钟", distractor2: "五十分", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "三十分钟", noun: "天儿", distractor1: "三十个分钟", distractor2: "三十分", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "六十分钟", noun: "网球", distractor1: "六十个分钟", distractor2: "六十分", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "四十五分钟", noun: "排球", distractor1: "四十五个分钟", distractor2: "四十五分", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "三十分钟", noun: "乒乓球", distractor1: "三十个分钟", distractor2: "三十分", prototype: "打乒乓球" },
  { level: "YCT5", verb: "弹了", classifier: "十年", noun: "钢琴", distractor1: "十个年", distractor2: "二年", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "三年", noun: "步", distractor1: "三个年", distractor2: "二年", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "两年", noun: "山", distractor1: "两个年", distractor2: "二年", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "五年", noun: "相", distractor1: "五个年", distractor2: "二年", prototype: "照相" },
  { level: "YCT5", verb: "考了", classifier: "四年", noun: "试", distractor1: "四个年", distractor2: "二年", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "两年", noun: "天儿", distractor1: "两个年", distractor2: "二年", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "五年", noun: "网球", distractor1: "五个年", distractor2: "二年", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "三年", noun: "排球", distractor1: "三个年", distractor2: "二年", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "六年", noun: "乒乓球", distractor1: "六个年", distractor2: "二年", prototype: "打乒乓球" },
  { level: "YCT5", verb: "弹了", classifier: "两个小时", noun: "钢琴", distractor1: "两个时", distractor2: "二个小时", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "一个小时", noun: "步", distractor1: "一个时", distractor2: "二个小时", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "四个小时", noun: "山", distractor1: "四个时", distractor2: "二个小时", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "两个小时", noun: "相", distractor1: "两个时", distractor2: "二个小时", prototype: "照相" },
  { level: "YCT5", verb: "堆了", classifier: "两个小时", noun: "雪人", distractor1: "两个时", distractor2: "二个小时", prototype: "堆雪人" },
  { level: "YCT5", verb: "考了", classifier: "三个小时", noun: "试", distractor1: "三个时", distractor2: "二个小时", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "两个小时", noun: "天儿", distractor1: "两个时", distractor2: "二个小时", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "两个小时", noun: "网球", distractor1: "两个时", distractor2: "二个小时", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "三个小时", noun: "排球", distractor1: "三个时", distractor2: "二个小时", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "两个小时", noun: "乒乓球", distractor1: "两个时", distractor2: "二个小时", prototype: "打乒乓球" },
  { level: "YCT6", verb: "骑了", classifier: "三十分钟", noun: "马", distractor1: "三十个分钟", distractor2: "三十分", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "四十分钟", noun: "队", distractor1: "四十个分钟", distractor2: "四十分", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "四十分钟", noun: "自行车", distractor1: "四十个分钟", distractor2: "四十分", prototype: "骑自行车" },
  { level: "YCT6", verb: "开了", classifier: "两年", noun: "会", distractor1: "两个年", distractor2: "二年", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "五年", noun: "班", distractor1: "五个年", distractor2: "二年", prototype: "上班" },
  { level: "YCT6", verb: "骑了", classifier: "三年", noun: "马", distractor1: "三个年", distractor2: "二年", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "两年", noun: "队", distractor1: "两个年", distractor2: "二年", prototype: "排队" },
  { level: "YCT6", verb: "注了", classifier: "五年", noun: "意", distractor1: "五个年", distractor2: "二年", prototype: "注意" },
  { level: "YCT6", verb: "骑了", classifier: "七年", noun: "自行车", distractor1: "七个年", distractor2: "二年", prototype: "骑自行车" },
  { level: "YCT6", verb: "开了", classifier: "三个小时", noun: "会", distractor1: "三个时", distractor2: "二个小时", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "八个小时", noun: "班", distractor1: "八个时", distractor2: "二个小时", prototype: "上班" },
  { level: "YCT6", verb: "搬了", classifier: "三个小时", noun: "家", distractor1: "三个时", distractor2: "二个小时", prototype: "搬家" },
  { level: "YCT6", verb: "骑了", classifier: "二个小时", noun: "马", distractor1: "二个时", distractor2: "二个小时", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "四个小时", noun: "队", distractor1: "四个时", distractor2: "二个小时", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "三个小时", noun: "自行车", distractor1: "三个时", distractor2: "二个小时", prototype: "骑自行车" },
  { level: "YCT2", verb: "说了", classifier: "十分钟", noun: "话", distractor1: "十个分钟", distractor2: "十个分", prototype: "说话" },
  { level: "YCT2", verb: "睡了", classifier: "二十分钟", noun: "觉", distractor1: "二十个分钟", distractor2: "二十个分", prototype: "睡觉" },
  { level: "YCT2", verb: "打了", classifier: "二十分钟", noun: "电话", distractor1: "二十个分钟", distractor2: "二十个分", prototype: "打电话" },
  { level: "YCT2", verb: "打了", classifier: "三年", noun: "电话", distractor1: "三个年", distractor2: "二年", prototype: "打电话" },
  { level: "YCT3", verb: "游了", classifier: "三十分钟", noun: "泳", distractor1: "三十个分钟", distractor2: "三十个分", prototype: "游泳" },
  { level: "YCT5", verb: "上了", classifier: "一会儿", noun: "网", distractor1: "二会儿", distractor2: "一些", prototype: "上网" },
  { level: "YCT5", verb: "洗了", classifier: "一会儿", noun: "澡", distractor1: "一点儿", distractor2: "一些", prototype: "洗澡" },
  { level: "YCT5", verb: "说了", classifier: "一会儿", noun: "话", distractor1: "二会儿", distractor2: "二些", prototype: "说话" },
  { level: "YCT5", verb: "睡了", classifier: "一会儿", noun: "觉", distractor1: "一点儿", distractor2: "一些", prototype: "睡觉" },
  { level: "YCT5", verb: "做了", classifier: "一会儿", noun: "饭", distractor1: "二会儿", distractor2: "二些", prototype: "做饭" },
  { level: "YCT5", verb: "打了", classifier: "一会儿", noun: "电话", distractor1: "一点儿", distractor2: "一些", prototype: "打电话" },
  { level: "YCT5", verb: "游了", classifier: "一会儿", noun: "泳", distractor1: "一点儿", distractor2: "一些", prototype: "游泳" },
  { level: "YCT5", verb: "打了", classifier: "一会儿", noun: "篮球", distractor1: "一点儿", distractor2: "一些", prototype: "打篮球" },
  { level: "YCT5", verb: "踢了", classifier: "一会儿", noun: "足球", distractor1: "一点儿", distractor2: "一些", prototype: "踢足球" },
  { level: "YCT5", verb: "跑了", classifier: "一会儿", noun: "步", distractor1: "一点儿", distractor2: "一些", prototype: "跑步" },
  { level: "YCT5", verb: "唱了", classifier: "一会儿", noun: "歌", distractor1: "一点儿", distractor2: "一些", prototype: "唱歌" },
  { level: "YCT5", verb: "跳了", classifier: "一会儿", noun: "舞", distractor1: "一点儿", distractor2: "一些", prototype: "跳舞" },
  { level: "YCT5", verb: "弹了", classifier: "一会儿", noun: "钢琴", distractor1: "一点儿", distractor2: "一些", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "一会儿", noun: "步", distractor1: "一点儿", distractor2: "一些", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "一会儿", noun: "山", distractor1: "一点儿", distractor2: "一些", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "一会儿", noun: "相", distractor1: "一点儿", distractor2: "一些", prototype: "照相" },
  { level: "YCT5", verb: "堆了", classifier: "一会儿", noun: "雪人", distractor1: "一点儿", distractor2: "一些", prototype: "堆雪人" },
  { level: "YCT5", verb: "刷了", classifier: "一会儿", noun: "牙", distractor1: "一点儿", distractor2: "一些", prototype: "刷牙" },
  { level: "YCT5", verb: "补了", classifier: "一会儿", noun: "牙", distractor1: "一点儿", distractor2: "一些", prototype: "补牙" },
  { level: "YCT5", verb: "考了", classifier: "一会儿", noun: "试", distractor1: "一点儿", distractor2: "一些", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "一会儿", noun: "天儿", distractor1: "一点儿", distractor2: "一些", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "一会儿", noun: "网球", distractor1: "一点儿", distractor2: "一些", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "一会儿", noun: "排球", distractor1: "一点儿", distractor2: "一些", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "一会儿", noun: "乒乓球", distractor1: "一点儿", distractor2: "一些", prototype: "打乒乓球" },
  { level: "YCT5", verb: "流了", classifier: "一会儿", noun: "汗", distractor1: "二会儿", distractor2: "二些", prototype: "流汗" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "针", distractor1: "二会儿", distractor2: "二些", prototype: "打针" },
  { level: "YCT6", verb: "流了", classifier: "一下", noun: "汗", distractor1: "二会儿", distractor2: "二些", prototype: "流汗" },
  { level: "YCT6", verb: "开了", classifier: "一下", noun: "会", distractor1: "一点儿", distractor2: "一些", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "一下", noun: "班", distractor1: "一点儿", distractor2: "一些", prototype: "上班" },
  { level: "YCT6", verb: "搬了", classifier: "一下", noun: "家", distractor1: "一点儿", distractor2: "一些", prototype: "搬家" },
  { level: "YCT6", verb: "迷了", classifier: "一下", noun: "路", distractor1: "一点儿", distractor2: "一些", prototype: "迷路" },
  { level: "YCT6", verb: "见了", classifier: "一下", noun: "面", distractor1: "一点儿", distractor2: "一些", prototype: "见面" },
  { level: "YCT6", verb: "骑了", classifier: "一下", noun: "马", distractor1: "一点儿", distractor2: "一些", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "一下", noun: "队", distractor1: "一点儿", distractor2: "一些", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "一下", noun: "自行车", distractor1: "一点儿", distractor2: "一些", prototype: "骑自行车" },
  { level: "YCT6", verb: "上了", classifier: "一下", noun: "网", distractor1: "三下", distractor2: "一些", prototype: "上网" },
  { level: "YCT6", verb: "洗了", classifier: "一下", noun: "澡", distractor1: "一点儿", distractor2: "一些", prototype: "洗澡" },
  { level: "YCT6", verb: "说了", classifier: "一下", noun: "话", distractor1: "四下", distractor2: "二些", prototype: "说话" },
  { level: "YCT6", verb: "睡了", classifier: "一下", noun: "觉", distractor1: "一点儿", distractor2: "一些", prototype: "睡觉" },
  { level: "YCT6", verb: "做了", classifier: "一下", noun: "饭", distractor1: "有点儿", distractor2: "二些", prototype: "做饭" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "电话", distractor1: "一点儿", distractor2: "一些", prototype: "打电话" },
  { level: "YCT6", verb: "游了", classifier: "一下", noun: "泳", distractor1: "一点儿", distractor2: "一些", prototype: "游泳" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "篮球", distractor1: "一点儿", distractor2: "一些", prototype: "打篮球" },
  { level: "YCT6", verb: "踢了", classifier: "一下", noun: "足球", distractor1: "一点儿", distractor2: "一些", prototype: "踢足球" },
  { level: "YCT6", verb: "跑了", classifier: "一下", noun: "步", distractor1: "一点儿", distractor2: "一些", prototype: "跑步" },
  { level: "YCT6", verb: "唱了", classifier: "一下", noun: "歌", distractor1: "一点儿", distractor2: "一些", prototype: "唱歌" },
  { level: "YCT6", verb: "跳了", classifier: "一下", noun: "舞", distractor1: "一点儿", distractor2: "一些", prototype: "跳舞" },
  { level: "YCT6", verb: "弹了", classifier: "一下", noun: "钢琴", distractor1: "一点儿", distractor2: "一些", prototype: "弹钢琴" },
  { level: "YCT6", verb: "散了", classifier: "一下", noun: "步", distractor1: "一点儿", distractor2: "一些", prototype: "散步" },
  { level: "YCT6", verb: "爬了", classifier: "一下", noun: "山", distractor1: "一点儿", distractor2: "一些", prototype: "爬山" },
  { level: "YCT6", verb: "照了", classifier: "一下", noun: "相", distractor1: "一点儿", distractor2: "一些", prototype: "照相" },
  { level: "YCT6", verb: "堆了", classifier: "一下", noun: "雪人", distractor1: "一点儿", distractor2: "一些", prototype: "堆雪人" },
  { level: "YCT6", verb: "刷了", classifier: "一下", noun: "牙", distractor1: "一点儿", distractor2: "一些", prototype: "刷牙" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "针", distractor1: "一点儿", distractor2: "一些", prototype: "打针" },
  { level: "YCT6", verb: "补了", classifier: "一下", noun: "牙", distractor1: "一点儿", distractor2: "一些", prototype: "补牙" },
  { level: "YCT6", verb: "开了", classifier: "一下", noun: "药", distractor1: "五下", distractor2: "二些", prototype: "开药" },
  { level: "YCT6", verb: "考了", classifier: "一下", noun: "试", distractor1: "一点儿", distractor2: "一些", prototype: "考试" },
  { level: "YCT6", verb: "聊了", classifier: "一下", noun: "天儿", distractor1: "一点儿", distractor2: "一些", prototype: "聊天儿" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "网球", distractor1: "一点儿", distractor2: "一些", prototype: "打网球" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "排球", distractor1: "一点儿", distractor2: "一些", prototype: "打排球" },
  { level: "YCT6", verb: "打了", classifier: "一下", noun: "乒乓球", distractor1: "一点儿", distractor2: "一些", prototype: "打乒乓球" },
  { level: "YCT6", verb: "开了", classifier: "一会儿", noun: "会", distractor1: "二会儿", distractor2: "一些", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "一会儿", noun: "班", distractor1: "六会儿", distractor2: "一些", prototype: "上班" },
  { level: "YCT6", verb: "迷了", classifier: "一会儿", noun: "路", distractor1: "五会儿", distractor2: "一些", prototype: "迷路" },
  { level: "YCT6", verb: "见了", classifier: "一会儿", noun: "面", distractor1: "四会儿", distractor2: "一些", prototype: "见面" },
  { level: "YCT6", verb: "骑了", classifier: "一会儿", noun: "马", distractor1: "二会儿", distractor2: "一些", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "一会儿", noun: "队", distractor1: "二会儿", distractor2: "一些", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "一会儿", noun: "自行车", distractor1: "二会儿", distractor2: "一些", prototype: "骑自行车" },
  { level: "YCT5", verb: "弹了", classifier: "两次", noun: "钢琴", distractor1: "二次", distractor2: "两个次", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "三次", noun: "步", distractor1: "二次", distractor2: "三个次", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "四次", noun: "山", distractor1: "二次", distractor2: "四个次", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "五次", noun: "相", distractor1: "二次", distractor2: "五个次", prototype: "照相" },
  { level: "YCT5", verb: "堆了", classifier: "一次", noun: "雪人", distractor1: "二次", distractor2: "一个次", prototype: "堆雪人" },
  { level: "YCT5", verb: "刷了", classifier: "两次", noun: "牙", distractor1: "二次", distractor2: "两个次", prototype: "刷牙" },
  { level: "YCT5", verb: "打了", classifier: "三次", noun: "针", distractor1: "二次", distractor2: "三个次", prototype: "打针" },
  { level: "YCT5", verb: "补了", classifier: "一次", noun: "牙", distractor1: "二次", distractor2: "一个次", prototype: "补牙" },
  { level: "YCT5", verb: "开了", classifier: "两次", noun: "药", distractor1: "二次", distractor2: "两个次", prototype: "开药" },
  { level: "YCT5", verb: "旅了", classifier: "一次", noun: "游", distractor1: "二次", distractor2: "一个次", prototype: "旅游" },
  { level: "YCT5", verb: "考了", classifier: "三次", noun: "试", distractor1: "二次", distractor2: "三个次", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "两次", noun: "天儿", distractor1: "二次", distractor2: "两个次", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "四次", noun: "网球", distractor1: "二次", distractor2: "四个次", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "五次", noun: "排球", distractor1: "二次", distractor2: "五个次", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "两次", noun: "乒乓球", distractor1: "二次", distractor2: "两个次", prototype: "打乒乓球" },
  { level: "YCT6", verb: "开了", classifier: "三次", noun: "会", distractor1: "二次", distractor2: "三个次", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "五次", noun: "班", distractor1: "二次", distractor2: "五个次", prototype: "上班" },
  { level: "YCT6", verb: "搬了", classifier: "两次", noun: "家", distractor1: "二次", distractor2: "两个次", prototype: "搬家" },
  { level: "YCT6", verb: "迷了", classifier: "两次", noun: "路", distractor1: "二次", distractor2: "两个次", prototype: "迷路" },
  { level: "YCT6", verb: "见了", classifier: "一次", noun: "面", distractor1: "二次", distractor2: "一个次", prototype: "见面" },
  { level: "YCT6", verb: "骑了", classifier: "两次", noun: "马", distractor1: "二次", distractor2: "两个次", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "三次", noun: "队", distractor1: "二次", distractor2: "三个次", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "两次", noun: "自行车", distractor1: "二次", distractor2: "两个次", prototype: "骑自行车" },
  { level: "YCT5", verb: "打了", classifier: "三个月", noun: "针", distractor1: "三月", distractor2: "二个月", prototype: "打针" },
  { level: "YCT5", verb: "流了", classifier: "两个月", noun: "汗", distractor1: "两月", distractor2: "二个月", prototype: "流汗" },
  { level: "YCT6", verb: "开了", classifier: "五个月", noun: "会", distractor1: "五月", distractor2: "二个月", prototype: "开会" },
  { level: "YCT6", verb: "上了", classifier: "一个月", noun: "班", distractor1: "一月", distractor2: "二个月", prototype: "上班" },
  { level: "YCT6", verb: "搬了", classifier: "两个月", noun: "家", distractor1: "两月", distractor2: "二个月", prototype: "搬家" },
  { level: "YCT6", verb: "迷了", classifier: "三个月", noun: "路", distractor1: "三月", distractor2: "二个月", prototype: "迷路" },
  { level: "YCT6", verb: "见了", classifier: "四个月", noun: "面", distractor1: "四月", distractor2: "二个月", prototype: "见面" },
  { level: "YCT6", verb: "骑了", classifier: "五个月", noun: "马", distractor1: "五月", distractor2: "二个月", prototype: "骑马" },
  { level: "YCT6", verb: "排了", classifier: "两个月", noun: "队", distractor1: "两月", distractor2: "二个月", prototype: "排队" },
  { level: "YCT6", verb: "骑了", classifier: "六个月", noun: "自行车", distractor1: "六月", distractor2: "二个月", prototype: "骑自行车" },
  { level: "YCT4", verb: "上了", classifier: "八个月", noun: "网", distractor1: "八月", distractor2: "二个月", prototype: "上网" },
  { level: "YCT4", verb: "洗了", classifier: "三个月", noun: "澡", distractor1: "三月", distractor2: "二个月", prototype: "洗澡" },
  { level: "YCT2", verb: "说了", classifier: "五个月", noun: "话", distractor1: "五月", distractor2: "二个月", prototype: "说话" },
  { level: "YCT2", verb: "睡了", classifier: "两个月", noun: "觉", distractor1: "两月", distractor2: "二个月", prototype: "睡觉" },
  { level: "YCT2", verb: "做了", classifier: "一个月", noun: "饭", distractor1: "一月", distractor2: "二个月", prototype: "做饭" },
  { level: "YCT2", verb: "打了", classifier: "四个月", noun: "电话", distractor1: "四月", distractor2: "二个月", prototype: "打电话" },
  { level: "YCT3", verb: "游了", classifier: "六个月", noun: "泳", distractor1: "六月", distractor2: "二个月", prototype: "游泳" },
  { level: "YCT3", verb: "打了", classifier: "三个月", noun: "篮球", distractor1: "三月", distractor2: "二个月", prototype: "打篮球" },
  { level: "YCT3", verb: "踢了", classifier: "五个月", noun: "足球", distractor1: "五月", distractor2: "二个月", prototype: "踢足球" },
  { level: "YCT3", verb: "跑了", classifier: "两个月", noun: "步", distractor1: "两月", distractor2: "二个月", prototype: "跑步" },
  { level: "YCT3", verb: "唱了", classifier: "一个月", noun: "歌", distractor1: "一月", distractor2: "二个月", prototype: "唱歌" },
  { level: "YCT3", verb: "跳了", classifier: "三个月", noun: "舞", distractor1: "三月", distractor2: "二个月", prototype: "跳舞" },
  { level: "YCT5", verb: "弹了", classifier: "四个月", noun: "钢琴", distractor1: "四月", distractor2: "二个月", prototype: "弹钢琴" },
  { level: "YCT5", verb: "散了", classifier: "两个月", noun: "步", distractor1: "两月", distractor2: "二个月", prototype: "散步" },
  { level: "YCT5", verb: "爬了", classifier: "一个月", noun: "山", distractor1: "一月", distractor2: "二个月", prototype: "爬山" },
  { level: "YCT5", verb: "照了", classifier: "五个月", noun: "相", distractor1: "五月", distractor2: "二个月", prototype: "照相" },
  { level: "YCT5", verb: "打了", classifier: "两个月", noun: "针", distractor1: "两月", distractor2: "二个月", prototype: "打针" },
  { level: "YCT5", verb: "补了", classifier: "三个月", noun: "牙", distractor1: "三月", distractor2: "二个月", prototype: "补牙" },
  { level: "YCT5", verb: "开了", classifier: "四个月", noun: "药", distractor1: "四月", distractor2: "二个月", prototype: "开药" },
  { level: "YCT5", verb: "考了", classifier: "一个月", noun: "试", distractor1: "一月", distractor2: "二个月", prototype: "考试" },
  { level: "YCT5", verb: "聊了", classifier: "三个月", noun: "天儿", distractor1: "三月", distractor2: "二个月", prototype: "聊天儿" },
  { level: "YCT5", verb: "打了", classifier: "五个月", noun: "网球", distractor1: "五月", distractor2: "二个月", prototype: "打网球" },
  { level: "YCT5", verb: "打了", classifier: "两个月", noun: "排球", distractor1: "两月", distractor2: "二个月", prototype: "打排球" },
  { level: "YCT5", verb: "打了", classifier: "四个月", noun: "乒乓球", distractor1: "四月", distractor2: "二个月", prototype: "打乒乓球" }
];

export const YCT_QUESTION_BANK: YctQuestionSpec[] = [
  ...YCT_QUESTION_BANK_BASE,
  ...YCT_QUESTION_BANK_EXTRA
];

export const CORRECT_CLASSIFIERS_SET = new Set<string>();

function sanitizeDistractor(distractor: string, correctClassifier: string, nounChar: string): string {
  if (!distractor || !distractor.includes("个")) {
    return distractor;
  }
  
  // Find the noun item from NOUNS_DATA
  const nounItem = Object.values(NOUNS_DATA).find(n => n.char === nounChar || n.id === nounChar);
  const correctClassifiers = nounItem ? nounItem.classifiers : [];

  // Allowed classifiers for the noun that shouldn't be chosen as distractors
  const forbidden = new Set<string>();
  correctClassifiers.forEach(c => {
    const cItem = CLASSIFIERS_DATA[c];
    if (cItem) forbidden.add(cItem.char);
    forbidden.add(c);
  });
  // Also forbid the correct classifier character for this question
  forbidden.add(correctClassifier);
  // Also contains "个" itself
  forbidden.add("个");

  // Forbid any standard classifier character that appears in correctClassifier
  const standardClassifiers = ["辆", "本", "只", "条", "件", "杯", "碗", "首", "张", "双", "支", "斤", "盒", "块", "个"];
  standardClassifiers.forEach(sc => {
    if (correctClassifier.includes(sc)) {
      forbidden.add(sc);
    }
  });

  // Get standard target classifiers that are NOT in forbidden
  const candidates = [
    "辆", "本", "只", "条", "件", "杯", "碗", "首", "张", "双", "支", "斤", "盒", "块"
  ].filter(c => !forbidden.has(c) && !correctClassifier.includes(c));

  // Choose a random candidate, fallback to something obviously mismatched like "辆" or "本"
  const replacement = candidates.length > 0 
    ? candidates[Math.floor(Math.random() * candidates.length)] 
    : "辆";

  // Replace "个" with the replacement classifier
  return distractor.replace(/个/g, replacement);
}

export function generatePipeTasks(level?: GameLevel): PipeNode[] {
  const targetLevel = level || "YCT2";
  const filtered = YCT_QUESTION_BANK.filter(q => q.level === targetLevel);
  const pool = filtered.length > 0 ? filtered : YCT_QUESTION_BANK;
  
  // YCT5 and YCT6 levels have 10 tasks, other levels have 6
  const taskCount = (targetLevel === "YCT5" || targetLevel === "YCT6") ? 10 : 6;

  // Split target pool into "some" (一些/一点儿) questions, extra, and regular base questions
  const somePool = pool.filter(q => q.classifier === "一些" || q.classifier === "一点儿");
  const extraPool = pool.filter(q => !!q.prototype);
  const basePool = pool.filter(q => !q.prototype && q.classifier !== "一些" && q.classifier !== "一点儿");

  let selected: any[] = [];

  // Determine needed "some" questions based on target level and pool availability
  let someCountNeeded = 0;
  if (somePool.length > 0) {
    someCountNeeded = taskCount === 10 ? 2 : 1; 
  }
  
  // Shufflers
  const shuffledSome = [...somePool].sort(() => 0.5 - Math.random());
  const shuffledExtra = [...extraPool].sort(() => 0.5 - Math.random());
  const shuffledBase = [...basePool].sort(() => 0.5 - Math.random());

  const selectedSome = shuffledSome.slice(0, someCountNeeded);

  // Determine extra pool count to draw
  let extraCountNeeded = 0;
  if (extraPool.length > 0) {
    extraCountNeeded = taskCount === 10 ? 3 : (Math.random() < 0.5 ? 1 : 2);
  }
  // Make sure we don't exceed taskCount with some + extra
  extraCountNeeded = Math.min(extraCountNeeded, taskCount - selectedSome.length);
  const selectedExtra = shuffledExtra.slice(0, extraCountNeeded);

  // Draw the rest from base pool
  const baseCountNeeded = Math.max(0, taskCount - selectedSome.length - selectedExtra.length);
  const selectedBase = shuffledBase.slice(0, baseCountNeeded);

  selected = [...selectedSome, ...selectedExtra, ...selectedBase];

  // Fallback if selected is less than taskCount (unlikely, but safe)
  if (selected.length < taskCount) {
    const combinedLeftovers = [
      ...shuffledSome.slice(selectedSome.length),
      ...shuffledExtra.slice(selectedExtra.length),
      ...shuffledBase.slice(selectedBase.length)
    ].sort(() => 0.5 - Math.random());
    selected = [...selected, ...combinedLeftovers.slice(0, taskCount - selected.length)];
  }

  // Shuffle the final selected questions so the "some" questions don't always appear in a fixed spot
  selected.sort(() => 0.5 - Math.random());

  const nodeNames = [
    { cn: "进水接线枢纽", en: "Intake Connection" },
    { cn: "主循环调节阀", en: "Primary Recirc Valve" },
    { cn: "高能核心过滤器", en: "Core Purification Filter" },
    { cn: "气压平衡补偿泵", en: "Dynamic Balance Pump" },
    { cn: "冷凝热交换回路", en: "Condiment Exchange Loop" },
    { cn: "达标净水排放槽", en: "Sanitary Water Outflow" },
    { cn: "多频调速水箱", en: "Multi-Freq Water Tank" },
    { cn: "安全紧急排空阀", en: "Emergency Purge Valve" },
    { cn: "辅助旁通管线枢", en: "Auxiliary Bypass Hub" },
    { cn: "压差反馈监控仪", en: "Diff Pressure Monitor" }
  ];

  return selected.map((q, idx) => {
    // Sanitize distractors to ensure they do not contain "个" (skip for new question bank with prototypes)
    let cleanedDist1 = q.prototype ? q.distractor1 : sanitizeDistractor(q.distractor1, q.classifier, q.noun);
    let cleanedDist2 = q.prototype ? q.distractor2 : sanitizeDistractor(q.distractor2, q.classifier, q.noun);

    // Deduping logic: ensure q.classifier, cleanedDist1, and cleanedDist2 are all mutually unique
    const standardPool = ["辆", "本", "只", "条", "件", "杯", "碗", "首", "张", "双", "支", "斤", "盒", "块"];
    
    // Function to generate a new distractor based on an existing one, making sure it doesn't collide with the forbidden set
    const rerollDistractor = (dist: string, forbiddenSet: Set<string>): string => {
      // If of the form "有点儿" or "两点儿", or "一些" etc.
      if (dist === "一些" || dist === "一点儿" || dist === "有点儿" || dist === "两点儿") {
        const fallbacks = ["一些", "一点儿", "有点儿", "两点儿", "许多", "好多"].filter(x => !forbiddenSet.has(x));
        return fallbacks.length > 0 ? fallbacks[Math.floor(Math.random() * fallbacks.length)] : "一些";
      }
      
      // If it has standard number prefix or length >= 2
      if (dist.length >= 2) {
        const prefix = dist.substring(0, dist.length - 1);
        const allowedTargets = standardPool.filter(c => !forbiddenSet.has(prefix + c) && !forbiddenSet.has(c));
        if (allowedTargets.length > 0) {
          return prefix + allowedTargets[Math.floor(Math.random() * allowedTargets.length)];
        }
      }
      
      // Fallback: choose completely from standardPool with a random number prefix
      const randomPrefix = ["三", "五", "六", "八", "十"][Math.floor(Math.random() * 5)];
      const allowedTargets = standardPool.filter(c => !forbiddenSet.has(randomPrefix + c) && !forbiddenSet.has(c));
      return allowedTargets.length > 0
        ? randomPrefix + allowedTargets[Math.floor(Math.random() * allowedTargets.length)]
        : randomPrefix + "只";
    };

    // First, resolve conflict of cleanedDist1 with q.classifier
    const forbidden1 = new Set<string>([q.classifier]);
    if (forbidden1.has(cleanedDist1)) {
      cleanedDist1 = rerollDistractor(cleanedDist1, forbidden1);
    }
    
    // Second, resolve conflict of cleanedDist2 with q.classifier AND cleanedDist1
    const forbidden2 = new Set<string>([q.classifier, cleanedDist1]);
    if (forbidden2.has(cleanedDist2)) {
      cleanedDist2 = rerollDistractor(cleanedDist2, forbidden2);
    }

    // Generate secure randomized option IDs
    const correctId = `opt_correct_${idx}_${Math.random().toString(36).substr(2, 4)}`;
    const dist1Id = `opt_dist1_${idx}_${Math.random().toString(36).substr(2, 4)}`;
    const dist2Id = `opt_dist2_${idx}_${Math.random().toString(36).substr(2, 4)}`;

    // Memorize the correct ID
    CORRECT_CLASSIFIERS_SET.add(correctId);

    // Register all options dynamically in DYNAMIC_CLASSIFIERS so they resolve perfectly in our proxies
    DYNAMIC_CLASSIFIERS[correctId] = {
      id: correctId,
      char: q.classifier,
      pinyin: getChPinyin(q.classifier),
      translations: { cn: q.classifier, en: q.classifier, mn: q.classifier },
      usageHelp: { cn: "正确的 YCT 搭配量词", en: "Correct YCT combination", mn: "" }
    };

    DYNAMIC_CLASSIFIERS[dist1Id] = {
      id: dist1Id,
      char: cleanedDist1,
      pinyin: getChPinyin(cleanedDist1),
      translations: { cn: cleanedDist1, en: cleanedDist1, mn: cleanedDist1 },
      usageHelp: { cn: "混淆量词搭配项", en: "Distractor combination", mn: "" }
    };

    DYNAMIC_CLASSIFIERS[dist2Id] = {
      id: dist2Id,
      char: cleanedDist2,
      pinyin: getChPinyin(cleanedDist2),
      translations: { cn: cleanedDist2, en: cleanedDist2, mn: cleanedDist2 },
      usageHelp: { cn: "混淆量词搭配项", en: "Distractor combination", mn: "" }
    };

    const classifierOptions = [
      { id: correctId, char: q.classifier, pinyin: getChPinyin(q.classifier) },
      { id: dist1Id, char: cleanedDist1, pinyin: getChPinyin(cleanedDist1) },
      { id: dist2Id, char: cleanedDist2, pinyin: getChPinyin(cleanedDist2) }
    ].sort(() => 0.5 - Math.random());

    // Initially select one of the distractors to represent a broken starting state
    const initialIncorrectId = Math.random() > 0.5 ? dist1Id : dist2Id;

    return {
      id: `task_${idx}_${Date.now()}`,
      name: `(${q.level}) ${nodeNames[idx % nodeNames.length].cn}`,
      initialVerbId: q.verb,
      initialClassifierId: initialIncorrectId,
      initialNounId: q.noun,

      correctVerbId: q.verb,
      correctClassifierId: correctId,
      correctNounId: q.noun,

      currentVerbId: q.verb,
      currentClassifierId: initialIncorrectId,
      currentNounId: q.noun,

      status: "broken",
      attempts: 0,
      lockedDuration: 0,
      classifierOptions,
      prototype: q.prototype
    };
  });
}

// Logic Rule Verification: Checks if a Verb, Classifier and Noun matched correctly.
// Returns an error message / explanation, or null if absolutely correct.
export interface CollocationCheckResult {
  isValid: boolean;
  message: TranslationSet;
  explanation: TranslationSet;
}

export function verifyCollocation(
  verbId: string,
  classifierId: string,
  nounId: string
): CollocationCheckResult {
  const verb = VERBS[verbId];
  const classifier = CLASSIFIERS[classifierId];
  const noun = NOUNS[nounId];

  if (!verb || !classifier || !noun) {
    return {
      isValid: false,
      message: {
        cn: "零件缺失！",
        en: "Missing spare parts!",
        mn: "Сэлбэг дутуу байна!"
      },
      explanation: {
        cn: "动作、量词和名词三个部分都必须指定。",
        en: "Verb, classifier, and noun must all be selected.",
        mn: "Үйл үг, ангилал үг, нэр үг гурвууланг нь сонгох ёстой."
      }
    };
  }

  // Purely check correctness via our CORRECT_CLASSIFIERS_SET first (for dynamic YCT tasks)
  if (CORRECT_CLASSIFIERS_SET.has(classifierId)) {
    return {
      isValid: true,
      message: {
        cn: "完美连通！",
        en: "Perfect collocation!",
        mn: "Төгс холбоос!"
      },
      explanation: {
        cn: `「${verb.char} + ${classifier.char} + ${noun.char}」搭配完全成立，管道流速恢复正常！`,
        en: `"${verb.char} + ${classifier.char} + ${noun.char}" is perfectly correct!`,
        mn: `"${verb.char} + ${classifier.char} + ${noun.char}" маш зөв холбоос байна!`
      }
    };
  }

  // 1. Check Verb restrictions based on Noun Physical Attributes
  const verbValid = verb.allowedAttributes && verb.allowedAttributes.includes(noun.attribute);
  
  // 2. Check Classifier restrictions based on Noun preferred Classifiers
  const classifierValid = noun.classifiers && noun.classifiers.includes(classifier.id);

  // Special rules: "买" is a universal verb for many physical objects can buy.
  const isBuyVerb = verbId === "mai";
  const finalVerbValid = verbValid || (isBuyVerb && noun.attribute !== "music");

  if (finalVerbValid && classifierValid) {
    return {
      isValid: true,
      message: {
        cn: "完美连通！",
        en: "Perfect collocation!",
        mn: "Төгс холбоос!"
      },
      explanation: {
        cn: `「${verb.char} + ${classifier.char} + ${noun.char}」搭配完全成立！${noun.char}属于「${noun.translations.cn}」，可以用「${classifier.char}」，并可以「${verb.char}」。`,
        en: `"${verb.char} (${verb.pinyin}) + ${classifier.char} (${classifier.pinyin}) + ${noun.char} (${noun.pinyin})" is perfect. You can ${verb.translations.en} a ${noun.translations.en} using the classifier ${classifier.char}.`,
        mn: `"${verb.char} + ${classifier.char} + ${noun.char}" бүрэн тохирлоо. Та ${noun.translations.mn}-ийг ${classifier.translations.mn} гэж ангилаад ${verb.translations.mn} боломжтой.`
      }
    };
  }

  // Generate detailed educational error explaining the grammatical conflict
  if (!finalVerbValid && !classifierValid) {
    return {
      isValid: false,
      message: {
        cn: "严重冲突！动词与量词都不适用",
        en: "Double fault! Verb and classifier both mismatch",
        mn: "Үйл үг болон ангилал үг хоёулаа таарахгүй байна"
      },
      explanation: {
        cn: `「${verb.char}」不能作用于「${noun.char}」并且「${noun.char}」不能用量词「${classifier.char}」。`,
        en: `"${verb.char}" cannot be performed on "${noun.char}", and "${noun.char}" cannot be counted with "${classifier.char}".`,
        mn: `"${verb.char}" үйлдэл "${noun.char}"-д тохирохгүй, мөн "${noun.char}"-ийг "${classifier.char}"-ээр тоолдоггүй.`
      }
    };
  }

  if (!finalVerbValid) {
    return {
      isValid: false,
      message: {
        cn: "动作错误 (Verb Mismatch)",
        en: "Incorrect Verb Action",
        mn: "Буруу үйл үг"
      },
      explanation: {
        cn: `「${verb.char}」不匹配拥有「${noun.attribute}」属性的「${noun.char}」。你不能「${verb.char}」一个「${noun.char}」！`,
        en: `"${verb.char}" does not fit the "${noun.char}" (it's a ${noun.attribute}). You cannot "${verb.char}" a ${noun.translations.en}!`,
        mn: `"${verb.char}" үйлдэл "${noun.char}" (${noun.translations.mn})-д тохирохгүй. Та ${noun.translations.mn}-ийг ${verb.translations.mn} боломжгүй!`
      }
    };
  }

  // Classifier mismatch
  const usageHelpCn = classifier.usageHelp?.cn || "搭配不正确";
  const usageHelpEn = classifier.usageHelp?.en || "Incorrect combination";
  const usageHelpMn = classifier.usageHelp?.mn || "Буруу холбоос";

  return {
    isValid: false,
    message: {
      cn: "量词错误 (Classifier Mismatch)",
      en: "Incorrect Measure Word",
      mn: "Буруу ангилал үг"
    },
    explanation: {
      cn: `量词「${classifier.char}」不适用于「${noun.char}」。${usageHelpCn}。请尝试用「${noun.classifiers ? noun.classifiers.map(id => CLASSIFIERS[id]?.char).filter(Boolean).join(" / ") : ""}」！`,
      en: `The classifier "${classifier.char}" isn't used for "${noun.char}". ${usageHelpEn}. Try using "${noun.classifiers ? noun.classifiers.map(id => CLASSIFIERS[id]?.char).filter(Boolean).join(" or ") : ""}"!`,
      mn: `"${classifier.char}" ангилал үг "${noun.char}"-д тохирохгүй. ${usageHelpMn}. Үүний оронд "${noun.classifiers ? noun.classifiers.map(id => CLASSIFIERS[id]?.char).filter(Boolean).join(" болон ") : ""}"-ийг ашиглаж үзээрэй.`
    }
  };
}

const charPinyinMap: Record<string, string> = {
  "吃": "chī", "喝": "hē", "骑": "qí", "开": "kāi", "坐": "zuò", "穿": "chuān", "看": "kàn", "听": "tīng", "买": "mǎi", "尝": "cháng",
  "个": "gè", "辆": "liàng", "本": "běn", "只": "zhī", "条": "tiáo", "件": "jiàn", "杯": "bēi", "碗": "wǎn", "首": "shǒu", "张": "zhāng", "双": "shuāng",
  "苹": "píng", "果": "guǒ", "西": "xī", "瓜": "guā", "米": "mǐ", "饭": "fàn", "面": "miàn", "牛": "niú", "奶": "nǎi", "水": "shuǐ",
  "茶": "chá", "自": "zì", "行": "xíng", "车": "chē", "汽": "qì", "飞": "fēi", "机": "jī", "床": "chuáng", "桌": "zhuō", "子": "zi", "书": "shū",
  "报": "bào", "纸": "zhǐ", "衣": "yī", "服": "fu", "裤": "kù", "鞋": "xié", "猫": "māo", "狗": "gǒu", "鱼": "yú", "歌": "gē",
  "带": "dài", "了": "le", "给": "gěi", "你": "nǐ", "送": "sòng", "拿": "ná", "着": "zhe", "放": "fàng", "一": "yī", "两": "liǎng", "三": "sān",
  "四": "sì", "五": "wǔ", "六": "liù", "七": "qī", "八": "bā", "九": "jiǔ", "十": "shí", "块": "kuài", "有": "yǒu", "点": "diǎn", "儿": "r",
  "汉": "hàn", "糖": "táng", "药": "yào", "汁": "zhī", "菜": "cài", "羊": "yáng", "肉": "ròu", "汤": "tāng", "笼": "lóng", "包": "bāo", "粉": "fěn",
  "葡": "pú", "萄": "táo", "杂": "zá", "志": "zhì", "巧": "qiǎo", "克": "kè", "力": "lì", "饼": "bǐng", "干": "gān", "烤": "kǎo", "鸭": "yā",
  "蛋": "dàn", "糕": "gāo", "月": "yuè", "红": "hóng", "柿": "shì", "天": "tiān", "气": "qì", "岁": "suì", "数": "shu", "名": "míng", "钱": "qián",
  "国": "guó", "籍": "jí", "礼": "lǐ", "物": "wù", "花": "huā",
  "二": "èr", "支": "zhī", "盘": "pán", "饺": "jiǎo", "眼": "yǎn", "睛": "jing", "手": "shǒu", "耳": "ěr", "朵": "duo",
  "小": "xiǎo", "画": "huà", "找": "zhǎo", "到": "dào", "丢": "diū", "老": "lǎo", "虎": "hǔ", "熊": "xióng", "铅": "qiān",
  "笔": "bǐ", "冰": "bīng", "淇": "qí", "淋": "lín", "鸟": "niǎo", "裙": "qún", "卖": "mài", "选": "xuǎn", "香": "xiāng",
  "蕉": "jiāo", "兔": "tù", "路": "lù", "大": "dà", "象": "xiàng", "蝴": "hú", "蝶": "dié", "虫": "chóng", "咖": "kā",
  "啡": "fēi", "玩": "wán", "具": "jù", "照": "zhào", "片": "piàn", "表": "biǎo", "筷": "kuài", "戴": "dài", "项": "xiàng",
  "圈": "quān", "饮": "yǐn", "料": "liào", "走": "zǒu",
  "游": "yóu", "泳": "yǒng", "打": "dǎ", "篮": "lán", "球": "qiú",
  "踢": "tī", "足": "zú", "跑": "pǎo", "步": "bù", "唱": "chàng",
  "跳": "tiào", "舞": "wǔ", "上": "shàng", "网": "wǎng", "洗": "xǐ",
  "澡": "zǎo", "说": "shuō", "话": "huà", "睡": "shuì", "觉": "jiào",
  "做": "zuò", "电": "diàn", "弹": "tán", "钢": "gāng", "琴": "qín",
  "散": "sàn", "爬": "pá", "山": "shān", "相": "xiàng", "堆": "duī",
  "雪": "xuě", "人": "rén", "刷": "shuā", "牙": "yá", "考": "kǎo",
  "试": "shì", "聊": "liáo", "排": "pái", "乒": "pīng", "乓": "pāng",
  "队": "duì", "班": "bān", "注": "zhù", "意": "yì", "搬": "bān",
  "家": "jiā", "针": "zhēn", "流": "liú", "汗": "hàn", "迷": "mí",
  "见": "jiàn", "补": "bǔ", "旅": "lǚ",
  "年": "nián", "分": "fēn", "钟": "zhōng", "次": "cì", "时": "shí", "会": "huì", "下": "xià", "些": "xiē", "挂": "guà", "等": "děng"
};

export function getChPinyin(text: string): string {
  if (!text) return "";
  const customMap: Record<string, string> = {
    "面条儿": "miàntiáor",
    "一点儿": "yīdiǎnr",
    "有点儿": "yǒudiǎnr",
    "两点儿": "liǎngdiǎnr",
    "一些": "yīxiē",
    "有些": "yǒuxiē",
    "两些": "liǎngxiē",
    "一下": "yīxià",
    "一会儿": "yīhuìr"
  };
  if (customMap[text]) return customMap[text];

  const pinyins: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const pin = charPinyinMap[char] || char;
    if (char === "儿" && pinyins.length > 0) {
      pinyins[pinyins.length - 1] = pinyins[pinyins.length - 1] + "r";
    } else {
      pinyins.push(pin);
    }
  }
  return pinyins.join(" ");
}

export function getPrototypeTranslation(prototype: string, lang: string): string {
  const translations: Record<string, { en: string; mn: string }> = {
    "游泳": { en: "swim", mn: "усанд сэлэх" },
    "打篮球": { en: "play basketball", mn: "сагсан бөмбөг тоглох" },
    "踢足球": { en: "play soccer", mn: "хөл бөмбөг тоглох" },
    "跑步": { en: "run / jog", mn: "гүйх" },
    "唱歌": { en: "sing", mn: "дуу дуулах" },
    "跳舞": { en: "dance", mn: "бүжиглэх" },
    "上网": { en: "surf the web / go online", mn: "интернет орох" },
    "洗澡": { en: "take a bath", mn: "усанд орох" },
    "说话": { en: "speak / talk", mn: "ярих" },
    "睡觉": { en: "sleep", mn: "унтах" },
    "做饭": { en: "cook / make food", mn: "хоол хийх" },
    "打电话": { en: "make a phone call", mn: "утасдах" },
    "弹钢琴": { en: "play the piano", mn: "төгөлдөр хуур тоглох" },
    "散步": { en: "take a walk", mn: "салхинд гарах / алхах" },
    "爬山": { en: "climb a mountain", mn: "ууланд авирах" },
    "照相": { en: "take a photo", mn: "зураг авах" },
    "堆雪人": { en: "build a snowman", mn: "цасан хүн хийх" },
    "刷牙": { en: "brush teeth", mn: "шүд угаах" },
    "考试": { en: "take an exam", mn: "шалгалт өгөх" },
    "聊天儿": { en: "chat", mn: "ярилцах / чатлах" },
    "打网球": { en: "play tennis", mn: "теннис тоглох" },
    "打排球": { en: "play volleyball", mn: "гар бөмбөг тоглох" },
    "打乒乓球": { en: "play table tennis", mn: "ширээний теннис тоглох" },
    "骑马": { en: "ride a horse", mn: "морь унах" },
    "排队": { en: "line up / queue", mn: "очирлох" },
    "骑自行车": { en: "ride a bicycle", mn: "унадаг дугуй унах" },
    "开会": { en: "attend a meeting", mn: "хуралдах" },
    "上班": { en: "go to work", mn: "ажилдаа явах" },
    "注意": { en: "pay attention / focus", mn: "анхаарах" },
    "搬家": { en: "move house", mn: "нүүх" },
    "打针": { en: "get an injection", mn: "тариа хийлгэх" },
    "流汗": { en: "sweat", mn: "хөлс гарах" },
    "迷路": { en: "get lost", mn: "төөрөх" },
    "见面": { en: "meet up / see each other", mn: "уулзах" },
    "开药": { en: "prescribe medicine", mn: "эм бичиж өгөх" },
    "补牙": { en: "fill a tooth", mn: "шүд ломбодох" },
    "旅游": { en: "travel", mn: "аялах" }
  };
  if (translations[prototype]) {
    if (lang === "cn") return prototype;
    return translations[prototype][lang as "en" | "mn"] || translations[prototype]["en"];
  }
  return prototype;
}

