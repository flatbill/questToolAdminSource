import { Component, OnInit } from '@angular/core';
import api from 'src/utils/api'

@Component({
  selector: 'app-qncconv',
  templateUrl: './qncconv.component.html'
})
export class QncconvComponent implements OnInit {

  constructor() { }
  showConvTf = false // set false after converting questions.
  edArray338 = []
  edRuleArray338 = []
  newQuestArray = []
  newQuestObj = {}
  qtDbDataObj = {}
  newSubsetArrayTemp = []
  newSubsetArray = []
  newSubsetObj = {}
  newRuleObj = {}
  newRulesArray = []
  new338Obj = {}
  ngOnInit() {
    console.log('running ngOnInit qncconv')
    this.setEdArray338()
    this.setEdRuleArray338()
    //console.table(this.edArray338)
    console.table(this.edRuleArray338)  
  }

  fileWasChosen(ev){
    // alert ('running fileWasChosen')
    //console.table(ev)
    alert('file import disabled. too may commas and double quotes.')
    //this.readMyFile(ev) // uncomment this line to try to fix import.
  } // end of fileWasChosen

   readMyFile(ev) {  // part of file import.  gave up Feb2021
    console.log('running readMyFile')
    var file = ev.target.files[0]
    ///alert(file.name)
    var reader = new FileReader()
    reader.readAsText(file)
    //reader.onload = function(e) { // this duznt allow func refs.
    reader.onload = () => { // runs when readAsText is done
      console.log( 'The file text will be output here:')
      let myCsvTxt = reader.result.toString()
      //console.log(e.target.result)
      console.log(myCsvTxt)
      // this.transformCsvToJson(e.target.result)
      // Feb 2021 cant seem to make this work, 
      // easier if I  hardcoded the damn text into edArray338.
      let allTextLines = myCsvTxt.split(/\r\n|\n/)
      let objHead = allTextLines[0].split(',')
      let new338Array = []
      for (let i = 1; i < 334; i++) {  //334 to filter out into/brk/fin
        console.log(i)
        this.build338Object(allTextLines[i])  //builds newObj338
        //console.log(this.new338Obj)
        new338Array.push(this.new338Obj)
        //console.table(new338Array)
      }
      // over write the hard coded edArray338:
      this.edArray338 = new338Array
      console.log('end reader onload')
    } // end reader.onload 
  } // end readMyFile

  build338Object(tl){  // part of file import. gave up Feb 2021
    // set vals in one new338Obj
    let x = tl.split(', ').join('^ ')
    x = x.split('"""').join('***') 
    x = x.split('" "').join('""') 
    x = x.split('" "').join('""') 
    x = x.split('""').join('**') 
    x = x.split('"').join('*') 
    x = x.split('*{').join('{') 
    x = x.split('.*').join('.') 
    x = x.split(',') 
    console.log(x)
    //x = x.split('|').join(',')

    // trade karat for comma billy
    this.new338Obj = {
      "quest_id": x[0],  
      "qid": x[1],
      "quest": x[2].replace('^',',').replace('^',','),
      "subset": x[3].replace('**',''),
      "accum1": x[4].replace('**',''),
      "accum2": x[5].replace('**',''),
      "accum3": x[6].replace('**',''),
      "seq": x[7].replace('**',''),
      "answer_dt":  x[8].replace('**',''),
      "cor_ans": x[9],
      "weight": x[10],
      "qstyle": x[11]
    }
    console.log('104..................')
    console.table(this.new338Obj)
  }

