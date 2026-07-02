import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TeamLogoProps {
  name: string;
  logo?: string;
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

/** 圓形車隊 Logo；沒有 Logo 或圖片載入失敗時顯示隊名首字。 */
export default function TeamLogo({
  name,
  logo,
  className,
  imgClassName,
  textClassName,
}: TeamLogoProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [logo]);

  return (
    <div
      className={cn(
        "flex-shrink-0 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10",
        className
      )}
    >
      {logo && !failed ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          className={cn("w-full h-full object-contain p-1", imgClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={cn("text-white/30 text-xs font-bold", textClassName)}>
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}
