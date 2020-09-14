// 定位：x, y, 大小：width,height
var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

// 页面初始化函数 -> 把地面的位置、大小、颜色定义出来，并放到页面中
oGround.init = function () {
    // 定义地面位置
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    // 定义地面大小
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    
    // 定义地面颜色
    this.viewContent.style.backgroundColor = '#0FF';

    // 把地面放到body中
    document.body.appendChild(this.viewContent);

    // 
    this.SquareTable = [];

    for (var y = 0; y < YLEN; y++) {
        this.SquareTable[y] = new Array(XLEN);

        for (var x = 0; x < XLEN; x++) {
            if (x == 0 || x == XLEN - 1 || y == 0 || y == YLEN - 1) { // 判断是不是围墙坐标
                var newSquare = SquareFactory.create('Stone', x, y, 'black'); // 创建围墙
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'orange'); // 创建地板
            }
            this.viewContent.appendChild(newSquare.viewContent); // 把围墙或者地板插入到地面上

            this.SquareTable[y][x] = newSquare; // 把创建的实例放到数组中 -> 方便方块的删除与插入
        }
    }
};

// 清除对应节点和数据
oGround.remove = function (x, y) {
    var curSquare = this.SquareTable[y][x];
    // 从页面上清除
    this.viewContent.removeChild(curSquare.viewContent);
    // 从数据上清除
    this.SquareTable[y][x] = null;

    return this;
};

// 增加对应结点和数据
oGround.append = function (square) {
    // 添加到页面中
    this.viewContent.appendChild(square.viewContent);

    // 添加到数据中
    this.SquareTable[square.y][square.x] = square;

    return this;
};






