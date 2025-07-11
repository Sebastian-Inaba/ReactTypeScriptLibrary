/**
 * Custom type declaration for specific FontAwesome icons from 'react-icons/fa'.
 * This declares only the icons we actually use in our application rather than 
 * importing the entire icon library's type definitions.
 * 
 * Each icon is declared as a React component that accepts SVG props, allowing 
 * for proper type checking when using these icons throughout the application.
 * 
 * The declared icons:
 * - FaCheck: Check mark icon
 * - FaTimes: Close/X icon  
 * - FaExclamationTriangle: Warning icon
 * - FaInfoCircle: Informational icon
 */
declare module 'react-icons/fa' {
  import * as React from 'react';
  const FaCheck: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const FaTimes: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const FaExclamationTriangle: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  const FaInfoCircle: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle };
}