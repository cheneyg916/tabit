import React from 'react';
import { Tooltip, message, Icon } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyIcon = function({ record, text }: { record: { [key: string]: any }; text: any }) {
  const copySuccess = function copySuccess() {
    message.success('复制成功');
  };
  const { needCopy, copyMsg, copyClass } = record;
  return needCopy ? (
    <Tooltip placement="top" title="复制">
      <CopyToClipboard text={copyMsg || text} onCopy={copySuccess}>
        {/* antd 3 */}
        <Icon type="copy" className={['copyIconStyle', copyClass].join(' ')} />
        {/* antd 4 */}
        {/* <CopyOutlined className={['copyIconStyle', copyClass].join(' ')} /> */}
      </CopyToClipboard>
    </Tooltip>
  ) : null;
};

export default CopyIcon;
