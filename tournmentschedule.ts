let teams:any = ['mumbai', 'chennai', 'delhi', 'kalcut'];
let startingDate:string = '06-08-2022';
let venues:string[] = ['chepauk'];

//Function to return matchups based on Round Robin
const RoundRobinTeam = (teams:string[]) => {
  let groups:any = {};
  let matchupSchedule = [];
  let matchUp = [];

  // if an odd number, add a null Team
  if (teams.length % 2 === 1) {
    teams.push('null');
  }


  const group1 = teams.slice(0, Math.floor(teams.length / 2));
  const group2 = teams.slice(group1.length, teams.length);

  for (let r = 0; r < teams.length - 1; r++) {
    let round = [];
    for (let team = 0; team < teams.length / 2; team++) {
      if (group1[team] !== 'null' && group2[team] !== 'null' ) {
        round.push({ group1: group1[team], group2: group2[team] });
      }
    }

    // clockwise rotation (with 1st team fixed)

    const lastgroup1team = group1[group1.length - 1];
    const firstgroup2team = group2[0];

    group1.splice(-1, 1);
    group2.splice(0, 1);
    group1.splice(1, 0, firstgroup2team);
    group2.push(lastgroup1team);

    groups[`Round ${r + 1}`] = round;
    matchupSchedule.push(round);
  }

  //Merging Matchups In a Single Object
  for (let i = 0; i < matchupSchedule.length; i++) {
    for (let j of matchupSchedule[i]) {
      matchUp.push(j);
    }
  }

  return matchUp;
};
let matchUp = RoundRobinTeam(teams);



//Function to return n number of Weekend (day and Date)
const arrayOfWeekends = (tournmentstartDate:string, matchUp:any) => {
  let changeDateformat = new Date(tournmentstartDate);
  let date =
    changeDateformat.getDate() +
    '-' +
    (changeDateformat.getMonth() + 1) +
    '-' +
    changeDateformat.getFullYear();
  let startDate = new Date(date);
  let listOfweekends = [];

  // Loop to return next n-weekend day and date
  for (let i = 0; i < matchUp.length * 10; i++) {
    startDate.setDate(startDate.getDate() + 1);
    if (startDate.getDay() == 6 || startDate.getDay() == 0) {
      let day = startDate.toString().slice(7, 10);
      let date =
        day + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear();
      let weekend:any = {};
      if (startDate.getDay() == 6) {
        weekend['Saturday'] = date;
        listOfweekends.push(weekend);
      } else {
        weekend['Sunday'] = date;
        listOfweekends.push(weekend);
      }
    }
  }

  return listOfweekends;
};
let weekendDates = arrayOfWeekends(startingDate, matchUp);

//Function to return number of after given Date
const assignedWeekdays = (weekendDates:string[], venues:string[]) => {
  let weekendOnmatch = [];
  let numberofVenues = venues.length;
  for (let indexOfday = 0; indexOfday < weekendDates.length; indexOfday++) {
    if (indexOfday % 2 == 0) {
      for (let i = 0; i < numberofVenues * 2; i++) {
        weekendOnmatch.push(weekendDates[indexOfday]);
      }
    } else {
      for (let i = 0; i < numberofVenues * 2; i++) {
        weekendOnmatch.push(weekendDates[indexOfday]);
      }
    }
  }
  return weekendOnmatch;
};

let scheduledWeekdays = assignedWeekdays(weekendDates, venues);

//Function fo assigning Slots for Weekdays
const slots = (scheduledWeekdays:any) => {
  let slot = [];
  for (let i = 0; i < scheduledWeekdays.length; i++) {
    if (i % 2 == 0) {
      slot.push(1);
    } else {
      slot.push(2);
    }
  }
  return slot;
};

let slot = slots(scheduledWeekdays);

//Function to return Schedule Table
function timeTable(){
  let tableOfMatchInfo:any = [];
  for (let i = 0; i < matchUp.length; i++) {
    let singleMatch:any = {};
    singleMatch['match'] = i + 1;
    singleMatch['slot'] = slot[i];
    singleMatch['team1'] = matchUp[i]['group1'];
    singleMatch['team2'] = matchUp[i]['group2'];
    singleMatch['day'] =  (Object.keys(scheduledWeekdays[i]))
    singleMatch['date'] = Object.values(scheduledWeekdays[i])
    singleMatch['venue'] = venues[0];
    let decide = Math.floor(Math.random() * 2);
    if (decide == 0) {
      singleMatch['winner'] = matchUp[i]['group1'];
      singleMatch['defeated'] = matchUp[i]['group2'];
    } else {
      singleMatch['winner'] = matchUp[i]['group2'];
      singleMatch['defeated'] = matchUp[i]['group1'];
    }

    tableOfMatchInfo.push(singleMatch);
  }
  return tableOfMatchInfo;
};
let scheduledTable = timeTable();

