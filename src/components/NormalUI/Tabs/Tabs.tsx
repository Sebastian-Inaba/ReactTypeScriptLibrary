import React, { useState, useEffect, useId } from 'react';
import style from './Tabs.module.css';

// Tabs component

interface TabsProps {
    tabs: { label: string; content: React.ReactNode; disabled?: boolean }[];
    activeTab?: number;
    onTabChange?: (index: number) => void;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const TabsComponent: React.FC<TabsProps> = ({ tabs, activeTab = 0, onTabChange, className, orientation = 'horizontal' }) => {
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

    // Having keyboard handling can be useful for accessibillity, especially right now with more WCAG guidelines being enforced,
    // however, i feel like there should be a better way to handel this then if statements.
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
            className={`
                    ${style.TabsComponentWrapper} 
                    ${orientation === 'vertical' ? style.TabsComponentVertical : ''}   
                    ${style.TabsComponentWrapperCustom}
                    ${className}
                `}
            role="tablist"
            aria-orientation={orientation}
        >
            <div className={`${style.TabsComponentHeaderGroup} ${style.TabsComponentHeaderGroupCustom} ${className}`}>
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
                            className={`
                                ${style.TabsComponentHeader} 
                                ${style.TabsComponentHeaderCustom} 
                                ${isActive ? style.TabsComponentActive : ''} 
                                ${tab.disabled ? style.TabsComponentDisabled : ''}
                                ${className}
                            `}
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
                className={`
                    ${style.TabsComponentContent} 
                    ${style.TabsComponentContentCustom}
                    ${className}
                `}
                tabIndex={0}
            >
                {tabs[ActiveTab]?.content}
            </div>
        </div>
    );
};

/*

USE EXAMPLE:

// 1. Import component with custom styles:
// <Tabs
//     tabs={[
//         { label: 'Profile', content: <ProfileComponent /> },
//         { label: 'Settings', content: <SettingsComponent /> },
//         { label: 'Disabled', content: <div>Disabled content</div>, disabled: true }
//     ]}
//     activeTab={currentTab}
//     onTabChange={(index) => setCurrentTab(index)}
//     orientation="vertical"
//     className="custom-tabs"
//     tabClassName="custom-tab"
//     contentClassName="custom-content"
// />

// 2. Different language(i don't know python):
// <TabsComponent
//     tabs={[
//         { label: 'JavaScript', content: <pre>{`console.log('Hello World');`}</pre> },
//         { label: 'TypeScript', content: <pre>{`console.log('Hello World' as string);`}</pre> },
//         { label: 'Python', content: <pre>{`print("Hello World")`}</pre> }
//     ]}
// />

// 3. Dashboard: 
// <TabsComponent
//     tabs={[
//         { label: 'Analytics', content: <ChartComponent /> },
//         { label: 'Sales', content: <SalesTable /> },
//         { label: 'Users', content: <UserList /> }
//     ]}
//     orientation="vertical"
// />

*/
