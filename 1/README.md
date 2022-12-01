# --- Day 1: Calorie Counting ---

Santa's reindeer typically eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, their favorite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows.

To supply enough magical energy, the expedition needs to retrieve a minimum of fifty stars by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and end up with the following list:

```
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

This list represents the Calories of the food carried by five Elves:
```
The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.
```
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

Your puzzle answer was 74711.

## Solution Notes

Ok, simple enough. Read a file, do some aggregation, sort it and take the last element. Already starting to figure out what the functions will look like. There is a part two for this, so potentially will need to make this as flexibile as possible.

`fs` obviously is the easiest way to parse a file, I didn't want to over complicate things, pure NodeJS only. Small consideration in terms of the file size, comparing iterating each line vs loading the whole file into memory. It's not large enough to really require the enchancement, so fuck it, load that puppy into memory.

We can split the files into new lines by using ```.split(/\r?\n/)```. Blank lines will parse to `NaN` so we can calculate where one elfs kcals end, and another begins. Foreaching is now trival, parse and calculate a JSON map of the aggregated data, that'll end the first part of the challenge, just decyphering that gibberish file.

Now, I thought I could sort the array with just `.sort` but it compares the string version, which puts all the 9's at the end, rather than the largest. No bother, just put a sorting function in `.sort((a,b) => { return a - b })` now sorts the interger representation.

Now we have our answer, my solution was `74711`. Tidied up the code a bit and stopped crying about an enhancement to returning the index position.

## --- Part Two ---

By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

## Solution Notes

Nice, we already know the sorted list, so we can just write an adhoc query to calculate the largest three rows.

Actually, lets be nicer, lets instead write a function that takes top X rows, and does the same summing logic.

One of the slight of hands I managed was `[size - 1 - i]`, whereby `size - 1` is the largest row, and then using `i` as an index to move down the large part of the array.

My solution was `209481` from the three largest rows `66773,67997,74711`
