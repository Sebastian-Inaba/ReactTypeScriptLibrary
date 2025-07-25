import React from 'react';
import style from './basic.module.css';


// This time we used type instead of interface because we are not extending it
// For example, if we wanted to extend this type in the future, we would use interface
// However, in this case, we are not extending it because there is nothing to extend
type BadgeProp = {
    label: string;
    icon?: React.ReactNode; // reactNode allows for any valid React element as an icon, in this case png, svg, etc.
    divClassName?: string;
    iconClassName?: string;
    spanClassName?: string; 
}

const BadgeComponent: React.FC<BadgeProp> = ({
    label,
    icon,
    divClassName = style.divBadgeComponentStyle,
    iconClassName = style.iconBadgeComponentStyle,
    spanClassName = style.spanBadgeComponentStyle,
}) => {
    return (
        <div className={divClassName}>
            {icon && <span className={iconClassName}>{icon}</span>}
            <span className={spanClassName}>{label}</span>
        </div>
    );
}

export default BadgeComponent;

// Note: The BadgeComponent has a very simple style, and most likely need to be customized for each use case.

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