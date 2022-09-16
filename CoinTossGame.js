
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
playerNamesList = Object.keys(playersPointsinGame)
totalscorecard = []
roundCounter = 0


//main Function to do matchups and store toss winning Details in main array
function storingEachMatchResults(playersName, totalPointstable, tossNo) {
    eachMatchDetails = {}
    eachMatchDetails['round'] = roundCounter
    eachMatchDetails['tossNumber'] = Math.abs((tossNo - 10)) + 1
    eachMatchDetails['Player1Name'] = playersName[0]
    player1Details = headOrTail('player1', eachMatchDetails)
    eachMatchDetails['Player2Name'] = playersName[1]
    player2Details = headOrTail('player2', eachMatchDetails)
    totalPointstable.push(eachMatchDetails)
    return (`Toss: ${((Math.abs((tossNo - 10)) + 1))}\n${playersName[0]}  gets ${(player1Details)}\n${playersName[1].padStart(0, 9)}  gets ${player2Details}`)
}

//function to return Head or tail
function headOrTail(playerName,eachMatchDetatils) {
    numberfromToss = Math.floor(Math.random() * 2)
    if (numberfromToss > 0) {
        eachMatchDetatils[playerName +'toss'] = 'head'
        eachMatchDetatils[playerName + 'Points'] = 1
        return "Head"
    }
    else {
        eachMatchDetatils[playerName +'toss'] = 'Tails'
        eachMatchDetatils[playerName + 'Points'] = 0
        return "tails"
    }
}

//function to give leading scorer based on running score 


function overAllRunningScore(mainScoreBoard,playerNameDetails) {
    winsOfEachPlayerinEachRound = {}
    player1Points = mainScoreBoard.reduce((prev,nxt) => prev + nxt.player1Points,0)
    player2Points = mainScoreBoard.reduce((prev,nxt) => prev + nxt.player2Points,0)
    winsOfEachPlayerinEachRound[playerNameDetails[0]] = player1Points
    winsOfEachPlayerinEachRound[playerNameDetails[1]] = player2Points
    console.table(winsOfEachPlayerinEachRound)
    if(roundCounter < totalRounds){
      if (player1Points == player2Points) {
        return (' by the end of  this round Both Players are Draw, they Both got ' + player1Points + ' points each ')
    }
    else if ((player1Points) > (player2Points)) {
        return (' by the end of  this ' + playerNameDetails[0] + ' is leading,by ' + Math.abs(player1Points - player2Points) + 'Points')
    }
    else {
        return (' by the end of  this ' + playerNameDetails[1] + ' is leading,by ' + Math.abs(player1Points - player2Points) + 'Points')
    }
}else{ if (player1Points == player2Points) {
    return ('In this Game Both Players are Draw, they Both got ' + player1Points + ' points each ')
    }
    else if ((player1Points) > (player2Points)) {
        return (' In this Game ' + playerNameDetails[0] + ' Win,by ' + Math.abs(player1Points - player2Points) + 'Points difference')
    }
    else {
        return (' In this Game ' + playerNameDetails[1] + ' Win,by ' + Math.abs(player1Points - player2Points) + 'Points difference')
    }

}

    }
    

//function/loop to make n number of matches for one round
function roundMatch() {
    (function loopingFor10Matches(match) {
        setTimeout(function () {
            console.log(storingEachMatchResults(playerNamesList, totalscorecard, match, 1))
            if (--match) loopingFor10Matches(match);
        }
            , (tossesInEachRound * 100))
    }
    )(tossesInEachRound);

    setTimeout(() => {
        console.log(overAllRunningScore(totalscorecard, playerNamesList))
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
        roundCounter+=1
        console.log(`---------------Round ${roundCounter}---------------`)
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
    cs += 'Round,tossNumber,Player1Name,player1toss,player1Points,Player2Name,player2toss,player2Points,'
    cs += '\r\n'


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
