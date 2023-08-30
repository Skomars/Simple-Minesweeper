import './Board.css';
import './App.css';
import React from 'react';
import Cell from './Cell';
import createBoard from './utils';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: createBoard(25, 8),
      clearedMines: 0,
      totalCells: 0,
      totalMines: 0,
      mineHit: false,
      gameWon: false,
    };
    this.handleClickedCell = this.handleClickedCell.bind(this);
  }

  // ^ Calculations and assignements for fetching total number of cells and mines.
  // ^ !!! Function is called x2 in development, hence the division of 2. For production, the division can be removed !!!
  componentDidMount() {
    this.setState(
      (prevState) => ({
        totalCells: prevState.totalCells + prevState.gameBoard.length / 2,
      }),
      () => {
        this.setState((prevState) => ({
          totalMines:
            prevState.totalMines +
            this.state.gameBoard.filter((cell) => cell.hasMine === true)
              .length /
              2,
        }));
      }
    );
  }

  // ^ Adding 1 to the list of cleared mines. If no mines are left, you win!
  clearedCell = (checkMine) => {
    this.setState(
      (prevState) => ({ clearedMines: prevState.clearedMines + 1 }),
      () => {
        if (
          this.state.clearedMines ===
          this.state.totalCells - this.state.totalMines
        ) {
          this.setState((prevState) => ({ gameWon: true }));
        }
      }
    );
  };

  // ^ Making clicked cell´s "visible" property set to 'true' and evaluates the 'hasMine' property value.
  handleClickedCell(indexClicked) {
    if (this.state.gameBoard[indexClicked].visible === false) {
      //! -- let newState = [...this.state.gameBoard]; -- !// OBS: INLAGD 2023-03-09
      const newState = this.state.gameBoard;
      newState[indexClicked].visible = true;

      this.setState({ gameBoard: newState }, () => {
        // ^ If the clicked cell doesn´t have a mine, run "clearedCells" function and continue the game.
        // ^ Else, set mineHit to 'true'
        if (this.state.gameBoard[indexClicked].hasMine === false) {
          this.clearedCell(indexClicked);
        } else {
          this.setState((prevState) => ({ mineHit: true }));
        }
      });
    }
  }

  // ^ Render function.
  render() {
    return (
      <>
        <div className="gridLayout">
          {this.state.gameBoard.map((cell, index) => {
            return (
              <Cell
                className="cellBox"
                cell={cell}
                key={index}
                onClick={
                  !this.state.mineHit &&
                  !this.state.gameWon &&
                  this.handleClickedCell
                }
              />
            );
          })}
        </div>
        {this.state.mineHit && (
          <div className="gameover">Sorry, you hit a mine!</div>
        )}
        {this.state.gameWon && <div className="gameover">You won!</div>}
      </>
    );
  }
}

export default Board;
