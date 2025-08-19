import React, { useState } from 'react';
import styles from './StepUI.module.css';

// StepUI component

interface StepUIProps {
    steps: React.ReactNode[];
    currentStep?: number;
    className?: string;
    onComplete?: () => void;
    onCancel?: () => void;
}

export const StepUIComponent: React.FC<StepUIProps> = ({
    steps,
    currentStep = 0,
    className,
    onComplete,
    onCancel,
}) => {
    const [activeStep, setActiveStep] = useState(currentStep);

    const nextStep = () => {
        setActiveStep((state) => Math.min(state + 1, steps.length - 1));
    };

    const prevStep = () => {
        setActiveStep((state) => Math.max(state - 1, 0));
    };

    return(
        <div className={`${styles.StepUIComponentWrapperDiv} ${className}`}>
            <div className={styles.StepUIComponentStepCount}>
                {steps[activeStep]}
            </div>
             {onCancel && (
                <button className={styles.StepUIComponentCloseButton} onClick={onCancel}>
                X
                </button>
            )}
            <div className={styles.StepUIComponentNavigation}>
                {activeStep === 0 ? (
                    <button onClick={onCancel} className={styles.StepUIComponentCancelButton}>Cancel</button>
                ) : (
                    <button onClick={prevStep} className={styles.StepUIComponentPreviousButton}>Previous</button>
                )}
                {activeStep < steps.length - 1 ? (
                    <button onClick={nextStep} className={styles.StepUIComponentNextButton}>Next</button>
                ) : (
                    <button onClick={onComplete} className={styles.StepUIComponentCompleteButton}>Complete</button>  
                )}
            </div>

        </div>    
    )
}

/*

USE EXAMPLES:

// 1. Simple Multi-Step Form
// function NameStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
//   return (
//     <input
//       type="text"
//       placeholder="Enter your name"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ width: "100%", padding: "8px" }}
//     />
//   );
// }
// 
// function EmailStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
//   return (
//     <input
//       type="email"
//       placeholder="Enter your email"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ width: "100%", padding: "8px" }}
//     />
//   );
// }
// 
// export function MultiStepFormExample() {
//   const [showStepper, setShowStepper] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "" });
// 
//   return (
//     <>
//       <button onClick={() => setShowStepper(true)}>Open Form Stepper</button>
// 
//       {showStepper && (
//         <StepUIComponent
//           currentStep={0}
//           steps={[
//             <NameStep value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />,
//             <EmailStep value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />,
//           ]}
//           onCancel={() => setShowStepper(false)}
//           onComplete={() => {
//             console.log("Form Submitted:", formData);
//             setShowStepper(false);
//             setFormData({ name: "", email: "" });
//           }}
//         />
//       )}
//     </>
//   );
// }


// 2. Confirmation / Wizard Stepper
// export function ConfirmationStepperExample() {
//   const [showStepper, setShowStepper] = useState(true);
// 
//   return (
//     <>
//       {showStepper && (
//         <StepUIComponent
//           steps={[
//             <div>Step 1: Read instructions carefully.</div>,
//             <div>Step 2: Confirm your choices.</div>,
//             <div>Step 3: Final review before submission.</div>,
//           ]}
//           onCancel={() => setShowStepper(false)}
//           onComplete={() => {
//             alert("All steps completed!");
//             setShowStepper(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

// 3. Wizard-style Inputs (selecting options)
// export function OptionsWizardExample() {
//   const [showStepper, setShowStepper] = useState(true);
//   const [options, setOptions] = useState({ optionA: false, optionB: false });
// 
//   return (
//     <>
//       {showStepper && (
//         <StepUIComponent
//           steps={[
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={options.optionA}
//                   onChange={(e) => setOptions({ ...options, optionA: e.target.checked })}
//                 />
//                 Option A
//               </label>
//             </div>,
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={options.optionB}
//                   onChange={(e) => setOptions({ ...options, optionB: e.target.checked })}
//                 />
//                 Option B
//               </label>
//             </div>,
//             <div>
//               Review selection: {JSON.stringify(options)}
//             </div>,
//           ]}
//           onCancel={() => setShowStepper(false)}
//           onComplete={() => {
//             console.log("Selected options:", options);
//             setShowStepper(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

*/