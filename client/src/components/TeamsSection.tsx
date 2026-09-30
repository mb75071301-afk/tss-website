import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getCurrentTeams } from "@/lib/participants";
import { loadTeamLogos } from "@/lib/teamLogos";
import TeamLogo from "@/components/TeamLogo";

export default function TeamsSection() {
  // R3 參賽車隊與車手（來自 participants.ts）
  const teams = useMemo(() => getCurrentTeams(), []);

  // 車隊 Logo 優先使用第三站報名表，舊資料作備援
  const [teamLogos, setTeamLogos] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTeamLogos(Object.keys(teams)).then(setTeamLogos);
  }, [teams]);

  const teamList = Object.entries(teams).sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB, "zh-TW")
  );

  const totalRiders = new Set(
    Object.values(teams)
      .flat()
      .map(rider => rider.name)
  ).size;

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
            R3 參賽車隊
          </h2>
          <p className="text-white/60 text-base max-w-2xl mb-3">
            第三站（R3）共有 {teamList.length} 支註冊車隊參賽，{totalRiders}{" "}
            位車手齊聚一堂，為榮耀而戰。
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/round2"
              className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              查看第二站（R2）選手回顧
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/round1"
              className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              查看第一站（R1）選手回顧
              <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Teams List - Compact with small round logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {teamList.map(([teamName, riders], index) => (
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
                <TeamLogo
                  name={teamName}
                  logo={teamLogos[teamName]}
                  className="w-10 h-10 group-hover:border-red-500/50 transition-colors"
                />

                {/* Team Name & Rider Count */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                    {teamName}
                  </h3>
                  <p className="text-xs text-white/40">
                    {riders.length} 位車手
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
      </div>
    </section>
  );
}
