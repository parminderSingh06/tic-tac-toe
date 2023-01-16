const gameBoard = (() => {
    let board = Array(9).fill(null);
    const domBoard = document.querySelector('#gameBoard')
    const createBoard = () => {
        for(let i = 0; i < board.length; i++) {
            let square = document.createElement('button');
            square.classList.toggle('squares');
            square.innerHTML = board[i];
            domBoard.appendChild(square);
        }
    };
    createBoard();
    const squares = document.querySelectorAll('.squares');
    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', () =>{
            squares[i].innerHTML = player.character;
        });
    }
 })();

 const displayController = (() => {
 })();

const player = (character) => {
    return {character};
}
