import { connect } from 'react-redux';
import actions from '../../actions';
import Input from './Input';

const Controls = ({ dispatch, data }) =>
  <div>
    <div className={`current_player side_${data.sides[data.currentPlayer]}`}></div>
    <form className="rules" onSubmit={e => { 
      e.preventDefault(); dispatch({ type: actions.RESET_BOARD }); 
    }}>
      <div className="score side_x">{data.score[0]}</div>
      <Input type="rows" label="Rows" dispatch={dispatch} value={data.rows} />
      <Input type="columns" label="Columns" dispatch={dispatch} value={data.columns} />
      <Input type="toWin" label="Length to Win" dispatch={dispatch} value={data.toWin} />
      <div className="score side_o">{data.score[1]}</div>
    </form>
  </div>;

export default connect(state => ({
  data: state.data
}))(Controls);
