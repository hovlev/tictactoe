import actions from '../../actions';
import { connect } from 'react-redux';
import Table from './Table';

const Board = ({ dispatch, state }) =>
  <div>
    <form className="rules">
      <label>Rows <input type="text" placeholder={state.data.rows} /></label>
      <label>Columns <input type="text" placeholder={state.data.columns} /></label>
      <label>Length to win <input type="text" placeholder={state.data.toWin} /></label>
    </form>
    <div className={state.data.winner ? 'won' : ''}>
      <div className="current_game" onClick={() => { dispatch({ type: actions.RESET_BOARD, payload: {won: state.data.winner} }); }}>
        <Table dispatch={dispatch} board={state.data.board} />
      </div>
      <div className="previous_games">{state.data.previousBoards.map((table) => <Table dispatch={dispatch} board={table} />)}</div>
    </div>
  </div>;

export default connect(state => ({
  state: state
}))(Board);
