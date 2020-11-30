import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-qnc',
  templateUrl: './qnc.component.html'
  //styleUrls: ['./qnc.component.css']
})
export class QncComponent implements OnInit {

  constructor() {}
  @Input('showQnc') showQncName: boolean
  @Output() showHideQncWwgOut = new EventEmitter<boolean>()
  @Output() subsetOut = new EventEmitter<string>()
  

  ngOnInit(): void {
    this.initSubsets()
    this.initQuestions()
  }
subsetArray = []
questArray = []
hisChosenSubset = '?'
hisChosenSubsetIx = -1
hisEnteredSubset = '?'
hisChosenQuest = '?'
saveSubsetHtmlId  =  '?'

  initSubsets(){
  this.subsetArray =
  ["main1", 
  "parakeetFollowOn", 
  "main2", 
  "iqFollowOn", 
  "main3"]
  } //end InitSubsets
  
  initQuestions(){
  this.questArray = 
  [
    {
      cust: "1",
      qid: "1",
      questNbr: "001",
      questSeq: "001",
      questTxt: "Welcome.",
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
      questTxt: "What's you parakeet's shoe size?",
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
  } //end initQUestions

  subsetClick(s,sx){
    console.log('he clicked subset',s,sx)
    // shrink previously selected subset:
     let elemIdToRemove = document.getElementById(this.saveSubsetHtmlId)
    if (elemIdToRemove ) { 
      elemIdToRemove.classList.remove("is-half")}
    // expand the selected subset:
    this.hisChosenSubsetIx = sx
    this.hisChosenSubset = s
    let buildHtmlId = 'subsetHtmlId' + sx.toString()
    let elemId = document.getElementById(buildHtmlId)
    elemId.classList.add("is-half")
    if (buildHtmlId==this.saveSubsetHtmlId){
      this.subsetClickAgain(s)}
    this.saveSubsetHtmlId = buildHtmlId //remember for later
    console.log(this.saveSubsetHtmlId)

  } // end subsetClick

  subsetMouseEnter(s){
     console.log('mouse entered subset', s)
    this.hisEnteredSubset = s
  } // end subsetMouseEnter

  questClick(q){
    console.log('quest click:', q)
    this.hisChosenQuest = q
  } // endquestClick

  wingFooClick(){
    console.log('running wingFooClick')
    this.showHideQncWwgOut.emit(true)
  }
  subsetClickAgain(subset){
    console.log('running subsetClickAgain',subset)
    this.showHideQncWwgOut.emit(true)
    this.subsetOut.emit(subset)
  }

} //end qnc component class
