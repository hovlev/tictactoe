import actions from '../../actions';
import { connect } from 'react-redux';
import Tile from './Tile';

const Board = ({ dispatch, state }) =>
  <div className={state.data.winner ? 'won' : ''}>
    <p>Winner: {state.data.winner ? state.data.sides[state.data.winner.player] : 'nobody'}</p>
    <p>{state.data.paused ? 'PAUSED GAME' : 'PLAYING GAME'}</p>
    <table onClick={() => { dispatch({ type: actions.RESET_BOARD, payload: {won: state.data.winner} }); }}>
      <tbody>
        {state.data.board.map((row, i) =>
          <tr>{row.map((tile, j) => <Tile dispatch={dispatch} row={i} column={j} side={state.data.board[i][j]} />)}</tr>
        )}
      </tbody>
    </table>
  </div>;

export default connect(state => ({
  state: state
}))(Board);
