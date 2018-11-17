// 11,12,13,14,15,16,17,18,19,110,111,112,113
// 21,22,23,24,25,26,27,28,29,210,211,212,213
// 31,32,33,34,35,36,37,38,39,310,311,312,313
// 41,42,43,44,45,46,47,48,49,410,411,412,413
// 51,52
function CardInfo(card) {
  this.id = -1; //物理纸牌
  this.num = -1 // 物理大小
  this.color = -1; //物理花色
  this.weight = -1; //算法权重
  this.id = card;
  this.color = parseInt(String(card)[0]); //物理大小
  this.num = parseInt(String(card).slice(1)); //物理花色
  this.weight = [12,13,1,2,3,4,5,6,7,8,9,10,11][this.num-1];
  this.img=["♣","♦","♥","♠"][this.color]+this.num;
  this.magic=false;
  //花色>4为癞子
  if (this.color>4) {
    this.magic=true;
  }
}

CardInfo.prototype.deviceNum=function(){
  //分离单个纸牌
  return this.num;
}

CardInfo.prototype.configMagic=function(func){
  //分离单个纸牌
  if (func&&func(this.id)) {
    this.magic=true;
  }
}

CardType.prototype.deviceMagic=function(array){
  var painum=[];
  for (let i = 0; i < array.length; i++) {
    if (array[i].magic) {
      painum.push(array[i]);
      array.splice(i,1);
      i--;
    }
  }
  return painum;
}

//根据权重排序
CardType.prototype.weightSort=function(array){
  array.sort(function(a,b){
    return a.weight-b.weight;
  });
};

//分离出牌的物理大小
CardType.prototype.deviceId=function(array){
  var painum=[];
  for (let i = 0; i < array.length; i++) {
    painum[i]=array[i].id;
  }
  return painum;
}

//分离出牌的物理大小
CardType.prototype.deviceNum=function(array){
  var painum=[];
  for (let i = 0; i < array.length; i++) {
    painum[i]=array[i].num;
  }
  return painum;
}
//分离出牌的物理权重
CardType.prototype.deviceWeight=function(array){
  var painum=[];
  for (let i = 0; i < array.length; i++) {
    painum[i]=array[i].weight;
  }
  return painum;
}
//分离出牌的物理权重
CardType.prototype.deviceColor=function(array){
  var painum=[];
  for (let i = 0; i < array.length; i++) {
    painum[i]=array[i].color;
  }
  return painum;
}

CardType.prototype.maxNumber=function(array){
  var result=[];
  result=array.filter((v,i,s)=>{
    return array[0].num==v.num;
  });
  return result;
};
//获取最多的牌数量
CardType.prototype.allNumber=function(array){
  var card=[];
  var number=[]
  var num={};
  var result=[];
  array.forEach((v,i,s)=>{
    if (num[v]) {
      num[v]++;
    }else{
      num[v]=1;
    }
  });
  card=array.filter((v,i,s)=>{
    return array.indexOf(v)==i;
  });
  card.forEach((v,i)=>{
    number[i]=num[v];
  })
  var len=card.length;
  for (let i = 0; i < len; i++) {
    var obj={val:card[i],num:number[i]}
    result[i]=obj;
  }
  result.sort(function(a,b){
    return b.num-a.num;
  });
  return result;
};

CardType.prototype.checkSHUN=function(array){
  var result=1;
  for (let i = 1; i < array.length; i++) {
    if (array[i]!=array[i-1]+1) {
      result=0;
      break;
    }
  }
  return result;
}
CardType.prototype.convert=function(hand){
	if(!Config.convert) return hand;
	var result=[];
	var _from=Config.convertHand;
	// [
		// 1,2,3,4,5,6,7,8,9,10,11,12,13,
		// 21,22,23,24,25,26,27,28,29,30,31,32,33,
		// 41,42,43,44,45,46,47,48,49,50,51,52,53,
		// 61,62,63,64,65,66,67,68,69,70,71,72,73,
		// 101,102,
	// ];
	var _to=[
		11,12,13,14,15,16,17,18,19,110,111,112,113,
		21,22,23,24,25,26,27,28,29,210,211,212,213,
		31,32,33,34,35,36,37,38,39,310,311,312,313,
		41,42,43,44,45,46,47,48,49,410,411,412,413,
		51,52,
	];
	for (let i = 0; i < hand.length; i++) {
		var element = hand[i];
		var index=_from.indexOf(element);
		if (index==-1){
			throw "牌型错误"
		}
		result.push(_to[index]);
	}
	return result
};
//牌型构造
function CardType(hand,func) {
  let cards=[];
  hand=this.convert(hand);
  for (let i = 0; i < hand.length; i++) {
    var element = hand[i];
    cards[i]=new CardInfo(element);
    cards[i].configMagic(func);
  }
  this.cards=[].concat(cards);
  this.weightSort(this.cards);//权重排序
  this.device={
	  weight:this.deviceWeight(this.cards),
	  color:this.deviceColor(this.cards),
	  number:this.deviceNum(this.cards),
	  id:this.deviceId(this.cards),
  }
  this.check();
}

