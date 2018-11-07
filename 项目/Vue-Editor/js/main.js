var singleText=new Vue( {

    el:'#singleText',
    data: {
        message:"sadsad",
        // todos:[

        // ],
        seen:false,
    },
    computed: {
        todos() {
          return [
            this.message,
            this.message,
            this.message
          ]
        }
    },
    methods:{
        say:function(event){
            console.log(event.target);
            alert(event.target.innerText);
        },
        revase:function(){
            this.message = this.message.split('').reverse().join('')
        }
    },
    components:{
        header:'#ddd'
    }
}
);
var a ={
    data(){
        alert("addsa");
    },
}