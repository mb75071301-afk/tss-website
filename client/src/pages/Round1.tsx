import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamLogo from "@/components/TeamLogo";
import { motion } from "framer-motion";

interface Rider {
  name: string;
  intro: string;
  photo: string;
  class: string;
  bike: string;
  model?: string;
  number?: number;
}

interface Team {
  logo: string;
  riders: Rider[];
}

interface TeamsData {
  teams: Record<string, Team>;
}

/** 選手大頭照；沒有照片或載入失敗時顯示名字首字與車號。 */
function RiderPhoto({ rider }: { rider: Rider }) {
  const [failed, setFailed] = useState(false);

  if (!rider.photo || failed) {
    return (
      <div className="aspect-square bg-neutral-900 flex flex-col items-center justify-center gap-3">
        <span className="text-7xl font-bold text-white/15">
          {rider.name.charAt(0)}
        </span>
        {rider.number != null && (
          <span
            className="font-mono text-2xl font-bold text-red-500/60"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            #{rider.number}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="aspect-square bg-neutral-900 overflow-hidden flex items-center justify-center">
      <img
        src={rider.photo}
        alt={rider.name}
        loading="lazy"
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/**
 * R1 專區 —— 第一站（Round 1）選手介紹回顧
 * 保留 R1 的完整選手資料（自我介紹、大頭照）。
 * 資料來源為 r1_data.json —— R1 報名資料的凍結快照，
 * 不受 prebuild 的 sync-tss-data 腳本重新產生 tss_data.json 影響。
 */
export default function Round1() {
  const [, setLocation] = useLocation();
  const [teams, setTeams] = useState<Record<string, Team>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO
  useEffect(() => {
    document.title = "第一站選手回顧 (R1) - TSS 台灣超級摩托車聯賽";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "回顧 2026 年 TSS 台灣超級摩托車聯賽第一站（R1）的參賽車隊與車手介紹。"
      );
    }
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch("/r1_data.json", { cache: "no-store" });
        const data: TeamsData = await response.json();
        if (data && data.teams) {
          setTeams(data.teams);
        }
      } catch (error) {
        console.error("Failed to load R1 teams data:", error);
      }
      setLoading(false);
    };

    loadTeams();
  }, []);

  const teamList = Object.entries(teams).sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB, "zh-TW")
  );

  const filteredTeams = teamList.filter(
    ([name, team]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.riders.some((rider) =>
        rider.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalRiders = teamList.reduce(
    (sum, [, team]) => sum + team.riders.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 border-b border-white/[0.06]">
        <div className="container">
          <h1 className="sr-only">第一站選手回顧 (R1) - TSS 台灣超級摩托車聯賽</h1>
          {/* Back Button */}
          <button
            onClick={() => setLocation("/")}
            className="mb-8 flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/[0.05] rounded transition-all border border-white/[0.1] hover:border-red-500/50"
          >
            <ArrowLeft size={18} />
            <span>返回首頁</span>
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-red-500" />
              <span className="text-red-500 font-bold text-sm tracking-widest">
                ROUND 1 ARCHIVE
              </span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl tracking-widest text-white mb-4">
              第一站選手回顧
            </h2>
            <p className="text-lg text-white/70">
              2026 年 TSS 第一站（R1）共 {teamList.length} 支車隊、
              {totalRiders} 位車手參賽，在此回顧所有選手的介紹與風采。
            </p>
          </div>
        </div>

        {/* Diagonal cut bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{
            clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)",
            marginTop: "-2px",
          }}
        />
      </section>

      {/* Search Section */}
      <section className="py-8 border-b border-white/[0.06]">
        <div className="container">
          <label className="block text-sm font-heading tracking-widest text-white/80 mb-3">
            搜尋
          </label>
          <input
            type="text"
            placeholder="搜尋車隊或車手名稱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.08] transition-all"
          />
        </div>
      </section>

      {/* Teams & Riders */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-white/60">載入中...</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredTeams.map(([teamName, team]) => (
                <div key={teamName}>
                  {/* Team header */}
                  <div className="flex items-center gap-4 mb-8 border-l-2 border-red-500 pl-4">
                    <TeamLogo
                      name={teamName}
                      logo={team.logo}
                      className="w-14 h-14"
                      imgClassName="p-1.5"
                      textClassName="text-sm"
                    />
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {teamName}
                      </h3>
                      <p className="text-sm text-white/40">
                        {team.riders.length} 位車手
                      </p>
                    </div>
                  </div>

                  {/* Rider cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.riders.map((rider, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white/[0.05] border border-white/[0.1] rounded-lg overflow-hidden hover:border-red-500/50 transition-all"
                      >
                        <RiderPhoto rider={rider} />

                        <div className="p-6">
                          <h4 className="text-xl font-bold text-white mb-2">
                            {rider.name}
                          </h4>

                          {rider.intro && (
                            <p className="text-sm text-white/60 mb-4">
                              {rider.intro}
                            </p>
                          )}

                          <div className="space-y-2 text-sm text-white/50">
                            <div>
                              <span className="text-white/70">組別：</span>{" "}
                              {rider.class}
                            </div>
                            <div>
                              <span className="text-white/70">品牌：</span>{" "}
                              {rider.bike}
                            </div>
                            {rider.model && (
                              <div>
                                <span className="text-white/70">型號：</span>{" "}
                                {rider.model}
                              </div>
                            )}
                            {rider.number != null && (
                              <div>
                                <span className="text-white/70">車號：</span>{" "}
                                {rider.number}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredTeams.length === 0 && (
                <p className="text-center text-white/50 py-12">
                  找不到符合的車隊或車手
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
