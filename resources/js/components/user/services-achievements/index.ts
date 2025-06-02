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

// Import data types and constants
import { services, achievements, serviceCategories, ServiceItem, AchievementItem } from './data';

// Export all components and data types
export { 
    ServicesAchievementsSection as default, 
    ServiceCard, 
    AchievementCounter,
    services,
    achievements,
    serviceCategories
};

// Export types properly when isolatedModules is enabled
export type { ServiceItem, AchievementItem };
