// 定义变量

// 游戏场景的大小

// 宽度系数 -> 每行有多少个方块，高度系数 -> 控制一共有多少行
var XLEN = 30;
var YLEN = 30;

// 每个方块的宽度
var SQUAREWIDTH = 20;

// 游戏场景的位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

// 定义 蛇的移动时间间隔
var INTERVAL = (1000 / 60) * 10; // ms

// 加速度
var aSpeed = 5;

// 定义方块 -> 创建基类 -> 方块类
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
};

Square.prototype.touch = function () {
    console.log('touch');
}

// 因为蛇头是单例模式，无法直接创建新位置的蛇头 => 更新蛇头坐标
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

// 定义子类
var Floor = tool.extends(Square); // 地板
var Stone = tool.extends(Square); // 障碍物
var Food = tool.single(Square); // 食物
var Add = tool.single(Square); // 加速
var Cut = tool.single(Square); // 减少一节
var SnakeHead = tool.single(Square); // 蛇头 -> 单例
var SnakeBody = tool.extends(Square); // 蛇身
var Snake = tool.single(); // 创建一条蛇 -> 是一个单例模式，但是不需要继承Square
var Ground = tool.single(Square); // 地面

// 管理游戏的进程
var Game = tool.single();


// 策略信息枚举
var STRATEGYMESSAGEENUM = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die',
    ADD: 'add',
    CUT: 'cut'
};