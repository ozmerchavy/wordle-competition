import { KNOWN_WORDS, compareWords } from './engine.mjs';
import { geometricMean } from 'simple-statistics';
import { default as _ } from 'lodash';

function splits(guess, candidates) {
  const groups = _.countBy(candidates, candidate => compareWords(guess, candidate));
  return Object.values(groups).sort((a, b) => a - b);
}

function bestCandidate(candidates) {
  if (candidates.length === 1) return candidates[0];

  let bestGuess = null;
  let bestScore = Infinity;

  const list = candidates.length > 10 ? KNOWN_WORDS : candidates;

  let idx = 0;

  for (const guess of list) {
    const score = geometricMean(splits(guess, candidates));

    if (score < bestScore) {
      bestScore = score;
      bestGuess = guess;
    }

    if (++idx % 100 === 0) {
        console.log(`Processed ${idx} words`);
    }
  }

  return bestGuess;
}

export default function play(game) {
  let candidates = KNOWN_WORDS;

  while (true) {
    const guess = bestCandidate(candidates);
    const resultPattern = game.makeAGuess(guess);

    if (resultPattern === "🟩🟩🟩🟩🟩") return guess;

    candidates = candidates.filter(word => compareWords(guess, word) === resultPattern);
  }
}
