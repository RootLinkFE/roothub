import React, { Component } from 'react';
import { Layout } from 'antd';
import BaseMenu from './BaseMenu';
import Logo from './Logo';
import { getDefaultCollapsedSubMenus, getFlatMenuKeys } from './utils';

class SiderMenu extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      flatMenuKeys: [],
      openKeys: [],
      path: '',
    };
    this.isMainMenu = key => {
      const { menuData } = this.props;
      return menuData.some(item => item.path === key);
    };
    this.onOpenChange = openKeys => {
      const moreThanOne =
        openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
      this.setState({
        openKeys: moreThanOne ? [openKeys[openKeys.length - 1]] : [...openKeys],
      });
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { path } = prevState;
    const { currentRoute, menuData } = nextProps;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    if (currentRoute.path !== path) {
      return {
        path: currentRoute.path,
        flatMenuKeys,
        openKeys: getDefaultCollapsedSubMenus(flatMenuKeys, currentRoute.path),
      };
    }
    return null;
  }

  render() {
    const {
      className,
      style,
      collapsed,
      onCollapse,
      menuData,
      currentRoute,
    } = this.props;
    const { openKeys, flatMenuKeys } = this.state;
    return (
      <Layout.Sider
        trigger={null}
        className={className}
        collapsed={collapsed}
        style={style}
        collapsible
        onCollapse={onCollapse}
        width={256}
      >
        <Logo collapsed={collapsed} />
        <BaseMenu
          mode="inline"
          menuData={menuData}
          currentRoute={currentRoute}
          collapsed={collapsed}
          onOpenChange={this.onOpenChange}
          flatMenuKeys={flatMenuKeys}
          openKeys={openKeys}
          style={{
            padding: '16px 0',
            width: '100%',
          }}
        />
      </Layout.Sider>
    );
  }
}

export default SiderMenu;
