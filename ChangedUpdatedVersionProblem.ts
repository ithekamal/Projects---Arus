enum updateType {MAJOR,PATCH,ENHANCEMENT}

let yearToSearch = '2021'    
let bugNumber = '#11'
let nameOfFeature = 'GESTURES'
let typeOfUpdate = updateType.MAJOR

interface bugInformatations {
    id:string,
    bug:string
}


interface appInfoInterface {
  name:string,
  releaseDate:string,
  bugsFixed:bugInformatations[] 
  features:string[],
  author:string[],
  types: updateType
}





let instagram:appInfoInterface[] = [
{
  name:"VERSION1.387.43",
  releaseDate:"30-07-2020",
  bugsFixed:[{id:'#11',bug:'VOICECONTROL'},{id:'#12',bug:'TIMEAUTOMATION '}],
  features:['MESSAGE','VOICESENT'],
  author:['KAMAL','SRINI'],
  types: updateType.MAJOR
},
{
  name:"VERSION2.3I7.393",
  releaseDate:"06-08-2020",
  bugsFixed:[{id:'#13',bug:'VOICECONTROL'},{id:'#14',bug:'LOGIN'}],
  features:['MESSAGE','GESTURES'],
  author:['KAMAL','RAM'],
  types:updateType.PATCH

},
{
  name:"VERSION3.376.337",
  releaseDate:"11-08-2020",
  bugsFixed:[{id:'#15',bug:'COLOURS'},{id:'#16',bug:'LIKEBUTTON'},{id:'#17',bug:'COMMAND'}],
  features:['LIKE','ANIMATION'],
  author:['KAMAL','MANI'],
  types:updateType.ENHANCEMENT
},
{
  name:"VERSION4.143.16315",
  releaseDate:"08-11-2020",
  bugsFixed:[{id:'#18',bug:'TAB'},{id:'#19',bug:'PHOTOFILTER'}],
  features:['LIKE','ANIMATION'],
  author:['KAMAL','MANI'],
  types:updateType.PATCH
},
{
  name:"VERSION4.256.3873",
  releaseDate:"20-01-2021",
  bugsFixed:[{id:'#20THW',bug:'AUDIO'},{id:'#21GG',bug:'VIDEOBUFFER'},{id:'#22ON',bug:'REFRESH'}],
  features:['THEMES','SHORTVIDEOS','FEED'],
  author:['ARUS','MANI'],
  types:updateType.MAJOR
},
]



// Function returns versions Based on Release Year
function findByYear(searchYear:string,searchObject:any){
let versionsReleasedinYear = searchObject.filter((n:any) => n.releaseDate.slice(6,10) == searchYear)
return 'Number of Versions Releaed in year:' +searchYear + ', was '+ (versionsReleasedinYear.length)
}

//Function returns bug info Based on bug number
function findByBugNo (bugNo:string,appInformation:any){
  let bugInformations = []
  for(let eachVersion =0 ;eachVersion  < appInformation.length;eachVersion ++){

    for(let itemOnEachVersion = 0;itemOnEachVersion<appInformation[eachVersion].bugsFixed.length;itemOnEachVersion++){

      if(appInformation[eachVersion ].bugsFixed[itemOnEachVersion].id == bugNo){

           bugInformations.push((`Bug No: ${bugNo}\nType of Bug: ${instagram[eachVersion ]. bugsFixed[itemOnEachVersion].bug}\nVersion: ${instagram[itemOnEachVersion].name}`)       )
     
      }}}
  return bugInformations}

//Function returns version info based on features
function findByFeature (featureName:string){
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


//Function returns total number of versions based on type of update 
function findByTypeOfUpdate (search:any,appInfo:any){
 let typeOfUpdatesFiltered = appInfo.filter((eachVersion:any) => eachVersion.types === search)
 return 'Number of Versions Releaed as type:' + updateType[search] + ', was '+ (typeOfUpdatesFiltered.length)
}
//Function return author works on more version
function mostContriputes(appInfo:any){
    let authorarr:string[] = []
      for(let eachVersion =0 ; eachVersion <appInfo.length;eachVersion++){
        for(let eachElement = 0;eachElement <appInfo[eachVersion].author.length;eachElement++){
          authorarr.push(appInfo[eachVersion].author[eachElement])
      }}
    let unique  = [... new Set(authorarr)]

    let allAuthorsbyRank = []
      for(let everyAuthor of unique){
         let eachAuthorNameandRank = []
      let counter = 0;
      for (let element of authorarr) {
        if (element == everyAuthor) {
              counter++;
          }
      }
     eachAuthorNameandRank.push(everyAuthor)
     eachAuthorNameandRank.push(counter)
     allAuthorsbyRank.push(eachAuthorNameandRank)
    }
    return 'Most Contributions by '+allAuthorsbyRank[0][0]+' and Number of Contributions Made :'+ allAuthorsbyRank[0][1]
 
}

console.log(findByYear(yearToSearch,instagram))
console.log('----')
console.log(findByBugNo(bugNumber ,instagram).join(''))
console.log('----')
findByFeature(nameOfFeature)
console.log('----')
console.log(findByTypeOfUpdate (typeOfUpdate,instagram))
console.log('----')
console.log(mostContriputes(instagram))
