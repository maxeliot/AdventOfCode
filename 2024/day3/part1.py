import re

def computeMul(s: str) -> int:
    xs = re.findall(r'\d+', s)
    return int(xs[0]) * int(xs[1])


with open(file="input.txt", mode="r") as f:
    input = f.read()

    # Extract all valid mul(.., ..) strings
    muls = re.findall(pattern="mul\([0-9]{1,3},[0-9]{1,3}\)", string=input)
    muls = list(map(computeMul, muls))

    print(sum(muls))
