// R2 2026 contestant roster
// Updated: 2026-07-02
// Photo URLs sourced from Google Forms registration spreadsheet

export interface ClassParticipant {
  name: string;
  team: string;
  brand?: string;
  model?: string;
  number?: string;
  photo?: string;
}

export interface ClassParticipants {
  [classId: string]: ClassParticipant[];
}

// Google Drive photo URLs: https://lh3.googleusercontent.com/d/{fileId}=s200
const gPhoto = (id: string) => `https://lh3.googleusercontent.com/d/${id}=s200`;

export const classParticipants: ClassParticipants = {
  "ST150": [
    { name: "彭志豪", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R15", number: "10", photo: gPhoto("1eefLWusq7Kd4H5VhsZQJ_Q2ldZi7K4xT") },
    { name: "李曜全", team: "波奇", brand: "SUZUKI", model: "GSX-R150", number: "625", photo: gPhoto("1mN_L9O7vxqeFsr0sStkYTQms30CXJdui") },
    { name: "葉圜燁", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R15", number: "429", photo: gPhoto("1NhNGO2cyrLfoutUI_eYI7LWmjaj6WYAw") },
    { name: "陳政勛", team: "RPM x GOD LIGHT racing team", brand: "SUZUKI", model: "GSX-R150", number: "376", photo: gPhoto("1tN-2y8w8OBB35bBMgpQPo8J6QfqbneXw") },    { name: "廖健宸", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "84", photo: gPhoto("1rBR73hk2SpDcSaRyLI_a6nCcmdRgAsd5") },
    { name: "楊馥輿", team: "UOS Racing Team", brand: "YAMAHA", model: "R15", number: "111", photo: gPhoto("1CPKstthy7qZpnzme7mAIvvkeJ9_gU73n") },
    { name: "吳義傑", team: "忠孝車業", brand: "YAMAHA", model: "R15", number: "39", photo: gPhoto("1nyQMY-OxNTvO0KS3pC0ShJCi-QSkIw6R") },
    { name: "施宗德", team: "萬威焦點車隊", brand: "YAMAHA", model: "R15", number: "91", photo: gPhoto("1_5qvbAG8EtI5ctzXmS6NARM5_GeLUAHs") },
    { name: "邱聖傑", team: "萬威焦點車隊", brand: "YAMAHA", model: "R15", number: "13", photo: gPhoto("1hv1EcGaXDhFauUdcJVGSJmBJl458D8_4") },
    { name: "吳京育", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "93", photo: gPhoto("15yvGZElhvDYJzQrFxt_zjXZiCQRscKYP") },
    { name: "李為亨", team: "AS RACING TEAM", brand: "YAMAHA", model: "R15", number: "22", photo: gPhoto("1091VR4BLE7LsaJPE_fvpFq-9K_ZWvZG4") },
    { name: "朱峻霆", team: "榮全榮新車隊", brand: "YAMAHA", model: "R15", number: "9", photo: gPhoto("1_LLyg1gsT3x2_Bfc_7aBFdsplwEX4Hb_") },
    { name: "林尚亨", team: "艾拉桑-灝驥重車", brand: "SUZUKI", model: "GSX150", number: "41", photo: gPhoto("1EVhc4g-_dv2WD8tG0U0uHciWMN2W0o10") },
    { name: "陳信尹", team: "艾拉桑-灝驥重車", brand: "SUZUKI", model: "GSX-R150", number: "67", photo: gPhoto("1GsZOyBwa9_4WN-CJJOc_z8gvuPrM0lTo") },
    { name: "梁政勛", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R15", number: "56", photo: gPhoto("1hpTkx87wOdRU9Vp7B0wYgE5E_RaN8tL0") },
    { name: "洪庭羽", team: "JH Moto Racing Team", brand: "YAMAHA", model: "R15", number: "66", photo: gPhoto("1kqxZgBh1n_esLyaU3oojDDvocjcfqHz9") },
    { name: "潘建宇", team: "泰陽SUN RACING", brand: "YAMAHA", model: "R15", number: "99", photo: gPhoto("1pxkPsbwbozhEMgJA230k_pbxnfIlZKYj") },
    { name: "胡偉誠", team: "泰陽SUN RACING", brand: "YAMAHA", model: "R15", number: "11", photo: gPhoto("1-EvqJJTX7dXLhNKGAY67Y9cbiVRcgxt4") },
  ],
  "SP150": [
    { name: "潘柏愷", team: "武田重車", brand: "SUZUKI", model: "GSX-R150", number: "27", photo: gPhoto("1oC8SPYmUdu_GkKab-ltieGyD9Kn0JWbC") },
    { name: "伏圃儀", team: "武田重車", brand: "SUZUKI", model: "GSX150", number: "551", photo: gPhoto("1nGF9XyiZ-EtRuSezP6hKleOqewXVjyEb") },
    { name: "汪蔚廷", team: "RPM x GOD LIGHT racing team", brand: "YAMAHA", model: "R15", number: "99", photo: gPhoto("1_92xUFedSSZGZwS4BWn9AQsx99ykY1sj") },
    { name: "何承烜", team: "RPM x GOD LIGHT racing team", brand: "SUZUKI", model: "GSX150", number: "97", photo: gPhoto("1s77FeyERV3mPcDeQzEvFGUPsAOzx36PP") },
    { name: "張惟", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R15", number: "728", photo: gPhoto("11HmbZCF8qhV5Q5FfualUM3GHk1p5CZ4i") },
    { name: "蘇文楷", team: "J.L.H RACING TEAM", brand: "SUZUKI", model: "GSX150", number: "427", photo: gPhoto("1Ato2imPQtAuRu82168y2hAmashrUGGLK") },
  ],
  "ST250": [
    { name: "陳乃源", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "14", photo: gPhoto("1y2uMnhoeO3vEgEMLVSK1FVuubM0u-LJs") },
    { name: "朱峻霆", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "9", photo: gPhoto("1_LLyg1gsT3x2_Bfc_7aBFdsplwEX4Hb_") },
    { name: "朱清和", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "8", photo: gPhoto("1dlhauKDXEh3AFWcy37xC8dgqMGD2BxeU") },
    { name: "曾詠聖", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "27", photo: gPhoto("1icduGGlfMBNo302E8zW1ehekb1O_fTGJ") },
    { name: "蕭詠議", team: "IGOL Racing Team", brand: "HONDA", model: "CBR250RR", number: "37", photo: gPhoto("16XKdsJt7M2k9FtCC3gk-uxsKeDU4nDgM") },
  ],
  "SP250": [
    { name: "朱清全", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "5", photo: gPhoto("1SRSIM8J5NYmkJjH0gDIv8JZbG5kr13qK") },
    { name: "徐權逸", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "333", photo: gPhoto("1pGjFUM11-rYtHlP2uvMqqLRlfg41CdP0") },
    { name: "王勝韋", team: "榮全榮新車隊", brand: "HONDA", model: "CBR250RR", number: "84", photo: gPhoto("1ys2Y_Jq853E93pBYR6Nfeqpx46DCsYNi") },
    { name: "陳品嘉", team: "榮全榮新車業", brand: "HONDA", model: "CBR250RR", number: "99", photo: gPhoto("1nnI32jWWG93JQkxd3l6MwwON8794-0Qz") },
    { name: "程懷文", team: "IGOL Racing Team", brand: "HONDA", model: "CBR250RR", number: "56", photo: gPhoto("15PBJUIjyP3DsUf6vZTzwLjQJDal0eVoV") },
  ],
  "ST300": [
    { name: "邱奕傑", team: "萬威焦點車隊", brand: "YAMAHA", model: "R3", number: "18", photo: gPhoto("1fT8fjnQ0m6sQEKt7YgdXkLCdfx2v5SUo") },
    { name: "沈聖鈞", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "4", photo: gPhoto("1sLA5ns0dfWyEQQhQ0RkQB06ReYsc6SRr") },
    { name: "李柏毅", team: "R.M Moto", brand: "YAMAHA", model: "R3", number: "37", photo: gPhoto("123iIFTpAHv-i80t26vFAVZYMZ31Hu6d3") },
    { name: "陳建倫", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "92", photo: gPhoto("1TFFJq-iaiAyn0DsbOwFz6hPLbjGtaCjn") },
    { name: "陳冠傑", team: "菇菇賽道日", brand: "YAMAHA", model: "R3", number: "1", photo: gPhoto("1hhMB7hcEna2S12wqlxPhTioX7GPNNsBd") },
    { name: "陳仕銘", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "28", photo: gPhoto("1iJH5qhW6wHm6ZRfSRJdA4Yxtj0tbuWEK") },
    { name: "黃至孝", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "72", photo: gPhoto("1U9VvJLMjpRXUcRgyLx8JMY-k1lppynXV") },
    { name: "張惟", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "728", photo: gPhoto("1HlR_ixJJibHQUFVHa1gysjAEa7zQf38Z") },
    { name: "陳祺昌", team: "翹班車手NR Racing Team", brand: "YAMAHA", model: "R3", number: "77", photo: gPhoto("1qgX4UOe20l5xbLOefpsTESmE8W75jvp2") },
    { name: "劉君眉", team: "武田重車", brand: "YAMAHA", model: "R3", number: "33", photo: gPhoto("1NMnH85H1yf5Q52HpRu7k4S8SsOYWpUTB") },
    { name: "侯明騏", team: "久勝重機 x 98RA", brand: "YAMAHA", model: "R3", number: "23", photo: gPhoto("1pGSxdNmYE5WhXJenjLJ3Z-IZKMxH0INP") },
    { name: "王聖華", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "17", photo: gPhoto("1yTqgc6EAd9H_S9faosGhtru_QC_-jWoL") },
    { name: "陳禹昊", team: "榮全榮新車隊", brand: "YAMAHA", model: "R3", number: "321", photo: gPhoto("19g0jqb6lzqBLG70GCzi-cqOo2lbOJrRj") },
    { name: "林廷儒", team: "忠孝車業", brand: "YAMAHA", model: "R3", number: "999", photo: gPhoto("1Z4CASeory51EHjXvYxR4fGudoIFVwEeq") },
    { name: "潘柏光", team: "IGOL Racing Team", brand: "YAMAHA", model: "R3", number: "29", photo: gPhoto("1Xqv7bvXQtDIBpSNdurG0LbrXOM48AlDP") },
    { name: "張中瑋", team: "YX Racing Team", brand: "YAMAHA", model: "R3", number: "721", photo: gPhoto("16GDE5aBH8lxOpvPgAt7hNkHDLWi7-x9z") },
    { name: "胡閔瑞", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "15", photo: gPhoto("1T7EoYhYTloDIUo7siAPx9SnqIRpUCwiR") },
    { name: "李信儀", team: "豪威青年賽車隊", brand: "YAMAHA", model: "R3", number: "22", photo: gPhoto("1QB019c_b01wxYWagSaeDfT23kh5_QVdz") },
    { name: "蕭詠議", team: "IGOL Racing Team", brand: "YAMAHA", model: "R3", number: "73", photo: gPhoto("1aX-TgXTYFud7TkrIjxupywtlVqyyqjVL") },
    { name: "劉耘青", team: "忠孝車業", brand: "KOVE", model: "350RR", number: "666", photo: gPhoto("1VLvssvReUrjjF2grhXlaptrqpPbXBsoM") },    { name: "呂昶陞", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "66", photo: gPhoto("1BCYjJyHOD8RG6BBLILSjJqeKzx1X1XCE") },
    { name: "顏昭義", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "7", photo: gPhoto("1askQCsKc1ms8go9AKEuW3vALydGJovXJ") },
    { name: "鐘蜂棋", team: "AS RACING TEAM", brand: "KTM", model: "RC390", number: "78", photo: gPhoto("1og7ozhY23rX6ZM73X_tZHQaBw2jwm3l2") },
    { name: "許容銓", team: "YX Racing Team", brand: "YAMAHA", model: "R3", number: "112", photo: gPhoto("18bh2YAud9j17YXhrfu5sI5GmB2O1Hi4U") },
  ],
  "SP300": [
    { name: "柯羅比", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "51", photo: gPhoto("14DnkbGmLcJp6rJ8GBpHRcgsvEuo5qKX5") },
    { name: "李俊輝", team: "萬威焦點車隊", brand: "YAMAHA", model: "R3", number: "82", photo: gPhoto("1m8sciZoL_30i4zASjF4-KJK06rQAT2cu") },
    { name: "王俊評", team: "武田重車", brand: "YAMAHA", model: "R3", number: "28", photo: gPhoto("1S4KWn-xB2AJBv21Cv7V9GqciiVsD18b2") },
    { name: "周亭宇", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "652", photo: gPhoto("1dhIlDlQ7c1uCdAey9wVEaXACkGLYg-Jp") },
    { name: "王口一", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "44", photo: gPhoto("1zFH8H121R0PL3EpCDvqmBDE2bjBSw1NP") },
    { name: "劉君眉", team: "武田重車", brand: "YAMAHA", model: "R3", number: "33", photo: gPhoto("1gzlibAfWnO_0BKHRXc568hjrvol-exEb") },
    { name: "林威克", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "226", photo: gPhoto("1r06noeV38Uae6U1spvIHqgdoKqV-Bfan") },
    { name: "張志良", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "22", photo: gPhoto("1rYUT-nDHBkrlRPrbzsV6Av6r-2NWeBgb") },
    { name: "劉柏宜", team: "艾銳重機", brand: "YAMAHA", model: "R3", number: "57", photo: gPhoto("1Mprc6GrG5uMVD91IlJN4hIsi_ZMM_lTP") },
    { name: "洪驊成", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "53", photo: gPhoto("1jXBlM4VjqmAeqOr7IHAXwkYhoDLrFOw1") },
    { name: "傅志豪", team: "45Racing Team TW", brand: "YAMAHA", model: "R3", number: "31", photo: gPhoto("11IdsSNIPb765IqQv_ZV61wso6zQQ2ia-") },
    { name: "游子峻", team: "RSV霜暮賽車隊", brand: "YAMAHA", model: "R3", number: "222", photo: gPhoto("1Oy7j3HEH_goXhJ_RQhJp6DloHFZ_wCxx") },
    { name: "游政浩", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R3", number: "26", photo: gPhoto("1nelYtbExLPxZiyDjbQzC1oWj4Qx7MVwl") },
    { name: "陳敬哲", team: "J-Power 永豐", brand: "YAMAHA", model: "R3", number: "2", photo: gPhoto("1VhGtf5DYMiIrM6SVQt6iKXszvq_b2Ry8") },
    { name: "史青禾", team: "小鷹精前三名是大鷹精", brand: "YAMAHA", model: "R3", number: "17", photo: gPhoto("15dL7-lKT9XlAAhqJaudImF1_CHwj3iwC") },
    { name: "李軒亦", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "75", photo: gPhoto("1FvsgvPXEUvI0tO1ybeivaDUPNsHTxYq4") },
    { name: "白晉佳", team: "SRP音速車隊", brand: "YAMAHA", model: "R3", number: "21", photo: gPhoto("15DOLyv1iTrfd1irKMzmZRLHfszeyWiH_") },
    { name: "鄭力升", team: "極樂HRT with Kushitani TW", brand: "YAMAHA", model: "R3", number: "12", photo: gPhoto("1zwo33C86zGJwLAFHhdB6SDul2k_6Nx-B") },
  ],
  "ST400": [
    { name: "鄭勝元", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "411", photo: gPhoto("1xTkeg8m5kLizQ9a4dmMfNC1YjjkZa_AA") },
    { name: "張益維", team: "萬威焦點車隊", brand: "KAWASAKI", model: "NINJA400", number: "41", photo: gPhoto("1AsYY4hq3kxdjlnPnkBcz6EiOvDfEkB3Q") },    { name: "許逸辰", team: "R.M Moto", brand: "KAWASAKI", model: "NINJA400", number: "217", photo: gPhoto("1RR5xxgjihaKHTICN-lAiPQ_ulty4Ocmc") },
    { name: "李昕", team: "45Racing Team TW", brand: "KAWASAKI", model: "NINJA400", number: "29", photo: gPhoto("1KvjgJG2XzZLzbuD7DAyhDL4Td-BRVapo") },
    { name: "婁淳祐", team: "萬威焦點車隊", brand: "KAWASAKI", model: "NINJA400", number: "56", photo: gPhoto("1A4XJe1s56UfauD7oJ5ldzWrVfRQcR4vN") },
    { name: "姜志樺", team: "日德重車", brand: "KAWASAKI", model: "ZX-4RR", number: "13", photo: gPhoto("16ESnop0IF2GvAV28sajf0gSOjlY9UB0i") },
    { name: "黃冠霖", team: "J.L.H RACING TEAM", brand: "KAWASAKI", model: "NINJA400", number: "310", photo: gPhoto("1xj-beDpVnkSAiyWaO_dYzOYfEvZyNAUr") },
    { name: "楊浚鈿", team: "日德重車", brand: "KAWASAKI", model: "NINJA400", number: "18", photo: gPhoto("1xJ2a_RRz_TykDOoFfVk9qdNQ5aml5nwN") },
    { name: "呂承禧", team: "CUSP Racing Team", brand: "KAWASAKI", model: "NINJA400", number: "44", photo: gPhoto("1Mpbhz8ksgwo1y5yUtMTCnAw_m2JTk_ZV") },
    { name: "趙哲緒", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "77", photo: gPhoto("1tKnL1Gvhp7TWAIiIX23Kqwj4v_VNaI6W") },
    { name: "唐李輔榮", team: "忠孝車業", brand: "KAWASAKI", model: "NINJA400", number: "121", photo: gPhoto("18drLZ54uzqlpe5hHpLonwdOLiJXqtEbs") },
  ],
  "SP400": [
    { name: "蘇仁玄", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "KAWASAKI", model: "NINJA400", number: "10", photo: gPhoto("1RteeSyzF05pIbKw2zNDeP7CpvE2eFS8D") },
    { name: "黃晧", team: "久勝重機 x 98RA", brand: "KAWASAKI", model: "NINJA400", number: "98", photo: gPhoto("1uYZDWPAUhYsdNfL0X9AGxwfINTcN9FTN") },
    { name: "林冠丞", team: "久勝重機 x 98RA", brand: "KAWASAKI", model: "NINJA400", number: "53", photo: gPhoto("11e9_VtYZWyETCNtkQ3GV7ognFJmakpRZ") },
    { name: "連俊福", team: "武田重車", brand: "KAWASAKI", model: "NINJA400", number: "34", photo: gPhoto("1sveR1L3pgBeAJ71ocJp9nZ9QXE9w_NtC") },
    { name: "黃品紘", team: "YX Racing Team", brand: "KAWASAKI", model: "NINJA400", number: "31", photo: gPhoto("1VRKPXppqTw8v3Xe7gs2Z0esNxpWuUF5I") },
    { name: "王紹佾", team: "45Racing Team TW", brand: "KAWASAKI", model: "NINJA400", number: "35", photo: gPhoto("1RwdsVTrIeqlQsD3zY9MFjUt1VmNIn-iN") },
  ],
  "SP600": [
    { name: "葛奕辰", team: "萬威焦點車隊", brand: "YAMAHA", model: "R6", number: "11", photo: gPhoto("1zfqqagxDTGNeoL_mexfabXPbREroo7Eg") },
    { name: "吳維晟", team: "No Name Racing Team", brand: "YAMAHA", model: "R6", number: "119", photo: gPhoto("16XXBkNN5FbRCcubeHoxaHG-391RZf07g") },
    { name: "楊承濂", team: "No Name Racing Team", brand: "YAMAHA", model: "R6", number: "87", photo: gPhoto("1vOyJL2-pnY64OP-CkdWTXgnaebSzYdd7") },
    { name: "周仕豪", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R6", number: "77", photo: gPhoto("1YYrevc2YS_X9J4ltD25Lk-v-yRQAFebt") },
    { name: "蘇洛宇", team: "武田重車", brand: "HONDA", model: "CBR600RR", number: "111", photo: gPhoto("1lb4ZPATACExsrjaYJOa7nlMd8HyzmAWI") },
    { name: "呂昶陞", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R6", number: "66", photo: gPhoto("1BCYjJyHOD8RG6BBLILSjJqeKzx1X1XCE") },
    { name: "潘佳宏", team: "WillPOWER", brand: "SUZUKI", model: "GSX-R600", number: "34", photo: gPhoto("1oUVC9WdV2h3e5g12gPn8Iff9YBP8-l7V") },
    { name: "林昱甫", team: "WillPOWER", brand: "MV AGUSTA", model: "F3 RR", number: "89", photo: gPhoto("1dHt0NCehXULconMpkQJMj7dnHj2RBTHW") },
    { name: "邱品翰", team: "JH Moto Racing Team", brand: "HONDA", model: "CBR600RR", number: "22", photo: gPhoto("1Od6QwNbkeyzj1Q2k5ktGsXN1T73rZzyO") },
    { name: "陳禹翔", team: "J.L.H RACING TEAM", brand: "YAMAHA", model: "R6", number: "71", photo: gPhoto("1iejOYVG-6jGXquexoLNm_SQpudcaGAHY") },
    { name: "黃威", team: "菇菇賽道日", brand: "YAMAHA", model: "R6", number: "89", photo: gPhoto("19QdVJZzB38XttyJEe9h0uHYeAn4MZIdJ") },
  ],
  "SP1000": [
    { name: "郭和嘉", team: "WillPOWER", brand: "BMW", model: "S1000RR", number: "79", photo: gPhoto("12BIsuhn4Du15FIeu1bj6QnprrGN3f2rW") },
    { name: "黃文鑫", team: "武人重車", brand: "YAMAHA", model: "R1", number: "99", photo: gPhoto("1-VOIUCPXPiGcoDbVJtRlK5WHE5HRvro3") },
    { name: "陳俊豪", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "65", photo: gPhoto("1aJuBLTjYxJKveEouRhPuPie9D_cwvV5Q") },
    { name: "張煜堂", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "20", photo: gPhoto("1jAlwgcdm-lYiMdq-oub_LTKPw5mg6IoM") },
    { name: "盧品達", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "25", photo: gPhoto("1rww_kUjlFzQaw4SeJODcgztOI2O84oZK") },
    { name: "賴晟翔", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "68", photo: gPhoto("1J-DuZA9hHQxxMrifEJdWNTcNMEzgcQo-") },
    { name: "羅煜昶", team: "菇菇賽道日", brand: "YAMAHA", model: "R1", number: "8", photo: gPhoto("1I42VoPveueCX81fv2ZFqOneOdTo3IzVu") },
    { name: "常晏榕", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "APRILIA", model: "RSV4 R", number: "33", photo: gPhoto("1_ERJ6S__hWZGYpklepIPM05yMJpM74KR") },
    { name: "陳冠傑", team: "菇菇賽道日", brand: "BMW", model: "S1000RR", number: "1", photo: gPhoto("1joDRdvQ8lePmzpzzgVVJnswTjmttymCR") },
    { name: "洪江坪", team: "日德重車", brand: "KAWASAKI", model: "ZX10R", number: "77", photo: gPhoto("1B7wPDUcPsayA_VFa_Uu7LC7PTRHKLBOy") },
    { name: "徐心仁", team: "Peter-Bike 馹達豐 RDF Performance Works", brand: "YAMAHA", model: "R1", number: "9", photo: gPhoto("1yo_aCA6ffVU_CJaXq3svULaV4zSJXqLK") },
    { name: "沈士弘", team: "萬威焦點車隊", brand: "YAMAHA", model: "R1", number: "78", photo: gPhoto("1TtXi8WxTsfXgV-a8bsDsPlL2WAtwwJRr") },
    { name: "郭士煒", team: "No Name Racing Team", brand: "YAMAHA", model: "R1", number: "67", photo: gPhoto("14UofZMCF4hgLypI6MdN9COAQIS01SltY") },
    { name: "李昌庭", team: "WillPOWER", brand: "APRILIA", model: "RSV4 STD", number: "97", photo: gPhoto("1_qWGtOPoruQI4bQq1HKNlYV5g6dmREhq") },
    { name: "何韋澄", team: "No Name Racing Team", brand: "BMW", model: "S1000RR", number: "12", photo: gPhoto("1PmJn24GG67lqWX_8h46Q-qZGIoUPsq0h") },
    { name: "李柏勳", team: "JH Moto Racing Team", brand: "HONDA", model: "CBR1000RR", number: "52", photo: gPhoto("1aqWFMFl-d5dJnJIYSEnznVneA76WPWLU") },
    { name: "陳維克托利亞", team: "忠孝車業", brand: "KAWASAKI", model: "ZX10R", number: "2", photo: gPhoto("16qmJq8DkHsQ1C1SFf2LwE8YY5zXfSdbl") },
  ],
};
// R2 rider merged across classes (a rider may enter multiple classes)
export interface TeamRider {
  name: string;
  number?: string;
  brand?: string;
  model?: string;
  photo?: string;
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
        if (!existing.photo && p.photo) existing.photo = p.photo;
      } else {
        teams[p.team].push({
          name: p.name,
          number: p.number,
          brand: p.brand,
          model: p.model,
          photo: p.photo,
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
