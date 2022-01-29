import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;


const Loader = ({ paddingTop,alignItems }) => {
    return (
        <div style={{ display: 'flex',justifyContent: 'center',paddingTop: `${paddingTop}`,alignItems: `${alignItems}` }}>
            <Spin indicator={antIcon}/>
        </div>
    );
};

export default Loader;