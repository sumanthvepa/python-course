"""
  fibonacci.py: Generate a Fibonacci sequence.
"""

def fibonacci(n: int) -> list[int]:
  """
  Generate a Fibonacci sequence up to the n-th number.
  :param n: The length of the Fibonacci sequence to generate.
  :return: A list containing the Fibonacci sequence.
  """
  sequence = [0, 1]
  for i in range(2, n):
    sequence.append(sequence[i - 1] + sequence[i - 2])
  return sequence[:n]

if __name__ == '__main__':
  print(fibonacci(10))