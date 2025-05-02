/**
 * Utility functions for layout and position calculations in the hero section
 */

/**
 * Calculate content position based on navbar spacing configuration
 */
export const getContentPosition = (navbarSpacing: boolean, navbarHeight: number): React.CSSProperties => {
    if (navbarSpacing) {
        return {
            height: `calc(100vh - ${navbarHeight}px)`,
            minHeight: `calc(100vh - ${navbarHeight}px)`
        };
    }
    return {
        height: '100vh',
        minHeight: '100vh'
    };
};

/**
 * Convert height configuration to precise CSS values
 */
export const getHeightStyle = (
    height?: string, 
    navbarSpacing?: boolean, 
    navbarHeight?: number
): React.CSSProperties => {
    if (!height) return {};
    
    if (height === 'screen') {
        return navbarSpacing 
            ? { 
                height: `calc(100vh - ${navbarHeight}px)`,
                minHeight: `calc(100vh - ${navbarHeight}px)` 
            }
            : { 
                height: '100vh',
                minHeight: '100vh' 
            };
    } else if (height === 'full') {
        return { 
            height: '100%',
            minHeight: '100vh' 
        };
    } else if (height === 'auto') {
        return { height: 'auto' };
    } else if (height.includes('px') || height.includes('%') || height.includes('vh')) {
        return { 
            height,
            minHeight: height.includes('vh') ? height : '100vh'
        };
    }
    return {};
};
