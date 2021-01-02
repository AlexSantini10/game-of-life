
var lifeInt = null;

// Init functions

function initMatrix(rows, cols) {

    matrix = [...Array(rows)].map(e => Array(cols).fill(false));
    nextMatrix = [...Array(rows)].map(e => Array(cols).fill(false));
}

function initCanva(rows, cols, dim)  {
    for(let i=0; i<rows; i++){ //righe
        for(let j=0; j<cols; j++){ //colonne
            drawWithBorder(j*dim, i*dim, dim, dim);
        }
    }
}
 

// Matrix functions

function invertMatrix(row, col) {
    if (row<rows && row>=0 && col<cols && col>=0 && !living){
        if (matrix[row][col]==true) matrix[row][col] = false;
        else matrix[row][col] = true;
    }
}

function makeAlive(row, col) {
    if (row<rows && row>=0 && col<cols && col>=0 && !living)
        matrix[row][col] = true;
}

function Die(row, col) {
    if (row<rows && row>=0 && col<cols && col>=0 && !living)
        matrix[row][col] = false;
}


// Position functions

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
     
    return {x:x, y:y};
}

function getPositionRounded (canvas, event, dim){
    let pos = getCursorPosition(canvas, event);

    pos.x -= pos.x%dim;
    pos.y -= pos.y%dim;

    return pos;
} 

// Draw functions

function drawBorder(xPos, yPos, width, height, thickness = 1) {
    ctx.fillStyle="#000000";
    ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
};

function drawCell(xPos, yPos, width, height, color = "#EDEDED") {
    ctx.fillStyle = color;
    ctx.fillRect(xPos, yPos, width, height);
}

function drawWithBorder(xPos, yPos, width, height, color = "#EDEDED") {
    drawBorder(xPos, yPos, width-2, height-2);
    drawCell(xPos, yPos, width, height, color);
}

function reDrawCanva(rows, cols) {
    for(let i=0; i<rows; i++){ //righe
        for(let j=0; j<cols; j++){ //colonne
            
            if (matrix[i][j]) drawWithBorder(j*dim, i*dim, dim, dim, "#202025");
            else drawWithBorder(j*dim, i*dim, dim, dim);
        }
    }
}

// Life

function life() {

    living = true;

    for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){

            let co = 0;

            for (let k=-1; k<=1; k++){ //rows
                for (let u=-1; u<=1; u++){ //cols
                    if (i+k>=0 && i+k<rows && j+u>=0 && j+u<cols && !(k==0 && u==0)) {
                        if (matrix[i+k][j+u]) co++;
                    }
                }
            }

            if (co<2) nextMatrix[i][j] = false;
            else if (co==2 && matrix[i][j]) nextMatrix[i][j] = true;
            else if (co>2 && co<=3) nextMatrix[i][j] = true;
            else if (co>3) nextMatrix[i][j] = false;

        }
    }

    matrix = [...nextMatrix];

    nextMatrix = [...Array(rows)].map(e => Array(cols).fill(false));

    reDrawCanva(rows, cols);
}

function start() {

    let frequency = parseInt(document.getElementById('frequency').value);

    if (!living)
        lifeInt = setInterval(life, 1000/frequency);
    //life();
}

function stop() {
    if (lifeInt!=null) clearInterval(lifeInt);

    living = false;
}

function restart() {
    let toStart = false;
    toStart = living;
    stop();

    if (toStart)
        start();
}

function randomize() {
    stop();
    initMatrix(rows, cols);

    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if (parseInt(Math.random()*(4 - 1) + 1 ) == 2) makeAlive(i, j); 
        }
    }

    reDrawCanva(rows, cols);
}

function clear(){
    stop();
    initMatrix(rows, cols);
    reDrawCanva(rows, cols);
}