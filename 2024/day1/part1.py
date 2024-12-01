l1 = []
l2 = []

with open('input.txt', 'r', encoding="utf-8") as f:
    for line in f:
        numbers = line.split()
        l1.append(int(numbers[0]))
        l2.append(int(numbers[1]))

l1.sort()
l2.sort()

sum = 0

for i in range(len(l1)):
    sum += abs(l1[i] - l2[i])

print(sum)
