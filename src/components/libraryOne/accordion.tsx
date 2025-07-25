import React, { useState, useEffect } from 'react';
import style from './basic.module.css';

// Accordion component, open and close content

interface AccordionProps {
    title: string;
    content: React.ReactNode;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    icon?: React.ReactNode;
    headerClassName?: string;
    contentClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    content,
    isOpen = false,
    onToggle,
    className = "",
    icon = null,
    headerClassName = "",
    contentClassName = ""
}) => {
    const [Open, setOpen] = useState<boolean>(isOpen);
    // Unique ID for the content section, useful for accessibility
    const contentId = `accordion-content-${React.useId()}`;

    // Update the open state when isOpen prop changes
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    // Handle toggle function
    const handleToggle = () => {
        const newState = !Open;
        setOpen(newState);
        onToggle?.(newState);
    };

    // Render the accordion component
    return (
        <div 
            className={`${style.accordion} ${className} ${Open ? style.open : ''}`}
            aria-expanded={Open}
        >
            <button
                className={`${style.accordionHeader} ${headerClassName}`}
                onClick={handleToggle}
                aria-controls={contentId}
                aria-expanded={Open}
            >
                <div className={style.headerContent}>
                    {icon && <span className={style.accordionIcon}>{icon}</span>}
                    <span className={style.accordionTitle}>{title}</span>
                </div>
                <span className={style.accordionIcon}>
                    {Open ? 'opened' : 'closed'} {/* Icon is better */}
                </span>
            </button>
            <div 
                id={contentId}
                className={`${style.accordionContent} ${contentClassName}`}
                aria-hidden={!Open}
                style={{ display: Open ? 'block' : 'none' }}
            >
                {content}
            </div>
        </div>
    );
};

export default Accordion;