import test from 'tape';
import data from '../../../src/reducers/data';
import actions from '../../../src/actions';

test('reducers/data - initial state', t => {
  t.plan(3);

  t.deepEqual(
    data(undefined, {}),
    { board: [] },
    'sets initial state'
  );
});
