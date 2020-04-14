import { Icon } from 'antd';
import setting from '@/setting';
// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({
  scriptUrl: setting.iconfontUrl,
});
