export function showToast(data: object) {
  // @ts-ignore
  window.showToast(data);
}

// 节流
export function throttle(fn: any, time: any) {
  let lastTime: any = null;
  let timer: any = null;
  return function (...args: any) {
    const context = this;
    clearTimeout(timer);
    if (+new Date() - lastTime > time) {
      fn.apply(context, args);
      lastTime = +new Date();
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, time);
    }
  };
}
