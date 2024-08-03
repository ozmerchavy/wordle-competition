import random
from engine import Game, KNOWN_WORDS, compare_words
from collections import defaultdict
import statistics


def splits(guess, candidates):
  """ sizes of groups that yield the same pattern """
  groups = defaultdict(int)
  
  for candidate in candidates:
    result = compare_words(guess, candidate)
    groups[result] += 1
    
  return sorted(groups.values())


def best_candidate(candidates):
  if len(candidates) == 1:
    return candidates[0]
      
  best_guess = None
  best_score = float("inf")
  
  list = KNOWN_WORDS if len(candidates) > 10 else candidates
  
  for guess in list:
    score = statistics.geometric_mean(splits(guess, candidates))
    
    if score < best_score:
      best_score = score
      best_guess = guess
      
  return best_guess


def play(game: Game) -> str:
  """
  Plays the game and finds the secret word.
  """
  candidates = KNOWN_WORDS
  
  while True:
    guess = best_candidate(candidates)
    result_pattern = game.make_a_guess(guess)
    
    if result_pattern == "🟩🟩🟩🟩🟩":
      return guess
    
    candidates = [word for word in candidates if compare_words(guess, word) == result_pattern]
