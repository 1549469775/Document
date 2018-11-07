# Vue.js 起步

## 起步

我们以 Vue 数据绑定的快速导览开始。如果你对高级概述更感兴趣，可查看这篇[博文](http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/)。

尝试 Vue.js 最简单的方法是使用 [JSFiddle Hello World 例子](https://jsfiddle.net/yyx990803/okv0rgrk/)。在浏览器新标签页中打开它，跟着我们查看一些基础示例。如果你喜欢用包管理器下载/安装，查看安装教程。

### Hello World

```
<div id="app">
  {{ message }}
</div>
```

```
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
```

```
{% raw %}
<div id="app" class="demo">
  {{ message }}
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
</script>
{% endraw %}
```

![1539273980020](assets/1539273980020.png)

### 双向绑定

```
<div id="app">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
```

```
{% raw %}
<div id="app" class="demo">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
</script>
{% endraw %}
```

![1539273942538](assets/1539273942538.png)

### 渲染列表

```
<div id="app">
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</div>
```

```
new Vue({
  el: '#app',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ]
  }
})
```

```
{% raw %}
<div id="app3" class="demo">
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</div>
<script>
new Vue({
  el: '#app3',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ]
  }
})
</script>
{% endraw %}
```

![1539273909062](assets/1539273909062.png)

### 处理用户输入

```
<div id="app">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

```
{% raw %}
<div id="app4" class="demo">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
<script>
new Vue({
  el: '#app4',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
{% endraw %}
```

![1539274055768](assets/1539274055768.png)![1539274064325](assets/1539274064325.png)

### 综合

```
<div id="app">
  <input v-model="newTodo" v-on:keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos">
      <span>{{ todo.text }}</span>
      <button v-on:click="removeTodo($index)">X</button>
    </li>
  </ul>
</div>
```

```
new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      { text: 'Add some todos' }
    ]
  },
  methods: {
    addTodo: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text })
        this.newTodo = ''
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    }
  }
})
```

```
{% raw %}
<div id="app5" class="demo">
  <input v-model="newTodo" v-on:keyup.enter="addTodo">
  <ul>
    <li v-for="todo in todos">
      <span>{{ todo.text }}</span>
      <button v-on:click="removeTodo($index)">X</button>
    </li>
  </ul>
</div>
<script>
new Vue({
  el: '#app5',
  data: {
    newTodo: '',
    todos: [
      { text: 'Add some todos' }
    ]
  },
  methods: {
    addTodo: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text })
        this.newTodo = ''
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    }
  }
})
</script>
{% endraw %}
```

![1539274135810](assets/1539274135810.png)