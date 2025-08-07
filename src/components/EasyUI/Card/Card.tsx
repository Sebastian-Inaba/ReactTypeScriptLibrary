import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link for navigation
import style from './Card.module.css';

// Card component

// Card types for click behavior
type CardClickType =
    | { type: 'link'; to: string } // React route link component use
    | { type: 'action'; onAction: () => void; actionLabel: string }
    | { type: 'none' };

interface CardProps {
    title?: string;
    cardAlt?: string;
    message?: string;
    src: string;
    fallBackSrc?: string;
    tags?: string[];
    clickType: CardClickType; // Click type behavior
    className?: string;
}

export const CardComponent: React.FC<CardProps> = ({
    title = '',
    cardAlt = 'Card image',
    message = '',
    src,
    fallBackSrc = '/default-image.jpg',
    tags = [],
    clickType = { type: 'link', to: '' }, // Default link route example
    className = '',
}) => {
    // Fall back image handler
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (!fallBackSrc) return;
        const img = e.currentTarget;
        if (img.src !== fallBackSrc) {
            img.src = fallBackSrc;
        }
    };

    // Card
    const cardContent = (
        <>
            <div className={style.cardComponentHeader}>
                <img src={src} alt={cardAlt} className={style.cardComponentImage} onError={fallBackSrc ? handleImageError : undefined} />
            </div>
            <div className={style.cardComponentContent}>
                <h3 className={style.cardComponentTitle}>{title}</h3>
                <p className={style.cardComponentMessage}>{message}</p>
            </div>
            <div className={style.cardComponentFooter}>
                {clickType.type === 'action' && (
                    <button className={style.cardComponentActionButton} onClick={clickType.onAction}>
                        {clickType.actionLabel}
                    </button>
                )}
                {tags.length > 0 && (
                    <div className={style.cardComponentTags}>
                        {tags.map((tag, index) => (
                            <span key={`tag-${index}`} className={style.cardComponentTag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    // Link route wrapping the content if there is one if not just content
    return (
        <div className={`${style.cardComponent} ${className}`}>
            {clickType.type === 'link' ? (
                <Link to={clickType.to} className={style.cardComponentLink} aria-label={title ? `View ${title}` : 'View card details'}>
                    {cardContent}
                </Link>
            ) : (
                cardContent
            )}
        </div>
    );
};

/*

USAGE EXAMPLES:

// 1. Card with a link click type (navigates to a route):
// <CardComponent
//   title="Beautiful Landscape"
//   message="Click to view details"
//   src="/images/landscape.jpg"
//   clickType={{ type: 'link', to: '/landscape-details' }}
//   tags={['Nature', 'Photography']}
// />

// 2. Card with an action button click type (runs a callback function):
// <CardComponent
//   title="Delete Item"
//   message="Are you sure you want to delete this?"
//   src="/images/delete-icon.png"
//   clickType={{ 
//     type: 'action', 
//     onAction: () => alert('Item deleted!'), 
//     actionLabel: 'Delete' 
//   }}
//   tags={['Warning']}
// />

// 3. Card with no clickable behavior (static card):
// <CardComponent
//   title="Static Card"
//   message="This card does not navigate or have actions."
//   src="/images/static.jpg"
//   clickType={{ type: 'none' }}
//   tags={['Info']}
// />

// 4. Card with fallback image if the main image fails to load:
// <CardComponent
//   title="Broken Image Test"
//   message="This card uses a fallback image if the main fails."
//   src="/images/invalid-path.jpg"
//   fallBackSrc="/images/fallback.jpg"
//   clickType={{ type: 'none' }}
// />

// 5. Card with additional custom CSS class:
// <CardComponent
//   title="Custom Styled Card"
//   message="This card has extra custom styles."
//   src="/images/custom.jpg"
//   clickType={{ type: 'link', to: '/custom' }}
//   className="myCustomClass"
// />

*/
