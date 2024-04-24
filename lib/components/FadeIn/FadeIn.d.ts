import { motion } from "framer-motion";
import React from "react";
export declare function FadeIn(props: React.ComponentPropsWithoutRef<typeof motion.div>): React.JSX.Element;
export declare function FadeInStagger({ faster, ...props }: React.ComponentPropsWithoutRef<typeof motion.div> & {
    faster?: boolean;
}): React.JSX.Element;
