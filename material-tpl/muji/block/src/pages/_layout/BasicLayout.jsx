import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from '@souche-f2e/muji';
import { dispatch } from '@@/store';
import SiderMenu from '@/components/SiderMenu';
import Header from './Header';
import Footer from './Footer';
import menuData from '@/menu-data';
import styles from './index.less';
const mapStateToProps = ({ global, setting, router, sso }) => {
  const currentRoute = router;
  const { collapsed } = global;
  const { layout, contentWidth, hideLayoutInIframe } = setting;
  return {
    sso,
    collapsed,
    layout,
    contentWidth,
    hideLayoutInIframe,
    currentRoute,
  };
};

class BasicLayout extends Component {
  constructor() {
    super(...arguments);
    this.onCollapse = collapsed => {
      dispatch.global.SET_COLLAPSED(collapsed);
    };
  }

  render() {
    const {
      layout,
      sso,
      contentWidth,
      collapsed,
      currentRoute,
      hideLayoutInIframe,
      children,
    } = this.props;
    // 默认情况下如果在 iframe 中则直接返回 children 不显示 layout 外框，可按需调整
    if (hideLayoutInIframe && window.top !== window.self) {
      return children;
    }
    return (
      <Layout>
        {layout === 'topmenu' ? null : (
          <SiderMenu
            menuData={menuData}
            currentRoute={currentRoute}
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          />
        )}
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Header
            logo={'MUJI'} // 如需调整 LOGO 请修改此处
            sso={sso}
            menuData={menuData}
            currentRoute={currentRoute}
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            contentWidth={contentWidth}
            layout={layout}
          />
          <Layout.Content className={styles.content}>{children}</Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(BasicLayout);
