# vuex

## 问题

如果你在使用 `vue.js` , 那么我想你可能会对 vue 组件之间的通信感到崩溃 。

我在使用基于 vue.js 2.0 的UI框架 `ElementUI` 开发网站的时候 , 就遇到了这种问题 : 一个页面有很多表单 , 我试图将表单写成一个单文件组件 , 但是表单 ( 子组件 ) 里的数据和页面 ( 父组件 ) 按钮交互的时候 , 它们之间的通讯很麻烦 :

```
<!--父组件中引入子组件-->
<template>
  <div>
    <a href="javascript:;" @click="show = true">点击</a>
    <t-dialog :show.sync="show"></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  data(){
    return {
      show:false
    }
  },
  components:{
    "t-dialog":dialog
  }
}
</script>


<!--子组件-->
<template>
  <el-dialog :visible.sync="currentShow"></el-dialog>
</template>

<script>
export default {
  props:['show'],
  computed:{
      currentShow:{
          get(){
              return this.show
          },
          set(val){
              this.$emit("update:show",val)
          }
      }
  }
}
</script>

```

之所以这么麻烦 , 是因为父组件可以通过 `props` 给子组件传递参数 , 但子组件内却不能直接修改父组件传过来的参数。

这时候 , 使用 `vuex` 就可以比较方便的解决这种问题了 :

```
<!--父组件中引入子组件-->
<template>
  <div>
    <a href="javascript:;" @click="$store.state.show = true">点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  components:{
    "t-dialog":dialog
  }
}
</script>


<!--子组件-->
<template>
  <el-dialog :visible.sync="$store.state.show"></el-dialog>
</template>

<script>
export default {}
</script>

```

是不是方便了许多 , 这就是 vuex 最简单的应用 , 不要被网上其他教程吓到 , vuex 原来可以这么简单 !

## 安装、使用 vuex

首先我们在 vue.js 2.0 开发环境中安装 vuex :

```
npm install vuex --save
```

然后 , 在 `main.js` 中加入 :

```
import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        show:false
    }
})
```

再然后 , 在实例化 Vue对象时加入 store 对象 :

```
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
```

完成到这一步 , 上述例子中的 `$store.state.show` 就可以使用了。

## modules

前面为了方便 , 我们把 store 对象写在了 main.js 里面 , 但实际上为了便于日后的维护 , 我们分开写更好 , 我们在 `src` 目录下 , 新建一个 `store` 文件夹 , 然后在里面新建一个 `index.js` :

```
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        show:false
    }
})
```

那么相应的 , 在 main.js 里的代码应该改成 :

```
//vuex
import store from './store'

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
```

这样就把 store 分离出去了 , 那么还有一个问题是 : 这里 `$store.state.show` 无论哪个组件都可以使用 , 那组件多了之后 , 状态也多了 , 这么多状态都堆在 store 文件夹下的 `index.js` 不好维护怎么办 ?

我们可以使用 vuex 的 `modules` , 把 store 文件夹下的 `index.js` 改成 :

```
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import dialog_store from '../components/dialog_store.js';//引入某个store对象

export default new vuex.Store({
    modules: {
        dialog: dialog_store
    }
})
```

这里我们引用了一个 `dialog_store.js` , 在这个 js 文件里我们就可以单独写 dialog 组件的状态了 :

```
export default {
    state:{
        show:false
    }
}
```

做出这样的修改之后 , 我们将之前我们使用的 `$store.state.show` 统统改为 `$store.state.dialog.show`即可。

如果还有其他的组件需要使用 vuex , 就新建一个对应的状态文件 , 然后将他们加入 store 文件夹下的 index.js 文件中的 `modules` 中。

```
modules: {
    dialog: dialog_store,
    other: other,//其他组件
}
```

## mutations

前面我们提到的对话框例子 , 我们对vuex 的依赖仅仅只有一个 `$store.state.dialog.show` 一个状态 , 但是如果我们要进行一个操作 , 需要依赖很多很多个状态 , 那管理起来又麻烦了 !

`mutations` 登场 , 问题迎刃而解 :

```
export default {
    state:{//state
        show:false
    },
    mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    }
}
```

使用 mutations 后 , 原先我们的父组件可以改为 :

```
<template>
  <div id="app">
    <a href="javascript:;" @click="$store.commit('switch_dialog')">点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  components:{
    "t-dialog":dialog
  }
}
</script>
```

使用 `$store.commit('switch_dialog')` 来触发 `mutations` 中的 `switch_dialog` 方法。

这里需要注意的是:

1. `mutations` 中的方法是不分组件的 , 假如你在 dialog_stroe.js 文件中的定义了
   `switch_dialog` 方法 , 在其他文件中的一个 `switch_dialog` 方法 , 那么
   `$store.commit('switch_dialog')` 会执行所有的 `switch_dialog` 方法。
2. `mutations`里的操作必须是同步的。

你一定好奇 , 如果在 `mutations` 里执行异步操作会发生什么事情 , 实际上并不会发生什么奇怪的事情 , 只是官方推荐 , 不要在 `mutationss` 里执行异步操作而已。

