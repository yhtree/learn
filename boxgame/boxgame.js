// const matrix = [
//     [1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]
// ];

// const matrix = [
//     [1, 2, 3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10, 9, 8, 7]
// ];

const matrix = [
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
];

let beginBtn = document.querySelector('.game-btn');
let wrapper = document.querySelector('.box-wrap');
let isRunning = false;
let baseSpeed = 0; 

//构建box
renderBox();

beginBtn.addEventListener('click', async (e) => {
    let stack = initBoxStack();

    function loop() {
        isRunning = true;
        baseSpeed++;

        let item = stack.shift();
        
        if (!item) {
            isRunning = false;
            baseSpeed = 0;
            return;
        }
        moveBox(item, loop);
    }
    isRunning && alert("please waiting");
    !isRunning && loop();
});

//回形创建盒子
function renderBox(){
    for(let i = 0; i < matrix.length; i++){
        let rowNode = document.createElement('div');
        rowNode.className = 'box-row';
        wrapper.appendChild(rowNode);
        for(let j = 0; j < matrix[i].length; j++){
            let boxNode = document.createElement('div');
            boxNode.className = 'box-item';
            boxNode.innerHTML = matrix[i][j];
            wrapper.getElementsByClassName('box-row')[i].appendChild(boxNode);
        }
    }
}

//回形遍历二维数组
function initBoxStack(){
    let boxStack = [];
    let row = matrix.length;
    let col = matrix[0] && matrix[0].length;
    let count = row * col;

    if(row === 1){ //只有一行
        for(let i = 0; i < col; i++){
            boxStack.push({
                x: 0,
                y: i
            })
        }
    }else if(col == 1){ //只有一列
        for(let i = 0; i < row; i++){
            boxStack.push({
                x: i,
                y: 0
            })
        }
    }else{
        let _x = 0, _y = 0; 
        while(count > 0){
            for(let i = 1; i < col; i++){
                boxStack.push({
                    x: _x,
                    y: _y
                })
                _y++; //列坐标递增
                count--;
            }
        
            for(let i = 1; i < row; i++){
                boxStack.push({
                    x: _x,
                    y: _y
                })
                _x++; //行坐标递增
                count--;
            }

            for(let i = 1; i < col; i++){
                boxStack.push({
                    x: _x,
                    y: _y
                })
                _y--; //列坐标递减
                count--;
            }

            for(let i = 1; i < row; i++){
                boxStack.push({
                    x: _x,
                    y: _y
                })
                _x--; //行坐标递减
                count--;
            }

            //数组变小
            row -= 2;
            col -= 2;
            // //下标前进1格 
            _x++;
            _y++; 

            if(row === 1){
                for(let i = 0; i < col; i++){
                    boxStack.push({
                        x: _x,
                        y: _y
                    })
                    _y++;
                    count--;
                } 
            }else if(col === 1){
                for(let i = 0; i < row; i++){
                    boxStack.push({
                        x: _x,
                        y: _y
                    })
                    _x++;
                    count--;
                }
            }
        }
    }
    return boxStack;
}

//盒子变化
function moveBox(item, callback) {
    let itemIndex = item.x * matrix.length + item.y;
    let wrapperItems = document.querySelectorAll('.box-item');

    for (let i = 0; i < wrapperItems.length; i++) {
        wrapperItems[i].style.background = '';
    }

    wrapperItems[itemIndex].style.background = 'red';

    setTimeout(() => {
        callback();
    }, 12 * baseSpeed + 20);
}

