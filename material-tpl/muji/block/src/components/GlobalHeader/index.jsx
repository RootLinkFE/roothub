import React, { Component } from 'react';
import clazz from 'classnames';
import styles from './index.less';
import { dispatch } from '@@/store';
import { Icon } from 'antd';
import RightContent from './RightContent';

class GlobalHeader extends Component {
  constructor() {
    super(...arguments);
    this.toggle = () => {
      const { collapsed } = this.props;
      dispatch.global.SET_COLLAPSED(!collapsed);
    };
  }

  render() {
    const { className, style, sso, collapsed } = this.props;
    return (
      <div className={clazz(className, styles.header)} style={style}>
        <div className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <RightContent sso={sso} />
      </div>
    );
  }
}

export default GlobalHeader;
