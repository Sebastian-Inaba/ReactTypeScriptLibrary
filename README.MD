# React TypeScript Component Library
**By Sebastian Inaba**

> A collection of React components written in TypeScript.

## About This Project

This project is a personal component library built from scratch using React and TypeScript. It serves as both a learning journey and a practical toolkit for building UI components with strong typing and clean design.

### Preview UI for Components (Future plan)

To make this library easier to use and explore, I’m going to building a dedicated **Preview UI**, a simple showcase app that renders all components live, allowing easy interaction and visual testing. 

- The Preview UI will use only the components within this library, no external UI dependencies or individual code(except maybe some html and css).
- As this is a step-by-step project, the Preview UI will take a while before implemented.

### Current Progress Updates

- 3 new components added: alertNotification, popup and card.
- There were a dependencies problem with react icons inside alertNotifications so i had to manually declare the icons in a new .d.ts file to make them work, nothing else i tried worked
    - I tried changing dependencies versions 
    - declare in component in JSX.React, React.Node, React.Element, React.JSX.Element. 
    - I tried some other things to but i don't remember 
- Playground is also setup with routing for card component and other future use

### Why This Project?

- To practice React + TypeScript with real component-building experience.
- To create reusable, well-typed UI components for future projects.
- To understand best practices in component architecture and documentation.
- To have a component playground.

## License

This repository is publicly visible for viewing only. The source code is protected by a custom license.
Unauthorized copying, modification, distribution, or commercial use is strictly prohibited without explicit written permission.