# **script全面解析**

## **HTML4.01定义了六个属性：**



|  属性   |                        描述                         |
| :-----: | :-------------------------------------------------: |
|  async  |     表示应该立即下载脚本，不妨碍其他的页面操作      |
| charset |          表示通过src属性指定的代码的字符集          |
|  defer  |   表示脚本可以延迟到文档完全被解析和显示之后执行    |
|   src   |            表示要包含执行代码的外部文件             |
|  type   | 可看成是language的替代属性，默认指定text/javascript |

## **导入js文件的两种方式**

1. 直接写在html元素之中

```
<script type=’text/javascript’>
	function sayHi(){
		alert(‘Hi!’)
	}
</script>
```

2. 通过<script>元素来包含外部文件。

```
<script src=”example.js” type=’text/javascript’> </script>
```

## **存放标签的位置**

```
<html>
<head>
<title></title>
	<script>放在这里是在一开始就被加载，此时文档结构尚未形成。也会影响页面的展示
</head>
<body>
	<!--内容-->
	<script>放在这里是在页面元素加载完成之后执行，推荐放在这里。
<body>
</html>
```

## **延迟加载**

`defer="defer"`	在script标签中加上这行属性就会告诉浏览器立即下载，但是延迟执行，同将script标签放在页面底部的道理差不多。

`async` 也是script标签的属性，同样作用于外部脚本，同`defer=”defer”`差不多，但是不能确定导入的脚本的执行顺序，可能会导致后面的脚本先执行。

## **没有js的时候**

```
<noscript>本页面需要启用（javascript）</noscript>
```

