"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface IllustrationProps {
  title?: string;
  title2?: string;
  subtitle?: string;
  img?: StaticImageData;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

export default function Illustration({ title, title2, subtitle, img, children, width = 500, height = 500 }: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-primary h-screen w-full px-12">
      {img && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          className="relative">
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Image width={width} height={height} className="mx-auto relative z-10" src={img} alt="LoginForm image" />
        </motion.div>
      )}

      <motion.h1 className="text-5xl text-gray-300 font-black text-center pt-6 font-display" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
        {title}{" "}
        <motion.span className="text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          {title2}
        </motion.span>
      </motion.h1>

      {subtitle && (
        <motion.p className="text-xl text-slate-500 text-center font-display" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
          {subtitle}
        </motion.p>
      )}

      {children && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          {children}
        </motion.div>
      )}
    </div>
  );
}
