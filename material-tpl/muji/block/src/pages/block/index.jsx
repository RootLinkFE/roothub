import React, { Component } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from 'antd';

class Block extends Component {
  render() {
    const { className, style } = this.props;
    return (
      <PageWrapper className={className} style={style}>
       block
      </PageWrapper>
    );
  }
}

export default Block;
