import { connect } from 'react-redux';
import styles from './styles';
import actions from '../../actions';
import Board from './../Board';

const App = () =>
  <div className={styles.app}>
    <h1>tictactoe</h1>
    <Board />
  </div>;

export default App;