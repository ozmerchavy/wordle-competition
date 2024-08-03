import random
from engine import Game, KNOWN_WORDS, compare_words


def play(game: Game) -> str:
  """
  Plays the game and finds the secret word.
  """
  candidates = KNOWN_WORDS
  
  while True:
    guess = random.choice(candidates)
    result_pattern = game.make_a_guess(guess)
    
    if result_pattern == "🟩🟩🟩🟩🟩":
      break
    
    candidates = [word for word in candidates if compare_words(guess, word) == result_pattern]

  return guess
