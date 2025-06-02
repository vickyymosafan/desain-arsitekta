/**
 * Index file for Portfolio Section
 * 
 * Centralized export point for all portfolio-related components
 */

// Main component export
import PortfolioSection from './PortfolioSection';
export default PortfolioSection;

// Direct imports to fix TypeScript module resolution
import PortfolioFilter from './PortfolioFilter';
import PortfolioItem from './PortfolioItem';
import PortfolioModal from './PortfolioModal';

// Re-export components
export { PortfolioFilter, PortfolioItem, PortfolioModal };
