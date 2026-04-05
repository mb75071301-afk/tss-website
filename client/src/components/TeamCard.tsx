import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Rider {
  name: string;
  bio?: string;
  photo?: string;
  class?: string;
  number?: string;
}

interface TeamCardProps {
  name: string;
  logo?: string;
  riders: Rider[];
}

export default function TeamCard({ name, logo, riders }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-red-500/40 transition-all duration-500">
      {/* Top red line on hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />

      {/* Team Header - Tree Root */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center gap-4 hover:bg-white/[0.03] transition-colors"
      >
        {/* Team Logo */}
        {logo && logo !== "nan" ? (
          <div className="flex-shrink-0 w-16 h-16 bg-white/[0.05] rounded border border-white/[0.1] flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-900/20 rounded border border-red-500/30 flex items-center justify-center">
            <span className="text-xs font-heading text-red-400 text-center px-2">
              {name.substring(0, 4)}
            </span>
          </div>
        )}

        {/* Team Info */}
        <div className="flex-1 text-left">
          <h3 className="font-heading text-lg tracking-widest text-white group-hover:text-red-400 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-white/60 mt-1">
            {riders.length} 位車手
          </p>
        </div>

        {/* Expand Icon */}
        <ChevronDown
          size={20}
          className={`text-white/60 group-hover:text-red-400 transition-all duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Riders List - Tree Structure */}
      {isExpanded && (
        <div className="border-t border-white/[0.06] bg-white/[0.01] p-6">
          <div className="space-y-0 relative">
            {/* Vertical line connecting all riders */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.1]" />

            {riders.map((rider, idx) => {
              const isLast = idx === riders.length - 1;
              
              return (
                <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Tree branch connector */}
                  <div className="absolute left-0 top-6 w-8 h-px bg-white/[0.1]" />
                  
                  {/* Tree branch corner */}
                  <div className={`absolute left-8 top-6 w-px h-6 ${isLast ? 'bg-white/[0.1]' : 'bg-white/[0.1]'}`} />

                  {/* Rider Photo */}
                  <div className="flex-shrink-0 relative z-10">
                    {rider.photo && rider.photo !== "nan" ? (
                      <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] overflow-hidden">
                        <img
                          src={rider.photo}
                          alt={rider.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-500/30 flex items-center justify-center">
                        <span className="text-xs font-heading text-red-400">
                          {rider.name.substring(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rider Info */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-heading text-base tracking-widest text-white">
                          {rider.name}
                        </h4>
                        {rider.class && rider.class !== "nan" && (
                          <p className="text-xs text-red-400 font-heading tracking-wide mt-1">
                            {rider.class}
                          </p>
                        )}
                      </div>
                      {rider.number && rider.number !== "nan" && (
                        <div className="flex-shrink-0 bg-red-600/20 border border-red-500/40 px-3 py-1 rounded">
                          <span className="font-heading text-sm text-red-400 tracking-widest">
                            #{rider.number}
                          </span>
                        </div>
                      )}
                    </div>

                    {rider.bio && rider.bio !== "nan" && (
                      <p className="text-sm text-white/70 line-clamp-3">
                        {rider.bio}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
