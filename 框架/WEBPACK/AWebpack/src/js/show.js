import str from './str.js'
import "../css/style.css"
import $ from 'jquery'
// require("../css/style.css");
// var $=require('jquery');
document.write(str("<h1>我是最棒的我</h1>"));
$('h1').html('ok');
$('h1').click(function(){
    alert('okasdsada!');
})