  setEdArray338(){ //important subroutine!  has hardcoded quest array!
    // hard coded quest array is big, and can be disabled after use.
    // instead of this para, I tried to import a text file, but gave up.
    // too many dbl quotes and commas.
    this.edArray338 = []  // make an empty array when ready to build.
    // this.edArray338 =     // disable this block when ready to build.
    // [
    //   {
    //     "quest_id": 26,
    //     "qid": 1,
    //     "quest": "{Style}It would not surprise me if others felt that I was very organized and disciplined.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 27,
    //     "qid": 1,
    //     "quest": "{Style}I do believe that one of my strengths is to recall small details, even if significant time has passed.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 28,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that I am a perfectionist so I usually spend the extra time required to do things extremely well.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.18,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 29,
    //     "qid": 1,
    //     "quest": "{Style}I feel better and I'm less anxious with a clear plan of action and well defined goals.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 30,
    //     "qid": 1,
    //     "quest": "{Style}I function much better when I'm clear about my role and the expectations are well defined.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 31,
    //     "qid": 1,
    //     "quest": "{Style}I feel very strongly about my values, so I run the risk of being too demanding or even rigid.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 32,
    //     "qid": 1,
    //     "quest": "{Style}I wouldn't be surprised if others felt that I always appear to be in control and seldom seem very relaxed.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 33,
    //     "qid": 1,
    //     "quest": "{Style}I enjoy learning and reading about things that interest me.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 34,
    //     "qid": 1,
    //     "quest": "{Style}I have a need to understand the world and what \"makes things tick\".",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.03,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 35,
    //     "qid": 1,
    //     "quest": "{Style}For the most part, I'd rather read a good book or work on a project than socialize with others.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 36,
    //     "qid": 1,
    //     "quest": "{Style}Some people have said that I am too theoretical or make my explanations too complex.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 37,
    //     "qid": 1,
    //     "quest": "{Style}I can get so involved in a project that I lose track of time.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 38,
    //     "qid": 1,
    //     "quest": "{Style}When I am interested in a subject, I can learn best on my own.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 39,
    //     "qid": 1,
    //     "quest": "{Style}I have no trouble working on problems or puzzles, just for the enjoyment of finding a solution.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 40,
    //     "qid": 1,
    //     "quest": "{Style}I seldom limit myself to a \"casual understanding\" of subjects in which I have an interest.",
    //     "subset": "MAIN",
    //     "accum1": "DA4",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 41,
    //     "qid": 1,
    //     "quest": "{Style}Relating to others and having close friends is extremely important to me.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 42,
    //     "qid": 1,
    //     "quest": "{Style}Others have mentioned that I'm too willing \"to meet the needs of others\" even at the expense of my own welfare.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 43,
    //     "qid": 1,
    //     "quest": "{Style}Typically, my social style is to develop very strong emotional bonds to the people who are close to me.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 44,
    //     "qid": 1,
    //     "quest": "{Style}I will \"go out of my way\" to meet the needs of others even if they take me for granted.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.24,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 45,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that there are times when I feel that I become too jealous or possessive in my relationships.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.66,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 46,
    //     "qid": 1,
    //     "quest": "{Style}When things are left undone, I feel I should take care of them so others don't look bad.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 47,
    //     "qid": 1,
    //     "quest": "{Style}I feel that my close friends don't always appreciate all that I do for them.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 48,
    //     "qid": 1,
    //     "quest": "{Style}I feel best when I have the opportunity to help others meet their needs.",
    //     "subset": "MAIN",
    //     "accum1": "DB1",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.14,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 49,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that being loyal to others or an organization gives me a strong positive sense of well-being.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 50,
    //     "qid": 1,
    //     "quest": "{Style}I feel most secure when I maintain a positive relationship with those who are in authority.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 51,
    //     "qid": 1,
    //     "quest": "{Style}I would rather have an ongoing relationship, even if I had to give up my own sense of autonomy.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 52,
    //     "qid": 1,
    //     "quest": "{Style}Honestly I'd rather be part of a team than to take responsibility for leading others.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.61,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 53,
    //     "qid": 1,
    //     "quest": "{Style}The need to be part of a group or an organization is very important to my sense of well-being.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 54,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that I feel more secure or at my best when I am committed to a group effort.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 55,
    //     "qid": 1,
    //     "quest": "{Style}It's a key principle that in a well-functioning company people should defer to those in authority.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 56,
    //     "qid": 1,
    //     "quest": "{Style}Tradition, a sense of respect for authority and patriotism are all very important for a strong country.",
    //     "subset": "MAIN",
    //     "accum1": "DB2",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.03,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 57,
    //     "qid": 1,
    //     "quest": "{Style}The key to maintaining positive relationships is to avoid most conflict and maintain peace.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.18,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 58,
    //     "qid": 1,
    //     "quest": "{Style}A good leader is a person who can minimize strife and conflict while keeping the peace at all cost.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 59,
    //     "qid": 1,
    //     "quest": "{Style}When people have a conflict, I understand both sides so it is hard for me to decide who is right.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.8,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 60,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes it is better to give in so you can maintain harmonious and peaceful relationships.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 61,
    //     "qid": 1,
    //     "quest": "{Style}When I get angry, I often \"stuff my feelings\" so others don't see my anger or feel that I create conflict.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 62,
    //     "qid": 1,
    //     "quest": "{Style}I enjoy environments where team members compromise and everyone feels comfortable with the final outcome.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.68,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 63,
    //     "qid": 1,
    //     "quest": "{Style}Given the choice, it is better to \"give in to others\" than create conflict because people get along better when harmony is maintained.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 64,
    //     "qid": 1,
    //     "quest": "{Style}I feel that I am willing to accommodate to the needs of others in order to keep peace and avoid conflict.",
    //     "subset": "MAIN",
    //     "accum1": "DB3",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.03,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 65,
    //     "qid": 1,
    //     "quest": "{Style}I find myself daydreaming or wondering how things in the world could be better.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.14,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 66,
    //     "qid": 1,
    //     "quest": "{Style}At times, I am self-absorbed and wonder how we could make the world a better place.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 67,
    //     "qid": 1,
    //     "quest": "{Style}Personally I feel that beauty and ideals make people different from animals and more \"God-like.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.87,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 68,
    //     "qid": 1,
    //     "quest": "{Style}In my more quiet moments, I am disturbed by all the pain and strife in the world.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 69,
    //     "qid": 1,
    //     "quest": "{Style}In spite of all the beauty in the world, it can be a dreadful and hurtful place.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 70,
    //     "qid": 1,
    //     "quest": "{Style}At times, I withdraw and feel melancholy as I ponder the world problems.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 71,
    //     "qid": 1,
    //     "quest": "{Style}I feel a sense of creativity, where I have an urge to leave something positive behind.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.69,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 72,
    //     "qid": 1,
    //     "quest": "{Style}I am pretty sure that we are all part of something larger and more transcendent than just ourselves.",
    //     "subset": "MAIN",
    //     "accum1": "DB4",
    //     "accum2": "A2",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 73,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that at times, I have felt so angry that I wanted to yell at someone.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 74,
    //     "qid": 1,
    //     "quest": "{Style}When people disappoint me, I would like to tell them exactly how I feel, even if it hurts their feelings.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 75,
    //     "qid": 1,
    //     "quest": "{Style}When I am focusing on a complex or difficult task, I get pretty irritated if I am distracted.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.03,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 76,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit I have a \"quick temper\" so I let others know how I feel or I am silently bothered and irritated.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 77,
    //     "qid": 1,
    //     "quest": "{Style}When I am under pressure, I worry about getting things done or not having enough time.",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 78,
    //     "qid": 1,
    //     "quest": "{Style}When I am unsure of what others want, I can't relax until I clarify their expectations.",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.82,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 79,
    //     "qid": 1,
    //     "quest": "{Style}Even if I know the people in the audience, I still get nervous about giving a formal presentation.",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 80,
    //     "qid": 1,
    //     "quest": "{Style}If I am honest, I find new or unusual situations to be more anxiety provoking than challenging.",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 81,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I feel sad or \"down\" and become a little concerned that I don't know why.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 82,
    //     "qid": 1,
    //     "quest": "{Style}I must admit, I have periods where I seem to lack energy and vigor.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.91,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 83,
    //     "qid": 1,
    //     "quest": "{Style}At times, for no apparent reason, I feel dejected or concerned about my future.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 84,
    //     "qid": 1,
    //     "quest": "{Style}If I am honest, I am more pessimistic than most of my friends.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 85,
    //     "qid": 1,
    //     "quest": "{Style}It is better to keep control in situations by, \"not tipping your hand too soon.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Seldom True                      Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 86,
    //     "qid": 1,
    //     "quest": "{Style}Usually, if you want to be successful, you have to be pretty careful about the people you trust.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 87,
    //     "qid": 1,
    //     "quest": "{Style}I'm willing to admit that I'm a little too suspicious about other's motives but it works for me.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 88,
    //     "qid": 1,
    //     "quest": "{Style}Personally I feel that it is better to understand the motives of others than to trust people too much.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 89,
    //     "qid": 1,
    //     "quest": "{Style}I am silently ashamed of some of my behavior.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 90,
    //     "qid": 1,
    //     "quest": "{Style}In my heart of hearts, I know that I should have set higher goals or worked harder.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.91,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 91,
    //     "qid": 1,
    //     "quest": "{Style}If I'm honest, a real fear that I have is making a major social blunder and being totally embarrassed.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "A7",
    //     "accum3": "X1",
    //     "seq": 909,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 92,
    //     "qid": 1,
    //     "quest": "{Style}I'm not afraid to admit that I feel self-conscious when I am around very important or powerful people.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "A7",
    //     "accum3": "X1",
    //     "seq": 833,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.11,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 93,
    //     "qid": 1,
    //     "quest": "{Style}If my superior's boss unexpectedly called me, I'd be concerned that I might have made a mistake.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "A7",
    //     "accum3": "X1",
    //     "seq": 244,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 94,
    //     "qid": 1,
    //     "quest": "{Style}I must admit, I feel guilty if my behavior is offensive to others who I respect.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "A7",
    //     "accum3": "X1",
    //     "seq": 769,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 95,
    //     "qid": 1,
    //     "quest": "{Style}Personally I feel that when others criticize me, if I am realistic I know that I deserved it.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 96,
    //     "qid": 1,
    //     "quest": "{Style}If things are going well, I get a nagging feeling that \"bad news\" is around the corner.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.25,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 97,
    //     "qid": 1,
    //     "quest": "{Style}When I reflect on my behavior, I know I've been impulsive and it seemed okay at that time but I regretted my behavior.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 98,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I blurt out my feelings or views and wish that I had spent more time thinking.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 99,
    //     "qid": 1,
    //     "quest": "{Style}I'm willing to admit that I have been so caught up in the excitement of the moment that I ate or drank too much.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 100,
    //     "qid": 1,
    //     "quest": "{Style}There have been times in my life when I did something without thinking, that was a little wild or crazy.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 101,
    //     "qid": 1,
    //     "quest": "{Style}I really like to structure my work or plan ahead because it lowers my fear of making mistakes.",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.85,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 102,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I just have to clean out a closet or a garage because I can't stand the mess any longer.",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 103,
    //     "qid": 1,
    //     "quest": "{Style}I try to keep my valuables neat and orderly, since it bothers me when I cannot find things easily.",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 104,
    //     "qid": 1,
    //     "quest": "{Style}I must admit that I need to organize things because I feel better when things are where they belong.",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.24,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 105,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I have trouble falling asleep since my mind keeps running.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 106,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes when I get a song or thought in my head it is hard for me to forget it.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 107,
    //     "qid": 1,
    //     "quest": "{Style}I probably spend too much time thinking and planning and I should be more spontaneous.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.77,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 108,
    //     "qid": 1,
    //     "quest": "{Style}When important things are left unfinished they rattle around in my mind and bother me.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.26,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 109,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that I cover up my negative and painful feelings but then they don't bother me as much.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 110,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I experience \"waves of feelings\" for no apparent reason.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.33,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 111,
    //     "qid": 1,
    //     "quest": "{Style}If I feel sad or down, I get involved in a fun activity and the painful feelings go away.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.74,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 112,
    //     "qid": 1,
    //     "quest": "{Style}If someone upsets me, I avoid seeing them, hide my pain and just \"think happy thoughts.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 113,
    //     "qid": 1,
    //     "quest": "{Style}I tend to get headaches or stomach pains when I am under stress.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 114,
    //     "qid": 1,
    //     "quest": "{Style}When I am under stress, I develop physical symptoms that tell me to slow down.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 1.15,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 115,
    //     "qid": 1,
    //     "quest": "{Style}If someone creates conflict that I'm involved in, I seldom confront them but then I worry about it.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.85,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 116,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that if I become openly angry and speak my mind, I worry that I went too far and lost control.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "Never                             Sometimes                             Often",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 117,
    //     "qid": 1,
    //     "quest": "{Style}I usually like most of the people that I meet.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.06,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 118,
    //     "qid": 1,
    //     "quest": "{Style}Most people would say that I am a warm and friendly person.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 119,
    //     "qid": 1,
    //     "quest": "{Style}I find it easy to relate to strangers and usually have something nice to say.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 120,
    //     "qid": 1,
    //     "quest": "{Style}I am truly concerned about the people that I work for or associate with.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 121,
    //     "qid": 1,
    //     "quest": "{Style}For the most part, very few people would say that I am cold or unconcerned about others.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Disagree                          Sometimes                             Agree",
    //     "cor_ans": 0,
    //     "weight": 0.94,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 122,
    //     "qid": 1,
    //     "quest": "{Style}I enjoy relating to others, so I seek out friends and renew old contacts.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E1",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 123,
    //     "qid": 1,
    //     "quest": "{Style}I thoroughly enjoy working with others on projects or as part of a team.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 331,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 124,
    //     "qid": 1,
    //     "quest": "{Style}I usually feel at ease with others even if there are strangers in the group.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 125,
    //     "qid": 1,
    //     "quest": "{Style}Parties or the chance to meet new people are usually fun, so I look forward to the event.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.99,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 126,
    //     "qid": 1,
    //     "quest": "{Style}My preference is to work with others even if there are people that I don't know.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.14,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 1,
    //     "qid": 1,
    //     "quest": "{Style}I know that I have an extremely high energy and intensity level.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "A55",
    //     "seq": 555,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.29,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 2,
    //     "qid": 1,
    //     "quest": "{Style}I am very optimistic and upbeat, so it takes a great deal to \"shake me up or set me back.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 833,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 3,
    //     "qid": 1,
    //     "quest": "{Style}I can get so involved in what I am doing, that I may be unaware of what is going on around me.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.39,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 4,
    //     "qid": 1,
    //     "quest": "{Style}The thought of not being able to accomplish my goals seldom enters my mind, since I have so much energy.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 555,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.95,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 5,
    //     "qid": 1,
    //     "quest": "{Style}For the most part, I do not require very much sleep or rest.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 6,
    //     "qid": 1,
    //     "quest": "{Style}I am so active, that for relaxation I just change the type of activity that I am involved in.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 7,
    //     "qid": 1,
    //     "quest": "{Style}I have a strong need to experience all that life has to offer so I am an extremely active person.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "A55",
    //     "seq": 244,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 8,
    //     "qid": 1,
    //     "quest": "{Style}People who know me, feel I have an unquenchable zest for life.",
    //     "subset": "MAIN",
    //     "accum1": "DA0",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 9,
    //     "qid": 1,
    //     "quest": "{Style}I believe that focusing on my own needs is more important than helping others.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A55",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.44,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 10,
    //     "qid": 1,
    //     "quest": "{Style}I am a very competitive person so I establish aggressive goals.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.77,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 11,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that how I'm viewed by others is important so I push myself to be successful.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A7",
    //     "accum3": "A55",
    //     "seq": 244,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.35,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 12,
    //     "qid": 1,
    //     "quest": "{Style}I am concerned about my appearance since my image is important to my overall sense of success.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A7",
    //     "accum3": "A55",
    //     "seq": 381,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 13,
    //     "qid": 1,
    //     "quest": "{Style}I believe that status and prestige is an important and obvious measure of success.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.31,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 14,
    //     "qid": 1,
    //     "quest": "{Style}The knowledge that I am respected by my peers or held in esteem is a major driver of my behavior.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A7",
    //     "accum3": "A55",
    //     "seq": 555,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.29,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 15,
    //     "qid": 1,
    //     "quest": "{Style}Some people may feel that I am self-centered but I think that they underestimate my actual abilities.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.5,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 16,
    //     "qid": 1,
    //     "quest": "{Style}When I compete with others and lose, if I am honest, it bothers me quite a bit.",
    //     "subset": "MAIN",
    //     "accum1": "DA1",
    //     "accum2": "A1",
    //     "accum3": "DA1C",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 17,
    //     "qid": 1,
    //     "quest": "{Style}I am very confident in my ability to lead others, so when I get the chance, I'm willing to take the lead in a social setting.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 18,
    //     "qid": 1,
    //     "quest": "{Style}I realize that when I drive toward a goal in a social setting, I can intimidate others.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 19,
    //     "qid": 1,
    //     "quest": "{Style}I am entrepreneurial in my actions, so I don't always fit into established organizations.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.79,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 20,
    //     "qid": 1,
    //     "quest": "{Style}The process of leading others, where I take on the risk, is a challenge that I truly enjoy.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.2,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 21,
    //     "qid": 1,
    //     "quest": "{Style}It doesn't bother me to take a strong stand when it's necessary to get things done.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 22,
    //     "qid": 1,
    //     "quest": "{Style}I am not surprised that others look for me to provide guidance and direction.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 23,
    //     "qid": 1,
    //     "quest": "{Style}I would rather go \"off in my own direction\" than \"fold in with others\" because it is easier or causes less strife.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.85,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 24,
    //     "qid": 1,
    //     "quest": "{Style}What we really need are more people who are willing to take the tough risks and lead others.",
    //     "subset": "MAIN",
    //     "accum1": "DA2",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.77,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 25,
    //     "qid": 1,
    //     "quest": "{Style}I believe it is important for one's success to have a good sense of structure and order.",
    //     "subset": "MAIN",
    //     "accum1": "DA3",
    //     "accum2": "A1",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 127,
    //     "qid": 1,
    //     "quest": "{Style}Usually, I do not enjoy working by myself for extended time periods.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.87,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 128,
    //     "qid": 1,
    //     "quest": "{Style}Given the option, I would like to spend my time interacting with others.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E2",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 129,
    //     "qid": 1,
    //     "quest": "{Style}I am very capable of standing up for my own views and stating my opinion.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 130,
    //     "qid": 1,
    //     "quest": "{Style}I'm not afraid to voice my opinion even if I don't always agree with others.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 131,
    //     "qid": 1,
    //     "quest": "{Style}In meetings, even with strangers, I am very willing to speak up and share my views.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 132,
    //     "qid": 1,
    //     "quest": "{Style}People seek my advice or support because they know I can deal with tough social issues.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.85,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 133,
    //     "qid": 1,
    //     "quest": "{Style}I find it easy to \"rise to the occasion\" and take charge even if there are conflicting views.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 134,
    //     "qid": 1,
    //     "quest": "{Style}I feel that I am assertive or even aggressive in sharing my opinions.",
    //     "subset": "MAIN",
    //     "accum1": "T-E",
    //     "accum2": "T-E3",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.96,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 135,
    //     "qid": 1,
    //     "quest": "{Style}Usually, I fully trust the intentions of others unless I have contrary information.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 136,
    //     "qid": 1,
    //     "quest": "{Style}I disagree with people who feel that most people will take advantage of you if they get the chance.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Never True                       Sometimes                       Usually True",
    //     "cor_ans": 0,
    //     "weight": 0.9,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 137,
    //     "qid": 1,
    //     "quest": "{Style}Most people are honest and trustworthy, if you give them the chance.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 138,
    //     "qid": 1,
    //     "quest": "{Style}I am not a skeptical and cynical person.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 139,
    //     "qid": 1,
    //     "quest": "{Style}I assume the best about people unless I've had a bad experience or have reliable data to the contrary.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 140,
    //     "qid": 1,
    //     "quest": "{Style}For the most part, I believe that most people would help me if I asked.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A1",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.84,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 141,
    //     "qid": 1,
    //     "quest": "{Style}My usual approach is to cooperate with others and be helpful.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 142,
    //     "qid": 1,
    //     "quest": "{Style}Even if I feel that I have the right to be upset, I control my feelings in social settings because they lead to poor relationships.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Seldom True                       Sometimes                       Always True",
    //     "cor_ans": 0,
    //     "weight": 0.95,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 143,
    //     "qid": 1,
    //     "quest": "{Style}If others insult me, my philosophy is to \"forgive and forget.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.81,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 144,
    //     "qid": 1,
    //     "quest": "{Style}Sarcastic and opinionated people are hard to work with, so I don't \"take them on\" but try to improve the situation by keeping quiet.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 145,
    //     "qid": 1,
    //     "quest": "{Style}I seldom get into arguments with others or create interpersonal strife.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 146,
    //     "qid": 1,
    //     "quest": "{Style}I am glad that there is an emphasis on teamwork even if it slows decisions down a little.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A2",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.11,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 147,
    //     "qid": 1,
    //     "quest": "{Style}I believe that most accomplishments involve others so I feel very comfortable with a group effort.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 148,
    //     "qid": 1,
    //     "quest": "{Style}I believe that we all can make a contribution even if our motivations are very different.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 149,
    //     "qid": 1,
    //     "quest": "{Style}I feel more comfortable praising others than being in the limelight.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.76,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 150,
    //     "qid": 1,
    //     "quest": "{Style}I am very straightforward and easy to read so what you see is what you get.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 151,
    //     "qid": 1,
    //     "quest": "{Style}People who are political irritate me because I feel it is unnecessary and seldom helps teamwork.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 152,
    //     "qid": 1,
    //     "quest": "{Style}Even if I wanted to deceive or trick others, I couldn't because it would show in my face.",
    //     "subset": "MAIN",
    //     "accum1": "T-A",
    //     "accum2": "T-A3",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 153,
    //     "qid": 1,
    //     "quest": "{Style}Planning and providing structure is the one of the most critical parts of getting the job done.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 154,
    //     "qid": 1,
    //     "quest": "{Style}It is important to have a strong sense of order and regulation.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.06,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 155,
    //     "qid": 1,
    //     "quest": "{Style}I feel most comfortable when everything is in its proper place and organized.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 518,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 156,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that some people have accused me of being too fastidious or too organized and structured.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 396,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 157,
    //     "qid": 1,
    //     "quest": "{Style}I've always felt that if you really want to be efficient you can never be too organized.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 388,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 158,
    //     "qid": 1,
    //     "quest": "{Style}I am a very methodical person who likes structure.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C1",
    //     "accum3": "",
    //     "seq": 105,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 159,
    //     "qid": 1,
    //     "quest": "{Style}I work on my assignments in an extremely conscientious manner.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 725,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.14,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 160,
    //     "qid": 1,
    //     "quest": "{Style}I am very willing to make whatever personal sacrifices are necessary to meet my commitments.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 383,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 161,
    //     "qid": 1,
    //     "quest": "{Style}I feel it is critical to stick to your principles at almost any cost.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 306,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.66,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 162,
    //     "qid": 1,
    //     "quest": "{Style}Even if I knew that I could get away with it, I would never cheat or lie.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 242,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 163,
    //     "qid": 1,
    //     "quest": "{Style}My sense of commitment is so important that even if I was sick, I would still try to go to work.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 890,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 164,
    //     "qid": 1,
    //     "quest": "{Style}I am so dependable that people who know me never worry that I'll forget what I promised to do.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C2",
    //     "accum3": "",
    //     "seq": 17,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 165,
    //     "qid": 1,
    //     "quest": "{Style}I set aggressive goals and strive to complete or exceed them.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 89,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 166,
    //     "qid": 1,
    //     "quest": "{Style}I'll work hard to meet my goals even at the expense of my personal time and interests.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 804,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 167,
    //     "qid": 1,
    //     "quest": "{Style}Some people have called me a \"workaholic\" but it fits my style.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 941,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.15,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 168,
    //     "qid": 1,
    //     "quest": "{Style}I am so driven to achieve that at times it impacts my personal life in negative ways.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 427,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.74,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 169,
    //     "qid": 1,
    //     "quest": "{Style}I'd rather finish a job and postpone my pleasure than worry about not getting it done.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 699,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 170,
    //     "qid": 1,
    //     "quest": "{Style}\"Doing what I said I would do\" is so critical to my self-esteem, that I may drive myself too hard to get things done.",
    //     "subset": "MAIN",
    //     "accum1": "T-C",
    //     "accum2": "T-C3",
    //     "accum3": "",
    //     "seq": 52,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 171,
    //     "qid": 1,
    //     "quest": "{Style}If people were more willing to live their lives according to their own desires, they would be happier.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 406,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.72,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 172,
    //     "qid": 1,
    //     "quest": "{Style}As a child, I felt comfortable \"doing my own thing without others.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 805,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.25,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 173,
    //     "qid": 1,
    //     "quest": "{Style}I'm very comfortable doing things by myself so I have minimal need for others.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 804,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.24,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 174,
    //     "qid": 1,
    //     "quest": "{Style}I would rather lead a quiet life with a strong sense of personal autonomy.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 732,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 175,
    //     "qid": 1,
    //     "quest": "{Style}In order to stay up with important news, I would just as soon read the paper as talk to others.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 269,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 176,
    //     "qid": 1,
    //     "quest": "{Style}I like to have time to plan and think alone because I feel it makes me more efficient.",
    //     "subset": "T1",
    //     "accum1": "T1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 954,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.83,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 177,
    //     "qid": 1,
    //     "quest": "{Style}I am willing to try new things even if I incur significant risk.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 629,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 178,
    //     "qid": 1,
    //     "quest": "{Style}If I invested in stocks, I'd invest in risky or aggressive stocks even if I might lose money.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 622,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 179,
    //     "qid": 1,
    //     "quest": "{Style}If I was bored living in the same city, I would move even if I didn't have a job.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 192,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.8,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 180,
    //     "qid": 1,
    //     "quest": "{Style}I still would take an aggressive career risk, even if I knew that if it failed I would have to leave my firm.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 928,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.23,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 181,
    //     "qid": 1,
    //     "quest": "{Style}Stability in one's life may be nice but it is boring.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 948,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 182,
    //     "qid": 1,
    //     "quest": "{Style}In my dating experiences, I'd gamble and ask someone out even if I knew I might get rejected.",
    //     "subset": "T2",
    //     "accum1": "T2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 41,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.94,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 183,
    //     "qid": 1,
    //     "quest": "{Style}I have a very active imagination.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 939,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.14,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 184,
    //     "qid": 1,
    //     "quest": "{Style}It is fine to be practical and down-to-earth but I like to think about possibilities.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.72,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 185,
    //     "qid": 1,
    //     "quest": "{Style}When I was bored in school I would wonder or daydream about things.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 145,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 186,
    //     "qid": 1,
    //     "quest": "{Style}As a child, I liked to exercise my imagination or think about being like those whom I admired.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 283,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 187,
    //     "qid": 1,
    //     "quest": "{Style}Delving into new areas or thinking about possibilities are things which I find exciting.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 78,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 188,
    //     "qid": 1,
    //     "quest": "{Style}If I am not focused on the task at hand, my mind starts to wander into more interesting areas.",
    //     "subset": "T3",
    //     "accum1": "T3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 118,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 189,
    //     "qid": 1,
    //     "quest": "{Control}In order to get the best job, you have to be in the right place at the right time.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 581,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 190,
    //     "qid": 1,
    //     "quest": "{Control}The person who is promoted is usually just lucky or knows someone.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 405,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 191,
    //     "qid": 1,
    //     "quest": "{Control}Most people are unaware that their lives are controlled by random or unexpected events and people.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 291,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 192,
    //     "qid": 1,
    //     "quest": "{Control}Most of the time people have very little control over their life's events.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.11,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 193,
    //     "qid": 1,
    //     "quest": "{Control}It is not a good idea to plan too far ahead since you never know what will happen.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 675,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 194,
    //     "qid": 1,
    //     "quest": "{Control}I believe there are few major events in one's life that you can control or dramatically influence.",
    //     "subset": "MAIN",
    //     "accum1": "LOC1",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 243,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.68,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 195,
    //     "qid": 1,
    //     "quest": "{Authority}The world is run by a few powerful people, so it is hard to get ahead.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 868,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.37,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 196,
    //     "qid": 1,
    //     "quest": "{Authority}When it comes to politics, there is little that you can do so you should learn how to live with it.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 377,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 197,
    //     "qid": 1,
    //     "quest": "{Authority}Most people's careers are controlled by a few people who you may not even know.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 453,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 198,
    //     "qid": 1,
    //     "quest": "{Authority}If I find myself stuck in political turmoil, I try to find the person in control.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Seldom True                       Sometimes                      Usually True",
    //     "cor_ans": 0,
    //     "weight": 0.26,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 199,
    //     "qid": 1,
    //     "quest": "{Authority}For the most part, we are all \"day workers\" who work for pay, so it is best to accept our lot in life.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Seldom True                       Sometimes                      Usually True",
    //     "cor_ans": 0,
    //     "weight": 1.11,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 200,
    //     "qid": 1,
    //     "quest": "{Authority}If we are realistic, we are 'victims of events' that politicians or 'power brokers' control.",
    //     "subset": "LOC2",
    //     "accum1": "LOC2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Seldom True                       Sometimes                      Usually True",
    //     "cor_ans": 0,
    //     "weight": 1.24,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 201,
    //     "qid": 1,
    //     "quest": "{Religion}Personally, I feel there is a divine plan for the world.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 202,
    //     "qid": 1,
    //     "quest": "{Religion}My life's direction is guided by my religious beliefs.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 203,
    //     "qid": 1,
    //     "quest": "{Religion}Usually what happens is for the best because it is God's plan.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 204,
    //     "qid": 1,
    //     "quest": "{Religion}Humankind may think that they run things but I believe there is a supreme all-knowing power with final control.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 205,
    //     "qid": 1,
    //     "quest": "{Religion}We would all be better off if we truly believed in God's destiny for our lives.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 206,
    //     "qid": 1,
    //     "quest": "{Religion}Much of our life is predestined, so we may have to follow a life plan that we don't fully understand.",
    //     "subset": "LOC3",
    //     "accum1": "LOC3",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Very Doubtful                      Perhaps                        Fully Agree",
    //     "cor_ans": 0,
    //     "weight": 0.65,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 207,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} ADAMANT       is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "unyielding      jewel-like     blue colored     wholesome         clear",
    //     "cor_ans": 1,
    //     "weight": 0.87,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 208,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} PROFLIGATE     is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "fertile       imaginative     extravagant       cautious        fearful",
    //     "cor_ans": 3,
    //     "weight": 1.2,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 209,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} DERELICT       is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "improper       neglectful      thoughtless       obnoxious        amazing",
    //     "cor_ans": 2,
    //     "weight": 1.08,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 210,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} SPONTANEOUSLY    is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "freely       innocently       willfully        actively       clumsily",
    //     "cor_ans": 1,
    //     "weight": 0.8,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 211,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} FERVID        is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "improper      thoughtless     impassioned        bitter         obliging",
    //     "cor_ans": 3,
    //     "weight": 0.92,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 212,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} VIBRANT       is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "tactfully       wholesome       beautiful       indulgent       vigorously",
    //     "cor_ans": 5,
    //     "weight": 1.23,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 213,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} NAIVE         is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "youthful        clever       unsophisticated      sad          diverting",
    //     "cor_ans": 3,
    //     "weight": 1.13,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 214,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} PLETHORA       is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "hard rain         power         indignant        abundant       happiness",
    //     "cor_ans": 4,
    //     "weight": 0.83,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 215,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} REPLICA        is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "inlaid floor     replacement  french cookware   reproduction    small socket",
    //     "cor_ans": 4,
    //     "weight": 0.78,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 216,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} GEYSER        is most like...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VS",
    //     "accum3": "",
    //     "seq": 518,
    //     "answer_dt": "spray of water    volcano          spring         waterfall       rain storm",
    //     "cor_ans": 1,
    //     "weight": 1.16,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 217,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} RECLUSIVE      is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "hopeful        supportive     unfaithful        sociable       aggressive",
    //     "cor_ans": 4,
    //     "weight": 0.86,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 218,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} PARSIMONIOUS      is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "munificent      relaxed         impartial       corpulant       courageous",
    //     "cor_ans": 1,
    //     "weight": 1.29,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 219,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} FLAUNT      is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "prepare         pander          remark          request          cover",
    //     "cor_ans": 5,
    //     "weight": 0.86,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 220,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} EMPIRICAL      is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "farsighted     theoretical      completed        radical         farcical",
    //     "cor_ans": 2,
    //     "weight": 1.21,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 221,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} CONCEAL      is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "deny             air           stiffen          insert         advance",
    //     "cor_ans": 2,
    //     "weight": 0.91,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 222,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} DEPLORE       is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "indulge         approve        separate        entertain        weaken",
    //     "cor_ans": 2,
    //     "weight": 0.98,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 223,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} FEROCIOUS     is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "meek          fragile         injurious        youthful         quick",
    //     "cor_ans": 1,
    //     "weight": 0.91,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 224,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} ATROPHY       is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "whisper         flourish        criticize       reject        overthrow",
    //     "cor_ans": 2,
    //     "weight": 0.88,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 225,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} INVEIGLE     is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "malinger       bombard         dissuade         expire           falter",
    //     "cor_ans": 3,
    //     "weight": 1.29,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 226,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} HUMID        is most OPPOSITE to ...",
    //     "subset": "MAIN",
    //     "accum1": "I-V1",
    //     "accum2": "Y-VO",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "fresh           mild            cool             dry            feeble",
    //     "cor_ans": 4,
    //     "weight": 0.81,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 228,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You enjoy expressing powerful MOTIVES. This suggests you seek CONTROL in what you do. This is often a positive trait in Business.",
    //     "subset": "Z1POW",
    //     "accum1": "ZFB",
    //     "accum2": "Z1POW",
    //     "accum3": "",
    //     "seq": 1,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 230,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You have a well developed vocabulary, so LOOK OUT because I'll search my memory banks to better challenge you!",
    //     "subset": "Z3V-H",
    //     "accum1": "ZFB",
    //     "accum2": "Z3V-H",
    //     "accum3": "",
    //     "seq": 3,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 231,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You are very optimistic and positive in evaluating yourself. You lean toward disclosing a style on how you would like others to see you.",
    //     "subset": "Z4E-H",
    //     "accum1": "ZFB",
    //     "accum2": "Z4E-H",
    //     "accum3": "",
    //     "seq": 4,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 235,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You are assertive and usually speak your mind, so I guess I don't have to pull any punches with my wording!",
    //     "subset": "Z8-AS",
    //     "accum1": "ZFB",
    //     "accum2": "Z8-AS",
    //     "accum3": "",
    //     "seq": 6,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 236,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You are very socially outgoing, so I am sorry that you have to spend time with this computer when you would rather be interacting with humans!",
    //     "subset": "Z90EX",
    //     "accum1": "ZFB",
    //     "accum2": "Z90EX",
    //     "accum3": "",
    //     "seq": 9,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 229,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You enjoy expressing the warmer, more sensitive MOTIVES. This suggests you enjoy developing relationships and supports strong social and interpersonal experiences.",
    //     "subset": "Z2BON",
    //     "accum1": "ZFB",
    //     "accum2": "Z2BON",
    //     "accum3": "",
    //     "seq": 2,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 232,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}Your Image is very important which can be a positive trait. This can suggest an ability to \"adjust your style\" to fit your reading of one's \"Company culture.",
    //     "subset": "Z5I-H",
    //     "accum1": "ZFB",
    //     "accum2": "Z5I-H",
    //     "accum3": "",
    //     "seq": 7,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 233,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}You are answering the questions in a very truthful manner so you may run the risk of being too open where you have little interest in political positioning.",
    //     "subset": "Z6E-L",
    //     "accum1": "ZFB",
    //     "accum2": "Z6E-L",
    //     "accum3": "",
    //     "seq": 5,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 234,
    //     "qid": 1,
    //     "quest": "{FEEDBACK - CLICK to Agree or Disagree}Image is not as important to you as others. Hence, you are more likely to \"be yourself in most settings\" so you usually act in a more direct and candid fashion.",
    //     "subset": "Z7I-L",
    //     "accum1": "ZFB",
    //     "accum2": "Z7I-L",
    //     "accum3": "",
    //     "seq": 8,
    //     "answer_dt": "Disagree                           Possible                             Agree",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 237,
    //     "qid": 1,
    //     "quest": "{Final FEEDBACK - CLICK on 2 to continue}I appreciate your efforts to this point. You are about 65% to 75% finished, so...",
    //     "subset": "Z99",
    //     "accum1": "Z99",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 11,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 238,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} ETERNAL  is to  END  as:   [Indecent : Exposure  Ephemeral : Meaning  Intrinsic : Sight  Indiscriminate : AIM  Amicable : Companionship]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "",
    //     "cor_ans": 4,
    //     "weight": 1.09,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 239,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} TRUNK  is to  TREE  as:   [Valley : Mountain  Cavern : Cave  Petal : Flower  Torso : Body  Animal : Fence]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 238,
    //     "answer_dt": "",
    //     "cor_ans": 4,
    //     "weight": 0.89,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 240,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} URGE  is to  COERCE  as:   [Acknowledge : Confirm  Defeat : Vanquish  Summon : Rally  Pressure : Cook  Create : Destroy]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "",
    //     "cor_ans": 2,
    //     "weight": 1.17,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 241,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} MERITORIOUS  is to  PRAISE  as:   [Captious : Criticism  Incredible : Ecstasy  Questionable : Response  Reprehensible : Censure  Kind : Admiration]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "",
    //     "cor_ans": 4,
    //     "weight": 1.11,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 242,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} TUNE  is to  PIANO  as:   [Eat : Food  Sharpen : Knife  Record : Song  Display : Painting  Listen : Radio]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "",
    //     "cor_ans": 2,
    //     "weight": 0.69,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 243,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} CENSUS  is to  POPULATION  as:   [Catalog : Pictures  Inventory : Supplies  Detonation : Explosion  Dictionary : Words  Election : Tally]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "",
    //     "cor_ans": 2,
    //     "weight": 0.89,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 244,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} CONSTELLATION  is to  STAR  as:   [Earth : Moon  Center : Circle  Archipelago : Island  Rain : Water  Maverick : Herd]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "",
    //     "cor_ans": 3,
    //     "weight": 0.91,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 245,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} PERSPICACIOUS  is to  INSIGHT  as:   [Zealous : Freedom  Audacious : Hearing  Delicious : Taste  Avaricious : Generosity  Amiable : Friendliness]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "",
    //     "cor_ans": 3,
    //     "weight": 1.3,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 246,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} REFINE  is to  OIL  as:   [Winnow : Wheat  Harness : Energy  Mine : Coal  Mold : Plastic  Grow : Corn]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "",
    //     "cor_ans": 1,
    //     "weight": 1.17,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 247,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer} IMMORTAL  is to  DEATH  as:   [Anonymous : Fame  Hopeless : Situation  Vital : Life  Indisputable : Agreement  Daily : Yearly]",
    //     "subset": "MAIN",
    //     "accum1": "I-A",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "",
    //     "cor_ans": 1,
    //     "weight": 0.77,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 248,
    //     "qid": 1,
    //     "quest": "{Style}I am willing to state that I have never had feelings where I felt sad, discouraged or dejected.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 0.78,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 249,
    //     "qid": 1,
    //     "quest": "{Style}I never really have any \"ill feelings\" toward people that I disliked, where I wished them harm.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 250,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - are you serious!}    LUGUBRIOUS       is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 518,
    //     "answer_dt": "ludicrous     disappointed      lustful         mournful        euphoric",
    //     "cor_ans": 4,
    //     "weight": 0.99,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 251,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - tough one!}                  APOTHEOSIS       is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "zenith        incarnation     glorification     prowess        euphoric",
    //     "cor_ans": 3,
    //     "weight": 1,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 252,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - so difficult!}               ATAVISTIC        is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "greedy     ancestral trait      savage       degenerate         terse",
    //     "cor_ans": 2,
    //     "weight": 1.09,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 253,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - super hard!}                 EXCORIATE        is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "eliminate     easily forgive     degrade       make whole    strip off skin",
    //     "cor_ans": 5,
    //     "weight": 1.1,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 254,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - is that a real word!}              CICERONE          is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "teacher         guide         Greek god     classic book     fancy noodle",
    //     "cor_ans": 2,
    //     "weight": 0.92,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 255,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - bad and only 4 letters!}              OPUS             is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "review           mural        manuscript     literary work       aria",
    //     "cor_ans": 4,
    //     "weight": 1.04,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 256,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - no way that's a word!}         BATHOS           is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "pity            humor       false pathos      culpable        wash basin",
    //     "cor_ans": 3,
    //     "weight": 1.05,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 257,
    //     "qid": 1,
    //     "quest": "{CLICK on the RIGHT Answer - could be a freebie!}        DOGMA            is most like...",
    //     "subset": "I-V2",
    //     "accum1": "I-V2",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "doctrine         zeal       interpretation     happiness      mother dog",
    //     "cor_ans": 1,
    //     "weight": 0.82,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 258,
    //     "qid": 1,
    //     "quest": "{Style}I believe that focusing on my own needs is more important than helping others.",
    //     "subset": "MAIN",
    //     "accum1": "A1",
    //     "accum2": "A5",
    //     "accum3": "DA1C",
    //     "seq": 337,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.44,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 259,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that how I'm viewed by others is important so I push myself to be successful.",
    //     "subset": "MAIN",
    //     "accum1": "A1",
    //     "accum2": "A5",
    //     "accum3": "DA1C",
    //     "seq": 402,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.35,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 260,
    //     "qid": 1,
    //     "quest": "{Style}I have a strong need to experience all that life has to offer so I am a very active person.",
    //     "subset": "MAIN",
    //     "accum1": "A5",
    //     "accum2": "DA1C",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.02,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 261,
    //     "qid": 1,
    //     "quest": "{Style}I know that I have an extremely high energy and intensity level.",
    //     "subset": "MAIN",
    //     "accum1": "A5",
    //     "accum2": "DA1C",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.29,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 262,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}A person should always make sure that their actions never intentionally harm others.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 263,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}One should never hurt the feelings of others, even if you are right and feel a need to state your views.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.89,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 264,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}You should always make sure that 'in what you do' you never cause a sense of pain for another person.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.19,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 265,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}You should never act in any way that threatens the dignity or welfare of others.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.21,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 266,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}If an action could potentially harm an innocent person it should never be considered as an option.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 267,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}The collective dignity and welfare of the people is the most important concern of any moral society.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.79,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 268,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}In all that you do, it is never necessary to sacrifice the welfare of others.",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.03,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 269,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Moral actions are those actions that are most 'helpful and supportive of others.'",
    //     "subset": "MAIN",
    //     "accum1": "V-ID",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.68,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 270,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}What is ultimately ethical or moral varies from one society to another.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.16,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 271,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Moral or ethical standards, except for the most basic ones, should be individualistic or determined by the person.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.18,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 272,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Different types of 'moralities' (e.g., diverse cultures) cannot be compared in terms of \"right and wrong\".",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 273,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}What is ethical for all people cannot be resolved since it depends upon the society and situation.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.24,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 274,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Moral standards, for the most part, are just personal rules that help guide behavior and should not be used to judge others.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 275,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Ethical and moral behavior is so complex that beyond some basic rules, most people should formulate their own views.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.05,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 276,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Rigidly enforcing an ethical position could stand in the way of better and smoother human relations so you should always be tolerant of others' views.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 284,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.52,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 277,
    //     "qid": 1,
    //     "quest": "{Personal VALUE}Religion does not have to be the basis for making ethical and moral value judgments.",
    //     "subset": "MAIN",
    //     "accum1": "V-RE",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.82,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 278,
    //     "qid": 1,
    //     "quest": "{Business VALUE}You are more effective if you don't always tell the real reason why you do things but 'go with the flow.'",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 279,
    //     "qid": 1,
    //     "quest": "{Business VALUE}Usually, the best way to handle people is to 'tell them what they want to hear.'",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 280,
    //     "qid": 1,
    //     "quest": "{Business VALUE}Honesty, in spite of 'what your mother told you' or what you may believe is not always the best policy.",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 281,
    //     "qid": 1,
    //     "quest": "{Business VALUE}When you ask someone to do something, it is a smart tactic to 'sell them on the idea.'",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 518,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.28,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 282,
    //     "qid": 1,
    //     "quest": "{Business VALUE}If the truth be known about the business world, it is hard to get ahead without 'cutting some corners here and there.'",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 396,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.2,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 283,
    //     "qid": 1,
    //     "quest": "{Business VALUE}From a career viewpoint it is wise to flatter powerful and important people, especially if they have big egos.",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 388,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 284,
    //     "qid": 1,
    //     "quest": "{Business VALUE}A naive policy, from a business view, is to 'trust all people' because you believe that they will do the right thing.",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 105,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 285,
    //     "qid": 1,
    //     "quest": "{Business VALUE}Realistically, most businesspeople who are successful are into 'power, politics, control and money.'",
    //     "subset": "V-MA",
    //     "accum1": "V-MA",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 725,
    //     "answer_dt": "Totally Disagree                   Perhaps                      Totally Agree",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 286,
    //     "qid": 1,
    //     "quest": "{Style}I will admit that I get upset much faster than most people.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.13,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 287,
    //     "qid": 1,
    //     "quest": "{Style}I get irritated with people who are too slow but I deal with the problem and move on.",
    //     "subset": "MAIN",
    //     "accum1": "N-AN",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.74,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 288,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit it, I get anxious or bothered in unfamiliar surroundings.",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 289,
    //     "qid": 1,
    //     "quest": "{Style}I am easily distressed by life events or experience an 'inner sense of uneasiness.'",
    //     "subset": "MAIN",
    //     "accum1": "N-AX",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 290,
    //     "qid": 1,
    //     "quest": "{Style}I have periods where I feel 'down in the dumps' or very sad for no apparent reason.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.09,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 291,
    //     "qid": 1,
    //     "quest": "{Style}I am not very optimistic so small things get to me more than they should.",
    //     "subset": "MAIN",
    //     "accum1": "N-D",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 292,
    //     "qid": 1,
    //     "quest": "{Style}When people are in trouble, you need to be careful believing what they tell you.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.99,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 293,
    //     "qid": 1,
    //     "quest": "{Style}At times, I am very skeptical of the \"stated reason\" behind why people do things.",
    //     "subset": "N-PA",
    //     "accum1": "N-PA",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 294,
    //     "qid": 1,
    //     "quest": "{Style}I am sometimes embarrassed at what I said in the \"heat of the discussion\" and wished I gave it more thought.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.85,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 295,
    //     "qid": 1,
    //     "quest": "{Style}As an adolescent, I was rather ashamed by some of my social mistakes or thoughts I had regarding the opposite sex.",
    //     "subset": "MAIN",
    //     "accum1": "N-SH",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 0.98,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 296,
    //     "qid": 1,
    //     "quest": "{Style}Reflecting back on when I was a child, I felt guilty about some of my behavior when my parents were absent.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 297,
    //     "qid": 1,
    //     "quest": "{Style}Even if I could get away with it, I would not steal or lie because the guilt would be too great.",
    //     "subset": "MAIN",
    //     "accum1": "N-GU",
    //     "accum2": "X1",
    //     "accum3": "",
    //     "seq": 887,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.58,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 298,
    //     "qid": 1,
    //     "quest": "{Style}I'll admit that I can be quite impulsive or even impetuous in some of my behavior.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 882,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.06,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 299,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes I feel like breaking with tradition and doing something very different or unusual.",
    //     "subset": "N-IM",
    //     "accum1": "N-IM",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 646,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.93,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 300,
    //     "qid": 1,
    //     "quest": "{Style}My friends tell me that I am one of the most organized people that they know.",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 619,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.04,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 301,
    //     "qid": 1,
    //     "quest": "{Style}I like to collect things (e.g., cards, antiques, tools, hobby items, knick-knacks).",
    //     "subset": "N-CO",
    //     "accum1": "N-CO",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 396,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.78,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 302,
    //     "qid": 1,
    //     "quest": "{Style}If I have to leave an important task unfinished, I do worry about getting it done.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 388,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.18,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 303,
    //     "qid": 1,
    //     "quest": "{Style}If I had a problem that bothered me, it would stay in my mind until I solved it.",
    //     "subset": "N-OB",
    //     "accum1": "N-OB",
    //     "accum2": "A3",
    //     "accum3": "",
    //     "seq": 105,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 304,
    //     "qid": 1,
    //     "quest": "{Style}Sometimes, for no apparent reason, I become so happy that I almost start to cry.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 725,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.26,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 305,
    //     "qid": 1,
    //     "quest": "{Style}My friends have told me that I have intense feelings or emotions but that is just part of who I am.",
    //     "subset": "N-HY",
    //     "accum1": "N-HY",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 383,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.79,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 306,
    //     "qid": 1,
    //     "quest": "{Style}When things are not going well or I am under significant pressure, I may develop \"physical stress symptoms.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 306,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 307,
    //     "qid": 1,
    //     "quest": "{Style}I'm willing to admit it, I seldom take people \"head on\" or aggressively move on them but I have my ways to \"even the score.",
    //     "subset": "N-SO",
    //     "accum1": "N-SO",
    //     "accum2": "A4",
    //     "accum3": "",
    //     "seq": 17,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 308,
    //     "qid": 1,
    //     "quest": "{View}In making decisions, it is usually better to go with...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "the concrete data                 Balanced                 your gut instinct",
    //     "cor_ans": 0,
    //     "weight": 0.86,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 309,
    //     "qid": 1,
    //     "quest": "{View}If I am not constrained by my position, I am more interested in what is ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "actual                             Balanced                        possible",
    //     "cor_ans": 0,
    //     "weight": 0.97,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 310,
    //     "qid": 1,
    //     "quest": "{View}In reading for pleasure, I prefer writers who ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "say what they mean                Balanced                 express by analogy",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 311,
    //     "qid": 1,
    //     "quest": "{View}For the most part facts usually ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "speak for themselves              Balanced             illustrate principles",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 312,
    //     "qid": 1,
    //     "quest": "{View}Common sense, for the most part is ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "rarely questionable               Balanced                often questionable",
    //     "cor_ans": 0,
    //     "weight": 0.54,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 313,
    //     "qid": 1,
    //     "quest": "{View}I find that I am more interested in ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "Practical/applied material        Balanced           Theory, concepts, ideas",
    //     "cor_ans": 0,
    //     "weight": 1.25,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 314,
    //     "qid": 1,
    //     "quest": "{View}When I am thinking or considering options I go more by ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "facts & figures                   Balanced              principles & thoughts",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 315,
    //     "qid": 1,
    //     "quest": "{View}I respect as a trait in myself and others, a ...",
    //     "subset": "MB-S",
    //     "accum1": "MB-S",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 135,
    //     "answer_dt": "strong sense of reality            Balanced                 vivid imagination",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 316,
    //     "qid": 1,
    //     "quest": "{View}In general, I feel I'm more guided by my ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 381,
    //     "answer_dt": "principles                        Balanced                          emotions",
    //     "cor_ans": 0,
    //     "weight": 0.94,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 317,
    //     "qid": 1,
    //     "quest": "{View}In approaching others, I would say my style is ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 578,
    //     "answer_dt": "objective & factual               Balanced               personal & engaging",
    //     "cor_ans": 0,
    //     "weight": 1.01,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 318,
    //     "qid": 1,
    //     "quest": "{View}In relating to others, I feel my style emphasizes ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 337,
    //     "answer_dt": "consistent thought pattern        Balanced               harmonious relations",
    //     "cor_ans": 0,
    //     "weight": 1.18,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 319,
    //     "qid": 1,
    //     "quest": "{View}I usually feel most comfortable making ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 673,
    //     "answer_dt": "logical judgments                 Balanced                    value judgments",
    //     "cor_ans": 0,
    //     "weight": 0.99,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 320,
    //     "qid": 1,
    //     "quest": "{View}My friends would best describe me as ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 402,
    //     "answer_dt": "cool-headed                       Balanced                       warm-hearted",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 321,
    //     "qid": 1,
    //     "quest": "{View}For the most part, I see myself as ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 823,
    //     "answer_dt": "firm & structured                  Balanced            gentle & understanding",
    //     "cor_ans": 0,
    //     "weight": 1.12,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 322,
    //     "qid": 1,
    //     "quest": "{View}When I have the option or time, I feel it is most enjoyable to ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 208,
    //     "answer_dt": "debate the issue                  Balanced                arrive at agreement",
    //     "cor_ans": 0,
    //     "weight": 0.78,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 323,
    //     "qid": 1,
    //     "quest": "{View}Which is the greatest error in making complex decisions, being too ...",
    //     "subset": "MB-T",
    //     "accum1": "MB-T",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "passionate                         Balanced                         objective",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 324,
    //     "qid": 1,
    //     "quest": "{Style}When I think about my behavior, I always focus on the needs of others and then feel best about my decision.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 851,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 1.08,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 325,
    //     "qid": 1,
    //     "quest": "{Style}I never criticize people who are offensive nor do I make bad remarks behind their backs.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 555,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 1.1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 326,
    //     "qid": 1,
    //     "quest": "{Style}I have never really found it hard or \"anxiety provoking\" to speak to a large group of people.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 909,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 0.92,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 327,
    //     "qid": 1,
    //     "quest": "{Style}I have never made sarcastic remarks that have offended others.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 833,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 1.25,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 328,
    //     "qid": 1,
    //     "quest": "{Style}I believe that all criticism is an opportunity to improve so it honestly doesn't bother me.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 244,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 0.88,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 329,
    //     "qid": 1,
    //     "quest": "{Style}I am always careful with everything that I do so I never rush to get things done.",
    //     "subset": "MAIN",
    //     "accum1": "A6",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 769,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 0.82,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 330,
    //     "qid": 1,
    //     "quest": "{Style}I am always very careful when I go out to make sure that I am neat and presentable.",
    //     "subset": "MAIN",
    //     "accum1": "A7",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 558,
    //     "answer_dt": "False                             Sometimes                              True",
    //     "cor_ans": 0,
    //     "weight": 0.07,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 331,
    //     "qid": 1,
    //     "quest": "{Analogy Example - Answer = 3 or COW : MOO }DOG  is to  BARK  as:           [Tree : Bark  Tiger : Claws  COW : MOO  Ocean : Waves  Plane : Wings]",
    //     "subset": "MAIN",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 134,
    //     "answer_dt": "",
    //     "cor_ans": 3,
    //     "weight": 1,
    //     "qstyle": "V"
    //   },
    //   {
    //     "quest_id": 332,
    //     "qid": 1,
    //     "quest": "{Style}I am concerned about my appearance since my image is important to my overall sense of success.",
    //     "subset": "MAIN",
    //     "accum1": "A1",
    //     "accum2": "A5",
    //     "accum3": "DA1C",
    //     "seq": 851,
    //     "answer_dt": "Seldom True                       Sometimes                        Often True",
    //     "cor_ans": 0,
    //     "weight": 1.17,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 333,
    //     "qid": 1,
    //     "quest": "{Style}The knowledge that I am respected by my peers or held in esteem is a major driver of my behavior",
    //     "subset": "MAIN",
    //     "accum1": "A1",
    //     "accum2": "A5",
    //     "accum3": "DA1C",
    //     "seq": 890,
    //     "answer_dt": "Not Descriptive                   Sometimes                  Very Descriptive",
    //     "cor_ans": 0,
    //     "weight": 1.29,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 334,
    //     "qid": 1,
    //     "quest": "{OPTION - Answer or don't answer Questions - Your choice}You'll see 10 questions with Religion along the TOP. You DON'T have to answer them if they bother you in any way. Answer '1' to move on. However, if they are okay, PLEASE answer them.",
    //     "subset": "Z75-L",
    //     "accum1": "Z75-L",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 10,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 1,
    //     "qstyle": "S8"
    //   },
    //   {
    //     "quest_id": 338,
    //     "qid": 1,
    //     "quest": "Enter a 5 digit Invite Code in the Seq column. The Invite Code should be put in the link in the email invitation:  Dear Test Taker, Follow this link to start the test: http://www.digital-couch.com/dcEntry?icode=19461 Change the icode value occasionally. This will prevent anyone from taking the test with an old ICODE.",
    //     "subset": "ICODE",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 19461,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 0,
    //     "qstyle": ""
    //   },
    //   {
    //     "quest_id": 339,
    //     "qid": 1,
    //     "quest": "a 5 character Invite Code for future Short-Test Takers www.digital-couch.com?ICODS=91246.    The Vocabulary questions are eliminated.  Make sure it is ICODS!",
    //     "subset": "ICODS",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 91246,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 0,
    //     "qstyle": ""
    //   },
    //   {
    //     "quest_id": 335,
    //     "qid": 1,
    //     "quest": "The DIGITAL COUCH evaluates your Personal Style.\n \nQuestions seldom have a correct answer. \nBe careful answering because you can't change your answers. \n\n      If you see VOCABULARY Words - DO NOT look them up.\n\n\n\n      The exercise has TWO parts (I = 75% - II = 25%)\n\n         ** SEE % Complete Indicator - After each LOAD ** \n\n      If you get interrupted, return to website and re-enter \n      your NAME/SPONSOR. It starts about where you left off.    \n\n                 Click Continue to Start.....",
    //     "subset": "INTRO",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 11111,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 0,
    //     "qstyle": "H"
    //   },
    //   {
    //     "quest_id": 336,
    //     "qid": 1,
    //     "quest": "Your initial responses were recorded, new questions\n      were added and inappropriate questions eliminated.\n                        \n          WOW !!    You are 70% - 75% done.... \"Phew....\n\n            You didn't know it would be this hard!\"\n\n    The next few \"items\" give FEEDBACK, If a Bias was \n    detected you may modify responding style.  \n\n                         \n                        Click on Continue ....",
    //     "subset": "BREAK",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 11111,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 0,
    //     "qstyle": "H"
    //   },
    //   {
    //     "quest_id": 337,
    //     "qid": 1,
    //     "quest": "You finished the most sophisticated assessment\n            available.  I'll bet you are glad it is over! \n            \n            Your results are submitted for review.\n            Questions/comments can be emailed to: \n\n            edmurray17@comcast.net\n\n            \n            Thank you and have a GREAT Day!\n            DIGITAL COUCH, LLC",
    //     "subset": "FINISH",
    //     "accum1": "",
    //     "accum2": "",
    //     "accum3": "",
    //     "seq": 11111,
    //     "answer_dt": "",
    //     "cor_ans": 0,
    //     "weight": 0,
    //     "qstyle": "H"
    //   }
    // ]
  }

