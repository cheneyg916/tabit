import * as React from 'react';
import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/es/button';
import './index.less';

export const Demo = (props: ButtonProps) => {
    return <AntdButton {...props} >hello</AntdButton>;
};
