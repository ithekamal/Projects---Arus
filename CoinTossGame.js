player2 = 'kamal'

matchTotalScore = { 'system': 0 }   

matchTotalScore[player2] = 0

nameOfPlayers = Object.keys(matchTotalScore)

function HeadOrTail(number) {
    value = (number > 0) ? "Head" : "Tails"
    return value
}


pointsOfplayer1 = []
pointsOfplayer2 = []

function tossHeadWinMatch(players,pointsOfplayer1, pointsOfplayer2, matchTotalScore, tossNo) {
    coinOfPlayer1 = Math.floor(Math.random() * 2)
    coinOfPlayer2 = Math.floor(Math.random() * 2)
    coinOfPlayer1 != 0 && pointsOfplayer1.push(1) & (matchTotalScore['system'] = matchTotalScore['system'] + 1)
    coinOfPlayer2 != 0 && pointsOfplayer2.push(1) & (matchTotalScore['kamal'] = matchTotalScore['kamal'] + 1)
    return (`'Toss:' ${Math.abs(tossNo-10)+1} , ${players[0]}  gets ${(HeadOrTail(coinOfPlayer1)).padEnd(0,11)}  - ${players[1]}  gets ${HeadOrTail(coinOfPlayer2)}`)
}


function printingRoundSummary(playersName,player1Points, player2Points) {
    if (player1Points.length > player2Points.length) {
        return (`\n\nThe ${playersName[0]} win the round by, ${player1Points.length - player2Points.length} points difference\n\n`)
    }
    else if (player1Points.length < player2Points.length) {
        return (`\n\nThe ${playersName[1]} win the round by, ${player2Points.length - player1Points.length} points difference \n\n`)
    }
    else {
        return (`\n\nThe  ${playersName[0]} &  ${playersName[0]} both are Draw, they both got  ${player1Points.length}  points\n\n`)
    }
}


function roundMatch () {
    (function loopingFor10Matches(i) {
        setTimeout(function() {
            console.log((tossHeadWinMatch(nameOfPlayers,pointsOfplayer1, pointsOfplayer2, matchTotalScore, i))     )         
          if (--i) loopingFor10Matches(i);    //  decrement i and call loopingFor10Matches again if i > 0
        }, 1000)
    })(10); 

      setTimeout(() => {
        console.log(printingRoundSummary(nameOfPlayers,pointsOfplayer1,pointsOfplayer2))
    }, 11000);    }


count = 0
a = setInterval(function eachRound() {
    if(count ++ == 5){
        clearInterval(a)
    }
    else{
         roundMatch()
        return eachRound
    }
   
}() , 15000)
    setTimeout(() => {
        console.table(matchTotalScore )
    }, 60000);
