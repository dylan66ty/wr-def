# 介绍
webpack的web项目，可以拿到webpack打包后所有模块。无需改网页源码或者拦截重定向。

# 安装

```bash
npm i wr-def 
```

# 使用 

```js
import {intercept_webpack_modules, visitor} from 'wr-def'

intercept_webpack_modules('__webpack_chunks__', visitor({
  element(el){
    console.log('el', el);
  },
  module(module){
    console.log('module', module);
  },
  function(key, value, exports){
    console.log('class' ,key, class);
  },
  object(key,method){
    console.log('object',key, method);
  }
}))


// 异步模块 
intercept_webpack_modules('__webpack_chunks__', visitor({
  element(el){
    console.log('el', el);
  },
  module(module){
    console.log('module', module);
  },
  function(key, value, exports){
    console.log('class' ,key, class);
  },
  object(key,method){
    console.log('object',key, method);
  }
}, [异步模块id]))

```