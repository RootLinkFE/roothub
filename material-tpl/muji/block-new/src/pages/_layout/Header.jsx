import React, { Component } from 'react';
import { Layout } from 'antd';
import TopNavHeader from '@/components/TopNavHeader';
import GlobalHeader from '@/components/GlobalHeader';

class Header extends Component {
  render() {
    const {
      className,
      style,
      logo,
      menuData,
      collapsed,
      sso,
      currentRoute,
      layout,
      contentWidth,
    } = this.props;
    return (
      <Layout.Header
        className={className}
        style={{
          padding: '0',
          ...style,
        }}
      >
        {layout === 'topmenu' ? (
          <TopNavHeader
            logo={logo}
            sso={sso}
            menuData={menuData}
            contentWidth={contentWidth}
            currentRoute={currentRoute}
          />
        ) : (
          <GlobalHeader sso={sso} collapsed={collapsed} />
        )}
      </Layout.Header>
    );
  }
}

export default Header;
