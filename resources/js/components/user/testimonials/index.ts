/**
 * Index file for Testimonials Section
 * 
 * Centralized export point for all testimonials-related components
 */

// Main component export
import TestimonialsSection from './TestimonialsSection';
export default TestimonialsSection;

// Direct imports to fix TypeScript module resolution
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';

// Re-export components
export { TestimonialCard, TestimonialControls };
