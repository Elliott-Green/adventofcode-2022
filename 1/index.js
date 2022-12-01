const fs = require('fs');

// Given a file representing the list of calories for each elf
// Return a JSON Map of <elf_index, summed_kcals>
function SumCaloriesForElfList(caloriesList)
{
    var index = 0
    var calorieMap = {}
    var tempCalorieCounter = 0

    for(var fileIndex in caloriesList)
    {
        if(Number.parseInt(caloriesList[fileIndex]))
        {
            tempCalorieCounter += Number.parseInt(caloriesList[fileIndex])
        }
        else
        {
            //console.log(`elf ${index} had ${tempCalorieCounter} kcals`)
            calorieMap[index] = tempCalorieCounter
            tempCalorieCounter = 0
            index++
        }
    }
    return calorieMap
}

// Given a JSON Map of <elf_index, summed_kcals>
// Return the row which has the largest `summed_kcals` value
function GetHighestCalorieCount(calorieMap)
{
    const size = Object.keys(calorieMap).length;
    const largestCalorieElfRow = Object.values(calorieMap).sort((a,b) => { return a - b })[size - 1]
    console.log(`fuck` + Object.values(calorieMap).sort((a,b) => { return a - b }))
    return largestCalorieElfRow
}

// Given a JSON Map of <elf_index, summed_kcals> and an int representing top X rows
// Return the summed kcals for the top X rows 
function SumTopXCalorieCounts(calorieMap, topRowsToSum)
{
    var tempCalorieCounter = 0
    const size = Object.keys(calorieMap).length;
    for(var i = 0; i < topRowsToSum; i++)
    {
        const largestCalorieElfRow = Object.values(calorieMap).sort((a,b) => { return a - b })[size - 1 - i]
        tempCalorieCounter += Number.parseInt(largestCalorieElfRow)
    }

    return tempCalorieCounter
}

// Given a file representing the list of calories for each elf
// Return the row which has the largest `summed_kcals` value
function Main()
{
    const data = fs.readFileSync('./input.txt', 'UTF-8')
    const caloriesList = data.split(/\r?\n/)

    const calorieMap = SumCaloriesForElfList(caloriesList)

    const largestCalorieElfRow = GetHighestCalorieCount(calorieMap)

    console.log(`Largest kcals found was ${largestCalorieElfRow}`)

    const threeLargestCaloriesRowsSummed = SumTopXCalorieCounts(calorieMap, 3)

    console.log(`top 3 rows summed is ${threeLargestCaloriesRowsSummed}`)
}

Main()