  convertEd338ToDbLayout(){ //called from html button
    console.log('running convertEd338ToDbLayout')
    for (let i = 0; i < this.edArray338.length; i++) {
      //console.log('4790 ',this.edArray338[i].subset)
      this.buildOneQuestFrom338(this.edArray338[i])
      this.newQuestArray.push(this.newQuestObj)
    }
    console.table(this.newQuestArray)
    // now build newRuleArray:
    for (let i = 0; i < this.edRuleArray338.length; i++) {
      //console.log('4806 ',this.edRuleArray338[i].subset)
      this.buildOneRuleFrom338(this.edRuleArray338[i])
      this.newRulesArray.push(this.newRuleObj)
    }
    // console.log('------- newRulesArray: -----------')
    // console.table(this.newRulesArray)
    alert('done convertEd338ToDbLayout.  now click button write to db.')
  } // end convertEd338ToDbLayout
  
  buildOneQuestFrom338(oneEd){
    //console.log('running ')
    //console.log(oneEd.subset)
    // quest_id,qid,quest,subset,accum1,accum2,accum3,
    // seq,answer_dt,cor_ans,weight,qstyle
    this.newQuestObj = 
    {
      cust: "1",
      qid: "1",
      questNbr: oneEd.quest_id.toString(),
      questSeq: oneEd.seq.toString(),
      preQuest: this.formatpreQuest(oneEd.quest),
      questTxt: this.formatQuest(oneEd.quest),
      acaFrame: this.formatAcaFrame(oneEd.qstyle,oneEd.answer_dt),
      aca: this.formatAca(oneEd.qstyle,oneEd.answer_dt,oneEd.quest,oneEd.cor_ans),
      acaPointVals: this.formatAcaPointVals(oneEd.qstyle,oneEd.cor_ans),
      accum: this.formatAccum(oneEd.accum1,oneEd.accum2,oneEd.accum3),
      //accum: [oneEd.accum1,oneEd.accum2,oneEd.accum3],
      subset: oneEd.subset,
      qstyle: oneEd.qstyle
    }
  } // end buildOneQuestFrom338
  
