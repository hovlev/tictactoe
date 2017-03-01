import styles from './styles';
import Board from './../Board';
import Controls from './../Controls';

const App = () =>
  <div className={styles.app}>
    <h1>tictactoe<em>infinite</em></h1>
    <Controls />
    <Board />
  </div>;

export default App;