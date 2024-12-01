#!/bin/bash
i=8
while [[ $i -le 25 ]] ; do
	mkdir "day$i"
	cp day7/solution1.js "day$i/solution1.js"
	cp day7/solution2.js "day$i/solution2.js"
	(( i += 1))
done
