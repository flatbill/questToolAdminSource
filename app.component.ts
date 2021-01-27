import {  HostListener, Component } from '@angular/core';
//import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
        this.escKeyWasHit()
    }
  }

  title = 'Questool Admin'
  showQnc = true 
  showQncWwg = false
  showQncWwq = false
  showQncWwqd = false 
  showAppComponent = true // set this true for debugging
  subsetArray = ['nothing','yet']
  subset = 'noSubsetYet'
  meow = 'mmmeeeooowww'
  subsetQncWwg = '??subsetQncWwg??'
  subsetQncWwq = '??subsetQncWwq??'
  subsetsQncWwg = ['??subsetsQncWwg??']
  subsetsQncWwq = ['??subsetsQncWwq??']
  questionsQncWwq = ['??questionsQncWwq??']
  rulesArray = [] //'??rulesQncWwg??'
  questArray = [] 
  daQuestion = 'no Question yet'
  wwqdCaller = 'no wwqdCaller yet'
  ngOnInit()  {
    this.initSubsets()
    this.initRules()
    this.initQuestions()
    this.sortArrays()
  } 

  initSubsets(){
    this.subsetArray =
    ["main1", 
    "parakeetFollowOn", 
    "main2", 
    "iqFollowOn", 
    "main3"]
    } //end InitSubsets

  initRules(){
    this.rulesArray = 
    [
      {
        cust: "1",
        qid: "1",
        subset: "parakeetFollowOn",
        accum: "pk1",
        oper: ">",
        thresh: 0
      }
      ,
      {
        cust: "1",
        qid: "1",
        subset: "iqFollowOn",
        accum: "iqAccum",
        oper: "==",
        thresh: 1
      }  
      
    ]
  } //end initRules

  initQuestions(){
    this.questArray = 
    [
      {
        cust: "1",
        qid: "1",
        questNbr: "001",
        questSeq: "001",
        questTxt: "Welcome!",
        preQuest: "",
        aca: ["... continue ..."],
        acaPointVals: [0],
        accum: ["dummy"],
        subset: "main1"
      }
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "002",
        questSeq: "003",
        questTxt: "Do you have a pet parakeet?",
        preQuest: "",
        aca: ["yes", "no"],
        acaPointVals: [1, 0],
        accum: ["pk1"],
        subset: "main1"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "003",
        questSeq: "004",
        questTxt: "What's your parakeet's shoe size?",
        preQuest: "",
        aca: ["11", "12", "13"],
        acaPointVals: [11, 12, 13],
        accum: ["bla"],
        subset: "parakeetFollowOn"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "004",
        questSeq: "001",
        questTxt: "Would you like to test your IQ?",
        preQuest: "",
        aca: ["yes", "no"],
        acaPointVals: [1, 0],
        accum: ["iqAccum"],
        subset: "main2"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "005",
        questSeq: "001",
        questTxt: "Who is buried in Grant's tomb?:",
        preQuest: "Here is the first IQ question:",
        aca: ["me", "President Grant", "Kenny"],
        acaPointVals: [0, 1, 0],
        accum: ["iqAccum"],
        subset: "iqFollowOn"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "006",
        questSeq: "002",
        questTxt: "How many inches is 6 feet?:",
        preQuest: "Here is the second IQ question:",
        aca: ["2", "36", "72"],
        acaPointVals: [0, 0, 1],
        accum: ["iqAccum"],
        subset: "iqFollowOn"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "007",
        questSeq: "001",
        questTxt: "Have you ever seen lassie?",
        preQuest: "This question is in subset main3",
        aca: ["yes", "no"],
        acaPointVals: [1, 0],
        accum: ["lassieAccum"],
        subset: "main3"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "008",
        questSeq: "002",
        questTxt: "How would you rate your mother?",
        preQuest: "A personal question here:",
        aca: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        acaPointVals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        accum: ["motherScore"],
        subset: "main3"
      }   
      ,
      {
        cust: "1",
        qid: "1",
        questNbr: "009",
        questSeq: "002",
        questTxt: "Welcome.  Oh, I already said that!",
        preQuest: "",
        aca: ["... continue ..."],
        acaPointVals: [0],
        accum: ["dummy"],
        subset: "main1"
      }  
    ]
    console.table(this.questArray)
  } //end initQuestions

  showQncFun(){
    console.log('running app showQncFun')
      this.showQnc = true
      this.showQncWwg = false
      this.showQncWwq = false 
      this.showQncWwqd = false 
  } // end showQncFun

  
  showWwgFun(){
    console.log('running app showWwgFun')
    this.showQnc = false
    this.showQncWwg = true
    this.showQncWwq = false
    this.showQncWwqd = false 
  } 
  
  doneWwqdFun(){
    console.log('running app doneWwqdFun')
    // returning from wwqd.
    // either show qnc or wwq
    // depending on who called wwqd earlier
    console.log('wwqdCaller: ',this.wwqdCaller)
    if(this.wwqdCaller=='qnc') { this.showQncFun() }
    if(this.wwqdCaller=='wwq') { this.showWwqFun() }

    
  }

  showWwqFun(){
    console.log('running app showWwqFun')
    this.questionsQncWwq = this.questArray 
    this.subsetQncWwq = this.subset 
    this.showQnc = false
    this.showQncWwg = false
    this.showQncWwq = true
    this.showQncWwqd = false 
  } // end showWwqFun

  setQuestFromQncFun(ev){
    console.log('running app setQuestFromQncFun')
    // use selected question from qnc
    // pass it into daquestion
    // to get ready to call wwqd
    this.daQuestion = ev
    this.wwqdCaller = 'qnc'
  }

  setQuestFromWwqFun(ev){
    console.log('running app setQuestFromWwqFun')
    // use selected question from wwq
    // pass it into daquestion
    // to get ready to call wwqd
    this.daQuestion = ev
    this.wwqdCaller = 'wwq'

  }

  showWwqdFun(){
    console.log('running app showWwqdFun')
    this.showQnc = false
    this.showQncWwg = false
    this.showQncWwq = false
    this.showQncWwqd = true 
  }

  questArrayQncWwqFun(ev){
    console.log('running app questArrayQncWwqFun')
    this.questionsQncWwq = ev
  } // end questArrayQncWwqFun

  ssArrayQncWwgFun(ev){
    console.log('running app ssArrayQncWwgFun')
    this.subsetArray = ev
    this.subsetsQncWwg = ev
  } // end ssArrayQncWwgFun

  subsetFromQncFun(ev){
    console.log('running app subsetFromQncFun')
    this.subset = ev
    // alert(this.subset)
  }

  rulesArrayQncWwgFun(ev){
    console.log('running app rulesArrayQncWwgFun')
    // we just got back from Qnc 
    // billy was working ---> this.rulesQncWwg = ev
  } // end rulesArrayQncWwgFun

  escKeyWasHit(){ 
    console.log('runninng app escKeyWasHit') 
    this.showQnc = true
    this.showQncWwg = false
    this.showQncWwq = false
    this.showQncWwqd = false 
  }

  foxTrot(ev){
    // coming out of wwg
    // wwg has passed-in a new rules array via: ev
    // cuz maybe he added some new rules.
    // lets go wild with that.
    console.log('runnin app foxtrot',ev)
    this.rulesArray = ev //going into wwg next time
    console.log('after foxtrot, rulesArray:')
    console.table(this.rulesArray)
  }
  
sortArrays(){
  this.questArray
  .sort((a, b) => (a.questSeq > b.questSeq) ? 1 : (a.questSeq === b.questSeq) ? ((a.questNbr > b.questNbr) ? 1 : -1) : -1 )
  console.table(this.questArray)
}

}
