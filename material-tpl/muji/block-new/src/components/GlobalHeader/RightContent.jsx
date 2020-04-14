import React, { Component } from 'react';
import clazz from 'classnames';
import styles from './index.less';

class RightContent extends Component {
  render() {
    const { className, style, sso } = this.props;
    if (sso.isLogin === 'unknown') return null;
    return (
      <div className={clazz(className, styles.rightContent)} style={style}>
        {sso.isLogin ? (
          <span>{sso.userInfo && sso.userInfo.displayName}</span>
        ) : (
          <a
            href={`//${process.env.MUJI_APP_SSO_HOST}/login.htm`}
            target="_blank"
          >
            尚未登录
          </a>
        )}
      </div>
    );
  }
}

export default RightContent;
