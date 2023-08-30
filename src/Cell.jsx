import './Cell.css';

const Cell = (props) => {
  // ^ Clickhandler when a cell is clicked. (Sending index to Board.jsx)
  const clickedCell = () => {
    props.onClick(props.cell.index);
  };

  // ^ Function for generating a cell. Using props from Board.jsx to decide what kind of cell that should be rendered/generated
  function generateCell() {
    // ^ If visible, meaning a cell is set to visible in Board.jsx...
    if (props.cell.visible)
      return (
        <div
          style={{
            cursor: 'pointer',
          }}
        >
          {props.cell.hasMine && (
            <div className="cell" onClick={clickedCell}>
              💣
            </div>
          )}
          {!props.cell.hasMine &&
            props.cell.numberOfNeighbouringMines === 0 && (
              <div className="cell" onClick={clickedCell}>
                0
              </div>
            )}
          {!props.cell.hasMine &&
            props.cell.numberOfNeighbouringMines !== 0 && (
              <div className="cell" onClick={clickedCell}>
                {props.cell.numberOfNeighbouringMines}
              </div>
            )}
        </div>
      );
    // ^ If not visible, generate an empty cell.
    else
      return (
        <div
          style={{
            cursor: 'pointer',
          }}
          className="cell"
          onClick={clickedCell}
        ></div>
      );
  }

  // ^ Return function. Running the "generateCell" function when rendering.
  return <div>{generateCell()}</div>;
};

export default Cell;
