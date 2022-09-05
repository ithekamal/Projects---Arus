playerInfo = [
  {
    playerId: "1234e4",
    name: "kamal ",
    rank: 3,
    playedMatch: { played: 250, win: 200, loss: 48 },
  },
  {
    playerId: "67",
    name: "harish",
    rank: 2,
    playedMatch: { played: 280, win: 250, loss: 29 },
  },
  {
    playerId: "1657",
    name: "romeo",
    rank: 1,
    playedMatch: { played: 380, win: 350, loss: 30 },
  },
  {
    playerId: "123",
    name: "melwin",
    rank: 5,
    playedMatch: { played: 300, win: 280, loss: 20 },
  },
  {
    playerId: "373",
    name: "keerthi",
    rank: 4,
    playedMatch: { played: 100, win: 80, loss: 20 },
  },
  {
    playerId: "12388",
    name: "karthee",
    rank: 6,
    playedMatch: { played: 150, win: 100, loss: 50 },
  },
  {
    playerId: "12367",
    name: "simran",
    rank: 8,
    playedMatch: { played: 110, win: 80, loss: 30 },
  },
  {
    playerId: "12344",
    name: "miracle",
    rank: 7,
    playedMatch: { played: 100, win: 10, loss: 90 },
  },
  {
    playerId: "44544",
    name: "vinsri",
    rank: 9,
    playedMatch: { played: 100, win: 10, loss: 90 },
  },
  {
    playerId: "83jk44",
    name: "shiva",
    rank: 10,
    playedMatch: { played: 100, win: 10, loss: 90 },
  },
  {
    playerId: "902344",
    name: "praveen",
    rank: 11,
    playedMatch: { played: 100, win: 10, loss: 90 },
  },
  {
    playerId: "890h44",
    name: "emilia",
    rank: 12,
    playedMatch: { played: 100, win: 10, loss: 90 },
  },
  {
    playerId: "op234e4",
    name: "maran",
    rank: 13,
    playedMatch: { played: 50, win: 30, loss: 20 },
  },
  {
    playerId: "1239004",
    name: "ravi",
    rank: 14,
    playedMatch: { played: 50, win: 20, loss: 30 },
  },
  {
    playerId: "1234e49012",
    name: "jo",
    rank: 16,
    playedMatch: { played: 45, win: 20, loss: 25 },
  },
  {
    playerId: "12345363",
    name: "abisha",
    rank: 15,
    playedMatch: { played: 30, win: 20, loss: 10 },
  },
];

//Sorted players List Rank wise (high - low)
function sorting(teamwithRank) {
  let sorted = [];
  let Ranks = [];
  for (let team in teamwithRank) {
    Ranks.push(teamwithRank[team]["rank"]);
  }
  function st(a, b) {
    return a - b;
  }
  Ranks = Ranks.sort(st);
  for (let j of Ranks) {
    for (let k in teamwithRank) {
      if (j == teamwithRank[k]["rank"]) {
        sorted.push(teamwithRank[k]);
      }
    }
  }
  return sorted;
}
sorted = sorting(playerInfo);

//function to assign points
player1Point = 100;
sorted[0]["points"] = 100;
percentagetoReduce = 256 / sorted.length;
function rankToPercentage(playerPoint, percentage) {
  winningPercentage = playerPoint - playerPoint * (percentage / 100);
  player1Point = winningPercentage;
  return winningPercentage;
}
for (i = 1; i < sorted.length; i++) {
  sorted[i]["points"] = rankToPercentage(player1Point, percentagetoReduce);
}
sortedPlayers = sorted

//intial Suffle
function initialSuffle(match) {
  m = match.length;
  middle = m / 2;
  match1 = match.slice(0, middle);
  match2 = match.slice(middle, m).reverse();
  tplayers = [];
  for (i = 0; i < match1.length; i++) {
    tplayers.push(match1[i]);
    tplayers.push(match2[i]);
  }
  return tplayers;
}
round1 = initialSuffle(sortedPlayers);

//array stores matchresults
matchResult = [];


