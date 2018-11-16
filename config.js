const BALLIMAGE = "url('./imgs/ball.png')";
const XIMAGE = "url('./imgs/x.png')";
const BALL = 'BALL';
const X = 'X';
let player = Math.floor(Math.random() * 2) + 1;
let countP1Win = 0; 
let countP2Win = 0; 
let countTie = 0;
let canPlay = true;

window.onload = function() {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const tie = document.getElementById("tie");
    const playerNow = document.getElementById("playerNow");
    const scoreboard = document.getElementById("scoreboard");
    if(player === 1) return playerNow.textContent = "Jogador 1(X)";
    if(player === 2) return playerNow.textContent = "Jogador 2(O)";
}

let table = {
    op1: {played: false, type: null}, op2: {played: false, type: null}, op3: {played: false, type: null},
    op4: {played: false, type: null}, op5: {played: false, type: null}, op6: {played: false, type: null}, 
    op7: {played: false, type: null}, op8: {played: false, type: null}, op9: {played: false, type: null}
};

function setOption(op) {
    const cellOP = op.id;

    if (_hasTie()) {
        countTie++;
        tie.textContent = countTie;
        scoreboard.style.display = "inline";
        canPlay = false;
        return true;
    }

    if(player === 1 && canPlay) {
        if(_setImage(cellOP, X)){
            if(_checkWhoWon()) {
                countP1Win++;
                player1.textContent = countP1Win;
                return false;
            }
            _setPlayer();
            playerNow.textContent = "Jogador 2(O)";
        }    
    }

    if(player === 2 && canPlay) {
        if(_setImage(cellOP, BALL)) {
            if(_checkWhoWon()) {
                countP2Win++;
                player2.textContent = countP2Win;
                return false;
            }
            _setPlayer();
            playerNow.textContent = "Jogador 1(X)";
        }    
    } 
}

function closeModal() {
    _reset();
    scoreboard.style.display = "none";
}

function _setTable(op, type) {
    if(!table[op].played) {
        table[op].played = true;
        table[op].type = type;
    }
}

function _setImage(cellOP, type) {
    const cell = document.getElementById(cellOP)
    if(!table[cellOP].played) {
        _setTable(cellOP, type);
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundSize = "contain";
        if(type === BALL) cell.style.backgroundImage = BALLIMAGE;
        if(type === X) cell.style.backgroundImage = XIMAGE;
        return true;
    } 
    return false;
}

function _setPlayer() {
    if(player === 1) return player = 2;
    if(player === 2) return player = 1;
}

function _hasPLayerWon() {
    if(table.op1.played && table.op2.played && table.op3.played && _checkMove()) return true;
    if(table.op4.played && table.op5.played && table.op6.played && _checkMove()) return true;
    if(table.op7.played && table.op8.played && table.op9.played && _checkMove()) return true;
    if(table.op1.played && table.op4.played && table.op7.played && _checkMove()) return true;
    if(table.op2.played && table.op5.played && table.op8.played && _checkMove()) return true;
    if(table.op3.played && table.op6.played && table.op9.played && _checkMove()) return true;
    if(table.op1.played && table.op5.played && table.op9.played && _checkMove()) return true;
    if(table.op3.played && table.op5.played && table.op7.played && _checkMove()) return true;
}

function _checkMove() {
    if(table.op1.type === BALL && table.op2.type === BALL && table.op3.type === BALL) return true;
    if(table.op4.type === BALL && table.op5.type === BALL && table.op6.type === BALL) return true;
    if(table.op7.type === BALL && table.op8.type === BALL && table.op9.type === BALL) return true;
    if(table.op1.type === BALL && table.op4.type === BALL && table.op7.type === BALL) return true;
    if(table.op2.type === BALL && table.op5.type === BALL && table.op8.type === BALL) return true;
    if(table.op3.type === BALL && table.op6.type === BALL && table.op9.type === BALL) return true;
    if(table.op1.type === BALL && table.op5.type === BALL && table.op9.type === BALL) return true;
    if(table.op3.type === BALL && table.op5.type === BALL && table.op7.type === BALL) return true;

    if(table.op1.type === X && table.op2.type === X && table.op3.type === X) return true;
    if(table.op4.type === X && table.op5.type === X && table.op6.type === X) return true;
    if(table.op7.type === X && table.op8.type === X && table.op9.type === X) return true;
    if(table.op1.type === X && table.op4.type === X && table.op7.type === X) return true;
    if(table.op2.type === X && table.op5.type === X && table.op8.type === X) return true;
    if(table.op3.type === X && table.op6.type === X && table.op9.type === X) return true;
    if(table.op1.type === X && table.op5.type === X && table.op9.type === X) return true;
    if(table.op3.type === X && table.op5.type === X && table.op7.type === X) return true;
}

function _hasTie() {
    let num = 0;
    for(let i = 1; i < 10; i++) {
        if(table["op"+i].played) { 
            num++;
        }
    }
    if(num === 8) return true;
}

function _checkWhoWon() {
    if(_hasPLayerWon()) {
        scoreboard.style.display = "inline";
        canPlay = false;
        return true;
    }
}

function _reset() {
    table = {
        op1: {played: false, type: null}, op2: {played: false, type: null}, op3: {played: false, type: null},
        op4: {played: false, type: null}, op5: {played: false, type: null}, op6: {played: false, type: null}, 
        op7: {played: false, type: null}, op8: {played: false, type: null}, op9: {played: false, type: null}
    };

    for(let i = 1; i < 10; i++) {
        const cell = document.getElementById("op"+i);
        cell.style.backgroundImage = "none";
    }
    canPlay = true;
}