  formatpreQuest(x){
    if (x.substring(0,7) == '{Style}'){
      return '{Style}' }
    if (x.substring(0,9) == '{Control}'){
      return '{Control}' }
    if (x.substring(0,11) == '{Authority}'){
      return '{Authority}' }
    if (x.substring(0,10) == '{Religion}'){
      return '{Religion}' } 
    if (x.substring(0,27) == '{CLICK on the RIGHT Answer}'){
      return '{CLICK on the RIGHT Answer}' } 
    if (x.substring(0,39) == '{FEEDBACK - CLICK to Agree or Disagree}'){
      return '{FEEDBACK - CLICK to Agree or Disagree}' } 
    if (x.substring(0,41) == '{Final FEEDBACK - CLICK on 2 to continue}'){
      return '{Final FEEDBACK - CLICK on 2 to continue}' } 
    if (x.substring(0,46) == '{CLICK on the RIGHT Answer - are you serious!}'){
      return x.substring(0,46) }  
    if (x.substring(0,40) == '{CLICK on the RIGHT Answer - tough one!}'){
       return x.substring(0,40) }  
    if (x.substring(0,43) == '{CLICK on the RIGHT Answer - so difficult!}'){
      return x.substring(0,43) }  
    if (x.substring(0,41) == '{CLICK on the RIGHT Answer - super hard!}'){
      return x.substring(0,41) }  
    if (x.substring(0,50) == '{CLICK on the RIGHT Answer - is that a real word!}'){
       return x.substring(0,50) }  
    if (x.substring(0,53) == '{CLICK on the RIGHT Answer - bad and only 4 letters!}'){
      return x.substring(0,53) } 
    if (x.substring(0,51) == "{CLICK on the RIGHT Answer - no way that's a word!}"){
      return x.substring(0,51) } 
    if (x.substring(0,49) == '{CLICK on the RIGHT Answer - could be a freebie!}'){
      return x.substring(0,49) }
    if (x.substring(0,16) == '{Personal VALUE}'){
      return x.substring(0,16) } 
    if (x.substring(0,16) == '{Business VALUE}'){
      return x.substring(0,16) } 
    if (x.substring(0,6) == '{View}'){
      return x.substring(0,6) } 
    if (x.substring(0,44) == '{Analogy Example - Answer = 3 or COW : MOO }'){
      return x.substring(0,44) } 
    if (x.substring(0,57) == "{OPTION - Answer or don't answer Questions - Your choice}"){
      return x.substring(0,57) } 
    return ''   //no pre quest found  
  } // end formatpreQuest

