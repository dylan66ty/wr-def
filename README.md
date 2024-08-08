# 介绍
提取使用webpack项目中所有模块。可拿到内置方法，做一些有意思的事情🤔。


**以后只维护这个版本，以前的版本不在维护**


# 安装

```bash
npm i wr-def 
```

# 使用 

```js
import { intercept_webpack_modules } from 'wr-def'

const exposedModule= (module) => {
    console.log(module)
}

const allModuleIds = [模块id...]

intercept_webpack_modules('webpackJson', exposedModule,allModuleIds)
```

# 注意

### intercept_webpack_modules 参数解释
####  参数1 
- webpackJson，打开chrome控制台，输入webpack一般都能找到
- 例如discord网站就是 webpackChunkdiscord_marketing

#### 参数2
- 回调函数，module load完成后回掉。打印下看看就知道了。

#### 参数3
- 模块的所有id
- 你需要hook的一些行为（比如 发送消息、切换联系人），先在页面上操作（为了能看到动态模块id）。然后在chrome控制套中执行 Reflect.ownKeys(__$modules)， 将所有的模块id作为第三个参数。（第一次你也不知道模块id是什么，那么你就传空数组）
 
 
### intercept_webpack_modules 什么时候执行
 - intercept_webpack_modules方法要尽快执行，不然hook不到module
 - 例如在electron项目中，必须要在页面加载之前执行




