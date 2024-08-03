import { performance } from 'perf_hooks';
import { mean, standardDeviation } from 'simple-statistics';
import { Game } from './engine.mjs';
import play from './strategy.mjs';

function measureStrategy({ N = 100 } = {}) {
  const listNumGuesses = [];
  const start = performance.now();

  for (const _ of Array(N).keys()) {
    const game = new Game();
    if (play(game) !== game.secretWord) throw new Error('Strategy failed');
    listNumGuesses.push(game.numGuessesMade());
  }

  console.log(`
    Played ${N.toLocaleString()} Games
    Average Num Guesses = ${mean(listNumGuesses).toFixed(3)}
    Std.Dev Num Guesses = ${standardDeviation(listNumGuesses).toFixed(3)}
    Completed in ${(performance.now() - start) / 1000} seconds
  `);
}

measureStrategy({ N: 100});
