enum TypeOfUpd {MAJOR,PATCH,ENHANCEMENT}

let yearToSearch = '2021'    
let bugNumber = '#11'
let nameOfFeature = 'GESTURES'
let typeOfUpdate = TypeOfUpd.MAJOR

interface appInfoInterface {
  name:string,
  releaseDate:string,
  bugsFixed:any,
  features:string[],
  author:string[],
  types: TypeOfUpd
  
}





let instagram:appInfoInterface[] = [
{
  name:"VERSION1.387.43",
  releaseDate:"30-07-2020",
  bugsFixed:[{id:'#11',bug:'VOICECONTROL'},{id:'#12',bug:'TIMEAUTOMATION '}],
  features:['MESSAGE','VOICESENT'],
  author:['KAMAL','SRINI'],
  types: TypeOfUpd.MAJOR
},
{
  name:"VERSION2.3I7.393",
  releaseDate:"06-08-2020",
  bugsFixed:[{id:'#13',bug:'VOICECONTROL'},{id:'#14',bug:'LOGIN'}],
  features:['MESSAGE','GESTURES'],
  author:['KAMAL','RAM'],
  types:TypeOfUpd.PATCH

},
{
  name:"VERSION3.376.337",
  releaseDate:"11-08-2020",
  bugsFixed:[{id:'#15',bug:'COLOURS'},{id:'#16',bug:'LIKEBUTTON'},{id:'#17',bug:'COMMAND'}],
  features:['LIKE','ANIMATION'],
  author:['KAMAL','MANI'],
  types:TypeOfUpd.ENHANCEMENT
},
{
  name:"VERSION4.143.16315",
  releaseDate:"08-11-2020",
  bugsFixed:[{id:'#18',bug:'TAB'},{id:'#19',bug:'PHOTOFILTER'}],
  features:['LIKE','ANIMATION'],
  author:['KAMAL','MANI'],
  types:TypeOfUpd.PATCH
},
{
  name:"VERSION4.256.3873",
  releaseDate:"20-01-2021",
  bugsFixed:[{id:'#20THW',bug:'AUDIO'},{id:'#21GG',bug:'VIDEOBUFFER'},{id:'#22ON',bug:'REFRESH'}],
  features:['THEMES','SHORTVIDEOS','FEED'],
  author:['ARUS','MANI'],
  types:TypeOfUpd.MAJOR
},
]



// Function returns versions Based on Release Year
function infoByYear (year:string){
let count = 0;
for(let i =0 ; i<instagram.length;i++){
  if(instagram[i].releaseDate.slice(6,10) == year){
      count = count +1
      console.log(instagram[i].name)
  }
}
if(count == 0){
    console.log('Kindly check your input')}
    else{
      console.log(`total number of Versions released in year ${year} is ${count}`)
    }}

//Function returns bug info Based on bug number
function infoBybugno (bugNo:string){
  let count = 0
  for(let i =0 ; i<instagram.length;i++){
    for(let j = 0;j<instagram[i].bugsFixed.length;j++){
      if(instagram[i].bugsFixed[j].id == bugNo){
        console.log(`Bug No: ${bugNo}\nType of Bug: ${instagram[i]. bugsFixed[j].bug}\nVersion: ${instagram[i].name}`)
        count++
        
      }}
  }
  if(count == 0){
    console.log('Kindly check your input')
  }}
  
  
//Function returns version info based on features
function infoByFeature (featureName:string){
  let count = 0
  featureName = featureName.toUpperCase()
  for(let i =0 ; i<instagram.length;i++){
    for(let j = 0;j<instagram[i].bugsFixed.length;j++){
      if(instagram[i].features[j] == featureName){
        console.log(`Feature: ${featureName}\nOn Version: ${instagram[i].name}\nRelease Date: ${instagram[i].releaseDate}`)
        count ++
      }}
  }
  if(count == 0){
    console.log('Kindly check your input')}}


//Function returns version info based on type of update 
function infoByTypeOfUpdate (search:TypeOfUpd,appInfo:any){
  let count = 0
    for(let i =0 ; i<appInfo.length;i++){
      if((appInfo[i].types) == search){
          console.log(appInfo[i].name)
          count = count + 1
      }}
    if(count == 0){
    console.log('Kindly check your  input')
}
    else{console.log(`Total Number of versions  Released: ${count}`)
    }
}
  
  
  
  

function mostContriputes(appInfo:any){
    let authorarr:string[] = []
      for(let i =0 ; i<appInfo.length;i++){
        for(let j = 0;j<appInfo[i].author.length;j++){
          authorarr.push(appInfo[i].author[j])
           
    
      }}
    
    let unique  = [... new Set(authorarr)]
    let authorRank:any = {}
      for(let everyAuthor of unique){
      let counter = 0;
      for (let element of authorarr) {
        if (element == everyAuthor) {
              counter++;
          }
          
      }
      authorRank[everyAuthor] = counter
    }
    
    //sorting 
      function sorting(authorInfo:any){
        let sorted:any = {}       
         let points = []
         for(let author in authorInfo){ 
              points.push(authorInfo[author]) }   
                 function st(a:any,b:any){
                 return(a-b)}
                 points = points.sort(st)
                 for(let j of points){
                     for(let k in authorInfo){
                          if(j == authorInfo[k]){
                            sorted[k] = authorInfo[k]}}}
                            let reversedRankList:string[] = []
    
      const reversedKeys = Object.keys(sorted).reverse();
    
      reversedKeys.forEach(key => {
        let person:any = {}
        person['name'] = key
        person['contributions'] = sorted[key]
    
        reversedRankList.push(person);})
             return reversedRankList }  
    //Reversed sorting (high points - Low points)
    let sorted:any = sorting(authorRank)
    console.log(`-----\nMost contributions By ${sorted[0].name}\nNo of contributions : ${sorted[0].contributions} `)}
infoByYear(yearToSearch)

console.log('----')
infoBybugno(bugNumber)
console.log('----')
infoByFeature(nameOfFeature)
console.log('----')
infoByTypeOfUpdate(typeOfUpdate,instagram)
console.log('----')
mostContriputes(instagram)





