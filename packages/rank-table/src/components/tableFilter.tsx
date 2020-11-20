/* eslint-disable react/display-name */
import React from 'react';

import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const handleSearch = (confirm: () => void) => {
    confirm();
};

const handleReset = (clearFilters: () => void) => {
    clearFilters();
};

export const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
    }: {
        setSelectedKeys: (selectedKeys: React.Key[]) => void;
        selectedKeys: React.Key[];
        confirm: () => void;
        clearFilters: () => void;
    }) => (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                onClick={() => handleSearch(confirm)}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
            </Button>
        </div>
    ),
    filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
        record[dataIndex]
            ? record[dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
            : '',
    render: (text: any) => text
});