//Function to return summery
const summary = () => {
  console.log('************** MATCH SCHEDULE **************');
  for (let match = 0; match < scheduledTable.length; match++) {
    console.log("------------------------------------------------------------------------------------")
    console.log(`MATCH NO : ${(match + 1)}                                            DATE:${scheduledTable[match]['date']}  `)

    
    console.log ( `\n                            ${scheduledTable[match]['team1']} vs ${scheduledTable[match]['team2']} `)
    console.log(` \n        SLOT:${scheduledTable[match]['slot']}                                                   DAY:${scheduledTable[match]['day']}`)
  console.log(`VENUE :${scheduledTable[match]['venue']}`)
}
console.log('------------------------------------------------------------------------------------')
};
summary();

//Function to return Match winners List
const matchResults = (scheduledTable:any) => {
  let matchparticipants:any = [];
  for (let i = 0; i < scheduledTable.length; i++) {
    let winnerandDefeated:any = {};
    winnerandDefeated[scheduledTable[i].winner] = scheduledTable[i].defeated;
    matchparticipants.push(winnerandDefeated);
  }
  return matchparticipants;
};

let results = matchResults(scheduledTable);

//Function for return Sorted points Table (hight - low)
const pointsTable = (objOfWinnerandDefeated:any,matchteam:[]) =>{
//-------
const findReappers = (find:any,Team:any) =>{
  let counter = 0;
  for (let element of Team) {
    if (element == find) {
          counter++;
      }
      
  }
    return counter
  }
//-------------------

let winnerTeam =[] 
for(let i = 0;i<objOfWinnerandDefeated.length;i++){winnerTeam.push(Object.keys(results[i]).join(''))}
let unique = [...new Set(winnerTeam)];

let teamwithPoints:any = []
for(let eachTeams of unique){
  teamwithPoints[eachTeams]=(findReappers(eachTeams,winnerTeam ))*2
}


for(let i of matchteam){
  let find = findReappers(i,unique)
    if(find == 0){
      teamwithPoints[i] = 0
  }
}

//Sorting Teams with 
  function sorting(teamwithPoint:any){
    let sorted:any = {}       
     let points = []
     for(let team in teamwithPoint){ 
          points.push(teamwithPoint[team]) }   
             function st(a:any,b:any){
             return(a-b)}
             points = points.sort(st)
             for(let j of points){
                 for(let k in teamwithPoint){
                      if(j == teamwithPoint[k]){
                        sorted[k] = teamwithPoint[k]}}}
         return sorted}  
    //Reversed sorting (high points - Low points)
    let sortedPointsTable = sorting(teamwithPoints)
    let reversedPointlist:any = {}
    const reversedKeys = Object.keys(sortedPointsTable).reverse();
    reversedKeys.forEach(key => {
      reversedPointlist[key]= sortedPointsTable[key];
    });
    return reversedPointlist
}
  


let sortedPointsTable = (pointsTable(results,teams))

//Function For Return Match summary
const shortmatchSummary = (winnerandDefeated:any) =>{
  console.log('\n************** MATCH SUMMARY **************\n')
  for(let i = 0;i<winnerandDefeated.length;i++){
    let runDifference = Math.floor(Math.random() * 90) + 10;
    console.log(`on ${(winnerandDefeated[i].date).toString()}, ${(winnerandDefeated[i].winner).toString()} and  ${(winnerandDefeated[i].defeated).toString()} played , Where team ${(winnerandDefeated[i].winner).toString()} won by ${runDifference} runs`)
  }
  

}
shortmatchSummary(scheduledTable)





// Function to return Points Table Summary
const pointsTablesummary = (pointsList:any) =>{
    console.log('\n************** POINTS TABLE **************\n')
    console.log('PLACE      TEAM              POINTS\n')
    teams = Object.keys(pointsList)
    let points = Object.values(pointsList)
    for(let i=0;i<teams.length;i++){
    if(teams[i]!='null'){
      console.log(`${i+1}         ${teams[i].padEnd(14,' ')}       ${points[i]}`)}}
      }
pointsTablesummary(sortedPointsTable)
