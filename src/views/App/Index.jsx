import styles from './styles';
import Board from './../Board';

const App = () =>
  <div className={styles.app}>
    <h1>tictactoe<em>infinite</em></h1>
    <Board />
  </div>;

export default App;