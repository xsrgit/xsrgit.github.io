/**
 * Created by XHJ on 2016/8/11.
 */
//snk == snake


function getById(id){
  return document.getElementById(id);
}

//snk_lg不能大于snk_canvas_width或snk_canvas_height任一个
function snk_canvas_build(id,snk_canvas_width,snk_canvas_height,snk_lg,snk_width,snk_color1,snk_color2,snk_speed){
  this.snk_canvas = getById(id);
  this.snk_canvas.width = this.snk_canvas_width = snk_canvas_width;
  this.snk_canvas.height = this.snk_canvas_height = snk_canvas_height;
  /*this.canvas_lg = snk_canvas_width;*/
  this.snk = this.snk_canvas.getContext("2d");
  this.snk1_point = new Array(6);
  this.snk2_point = new Array(6);
  this.snk_lg = snk_lg;
  this.snk_width = snk_width;
  this.snk1_color;
  this.snk2_color;
  this.snk_color1 = snk_color1;
  this.snk_color2 = snk_color2;
  this.snk_speed = snk_speed;
  this.double_snk;
}
snk_canvas_build.prototype = {
  snk_canvas_set : function(){
    this.snk1_point[0] = 0,this.snk1_point[1]= 0,this.snk1_point[2] = this.snk1_point[0]
      ,this.snk1_point[3] = this.snk1_point[2]
      ,this.snk1_point[4] = this.snk_lg,this.snk1_point[5] = 0;


    this.snk2_point[0] = this.snk_canvas_width,this.snk2_point[1]= this.snk_canvas_height
      ,this.snk2_point[2] = this.snk1_point[0],this.snk2_point[3] = this.snk_canvas_height
      ,this.snk2_point[4] = this.snk_canvas_width - this.snk_lg,this.snk2_point[5] = this.snk_canvas_height;
  }
  ,snk_canvas_margin_set : function(){
    this.snk_canvas.style.marginTop = - this.snk_canvas_height / 2 + "px";
    this.snk_canvas.style.marginLeft = - this.snk_canvas_width / 2 + "px";
  }
  ,snk_paint : function() {
    if (this.snk_canvas.getContext) {
      this.snk1_color = this.snk.createLinearGradient(this.snk1_point[0], this.snk1_point[1], this.snk1_point[4], this.snk1_point[5]);
      this.snk2_color = this.snk.createLinearGradient(this.snk2_point[0], this.snk2_point[1], this.snk2_point[4], this.snk2_point[5]);
      this.snk1_color.addColorStop(0, this.snk_color1);
      this.snk1_color.addColorStop(1, this.snk_color2);
      this.snk2_color.addColorStop(0, this.snk_color1);
      this.snk2_color.addColorStop(1, this.snk_color2);

      this.snk.clearRect(0, 0, this.snk_canvas_width, this.snk_canvas_height);
      this.snk.beginPath();
      this.snk.lineWidth = this.snk_width;
      this.snk.moveTo(this.snk1_point[0], this.snk1_point[1]);
      this.snk.lineTo(this.snk1_point[2], this.snk1_point[3]);
      this.snk.lineTo(this.snk1_point[4], this.snk1_point[5]);
      this.snk.strokeStyle = this.snk1_color;
      this.snk.stroke();
      this.snk.closePath();

      this.snk.beginPath();
      this.snk.moveTo(this.snk2_point[0], this.snk2_point[1]);
      this.snk.lineTo(this.snk2_point[2], this.snk2_point[3]);
      this.snk.lineTo(this.snk2_point[4], this.snk2_point[5]);
      this.snk.strokeStyle = this.snk2_color;
      this.snk.stroke();
      this.snk.closePath();
    }
  }
  ,snk_move : function(){
    if(this.snk1_point[0] == 0 && this.snk1_point[1] < this.snk_lg){
      ++this.snk1_point[1]; this.snk1_point[2] = this.snk1_point[0]; --this.snk1_point[4];
      --this.snk2_point[1]; this.snk2_point[2] = this.snk2_point[0]; ++this.snk2_point[4];
    }
    if(this.snk1_point[0] == 0 && this.snk1_point[1] >= this.snk_lg &&  this.snk1_point[1]< this.snk_canvas_height){
      ++this.snk1_point[1]; this.snk1_point[3] = this.snk1_point[1]; this.snk1_point[5] = this.snk1_point[1] - this.snk_lg;
      --this.snk2_point[1]; this.snk2_point[3] = this.snk2_point[1]; this.snk2_point[5] = this.snk2_point[1] + this.snk_lg;
    }
    if(this.snk1_point[1] == this.snk_canvas_height && this.snk1_point[0] < this.snk_lg){
      ++this.snk1_point[0]; ++this.snk1_point[5];
      --this.snk2_point[0]; --this.snk2_point[5];
    }
    if(this.snk1_point[1] == this.snk_canvas_height && this.snk1_point[0] < this.snk_canvas_width && this.snk1_point[0] >= this.snk_lg){
      ++this.snk1_point[0]; this.snk1_point[2] = this.snk1_point[0]; ++this.snk1_point[4];
      --this.snk2_point[0]; this.snk2_point[2] = this.snk2_point[0]; --this.snk2_point[4];
    }
    if(this.snk1_point[0] == this.snk_canvas_width && this.snk1_point[1] > this.snk_canvas_height - this.snk_lg){
      --this.snk1_point[1]; ++this.snk1_point[4];
      ++this.snk2_point[1]; --this.snk2_point[4];
    }
    if(this.snk1_point[0] == this.snk_canvas_width && this.snk1_point[1] >0 && this.snk1_point[1] <= this.snk_canvas_height - this.snk_lg){
      --this.snk1_point[1]; this.snk1_point[3] = this.snk1_point[1]; --this.snk1_point[5];
      ++this.snk2_point[1]; this.snk2_point[3] = this.snk2_point[1]; ++this.snk2_point[5];
    }
    if(this.snk1_point[1] == 0 && this.snk1_point[0] > this.snk_canvas_width - this.snk_lg){
      --this.snk1_point[0]; --this.snk1_point[5];
      ++this.snk2_point[0]; ++this.snk2_point[5];
    }
    if(this.snk1_point[1] == 0 && this.snk1_point[0] > 0 && this.snk1_point[0] <= this.snk_canvas_width - this.snk_lg){
      --this.snk1_point[0]; this.snk1_point[2] = this.snk1_point[0]; --this.snk1_point[4];
      ++this.snk2_point[0]; this.snk2_point[2] = this.snk2_point[0]; ++this.snk2_point[4];
    }
    this.snk_paint();
  }
  ,snk_move_start : function(){
    this.snk_canvas_set();
    this.double_snk = setInterval(this.snk_move.bind(this),this.snk_speed);
  }
}





