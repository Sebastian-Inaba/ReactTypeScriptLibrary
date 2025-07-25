import React, { useState, useEffect, useId } from 'react';
import style from './basic.module.css';

interface TabsProps {
    tabs: { label: string; content: React.ReactNode; disabled?: boolean }[];
    activeTab?: number;
    onTabChange?: (index: number) => void;
    className?: string;
    tabClassName?: string;
    contentClassName?: string;
    headerContainerClassName?: string;
    orientation?: 'horizontal' | 'vertical';
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab = 0,
    onTabChange,
    className = "",
    tabClassName = "",
    contentClassName = "",
    headerContainerClassName = "",
    orientation = 'horizontal'
}) => {
    const [ActiveTab, setActiveTab] = useState<number>(activeTab);
    const idPrefix = useId();
    
    useEffect(() => {
        setActiveTab(activeTab);
    }, [activeTab]);

    const handleTabChange = (index: number) => {
        if (tabs[index]?.disabled) return;
        setActiveTab(index);
        onTabChange?.(index);
    };

    // Keyboard navigation support
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTabChange(index);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextTab = (index + 1) % tabs.length;
            handleTabChange(nextTab);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevTab = (index - 1 + tabs.length) % tabs.length;
            handleTabChange(prevTab);
        } else if (e.key === 'Home') {
            e.preventDefault();
            handleTabChange(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            handleTabChange(tabs.length - 1);
        }
    };

    return (
        <div 
            className={`${style.tabs} ${orientation === 'vertical' ? style.vertical : ''} ${className}`}
            role="tablist"
            aria-orientation={orientation}
        >
            <div className={`${style.tabHeaders} ${headerContainerClassName}`}>
                {tabs.map((tab, index) => {
                    const isActive = ActiveTab === index;
                    const tabId = `${idPrefix}-tab-${index}`;
                    const panelId = `${idPrefix}-panel-${index}`;
                    
                    return (
                        <button
                            key={index}
                            id={tabId}
                            role="tab"
                            tabIndex={isActive ? 0 : -1}
                            aria-selected={isActive}
                            aria-controls={panelId}
                            aria-disabled={tab.disabled || false}
                            className={`${style.tabHeader} ${tabClassName} ${
                                isActive ? style.active : ''
                            } ${tab.disabled ? style.disabled : ''}`}
                            onClick={() => handleTabChange(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div 
                id={`${idPrefix}-panel-${ActiveTab}`}
                role="tabpanel"
                aria-labelledby={`${idPrefix}-tab-${ActiveTab}`}
                className={`${style.tabContent} ${contentClassName}`}
                tabIndex={0}
            >
                {tabs[ActiveTab]?.content}
            </div>
        </div>
    );
};

export default Tabs;

/*

USE 

<Tabs
    tabs={[
        { label: 'Profile', content: <ProfileComponent /> },
        { label: 'Settings', content: <SettingsComponent /> },
        { label: 'Disabled', content: <div>Disabled content</div>, disabled: true }
    ]}
    activeTab={currentTab}
    onTabChange={(index) => setCurrentTab(index)}
    orientation="vertical"
    className="custom-tabs"
    tabClassName="custom-tab"
    contentClassName="custom-content"
/>

*/