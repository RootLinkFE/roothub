export const genCodeApp = {
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  name: 'codegen',
  // entry: 'http://localhost:8000',
  entry: 'http://codegen.leekhub.com/codegen/index.html',
  container: '#genCodeContainer',
  activeRule: '/codegen',
  loader(loading) {
    console.log('匹配', loading)
  }
}

if (process.env.NODE_ENV === 'development') {
  genCodeApp.entry = 'http://localhost:8000'
}

const apps = [genCodeApp]
export default apps
