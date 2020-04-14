import React from 'react';
import BasicLayout from './BasicLayout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
const Layout = props => {
  return (
    <ConfigProvider locale={zhCN}>
      <BasicLayout {...props} />
    </ConfigProvider>
  );
};
export default Layout;
