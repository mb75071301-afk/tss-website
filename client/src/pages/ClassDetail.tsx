/*
 * Design: Motorsport Editorial — Class detail page with specs and info
 * Multi-language support
 */
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, User } from "lucide-react";
import { RACE_CLASSES, RACE_CLASSES_INFO } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOverrides } from "@/hooks/useOverrides";

interface RiderData {
  name: string;
  photo: string;
  class: string;
  bike: string;
  model?: string;
  number?: number;
}

interface TeamData {
  logo: string;
  riders: RiderData[];
}

interface TeamsData {
  teams: Record<string, TeamData>;
}

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const [rawRiderPhotos, setRawRiderPhotos] = useState<Record<string, string>>({});
  const [teamsData, setTeamsData] = useState<Record<string, TeamData>>({});
  const [brokenPhotos, setBrokenPhotos] = useState<Record<string, boolean>>({});
  const { riderOverrideMap } = useOverrides();

  // Fix: scroll to top when entering class detail page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [classId]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch("/tss_data.json", { cache: "no-store" });
        const data: TeamsData = await response.json();
        if (data && data.teams) {
          setTeamsData(data.teams);
          const photoMap: Record<string, string> = {};
          Object.values(data.teams).forEach((team) => {
            team.riders.forEach((rider) => {
              if (rider.photo) {
                photoMap[rider.name] = rider.photo;
              }
            });
          });
          setRawRiderPhotos(photoMap);
        }
      } catch (error) {
        console.error("Failed to load rider photos:", error);
      }
    };
    loadPhotos();
  }, []);

  // Apply photo overrides from database
  const riderPhotos = Object.fromEntries(
    Object.entries(rawRiderPhotos).map(([name, photo]) => [
      name,
      riderOverrideMap.get(name)?.photoUrl || photo,
    ])
  );

  // Find the class by nameShort
  const classData = RACE_CLASSES.find((c) => c.nameShort === classId);

  if (!classData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('common.notFound') || 'Not Found'}</h1>
          <button
            onClick={() => setLocation("/")}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            {t('common.backHome') || 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const classInfo = RACE_CLASSES_INFO[classData.name as keyof typeof RACE_CLASSES_INFO];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            setLocation("/");
            setTimeout(() => {
              const el = document.getElementById("classes");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          <span>{language === 'zh' ? '返回組別列表' : 'Back to Classes'}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between gap-8 mb-6">
            <div>
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-white mb-2">
                {classData.name}
              </h1>
              <p className="text-red-500 text-lg font-heading tracking-widest">
                {classData.nameShort}
              </p>
            </div>
            <div className="text-right">
              <div className="font-mono text-6xl font-bold text-white/10" style={{ fontFamily: "'Orbitron', monospace" }}>
                {classData.cc.replace(/[^0-9]/g, "")}
              </div>
              <p className="text-white/40 text-sm mt-2">{classData.cc}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-500/0" />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Description */}
            <div className="mb-12 p-8 bg-white/[0.02] border border-white/[0.06]">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {language === 'zh' ? '組別介紹' : 'Class Overview'}
              </h2>
              <p className="text-white/70 leading-relaxed text-base">
                {classInfo}
              </p>
            </div>

            {/* Participants List */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06] mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-6">
                {language === 'zh' ? '參賽名單' : 'Participants'}
              </h2>
              
              {/* Get riders for this class — derived live from tss_data.json
                  so any new form submission shows up automatically. */}
              {(() => {
                const teamMap: Record<string, string[]> = {};
                Object.entries(teamsData).forEach(([teamName, team]) => {
                  team.riders.forEach((rider) => {
                    if (rider.class === classData.name) {
                      if (!teamMap[teamName]) teamMap[teamName] = [];
                      if (!teamMap[teamName].includes(rider.name)) {
                        teamMap[teamName].push(rider.name);
                      }
                    }
                  });
                });
                const teamEntries = Object.entries(teamMap);
                
                if (teamEntries.length === 0) {
                  return (
                    <p className="text-white/50 text-center py-8">
                      {language === 'zh' ? '暫無參賽者' : 'No participants yet'}
                    </p>
                  );
                }
                
                const totalRiders = teamEntries.reduce((sum, [, riders]) => sum + riders.length, 0);
                
                return (
                  <div>
                    <p className="text-white/50 text-sm mb-6">
                      {language === 'zh' 
                        ? `共 ${totalRiders} 位車手 / ${teamEntries.length} 個車隊` 
                        : `${totalRiders} riders / ${teamEntries.length} teams`}
                    </p>
                    <div className="space-y-6">
                      {teamEntries.map(([team, riders]) => (
                        <div key={team} className="border-l-2 border-red-500 pl-4">
                          <Link href={`/teams/${encodeURIComponent(team)}`}>
                            <h3 className="font-heading text-lg font-bold text-white mb-3 hover:text-red-400 transition-colors cursor-pointer">
                              {team}
                            </h3>
                          </Link>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {riders.map((name, idx) => {
                              const photo = riderPhotos[name];
                              const showPhoto = photo && !brokenPhotos[name];
                              return (
                                <div key={idx} className="flex items-center gap-2 text-white/70 text-sm py-1">
                                  {showPhoto ? (
                                    <img
                                      src={photo}
                                      alt={name}
                                      loading="lazy"
                                      referrerPolicy="no-referrer"
                                      className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-white/20"
                                      onError={() =>
                                        setBrokenPhotos((prev) => ({ ...prev, [name]: true }))
                                      }
                                    />
                                  ) : (
                                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                      <User size={14} className="text-white/40" />
                                    </div>
                                  )}
                                  <span>{name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Requirements */}
            <div className="p-8 bg-white/[0.02] border border-white/[0.06]">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {language === 'zh' ? '參賽要求' : 'Requirements'}
              </h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex gap-3">
                  <span className="text-red-500 flex-shrink-0 mt-1">•</span>
                  <span>
                    {language === 'zh' 
                      ? '限註冊車隊報名（非中華賽車會註冊車隊不得報名參賽）' 
                      : 'Registration limited to registered teams only'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 flex-shrink-0 mt-1">•</span>
                  <span>
                    {language === 'zh' 
                      ? '所有參賽車隊必須先完成當年度同盟機構之註冊' 
                      : 'All teams must complete annual registration'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 flex-shrink-0 mt-1">•</span>
                  <span>
                    {language === 'zh' 
                      ? '每一參賽車隊之車手必需取得中華賽車會當年度之車手執照' 
                      : 'All riders must obtain CTMSA racing license'}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Sidebar - Quick info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Class type card */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 transition-colors">
              <span className="text-white/40 text-xs tracking-widest block mb-2">
                {language === 'zh' ? '排量' : 'DISPLACEMENT'}
              </span>
              <span className="font-heading text-3xl font-bold text-white">
                {classData.cc}
              </span>
            </div>

            {/* Class category */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 transition-colors">
              <span className="text-white/40 text-xs tracking-widest block mb-2">
                {language === 'zh' ? '類別' : 'CATEGORY'}
              </span>
              <span className="font-heading text-lg font-bold text-white">
                {classData.name.includes('Stock') 
                  ? (language === 'zh' ? '原廠級' : 'Stock')
                  : (language === 'zh' ? '改裝級' : 'Modified')}
              </span>
            </div>

            {/* Short name */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-red-500/20 transition-colors">
              <span className="text-white/40 text-xs tracking-widest block mb-2">
                {language === 'zh' ? '代號' : 'CODE'}
              </span>
              <span className="font-mono text-2xl font-bold text-red-500">
                {classData.nameShort}
              </span>
            </div>


          </motion.div>
        </div>
      </div>
    </div>
  );
}
