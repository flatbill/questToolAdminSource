// @ts-nocheck // bypass typescript checker on this one file.
// needed cuz jsPDF invokes weird type checks on doc.text(bla,bla)
import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core' 
import api   from 'src/utils/api'
import jsPDF from 'jspdf'
@Component({
  selector: 'app-qncwwu',
  templateUrl: './qncwwu.component.html'
})
export class QncwwuComponent implements OnInit {
  msg1 = '?'
  usersArray = []
  scoresArray = []
  answersArray = []
  scoreFileName = 'dascore.csv'
  scoresTxt = ''
  userId = ''
  firstName = ''
  lastName = ''
  userDateTime = ''
  r=5
  c=5
  downloadCsvPending = false
  downloadRptPending = false
  lowScoreThresh = 0
  hiScoreThresh = 0
  //utcOffset = new Date().getTimezoneOffset()  // in minutes
  constructor() {}
  @Input() usersIn  
  @Input() custIn  
  @Input() qidIn  
  @Output() qncJumpOut = new EventEmitter() 

  ngOnInit(){
    console.log('running wwu ngOnInit===')
    this.msg1 = 'loading users...'
    this.launchQtReadUsers() // this get db users 
  }

  showHideHelp(){}
  jumpToQnc(){ this.qncJumpOut.emit()}  

  launchQtReadUsers = () => {
  console.log('running launchQtReadUsers') 
  api.qtReadUsers(this.custIn, this.qidIn)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadUsers') 
          this.buildListOfUsers(qtDbRtnObj)
        }
      )
      .catch(() => {  // api.qtReadUsers returned an error 
        console.log('api.qtReadUsers error. cust & qid:' 
        , this.custIn, ' ', this.qidIn )
      })
  } //end launchQtReadUsers

  buildListOfUsers(qtDbObj){
    for (let i = 0; i < qtDbObj.length; i++) {
      this.usersArray.push(qtDbObj[i].data)
      // read usersArray[i].userDateTime string, convert to local dateTime)
      let mydate = new Date(this.usersArray[i].userDateTime)
      //console.log(mydate)
      this.usersArray[i].localUserDateTime = 
           mydate.toLocaleString().replace(',','')
    }
    //console.log('usersArray:')
    //console.table(this.usersArray)
    this.usersArray
    .sort((a, b) => (a.accum > b.accum) ? 1 : -1 )
    this.msg1 = 'Users shown.'
  }

  dnLoadButClicked(ux){
    this.msg1 = 'building a file to download...'
    this.downloadCsvPending = true
    this.buildAndDownload(ux)
  }

  buildAndDownload(ux){
    // find score recs for usersArray[ux].userId 
    // read db for all the score recs and build a file
    this.userId = this.usersArray[ux].userId
    this.firstName = this.usersArray[ux].firstName
    this.lastName = this.usersArray[ux].lastName
    this.userDateTime =  this.usersArray[ux].userDateTime
    this.scoreFileName = this.userId + '.csv'
    this.launchQtReadScores()
    // launchQtReadScores has async processing that does the download.
    // beware this is a whole slew of functions that run in async,
    // following async launchQtReadScores.
  }

 dnLoadScoreFile(dnScoreFileName, txt) {
  var elem = document.createElement('a')
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt))
  elem.setAttribute('download', dnScoreFileName)
  elem.style.display = 'none'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem) 
  this.msg1 = 'file downloaded.'
  this.downloadCsvPending = false
}
 
launchQtReadScores = () => {
  console.log('running LaunchQtReadScores') 
  api.qtReadScores(this.custIn, this.qidIn, this.userId)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadScores') 
          this.buildListOfScores(qtDbRtnObj)
        }
      )
      .catch(() => {  // api.qtReadScores returned an error 
        console.log('api.qtReadScores error. cust & qid & user' 
        , this.custIn, ' ', this.qidIn,' ',this.userId)
      })

} //end launchQtReadScores

buildListOfScores(qtDbObj){ 
    console.log('running buildListOfScores')
    // we have returned from the awaited promise of scores fetch.
    // dbRtnObj contains all the scores objects for this user+date.
    // console.log('here is qtDbObj:')
    // console.table(qtDbObj)
    this.scoresArray = []
    for (let i = 0; i < qtDbObj.length; i++) {
      this.scoresArray.push(qtDbObj[i].data)
    }
    console.log('scoresArray:')
    console.table(this.scoresArray)
    if (this.scoresArray.length == 0) {this.msg1 = 'no scores found.'}
    if (this.scoresArray.length > 0) {
      this.scoresArray
      .sort((a, b) => (a.accum > b.accum) ? 1 : -1 )
      if(this.downloadCsvPending){this.buildScoresCsv()}
      this.launchQtReadAnswers() // beware, more async chaining
    } // end if
}

buildScoresCsv(){
  console.log('running buildScoresCsv')
  console.log(this.firstName)
  console.log(this.lastName)
  this.scoresTxt = this.firstName + ' ' + this.lastName
    + ',,, User Id: '
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
  api.qtReadAnswers(this.custIn, this.qidIn, this.userId)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadAnswers') 
          this.buildListOfAnswers(qtDbRtnObj)
          if (this.downloadRptPending) {
            this.buildRpt()
          }
        }
      )
      .catch(() => {  // api.qtReadAnswers returned an error 
        console.log('api.qtReadAnswers error. cust & qid & user: ' 
        , this.custIn, ' ', this.qidIn,' ',this.userId)
      })
