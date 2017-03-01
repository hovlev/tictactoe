import actions from '../../actions';
import Tile from './Tile';

const Table = ({ dispatch, board, forDisplayPurposesOnly }) =>
    <table>
      <tbody>
        {board.map((row, i) =>
          <tr key={i}>{row.map((tile, j) => 
          	<Tile key={j} dispatch={dispatch} row={i} column={j} side={board[i][j]} forDisplayPurposesOnly={forDisplayPurposesOnly} />)}
          </tr>
        )}
      </tbody>
    </table>;

export default Table;