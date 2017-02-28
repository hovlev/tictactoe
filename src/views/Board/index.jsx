import actions from '../../actions';
import { connect } from 'react-redux';
import Table from './Table';
import Input from './Input';

const Board = ({ dispatch, state }) =>
  <div>
    <form className="rules" onSubmit={e => { e.preventDefault(); dispatch({ type: actions.RESET_BOARD})}}>
      <Input type='rows' label='Rows' dispatch={dispatch} state={state.data.rows} />
      <Input type='columns' label='Columns' dispatch={dispatch} state={state.data.columns} />
      <Input type='toWin' label='Length to Win' dispatch={dispatch} state={state.data.toWin} />
      <button>Reset with rules</button>
    </form>

    <ul>
      <li className="current_game">
        <Table dispatch={dispatch} board={state.data.board} />
      </li>
      {state.data.previousBoards.map((table) => 
        <li>
          <Table dispatch={dispatch} board={table} forDisplayPurposesOnly={true} />
        </li>
      )}
    </ul>
  </div>;

export default connect(state => ({
  state: state
}))(Board);
