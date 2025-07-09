import './Board.css'

function Board({win, turns, sec, newGame}) {
  return <div className='board'>
        <div className="game-message">
            {win ? `Congratulations! You've won with ${turns} attempts, and with ${sec} sec` 
            : `Unfortunately! You've lost.. time is gone`}
            <button className='btn' onClick={() => newGame()}>New game?</button>
        </div>
    </div>
}

export default Board;
