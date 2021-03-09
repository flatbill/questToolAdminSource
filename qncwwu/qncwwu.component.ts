import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core' 
import api from 'src/utils/api'

@Component({
  selector: 'app-qncwwu',
  templateUrl: './qncwwu.component.html'
})
export class QncwwuComponent implements OnInit {
  msg1 = 'user list shown.'
  usersArray = []
  scoresArray = []
  answersArray = []
  scoreFileName = 'dascore.csv'
  scoresTxt = ''
  userId = ''
  userDateTime = ''
  cust = '1' //billy fix
  qid  = '2' // billy fix
  constructor() {}
  @Input() usersIn  
  @Output() qncJumpOut = new EventEmitter() 

  ngOnInit(){
    this.initUsers()
  }

  initUsers(){
    this.usersArray  =
    [
      {userId: '1',
       firstName: 'Jeff',
       lastName: 'Bonzo',
       userDateTime: '03/31/2021T00:00:00',
       status: 'test taking in progress'},
      {userId: '2',
       firstName: 'Rex',
       lastName: 'Tookie',
       userDateTime: '03/31/2011T01:00:00',
       status: 'test taking in progress'},
       {userId: 'DaveSelzer',
       firstName: 'Davie',
       lastName: 'Selzer',
       userDateTime: '03/31/2011T02:00:00', //billy
       status: 'test taking in progress'}
    ]
  }

  showHideHelp(){}
  jumpToQnc(){ this.qncJumpOut.emit()}  

  dnLoadButClicked(ux){
    this.buildAndDownload(ux)
    // this.dnLoadScoreFile(this.scoreFileName,this.scoresTxt)
  }

  buildAndDownload(ux){
    // find score recs for usersArray[ux].userId + date time
    // read db for all the score recs and build a file
    this.cust = '1'
    this.qid = '1'
    this.userId = this.usersArray[ux].userId
    this.userDateTime = "2021-02-17" //billy fix date vs datetime?
    this.launchQtReadScores()
    // launchQtReadScores has async processing that does the download.
    // beware this is a whole slew of functions that run in async,
    // following async launchQtReadScores.
    //this.loadScores(this.usersArray[ux].userId) // testing only
  }

  // loadScores(userId){ // works, but use this for testing only
  //   // read db for userId, stuff each rec into scoresTxt.
  //   this.scoresTxt = ''  
  //   this.scoresTxt = this.scoresTxt + 'more56'
  //   this.scoresTxt = this.scoresTxt + ' more57'
  // }

 dnLoadScoreFile(dnScoreFileName, txt) {
  var elem = document.createElement('a')
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt))
  elem.setAttribute('download', dnScoreFileName)
  elem.style.display = 'none'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem) 
}
 
//================
launchQtReadScores = () => {
  console.log('running LaunchQtReadScores') 
  api.qtReadScores(this.cust, this.qid, this.userId, this.userDateTime)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadScores') 
          this.buildListOfScores(qtDbRtnObj)
        }
      )
      .catch(() => {  // api.qtReadScores returned an error 
        console.log('api.qtReadScores error. cust & qid & user & dateTime:' 
        , this.cust, ' ', this.qid,' ',this.userId,' ',this.userDateTime)
      })
//================


} //end launchQtReadRules

buildListOfScores(qtDbObj){ 
    console.log('running buildListOfScores')
    // we have returned from the awaited promise of scores fetch.
    // dbRtnObj contains all the scores objects for this user+date.
    // console.log('here is qtDbObj:')
    // console.table(qtDbObj)
    for (let i = 0; i < qtDbObj.length; i++) {
      this.scoresArray.push(qtDbObj[i].data)
    }
    console.log('scoresArray:')
    console.table(this.scoresArray)
    this.buildScoresCsv()
    this.launchQtReadAnswers() // beware, more async chaining
}

buildScoresCsv(){
  this.scoresTxt = 'Jonny Rotten,,, User Id: '
    + this.scoresArray[0].quserId + "\r\n"
  this.scoresTxt = this.scoresTxt +
  'Accum,Score,Wscore,Quest Cnt,Time Gap' + "\r\n"
//let csvContent = "data:text/csv;charset=utf-8,"
let row = ''
for (let i = 0; i < this.scoresArray.length; i++) {
  row = 
  //    this.scoresArray[i].cust + ','  
  //  + this.scoresArray[i].qid + ',' 
  //  + this.scoresArray[i].quserId + ',' 
  //  + this.scoresArray[i].testDate + ',' 
     this.scoresArray[i].accum + ',' 
   + this.scoresArray[i].score + ',' 
   + this.scoresArray[i].wscore + ',' 
   + this.scoresArray[i].questCnt + ',' 
   + this.scoresArray[i].timeGap
   console.log(row)
   this.scoresTxt = this.scoresTxt + row + "\r\n"
} // end for
} // end buildScoresCsv

launchQtReadAnswers = () => {
  console.log('running launchQtReadAnswers') 
  api.qtReadAnswers(this.cust, this.qid, this.userId, this.userDateTime)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadAnswers') 
          this.buildListOfAnswers(qtDbRtnObj)
        }
      )
      .catch(() => {  // api.qtReadAnswers returned an error 
        console.log('api.qtReadAnswers error. cust & qid & user & dateTime:' 
        , this.cust, ' ', this.qid,' ',this.userId,' ',this.userDateTime)
      })
//================
} //end launchQtReadAnswers


buildListOfAnswers(qtDbObj){
  console.log('running buildListOfAnswers')
  // we have returned from the awaited promise of answers fetch.
  // dbRtnObj contains all the answer objects for this user+date.
  // console.log('here is qtDbObj:')
  // console.table(qtDbObj)
  for (let i = 0; i < qtDbObj.length; i++) {
    this.answersArray.push(qtDbObj[i].data)
  }
  console.log('answersArray:')
  console.table(this.answersArray)
  this.buildAnswersCsv()  
  this.dnLoadScoreFile(this.scoreFileName,this.scoresTxt)

} // end buildListOfAnswers

  buildAnswersCsv(){ // append answers into the scores csv file.
    this.scoresTxt = this.scoresTxt + "\r\n" + "\r\n"
    this.scoresTxt = this.scoresTxt + 'Quest Nbr, Answer, Time Gap' + "\r\n"
    let row = ''
    for (let i = 0; i < this.answersArray.length; i++) {
      row = 
         this.answersArray[i].questNbr + ',' 
       + this.answersArray[i].answerPoints + ',' 
       + this.answersArray[i].timeGap   
       console.log(row)
      this.scoresTxt = this.scoresTxt + row + "\r\n"
    } // end for
  } // end buildAnswersCsv


} // end export qncwwu


