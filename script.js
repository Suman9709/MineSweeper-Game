const NUM_ROWS = 9;
const NUM_COLS = 9;
const NUM_MINES = 10;

let board=[]



function initializeBoard(){
    for(let row = 0; row < NUM_ROWS; ++row){
        board[row] = []
        for(let col=0; col < NUM_COLS; ++col){
            board[row][col] ={
                isMines:false,
                isRevealed:false,
                count: 0
            }
        }  
    }
//  mine the boeard randomly
    let mines=0

    while(mines  <  NUM_MINES){
        const randomRow=Math.floor(Math.random()*NUM_ROWS)
        const randomCol=Math.floor(Math.random()*NUM_COLS)

        if(!board[randomRow][randomCol].isMines){

            board[randomRow][randomCol].isMines=true;
            mines++;
        }
    }

    for(let row = 0; row < NUM_ROWS; ++row){
        for(let col=0; col < NUM_COLS; ++col){

            //  calc 
          if(!board[row][col].isMines){
            let count=0;

            for(let dx= -1; dx<=1; dx++){
                for(let dy=-1; dy<=1;dy++){
                    const iLoc=row+dx;
                    const jLoc=col+dy;

                    if(iLoc>=0 && iLoc < NUM_ROWS && jLoc>=0 && jLoc < NUM_COLS && board[iLoc][jLoc].isMines)
                        count++;
                }
            }
            board[row][col].count=count;
          }
          
        }  
}
}

const gameBoard = document.getElementById('game-border');
function render(){
    gameBoard.innerHTML="";
    for(let row= 0; row < NUM_ROWS; ++row){
        for(let col= 0; col < NUM_COLS; ++col){
            const tile = document.createElement('div')
            tile.className='tile'
            if(board[row][col].isRevealed){
                    // reveal the tile 
                tile.classList.add('revealed')

                if(board[row][col].isMines){
                    /// mine styles show bomb
                    tile.innerText= '💣';
                }
                else if(board[row][col].count>0){
                    tile.innerText= board[row][col].count;
                }
            }
            tile.addEventListener('click', ()=> revealTile(row,col));
            gameBoard.appendChild(tile);
        }
        gameBoard.appendChild(document.createElement('br'));
    }
}



function revealTile( row, col ){
    if(row>=0 && row<NUM_ROWS && col>=0 && col<NUM_COLS && !board[row][col].isRevealed){
        board[row][col].isRevealed =true;
        if(board[row][col].isMines){
            alert('Game over! Ypu stepped on a mine')
        }
        else if(board[row][col].count===0){
            for(let dx=-1; dx<=1; ++dx){
                for(let dy=-1; dy<=1; ++dy){
                    revealTile(row+dx, col+dy);
                }
        }
    }
    render();
}
}

initializeBoard()
render() 
console.log(board);