CardType.prototype.createType=function(type,cardWeight,weight,cardNum,cardColor,cardId){
  return {
    type:type,
    cardWeight:cardWeight,
    weight:weight,
    cardNum:cardNum,
	cardColor:cardColor,
	cardId:cardId,
  }
}

//检测牌型
CardType.prototype.checkTong=function(cards){
  cards=[].concat(cards);
  magic_cards=[].concat(this.magicCard);
  var cardsWE=this.deviceWeight(cards);
  var cardsCO=this.deviceColor(cards);
  var cardsNU=this.deviceNum(cards);
  var cardsID=this.deviceId(cards);
  var allNum=this.allNumber(cardsWE);//牌数
  var maxNum=this.maxNumber(allNum);//多数;
  
  var result;
  if (cards.length==0) {
    return;
  }
  var number=allNum[0].num;
  switch (number) {
    case 1:
      if (allNum.length>=3
        &&allNum.length==maxNum.length
        &&this.checkSHUN(cardsWE)
        && allNum[ allNum.length-1].val<13) {
        // console.log("顺子", cardsWE);
        result=this.createType("shun"+allNum.length,1,cardsWE[0],this.device.number,this.device.color,this.device.id);
      }else if ( allNum.length==1&& allNum.length== maxNum.length) {
        // console.log("单", cardsWE);
        result=this.createType("dan",1,cardsWE[0],this.device.number,this.device.color,this.device.id);
      }
      break;
    case 2:
      if ( allNum.length==1&& maxNum.length==1) {
        if ( maxNum[0].num==2) {
          // console.log("对", cardsWE);
          result=this.createType("dui",1,cardsWE[0],this.device.number,this.device.color,this.device.id);
        }
      }
      if ( allNum.length>=2
        && allNum[ allNum.length-1].num==2
        && allNum.length== maxNum.length) {
          var card= cardsWE.filter((v,i,s)=>{
            return  cardsWE.indexOf(v)==i;
          });
          if (this.checkSHUN(card)&&card[card.length-1]<13) {
            // console.log("对顺", cardsWE);
            result=this.createType("duishun"+card.length,1,cardsWE[0],this.device.number,this.device.color,this.device.id);
          }
      }
      break;
    case 3:
      if ( allNum.length>1
        && allNum[ allNum.length-1].num==3) {
          var card= cardsWE.filter((v,i,s)=>{
            return  cardsWE.indexOf(v)==i;
          });
          if (this.checkSHUN(card)&&card[card.length-1]<13) {
            // console.log("三顺",cardsWE);
            result=this.createType("sanshun"+card.length,1,cardsWE[0],this.device.number,this.device.color,this.device.id);
          }
      }else if ( allNum.length==1&& maxNum.length==1) {
        if ( maxNum[0].num==3) {
          // console.log("三张", cardsWE);
          result=this.createType("zha",2,cardsWE[0],this.device.number,this.device.color,this.device.id);
        }
      }
      break;
    case 4:
      if ( allNum.length==1&& maxNum.length==1) {
        if ( maxNum[0].num==4) {
          // console.log("炸弹", cardsWE);
          result=this.createType("zha",3,cardsWE[0],this.device.number,this.device.color,this.device.id);
        }
      }
      break;
    case 5:
      if ( allNum.length==1&& maxNum.length==1) {
        if ( maxNum[0].num==5) {
          // console.log("炸弹", cardsWE);
          result=this.createType("zha",4,cardsWE[0],this.device.number,this.device.color,this.device.id);
        }
      }
      break;
    case 6:
      if ( allNum.length==1&& maxNum.length==1) {
        if ( maxNum[0].num==6) {
          // console.log("炸弹", cardsWE);
          result=this.createType("zha",5,cardsWE[0],this.device.number,this.device.color,this.device.id);
        }
      }
      break;
  }
  if (result) {
    return result;
  }
};

CardType.prototype.checkDai=function(cards){
  //判断3+1,3+2,3+3+4,3+3+3+6
  //判断4+1,4+2
  cards=[].concat(cards);
  magic_cards=[].concat(this.magicCard);
  var cardsWE=this.deviceWeight(cards);
  var cardsCO=this.deviceColor(cards);
  var cardsNU=this.deviceNum(cards);
  var cardsID=this.deviceId(cards);
  var allNum=this.allNumber(cardsWE);//牌数
  var maxNum=this.maxNumber(allNum);//多数;
  var result;
  
  if (result) {
    return result;
  }
}

CardType.prototype.checkGod=function(cards){
  cards=[].concat(cards);
  magic_cards=[].concat(this.magicCard);
  var cardsWE=this.deviceWeight(cards);
  var cardsCO=this.deviceColor(cards);
  var cardsNU=this.deviceNum(cards);
  var cardsID=this.deviceId(cards);
  var allNum=this.allNumber(cardsWE);//牌数
  var maxNum=this.maxNumber(allNum);//多数;
  var result;
  if (magic_cards.length==2&&cards.length==0) {
    result=this.createType("god",100,cardsWE[0],cardsWE);
  }
  if (result) {
    return result;
  }
}


