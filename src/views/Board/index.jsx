import actions from '../../actions';
import { connect } from 'react-redux';
import Tile from './Tile';

const Board = ({ dispatch, state }) =>
  <table>
    <tbody>
      {state.data.board.map((row, i) =>
        <tr>{row.map((tile, j) => <Tile dispatch={dispatch} row={i} column={j} side={state.data.board[i][j]} />)}</tr>
      )}
    </tbody>
  </table>;

export default connect(state => ({
  state: state
}))(Board);