/*
  <script>
var icon = document.getElementById("icon");
var snake_canvas = document.getElementById("snake_canvas");

function getById(id){
  return document.getElementById(id);
}

function snake_canvas_build(id,snake_canvas_width,snk_lg,snake_width,snake_color,snake_speed){
  this.snake_canvas = getById(id);
  this.snake_canvas.width = snake_canvas_width;
  this.snake_canvas.height = snake_canvas_width;
  this.canvas_lg = snake_canvas_width;
  this.snake = this.snake_canvas.getContext("2d");
  this.snake1_point = new Array(6);
  this.snake2_point = new Array(6);
  this.snk_lg = snk_lg;
  this.snake_width = snake_width;
  this.snake1_color;
  this.snake2_color;
  this.temp_color = snake_color;
  this.snake_speed = snake_speed;
  this.double_snake;
}
snake_canvas_build.prototype = {
  snake_canvas_set : function(){
    this.snake1_point[0] = 0,this.snake1_point[1]= 0,this.snake1_point[2] = this.snake1_point[0]
      ,this.snake1_point[3] = this.snake1_point[2]
      ,this.snake1_point[4] = this.snk_lg,this.snake1_point[5] = 0;


    this.snake2_point[0] = this.canvas_lg,this.snake2_point[1]= this.canvas_lg
      ,this.snake2_point[2] = this.snake1_point[0],this.snake2_point[3] = this.canvas_lg
      ,this.snake2_point[4] = this.canvas_lg - this.snk_lg,this.snake2_point[5] = this.canvas_lg;
  }
  ,snake_paint : function() {
    if (this.snake_canvas.getContext) {
      this.snake1_color = this.snake.createLinearGradient(this.snake1_point[0], this.snake1_point[1], this.snake1_point[4], this.snake1_point[5]);
      this.snake2_color = this.snake.createLinearGradient(this.snake2_point[0], this.snake2_point[1], this.snake2_point[4], this.snake2_point[5]);
      this.snake1_color.addColorStop(0, this.temp_color);
      this.snake1_color.addColorStop(1, "rgba(255,255,255,0)");
      this.snake2_color.addColorStop(0, this.temp_color);
      this.snake2_color.addColorStop(1, "rgba(255,255,255,0)");

      this.snake.clearRect(0, 0, this.canvas_lg, this.canvas_lg);
      this.snake.beginPath();
      this.snake.lineWidth = this.snake_width;
      this.snake.moveTo(this.snake1_point[0], this.snake1_point[1]);
      this.snake.lineTo(this.snake1_point[2], this.snake1_point[3]);
      this.snake.lineTo(this.snake1_point[4], this.snake1_point[5]);
      this.snake.strokeStyle = this.snake1_color;
      this.snake.stroke();
      this.snake.closePath();

      this.snake.beginPath();
      this.snake.moveTo(this.snake2_point[0], this.snake2_point[1]);
      this.snake.lineTo(this.snake2_point[2], this.snake2_point[3]);
      this.snake.lineTo(this.snake2_point[4], this.snake2_point[5]);
      this.snake.strokeStyle = this.snake2_color;
      this.snake.stroke();
      this.snake.closePath();
    }
  }
  ,snake_move : function(){
    if(this.snake1_point[0] == 0 && this.snake1_point[1] < this.snk_lg){
      ++this.snake1_point[1]; this.snake1_point[2] = this.snake1_point[0]; --this.snake1_point[4];
      --this.snake2_point[1]; this.snake2_point[2] = this.snake2_point[0]; ++this.snake2_point[4];
    }
    if(this.snake1_point[0] == 0 && this.snake1_point[1] >= this.snk_lg &&  this.snake1_point[1]< this.canvas_lg){
      ++this.snake1_point[1]; this.snake1_point[3] = this.snake1_point[1]; this.snake1_point[5] = this.snake1_point[1] - this.snk_lg;
      --this.snake2_point[1]; this.snake2_point[3] = this.snake2_point[1]; this.snake2_point[5] = this.snake2_point[1] + this.snk_lg;
    }
    if(this.snake1_point[1] == this.canvas_lg && this.snake1_point[0] < this.snk_lg){
      ++this.snake1_point[0]; ++this.snake1_point[5];
      --this.snake2_point[0]; --this.snake2_point[5];
    }
    if(this.snake1_point[1] == this.canvas_lg && this.snake1_point[0] < this.canvas_lg && this.snake1_point[0] >= this.snk_lg){
      ++this.snake1_point[0]; this.snake1_point[2] = this.snake1_point[0]; ++this.snake1_point[4];
      --this.snake2_point[0]; this.snake2_point[2] = this.snake2_point[0]; --this.snake2_point[4];
    }
    if(this.snake1_point[0] == this.canvas_lg && this.snake1_point[1] > this.canvas_lg - this.snk_lg){
      --this.snake1_point[1]; ++this.snake1_point[4];
      ++this.snake2_point[1]; --this.snake2_point[4];
    }
    if(this.snake1_point[0] == this.canvas_lg && this.snake1_point[1] >0 && this.snake1_point[1] <= this.canvas_lg - this.snk_lg){
      --this.snake1_point[1]; this.snake1_point[3] = this.snake1_point[1]; --this.snake1_point[5];
      ++this.snake2_point[1]; this.snake2_point[3] = this.snake2_point[1]; ++this.snake2_point[5];
    }
    if(this.snake1_point[1] == 0 && this.snake1_point[0] > this.canvas_lg - this.snk_lg){
      --this.snake1_point[0]; --this.snake1_point[5];
      ++this.snake2_point[0]; ++this.snake2_point[5];
    }
    if(this.snake1_point[1] == 0 && this.snake1_point[0] > 0 && this.snake1_point[0] <= this.canvas_lg - this.snk_lg){
      --this.snake1_point[0]; this.snake1_point[2] = this.snake1_point[0]; --this.snake1_point[4];
      ++this.snake2_point[0]; this.snake2_point[2] = this.snake2_point[0]; ++this.snake2_point[4];
    }
    this.snake_paint();
  }
  ,snake_move_start : function(){
    this.snake_canvas_set();
    this.double_snake = setInterval(this.snake_move.bind(this),this.snake_speed);
  }
}
function snake_move_start(){
  var a= new snake_canvas_build("snake_canvas",icon.offsetWidth,200,8,"rgba(0,217,163,1)",15);
  a.snake_canvas_set();
  a.snake_move_start();
}
</script>*/
