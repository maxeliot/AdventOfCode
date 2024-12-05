import re

def computeMul(muls: str) -> int:
    factors = re.findall(r'\d+', muls)
    return int(factors[0]) * int(factors[1])

def computeMulsCleaned(input: str) -> int:
    # Extract all valid mul(.., ..) strings
    muls = re.findall(pattern="mul\([0-9]{1,3},[0-9]{1,3}\)", string=input)
    muls = list(map(computeMul, muls))
    return sum(muls)

def computeMulsUncleaned(input: str, do: bool) -> int:

    # If we are in do mode, compute muls on substring until next don't
    if do:
        dont_idx = re.search(pattern="don't\(\)", string=input)
        if dont_idx:
            return computeMulsCleaned(input[:dont_idx.start()]) + computeMulsUncleaned(input=input[dont_idx.end():], do=False)
        else:
            return computeMulsCleaned(input)
    # If we are in don't mode, search for next do and call this function there
    else:
        do_idx = re.search(pattern="do\(\)", string=input)
        if do_idx:
            return computeMulsUncleaned(input=input[do_idx.end():], do=True)
        else:
            return 0


with open(file="input.txt", mode="r") as f:
    input = f.read()

    print(computeMulsUncleaned(input=input, do=True))
    
