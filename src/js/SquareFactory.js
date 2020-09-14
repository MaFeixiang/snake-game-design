// 工厂模式
function SquareFactory () {

};

SquareFactory.create = function (type, x, y, color) {
    // 判断流水线是否有这款产品
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw 'no this type'
    };

    // 判断产品的prototype是否继承了工厂的
    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newSquare = new SquareFactory.prototype[type](x, y, color);

    return newSquare; //把创建的产品返回
}

// 处理方块newSquare viewContent
SquareFactory.prototype.init = function (square, color, ms) {
    // 处理定位
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';

    // 处理大小
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';

    // 处理颜色
    square.viewContent.style.backgroundColor = color;

    // touch方法
    square.touch = function () {
        return ms;
    }
}

// 地板
SquareFactory.prototype.Floor = function (x, y, color) {

    // 创建基础的方块
    var oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);

    this.init(oFloor, color, STRATEGYMESSAGEENUM.MOVE);

    return oFloor;
}

// 围墙
SquareFactory.prototype.Stone = function (x, y, color) {
    // 创建基础的方块
    var oStone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);

    this.init(oStone, color, STRATEGYMESSAGEENUM.DIE); // 初始化方块

    return oStone; // 把加工好的方块返回
}

// 食物
SquareFactory.prototype.Food = function (x, y, color) {
    var oFood = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);

    this.init(oFood, color, STRATEGYMESSAGEENUM.EAT);

    // 更新坐标
    oFood.upDate(x, y);

    return oFood;
}

// 蛇头
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var oSnakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    
    this.init(oSnakeHead, color, STRATEGYMESSAGEENUM.DIE);

    // 更新坐标
    oSnakeHead.upDate(x, y);

    return oSnakeHead;
}

// 蛇身
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var oSnakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);

    this.init(oSnakeBody, color, STRATEGYMESSAGEENUM.DIE);

    return oSnakeBody;
}

// 增速食物
SquareFactory.prototype.Add = function (x, y, color) {
    var oAdd = new Add(x, y, SQUAREWIDTH, SQUAREWIDTH);

    this.init(oAdd, color, STRATEGYMESSAGEENUM.ADD);

    oAdd.upDate(x, y);

    return oAdd;
}

// 减少一节
SquareFactory.prototype.Cut = function (x, y, color) {
    var oCut = new Cut(x, y, SQUAREWIDTH, SQUAREWIDTH);
    
    this.init(oCut, color, STRATEGYMESSAGEENUM.CUT);

    oCut.upDate(x, y);

    return oCut;
}