//function returns index number of Element in PlayerInfo,based on PlayerId
function indexOfElementbyplayerID(search) {
  index = 0;
  for (i = 0; i < playerInfo.length; i++) {
    if (search == playerInfo[i].playerId) {
      break;
    }
    index = index + 1;
  }
  return index;
}

//function returns Winner by Probability and updates each players played match details in playerInfo
function probabilityOfWin(player1, player2, main) {
  matchDetails = {};
  matchDetails["matchNo"] = matchNumber;
  matchDetails["round"] = roundNumber;
  matchDetails["opponent1"] = player1.name;
  matchDetails["opponent2"] = player2.name;
  matchNumber = matchNumber + 1;
  totalPointsOfPlayers = player1.points + player2.points;
  player1Probability = player1.points*100 / totalPointsOfPlayers;
  decide = Math.random() * 100;

  if (decide >= player1Probability) {
    updatedplayer1PlayedMatches = player1.playedMatch["played"] + 1;
    updatedplayer1WinnedMatch = player1.playedMatch["win"];
    updatedplayer1lostMatch = player1.playedMatch["loss"] + 1;
    //player2 updation
    updatedplayer2PlayedMatches = player2.playedMatch["played"] + 1;
    updatedplayer2lostMatch = player2.playedMatch["loss"];
    updatedplayer2WinnedMatch = player2.playedMatch["win"] + 1;

    Object.assign(main[indexOfElementbyplayerID(player1.playerId)], {
      playedMatch: {
        played: updatedplayer1PlayedMatches,
        win: updatedplayer1WinnedMatch,
        loss: updatedplayer1lostMatch,
      },
    });
    Object.assign(main[indexOfElementbyplayerID(player2.playerId)], {
      playedMatch: {
        played: updatedplayer2PlayedMatches,
        win: updatedplayer2WinnedMatch,
        loss: updatedplayer2lostMatch,
      },
    });
    matchDetails["winnerPlayerID"] = player2.playerId;
    matchDetails["winnerPlayer"] = player2.name;

    matchInfo.push(matchDetails);
    return player2;
  } else {
    updatedplayer1PlayedMatches = player1.playedMatch["played"] + 1;
    updatedplayer1WinnedMatch = player1.playedMatch["win"] + 1;
    updatedplayer1lostMatch = player1.playedMatch["loss"];
    //player2 updation
    updatedplayer2PlayedMatches = player2.playedMatch["played"] + 1;
    updatedplayer2lostMatch = player2.playedMatch["loss"] + 1;
    updatedplayer2WinnedMatch = player2.playedMatch["win"];
    Object.assign(main[indexOfElementbyplayerID(player1.playerId)], {
      playedMatch: {
        played: updatedplayer1PlayedMatches,
        win: updatedplayer1WinnedMatch,
        loss: updatedplayer1lostMatch,
      },
    });
    Object.assign(main[indexOfElementbyplayerID(player2.playerId)], {
      playedMatch: {
        played: updatedplayer2PlayedMatches,
        win: updatedplayer2WinnedMatch,
        loss: updatedplayer2lostMatch,
      },
    });
    matchDetails["winnerPlayerID"] = player1.playerId;
    matchDetails["winnerPlayer"] = player1.name;
    matchInfo.push(matchDetails);
    return player1;
  }
}

// function returns Matchups
function matching(match) {
  matches = [];
  match1 = match.filter((element) => match.indexOf(element) % 2 == 0);
  match2 = match.filter((element) => match.indexOf(element) % 2 != 0);
  for (player = 0; player < match1.length; player++) {
    matches.push(
      probabilityOfWin(match1[player], match2[player], playerInfo)
    );
  }
  return matches;
}
matchNumber = 1;
roundNumber = 1;

//Loop to make Matchups between winners of each match
while (round1.length > 1) {
  matchInfo = [];
  round1 = matching(round1);
  matchResult.push(matchInfo);
  roundNumber = roundNumber + 1;
}

//match Schedule
for (i = 0; i < matchResult.length; i++) {
  console.log(`----------------------Round${i + 1}----------------------`);
  console.table(matchResult[i]);
}

//Updated playerInfo
console.log("Updated players Info\n", playerInfo);
