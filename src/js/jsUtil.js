// 工具方法
var tool = {
    // 原型继承
    inherit: function (target, origin) {
        var temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.consructor = target;
    },

    // 混合继承: 私有属性继承+原型继承
    extends: function (origin) {
        var result = function () {
            origin.apply(this, arguments); // this -> result
            return this;
        }
        // 原型继承
        this.inherit(result, origin);

        return result; 
    },

    // 创建单例对象: 单例模式+原型继承+私有属性继承
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments); // 私有属性继承
                instance = this;
            }
        })();

        origin && this.inherit(singleResult, origin); // 原型继承

        return singleResult;
    }
};

// function Square(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }

// Square.prototype.touch = function () {
//     console.log('touch')
// }


// var Food = tool.extends(Square);
// var oF1 = new Food(1, 2, 100, 200);

// var SnakeHead = tool.single(Square);
// var oSh1 = new SnakeHead(2, 2, 300, 300);
// var oSh2 = new SnakeHead(3, 3, 200, 200);