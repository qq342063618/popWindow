# popWindow
页面弹窗插件popWindow.js

#用法
1.属性调用
  在目标元素添加属性data-pop-param,值格式为{宽,高,http路径},例如<h1 data-pop-param="50%,200px,http://example.com">Example</h1>
2.js调用
  全局对象_pop_win有2个方法可供调用
  _pop_close():关闭页面中的弹窗,例_pop_win._pop_close();
  _html_pop(data, str):其中data为{宽,高}字符串,str为html字符串或者页面元素的id,例_pop_win._html_pop("1px,1px","<i></i>")，_pop_win._html_pop("1px,1px","id")
