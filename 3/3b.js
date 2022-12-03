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

function GetPriorityFromRepeatingCharacters(s1, s2, s3)
{
    console.log(s1,s2,s3)
    var priority = 0
    var foundCharacters = []

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
                    }
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
    var priority = 0

    for(var i = 0; i < rucksackContentsList.length; i = i + 3)
    {
        //console.log(rucksackContentsList[i], rucksackContentsList[i + 1], rucksackContentsList[i + 2])
        priority += GetPriorityFromRepeatingCharacters(rucksackContentsList[i], rucksackContentsList[i + 1], rucksackContentsList[i + 2])
        console.log(`priority:${priority}`)
    }
    console.log(`the summed priority using 3 strings is ${priority}`)

}

Main()