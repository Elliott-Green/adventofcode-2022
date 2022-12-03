const fs = require('fs');

function GetPriorityForItem(char)
{
    if (char == char.toLowerCase())
    {
        console.log(`returning priority ${char.charCodeAt(0) - 96} for char ${char}`)
        return char.charCodeAt(0) - 96
    }
    else // it's uppercase
    {
        console.log(`returning priority ${char.charCodeAt(0) - 38} for char ${char}`)
        return char.charCodeAt(0) - 38
    }
}

function GetPriorityFromRepeatingCharacters(firstCompartment, secondCompartment)
{
    var priority = 0
    var foundCharacters = []

    for(var x = 0; x < firstCompartment.length; x++)
    {
        for(var y = 0; y < firstCompartment.length; y++)
        {
            if(firstCompartment[x] == secondCompartment[y])
            {
                if(!foundCharacters.includes(firstCompartment[x]))
                {
                    console.log(`comparing ${firstCompartment[x]} ${secondCompartment[y]} and is equal is ${firstCompartment[x] == secondCompartment[y]}`)
                    priority += GetPriorityForItem(firstCompartment[x])
                    foundCharacters.push(firstCompartment[x])
                    console.log(foundCharacters)
                }
                else
                {
                    console.log(`already found char ${firstCompartment[x]} in the string, not adding more priority...`)
                }
            }
        }
    }

    return priority
}

function Main()
{
    const data = fs.readFileSync('./input.txt', 'UTF-8')
    const rucksackContentsList = data.split(/\r?\n/)
    var summedPriority = 0

    for(var index in rucksackContentsList)
    {
        if(rucksackContentsList[index].length % 2 == 0)
        {
            const bagDividingCharacter = rucksackContentsList[index].length / 2
            console.log(rucksackContentsList[index])
            const firstCompartment = rucksackContentsList[index].substring(0, bagDividingCharacter)
            const secondCompartment = rucksackContentsList[index].substring(bagDividingCharacter, rucksackContentsList[index].length)
            console.log(`first half is ${firstCompartment} second half is ${secondCompartment}`)

            summedPriority += GetPriorityFromRepeatingCharacters(firstCompartment, secondCompartment)

            console.log(`the summed priority is ${summedPriority}`)

        }
    }
    console.log(`the summed priority is ${summedPriority}`)

}

Main()