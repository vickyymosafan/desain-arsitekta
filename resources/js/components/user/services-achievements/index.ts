/**
 * Index file for Services and Achievements Section
 * 
 * Centralized export point for all services and achievements related components
 */

// Main component export - ensure it's directly exported without any circular dependencies
import ServicesAchievementsSection from './ServicesAchievementsSection';

// Import sub-components
import ServiceCard from './ServiceCard';
import AchievementCounter from './AchievementCounter';

// Export all components
export { ServicesAchievementsSection as default, ServiceCard, AchievementCounter };
