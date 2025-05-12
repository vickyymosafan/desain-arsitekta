/**
 * Index file for Before-After Transformation Slider
 * 
 * Centralized export point for all before-after related components
 */

// Main component export
import BeforeAfterSection from './BeforeAfterSection';
export default BeforeAfterSection;

// Direct imports to fix TypeScript module resolution
import TransformationSlider from './TransformationSlider';
import TransformationControls from './TransformationControls';

// Re-export components
export { TransformationSlider, TransformationControls };
