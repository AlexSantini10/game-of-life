var matrix = new Array();
var nextMatrix = new Array();
var ctx;

const dim = 20;
var pos = {x:0, y:0};
var rows = 1;
var cols = 1;

var living = false;

document.addEventListener('DOMContentLoaded', () => {

    const body = document.getElementById('body');
 
    var canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.height = (window.screen.height/2)-(window.screen.height/2)%dim;
    canvas.width = (window.screen.width/2)-(window.screen.width/2)%dim;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.marginTop = String((window.screen.height/2)-(canvas.height/100*75)) + 'px';
    canvas.style.marginLeft = String((window.screen.width/2)-(canvas.width/2)) + 'px';
    canvas.style.border = '1px solid #EDEDED';
    canvas.style.borderRadius = '3px';


    rows = canvas.height/dim;
    cols = canvas.width/dim;
    matrix = new Array(rows);
    nextMatrix = new Array(rows);
    initMatrix(rows, cols);

    body.appendChild(canvas);

    //console.log(matrix);  // Debug

    ctx = canvas.getContext("2d");

    canvas.addEventListener('mousedown', function(e) {
        pos = getCursorPosition(canvas, e)
        
        pos.x -= pos.x%dim;
        pos.y -= pos.y%dim;

        makeAlive(pos.y/dim, pos.x/dim);
        reDrawCanva(rows, cols);

        canvas.addEventListener('mousemove', (e) => {
            if (e.buttons!==1) return;
            pos = getCursorPosition(canvas, e)
        
            pos.x -= pos.x%dim;
            pos.y -= pos.y%dim;
            
            makeAlive(pos.y/dim, pos.x/dim);
            reDrawCanva(rows, cols);
            
        });
    });

    canvas.addEventListener('mouseenter', (e) => {
        pos = getCursorPosition(canvas, e)
        
        pos.x -= pos.x%dim;
        pos.y -= pos.y%dim;

    }); 

    initCanva(rows, cols, dim);
});
