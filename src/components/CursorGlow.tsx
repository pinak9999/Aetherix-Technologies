import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-30 blur-[100px] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(112,0,255,0.05) 50%, transparent 100%)',
        width: 500,
        height: 500,
        x: springX,
        y: springY,
      }}
    />
  );
}
