import { motion } from 'framer-motion';

type Props = { icon: React.ReactNode; title: string; description: string; index?: number };

export default function ServiceCard({ icon, title, description, index = 0 }: Props) {
    const d = index * 0.1; // Delay based on index
    
    return (
        <motion.div 
            className="bg-neutral-900 p-8 rounded-xl group border border-neutral-800 hover:border-emerald-500/50 h-full relative"            
            whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.15)" }}
        >
            {/* Background effect */}
            <motion.div 
                className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 blur-xl opacity-60"
                whileHover={{ scale: 1.1, x: -10 }}
            />
            
            {/* Icon */}
            <motion.div 
                className="relative z-10 text-emerald-500 text-4xl mb-5 bg-emerald-500/10 p-4 rounded-xl w-fit group-hover:text-emerald-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d }}
                whileHover={{ rotate: 5 }}
            >
                {icon}
            </motion.div>
            
            {/* Content */}
            <motion.h3 
                className="relative z-10 text-white font-playfair text-xl font-bold mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: d + 0.1 }}
            >
                {title}
                <motion.div 
                    className="h-1 bg-emerald-500/50 rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    whileHover={{ width: 36 }}
                />
            </motion.h3>
            
            <motion.p 
                className="relative z-10 text-neutral-300 font-nunito"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d + 0.2 }}
            >
                {description}
            </motion.p>
            
            {/* Link */}
            <div className="relative z-10 mt-4 text-emerald-400 font-nunito flex items-center cursor-pointer">
                <span>Pelajari selengkapnya</span>
                <motion.span className="ml-2" whileHover={{ x: 5 }}>→</motion.span>
            </div>
        </motion.div>
    );
}
