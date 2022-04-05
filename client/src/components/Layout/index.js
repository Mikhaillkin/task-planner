import React from 'react';
import './Layout.scss';

const Layout = ({ children }) => {
    return (
        <>
            <header className="layout__header">Task Planner</header>
            <main className="layout__main">{children}</main>
            <footer className="layout__footer">All rights reserved,2022</footer>
        </>
    );
};

export default Layout;