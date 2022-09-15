
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
playersPointsinGame = {'system' : 0, 'you':0 }
totalRounds = 4
tossesInEachRound = 10
playerHere = Object.keys(playersPointsinGame)
totalscorecard = []
roundCounter = []


//main Function to do matchups and store toss winning Details in main array
function storingEachMatchResults(playersName, totalPointstable, listOfEachRoundWins, tossNo) {
    eachMatchDetails = {}
    eachMatchDetails['round'] = roundCounter.length
    eachMatchDetails['tossNumber'] = Math.abs((tossNo - 10)) + 1
    eachMatchDetails['Player1Name'] = playersName[0]
    player1Details = headOrTail('player1', listOfEachRoundWins, eachMatchDetails)
    eachMatchDetails['Player2Name'] = playersName[1]
    player2Details = headOrTail('player2', listOfEachRoundWins, eachMatchDetails)
    totalPointstable.push(eachMatchDetails)
    return (`Toss: ${((Math.abs((tossNo - 10)) + 1))}   , ${playersName[0]}  gets ${(player1Details).padEnd(0, 16)}  - ${playersName[1].padStart(0, 9)}  gets ${player2Details}`)
}

//function to return Head or tail
function headOrTail(playerName, roundScoreList,eachMatchDetatils) {
    numberfromToss = Math.floor(Math.random() * 2)
    if (numberfromToss > 0) {
        eachMatchDetatils[playerName +'toss'] = 'head'
        eachMatchDetatils[playerName + 'Points'] = 1
        roundScoreList.push(playerName)
        return "Head"
    }
    else {
        eachMatchDetatils[playerName +'toss'] = 'Tails'
        eachMatchDetatils[playerName + 'Points'] = 0
        return "tails"
    }
}

//function to give leading scorer based on running score 
function overAllRunningScore(tossWinsbyPlayers, eachGamePoints, playerNameDetails) {
    winsOfEachPlayerinEachRound = {}
    player1WinsInEachRound = tossWinsbyPlayers.filter((element) => element == 'player1')
    player2WinsInEachRound = tossWinsbyPlayers.filter((element) => element == 'player2')

    winsOfEachPlayerinEachRound[playerNameDetails[0]] = player1WinsInEachRound.length
    winsOfEachPlayerinEachRound[playerNameDetails[1]] = player2WinsInEachRound.length

    eachGamePoints[playerNameDetails[0]] = eachGamePoints[playerNameDetails[0]] + player1WinsInEachRound.length
    eachGamePoints[playerNameDetails[1]] = eachGamePoints[playerNameDetails[1]] + player2WinsInEachRound.length
    console.table(winsOfEachPlayerinEachRound)

    if (player1WinsInEachRound.length == player2WinsInEachRound.length) {
        return (' by this round Both are Draw, they Both got ' + player1WinsInEachRound.length + ' points each ')
    }
    else if ((player1WinsInEachRound.length) > (player2WinsInEachRound.length)) {
        return ('by This Round ' + playerNameDetails[0] + ' is leading,by ' + Math.abs(player1WinsInEachRound.length - player2WinsInEachRound.length))
    }
    else {
        return ('by This Round ' + playerNameDetails[1] + ' is leading,by ' + Math.abs(player1WinsInEachRound.length - player2WinsInEachRound.length))
    }
}
//function/loop to make n number of matches for one round
let tossWinnersofEachtoss = []
function roundMatch() {
    (function loopingFor10Matches(match) {
        setTimeout(function () {
            console.log(storingEachMatchResults(playerHere, totalscorecard, tossWinnersofEachtoss, match, 1))
            if (--match) loopingFor10Matches(match);
        }
            , (tossesInEachRound * 100))
    }
    )(tossesInEachRound);

    setTimeout(() => {
        console.log(overAllRunningScore(tossWinnersofEachtoss,
            playersPointsinGame, playerHere))
        console.log('\n')
    }, 11000);
}
// function / loop to make n number of rounds
count = 0
tournment = setInterval(function eachRound() {
    if (count++ == totalRounds) {
        clearInterval(tournment)
    }
    else {
        roundCounter.push(1)
        roundMatch()
        return eachRound
    }

}(), 15000)
setTimeout(() => {
     getCSVFile() 
    console.table(totalscorecard)

}, 60100);
//function to download CSV file of match scorecard i
function getCSVFile() {
    cs =''
    for(i of totalscorecard){
        cs += i.round + ','
        cs += i.tossNumber+ ','
        cs += i.Player1Name+ ','
        cs += i.player1toss + ','
        cs += i.player1Points + ','
        cs += i.Player2Name  + ','
        cs += i.player2toss + ','
        cs += i.player2Points + ','
        cs += '\r\n'
    }
    let tempBloB = new Blob([cs],{type: 'text\csv'})
    let tempUrl = window.URL.createObjectURL(tempBloB)

    let activation = document.createElement('a')
    activation.href = tempUrl

    activation.download = 'coinTossMatchAllResults.csv'
    activation.click()
    window.URL.revokeObjectURL(tempUrl)
    activation.remove()
}

    </script>
</body>
</html>
