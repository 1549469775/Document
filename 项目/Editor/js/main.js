
var data=(function initData(){
    var data1=[{
        id:0,
        content:"世dsad界",
    },{
        id:1,
        content:"世fasfs界",
    },{
        id:2,
        content:"世fsafsaf界",
    },{
        id:4,
        content:"世fsafsaf界",
    },{
        id:3,
        content:"dfsfdsfs",
    },{
        id:3,
        content:"dfsfdsfs",
    }];
    var data2=[{
        id:0,
        title:"世界1",
    },{
        id:1,
        title:"世界2",
    },{
        id:2,
        title:"世界3",
    },{
        id:2,
        title:"世界4",
    },{
        id:2,
        title:"世界5",
    },{
        id:2,
        title:"世界6",
    },{
        id:2,
        title:"世界7",
    }];
    return {
        data1:[],
        data2:[],
    }
})();

$(document).ready(function(){
    initAll();
});

function initAll() {
    $('.list li .add').click(event.add_panel.item_add);
    $('.list li').on('click','.title',function(){ //.not(":last")
        event.add_panel.item_click(this);
        // $('body').append("aaaaa")
        return false;
    });
    $('.list li .content').on('click','.content-list',function(){ //.not(":last")
        event.add_panel.item_check(this);
        return false;
    });
    for (var i = 0; i < data.data2.length; i++) {
        $('form select').append("<option>"+data.data2[i].title+"</option>");
    }
    for (var i = 0; i < data.data2.length; i++) {
        list.addTitle(data.data2[i].title);
    }
    for (var i = 0; i < data.data1.length; i++) {
        list.addBody(data.data1[i].id,data.data1[i].content);
    }
    $('form input[type="submit"]').click(function(){
        // console.log($("select option:selected").text());
        var index=$('select').prop('selectedIndex');
        if ($('select').prop('selectedIndex')==-1) {
            alert("添加失败");
            return false;
        }
        list.addBody(index,$('form input[type="text"]').val());
        $('form input[type="text"]').text('');
        return false;
    });
}

function List() {
    var self=$('.list');
    var self_ul=self.find('ul');
    var self_ul_li=self.find('ul li');
    var self_ul_last_li=self.find('ul li:last');
    this.length=self_ul_li.length-1;
    this.addTitle=function(name){
        if (name&&name!='') {
            var last_li=self.find('ul li');
            console.log(last_li);
            if (last_li.length>1) {
                var li=$("<li></li>");
                var wrap=$("<a></a>");
                wrap.addClass('title');
                wrap.attr('href',"javascript:");
                wrap.html(name+'<span class="icon">of</span>');
                var content=$("<div></div>");
                content.addClass('content');
                li.append(wrap);
                li.append(content);
                self_ul_last_li.prev().after(li);
            }else{
                var li=$("<li></li>");
                var wrap=$("<div></div>");
                wrap.addClass('title');
                wrap.attr('href',"javascript:");
                wrap.html(name+'<span class="icon">of</span></a>');
                var content=$("<div></div>");
                content.addClass('content');
                li.append(wrap);
                li.append(content);
                last_li.parent().prepend(li);
            }
            this.length+=1;
        }
    }
    this.addBody=function(id,content){
        console.log(id,this.length);
        if (id>=this.length) {
            console.log("ERROR");
            return;
        }
        var html=`<div class="content-list"><input type="checkbox" class="left">`+content+`</div>`;
        console.log($('.list').find('ul li').get(id));
        $($('.list').find('ul li').get(id)).find('.content').append($(html));
    }
}
var list=new List();


