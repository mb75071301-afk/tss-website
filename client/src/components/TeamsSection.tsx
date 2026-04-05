import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useOverrides } from "@/hooks/useOverrides";

interface Team {
  logo: string;
  riders: Array<{
    name: string;
    intro: string;
    photo: string;
    class: string;
    bike: string;
    model?: string;
  }>;
}

export default function TeamsSection() {
  const [rawTeams, setRawTeams] = useState<Record<string, Team>>({});
  const [loading, setLoading] = useState(true);
  const { getTeamLogo } = useOverrides();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch("/tss_data.json");
        const data = await response.json();
        if (data && data.teams) {
          setRawTeams(data.teams);
        }
      } catch (error) {
        console.error("Failed to load teams data:", error);
      }
      setLoading(false);
    };

    loadTeams();
  }, []);

  // Apply logo overrides
  const teams = Object.fromEntries(
    Object.entries(rawTeams).map(([name, team]) => [
      name,
      { ...team, logo: getTeamLogo(name, team.logo) },
    ])
  );

  const teamList = Object.entries(teams).sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB, "zh-TW")
  );

  return (
    <section id="teams" className="py-12 md:py-20 bg-black">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-red-500" />
            <span className="text-red-500 font-bold text-sm tracking-widest">
              TEAMS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            參賽車隊
          </h2>
          <p className="text-white/60 text-base max-w-2xl">
            共有 {teamList.length} 支註冊車隊參賽，{Object.values(teams).reduce((sum, team) => sum + team.riders.length, 0)} 位車手齊聚一堂，為榮耀而戰。
          </p>
        </motion.div>

        {/* Teams List - Compact with small round logos */}
        {loading ? (
          <div className="text-center text-white/60">載入中...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {teamList.map(([teamName, teamData], index) => (
              <motion.div
                key={teamName}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/teams/${encodeURIComponent(teamName)}`}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all border border-transparent hover:border-red-500/30"
                >
                  {/* Small Round Logo */}
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-red-500/50 transition-colors">
                    {teamData.logo ? (
                      <img
                        src={teamData.logo}
                        alt={teamName}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23333' width='100' height='100' rx='50'/%3E%3Ctext x='50' y='50' font-size='14' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ET%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <span className="text-white/30 text-xs font-bold">
                        {teamName.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Team Name & Rider Count */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                      {teamName}
                    </h3>
                    <p className="text-xs text-white/40">
                      {teamData.riders.length} 位車手
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={16}
                    className="text-white/20 group-hover:text-red-500 transition-colors flex-shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
