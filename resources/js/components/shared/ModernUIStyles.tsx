import { FC, useEffect } from 'react';

/**
 * Component that injects modern UI styles into the document head
 * Using regular CSS instead of styled-components for better compatibility
 */
const ModernUIStyles: FC = () => {
  useEffect(() => {
    // Create style element if it doesn't exist
    if (!document.getElementById('modern-ui-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'modern-ui-styles';
      
      // Define modern UI styles
      styleElement.textContent = `
        /* Glassmorphism effect for cards and panels */
        .glass-effect {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        /* Neomorphism effect */
        .neomorphic {
          background: #f0f0f3;
          box-shadow: 10px 10px 20px #d1d1d4, -10px -10px 20px #ffffff;
          border-radius: 16px;
        }
        
        /* Gradient borders */
        .gradient-border {
          position: relative;
          border-radius: 16px;
          background: #ffffff;
          padding: 4px;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        /* Neon glow effect */
        .neon-glow {
          box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.5);
          transition: box-shadow 0.3s ease;
        }
        
        .neon-glow:hover {
          box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.7);
        }
        
        /* Liquid animation for buttons */
        @keyframes liquid {
          0% {
            transform: translateX(-100%) translateY(0);
          }
          50% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(100%) translateY(0);
          }
        }
        
        .liquid-btn {
          position: relative;
          overflow: hidden;
        }
        
        .liquid-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0)
          );
          transform: translateX(-100%);
        }
        
        .liquid-btn:hover::before {
          animation: liquid 1.5s infinite;
        }
        
        /* 3D rotating card effect */
        .card-3d-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .card-3d {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        
        .card-3d:hover {
          transform: rotateY(10deg) rotateX(5deg);
        }
        
        /* Modern text gradient */
        .text-gradient {
          background: linear-gradient(90deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        /* Morphing background */
        @keyframes morphingBackground {
          0% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
        }
        
        .morphing-bg {
          animation: morphingBackground 15s infinite;
          background: linear-gradient(45deg, #10b981, #3b82f6);
        }
        
        /* Blob animation */
        @keyframes blob {
          0%, 100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate(0%, 0%) rotate(-5deg);
          }
          33% {
            border-radius: 72% 28% 65% 35% / 45% 35% 65% 55%;
            transform: translate(5%, 10%) rotate(5deg);
          }
          66% {
            border-radius: 38% 62% 63% 37% / 43% 44% 56% 57%;
            transform: translate(-5%, 5%) rotate(-3deg);
          }
        }
        
        .blob {
          animation: blob 12s infinite ease-in-out;
        }
        
        /* Modern frosted dividers */
        .divider-gradient {
          height: 3px;
          background: linear-gradient(to right, transparent, #10b981, transparent);
          border: none;
          margin: 2rem 0;
        }

        /* Triangle shape with clip-path */
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `;
      
      // Append to document head
      document.head.appendChild(styleElement);
    }
    
    // Cleanup function
    return () => {
      const styleElement = document.getElementById('modern-ui-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);
  
  // Return null as this component doesn't render anything visible
  return null;
};

export default ModernUIStyles;
