
import fs from 'fs';

export const LETTER_NOT_IN_WORD = "⬜";
export const CORRECT_LETTER_WRONG_INDEX = "🟨";
export const CORRECT_LETTER_CORRECT_INDEX = "🟩";

export const KNOWN_WORDS = fs.readFileSync('known_words.txt', 'utf-8').split(/\s+/g);

export function compareWords(guess, secret) {
  if (guess.length !== 5 || secret.length !== 5) throw new Error('Words must be 5 letters long');

  let guessArr = guess.split('');
  let secretArr = secret.split('');
  let result = Array(5).fill(LETTER_NOT_IN_WORD);

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === secretArr[i]) {
      guessArr[i] = '_';
      secretArr[i] = '_';
      result[i] = CORRECT_LETTER_CORRECT_INDEX;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] !== '_' && secretArr.includes(guessArr[i])) {
      secretArr[secretArr.indexOf(guessArr[i])] = '_';
      result[i] = CORRECT_LETTER_WRONG_INDEX;
    }
  }

  return result.join('');
}

export class Game {
  constructor() {
    this.secretWord = KNOWN_WORDS[Math.floor(Math.random() * KNOWN_WORDS.length)];
    this.guessesMade = 0;
  }

  makeAGuess(guess) {
    this.guessesMade += 1;
    return compareWords(guess, this.secretWord);
  }

  numGuessesMade() {
    return this.guessesMade;
  }
}

function __test() {
  console.log("testing the engine...");

  console.assert(compareWords("hello", "kelly") === "⬜🟩🟩🟩⬜");
  console.assert(compareWords("hello", "kohen") === "🟨🟨⬜⬜🟨");

  let game = new Game();
  game.secretWord = "hello";

  console.assert(game.makeAGuess("fatut") === "⬜⬜⬜⬜⬜");
  console.assert(game.makeAGuess("ehoaa") === "🟨🟨🟨⬜⬜");
  console.assert(game.makeAGuess("helll") === "🟩🟩🟩🟩⬜");
  console.assert(game.makeAGuess("hello") === "🟩🟩🟩🟩🟩");

  console.assert(game.numGuessesMade() === 4);

  console.log("engine tests passed :)");
}

__test();
