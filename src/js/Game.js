var oGame = new Game();

// 定时器
oGame.timer = null;
oGame.score = 0;
oGame.flag = true;

// 初始化
oGame.init = function () {
    // 初始化页面
    oGround.init();
    // 蛇初始化
    oSnake.init(oGround);
    // 初始化食物
    createFood(oGround);
    // 初始化速度
    INTERVAL = (1000 / 60) * 10;

    // 绑定事件
    // next hit dealy: 延迟(节流)

    document.onkeydown = function (e) {
        // e.which left: 37, top: 38, right: 39, down: 40
        // 向左摁的时候的条件是此时的蛇不是想右走
        if (e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT) {
            oSnake.direction = DIRECTIONENUM.LEFT;
        } else if (e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
            oSnake.direction = DIRECTIONENUM.UP;
        } else if (e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
            oSnake.direction = DIRECTIONENUM.RIGHT;
        } else if (e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
            oSnake.direction = DIRECTIONENUM.DOWN;
        }

        // 控制游戏开始与暂停
        if (e.which == 32 && oGame.flag) {
            oGame.start();
            oGame.flag = false;
        } else if (e.which == 32 && !oGame.flag) {
            oGame.stop();
            oGame.flag = true;
        }

        // console.log(e.which);
    };

    var oBtn = document.getElementById('oBtn');
    oBtn.onclick = function () {
        oGame.start();
    }

}

// 开始游戏
oGame.start = function (flag) {
    var oFlag = flag || false;
    clearInterval(this.timer);
    oBtn.innerHTML = '正在游戏！';
    this.timer = setInterval(function () {
        oSnake.move(oGround);
    }, INTERVAL)
}

// 管理分数
var curScore = document.getElementById('curScore');
oGame.upDateScore = function (score) {
    this.score = score;
    curScore.innerHTML = this.score;
    console.log(this.score);
}

// 暂停游戏
oGame.stop = function () {
    clearInterval(this.timer);
    oBtn.innerHTML = '暂停中';
}

// 结束游戏
oGame.over = function () {
    clearInterval(this.timer);
    alert('分数:' + this.score);
    this.upDateScore(0);
    oBtn.innerHTML = '开始游戏';
    oGame.flag = !oGame.flag;
    oGame.init();
}

oGame.init();

function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;

    while (flag) {
        // 
        x = 1 + Math.floor(Math.random() * 28); // 1 - 28
        y = 1 + Math.floor(Math.random() * 28); // 1 - 28
        var ok = true;

        // 另一种实现办法：动态的存放可以放置食物的坐标，然后在其中选择其一放入食物
        for (var node = oSnake.head; node; node = node.next) {
            if (x == node.x && node.y) {
                ok = false;
                break;
            }
        }

        if (ok) {
            flag = false;
        }


    };

    // 随机生成三种食物中的一种
    var random = oGame.score >= 5 ? (1 + Math.round(Math.random() * 2)) : (1 + Math.round(Math.random() * 1));
    if (random == 1) {
        var oFood = SquareFactory.create('Food', x, y, 'red');
    } else if (random == 2) {
        var oFood = SquareFactory.create('Add', x, y, 'lightgreen');
    } else if (random == 3) {
        var oFood = SquareFactory.create('Cut', x, y, 'blue');
    }

    ground.remove(oFood.x, oFood.y).append(oFood);

}