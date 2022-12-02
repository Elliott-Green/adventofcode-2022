const fs = require('fs');

const lookupMap = {
    A: 'Rock',
    X: 'Rock',
    B: 'Paper',
    Y: 'Paper',
    C: 'Scissors',
    Z: 'Scissors'
}

const rpsItems = {
    Rock: { name: 'Rock', weakTo: 'Paper', strongTo: 'Scissors', points: 1 },
    Paper: { name: 'Paper', weakTo: 'Scissors', strongTo: 'Rock', points: 2 },
    Scissors: { name: 'Scissors', weakTo: 'Rock', strongTo: 'Paper', points: 3 }
 }

const winGameScore = 6
const drawGameScore = 3
const loseGameScore = 0

function GuessEvaluate(opponentUses, playerUses)
{
    if (rpsItems[playerUses].strongTo === rpsItems[opponentUses].name) 
    {
        //console.log(`I won`)
        return winGameScore + rpsItems[playerUses].points;
    }
    if (rpsItems[playerUses].weakTo === rpsItems[opponentUses].name) 
    {
        //console.log(`Opponent won`)
        return loseGameScore + rpsItems[playerUses].points;
    }
    if (rpsItems[playerUses].name === rpsItems[opponentUses].name) 
    {
        //console.log(`Drawn game`)
        return drawGameScore + rpsItems[playerUses].points;
    }

}

function CalculateScoreFromStrategy(rpsStrategyList, strategy)
{
    var tempScore = 0

    if(strategy === 'Guessed')
    {
        for(var index in rpsStrategyList)
        {
            const opponentUses = lookupMap[rpsStrategyList[index].charAt(0)]
            const playerUses = lookupMap[rpsStrategyList[index].charAt(2)]

            //console.log(`Game ${index} evaluating...`)
            tempScore += GuessEvaluate(opponentUses, playerUses)
        }
        return tempScore
    }
    if(strategy === 'Defined')
    {
        for(var index in rpsStrategyList)
        {
            const opponentUses = lookupMap[rpsStrategyList[index].charAt(0)]
            const winningStrategy = rpsStrategyList[index].charAt(2)
    
            //console.log(`Game ${index} evaluating...`)
            tempScore += DefinedEvaluate(opponentUses, winningStrategy)
        }
        return tempScore
    }
}


function DefinedEvaluate(opponentUses, strategy)
{
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
}



function Main()
{
    const data = fs.readFileSync('./input.txt', 'UTF-8')
    const rpsStrategyList = data.split(/\r?\n/)

    const guessedStrategyScore = CalculateScoreFromStrategy(rpsStrategyList, 'Guessed')
    console.log(`My score using the guessed strategy is ${guessedStrategyScore}`)

    const definedStrategyScore = CalculateScoreFromStrategy(rpsStrategyList, 'Defined')
    console.log(`My score using the defined strategy is ${definedStrategyScore}`)
}

Main()