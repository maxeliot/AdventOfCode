import numpy as np

count_safe_reports = 0

with open(file='input.txt', mode='r') as f:
    for line in f:
        levels = np.array(list(map(int, line.split())))
        differences = np.diff(levels)
        
        safe_decreasing = (-3 <= differences) & (differences <= -1)
        safe_increasing = (1 <= differences) & (differences <= 3)

        if np.all(safe_increasing) or np.all(safe_decreasing):
            count_safe_reports += 1


print(count_safe_reports)