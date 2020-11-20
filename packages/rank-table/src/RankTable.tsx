/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */

// @ts-ignore
import history from '@@/history';
import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Drawer, Select, Tooltip, Input } from 'antd';
import styles from '../style/index.less';
const { Option } = Select;
declare const RankTableSize: ['small', 'middle', 'normal'];

export interface ColumnsConfig {
  title: string;
  dataIndex: string;
  key: string;
  jumpTo?: {
    url?: string;
    query?: any;
  };
  defaultSortOrder?: any;
  render?: any;
  toolTip?: boolean;
  color?: string;
}

export interface RankTableConfig {
  title?: string;
  subTitle?: string;
  column: Array<ColumnsConfig>;
  showDraw?: Function;
  more?: boolean;
  outPagination?: boolean;
  dataSlice?: number | boolean;
  searchKey?: string;
  size?: typeof RankTableSize[number];
  fetchData: (query: any) => Promise<any>;
  query: any;
  pageByBackend?: any;
  defaultPageSize?: number;
  searchByBackend?: boolean;
}

export function RankTable({
  title,
  subTitle,
  column,
  showDraw,
  more,
  outPagination,
  dataSlice,
  searchKey,
  size,
  fetchData,
  query,
  pageByBackend,
  searchByBackend,
  defaultPageSize
}: RankTableConfig) {
  const [tableData, setTableData] = useState([] as Array<any>);
  const [detailData, setDetailData] = useState([] as Array<any>);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    pageSize: defaultPageSize ? defaultPageSize : 10
  } as any);

  const [isShowModal, setIsShowModal] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawLoading, setDrawLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([] as Array<any>);
  const [searchData, setSearchData] = useState([] as Array<any>);
  const [searchValue, setSearchValue] = useState('');

  const tableSizeStyle = {
    small: styles.rankTable,
    middle: styles.rankTable_middle,
    normal: styles.rankTable_normal
  };

  const fontSize = {
    small: '12px',
    middle: '13px',
    normal: '15px'
  };

  const getData = async (query: any) => {
    setLoading(true);
    setDrawLoading(true);
    const res = await fetchData(query);
    if (Object.prototype.toString.call(res) === '[object Array]') {
      setDetailData(res);
      setTableData(res);
    }
    if (Object.prototype.toString.call(res) === '[object Object]') {
      if (Object.prototype.toString.call(res.data) === '[object Array]') {
        setDetailData(res.data);
        setTableData(res.data);
      }
      if (Object.prototype.toString.call(res.data) === '[object Object]') {
        setDetailData(res.data.data);
        setTableData(res.data.data);
        setTotal(res.data.data.total);
      }
    }
    setDrawLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!pageByBackend) {
      getData(query);
    }
  }, [query]);

  useEffect(() => {
    if (pageByBackend) {
      getData(Object.assign(query, currentPage));
    }
  }, [currentPage, query]);

  const onFullScreenHandler = () => {
    setIsShowModal(true);
    typeof showDraw === 'function' && showDraw(true);
  };
  const handleClose = () => {
    setIsShowModal(false);
  };

  const columns = column;
  for (let i = 0; i < column.length; i++) {
    if (columns[i].jumpTo) {
      columns[i]['defaultSortOrder'] = 'descend';
      // columns[i]['sortDirections'] = ['ascend', 'descend', 'ascend'];  // 去掉默认排序
      columns[i]['render'] = (text: any) => (
        <a
          onClick={() => {
            history.push({
              pathname: columns[i]?.jumpTo?.url,
              query: columns[i]?.jumpTo?.query
            });
          }}
        >
          {columns[i].toolTip ? (
            <Tooltip placement="topLeft" title={text}>
              <span style={{ color: columns[i].color ? columns[i].color : '' }}>{text}</span>
            </Tooltip>
          ) : (
            <span style={{ color: columns[i].color ? columns[i].color : '' }}>{text}</span>
          )}
        </a>
      );
    } else {
      columns[i]['render'] = (text: any) =>
        columns[i].toolTip ? (
          <Tooltip placement="topLeft" title={text}>
            <span style={{ color: columns[i].color ? columns[i].color : '' }}>{text}</span>
          </Tooltip>
        ) : (
          <span style={{ color: columns[i].color ? columns[i].color : '' }}>{text}</span>
        );
    }
  }

  useEffect(() => {
    if (searchKey) {
      const temArr = [] as Array<any>;
      if (detailData) {
        detailData.map((item: any) => {
          temArr.push(item[searchKey]);
        });
      }
      setSearchList(temArr);
      setSearchData(detailData);
    }
  }, [detailData]);

  const arrDataSearch = (key: string, value: string | boolean | number, arr: Array<any>) => {
    const _tempArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === value) {
        _tempArr.push(arr[i]);
      }
    }
    return _tempArr;
  };

  useEffect(() => {
    if (searchKey) {
      if (searchValue === '' || searchValue === undefined) {
        setSearchData(detailData);
      } else {
        setSearchData(arrDataSearch(searchKey, searchValue, detailData));
      }
    }
  }, [searchValue]);

  const unique = (arr: Array<string | number>) => {
    return [...new Set(arr)];
  };

  return (
    <div className={size ? tableSizeStyle[size] : styles.rankTable}>
      <div style={{ marginBottom: 5, height: 24 }}>
        {title && (
          <Row justify="space-between">
            <Col span={22}>
              <span
                style={{
                  color: '#202020',
                  fontWeight: 'normal',
                  fontSize: size ? fontSize[size] : '12px',
                  paddingLeft: '1px'
                }}
              >
                {title}
              </span>
              <span
                style={{
                  color: 'gray',
                  marginLeft: 10,
                  fontSize: size ? fontSize[size] : '12px'
                }}
              >
                {subTitle}
              </span>
            </Col>
            {(more === undefined && !outPagination) || more === true ? (
              <Col span={2}>
                <h2
                  style={{
                    position: 'absolute',
                    right: 0,
                    cursor: 'pointer',
                    color: 'rgb(39,146,251)',
                    paddingRight: '2px',
                    fontSize: size ? fontSize[size] : '12px'
                  }}
                >
                  <span onClick={onFullScreenHandler}>更多</span>
                </h2>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        )}
      </div>
      <Table
        rowKey={(_record, index) => `${index}`}
        loading={loading}
        pagination={
          outPagination
            ? pageByBackend
              ? {
                  total: tableData.length,
                  pageSize: defaultPageSize ? defaultPageSize : 10,
                  current,
                  showTotal: total => (
                    <>
                      {defaultPageSize ? defaultPageSize : 10} 条 / 页，共 {total} 条
                    </>
                  ),
                  onChange: (page: number, pageSize?: number) => {
                    setCurrentPage({ page, pageSize });
                    setCurrent(page);
                  }
                }
              : {
                  total: tableData.length,
                  pageSize: defaultPageSize ? defaultPageSize : 10,
                  showTotal: total => (
                    <>
                      {defaultPageSize ? defaultPageSize : 10} 条 / 页，共 {total} 条
                    </>
                  )
                }
            : false
        }
        dataSource={
          dataSlice === undefined
            ? tableData.slice(0, 5)
            : typeof dataSlice === 'number'
            ? tableData.slice(0, dataSlice)
            : tableData
        }
        columns={columns}
      />
      <div style={{ maxHeight: document.getElementById('root')!.clientHeight }}>
        <Drawer
          title={
            <>
              <span>{title}</span>
              <span
                style={{
                  color: 'gray',
                  marginLeft: 10,
                  fontSize: size ? fontSize[size] : '12px'
                }}
              >
                {subTitle}
              </span>
            </>
          }
          placement="top"
          closable
          style={{
            marginTop: 'auto'
          }}
          onClose={handleClose}
          visible={isShowModal}
          height="100%"
          key="top"
        >
          <Row
            justify="end"
            style={{
              marginBottom: 10
            }}
          >
            <Col span={2} offset={18}>
              <Select
                defaultValue={defaultPageSize ? defaultPageSize : 10}
                onChange={(value: number) => setPageSize(value)}
              >
                <Option key={10} value={10}>
                  10 条 / 页
                </Option>
                <Option key={20} value={20}>
                  20 条 / 页
                </Option>
                <Option key={50} value={50}>
                  50 条 / 页
                </Option>
                <Option key={100} value={100}>
                  100 条 / 页
                </Option>
              </Select>
            </Col>
            <Col span={4}>
              {searchByBackend ? (
                <Input
                  placeholder="按下回车搜索"
                  // enterButton="Search"
                  allowClear
                  onChange={e => {
                    if (e.currentTarget.value === '') {
                      delete query[searchKey];
                      setCurrentPage({ page: 1, pageSize });
                    }
                  }}
                  onPressEnter={e => {
                    const searchQuery = {} as any;
                    searchQuery[searchKey!] = e.currentTarget.value;
                    delete query['page'];
                    delete query['pageSize'];
                    getData(
                      Object.assign(
                        query,
                        Object.assign(searchQuery, {
                          page: 1,
                          pageSize
                        })
                      )
                    );
                    //   onSearch && onSearch(e.target.value);
                    setCurrent(1);
                  }}
                />
              ) : (
                <Select
                  showSearch
                  placeholder={`Search by ${searchKey}`}
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(value: string) => {
                    setSearchValue(value);
                    setCurrent(1);
                  }}
                >
                  {unique(searchList).map((item: any) => (
                    <Select.Option value={item} key={item}>
                      <Tooltip placement="topLeft" title={item}>
                        {item}
                      </Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Col>
          </Row>

          <div className={styles.rankTable_normal}>
            <Table
              rowKey={(_record, index) => `${index}`}
              loading={drawLoading}
              dataSource={searchKey ? searchData : detailData}
              columns={columns}
              pagination={
                pageByBackend
                  ? {
                      total: searchValue !== '' ? searchData.length : total,
                      pageSize,
                      current,
                      showTotal: total => <>共 {total} 条</>,
                      onChange: (page: number, pageSize?: number) => {
                        setCurrentPage({ page, pageSize });
                        setCurrent(page);
                      }
                    }
                  : {
                      total: searchKey ? searchData.length : detailData.length,
                      pageSize,
                      showTotal: total => <>共 {total} 条</>
                    }
              }
              // onChange={onDrawTableChange}
              scroll={{ y: document.getElementById('root')!.clientHeight - 230 }}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
}
