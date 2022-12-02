# --- Day 2: Rock Paper Scissors ---

The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.

Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.

Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.

The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.

The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.

For example, suppose you were given the following strategy guide:

```text
A Y
B X
C Z
```

This strategy guide predicts and recommends the following:

```text
    In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
    In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
    The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.
```

In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).

What would your total score be if everything goes exactly according to your strategy guide?

Your puzzle answer was 11873

## Solution Notes

Ok, similar to yesterday. Gibberish file we need to understand and be able to parse line by line. Copy the logic from Day 1 to read a file line by line.

Next, understanding the requirements. So `A/X = Rock` - `B/Y = Paper` - `C/Z = Scissors` are all linked. We play `XYZ` and our opponent plays `ABC`. Let's read each line's character position so we can target the 0th and 2nd element in the char array, and lets pipe that into a function, because we might have to change the implementation of strategy later.

```js
const lookupMap = {
    A: 'Rock',
    X: 'Rock',
    B: 'Paper',
    Y: 'Paper',
    C: 'Scissors',
    Z: 'Scissors'
}
...
function CalculateScoreFromStrategy(rpsStrategyList)
{
    var tempScore = 0
    for(var index in rpsStrategyList)
    {
        const opponentUses = lookupMap[rpsStrategyList[index].charAt(0)] // Rock
        const playerUses = lookupMap[rpsStrategyList[index].charAt(2)]   // Paper

        tempScore += Evaluate(opponentUses, playerUses)
```

Ok this bit stumped me for a bit, there's not a nice way to do a three way overlapping comparison like `A < B && B < C && C < A` unless you wanted to be really verbose. So I used [stackoverflow for the first time to figure out a nicer pattern for implementing](https://stackoverflow.com/questions/53730900/more-efficient-choice-comparison-for-rock-paper-scissors).

So yeah, can totally just make an object which describes how the comparison is weak and strong against the three different options with the extra attributes we need to care about.

```js
const rpsItems = {
    Rock: { name: 'Rock', weakTo: 'Paper', strongTo: 'Scissors', points: 1 },
    Paper: { name: 'Paper', weakTo: 'Scissors', strongTo: 'Rock', points: 2 },
    Scissors: { name: 'Scissors', weakTo: 'Rock', strongTo: 'Paper', points: 3 }
}
...
function Evaluate(opponentUses, playerUses) // Rock, Paper
{
    if (rpsItems[playerUses].strongTo === rpsItems[opponentUses].name) // Win
    if (rpsItems[playerUses].weakTo === rpsItems[opponentUses].name)   // Lose
    if (rpsItems[playerUses].name === rpsItems[opponentUses].name)     // Draw
}
```

At this point, we've got logs indicating wins and loses are happening as it runs through all 2500 games. Lastly it's just to add the scoring in, which we've already decorated the attributes, so return the result of `gameWinLoseDrawScore + rpsItems[playerUses].points` and sum all the values. My inital score using this guessing strategy is `11873`.

## --- Part Two ---

The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: `X` means you need to lose, `Y` means you need to end the round in a draw, and `Z` means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

```text
    In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
    In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
    In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
```

Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

Your puzzle answer was 12014.

## Solution Notes

Ok, so copying the same pattern, but instead of our guess being present, the strategy has now changed to `X` being a lose, `Y` is a draw and `Z` is a win. That sounds like 3 if statements, not too verbose.

The only thing to be mindful of here is since we don't have what we should play anymore, we only have our opponents guess and if we should win, lose or draw. So knowing the opponent is going to play Rock and we need to win, then we need to look at what our opponent is choosing and pick whatever that guess is weak to, in this case Paper. Our strategy now looks like.

```js
if(strategy === 'X')
{
    //console.log(`I should lose by playing ${rpsItems[opponentUses].strongTo}`)
    return loseGameScore + rpsItems[rpsItems[opponentUses].strongTo].points;
}
if(strategy === 'Y')
{
    //console.log(`I should draw by playing ${rpsItems[opponentUses].name}`)
    return drawGameScore + rpsItems[rpsItems[opponentUses].name].points;
}
if(strategy === 'Z')
{
    //console.log(`I should win by playing ${rpsItems[opponentUses].weakTo}`)
    return winGameScore + rpsItems[rpsItems[opponentUses].weakTo].points;
}
```

Finally determining what to play in which scenario, we can get the attribute for points. Sum our score and yield return that back, exactly like the other pattern. My score using this defined strategy is `12014`.

Actually, I lied, I went back and refactored the method to have more of a strategy style because having 2 functions only being slightly different looked ugly.
