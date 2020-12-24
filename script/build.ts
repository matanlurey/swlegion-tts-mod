import minimist from 'minimist';
import { buildToDist } from '../src';

(async (): Promise<void> => {
  await buildToDist();
})();
