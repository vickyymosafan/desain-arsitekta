/**
 * Index file for FAQ Section
 * 
 * Centralized export point for all FAQ-related components
 */

// Main component export
import FAQSection from './FAQSection';
export default FAQSection;

// Direct imports to fix TypeScript module resolution
import FAQAccordion from './FAQAccordion';
import FAQItem from './FAQItem';

// Re-export components
export { FAQAccordion, FAQItem };
