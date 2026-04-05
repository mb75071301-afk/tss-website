// TSS Website - Race Data

export const RACE_CLASSES = [
  { name: "Super Pole 1000(Time Attack Challenge)", nameShort: "SP1000", cc: "1000cc", description: "計時挑戰賽" },
  { name: "Super Pole 600(Time Attack Challenge)", nameShort: "SP600", cc: "600cc", description: "計時挑戰賽" },
  { name: "Super Stock 400", nameShort: "ST400", cc: "400cc", description: "400cc 原廠" },
  { name: "Super Sport 400", nameShort: "SP400", cc: "400cc", description: "400cc 改裝" },
  { name: "Super Stock 300", nameShort: "ST300", cc: "300cc", description: "300cc 原廠" },
  { name: "Super Sport 300", nameShort: "SP300", cc: "300cc", description: "300cc 改裝" },
  { name: "Super Stock 250", nameShort: "ST250", cc: "250cc", description: "250cc 原廠" },
  { name: "Super Sport 250", nameShort: "SP250", cc: "250cc", description: "250cc 改裝" },
  { name: "Super Stock 150", nameShort: "ST150", cc: "150cc", description: "150cc 原廠" },
  { name: "Super Sport 150", nameShort: "SP150", cc: "150cc", description: "150cc 改裝" },
];

export const RACE_CLASSES_INFO = {
  "Super Pole 1000(Time Attack Challenge)": "計時挑戰賽（1000cc），考驗車手的單圈速度和技術。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Pole 600(Time Attack Challenge)": "計時挑戰賽（600cc），考驗車手的單圈速度和技術。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Stock 150": "150cc 原廠級別，適合初階車手。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Sport 150": "150cc 改裝級別，允許合法改裝。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Stock 250": "250cc 原廠級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Sport 250": "250cc 改裝級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Stock 300": "300cc 原廠級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Sport 300": "300cc 改裝級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Stock 400": "400cc 原廠級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
  "Super Sport 400": "400cc 改裝級別。限註冊車隊報名，所有車手須取得中華賽車會車手執照。",
};

export const SPONSORS = {
  title: [{ name: "KYT", role: "Title Sponsor" }],
  main: [
    { name: "Pirelli" },
    { name: "Alpinestars" },
    { name: "SHOEI" },
  ],
  official: [
    { name: "wRap" },
    { name: "BOSCH" },
    { name: "UOS Oil" },
    { name: "GEARS" },
  ],
};

// 參賽名單數據已移至 participants.ts

export const NAV_ITEMS = [
  { label: "首頁", href: "#hero" },
  { label: "關於賽事", href: "#about" },
  { label: "賽事組別", href: "#classes" },
  { label: "場地最速", href: "#records" },
  { label: "年度冠軍", href: "#champions" },
  { label: "精彩瞬間", href: "#gallery" },
  { label: "賽道資訊", href: "#track" },
  { label: "車隊介紹", href: "/teams" },
  { label: "贊助夥伴", href: "#sponsors" },
  { label: "聯絡我們", href: "#contact" },
];

export const FEATURES = [
  {
    title: "Excellence",
    subtitle: "卓越",
    description: "為推動台灣摩托車安全駕駛教育結合賽車文化傳承，目標成為二輪爭先賽事級別的最高殿堂",
    icon: "trophy",
  },
  {
    title: "Professionalism",
    subtitle: "專業",
    description: "在大鵬灣國際賽車場（FIA Grade 2）舉辦此正規爭先型賽事，為 CTMSA 中華賽車會認證之賽事單位",
    icon: "shield",
  },
  {
    title: "Safety",
    subtitle: "安全",
    description: "賽道配置專業賽務團隊及救援車，並安排救護車、醫官待命，搭配事前每位參賽選手保險，打造更安全、安心的比賽",
    icon: "heart",
  },
];

export const TRACK_INFO = {
  name: "大鵬灣國際賽車場",
  fullName: "DaPeng Bay International Circuit (PIC)",
  location: "屏東縣東港鎮鵬灣大道二段1號",
  fullCircuitLength: "3.527 公里",
  mainCircuitLength: "3.022 公里",
  longestStraight: "約 535 米",
  directAccelerationLength: "700 米（含起點暨減速距離）",
  certification: "FIA Grade 2（國際二級賽車場）",
  owner: "大鵬灣國家風景區管理處 / 尚騰汽車集團",
  operator: "尚騰汽車集團",
  opened: "2011 年（2023 年 7 月 14 日重新開幕）",
  constructionCost: "新台幣 14.1 億",
  description: "台灣第一座國際賽車場，符合國際汽車聯盟（FIA）規範的國際二級賽車場。是中華民國（台灣）第一座，截至 2014 年為止亞洲第 5 個擁有二級賽車場的主辦區。賽道全長為 3,527 米，賽道中最長直線約 535 米，直線加速賽直線部分可用長度為 700 米（含起點暨減速距離）。",
  pastEvents: "TTCC 台灣房車錦標賽、NTCC 全國改裝房車挑戰賽、TSF 台灣大賽車、O.T.G.P. 全國菁英盃大獎賽",
  website: "https://www.facebook.com/DeltaMotorsportDrivingCentre/",
};

export const ORGANIZER = {
  name: "台灣超級摩托車聯賽",
  directors: ["吳宗銘", "張繼中"],
  venue: "大鵬灣國際賽車場",
  social: {
    facebook: "https://www.facebook.com/TaiwanSuperbikeSeries",
    instagram: "https://www.instagram.com/taiwan_superbike_series/",
  },
};
