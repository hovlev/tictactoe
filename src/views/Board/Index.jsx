import { connect } from 'react-redux';
import Table from './Table';

const Board = ({ dispatch, board, previousBoards }) =>
  <ul>
    <li className="current_game">
      <Table dispatch={dispatch} board={board} />
    </li>
    {previousBoards.map((table, i) => 
      <li key={i}>
        <Table dispatch={dispatch} board={table} forDisplayPurposesOnly={true} />
      </li>
    )}
  </ul>;

export default connect(state => ({
  board: state.data.board,
  previousBoards: state.data.previousBoards
}))(Board);
