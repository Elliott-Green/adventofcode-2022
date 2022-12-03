### --- Day 3: Rucksack Reorganization ---

One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:
```text
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

```text
The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
The fourth rucksack's compartments only share item type v.
The fifth rucksack's compartments only share item type t.
The sixth rucksack's compartments only share item type s.
```
To help prioritize item rearrangement, every item type can be converted to a priority:
```text
Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
```
In the above example, the priority of the item type that appears in both compartments of each rucksack is ```text 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s);``` the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

Your puzzle answer was 7568.

### Solution Notes

Ok, simple enough, lets break this down. Firstly, checked if all the strings character length; modulus 2 was zero, that rules out any string length shenanigans later.

```js
function GetPriorityFromRepeatingCharacters(firstCompartment, secondCompartment)
{
    for(var x = 0; x < firstCompartment.length; x++)
    {
        for(var y = 0; y < firstCompartment.length; y++)
        {
            if(firstCompartment[x] == secondCompartment[y])
            {
```

This feels very bubble-sorty where we vist all the elements of `y` for the first element of `x`, then we move `x` up one, and repeat, till `x` is at it's last position, then just compare the index positions of `x` and `y` from our two strings. Easy enough.

Now to figure out how to calculate the points. Using `.charCodeAt(0)` to get an interger representation of the character, but it's offset, so we need to minus the offset to get to lowercase being 1-26 and uppercase being 27-52. Using `if (char == char.toLowerCase())` to determine how much offset we need to minus, as there are some characters between lower and uppercase that `.charCodeAt(0)` cares about, so we need two offsets.

```js
function GetPriorityForItem(char)
{
    if (char == char.toLowerCase())
    {
        return char.charCodeAt(0) - 96
    }
    else
    {
        return char.charCodeAt(0) - 38
    }
}
```

Another thing to bare in mind is duplicate characters repeating in the string, so once you've seen a character once, you should ignore it for that string in the future. Creating a local char array and adding the characters we've scored already and then only doing the call if we've not seen it before.

```js
var priority = 0
var foundCharacters = []

...

if(firstCompartment[x] == secondCompartment[y])
{
    if(!foundCharacters.includes(firstCompartment[x]))
    {
        priority += GetPriorityForItem(firstCompartment[x])
        foundCharacters.push(firstCompartment[x])
    }
    else
    {
        console.log(`already found char ${firstCompartment[x]} in the string, not adding more priority...`)
```

### --- Part Two ---

As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

```text
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
```

And the second group's rucksacks are the next three lines:

```text
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are ```18 (r) for the first group and 52 (Z)``` for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

Your puzzle answer was 2780.

### --- Part Two ---

Ok, 3A was a bit of a nightmare to refactor and keep the existing code readable, so needed to split this out and refactor it just for neatness sake. Maybe could have had a strategy for reading the file, but who's caring for this challenge.

Ok, 3 strings per evaluation, not 1 cut in half. Bit different, but fine. Lets for loop here, as we have more control over the index, and lets set the index to add 3 every recursion, rather than the standard 1. We can use ```[i], [i+1], [i+2]``` to get each of our three strings per iteration

```js
function Main()
{
    const data = fs.readFileSync('./input.txt', 'UTF-8')
    const rucksackContentsList = data.split(/\r?\n/)
    var priority = 0

    for(var i = 0; i < rucksackContentsList.length; i = i + 3)
    {
        priority += GetPriorityFromRepeatingCharacters(rucksackContentsList[i], rucksackContentsList[i + 1], rucksackContentsList[i + 2])
```

One thing I forgot to bare in mind, even though I thought about it previously is now string length isn't the same, so while it might still be modulus 2, the variation in length between ```s1, s2, s3``` needs to still be accounted for, so this time when we loop, we need to index each string differently in, what's become 3 for loops.

What I did learn is the expression `if(x == y == z)` isn't exactly what you're trying to get it to do, which was fine, but how cool does `x == y == z` look to evaluate over `(s1[x] === s2[y]) && (s2[y] === s3[z])`

```js
for(var x = 0; x < s1.length; x++)
{
    for(var y = 0; y < s2.length; y++)
    {
        for(var z = 0; z < s3.length; z++)
        {
            if((s1[x] === s2[y]) && (s2[y] === s3[z]))
            {
                if(!foundCharacters.includes(s1[x]))
                {
                    console.log(`comparing ${s1[x]} ${s2[y]} ${s3[z]} and is equal is ${(s1[x] === s2[y]) && (s2[y] === s3[z])}`)
                    priority += GetPriorityForItem(s1[x])
                    foundCharacters.push(s1[x])
```