  formatQuest(x){
    if (x.substring(0,7) == '{Style}'){
      return x.substring(7,222) }
    if (x.substring(0,9) == '{Control}'){
      return x.substring(9,222) }
    if (x.substring(0,11) == '{Authority}'){
      return x.substring(11,222) }
    if (x.substring(0,10) == '{Religion}'){
      return x.substring(10,222) }
    if (x.substring(0,27) == '{CLICK on the RIGHT Answer}'
    &&  x.includes("[")== false ){
      return x.substring(27,222) }
    if (x.substring(0,39) == '{FEEDBACK - CLICK to Agree or Disagree}'){
      return x.substring(39,222) }
    if (x.substring(0,41) == '{Final FEEDBACK - CLICK on 2 to continue}'){
      return x.substring(41,222) }
    if (x.substring(0,46) == '{CLICK on the RIGHT Answer - are you serious!}'){
      return x.substring(47,222) }  
    if (x.substring(0,40) == '{CLICK on the RIGHT Answer - tough one!}'){
       return x.substring(40,222) }  
    if (x.substring(0,43) == '{CLICK on the RIGHT Answer - so difficult!}'){
      return x.substring(43,222) }  
    if (x.substring(0,41) == '{CLICK on the RIGHT Answer - super hard!}'){
      return x.substring(41,222) }  
    if (x.substring(0,50) == '{CLICK on the RIGHT Answer - is that a real word!}'){
       return x.substring(50,222) }  
    if (x.substring(0,53) == '{CLICK on the RIGHT Answer - bad and only 4 letters!}'){
      return x.substring(53,222) } 
    if (x.substring(0,51) == "{CLICK on the RIGHT Answer - no way that's a word!}"){
      return x.substring(51,222) } 
    if (x.substring(0,49) == '{CLICK on the RIGHT Answer - could be a freebie!}'){
      return x.substring(49,222) }
    if (x.substring(0,16) == '{Personal VALUE}'){
      return x.substring(16,222) } 
    if (x.substring(0,16) == '{Business VALUE}'){
      return x.substring(16,222) } 
    if (x.substring(0,6) == '{View}'){
      return x.substring(6,222) } 
    if (x.substring(0,44) == '{Analogy Example - Answer = 3 or COW : MOO }'){
      return x.substring(44,222) } 
    if (x.substring(0,57) == "{OPTION - Answer or don't answer Questions - Your choice}"){
      return x.substring(57,222) } 
    //////
    let lCurlyPos = x.indexOf('{')
    let rCurlyPos = x.indexOf('}')
    let lBrackPos = x.indexOf('[')
    // console.log(x)
    //xa = x.substring(0,rCurlyPos) 
    //xb = x.substring(0,lBrackPos)
    x = x.substring(rCurlyPos+1,lBrackPos)
    //x = rCurlyPos.toString() + ' ' + lBrackPos.toString()
    return x   
  } // end formatQuest

