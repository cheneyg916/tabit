import * as React from 'react';
import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/es/button';

export const Demo = (props: ButtonProps) => {
    return <AntdButton {...props} >hello  test</AntdButton>;
};
