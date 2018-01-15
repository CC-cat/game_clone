var oWidth = 101;
var oHeight = 83;

// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    //给小虫子一个初始化的速度
    this.speed = speed || Math.random() * 100 +100;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt,x) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    //Enemy一旦越出边界，那么就在起点处重复出现
    if(this.x >= 505){
        this.x = -30;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
//定义一个全局变量，为了使得玩家在每一毫秒刷新之前，能够不出现无法到达河岸，就弹出游戏胜利并回到原位的现象
var count = 0;
Player.prototype.update = function(dt){
    if(this.y === -11){
       count++;
       if(count%3 === 2){
            alert("You Win! 点击确定进入下一局游戏。");
            this.x = 200;
            this.y = 404;
       }
    }
};
//定义一个render渲染函数，用来在屏幕上画出玩家
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//定义一个防止player越出画布边界的函数
Player.prototype.handleInput = function(movement){
    switch(movement) {
        //在不越出边界的前提下，如果能向左移，那就左移一个格子的width
        case 'left':
        if (this.x > 0) {
            this.x -= oWidth;}
        break;
        //在不越出边界的前提下，如果能向右移，那就右移一个格子的width
        case 'right':
        if (this.x < 4 * oWidth) {
            this.x += oWidth;}
        break;
        //在不越出边界的前提下，如果能向上移，那就上移一个格子的height
        case 'up':
        if (this.y > 0) {
            this.y -= oHeight;}
        break;
        //在不越出边界的前提下，如果能向下移，那就下移一个格子的height
        case 'down':
        if (this.y < 4 * oHeight) {
            this.y += oHeight;}
        break;
    }
};

//实现碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
        //首先判断player和enemy是否在同一行（此处因为我所设置的player和enemy是每一行所在位置的y坐标是相同的）
        if(this.y === allEnemies[i].y){
            if((Math.abs(this.x - allEnemies[i].x))<40){
                this.x =200;
                this.y =404;
            }
       }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
//定义6个Enemy，每行两个，每一行的初始位置是固定的
for(var i=0;i<6;i++){
    var bugs = new Enemy(-30,83*(i%3)+72);
    //将所有bugs都添加到allEnemies数组中
    allEnemies.push(bugs);
};

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200,404);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
