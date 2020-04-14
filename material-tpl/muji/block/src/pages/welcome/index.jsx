import React, { Component } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Card } from 'antd';

class Welcome extends Component {
  render() {
    const { className, style } = this.props;
    return (
      <PageWrapper className={className} style={style}>
        <Card>
          <h1
            style={{
              fontSize: '1.5rem',
            }}
          >
            Welcome!
          </h1>
          <p>
            这是一个基于 muji + antd 开发的 boilerplate，用于快速启动你的项目
          </p>
          <p>除了正常的 muji 配置项外，你还可以：</p>
          <ul>
            <li>修改 src/menu-data.ts 来设置菜单的选项和图标之类</li>
            <li>修改 src/setting.ts 来</li>
          </ul>
          <p>Happy ❤️ Codding</p>
          <br />
          <a href="http://muji.dasouche-inc.net/">muji 文档地址</a>
        </Card>
      </PageWrapper>
    );
  }
}

export default Welcome;
