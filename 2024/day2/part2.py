import numpy as np

count_safe_reports = 0

def isSafe(levels):
    differences = np.diff(levels)
        
    safe_decreasing = (-3 <= differences) & (differences <= -1)
    safe_increasing = (1 <= differences) & (differences <= 3)

    return np.all(safe_increasing) or np.all(safe_decreasing)

with open(file='input.txt', mode='r') as f:
    for line in f:
        levels = np.array(list(map(int, line.split())))

        for index in range(len(levels)):
            levels_one_removed = np.delete(levels, index)
            if isSafe(levels_one_removed):
                count_safe_reports += 1
                break
                
print(count_safe_reports)


