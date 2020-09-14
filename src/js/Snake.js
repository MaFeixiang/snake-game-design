var oSnake = new Snake();
oSnake.head = null; // 记录蛇头
oSnake.tail = null; // 记录蛇尾

// 蛇移动方向
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}

oSnake.init = function (ground) {
    // 初始化蛇头和蛇身
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    // 蛇头和蛇尾
    this.head = snakeHead;
    this.tail = snakeBody2;

    // 显示蛇
    ground.remove(snakeHead.x, snakeHead.y).append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y).append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y).append(snakeBody2);

    // 形成双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 默认移动方向
    this.direction = DIRECTIONENUM.RIGHT;
};


// 策略chuli
oSnake.strategies = {
    // snake: 蛇， square: 下一个方块， ground: 地面
    move: function (snake, square, ground, formWhere) {
        // 添加一节身体
        if (formWhere != 'cut') {
            var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

            newBody.next = snake.head.next;
            newBody.next.last = newBody;
            newBody.last = null;

            ground.remove(snake.head.x, snake.head.y).append(newBody);

            // 新建蛇头
            var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');

            newHead.next = newBody;
            newHead.last = null;
            newBody.last = newHead;

            ground.remove(square.x, square.y).append(newHead);

            // 更新蛇头
            snake.head = newHead;
        }


        // 删除最后一节身体，添加地板
        if (formWhere != 'eat') {

            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            snake.tail.last.next = null;
            ground.remove(snake.tail.x, snake.tail.y).append(newFloor);

            // 更新蛇尾
            snake.tail = snake.tail.last;
            // snake.tail.next = null;
        }

    },
    eat: function (snake, square, ground) {
        this.move(snake, square, ground, 'eat');
        oGame.upDateScore(++oGame.score);
        if (oGame.score % 5 == 0) {
            INTERVAL -= aSpeed;

            clearInterval(oGame.timer);

            oGame.timer = setInterval(function () {
                oSnake.move(ground);
            }, INTERVAL)
        }
        // 重新生成一个食物
        createFood(oGround);
    },
    die: function () {
        oGame.over();
    },
    add: function (snake, square, ground) {
        this.move(snake, square, ground);

        oGame.upDateScore(++oGame.score);

        createFood(ground);
        console.log('执行了生成食物');
        INTERVAL -= aSpeed;

        clearInterval(oGame.timer);

        oGame.timer = setInterval(function () {
            oSnake.move(ground);
        }, INTERVAL)

    },
    cut: function (snake, square, ground) {
        // 处理食物，
        var newFloor = SquareFactory.create('Floor', square.x, square.y, 'orange')
        ground.remove(square.x, square.y).append(newFloor);
        // 处理蛇的最后一节
        var newFloor2 = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
        ground.remove(snake.tail.x, snake.tail.y).append(newFloor2);
        snake.tail = snake.tail.last;
        snake.tail.next = null;


        oGame.upDateScore(--oGame.score);

        createFood(oGround);

        // console.log('cut')
    }
}

// move

// 做预判 以蛇头为参考，根据自身方向 判断一下下一个碰到的方块是什么
oSnake.move = function (ground) {
    // 取出下一个将要碰到的方块
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    if (typeof square.touch == 'function') {
        // 拿到下一个将要碰到的方块返回信息 => 根据策略模式中的对对应的信息进行处理
        this.strategies[square.touch()](this, square, ground,);
    }

    // 更新时间间隔


}

// oSnake.move(oGround);