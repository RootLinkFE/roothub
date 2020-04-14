import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { isUrl, urlToList } from '@/shared/utils';
import IconFont from '../IconFont';
import { MujiLink } from '@souche-f2e/muji';
import styles from './index.less';
import { getMenuMatches } from './utils';
const { SubMenu } = Menu;
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className={styles.icon} />
          )}
        />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};
const conversionPath = path => {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/');
};

class BaseMenu extends Component {
  constructor() {
    super(...arguments);
    this.getSelectedMenuKeys = path => {
      const { flatMenuKeys } = this.props;
      return urlToList(path).map(itemPath =>
        getMenuMatches(flatMenuKeys, itemPath).pop(),
      );
    };
    this.renderMenuItems = items => {
      if (!items) {
        return [];
      }
      return items
        .filter(item => item.title)
        .map(item => this.renderSubMenuOrItem(item))
        .filter(item => item);
    };
    this.renderSubMenuOrItem = item => {
      if (
        Array.isArray(item.children) &&
        item.children.some(child => !!child.title)
      ) {
        const title = item.icon ? (
          <span>
            {typeof item.icon === 'string' ? (
              <Icon type={item.icon} />
            ) : (
              item.icon
            )}
            <span>{item.title}</span>
          </span>
        ) : (
          item.title
        );
        return (
          <SubMenu title={title} key={item.path}>
            {this.renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>{this.renderMenuItemPath(item)}</Menu.Item>
      );
    };
    this.renderMenuItemPath = item => {
      const title = item.title;
      const itemPath = conversionPath(item.path);
      const icon = getIcon(item.icon);
      const { target } = item;
      // Is it a http link
      if (/^https?:\/\//.test(itemPath)) {
        return (
          <a href={itemPath} target={target}>
            {icon}
            <span>{title}</span>
          </a>
        );
      }
      const { currentRoute } = this.props;
      return (
        <MujiLink
          to={itemPath}
          target={target}
          replace={itemPath === currentRoute.path}
        >
          {icon}
          <span>{title}</span>
        </MujiLink>
      );
    };
  }

  render() {
    const {
      className,
      style,
      mode,
      onOpenChange,
      menuData,
      openKeys,
      collapsed,
      currentRoute: { path },
    } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(path);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Menu
        className={className}
        style={style}
        theme="dark"
        mode={mode}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        {...(openKeys && !collapsed
          ? {
              openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
            }
          : null)}
      >
        {this.renderMenuItems(menuData)}
      </Menu>
    );
  }
}

export default BaseMenu;
