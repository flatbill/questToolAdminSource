import {  HostListener, Component } from '@angular/core'
import api from 'src/utils/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @HostListener('document:keydown', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") { this.escKeyWasHit() }
  } // end onKeydownHandler
  title = 'Qnc Admin'
  compTitle = 'Qnc Login'
  showQnc = false  
  showQncWwq = false
  showQncWwqd = false
  showQncWwg = false
  showQncWwgd = false
  showQncWwr = false  
  showQncWwrd = false 
  showQncWwi = false
  showQncWwu = false
  showQncWws = true // start with a login
  showQncConv = false  // set this true for ed338 conversion
  showQncMen = true // jun2021 menu always true
  showQncPro = false  // profile
  showAppComponent = false  // set this true for debugging
  subsetArray = []
  rulesArray = []  
  questArray = []     // master list of questions
  questArray2 = []    // filtered list of questions
  accumArray = []
  daQuestion = 'no Question yet'
  wwqdCaller = 'no wwqdCaller yet'
  qid = '?'  
  cust = '?'
  accumObj = {}
  qncAuthorized = false
  menuButsAlive = false
  firstLogin = true
  ngOnInit()  {
    this.setQueryStringParms() // billy fix
    //this.initSubsets() //temp for testing
    //this.initRules()   //temp for testing
    //this.initQuestions()   //temp for testing
  } // end ngInit

  setQueryStringParms(){
      let locSearchResult = new URLSearchParams(location.search)
      let locSearchResultCust  = locSearchResult.get('cust')
      let locSearchResultQid   = locSearchResult.get('qid')
      let locSearchResultIcode = locSearchResult.get('icode')
       if (locSearchResultCust != null) {
        this.cust = locSearchResultCust
      }
      if (locSearchResultQid != null) {
        this.qid = locSearchResultQid
      }
      // if (locSearchResultIcode != null) {
      //   this.icode = locSearchResultIcode
      // }
      // when no querystring, set default  qid 4
      // not a great idea when we get more.
      if(this.cust == '?'){this.cust = '1'}
      if(this.qid == '?'){this.qid = '4'}
      //if(this.icode == '?'){this.icode = '90210'}
      console.log('this.cust is: ',this.cust)
      console.log('this.qid is: ',this.qid)
      //console.log('this.icode is: ',this.icode)
  }
  

  // initSubsets(){
  //   this.subsetArray =
  //   ["main1", 
  //   "parakeetFollowOn", 
  //   "main2", 
  //   "iqFollowOn", 
  //   "main3"]
  // } //end InitSubsets

  DeleteMe1(){}

  // initRules(){
  //   this.rulesArray = 
  //   [
  //   {
  //     cust: "1",
  //     qid: "2",
  //     subset: "parakeetFollowOn",
  //     accum: "pk1",
  //     oper: ">",
  //     thresh: 0
  //   },
  //   {
  //     cust: "1",
  //     qid: "2",
  //     subset: "iqFollowOn",
  //     accum: "iqAccum",
  //     oper: "==",
  //     thresh: 1
  //   }
  //   ]
  // } //end initRules

  DeleteMe2(){}

  // initQuestions(){
  // // temp disable to reduce fauna db usage
  // this.questArray = //billy temp test reduce db usage
  //   [
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "001",
  //       questSeq: "001",
  //       questTxt: "Welcome!",
  //       preQuest: "",
  //       aca: ["... continue ..."],
  //       acaPointVals: [0],
  //       accum: ["dummy"],
  //       subset: "main1"
  //     }
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "002",
  //       questSeq: "003",
  //       questTxt: "Do you have a pet parakeet?",
  //       preQuest: "",
  //       aca: ["yes", "no"],
  //       acaPointVals: [1, 0],
  //       accum: ["pk1"],
  //       subset: "main1"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "003",
  //       questSeq: "004",
  //       questTxt: "What's your parakeet's shoe size?",
  //       preQuest: "",
  //       aca: ["11", "12", "13"],
  //       acaPointVals: [11, 12, 13],
  //       accum: ["bla"],
  //       subset: "parakeetFollowOn"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "004",
  //       questSeq: "001",
  //       questTxt: "Would you like to test your IQ?",
  //       preQuest: "",
  //       aca: ["yes", "no"],
  //       acaPointVals: [1, 0],
  //       accum: ["iq1"],
  //       subset: "main2"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "005",
  //       questSeq: "001",
  //       questTxt: "Who is buried in Grant's tomb?:",
  //       preQuest: "Here is the first IQ question:",
  //       aca: ["me", "President Grant", "Kenny"],
  //       acaPointVals: [0, 1, 0],
  //       accum: ["iqAccum"],
  //       subset: "iqFollowOn"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "006",
  //       questSeq: "002",
  //       questTxt: "How many inches is 6 feet?:",
  //       preQuest: "Here is the second IQ question:",
  //       aca: ["2", "36", "72"],
  //       acaPointVals: [0, 0, 1],
  //       accum: ["iqAccum"],
  //       subset: "iqFollowOn"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "007",
  //       questSeq: "001",
  //       questTxt: "Have you ever seen lassie?",
  //       preQuest: "This question is in subset main3",
  //       aca: ["yes", "no"],
  //       acaPointVals: [1, 0],
  //       accum: ["lassieAccum"],
  //       subset: "main3"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "008",
  //       questSeq: "002",
  //       questTxt: "How would you rate your mother?",
  //       preQuest: "A personal question here:",
  //       aca: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //       acaPointVals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //       accum: ["motherScore"],
  //       subset: "main3"
  //     }   
  //     ,
  //     {
  //       cust: "1",
  //       qid: "2",
  //       questNbr: "009",
  //       questSeq: "002",
  //       questTxt: "Welcome.  Oh, I already said that!",
  //       preQuest: "",
  //       aca: ["... continue ..."],
  //       acaPointVals: [0],
  //       accum: ["dummy"],
  //       subset: "main1"
  //     }  
  //   ]
  // this.questArray2 = this.questArray
  // //console.table(this.questArray)
  // } //end initQuestions

  setAuthOnFun(){
    // get here from login screen
    console.log('running app component setAuthOnFun')
    this.qncAuthorized = true
    this.menuButsAlive = true  //make menu alive
    this.launchReadAllDbTables() 
  }

  showQncFun(){
    this.setAllShowCompFalse()
    this.showQnc = true
  } //end showQncFun
  showWwqFun(ev){
    // this.questionsQncWwq = this.questArray 
    //this.questions2QncWwq = this.questArray2
    // this.subsetQncWwq = this.subset 
    this.compTitle = 'Qnc Questions'
    this.setAllShowCompFalse() 
    this.showQncWwq = true
  } // end showWwqFun
  showWwqdFun(ev){
    this.compTitle = 'Qnc Question Detail' 
    this.setAllShowCompFalse()
    this.showQncWwqd = true 
  } // end showWwqdFun
  showWwgFun(ev){
    this.compTitle = 'Qnc Groups' 
    this.setAllShowCompFalse()
    this.showQncWwg = true
  } // end showWwgFun
  showWwgdFun(ev){
    this.compTitle = 'Qnc Group Details' 
    this.setAllShowCompFalse()
    this.showQncWwgd = true 
  } // end showWwgdFun
  showWwrFun(ev){
    this.compTitle = 'Qnc Rules' 
    this.setAllShowCompFalse()
    this.showQncWwr = true
  } // end showWwrFun
  showWwrdFun(ev){
    this.compTitle = 'Qnc Rule Details' 
    this.setAllShowCompFalse()
    this.showQncWwrd = true
  } // end showWwrdFun
  showWwiFun(ev){
    this.compTitle = 'Qnc Invitations' 
    this.setAllShowCompFalse()
    this.showQncWwi = true
  } // end showWwiFun
  showWwuFun(ev){
    this.compTitle = 'Qnc Users' 
    this.setAllShowCompFalse()
    this.showQncWwu = true 
  } // end showWwuFun
  showWwsFun(ev){
    console.log('running showWwsFun')
    this.compTitle = 'Qnc Login' 
    this.qncAuthorized = false
    this.menuButsAlive = false
    this.firstLogin = false
    this.setAllShowCompFalse()
    this.showQncWws = true 
  } // end showWwsFun
  showProFun(ev){
    this.compTitle = 'Qnc Profile' 
    this.setAllShowCompFalse()
    this.showQncPro = true 
  } // end showProFun


  setAllShowCompFalse(){
    this.showQnc    = false
    this.showQncWwg = false
    this.showQncWwgd = false
    this.showQncWwq = false
    this.showQncWwqd = false
    this.showQncWwr = false
    this.showQncWwrd = false
    this.showQncWwi = false
    this.showQncWwu = false
    this.showQncWws = false
    this.showQncPro = false
    this.showQncConv = false
  } // end setAllShowCompFalse

  setQuestFromWwqFun(ev){
    console.log('running app setQuestFromWwqFun')
    // use selected question from wwq
    // pass it into daquestion
    // to get ready to call wwqd
    this.daQuestion = ev
    this.wwqdCaller = 'wwq'
  }

  setQuest2FromWwqFun(ev){ // ev is quest2 from wwq
    console.log('running app setQuest2FromWwqFun')
    this.questArray2 = ev
  }

  escKeyWasHit(){ 
    console.log('runninng app escKeyWasHit') 
    this.setAllShowCompFalse()
    this.showQnc = true
    // billy, if he hits esc when inside wwqd
    // then jump to wwq (not qnc)
    // maybe something like this:
    //  if(this.wwqdCaller=='qnc') { this.showQncFun() }
    //  if(this.wwqdCaller=='wwq') { this.showWwqFun() }

  }
  
  sortQuestArray(){
    console.log('running sortQuestArray')
  this.questArray
  .sort((a, b) => (a.questNbr > b.questNbr) ? 1 : (a.questNbr === b.questNbr) ? ((a.questSeq > b.questSeq) ? 1 : -1) : -1 )
  console.table(this.questArray)
  } // end sortQuestArray

  launchReadAllDbTables = () => {
  api.qtReadQuestions(this.cust,this.qid)
      .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of qtReadQuestions') 
          console.log('custAndQid:',this.cust,this.qid)
          console.table(qtDbRtnObj)
          this.loadQuestionsFromDbToQuestArray(qtDbRtnObj)
          this.sortQuestArray()  
          this.buildListOfAccumsFromQuestArray()
          this.launchQtReadRules() 
        }
      )
      .catch(() => {  // api.qtReadQuestions returned an error 
        console.log('api.qtReadQuestions error.' )
      })
  }  // end launchReadAllDbTables
 
  loadQuestionsFromDbToQuestArray(qtDbObj){
    console.log('running loadQuestionsFromDbToQuestArray')
    // input is qtDbObj from database and output allQuestions array.
    // get here from .then of reading quest table,
    // so qtDbObj is ready to use.
    this.questArray.length = 0 //blank out array, then load it
    for (let i = 0; i < qtDbObj.length; i++) {
      this.questArray.push(qtDbObj[i].data)
    }
  }  // end loadQuestionsFromDbToQuestArray
 
  launchQtReadRules = () => {
  console.log('running LaunchQtReadRules')
  api.qtReadRules(this.cust,this.qid)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadRules') 
          this.buildListOfRules(qtDbRtnObj)
          this.launchQtReadSubsets()
        }
      )
      .catch(() => {  // api.qtReadRules returned an error 
        console.log('api.qtReadRules error. cust & qid:' , this.cust, ' ', this.qid)
      })

  } //end launchQtReadRules

  buildListOfRules(qtDbObj){
  console.log('running app buildListOfRules')
  for (let i = 0; i < qtDbObj.length; i++) {
    this.rulesArray.push(qtDbObj[i].data)
  }
  console.table(this.rulesArray)

  } // end buildListOfRules

 launchQtReadSubsets = () => {
  console.log('running launchQtReadSubsets')
  console.log('custAndQid:',this.cust,this.qid)
  api.qtReadSubsets(this.cust,this.qid)
    .then 
      (   (qtDbRtnObj) => 
        {
          console.log(' running .then of api.qtReadSubsets') 
          this.buildListOfSubsets(qtDbRtnObj)
        }
      )
      .catch(() => {  // api.qtReadSubsets returned an error 
        console.log('api.qtReadSubsets error. cust & qid:' , this.cust, ' ', this.qid)
      })
  } //end launchQtReadSubsets

  buildListOfSubsets(qtDbObj){
    console.log('running app buildListOfSubsets')
    // console.log(qtDbObj.length)
    // console.table(qtDbObj)
    // console.log(qtDbObj[0].data.subsets.length)
    for (let i = 0; i < qtDbObj.length; i++) {
      for (let j = 0; j < qtDbObj[i].data.subsets.length; j++) {
        this.subsetArray.push(qtDbObj[i].data.subsets[j])
      } // end for
    } // end for
    //console.table(this.subsetArray)
}  // end buildListOfSubsets

  buildListOfAccumsFromQuestArray(){
  console.log('running buildListOfAccumsFromQuestArray')
  // read all questions array, find the unique accumulators.
  // push a newly discovered accum into accumArray.
  for (let i = 0; i < this.questArray.length; i++) {
    // this question has an array of accumulators.
    for (let j = 0; j < this.questArray[i].accum.length; j++) {
      // find the accum in accumArray. if not found, add it.
      let position = 
        this.accumArray.map(function(a) { return a.accum })
        .indexOf(this.questArray[i].accum[j])
      if (position < 0){
          this.accumObj = { 
            'accum': this.questArray[i].accum[j],
            'accumFedByQuests' : ['001','002','003']
          }
        this.accumArray.push(this.accumObj)
      }
    }
  }
  console.log('done buiding accumArray:',this.accumArray)
  }  // end buildListOfAccumsFromQuestArray

} // end export AppComponent

// these pgms leave off semicolons, but remember:
// return  break, throw, continue - dont split lines
// never start a line with parentheses