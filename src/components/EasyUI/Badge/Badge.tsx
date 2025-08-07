import React from 'react';
import style from './Badge.module.css';

// Badge component

type BadgeProp = {
    label: string;
    icon?: React.ReactNode;
    className?: string;
};

export const BadgeComponent: React.FC<BadgeProp> = ({ label, icon, className = '' }) => {
    return (
        <div className={`${style.SelectDropdownComponentDiv} ${className}`}>
            {icon && <span className={`${style.SelectDropdownComponentIcon} ${className}`}>{icon}</span>}
            <span className={`${style.SelectDropdownComponentSpan} ${className}`}>{label}</span>
        </div>
    );
};

/*

USAGE EXAMPLES:

// Can do custom styling by passing className props to the component like divClassName, iconClassName, and spanClassName

// 1. Status Badge (Online/Offline):
//
// <BadgeComponent
//   label="Online"
//   icon={<span style={{ color: 'limegreen' }}>●</span>}
//   divClassName="badge online"
// />
// 
// <BadgeComponent
//   label="Offline"
//   icon={<span style={{ color: 'gray' }}>●</span>}
//   divClassName="badge offline"
// />

// 2. Profile Badge (User Achievement):
// <BadgeComponent
//   label="1 Year Member"
//   icon={<img src="/icons/cake.svg" alt="Cake icon" width={16} />}
//   divClassName="badge member"
// />
// 
// <BadgeComponent
//   label="Verified"
//   icon={<img src="/icons/checkmark.svg" alt="Checkmark icon" width={16} />}
//   divClassName="badge verified"
// />

// 3. Tag or Category Badge:
// <BadgeComponent
//   label="React"
//   icon={<img src="/icons/react.svg" alt="React icon" width={16} />}
//   divClassName="badge tag"
// />
// 
// <BadgeComponent
//   label="Admin"
//   icon={<img src="/icons/shield.svg" alt="Shield icon" width={16} />}
//   divClassName="badge admin"
// />

// 4. In a form or profile summary:
// <>
//   <InputFieldComponent
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//     label="Username"
//     placeholder="Enter your username"
//   />
// 
//   <BadgeComponent
//     label="Active User"
//     icon={<span style={{ color: 'green' }}>●</span>}
//     divClassName="badge status"
// />
// 
//   <BadgeComponent
//     label="Beta Tester"
//     icon={<img src="/icons/tester.svg" alt="Beta icon" width={16} />}
//     divClassName="badge beta"
// />
// </>

// 5. Wrap inside ButtonComponent for clickable badges (useful for actions like settings, profile, or dashboard navigation):
//    However, for more complex dashboards, it would probably be better to build a dedicated navigation component
//    for management.
// <ButtonComponent
//   label={
//     <BadgeComponent
//       label="Settings"
//       icon={<img src="/icons/cog.svg" alt="Settings" width={16} />}
//       divClassName="badge action"
//     />
//   }
//   onClick={() => console.log('Settings clicked')}
// />

*/