CardType.prototype.checkMagic=function(){
  var magicType;
  var test_cards=[11,12,13,14,15,16,17,18,19,110,111,112,113];
  var magicLen=this.magicCard.length;//癞子长度
  var cardsLen=this.cards.length;//癞子长度
  if (magicLen==1&&cardsLen!=0) {
    var maybe=[];
    for (let i = 0; i < test_cards.length; i++) {
      var cards=[].concat(this.cards);
      cards.push(new CardInfo(test_cards[i]));
      var type=this.checkAll(cards);
      if (type&&type!=='error') {
          maybe.push(type);
        }
    }
    maybe.sort(function(a,b){
      return a.cardWeight-b.cardWeight;
    });
    magicType=maybe[maybe.length-1];
  }
  if (magicLen==2&&cardsLen!=0) {
    var maybe=[];
    magic:{
      for (let i = 0; i < test_cards.length; i++) {
        var cards=[].concat(this.cards);
        cards.push(new CardInfo(test_cards[i]));
        for (let j = 0; j < test_cards.length; j++) {
          var ccc=[].concat(cards);
          ccc.push(new CardInfo(test_cards[j]));
          var type=this.checkAll(ccc);
          if (type&&type!=='error'&&type.type) {
              maybe.push(type);
            }
        }
      }
    }
    maybe.sort(function(a,b){
      return a.cardWeight-b.cardWeight;
    });
    magicType=maybe[maybe.length-1];
  }
  return magicType;
}

CardType.prototype.checkAll=function(cards){
  this.weightSort(cards);
  var type=this.checkTong(cards);
  (!type)&&(type=this.checkGod(cards));
  return type=type||'error';
}

CardType.prototype.check=function(){
  this.magicCard=this.deviceMagic(this.cards);//分离癞子
  var type=this.checkAll(this.cards);//判断牌型
  var magicType=this.checkMagic();//检测癞子能组的最大类型
  this.type=type||'error';
  // this.magicType=magicType||'error';
  (magicType)&&(this.type=magicType);//癞子类型覆盖
}


var Battle={};

Battle.check=function(Arr){
  Arr=new CardType(Arr);
  var arrType=Arr.type;
  if (arrType!=='error') {
	  console.log(arrType);
    return true;
  }
  return false;
};

Battle.beat=function(prevArr,nextArr){
  // console.log=function(...aa){}
  prevArr=new CardType(prevArr);
  nextArr=new CardType(nextArr);
  var prevType=prevArr.type;
  var nextType=nextArr.type;
  if (prevType&&nextType) {
    if (prevType.cardWeight==nextType.cardWeight) {
      if (prevType.type==nextType.type) {
        if (prevType.cardNum.length==nextType.cardNum.length) {
          if (prevType.weight>nextType.weight) {
            return true;
          }
        }
      }
    }else if (prevType.cardWeight>nextType.cardWeight) {
      return true;
    }
  }
  return false;
};

Battle.gdybeat=function(prevArr,nextArr){
  // console.log=function(...aa){}
  prevArr=new CardType(prevArr);
  nextArr=new CardType(nextArr);
  var prevType=prevArr.type;
  var nextType=nextArr.type;
  if (prevType&&nextType) {
    if (prevType.cardWeight==nextType.cardWeight) {
      if (prevType.type==nextType.type) {
        if (prevType.cardNum.length==nextType.cardNum.length) {
          if (prevType.weight>nextType.weight&&prevType.weight==13) {
            return true;
          }
		  if (prevType.weight>nextType.weight&&(prevType.weight-nextType.weight)==1) {
            return true;
          }
        }
      }
    }else if (prevType.cardWeight>nextType.cardWeight) {
      return true;
    }
  }
  return false;
};


var Config={
	
	convert:1,//牌的转换,
	//前提:牌的转换,
	convertHand:[
		1,2,3,4,5,6,7,8,9,10,11,12,13,
		21,22,23,24,25,26,27,28,29,30,31,32,33,
		41,42,43,44,45,46,47,48,49,50,51,52,53,
		61,62,63,64,65,66,67,68,69,70,71,72,73,
		101,102,
	]
}



//API

//算法内置牌型 Config.convert=0
// Battle.check([51,52,13,14,15,16,17,110]);//true表示牌型正确
// Battle.gdybeat([12],[11]);//true表示左边压制右边,其他表示牌型不对或右边压制左边
//服务器牌型 Config.convert=1
console.time("god");
console.log(Battle.check([101,102,3,4,5,6,7,8,10,11,12]));//true表示牌型正确
console.log(Battle.gdybeat([2],[1]));//true表示左边压制右边,其他表示牌型不对或右边压制左边
console.timeEnd("god");