  formatAca(qStyle,answer_dt,questTxt,corAns) {
    if (qStyle == 'S8') {
      return ['1','2','3','4','5','6','7','8']
    }
    if (qStyle == 'V' && corAns > 0) {
      // see ed 237 for yet another flavor of aca (has corAns)
      let lBrackPos = questTxt.indexOf('[') + 1
      let rBrackPos = questTxt.indexOf(']') 
      if (lBrackPos > -1 && rBrackPos > -1) {
        let a = questTxt.substring(lBrackPos, rBrackPos)
        let ax = a.split('  ')
        return ax 
      }
      //return ['condor','duck','robin','jay','finch']
      let kk = (answer_dt.split('   ').join('|'))
      kk =       kk.replaceAll('  ' , '|')
      kk =       kk.replaceAll('|||'  , '|')
      kk =       kk.replaceAll('||'  , '|')
      kk =       kk.replaceAll('||'  , '|')
      let kkArray =  kk.split('|')
      //console.log(kkArray)
      return kkArray 
      // "malinger       bombard         dissuade         expire           falter",
    }
    //let moo = "{CLICK on the RIGHT Answer} IMMORTAL  is to  DEATH  as:   [Anonymous : Fame  Hopeless : Situation  Vital : Life  Indisputable : Agreement  Daily : Yearly]"
      // see ed 248 for where ya might get aca

  } // end formatAca

