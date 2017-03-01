/**
 * Created by XHJ on 2016/8/25.
 */
String.prototype.startWith = function(str){
  if(this.indexOf(str) == 0){
    return true;
  }
  else{ return false}
};
function getDom(dom){
  var dom = arguments[0];
  if(dom.startWith('#') == true){
    dom = dom.substr(1);
    return document.getElementById(dom);
  }
  if(dom.startWith('.') == true){
    dom = dom.substr(1);
    return document.getElementsByClassName(dom);
  }
  if(dom.startWith('[') == true){
    dom = dom.substr(1).substr(0, dom.length - 2);
    return document.getElementsByName(dom);
  }
  var tagStr = /^(\w)+/;
  if(dom.match(tagStr)){
    return document.getElementsByTagName(dom);
  }
  else{ alert('shit'); return;}
}
function getById(id){
  return document.getElementById(id);
}
function ifOldIE(minVersion){
  var msg = navigator.userAgent.toLowerCase();
  var regStrIE = /msie [\d.]+;/gi;
  if(minVersion > 11 && msg.indexOf("trident") > 0){//ie11
    return true;
  }
  if(msg.indexOf("msie") > 0){
    msg = msg.match(regStrIE);
    var versionNum = msg.toString().replace(/[^0-9.]/ig,"");
    versionNum = parseInt(versionNum);
    if(versionNum < minVersion){
      return true;
    }
    else{ return false}
  }
  else{ return false;}
}
function getUC(){
  var msg = navigator.userAgent.toLowerCase();
  if(msg.indexOf('ucbrowser') > 0){
    return true;
  }
  else{ return false}
}

function BezierCurve(id, endFrame, speed, lineQuantity, x1, y1, x2, y2, x3, y3, x4, y4){
  this.canvas = getDom(id);
  this.$ = this.canvas.getContext('2d');
  this.width;
  this.height;
  this.pointArr;
  this.hslaH;
  this.frame;
  this.endFrame = endFrame;
  this.speed = speed;
  this.speedTemp = speed;
  this.lineQuantity = lineQuantity;
  this.timeOut;
}
BezierCurve.prototype = {
  ready : function() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.hslaH = Math.ceil(Math.random() * 10) * 30;
    this.$.globalAlpha = 0.01;
    this.pointArr = [];
    this.frame = 0;
    this.speed = this.speedTemp;
    for (var i = 0; i <= this.lineQuantity; i++) {
      this.pointSet();
    }
    this.paintFrame();
  }
  ,pointSet : function(){
    this.pointArr.push({
      x1 : this.width
      ,y1 : this.height
      ,x2 : this.width - Math.random() * this.width
      ,y2 : this.height - Math.random() * this.height
      ,x3 : this.width - Math.random() * this.width
      ,y3 : this.height - Math.random() * this.height
      ,x4 : -this.width + Math.random() * this.width
      ,y4 : -this.height + Math.random() * this.height
      ,random1 : Math.random() * 10
      ,random2 : Math.random() * 10
      ,random3 : Math.random() * 10
    });
  }
  ,paintFrame : function(){
    /*clear();*/
    ++this.frame;//标记当前帧
    this.hslaH -= 0.3;//色调取值0~360，负值等于360减绝对值
    var temp,sin1,sin2,sin3,sin4;
    for(var i in this.pointArr){//遍历绘制每一条线
      temp = this.pointArr[i];
      sin1 = Math.sin(temp.random3 += 0.001) * 0.3;
      sin2 = Math.sin(temp.random1 -= 0.001);
      sin3 = Math.sin(temp.random2 += 0.001);
      sin4 = Math.sin(temp.random3 -= 0.001);
      temp.x1 -= sin1;
      temp.y1 += sin1;
      temp.x2 *= sin2;
      temp.y2 *= sin2;
      temp.x3 -= sin3;
      temp.y3 += sin3;
      temp.x4 -= sin4;
      temp.y4 += sin4;
      /*this.$.save();*/
      this.$.beginPath();
      this.$.moveTo(temp.x1, temp.y1);
      this.$.bezierCurveTo(temp.x2, temp.y2, temp.x3, temp.y3, temp.x4, temp.y4);
      /*      this.$.moveTo(temp.x1, temp.y1);
       this.$.bezierCurveTo(temp._x12, temp._y12, temp._x22, temp._y22, temp.x22, temp.y22);*/
      this.$.strokeStyle = 'hsla(' + this.hslaH + ', 85%, 60%, .7)';
      this.$.stroke();
      this.$.closePath();
      /*this.$.restore();*/
    }
    if(this.frame <= 180){
      this.timeOut = setTimeout(this.paintFrame.bind(this), this.speed);
    }
    else{
      ++this.speed;
      if(this.frame <= this.endFrame){
        this.timeOut = setTimeout(this.paintFrame.bind(this), this.speed);
      }
    }
  }
  ,clear : function(){
    this.$.clearRect(0, 0, this.width, this.height);
  }
  ,start : function(){
    this.clear();
    this.ready();
  }
  ,addListener : function(){
    var body = document.getElementsByTagName('body');
    body[0].addEventListener('click', function(){
      clearTimeout(this._timeout);
      this.start();
    }.bind(this), false);//this重定向
    window.addEventListener('resize', function(){
      clearTimeout(this._timeout);
      this.start();
    }.bind(this), false);
  }
}


