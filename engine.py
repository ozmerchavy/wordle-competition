import random


LETTER_NOT_IN_WORD = "⬜"
CORRECT_LETTER__WRONG_INDEX = "🟨"
CORRECT_LETTER__CORRECT_INDEX = "🟩"


with open("known_words.txt") as file:
  KNOWN_WORDS = file.read().splitlines()


def compare_words(guess: str, secret: str) -> str:
  """
  >>> compare_words("hello", "kelly") == "⬜🟩🟩🟩⬜"
  >>> compare_words("hello", "kohen") == "🟨🟨⬜⬜🟨"
  """
  assert len(guess) == len(secret) == 5
  
  guess = list(guess)
  secret = list(secret)
  
  result = [LETTER_NOT_IN_WORD] * 5
  
  for idx in range(5):
    if guess[idx] == secret[idx]:
      guess[idx] = "_"
      secret[idx] = "_"
      result[idx] = CORRECT_LETTER__CORRECT_INDEX
  
  for idx, letter in enumerate(guess):    
    if letter in secret:
      secret[secret.index(letter)] = "_"
      result[idx] = CORRECT_LETTER__WRONG_INDEX
  
  return "".join(result)


class Game:
  def __init__(self):
    self.__secret_word = random.choice(KNOWN_WORDS)
    self.__guesses_made = 0
  
  
  def make_a_guess(self, guess):
    self.__guesses_made += 1
    return compare_words(guess, self.__secret_word)

  
  def num_guesses_made(self):
    return self.__guesses_made



def __test():
  print("testing the engine...")
  
  game = Game()
  game._Game__secret_word = "hello"
  
  assert game.make_a_guess("fatut") == "⬜⬜⬜⬜⬜"
  assert game.make_a_guess("ehoaa") == "🟨🟨🟨⬜⬜"
  assert game.make_a_guess("helll") == "🟩🟩🟩🟩⬜"
  assert game.make_a_guess("hello") == "🟩🟩🟩🟩🟩"
  
  assert game.num_guesses_made() == 4
  
  print("engine tests passed :)")


if __name__ == "__main__":
  __test()
