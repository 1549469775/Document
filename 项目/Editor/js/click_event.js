var event=(function(params) {
    //点击添加按钮
    var item_add=function(){
        var self=$(this);
        self.text("");
        var text=document.createElement('input');
        text.setAttribute("type","text");    
        text.addEventListener('click',function(e){
            e.stopPropagation();//阻止事件冒泡即可
            setTimeout(text.focus,1000);
        });
        text.addEventListener('blur',function(e){
            if ($(text).val()=="") {
                e.stopPropagation();//阻止事件冒泡即可
                $('.list li .add').empty();
                $('.list li .add').text("添加");
            }
        });
        var comfrim=document.createElement('button');
        comfrim.setAttribute("class","comfrim");
        comfrim.innerHTML='确认';
        comfrim.addEventListener('click',function(){
            list.addTitle($(text).val());
            $('form select').append("<option>"+$(text).val()+"</option>");
        });
        var cancul=document.createElement('button');
        cancul.setAttribute("class","cancul");
        cancul.innerHTML='取消';
        cancul.addEventListener('click',function(event){
            event.stopPropagation();//阻止事件冒泡即可
            $('.list li .add').empty();
            $('.list li .add').text("添加");
        });
        self.append(text);
        self.append(comfrim);
        self.append(cancul);
        text.focus();
    };

    var item_click=function(self){
        var parent=$(self).parent();
        parent.find('.content').toggle();
        if (parent.find('.content').css('display')=='none') {
            parent.find('.title .icon').html("of");
            
        }else{
            parent.find('.title .icon').html("on");
            
        }
    };
    var item_check=function(self){
        var ele=$(self).find('input[type="checkbox"]')
        if (ele.attr("checked")=='true'||ele.attr("checked")=='checked') {
            ele.removeAttr("checked");
            $(self).removeClass('del');
        }else{
            $(self).addClass('del');
            ele.attr("checked",'true');//'.list li .content .content-list input[type="checkbox"]'
        }
    };

    var add_panel={};
    add_panel.item_add=item_add;
    add_panel.item_click=item_click;
    add_panel.item_check=item_check;
    return {
        add_panel:add_panel,
    }
})();