//================
} //end launchQtReadAnswers 

  buildListOfAnswers(qtDbObj){
    console.log('running buildListOfAnswers')
    // we have returned from the awaited promise of answers fetch.
    // dbRtnObj contains all the answer objects for this user+date.
    // console.log('here is qtDbObj:')
    // console.table(qtDbObj)
    this.answersArray = [] // start out with a blank array
    for (let i = 0; i < qtDbObj.length; i++) {
      this.answersArray.push(qtDbObj[i].data)
    }
    console.log('answersArray:')
    console.table(this.answersArray)
    this.answersArray
    .sort((a, b) => (a.questNbr > b.questNbr) ? 1 : -1 )
    this.buildAnswersCsv()  
    if (this.downloadCsvPending){
      this.dnLoadScoreFile(this.scoreFileName,this.scoresTxt)
    } // end if
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


  reportButClick(ux) {
    this.downloadRptPending = true
    this.userId = this.usersArray[ux].userId
    this.firstName = this.usersArray[ux].firstName
    this.lastName = this.usersArray[ux].lastName
    this.userDateTime =  this.usersArray[ux].userDateTime
    this.msg1 = 'building report for ' 
      + this.firstName + ' ' + this.lastName
    this.launchQtReadScores() // has chaining, sets scoresArray
  }

  cc(){ // increment column for jsPdf .  not used?
   this.c = this.c + 30
   return this.c
  } // end cc

  rr(){ // increment row for jsPdf
    this.r = this.r + 5
    return this.r
   } // end rr
 
  buildRpt() {
    console.log('running buildRpt') // doc.text(col,row,myText)
    let doc = new jsPDF('p', 'mm', 'a4')
    this.r = 5
    this.c = 5
    doc.setFontSize(10) // doc.text(col,row,myText)
    doc.text(  5 , this.r, 'Work from Home Assessment')  
    doc.text( 60 ,this.r, this.firstName + ' ' + this.lastName)  
    //doc.line(x-from,y-from,x-to,y-to)
    doc.line(5,7,161,7)
    this.r = 10
  // list score recs.
  // header row for scores report //
  //doc.text(  5 ,this.rr(), 'Here are the scores')   
  doc.setFont("helvetica")
  console.log('262')
  doc.text(5, this.rr(),'Scoreboard') 
  doc.text(50, this.r,   'Score')  
  
  doc.setFont("courier")
  for (let i=0;i<this.scoresArray.length;i++){
    this.setHiLoThreshs(i)
    let assText = this.buildAssessment(this.scoresArray[i].score)
    doc.text(5, this.rr(),this.scoresArray[i].accum) 
    doc.text(50, this.r,   this.scoresArray[i].score.toString())

    // if (this.scoresArray[i].score <= this.lowScoreThresh ){
    //   doc.setFillColor('red')
    //   doc.circle(51, this.r-1,  1.45, 'FD') 
    // }

    // if (this.scoresArray[i].score > this.lowScoreThresh  
    // &&  this.scoresArray[i].score < this.hiScoreThresh ) {
    // doc.setFillColor('cyan')
    // doc.circle(53, this.r-1,  1.45, 'FD') 
    // }

    // if (this.scoresArray[i].score >= this.hiScoreThresh ) {
    //   doc.setFillColor('green')
    //   doc.circle(56, this.r-1,  1.45, 'FD') 
    // }

    doc.text  (60, this.r,  assText)  
  } // end for


  let rptName = this.userId + '.pdf'
  // doc.save('Test.pdf') 
  doc.save(rptName) 
  this.downloadRptPending = false
  this.msg1 = 'built a report for ' 
  + this.firstName + ' ' + this.lastName
}  // end buildRpt

setHiLoThreshs(i){
  console.log ('running setHiLoThreshs')
  // we are working with a specific accumulator.
  // (highest possible points * nbr of questions)
  // hard coded m for every accum.  need to soft code this somehow.
let qCnt = 0 // how many questions for this 
if (this.scoresArray[i].accum  == 'Fdbk-Sup') {qCnt=3} 
if (this.scoresArray[i].accum  == 'Fdbk-Sum')  {qCnt=1} 
if (this.scoresArray[i].accum  == 'Fdbk-Peer') {qCnt=3} 
if (this.scoresArray[i].accum  == 'IN-There') {qCnt=3} 
if (this.scoresArray[i].accum  == 'IN-Tech') {qCnt=3} 
if (this.scoresArray[i].accum  == 'Indep')     {qCnt=4} 
if (this.scoresArray[i].accum  == 'Indep-Sum') {qCnt=1} 
if (this.scoresArray[i].accum  == 'Invol-Sum') {qCnt=1} 
if (this.scoresArray[i].accum  == 'S-Person') {qCnt=5} 
if (this.scoresArray[i].accum  == 'S-Suf')    {qCnt=6} 
if (this.scoresArray[i].accum  == 'S-Suf-Sum') {qCnt=1} 
if (this.scoresArray[i].accum  == 'S-Tech')   {qCnt=5} 
if (this.scoresArray[i].accum  == 'SPer-Sum') {qCnt=1} 
if (this.scoresArray[i].accum  == 'STech-Sum') {qCnt=1} 
this.lowScoreThresh =  qCnt*8/3     // maxPoints/3 
this.hiScoreThresh  =  qCnt*8/3*2   // maxPoints/3*2
// assumes all questions have 1-8 scale
}

buildAssessment(s){
  return  'text that matches this score: ' + s 
//   How to draw a Circle and Ellipse?
// doc.circle(x, y, r,style):
// “x” is the coordinate of the left edge.
// “y” is the coordinate of the top edge.
// “r” is the radius of the circle.
// “style” is a string specifying if stroke, fill or both are to be applied.
}  // end buildAssessment

} // end export qncwwu
