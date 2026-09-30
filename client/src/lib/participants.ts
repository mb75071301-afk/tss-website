// R3 2026 contestant roster, imported 2026-09-30.
// Only public roster fields are included; R2 is frozen in /r2_data.json.
import round3Participants from "@/data/r3_participants.json";

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

export const classParticipants: ClassParticipants = round3Participants;
// R3 rider merged across classes (a rider may enter multiple classes)
export interface TeamRider {
  name: string;
  number?: string;
  brand?: string;
  model?: string;
  photo?: string;
  classes: string[];
  entries: (ClassParticipant & { classId: string })[];
}

// Helper: build the R3 team roster — team name → riders (merged by name,
// with the list of classes each rider entered)
export function getCurrentTeams(): Record<string, TeamRider[]> {
  const teams: Record<string, TeamRider[]> = {};
  for (const [classId, participants] of Object.entries(classParticipants)) {
    for (const p of participants) {
      if (!teams[p.team]) teams[p.team] = [];
      const existing = teams[p.team].find(r => r.name === p.name);
      if (existing) {
        existing.entries.push({ ...p, classId });
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
          entries: [{ ...p, classId }],
        });
      }
    }
  }
  return teams;
}

// Helper: group participants by team for a given class
export function getParticipantsByTeam(
  classId: string
): Record<string, string[]> {
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
