import React from 'react';
import style from './Avatar.module.css';

// Avatar component, displays image or fallback to initials

type AvatarSize = 'small' | 'medium' | 'large';

type AvatarProps = {
    name?: string;
    src?: string;
    alt?: string;
    size?: AvatarSize;
    className?: string;
};

export const AvatarComponent: React.FC<AvatarProps> = ({
    name = '',
    src,
    alt = 'Avatar',
    size = 'medium',
    className = '',
}) => {
    // Image in the avatar fallback to the first or first two letters of the name, of the user
    const nameFallBack = (name: string) => {
        const userName = name.trim().split(' '); // Trim whitespace and split name by spaces
        if (userName.length === 0) return 'User'; // Fallback to 'User' if no name is provided
        if (userName.length === 1) return userName[0].charAt(0).toUpperCase(); // Return first letter of the name if only one word
        return userName[0].charAt(0).toUpperCase() + userName[1].charAt(0).toUpperCase(); // Else return first letters of the first two words
    };

    // styles for the different sizes of the avatar
    const sizeClasses: Record<AvatarSize, string> = {
        // Record is a utility type that allows us to create an object with specific keys and values
        small: style.avatarSmall,
        medium: style.avatarMedium,
        large: style.avatarLarge,
    };

    return (
        <div className={`${sizeClasses[size]} ${style.AvatarComponentDiv} ${className}`}>
            {src ? (
                <img src={src} alt={alt} className={`${style.AvatarComponentImg} ${className}`} />
            ) : (
                <span className={`${style.AvatarComponentSpan} ${className}`}>
                    {nameFallBack(name)}
                </span>
            )}
        </div>
    );
};

/*

USAGE EXAMPLES:

// Note: Not for practical use, but to show how the AvatarComponent can be used.

// 1. Avatar in a chat
// <div className="chatPreview">
//   <AvatarComponent name="Sophie Tanaka" src="/images/sophie.jpg" size="small" />
//   <div className="chatInfo">
//     <strong>Sophie Tanaka</strong>
//     <p>Hey! Are we still meeting later?</p>
//   </div>
// </div>

// 2. Avatar in an friend list
// <div className="chatHeader">
//   <AvatarComponent name="Michael Ito" src="/images/michael.jpg" size="medium" />
//   <div className="userDetails">
//     <h4>Michael Ito</h4>
//     <span className="status online">Online</span>
//   </div>
// </div>

// 3. Avatar in a dashboard 
// <div className="topBar">
//   <span>Welcome, Emi</span>
//   <AvatarComponent name="Emi" src="/images/emi.jpg" size="small" />
// </div>

// 4. Avatar in a comment 
// <div className="commentItem">
//   <AvatarComponent name="David" src="" size="small" />
//   <div className="commentBody">
//     <strong>David</strong>
//     <p>I totally agree with this point.</p>
//   </div>
// </div>

// 5. Avatar in a team member list
// <div className="teamRow">
//   <AvatarComponent name="Hiroko Suzuki" src="/images/hiroko.jpg" size="medium" />
//   <div className="memberDetails">
//     <strong>Hiroko Suzuki</strong>
//     <span>Frontend Developer</span>
//   </div>
// </div>

// 6. Avatar next to a post author in a blog or forum
// <div className="postHeader">
//   <AvatarComponent name="Takeshi Ueno" src="/images/takeshi.png" size="small" />
//   <span className="authorName">Takeshi Ueno</span>
// </div>

// 7. Avatar in a friend list (example with other components)
// 
// Define props
//
// const ChatList = ({ 
//          name, 
//          avatarSrc, // Custom avatar source
//          status, 
//          onClick 
//   }) => (
//   <ButtonComponent
//     onClick={onClick}
//     className="chatListStyle" // Custom class for styling
//     label={
//       <>
//         <AvatarComponent src={avatarSrc} name={name} size="small" />
//         <span style={spanStyle}>{name}</span>
//         <BadgeComponent
//           label={status}
//           divClassName={`badge ${status.toLowerCase()}`}
//           icon={status === 'Online' ? <span style={{color: 'green'}}>●</span> : <span style={{color: 'gray'}}>●</span>}
//         />
//       </>
//     }
//   />
// );

*/
