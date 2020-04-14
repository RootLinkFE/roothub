import React, { Component } from 'react';
import clazz from 'classnames';
import styles from './index.less';

class Logo extends Component {
  render() {
    const { className, style, collapsed } = this.props;
    return (
      <div
        className={clazz(className, styles.logo, {
          collapsed,
        })}
        style={style}
      >
        MUJI
      </div>
    );
  }
}

export default Logo;