function PopArtCircle(id, density, circleSpace, circleRadius, colorBG, color, changeTime){
  this.canvas = getDom(id);
  this.$ = this.canvas.getContext('2d');
  this.width;
  this.height;
  this.density = density;
  this.space = circleSpace;
  this.radius = circleRadius;
  this.space_theCentreOfACircle;
  this.soc;
  this.colorBG = colorBG;
  this.color = color;
  this.time = changeTime;
  this.startPoint;
  this.maxXPoint;
  this.maxYPoint;
  this.timeOut;
}
PopArtCircle.prototype = {
  set : function(){
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.soc = this.space_theCentreOfACircle = this.radius + this.space + this.radius;
    this.startPoint = this.space + this.radius;
    this.maxXPoint = this.width - this.space - this.radius;
    this.maxYPoint = this.height - this.space - this.radius;
    this.paint();
  }
  ,paint : function(){
    this.$.clearRect(0, 0, this.width, this.height);
    for(var x = this.startPoint;x <= this.maxXPoint;x += this.soc){
      for(var y = this.startPoint;y <= this.maxYPoint;y += this.soc){
        this.$.beginPath();
        this.$.arc(x, y, this.radius, 0, 360, false);
        this.$.fillStyle = this.colorBG;
        if(Math.random() * 3 < this.density){
          this.$.fillStyle = this.color;
        }
        this.$.fill();
        this.$.closePath();
      }
    }
    this.timeOut = setTimeout(this.paint.bind(this), this.time);
  }
  ,start : function(){
    this.set();
  }
}


