import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, Link } from "wouter";
import { useLayoutEffect } from "react";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { getR2Teams, type TeamRider } from "@/lib/participants";
import { loadTeamLogos } from "@/lib/teamLogos";
import TeamLogo from "@/components/TeamLogo";

export default function Teams() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const teamName = params?.team ? decodeURIComponent(params.team) : null;

  // Fix: scroll to top when entering team page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [teamName]);

  // SEO 優化 - 動態設定頁面標題和描述
  useEffect(() => {
    if (teamName) {
      document.title = `${teamName} - TSS 台灣超級摩托車聯賽`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${teamName} 是 TSS 台灣超級摩托車聯賽的參賽車隊，了解車隊成員、車手資訊和賽事成績。`);
      }
    } else {
      document.title = '車隊介紹 - TSS 台灣超級摩托車聯賽';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', '認識參加 2026 年 TSS 台灣超級摩托車聯賽第二站（R2）的所有車隊與車手，瀏覽完整的車隊名單和車手資訊。');
      }
    }
  }, [teamName]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // R2 參賽車隊與車手（來自 participants.ts）
  const allTeams: Record<string, TeamRider[]> = useMemo(() => getR2Teams(), []);

  // 車隊 Logo 沿用報名表單／R1 資料（以正規化隊名比對）
  const [teamLogos, setTeamLogos] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTeamLogos(Object.keys(allTeams)).then(setTeamLogos);
  }, [allTeams]);

  const teamList = Object.entries(allTeams).sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB, "zh-TW")
  );

  // 如果指定了車隊名稱，顯示該車隊的詳情（大 Logo）
  if (teamName && allTeams[teamName]) {
    const riders = allTeams[teamName];
    const logo = teamLogos[teamName];

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section with Big Logo */}
        <section className="relative py-20 border-b border-white/[0.06] z-10">
          <div className="container">
            {/* SEO H1 標題 */}
            <h1 className="sr-only">{teamName} - TSS 台灣超級摩托車聯賽車隊</h1>
            {/* Back Button */}
            <button
              onClick={() => setLocation('/teams')}
              className="mb-8 flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/[0.05] rounded transition-all border border-white/[0.1] hover:border-red-500/50"
            >
              <ArrowLeft size={18} />
              <span>返回</span>
            </button>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Big Logo - 點進來才顯示大 Logo，沒有 Logo 時顯示隊名首字 */}
              <TeamLogo
                name={teamName}
                logo={logo}
                className="w-48 h-48 md:w-56 md:h-56 rounded-xl bg-white/5"
                imgClassName="p-4"
                textClassName="text-7xl text-white/20"
              />

              <div className="flex-1 text-center md:text-left">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-widest text-white mb-4">
                  {teamName}
                </h1>
                <p className="text-lg text-white/70">
                  {riders.length} 位車手參賽（R2）
                </p>
              </div>
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

        {/* Riders Section - R2 基本資料（車號、姓名、車輛） */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riders.map((rider, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.05] border border-white/[0.1] rounded-lg overflow-hidden hover:border-red-500/50 transition-all"
                >
                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden relative">
                          {rider.photo && (
                            <img
                              src={rider.photo}
                              alt={rider.name}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          )}
                          <User size={18} className="text-white/40" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {rider.name}
                        </h3>
                      </div>
                      {rider.number && (
                        <div
                          className="font-mono text-3xl font-bold text-red-500/80 leading-none"
                          style={{ fontFamily: "'Orbitron', monospace" }}
                        >
                          {rider.number}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-white/50">
                      <div>
                        <span className="text-white/70">組別：</span>{" "}
                        {rider.classes.join("、")}
                      </div>
                      {rider.brand && (
                        <div>
                          <span className="text-white/70">品牌：</span>{" "}
                          {rider.brand}
                        </div>
                      )}
                      {rider.model && (
                        <div>
                          <span className="text-white/70">型號：</span>{" "}
                          {rider.model}
                        </div>
                      )}
                      {rider.number && (
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
        </section>

        <Footer />
      </div>
    );
  }

  // 車隊列表頁 - 小圓圖 + 名稱列表形式
  const filteredTeams = teamList.filter(([name, riders]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    riders.some((rider) =>
      rider.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 border-b border-white/[0.06]">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl tracking-widest text-white mb-4">
              車隊介紹
            </h1>
            <p className="text-lg text-white/70 mb-4">
              認識參加 2026 年 TSS 台灣超級摩托車聯賽第二站（R2）的所有車隊與車手
            </p>
            <Link
              href="/round1"
              className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              查看第一站（R1）選手回顧
              <ChevronRight size={16} />
            </Link>
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
          <div>
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
        </div>
      </section>

      {/* Teams List - Compact small round logo + name */}
      <section className="py-8">
        <div className="container">
          <div className="mb-6">
            <p className="text-white/60 font-heading tracking-wide">
              共 {filteredTeams.length} 個車隊
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredTeams.map(([name, riders], idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                viewport={{ once: true }}
              >
                <a
                  href={`/teams/${encodeURIComponent(name)}`}
                  className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/[0.06] transition-all border border-transparent hover:border-red-500/30"
                >
                  {/* Small Round Logo */}
                  <TeamLogo
                    name={name}
                    logo={teamLogos[name]}
                    className="w-12 h-12 group-hover:border-red-500/50 transition-colors"
                    imgClassName="p-1.5"
                    textClassName="text-sm"
                  />

                  {/* Team Name & Rider Count */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-red-400 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-white/40">
                      {riders.length} 位車手
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={18}
                    className="text-white/20 group-hover:text-red-500 transition-colors flex-shrink-0"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
