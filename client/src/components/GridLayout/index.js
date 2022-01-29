import React from 'react';
import './GridLayout.scss';

const GridLayout = ({ children }) => {
    return (
        <div className="grid-wrapper">
            { children }
        </div>
    );
};

export default GridLayout;