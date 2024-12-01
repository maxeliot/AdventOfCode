nums = []
num_frequency = {}

with open('input.txt', 'r', encoding="utf-8") as f:
    for line in f:
        numbers = line.split()
        nums.append(numbers[0])
        num_frequency[numbers[1]] = 1 + num_frequency.get(numbers[1], 0)


sum = 0

for num in nums:
    sum += int(num) * num_frequency.get(num, 0)

print(sum)
