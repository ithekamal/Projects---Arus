interface individualPerformance {
  played : number,
  win :number,
  loss:number
}

interface playerDetail {
  playerId : string,
  name:string,
  rank:number,
  playedMatch:individualPerformance
}


let playerInfo:playerDetail[] = [
    { playerId: '1234e4',    name: 'kamal',    rank: 3, playedMatch: { played: 250, win: 200, loss: 48 } },
    { playerId: '67',        name: 'harish',   rank: 2, playedMatch: { played: 280, win: 250, loss: 29 } },
    { playerId: '1657',      name: 'rambro',    rank: 1, playedMatch: { played: 380, win: 350, loss: 30 } },
    { playerId: '123',       name: 'melwin',   rank: 5, playedMatch: { played: 300, win: 280, loss: 20 } },
    { playerId: '373',       name: 'keerthi',  rank: 4, playedMatch: { played: 100, win: 80, loss: 20 } }, 
    { playerId: '12388',     name: 'karthee',  rank: 6, playedMatch: { played: 150, win: 100, loss: 50 } }, 
    { playerId: '12367',     name: 'simran',   rank: 8, playedMatch: { played: 110, win: 80, loss: 30 } }, 
    { playerId: '12344',     name: 'miracle',  rank: 7, playedMatch: { played: 100, win: 10, loss: 90 } },
    { playerId: '44544',     name: 'vinsri',   rank: 9, playedMatch: { played: 100, win: 10, loss: 90 } },
    { playerId: '83jk44',    name: 'shiva',   rank: 10, playedMatch: { played: 100, win: 10, loss: 90 } },
    { playerId: '902344',    name: 'praveen', rank: 11, playedMatch: { played: 100, win: 10, loss: 90 } },
    { playerId: '890h44',    name: 'emilia',  rank: 12, playedMatch: { played: 100, win: 10, loss: 90 } },
    { playerId: 'op234e4',   name: 'maran',   rank: 13, playedMatch: { played: 50, win: 30, loss: 20 } },
    { playerId: '1239004',   name: 'ravi',    rank: 14, playedMatch: { played: 50, win: 20, loss: 30 } },
    { playerId: '1234e49012',name: 'jo',      rank: 16, playedMatch: { played: 45, win: 20, loss: 25 } },
    { playerId: '12345363',  name: 'abisha',  rank: 15, playedMatch: { played: 30, win: 20, loss: 10 } }]
    

     let matchInfo:any= []
    //Sorted players List Rank wise (high - low)
    function sorting(teamwithRank:any) {
        let sorted:any = []
        let rank = []
        for (let team in teamwithRank) {
            rank.push(teamwithRank[team]['rank'])
        }
        function st(a:any,b:any) {
            return (a - b)
        }
        rank = rank.sort(st)
        for (let j of rank) {
            for (let k in teamwithRank) {
                if (j == teamwithRank[k]['rank']) {
                    sorted.push(teamwithRank[k])
                }
            }
        }
        return sorted
    }
    let sortedPlayers:any = sorting(playerInfo)
    //intial Suffle
    function initialSuffle(match:any) {
        let matchLength = match.length
        let middle = matchLength / 2
        let match1 = match.slice(0, middle)
        let match2 = match.slice(middle, matchLength)
        let tplayers = []
        for (let i = 0; i < match1.length; i++) {
            tplayers.push(match1[i])
            tplayers.push(match2[i])
        }
        return tplayers
    }
    let round1 = initialSuffle(sortedPlayers)
    //array stores matchresults 
    let matchResult:any = []
    //function returns index number of Element in PlayerInfo,based on PlayerId
    function indexOfElementbyplayerID(search:any) {
        let index = 0
        for (let i = 0; i < playerInfo.length; i++) {
            if (search == playerInfo[i].playerId) {
                break;
            }
            index = index + 1
    
        }
        return index
    }
    // Function returns Winner by Probability and updates playerInfo played match details
    function probabilityOfWin(player1:any, player2:any,main:any) {
        matchResult = []
        let matchDetails:any = {}
        matchDetails['matchNo'] = m
        matchDetails['round'] = r
        matchDetails['opponent1'] = player1.name
        matchDetails['opponent2'] = player2.name
        m = m + 1
        let probability = Math.random()
        let probabilityOfHighRank = 1 - probability
        let probabilityOfLowRank = 1 - probabilityOfHighRank
        let differ = Math.abs(probabilityOfLowRank - probabilityOfHighRank)
        if ((probabilityOfLowRank > 0.45) && (differ > 0.25)) {
    
            let updatedplayer1PlayedMatches = player1.playedMatch['played'] + 1
            let updatedplayer1WinnedMatch = player1.playedMatch['win']
            let updatedplayer1lostMatch = player1.playedMatch['loss'] + 1
            //player2 updation
            let updatedplayer2PlayedMatches = player2.playedMatch['played'] + 1
            let updatedplayer2lostMatch = player2.playedMatch['loss']
            let updatedplayer2WinnedMatch = player2.playedMatch['win'] + 1
    
            Object.assign(main[indexOfElementbyplayerID(player1.playerId)], { playedMatch: { played: updatedplayer1PlayedMatches, win: updatedplayer1WinnedMatch, loss: updatedplayer1lostMatch } });
            Object.assign(main[indexOfElementbyplayerID(player2.playerId)], { playedMatch: { played: updatedplayer2PlayedMatches, win: updatedplayer2WinnedMatch, loss: updatedplayer2lostMatch } });
            matchDetails['winnerPlayerID'] = player2.playerId
            matchDetails['winnerPlayer'] = player2.name
    
            matchInfo.push(matchDetails)
            return player2
        }
        else {
            let updatedplayer1PlayedMatches = player1.playedMatch['played'] + 1
            let updatedplayer1WinnedMatch = player1.playedMatch['win'] + 1
            let updatedplayer1lostMatch = player1.playedMatch['loss']
            //player2 updation
            let updatedplayer2PlayedMatches = player2.playedMatch['played'] + 1
            let updatedplayer2lostMatch = player2.playedMatch['loss'] + 1
            let updatedplayer2WinnedMatch = player2.playedMatch['win']
            Object.assign(main[indexOfElementbyplayerID(player1.playerId)], { playedMatch: { played: updatedplayer1PlayedMatches, win: updatedplayer1WinnedMatch, loss: updatedplayer1lostMatch } });
            Object.assign(main[indexOfElementbyplayerID(player2.playerId)], { playedMatch: { played: updatedplayer2PlayedMatches, win: updatedplayer2WinnedMatch, loss: updatedplayer2lostMatch } });
            matchDetails['winnerPlayerID'] = player1.playerId
            matchDetails['winnerPlayer'] = player1.name
            matchInfo.push(matchDetails)
            return player1
        }
    
    
    
    }
    let winner = []
    // function returns Matchups
    function matching(match:any) {
        let matches = []
        let match1:[] = match.filter((element:any) => match.indexOf(element) % 2 == 0)
        let match2:[] = match.filter((element:any) => match.indexOf(element) % 2 != 0)
        for (let player = 0; player < match1.length; player++) {
            matches.push(probabilityOfWin(match1[player], match2[player], playerInfo))
        }
        return matches
    }
    let m = 1
    let r = 1
    //Loop to make Matchups between winners of each match
    while (round1.length > 1) {
        round1 = matching(round1)
        winner.push(round1)
        matchResult = matchInfo
        r = r + 1
    }

 //function returns each round details inside one object 
    function allResults(matchOutput:any) {
    let matchesByround:any = []
    for (let i = 0; i < matchOutput.length; i++) {
        matchesByround.push(matchOutput[i].round)
    }
    let unique = [... new Set(matchesByround)]
    let matches:any = []
    for (let round of unique) {
        let eachRound:any = []
        for (let j = 0; j < matchOutput.length; j++) {
            if (matchOutput[j].round == round) {
                eachRound.push(matchOutput[j])
            }
        }
        matches.push(eachRound)
    } return matches
}

    let results = allResults(matchResult)
  
  //prininting Match schedule
      for (let i = 0; i < results.length; i++) {
          console.log(`--------------------------------ROUND${i+1}--------------------------------`)
          for(let j = 0;j<results[i].length;j++){
                console.log(`MatchNumber:${results[i][j].matchNo}  opponent1 : ${results[i][j].opponent1}       opponent2 : ${results[i][j].opponent2}      winner : ${results[i][j].winnerPlayer}`)

          }
}

//Updated playerInfo
 console.log('-----------------------------------------------------------------------\nUpdated players Info\n',playerInfo)
    

    
    
    
