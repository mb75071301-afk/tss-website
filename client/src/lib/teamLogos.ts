// 車隊 Logo 載入與名稱對照
//
// Logo 來源有兩份：
// - /tss_data.json：prebuild 從報名表單重新產生，logo 可能是同源檔案
//   （/team-logos/…）或 drive.google.com 縮圖備援
// - /r1_data.json：R1 凍結快照，logo 為 CDN 圖檔，不受 prebuild 影響
//
// R2 名單（participants.ts）的隊名與表單填寫的隊名常有大小寫／空格差異，
// 因此以正規化後的名稱比對，並輔以人工別名表。

interface TeamsJson {
  teams?: Record<string, { logo?: string }>;
}

// R2 隊名 → 表單／R1 資料中的隊名（正規化仍對不上的才需要列在這裡）
const TEAM_NAME_ALIASES: Record<string, string> = {
  RSV霜暮賽車隊: "RSV 霜暮 Racing Team",
  "YX Racing Team": "YX Racing",
  豪威青年賽車隊: "豪威青訓賽車隊",
  榮全榮新車業: "榮全榮新車隊",
};

export function normalizeTeamName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "");
}

// drive.google.com 縮圖需要 Google 登入狀態，行動網路／擋廣告環境常載不出來，
// 同源檔案與 CDN 圖檔優先。
function logoScore(url: string): number {
  if (url.startsWith("/")) return 3;
  if (!url.includes("drive.google.com")) return 2;
  return 1;
}

async function fetchLogoMap(path: string): Promise<Record<string, string>> {
  try {
    const response = await fetch(path, { cache: "no-store" });
    const data: TeamsJson = await response.json();
    const map: Record<string, string> = {};
    Object.entries(data?.teams ?? {}).forEach(([name, team]) => {
      if (team.logo) map[normalizeTeamName(name)] = team.logo;
    });
    return map;
  } catch (error) {
    console.error(`Failed to load team logos from ${path}:`, error);
    return {};
  }
}

/**
 * 載入兩份資料的隊徽，回傳以指定隊名為 key 的 logo 對照表。
 * 查不到 logo 的隊伍不會出現在結果裡（由 UI 顯示隊名首字 fallback）。
 */
export async function loadTeamLogos(
  teamNames: string[]
): Promise<Record<string, string>> {
  const [current, r1] = await Promise.all([
    fetchLogoMap("/tss_data.json"),
    fetchLogoMap("/r1_data.json"),
  ]);

  const logos: Record<string, string> = {};
  for (const name of teamNames) {
    const keys = [name, TEAM_NAME_ALIASES[name]]
      .filter((n): n is string => Boolean(n))
      .map(normalizeTeamName);

    const candidates: string[] = [];
    for (const key of keys) {
      if (current[key]) candidates.push(current[key]);
      if (r1[key]) candidates.push(r1[key]);
    }
    if (candidates.length > 0) {
      logos[name] = candidates.sort((a, b) => logoScore(b) - logoScore(a))[0];
    }
  }
  return logos;
}
