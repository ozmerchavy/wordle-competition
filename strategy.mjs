import { KNOWN_WORDS, compareWords } from './engine.mjs';
import { default as _ } from 'lodash';

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function play(game) {
  let candidates = KNOWN_WORDS;

  while (true) {
    const guess = randomChoice(candidates);
    const resultPattern = game.makeAGuess(guess);

    if (resultPattern === "🟩🟩🟩🟩🟩") return guess;

    candidates = candidates.filter(word => compareWords(guess, word) === resultPattern);
  }
}
