# Rank Table

基于 Antd Table 封装的表格组件。

## 代码演示

### 基本用法

点击“更多”显示完整数据表格。

![image-20201123191020244](https://fdfs.xmcdn.com/storages/c73d-audiofreehighqps/7C/C4/CMCoOSMDk5VmAAEc6wBqgCqh.png)

![image-20201123191503729](https://fdfs.xmcdn.com/storages/4c05-audiofreehighqps/D3/94/CMCoOSYDk5VmAANOyQBqgCqn.png)

```jsx
import { RankTable } from '@tabit/rank-table';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
return (
  <>
    <RankTable
      column={columns}
      title="title"
      subTitle="subtitle"
      searchKey="address"
      fetchData={fetchData}
      query={{ id: 1 }}
    ></RankTable>
  </>
);
```

### 行内搜索

表格支持行内搜索，引入`getColumnSearchProps`并在列中配置。

![image-20201123192212616](https://fdfs.xmcdn.com/storages/461c-audiofreehighqps/A4/B8/CMCoOScDk5VmAAGNRgBqgCqt.png)

![image-20201123192552804](https://fdfs.xmcdn.com/storages/1629-audiofreehighqps/96/8D/CMCoOSQDk5VmAAN16ABqgCqw.png)

```jsx
import { RankTable, getColumnSearchProps } from '@tabit/rank-table';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    ...getColumnSearchProps('name')
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
return (
  <>
    <RankTable
      column={columns}
      title="title"
      subTitle="subtitle"
      searchKey="address"
      fetchData={fetchData}
      query={{ id: 1 }}
    ></RankTable>
  </>
);
```

> `searchKey`指定的的是完整数据表格里，所要搜索列对应的字段，而`getColumnSearchProps`里的参数是当前所要搜索列的`dataIndex`。

### 页面跳转

列配置 jumpTo，其中包含两个字段 `url`：页面 url，`query`：路由参数。

![image-20201123192719339](https://fdfs.xmcdn.com/storages/95dd-audiofreehighqps/42/FD/CMCoOSUDk5VmAAGA5gBqgCq7.png)

跳转后的地址：`***/jump/to?id=1`

```jsx
import { RankTable } from '@tabit/rank-table';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    jumpTo: {
      url: '/jump/to',
      query: {
        id: 1
      }
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
return (
  <>
    <RankTable
      column={columns}
      title="title"
      subTitle="subtitle"
      searchKey="address"
      fetchData={fetchData}
      query={{ id: 1 }}
    ></RankTable>
  </>
);
```

### 后端搜索/分页

指定 `searchByBackend`/ `pageByBackend`为`true`则可进行后端搜索/分页。

当`searchByBackend`为`true`时，前端发送请求会自动在请求参数上添加`searchKey`（由`searchKey`指定）字段：

```
Query String Parameters
{
	"id":1,
	"address":"search"
}
```

当`pageByBackend`为`true`时，前端发送请求会自动在请求参数上添加`page`、`pageSize`字段：

```
Query String Parameters
{
	"id":1,
	"address":"search",
	"page":1,
	"pageSize":10
}
```

```jsx
import { RankTable } from '@tabit/rank-table';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    jumpTo: {
      url: '/jump/to',
      query: {
        id: 1
      }
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
return (
  <>
    <RankTable
      column={columns}
      title="title"
      subTitle="subtitle"
      searchKey="address"
      searchByBackend
      pageByBackend
      fetchData={fetchData}
      query={{ id: 1 }}
    ></RankTable>
  </>
);
```

## API

### RankTable

| 参数            | 说明                                               | 类型                    | 默认值 |
| :-------------- | -------------------------------------------------- | ----------------------- | ------ |
| title           | 表格标题                                           | string                  | -      |
| subTitle        | 表格副标题                                         | string                  | -      |
| columns         | 表格列的配置描述，具体项见下表                     | ColumnsConfig[]         | -      |
| more            | 是否显示“更多”（完整数据表格）                     | boolean                 | true   |
| outPagination   | 是否显示默认表格分页，当显示“更多”此分页不展示     | Boolean                 | false  |
| dataSlice       | 默认表格数据展示数量，当为`false`时展示完整数据    | number \| boolean       | 5      |
| searchKey       | 搜索字段，前端或后端搜索按照此字段对数据进行搜索   | string                  | -      |
| size            | 表格尺寸                                           | small\|middle\|normal   | small  |
| fetchData       | 数据请求方法                                       | function(query):Promise | -      |
| query           | 请求参数                                           | object                  | -      |
| pageByBackend   | 是否后端分页                                       | boolean                 | false  |
| searchByBackend | 是否后端搜索                                       | boolean                 | false  |
| defaultPageSize | 每页默认展示条数（默认表格和完整数据表格同时生效） | number                  | 10     |

### Column

列描述数据对象

| 参数             | 说明                                                                                                                                                              | 类型                                                         | 默认值         |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| title            | 列头显示文字                                                                                                                                                      | ReactNode\|({ sortOrder, sortColumn, filters }) => ReactNode | -              |
| dataIndex        | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径                                                                                                              | string\|string[]                                             | -              |
| key              | React 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性                                                                                              | string                                                       | -              |
| jumpTo           | 列是否需要跳转，此对象包含两个属性：url、query                                                                                                                    | object                                                       | -              |
| sorter           | 排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction) | function                                                     | -              |
| defaultSortOrder | 默认排序顺序                                                                                                                                                      | ascend\|descend                                              | descend        |
| toolTip          | 列内容是否展示文字提示                                                                                                                                            | boolean                                                      | false          |
| color            | 列内容颜色                                                                                                                                                        | string                                                       | -              |
| needCopy         | 是否需要拷贝按钮                                                                                                                                                  | boolean                                                      | false          |
| copyMsg          | 拷贝的信息                                                                                                                                                        | string                                                       | 当前展示的数据 |
| copyClass        | 拷贝图标的类名                                                                                                                                                    | string                                                       | -              |
