import actions from '../../actions';
import Tile from './Tile';

const Table = ({ dispatch, board }) =>
    <table>
      <tbody>
        {board.map((row, i) =>
          <tr>{row.map((tile, j) => <Tile dispatch={dispatch} row={i} column={j} side={board[i][j]} />)}</tr>
        )}
      </tbody>
    </table>;

export default Table;