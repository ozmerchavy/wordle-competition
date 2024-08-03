from time import time as now
from engine import Game
import statistics
import strategy


try:
  from tqdm import tqdm
except ImportError:
  def tqdm(vals):
    print("tqdm not found. consider `pip install tqdm` for progress bar.\n")
    return iter(vals)


def measure_strategy(N: int):
  list_num_guesses = []
  start = now()
  
  for _ in tqdm(range(N)):
    game = Game()
    assert strategy.play(game) == game._Game__secret_word
    list_num_guesses.append(game.num_guesses_made())
  
  print(f"""
    Played {N:,} Games
    Average Num Guesses = {statistics.mean(list_num_guesses):.3f}
    Std.Dev Num Guesses = {statistics.stdev(list_num_guesses):.3f}
    Completed in {now() - start:.3f} seconds
  """)


if __name__ == "__main__":
  measure_strategy(N=100)
