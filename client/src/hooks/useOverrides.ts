/**
 * useOverrides —— 靜態版本
 *
 * 原始 MANUS 版本會從後端 tRPC 取得車隊/選手的手動覆蓋資料。
 * 在靜態化之後,所有資料直接來自 client/src/data/tss_data.json,
 * 不再需要後端覆蓋機制。這個檔案改成 no-op stub,讓使用者檔案
 * (Teams.tsx、ClassDetail.tsx、TeamsSection.tsx) 不必修改即可繼續運作。
 *
 * 如果未來要重新啟用動態覆蓋(例如改接 Google Sheets),
 * 只需要在這裡替換內容即可,使用者檔案完全不用動。
 */

export interface TeamOverride {
  id: number;
  teamName: string;
  logoUrl: string | null;
  displayName: string | null;
  updatedAt: Date;
  updatedBy: string | null;
}

export interface RiderOverride {
  id: number;
  riderName: string;
  photoUrl: string | null;
  teamName: string | null;
  bike: string | null;
  model: string | null;
  number: string | null;
  updatedAt: Date;
  updatedBy: string | null;
}

const EMPTY_TEAM_MAP = new Map<string, TeamOverride>();
const EMPTY_RIDER_MAP = new Map<string, RiderOverride>();

export function useOverrides() {
  function getTeamLogo(_teamName: string, fallbackLogo: string): string {
    return fallbackLogo;
  }

  function getTeamDisplayName(teamName: string): string {
    return teamName;
  }

  function getRiderData(
    _riderName: string,
    fallback: {
      photo?: string;
      bike?: string;
      model?: string;
      number?: number | string;
    }
  ) {
    return {
      photo: fallback.photo || "",
      bike: fallback.bike || "",
      model: fallback.model || "",
      number: fallback.number ?? "",
    };
  }

  return {
    teamOverrides: [] as TeamOverride[],
    riderOverrides: [] as RiderOverride[],
    teamOverrideMap: EMPTY_TEAM_MAP,
    riderOverrideMap: EMPTY_RIDER_MAP,
    getTeamLogo,
    getTeamDisplayName,
    getRiderData,
    isLoading: false,
  };
}
