/**
 * 节流函数
 * @param {*} fn 
 * @param {*} delay
 */
export function Throttle (fn, delay) {
  var timer;
  return function () {
      var _this = this;
      // eslint-disable-next-line prefer-rest-params
      var args = arguments;
      if (timer) {
          return;
      }
      timer = setTimeout(function () {
          fn.apply(_this, args);
          timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
      }, delay);
  };
}