function Atom(id, pointNum, maxRadius, minRadius, frameTime){
  this.canvas = getDom(id);
  this.$ = this.canvas.getContext('2d');
  this.width;
  this.height;
  this.pointNum = pointNum;
  this.maxRadius = maxRadius;
  this.minRadius = minRadius;
  this.circleArr = [];
  this.timeOut;
  this.frameTime = frameTime;
}
Atom.prototype = {
  start : function(){
    this.ready();
  }
  ,ready : function(){
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    for(var i = 0;i < this.pointNum;i++){
      this.circleArr.push(this.getCricleArr(this.getRandom(this.width), this.getRandom(this.height)
        ,this.getRandom(this.maxRadius, this.minRadius), this.getRandom(10, -10) / 50, this.getRandom(10, -10) / 50));
    }
    this.move();
  }
  ,getCricleArr : function(x, y, r, moveX, moveY){
    var circleArr = new this.setCricleArr(x, y, r, moveX, moveY);
    return circleArr;
  }
  ,setCricleArr : function(x, y, r, moveX, moveY){
    this.x = x;
    this.y = y;
    this.r = r;
    this.moveX = moveX;
    this.moveY= moveY;
  }
  ,getRandom : function(max, min){
    var min = arguments[1] || 0;
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  ,move : function(){
    var temp;
    for(var i = 0;i < this.pointNum;i++){
      temp = this.circleArr[i];
      temp.x += temp.moveX;
      temp.y += temp.moveY;
      if( temp.x > this.width){ temp.x = 0;}
      else{
        if( temp.x < 0){ temp.x = this.width;}
      }
      if( temp.y > this.height){ temp.y = 0;}
      else{
        if( temp.y < 0){ temp.y = this.height;}
      }
    }
    this.paintCircle();

    var temp1
      ,temp2;
    for (var i = 0; i < this.pointNum; i++) {
      temp1 = this.circleArr[i];
      for (var j = i + 1; j < this.pointNum; j++) {
        temp2 = this.circleArr[j];
        var point1 = Math.abs(temp2.x - temp1.x)
          ,point2 = Math.abs(temp2.y - temp1.y);
        var lineLength = Math.sqrt(point1 * point1 + point2 * point2);
        var lineOpacity = 20 / lineLength;
        this.paintLine(temp1.x, temp1.y, temp2.x, temp2.y, lineOpacity);
      }
    }
    this.timeOut = setTimeout(this.move.bind(this), this.frameTime);
  }
  ,paintCircle : function(){
    this.$.clearRect(0, 0, this.width, this.height);
    var temp;
    for(var i = 0;i < this.pointNum;i++){
      temp = this.circleArr[i];
      this.$.beginPath();
      this.$.arc(temp.x, temp.y, temp.r, 0, 2 * Math.PI);
      this.$.fillStyle = '#dddddd';
      this.$.fill();
      this.$.closePath();
    }
  }
  ,paintLine : function(point1X, point1Y, point2X, point2Y, lineOpacity){
    this.$.beginPath();
    this.$.moveTo(point1X, point1Y);
    this.$.lineTo(point2X, point2Y);
    this.$.strokeStyle = 'rgba(136,136,136,'+ lineOpacity +')';
    this.$.stroke();
    this.$.closePath();
  }
}
/*function Atom(id){
  this.canvas = getById(id);
  this.$ = this.canvas.getContext('2d');
  this.width;
  this.height;
  this.point1X;
  this.point1Y;
  this.point2X;
  this.point2Y;
  this.point3X;
  this.point3Y;
  this.point4X;
  this.point4Y;
  this.point5X;
  this.point5Y;
}
Atom.prototype = {
  set : function(){
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.point1X = 4 / 5 * this.width * Math.random() + 50;
    this.point1Y = 4 / 5 * this.height * Math.random() + 50;
    this.point2X = this.point1X + 100 * Math.random() + 100;
    this.point2Y = this.point1Y + 200 * Math.random() + 100;
    this.point3X = this.point1X - 200 * Math.random() - 100;
    this.point3Y = this.point1Y + 200 * Math.random() + 100;
    this.point4X = this.point1X + 200 * Math.random() + 150;
    this.point4Y = this.point1Y + 100 * Math.random() + 50;
    this.point5X = this.point1X - 200 * Math.random() - 150;
    this.point5Y = this.point1Y - 200 * Math.random() + 50;
    this.paint();
  }
  ,paint : function(){
    this.$.beginPath();
    this.$.moveTo(this.point1X, this.point1Y);
    this.$.lineTo(this.point2X, this.point2Y);
    this.$.moveTo(this.point1X, this.point1Y);
    this.$.lineTo(this.point3X, this.point3Y);
    this.$.moveTo(this.point1X, this.point1Y);
    this.$.lineTo(this.point4X, this.point4Y);
    this.$.moveTo(this.point1X, this.point1Y);
    this.$.lineTo(this.point5X, this.point5Y);

    this.$.moveTo(this.point2X, this.point2Y);
    this.$.lineTo(this.point3X, this.point3Y);
    this.$.moveTo(this.point3X, this.point3Y);
    this.$.lineTo(this.point5X, this.point5Y);
    this.$.moveTo(this.point5X, this.point5Y);
    this.$.lineTo(this.point4X, this.point4Y);
    this.$.moveTo(this.point4X, this.point4Y);
    this.$.lineTo(this.point2X, this.point2Y);


    this.$.strokeStyle = '#eeeeee';

    this.$.stroke();
    this.$.closePath();
  }
  ,move : function(){

  }
}*/


function opacityChange(id, opacity, time){
  this.div = getDom(id);
  this.opacity = opacity;
  this.time = time;
  this.changeNum = this.opacity - this.div.opacity;
  this.speed = time * 1000 / (Math.abs(this.changeNum)) * 100;
}
opacityChange.prototype = {
  show : function(){
    if(ifOldIE(10) == true){
      this.showJS();
    }
    else{
      this.div.style.transition = 'opacity ' + this.time + 's';
      this.div.style.opacity = this.opacity;
    }
  }
  ,showJS : function(){
    this.div.style.opacity += 0.01;
    if(this.div.opacity == this.opacity){
    }
    else{ window.setTimeout(this.showJS.bind(this), this.speed);}
  }
  ,hide : function(){
  }
  ,hideJS : function(){
  }
}


