/**
 * Index file for About Section
 * 
 * Centralized export point for all about-related components
 */

// Main component export
import AboutSection from './AboutSection';
export default AboutSection;

// Direct imports to fix TypeScript module resolution
import CompanyValues from './CompanyValues';
import TeamMember from './TeamMember';

// Re-export components
export { CompanyValues, TeamMember };
