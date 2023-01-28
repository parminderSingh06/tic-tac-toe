const playerFactory = (name, symbol) => {
    return { name, symbol };
 };

const gameBoard = (() => {
    const p1 = playerFactory('Player One', 'X')
    const p2 = playerFactory('Player Two', 'O')
    let changer = 1;
    let counter = 0;
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const changeTurn = function(){
        if(changer == 1)
        {
            changer = 0;
            return p1;
        }
        else if(changer == 0)
        {
            changer = 1
            return p2;
        }
    };

    const getTurn = function(){
        if(changer == 1)
        {
            return p1;
        }
        else if(changer == 0)
        {
            return p2;
        }
    }

    const oppTurn = function(){
        if(changer == 1)
        {
            return p2;
        }
        else if(changer == 0)
        {
            return p1;
        }
    }

    const checkWin = function(){
        let isWin = false;
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = displayController.tiles[condition[0]];
            const cellB = displayController.tiles[condition[1]];
            const cellC = displayController.tiles[condition[2]];

            if(cellA.innerHTML == "" || cellB.innerHTML == "" || cellC.innerHTML == ""){
                continue;
            }
            if(cellA.innerHTML == cellB.innerHTML && cellB.innerHTML == cellC.innerHTML){
                isWin = true;
                break;
            }
        }
        
        if(isWin){
            displayController.gameFinsh();
            return;
        }
        else if(counter == 8){
            displayController.end.setAttribute('style', 'display:flex');
            displayController.endwords.innerHTML = "IT IS A DRAW!" + displayController.endwords.innerHTML;
        }
        counter++;
    }

    function resetVar()
    {
        changer = 1;
        counter = 0;
    }

    return { changeTurn, getTurn, checkWin, oppTurn, resetVar };
})();

const displayController = (() => {
    const tiles = document.querySelectorAll('.tiles');
    const turn = document.querySelector('#turn');
    const end = document.querySelector('#endScreen');
    const endwords = document.querySelector('#endWords');
    turn.innerHTML = gameBoard.getTurn().name;
    for(let i = 0; i < tiles.length; i++)
    {
        tiles[i].addEventListener('click', function(){
            playTurn(this);
        });
    }
    function playTurn(e){
        if(gameBoard.getTurn().symbol === 'X')
        {
            e.setAttribute('style', 'color: #FF3E00');
        }
        if(gameBoard.getTurn().symbol === 'O')
        {
            e.setAttribute('style', 'color: #00FFF7');
        }
        e.innerHTML = gameBoard.changeTurn().symbol;
        e.setAttribute('disabled', true);
        turn.innerHTML = gameBoard.getTurn().name;
        gameBoard.checkWin();
    }

    function gameFinsh(){
        for(let i = 0; i < tiles.length; i++)
        {
            tiles[i].setAttribute('disabled', true);
        }
        end.setAttribute('style', 'display:flex');
        endwords.innerHTML = gameBoard.oppTurn().name + ' Wins!' + endwords.innerHTML;
    }

    return {tiles, gameFinsh, end, endwords};
})();