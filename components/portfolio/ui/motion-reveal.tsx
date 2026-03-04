"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren, ReactElement } from "react";

type RevealVariant = "fade-in" | "fade-left" | "fade-right" | "fade-up" | "zoom-in";

type MotionRevealProps = PropsWithChildren<{
    className?: string;
    delay?: number;
    duration?: number;
    variant?: RevealVariant;
}>;

const variants: Record<
    RevealVariant,
    {
        hidden: { opacity: number; x?: number; y?: number; scale?: number };
        visible: { opacity: number; x?: number; y?: number; scale?: number };
    }
> = {
    "fade-in": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-up": {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    },
    "zoom-in": {
        hidden: { opacity: 0, scale: 0.6 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function MotionReveal({ children, className, delay = 0, duration = 0.8, variant = "fade-up" }: MotionRevealProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            variants={variants[variant]}
            transition={{ delay, duration, ease: [0.215, 0.61, 0.355, 1] }}
        >
            {children}
        </motion.div>
    );
}
