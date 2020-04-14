import React, { Component } from 'react';
import { Icon } from 'antd';
import clazz from 'classnames';
import styles from './index.less';

class Footer extends Component {
  render() {
    const { className, style } = this.props;
    return (
      <div className={clazz(className, styles.footer)} style={style}>
        Copyright <Icon type="copyright" /> 2019 无线开发中心
      </div>
    );
  }
}

export default Footer;
