// R2 2026 contestant roster
// Updated: 2026-07-02

export interface ClassParticipant {
  name: string;
  team: string;
  brand?: string;
  model?: string;
  number?: string;
}

export interface ClassParticipants {
  [classId: string]: ClassParticipant[];
}

export const classParticipants: ClassParticipants = {
  "ST150": [
    { name: "彭志豪", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R15", number: "10" },
    { name: "李曜全", team: "波奇", brand: "SUZUKI", model: "GSX-R150", number: "625" },
    { name: "葉圜燁", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R15", number: "429" },
    { name: "陳政勛", team: "RPM x GOD LIGHT racing team", brand: "SUZUKI", model: "GSX-R150", number: "376" },
    { name: "廖健宸", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "84" },
    { name: "楊馥輿", team: "UOS Racing Team", brand: "YAMAHA", model: "R15", number: "111" },
    { name: "吳義傑", team: "忠孝車業", brand: "YAMAHA", model: "R15", number: "39" },
    { name: "施宗德", team: "萬威焦點車隊", brand: "YAMAHA", model: "R15", number: "91" },
    { name: "邱聖傑", team: "萬威焦點車隊", brand: "YAMAHA", model: "R15", number: "13" },
    { name: "吳京育", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "93" },
    { name: "李為亨", team: "AS RACING TEAM", brand: "YAMAHA", model: "R15", number: "22" },
    { name: "朱峻霆", team: "榮全榮新車隊", brand: "YAMAHA", model: "R15", number: "9" },
    { name: "林尚亨", team: "艾拉桑-灝驥重車", brand: "SUZUKI", model: "GSX150", number: "41" },
    { name: "陳信尹", team: "艾拉桑-灝驥重車", brand: "SUZUKI", model: "GSX-R150", number: "67" },
    { name: "梁政勛", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R15", number: "56" },
    { name: "洪庭羽", team: "JH Moto Racing Team", brand: "YAMAHA", model: "R15", number: "66" },
    { name: "潘建宇", team: "泰陽SUN RACING", brand: "YAMAHA", model: "R15", number: "99" },
    { name: "胡偉誠", team: "泰陽SUN RACING", brand: "YAMAHA", model: "R15", number: "11" },
  ],
  "SP150": [
    { name: "潘柏愷", team: "武田重車", brand: "SUZUKI", model: "GSX-R150", number: "27" },
    { name: "伏圃儀", team: "武田重車", brand: "SUZUKI", model: "GSX150", number: "551" },
    { name: "汪蔚廷", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "99" },
    { name: "何承烜", team: "RPM x GOD LIGHT racing team", brand: "SUZUKI", model: "GSX150", number: "97" },
    { name: "張惟", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R15", number: "728" },
    { name: "蘇文楷", team: "J.L.H RACING TEAM", brand: "SUZUKI", model: "GSX150", number: "427" },
  ],
  "ST250": [
    { name: "陳乃源", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "14" },
    { name: "朱峻霆", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "9" },
    { name: "朱清和", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "8" },
    { name: "曾詠聖", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "27" },
    { name: "蕭詠議", team: "IGOL Racing Team", brand: "HONDA", model: "CBR250RR", number: "37" },
  ],
  "SP250": [
    { name: "朱清全", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "5" },
    { name: "徐權逸", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "333" },
    { name: "王勝韋", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "84" },
    { name: "陳品嘉", team: "榮全榮新車業", brand: "HONDA", model: "CBR250RR", number: "99" },
    { name: "程懷文", team: "IGOL Racing Team", brand: "HONDA", model: "CBR250RR", number: "56" },
  ],
  "ST300": [
    { name: "邱奕傑", team: "萬威焦點車隊", brand: "YAMAHA", model: "R3", number: "18" },
    { name: "沈聖鈞", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "4" },
    { name: "李柏毅", team: "R.M Moto", brand: "YAMAHA", model: "R3", number: "37" },
    { name: "陳建倫", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "92" },
    { name: "陳冠傑", team: "菇菇賽道日", brand: "YAMAHA", model: "R3", number: "1" },
    { name: "陳仕銘", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "28" },
    { name: "黃至孝", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "72" },
    { name: "張惟", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "728" },
    { name: "陳祺昌", team: "翹班車手NR Racing Team", brand: "YAMAHA", model: "R3", number: "77" },
    { name: "劉君眉", team: "武田重車", brand: "YAMAHA", model: "R3", number: "33" },
    { name: "侯明騏", team: "久勝重機 x 98RA", brand: "YAMAHA", model: "R3", number: "23" },
    { name: "王聖華", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "17" },
    { name: "陳禹昊", team: "榮全榮新車隊", brand: "YAMAHA", model: "R3", number: "321" },
    { name: "林廷儒", team: "忠孝車業", brand: "YAMAHA", model: "R3", number: "999" },
    { name: "潘柏光", team: "IGOL Racing Team", brand: "YAMAHA", model: "R3", number: "29" },
    { name: "張中瑋", team: "YX Racing Team", brand: "YAMAHA", model: "R3", number: "721" },
    { name: "胡閔瑞", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "15" },
    { name: "李信儀", team: "豪威青年賽車隊", brand: "YAMAHA", model: "R3", number: "22" },
    { name: "蕭詠議", team: "IGOL Racing Team", brand: "YAMAHA", model: "R3", number: "73" },
    { name: "劉耘青", team: "忠孝車業", brand: "KOVE", model: "350RR", number: "666" },
    { name: "呂昶陞", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "66" },
    { name: "顏昭義", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "7" },
    { name: "鐘蜂棋", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "78" },
    { name: "許容銓", team: "YX Racing Team", brand: "YAMAHA", model: "R3", number: "112" },
  ],
  "SP300": [
    { name: "柯羅比", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "51" },
    { name: "李俊輝", team: "萬威焦點車隊", brand: "YAMAHA", model: "R3", number: "82" },
    { name: "王俊評", team: "武田重車", brand: "YAMAHA", model: "R3", number: "28" },
    { name: "周亭宇", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "652" },
    { name: "王口一", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "44" },
    { name: "劉君眉", team: "武田重車", brand: "YAMAHA", model: "R3", number: "33" },
    { name: "林威克", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "226" },
    { name: "張志良", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "22" },
    { name: "劉柏宜", team: "艾銳重機", brand: "YAMAHA", model: "R3", number: "57" },
    { name: "洪驊成", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "53" },
    { name: "傅志豪", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "31" },
    { name: "游子峻", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "222" },
    { name: "游政浩", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R3", number: "26" },
    { name: "陳敬哲", team: "J-Power 永豐", brand: "YAMAHA", model: "R3", number: "2" },
    { name: "史青禾", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R3", number: "17" },
    { name: "李軒亦", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "75" },
    { name: "白晉佳", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "21" },
    { name: "鄭力升", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "12" },
  ],
  "ST400": [
    { name: "鄭勝元", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "411" },
    { name: "張益維", team: "萬威焦點車隊", brand: "KAWASAKI", model: "NINJA400", number: "41" },
    { name: "許逸辰", team: "R.M Moto", brand: "KAWASAKI", model: "NINJA400", number: "217" },
    { name: "李昕", team: "45Racing Team TW", brand: "KAWASAKI", model: "NINJA400", number: "29" },
    { name: "婁淳祐", team: "萬威焦點車隊", brand: "KAWASAKI", model: "NINJA400", number: "56" },
    { name: "姜志樺", team: "日德重車", brand: "KAWASAKI", model: "ZX-4RR", number: "13" },
    { name: "黃冠霖", team: "J.L.H RACING TEAM", brand: "KAWASAKI", model: "NINJA400", number: "310" },
    { name: "楊浚鈿", team: "日德重車", brand: "KAWASAKI", model: "NINJA400", number: "18" },
    { name: "呂承禧", team: "CUSP Racing Team", brand: "KAWASAKI", model: "NINJA400", number: "44" },
    { name: "趙哲緒", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "77" },
    { name: "唐李輔榮", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "121" },
  ],
  "SP400": [
    { name: "蘇仁玄", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "KAWASAKI", model: "NINJA400", number: "10" },
    { name: "黃晧", team: "久勝重機 x 98RA", brand: "KAWASAKI", model: "NINJA400", number: "98" },
    { name: "林冠丞", team: "久勝重機 x 98RA", brand: "KAWASAKI", model: "NINJA400", number: "53" },
    { name: "連俊福", team: "武田重車", brand: "KAWASAKI", model: "NINJA400", number: "34" },
    { name: "黃品紘", team: "YX Racing Team", brand: "KAWASAKI", model: "NINJA400", number: "31" },
    { name: "王紹佾", team: "45Racing Team TW", brand: "KAWASAKI", model: "NINJA400", number: "35" },
  ],
  "SP600": [
    { name: "葛奕辰", team: "萬威焦點車隊", brand: "YAMAHA", model: "R6", number: "11" },
    { name: "吳維晟", team: "No Name Racing Team", brand: "YAMAHA", model: "R6", number: "119" },
    { name: "楊承濂", team: "No Name Racing Team", brand: "YAMAHA", model: "R6", number: "87" },
    { name: "周仕豪", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R6", number: "77" },
    { name: "蘇洛宇", team: "武田重車", brand: "HONDA", model: "CBR600RR", number: "111" },
    { name: "呂昶陞", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R6", number: "66" },
    { name: "潘佳宏", team: "WillPOWER", brand: "SUZUKI", model: "GSX-R600", number: "34" },
    { name: "林昱甫", team: "WillPOWER", brand: "MV AGUSTA", model: "F3 RR", number: "89" },
    { name: "邱品翰", team: "JH Moto Racing Team", brand: "HONDA", model: "CBR600RR", number: "22" },
    { name: "陳禹翔", team: "J.L.H RACING TEAM", brand: "YAMAHA", model: "R6", number: "71" },
    { name: "黃威", team: "菇菇賽道日", brand: "YAMAHA", model: "R6", number: "89" },
  ],
  "SP1000": [
    { name: "郭和嘉", team: "WillPOWER", brand: "BMW", model: "S1000RR", number: "79" },
    { name: "黃文鑫", team: "武人重車", brand: "YAMAHA", model: "R1", number: "99" },
    { name: "陳俊豪", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "65" },
    { name: "張煜堂", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "20" },
    { name: "盧品達", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "25" },
    { name: "賴晟翔", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "68" },
    { name: "羅煜昶", team: "菇菇賽道日", brand: "YAMAHA", model: "R1", number: "8" },
    { name: "常晏榕", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "APRILIA", model: "RSV4 R", number: "33" },
    { name: "陳冠傑", team: "菇菇賽道日", brand: "BMW", model: "S1000RR", number: "1" },
    { name: "洪江坪", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "77" },
    { name: "徐心仁", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "9" },
    { name: "沈士弘", team: "萬威焦點車隊", brand: "YAMAHA", model: "R1", number: "78" },
    { name: "郭士煒", team: "No Name Racing Team", brand: "YAMAHA", model: "R1", number: "67" },
    { name: "李昌庭", team: "WillPOWER", brand: "APRILIA", model: "RSV4 STD", number: "97" },
    { name: "何韋澄", team: "No Name Racing Team", brand: "BMW", model: "S1000RR", number: "12" },
    { name: "李柏勳", team: "JH Moto Racing Team", brand: "HONDA", model: "CBR1000RR", number: "52" },
    { name: "陳維克托利亞", team: "忠孝車業", brand: "KAWASAKI", model: "ZX10R", number: "2" },
  ],
}

// R2 rider merged across classes (a rider may enter multiple classes)
export interface TeamRider {
  name: string;
  number?: string;
  brand?: string;
  model?: string;
  classes: string[];
}

// Helper: build the R2 team roster — team name → riders (merged by name,
// with the list of classes each rider entered)
export function getR2Teams(): Record<string, TeamRider[]> {
  const teams: Record<string, TeamRider[]> = {};
  for (const [classId, participants] of Object.entries(classParticipants)) {
    for (const p of participants) {
      if (!teams[p.team]) teams[p.team] = [];
      const existing = teams[p.team].find((r) => r.name === p.name);
      if (existing) {
        if (!existing.classes.includes(classId)) existing.classes.push(classId);
        if (!existing.number && p.number) existing.number = p.number;
        if (!existing.brand && p.brand) existing.brand = p.brand;
        if (!existing.model && p.model) existing.model = p.model;
      } else {
        teams[p.team].push({
          name: p.name,
          number: p.number,
          brand: p.brand,
          model: p.model,
          classes: [classId],
        });
      }
    }
  }
  return teams;
}

// Helper: group participants by team for a given class
export function getParticipantsByTeam(classId: string): Record<string, string[]> {
  const participants = classParticipants[classId] || [];
  const teams: Record<string, string[]> = {};
  for (const p of participants) {
    if (!teams[p.team]) {
      teams[p.team] = [];
    }
    teams[p.team].push(p.name);
  }
  return teams;
}
