import React, { Component } from 'react';
import clazz from 'classnames';
import { getFlatMenuKeys } from '../SiderMenu/utils';
import BaseMenu from '../SiderMenu/BaseMenu';
import styles from './index.less';
import RightContent from '../GlobalHeader/RightContent';
import { MujiLink } from '@souche-f2e/muji';

class TopNavHeader extends Component {
  render() {
    const {
      className,
      style,
      logo,
      menuData,
      currentRoute,
      sso,
      contentWidth,
    } = this.props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div className={clazz(className, styles.header)} style={style}>
        <div
          className={clazz(
            styles.main,
            contentWidth === 'fixed' ? styles.wide : '',
          )}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <MujiLink to="/">
                <h1>{logo || 'MUJI'}</h1>
              </MujiLink>
            </div>
            <div className={styles.menu}>
              <BaseMenu
                mode="horizontal"
                flatMenuKeys={flatMenuKeys}
                currentRoute={currentRoute}
                {...this.props}
              />
            </div>
          </div>
          <RightContent className={styles.right} sso={sso} />
        </div>
      </div>
    );
  }
}

export default TopNavHeader;