  formatAcaFrame(qStyle,answerDt){
    if (qStyle == 'V') {return []} // <-no frame needed.
    if (answerDt.length == 0) {return [] } // <-no frame-ish input.
    ///////////////////////////
    // need a descriptive frame: (like disagree,maybe,agree)
    let xx = (answerDt.split('   ').join('|'))
    xx =       xx.replaceAll('  ' , '|')
    xx =       xx.replaceAll('|||'  , '|')
    xx =       xx.replaceAll('||'  , '|')
    xx =       xx.replaceAll('||'  , '|')
    let xArray =  xx.split('|')
    //console.log(xArray)
    return xArray
  } // end formatAcaFrame

  formatAcaPointVals(qStyle,corAns){
    if (qStyle == 'S8') {
      return [1,2,3,4,5,6,7,8]
    }
    if (qStyle == 'V') {
      let b = []
      for (let i =0; i<5; i++) {
        if (i+1 == corAns){ // array is zeroBased, corAns is oneBased.
          b.push(1)
        } else {
          b.push(0)
        } // end if
      } //end for
      return b
    }
    return [] //default, hope I never get here.
  }

  formatAccum(ac1,ac2,ac3){
    if ( ac2.length > 0 && ac3.length > 0) {return [ac1,ac2,ac3]}
    if ( ac2.length > 0                  ) {return [ac1,ac2]}
    if ( ac1.length > 0                  ) {return [ac1]}
    return []
  }

