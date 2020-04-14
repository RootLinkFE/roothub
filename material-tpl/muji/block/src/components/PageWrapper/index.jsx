import React, { Component } from 'react';
import clazz from 'classnames';
import { connect } from '@souche-f2e/muji';
import styles from './index.less';
const mapStateToProps = state => {
  return {
    contentWidth: state.setting.contentWidth,
  };
};

class PageWrapper extends Component {
  render() {
    const { className, style, contentWidth, children } = this.props;
    return (
      <div
        style={{
          margin: '-24px -24px 0',
        }}
      >
        <div
          className={clazz(className, styles.root, {
            [styles.wide]: contentWidth === 'fixed',
          })}
          style={style}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageWrapper);
