import React, { useState } from 'react';
import style from './PasswordVisibility.module.css';

// Password Visibility Component 

interface PasswordVisibilityProps {
    placeholder: string; 
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    className?: string;
}

export const PasswordVisibilityComponent: React.FC<PasswordVisibilityProps> = ({
    placeholder,
    onChange,
    value,
    className,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputType = isPasswordVisible ? 'text' : 'password';

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={`${style.PasswordVisibilityComponentDivWrapper} ${className}`}>
            <input
                type={inputType}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={style.PasswordVisibilityComponentInput}
                alt='Password Input'
                aria-label='Password Input'
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className={style.PasswordVisibilityComponentButton}
                aria-label='Toggle Password Visibility'
            >
                {isPasswordVisible ? 'Hide Password' : 'Show Password'}
            </button>
        </div>
    )
}

/*

USE EXAMPLE:

// 1. Use in login form:
// export const LoginForm = () => {
//   const [password, setPassword] = useState("");
// 
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Password entered: ${password}`);
//   };
// 
//   return (
//     <form onSubmit={handleSubmit}>
//       <PasswordVisibilityComponent
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// 2. Use in reg form:
// export const RegisterForm = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
// 
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
// 
//   return (
//     <form>
//       <input
//         type="email"
//         name="email"
//         placeholder="Enter email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       <PasswordVisibilityComponent
//         placeholder="Create password"
//         value={formData.password}
//         onChange={handleChange}
//         className="custom-password-input"
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

*/