  writeNewDbTables(){
    // he hit the button to Write All Quest to DB
    // alert(this.newQuestArray.length)
    for (let i = 0; i<this.newQuestArray.length;i++){
      this.newQuestObj = this.newQuestArray[i]
      this.launchQtWriteQuestion(i)
    } // end for
    // now build subsets, write to subset db
    this.buildSubsetArrayTemp()
    this.convertSubsetsToDbLayout()
    this.launchQtUpdateSubsets() //assume fauna db subset already exists
    // now build rules, write to rules db
    //for (let i = 0; i<2; i++){ //billy 5 temp
    for (let i = 0; i<this.newRulesArray.length; i++){  
      this.newRuleObj = this.newRulesArray[i]
      this.launchQtWriteRule()
    } // end for

  } // end writeNewDbTables

  launchQtWriteQuestion(i) {
    console.log('running  conv launchQtWriteQuestion')
    // billy temp ... write a sampling of questions
    // let mar = ['26','189','195','201','206','225','226','236','238','248','306','332',
    //  '126','289','295','301','306','325','326','336','38','48','27','32']
    // console.log(this.newQuestArray[i])
    // let bar =  this.newQuestArray[i].questNbr
    // let narTf = mar.includes(bar)
    // if (narTf == false){return}
    //billy temp
      api.qtWriteQuestion(this.newQuestObj)
          .then 
          (   (qtDbRtnObj) => 
            {
              this.qtDbDataObj = qtDbRtnObj.data
              // return from this on-the-fly function is implied  
            }
          ) // done with .then
        .catch(() => {
          console.log('launchQtWriteQuestion error. questObj:' +  this.newQuestObj)
        })
  } //end launchQtWriteQuestion

  buildSubsetArrayTemp(){
    this.newSubsetArrayTemp = []
    let si = -1
    // read all possible subsets in newQuestArray.
    for (let i = 0; i < this.newQuestArray.length; i++){
      // in newSubsetArray so far, look for newQuestArray subset.
      // if not yet found in newSubsetArray, push it into newSubsetArray
      //console.log(this.newQuestArray[i].subset)
      si = this.newSubsetArrayTemp.findIndex((vvv) => {
        return vvv == this.newQuestArray[i].subset
      }) 
      if (si < 0){
        this.newSubsetArrayTemp.push(this.newQuestArray[i].subset)
      } // end if
    } // end for
    //console.table(this.newSubsetArrayTemp)
  }

  convertSubsetsToDbLayout(){
    this.newSubsetObj = 
    {
      cust: "1",
      qid: "1",
      subsets: this.formatSubsets()
    }
  } // end convertSubsetsTDbLayout

  formatSubsets(){
    // like ["main1", "parakeetFollowOn", "main2", "iqFollowOn", "main3"]
    let s = []
    for (let i=0;  i<this.newSubsetArrayTemp.length  ;i++){
      s.push(this.newSubsetArrayTemp[i])
    }
    return s
  }

  launchQtUpdateSubsets() {
    console.log('running  conv launchQtUpdateSubsets')
    // update the subset list
    // in the existing fauna rec for cust1 qid1.
    // using the just-built newSubsetObj.

    api.qtUpdateSubset(this.newSubsetObj)
        .then 
        (   (qtDbRtnObj) => 
          {
            this.qtDbDataObj = qtDbRtnObj.data
            // return from this on-the-fly function is implied  
          }
        ) // done with .then
      .catch(() => {
        console.log('launchQtUpdateSubsets error. newSubsetObj:' +  this.newSubsetObj)
      })

  } // end launchQtUpdateSubsets 


  setEdRuleArray338(){
    this.edRuleArray338 = []
    // billy enable this to run conv for real
    // this.edRuleArray338 = [
    //     {
    //       "rule_id": 11,
    //       "qid": 1,
    //       "subset": "N-PA",
    //       "accum": "DA1",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 12,
    //       "qid": 1,
    //       "subset": "N-IM",
    //       "accum": "DA0",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 13,
    //       "qid": 1,
    //       "subset": "N-CO",
    //       "accum": "DA3",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 14,
    //       "qid": 1,
    //       "subset": "N-OB",
    //       "accum": "DA4",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 15,
    //       "qid": 1,
    //       "subset": "N-HY",
    //       "accum": "DB1",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 16,
    //       "qid": 1,
    //       "subset": "N-SO",
    //       "accum": "DB3",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 17,
    //       "qid": 1,
    //       "subset": "T1",
    //       "accum": "T-E",
    //       "oper": ">",
    //       "thresh": 10
    //     },
    //     {
    //       "rule_id": 18,
    //       "qid": 1,
    //       "subset": "T2",
    //       "accum": "T-E",
    //       "oper": ">",
    //       "thresh": 10
    //     },
    //     {
    //       "rule_id": 19,
    //       "qid": 1,
    //       "subset": "T3",
    //       "accum": "T-E",
    //       "oper": ">",
    //       "thresh": 10
    //     },
    //     {
    //       "rule_id": 20,
    //       "qid": 1,
    //       "subset": "LOC2",
    //       "accum": "LOC1",
    //       "oper": ">",
    //       "thresh": 20
    //     },
    //     {
    //       "rule_id": 21,
    //       "qid": 1,
    //       "subset": "LOC3",
    //       "accum": "LOC1",
    //       "oper": ">",
    //       "thresh": 20
    //     },
    //     {
    //       "rule_id": 22,
    //       "qid": 1,
    //       "subset": "Z2BON",
    //       "accum": "A2",
    //       "oper": ">",
    //       "thresh": 165
    //     },
    //     {
    //       "rule_id": 23,
    //       "qid": 1,
    //       "subset": "Z3V-H",
    //       "accum": "I-V1",
    //       "oper": ">",
    //       "thresh": 14
    //     },
    //     {
    //       "rule_id": 24,
    //       "qid": 1,
    //       "subset": "Z1POW",
    //       "accum": "A1",
    //       "oper": ">",
    //       "thresh": 210
    //     },
    //     {
    //       "rule_id": 25,
    //       "qid": 1,
    //       "subset": "Z4E-H",
    //       "accum": "A6",
    //       "oper": ">",
    //       "thresh": 41
    //     },
    //     {
    //       "rule_id": 26,
    //       "qid": 1,
    //       "subset": "Z5I-H",
    //       "accum": "A7",
    //       "oper": ">",
    //       "thresh": 43
    //     },
    //     {
    //       "rule_id": 27,
    //       "qid": 1,
    //       "subset": "Z6E-L",
    //       "accum": "A6",
    //       "oper": "<",
    //       "thresh": 32
    //     },
    //     {
    //       "rule_id": 28,
    //       "qid": 1,
    //       "subset": "Z7I-L",
    //       "accum": "A7",
    //       "oper": "<",
    //       "thresh": 31
    //     },
    //     {
    //       "rule_id": 29,
    //       "qid": 1,
    //       "subset": "Z8-AS",
    //       "accum": "T-E3",
    //       "oper": ">",
    //       "thresh": 42
    //     },
    //     {
    //       "rule_id": 30,
    //       "qid": 1,
    //       "subset": "Z90EX",
    //       "accum": "T-E2",
    //       "oper": ">",
    //       "thresh": 40
    //     },
    //     {
    //       "rule_id": 31,
    //       "qid": 1,
    //       "subset": "Z99",
    //       "accum": "DA0",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 32,
    //       "qid": 1,
    //       "subset": "I-V2",
    //       "accum": "I-V1",
    //       "oper": ">",
    //       "thresh": 14
    //     },
    //     {
    //       "rule_id": 33,
    //       "qid": 1,
    //       "subset": "V-MA",
    //       "accum": "DA1C",
    //       "oper": ">",
    //       "thresh": 10
    //     },
    //     {
    //       "rule_id": 34,
    //       "qid": 1,
    //       "subset": "MB-S",
    //       "accum": "DA0",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 35,
    //       "qid": 1,
    //       "subset": "MB-T",
    //       "accum": "DA0",
    //       "oper": ">",
    //       "thresh": 5
    //     },
    //     {
    //       "rule_id": 36,
    //       "qid": 1,
    //       "subset": "Z75-L",
    //       "accum": "LOC1",
    //       "oper": ">",
    //       "thresh": 20
    //     }
    // ]
  }  // end setEdRuleArray338

  buildOneRuleFrom338(oneEdRule){
    this.newRuleObj = 
    {
      cust: "1",
      qid: "1",
      subset: oneEdRule.subset,
      accum: oneEdRule.accum,
      oper: oneEdRule.oper,
      thresh: oneEdRule.thresh
    }

  } // end buildOneRuleFrom338

  launchQtWriteRule(){
    console.log('running  conv launchQtWriteRule')
      api.qtWriteRule(this.newRuleObj)
          .then 
          (   (qtDbRtnObj) => 
            {
              this.qtDbDataObj = qtDbRtnObj.data
              // return from this on-the-fly function is implied  
            }
          ) // done with .then
        .catch(() => {
          console.log('launchQtWriteRule error. newRuleObj:' +  this.newRuleObj)
        })

  }

  massDeleteQuestAndRulesClicked() {
    alert('running massDeleteQuestAndRulesClicked')
    this.launchQtMassDeleteQuestions()
    this.launchQtMassDeleteRules()
  }

  launchQtMassDeleteQuestions(){
    let myCust = '1'
    let myQid  = '1'
    console.log('running conv launchQtMassDeleteQuestions')
      api.qtMassDeleteQuestions(myCust,myQid) 
          .then 
          (   (qtDbRtnObj) => 
            {
              this.qtDbDataObj = qtDbRtnObj.data
              // return from this on-the-fly function is implied  
            }
          ) // done with .then
        .catch(() => {
          console.log('qtMassDeleteQuestions error.' )
        })


  }

  launchQtMassDeleteRules(){
    let myCust = '1'
    let myQid  = '1'
    console.log('running conv launchQtMassDeleteRules')
      api.qtMassDeleteRules(myCust,myQid) 
          .then 
          (   (qtDbRtnObj) => 
            {
              this.qtDbDataObj = qtDbRtnObj.data
              // return from this on-the-fly function is implied  
            }
          ) // done with .then
        .catch(() => {
          console.log('qtMassDeleteRules error.' )
        })


  }

}
