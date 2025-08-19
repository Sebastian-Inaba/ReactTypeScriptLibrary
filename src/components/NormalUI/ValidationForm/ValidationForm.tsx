import React, { useState, useEffect, useId } from 'react';
import style from './ValidationForm.module.css';

// ValidationForm component 

interface FormData {
  name: string;
  email: string;
}

interface ValidationFormProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    className?: string;
}

export const ValidationFormComponent: React.FC<ValidationFormProps> = ({
    onSubmit,
    onCancel,
    className = ''
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const nameId = useId();
    const emailId = useId();

    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validate = () => {
        const newErrors: { name?: string; email?: string } = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ name, email });
        }
        setName("");
        setEmail("");
        setErrors({});
    };

    const handleCancel = () => {
        setName("");
        setEmail("");
        setErrors({});
        onCancel(); 
    };


    useEffect(() => {
        setErrors({});
    }, [name, email]);

    return(
        <form className={`${style.ValidationFormComponentWrapperDiv} ${className}`} onSubmit={handleSubmit}>
            <div className={style.ValidationFormComponentContent}>
                <div className={style.ValidationFormComponentField}>
                    <label htmlFor={nameId}>Name</label>
                    <input
                        type="text"
                        id={nameId}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? style.ValidationFormComponentErrorInput : ''}
                    />
                    {errors.name && <span className={style.ValidationFormComponentErrorText}>{errors.name}</span>}
                </div>
                <div className={style.ValidationFormComponentField}>
                    <label htmlFor={emailId}>Email</label>
                    <input
                        type="email"
                        id={emailId}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? style.ValidationFormComponentErrorInput : ''}
                    />
                    {errors.email && <span className={style.ValidationFormComponentErrorText}>{errors.email}</span>}
                </div>
            </div>
            <div className={style.ValidationFormComponentNavigation}>
                <button type="submit" className={style.ValidationFormComponentSubmitButton}>Submit</button>
                <button type="button" onClick={handleCancel} className={style.ValidationFormComponentCancelButton}>Cancel</button>
            </div>
        </form>
    )
}

/*

USE EXAMPLES:

// 1. Basic usage
// export function BasicExample() {
//   const handleSubmit = (data: { name: string; email: string }) => {
//     console.log("Form submitted:", data);
//   };
// 
//   const handleCancel = () => {
//     console.log("Form canceled");
//   };
// 
//   return (
//     <ValidationFormComponent
//       onSubmit={handleSubmit}
//       onCancel={handleCancel}
//     />
//   );
// }


// 2. Inside a modal
// export function ModalExample() {
//   const [open, setOpen] = useState(false);
// 
//   return (
//     <div>
//       <button onClick={() => setOpen(true)}>Open Form</button>
// 
//       {open && (
//         <div className="modal-backdrop">
//           <div className="modal">
//             <h2>Sign up</h2>
//             <ValidationFormComponent
//               onSubmit={(data) => {
//                 alert(`Submitted: ${JSON.stringify(data)}`);
//                 setOpen(false);
//               }}
//               onCancel={() => setOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// 3. With Stepper component (multi-step workflow)
// export function StepperWithValidationForm() {
//   const [completed, setCompleted] = useState(false);
// 
//   return (
//     <>
//       {!completed ? (
//         <StepUIComponent
//           steps={[
//             <div key="intro">
//               <h2>Step 1: Introduction</h2>
//               <p>Welcome! Please continue to fill out the form.</p>
//             </div>,
//             <ValidationFormComponent
//               key="form"
//               onSubmit={(data) => {
//                 console.log("Collected data:", data);
//                 setCompleted(true);
//               }}
//               onCancel={() => alert("Canceled form")}
//             />,
//           ]}
//           onComplete={() => setCompleted(true)}
//           onCancel={() => alert("Stepper canceled")}
//         />
//       ) : (
//         <h2>🎉 All done!</h2>
//       )}
//     </>
//   );
// }

*/
