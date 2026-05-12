"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface Props {
  color?: string;
  className?: string;
}

export const WorkInProgressIllustration = ({ color, className }: Props) => {
  return (
    <div className={cn(`w-64 h-64 ${color ?? "text-primary"}`, className)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Halo soft background */}
        <motion.circle
          cx="120"
          cy="120"
          r="100"
          fill="currentColor"
          opacity={0.08}
          animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 120px" }}
        />
        <circle cx="120" cy="120" r="78" fill="currentColor" opacity={0.12} />

        {/* Floating particles */}
        {[
          { cx: 40, cy: 60, r: 3, delay: 0 },
          { cx: 200, cy: 70, r: 4, delay: 0.5 },
          { cx: 50, cy: 180, r: 2.5, delay: 1 },
          { cx: 195, cy: 175, r: 3, delay: 1.5 },
          { cx: 30, cy: 120, r: 2, delay: 0.8 },
          { cx: 215, cy: 130, r: 2.5, delay: 0.3 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="currentColor"
            opacity={0.4}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* Gear large (rotation lente) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "95px 130px" }}
        >
          <path
            d="M95 95 L101 96 L104 90 L110 92 L110 99 L116 102 L114 108 L119 113 L114 118 L116 124 L110 126 L110 133 L104 135 L101 141 L95 140 L89 141 L86 135 L80 133 L80 126 L74 124 L76 118 L71 113 L76 108 L74 102 L80 99 L80 92 L86 90 L89 96 Z"
            fill="currentColor"
            transform="translate(0, 22)"
          />
          <circle cx="95" cy="130" r="10" fill="#fff" />
          <circle cx="95" cy="130" r="5" fill="currentColor" opacity={0.4} />
        </motion.g>

        {/* Gear small (rotation inverse) */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "155px 100px" }}
        >
          <path
            d="M155 80 L160 81 L162 76 L167 78 L167 84 L172 86 L170 91 L174 95 L170 99 L172 104 L167 106 L167 112 L162 114 L160 119 L155 117 L150 119 L148 114 L143 112 L143 106 L138 104 L140 99 L136 95 L140 91 L138 86 L143 84 L143 78 L148 76 L150 81 Z"
            fill="currentColor"
            opacity={0.85}
          />
          <circle cx="155" cy="100" r="7" fill="#fff" />
          <circle cx="155" cy="100" r="3.5" fill="currentColor" opacity={0.4} />
        </motion.g>

        {/* Sparkle stars */}
        {[
          { x: 160, y: 60, delay: 0 },
          { x: 70, y: 70, delay: 0.7 },
          { x: 175, y: 155, delay: 1.4 },
        ].map((s, i) => (
          <motion.g
            key={`star-${i}`}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <path
              d={`M${s.x} ${s.y - 6} L${s.x + 1.5} ${s.y - 1.5} L${s.x + 6} ${s.y} L${s.x + 1.5} ${s.y + 1.5} L${s.x} ${s.y + 6} L${s.x - 1.5} ${s.y + 1.5} L${s.x - 6} ${s.y} L${s.x - 1.5} ${s.y - 1.5} Z`}
              fill="currentColor"
            />
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
};

export default WorkInProgressIllustration;
