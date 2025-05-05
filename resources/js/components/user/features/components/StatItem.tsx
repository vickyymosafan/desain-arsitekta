import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export interface StatItemProps {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, count, label }) => {
    const [hovering, setHovering] = useState(false);
    const [countValue, setCountValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();
    
    // Parse the count to get a numerical value for animation
    const numericCount = typeof count === 'number' ? count : parseInt(count.toString().replace(/\D/g, ''));
    
    // Triggered when the element comes into view
    useEffect(() => {
        if (isInView) {
            controls.start('visible');
            
            // Animate the count value
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            const animateCount = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easeOutExpo for smoother animation near the end
                const easeOutExpo = 1 - Math.pow(2, -10 * progress);
                
                // Calculate current count value based on progress
                const current = Math.floor(easeOutExpo * numericCount);
                setCountValue(current);
                
                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    setCountValue(numericCount);
                }
            };
            
            requestAnimationFrame(animateCount);
        }
    }, [isInView, numericCount, controls]);
    
    // Format the displayed count
    const displayCount = () => {
        if (typeof count === 'string' && count.includes('+')) {
            return `${countValue}+`;
        }
        return countValue;
    };
    
    const variants = {
        hidden: { 
            opacity: 0,
            y: 30
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    
    return (
        <motion.div 
            ref={ref}
            className="flex flex-col items-center p-8 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden group"
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            variants={variants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            {/* Background effects */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                animate={{
                    opacity: hovering ? 0.2 : 0
                }}
            />
            
            <motion.div 
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                animate={{
                    scale: hovering ? 1.2 : 1,
                    opacity: hovering ? 0.5 : 0
                }}
                transition={{ duration: 0.8 }}
            />
            
            {/* Icon with animation */}
            <motion.div 
                className="text-emerald-400 text-4xl mb-6 bg-emerald-400/10 p-5 rounded-full relative z-10 group-hover:bg-emerald-400/20 transition-all duration-500"
                animate={{ 
                    y: hovering ? [0, -5, 0] : 0,
                    scale: hovering ? 1.05 : 1
                }}
                transition={{ 
                    duration: 1.5, 
                    repeat: hovering ? Infinity : 0,
                    repeatType: "loop" 
                }}
            >
                {icon}
                <motion.div 
                    className="absolute inset-0 rounded-full border border-emerald-400/0 z-0"
                    animate={{
                        scale: hovering ? [1, 1.4, 1] : 1,
                        opacity: hovering ? [1, 0, 1] : 1,
                        borderColor: hovering ? "rgba(52, 211, 153, 0.3)" : "rgba(52, 211, 153, 0)"
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: hovering ? Infinity : 0,
                        repeatType: "loop"
                    }}
                />
            </motion.div>
            
            {/* Count number with animation */}
            <motion.h3 
                className="text-white font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-3 relative z-10"
                animate={{ 
                    scale: hovering ? 1.03 : 1,
                    color: hovering ? "#10b981" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
            >
                {displayCount()}
            </motion.h3>
            
            {/* Label with animation */}
            <motion.p 
                className="text-neutral-300 font-nunito text-center text-lg relative z-10 bg-gradient-to-r from-neutral-300 to-neutral-300 bg-clip-text"
                animate={{ 
                    color: hovering ? "rgba(52, 211, 153, 0.9)" : "rgba(212, 212, 212, 0.9)",
                }}
                transition={{ duration: 0.3 }}
            >
                {label}
            </motion.p>
            
            {/* Bottom highlight line */}
            <motion.div 
                className="h-1 bg-emerald-500/50 rounded-full mt-4 w-0 absolute bottom-0"
                animate={{ 
                    width: hovering ? '60%' : '0%'
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default StatItem;
