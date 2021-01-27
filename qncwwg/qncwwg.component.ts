import { getParseErrors } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, 
         EventEmitter, Output } from '@angular/core';
 
@Component({
  selector: 'app-qncwwg',
  templateUrl: './qncwwg.component.html'
})
export class QncwwgComponent implements OnInit {
  constructor() {}
  @Input('showQncWwg') showQncWwgName: boolean
  @Input() meow: string
  //@Input() subsetQncWwgyyyyyy: string
  @Input() subsetsQncWwg
  @Input() rulesIn  
  @Input() subsetIn
  @Input() questionsIn

  @Output() doneQncWwgOut = new EventEmitter()
  @Output() rulesQncWwgOut = new EventEmitter() 
  hisChosenRule = '?-?'
  //heWantsToWorkOnRule = false
  anyRulesYes = false // tied to radio button
  anyRulesNo = true // tied to radio button
  rulesArrayThisGroup = []
  newRuleButDisabledYn = true
  newAccumName = 'newAccum01'
  //saveButDisabledTf = true
  wordsThatPrefaceRules = 'no rules (always ask questions in)'
  showDeleteRulesButTf = false
  ruleRowHead ='rule:'
  //saveCheckMarkOnTf = false
  //heClickedIntoRule = false
  ruleRowThatWasBlurred = -1
  newRuleClicked = false
  state = {buttonText: "Initial text" } 
  //but27 = document.querySelector("button")
  ngOnInit() {
    //alert('just starting wwg')
    // console.log('rulesIn at ngInit:')
    // console.table(this.rulesIn)
    // console.log('subsetIn at ngInit:',this.subsetIn)
    this.initStuff()
    //this.setCursorOnhtmlIdSubsetInput()
  } // end ngOnInit

  initStuff(){
    //console.log('running initStuff')
    //window.history.forward() //hack for browser back?
    // Tell your browser to quit this component on back button.
    // Update state, history, and user interface
   // Connect your button to the handler above to trigger on click
//this.but27 = document.querySelector("button")
this.setEventListenerWithDelay()
this.setPopState() //billy learn and fix back button
    this.render27() 
    this.initRulesArrayThisGroup()
    if (this.rulesArrayThisGroup.length>0){
      console.log('there are rules')
      console.table(this.rulesArrayThisGroup)
      this.anyRulesNo = false // tied to radio button
      this.anyRulesYes = true // tied to radio button
      this.newRuleButDisabledYn = false
      this.wordsThatPrefaceRules = 
        'rule(s) that influence asking questions in group: ' 

    }else{
      //console.log('there are no rules')
      this.anyRulesNo = true // tied to radio button
      this.anyRulesYes = false // tied to radio button
    }

    this.setCursorOnhtmlIdSubsetInputWithDelay()
    
    if (this.subsetIn == 'NewGroupName1'){
      alert('NewGroupName1, make him rename it.')
    }
    
  } // end initStuff

  render27() {
    console.log('running wwg render27')
    this.meow = 'meowmeow'
    console.log(this.meow)
  // Change the look of your app based on state
  // this.but27.innerText = this.state.buttonText
  } // end render27

  async setEventListenerWithDelay()  {
    // hack to wait for a bit before setting handler
    await new Promise(resolve => setTimeout(()=>resolve(), 500))
    .then(()=>this.setEventHandler());
  } // end setEventListenerWithDelay

  setEventHandler(){
    console.log('running setEventHandler')
    //this.but27.addEventListener("click", this.handleButtonClick);
  } // end setEventHandler

  handleButtonClick() { 
    console.log('handleButtonClick')
    //this.but27.innerText = "I clicked the button!"
    window.history.pushState(this.state, null, "");
    this.render27();
  } // end handleButtonClick

  setPopState(){
    console.log('running setPopState')
    window.onpopstate = function (ev) {  
      console.log('running window.onpopstate')
      //this.doneWwg() // ??billy?
    }
  } // end setPopState

  async setCursorOnhtmlIdSubsetInputWithDelay() {
    // hack to wait for a bit before setting cursor
    await new Promise(resolve => setTimeout(()=>resolve(), 100))
    .then(()=>this.setCursorOnhtmlIdSubsetInput());
} // end setCursorOnhtmlIdSubsetInputWithDelay

  setCursorOnhtmlIdSubsetInput(){
    console.log('running setCursorOnhtmlIdSubsetInput')
    let el: HTMLInputElement = 
        document.getElementById('htmlIdSubsetInput') as HTMLInputElement
    el.classList.remove('is-info')
    el.classList.add('has-background-info-light')
    el.focus()

    if(this.subsetIn == 'NewGroupName1') {
      el.select() //  select all text. needs a delay to work.
    }
  } // end setCursorOnhtmlIdSubsetInput

  subsetFocused(){
    console.log('running subsetFocused')
    let el: HTMLInputElement = 
      document.getElementById('htmlIdSubsetInput') as HTMLInputElement
    el.classList.remove('is-info')
    el.classList.add('has-background-info-light')

    this.ruleChkBlur()
  } // end subsetFocused

  subsetBlurred(){
    console.log('running  subsetBlurred')
    let elId: HTMLInputElement = 
      document.getElementById('htmlIdSubsetInput') as HTMLInputElement
    elId.classList.add('is-info')
    elId.classList.remove('has-background-info-light')

  } // end subsetBlurred

  subsetChanged(ev){
    // he typed a new name for renaming a group 
    console.log('running subsetChanged')
    let subsetWas = this.subsetIn
    this.subsetIn = ev.target.value
    if (subsetWas == 'NewGroupName1'){
      // insert new group  into subsetIn array
      this.subsetsQncWwg.push(this.subsetIn)
      // billy, bug where you can create bad rules for NewGroupName1?
    }else{ 
      //rename existing subset in the array
      this.subsetsQncWwg[this.subsetsQncWwg.indexOf(subsetWas)] = this.subsetIn
      this.changeRulesForThisGroupToNewGroupName(subsetWas)
      this.changeQuestionsForThisGroupToNewGroupName(subsetWas)
    }
  } // end subsetChanged

  newRuleClick(){ 
    //alert('runnning newRuleClick')
    // alert('running newRuleClick in qncwwg.' + "\r\n"
    // + ' creates a new rule, let him fill it in.'+ "\r\n"
    // + ' enables a SAVE button.'+ "\r\n"
    // + ' this new rule will be for one subset.'+ "\r\n"
    // + ' the subset might be recently created by newSubsetClick.'+ "\r\n"
    // )
    this.newRuleClicked = true
    this.ruleChkBlur()
    this.newRuleButDisabledYn = true //dont let him add another new rule yet.
    this.setNewAccumName()
    this.rulesIn.push(
      { 'cust': '1'
       ,'qid' : '1'
       ,"subset" : this.subsetIn
       ,"accum" :  this.newAccumName
       ,"oper" : ">"
       ,"thresh" : 0
      }
    )
    let rx = this.rulesIn.length-1
    this.rulesArrayThisGroup.push(this.rulesIn[rx])
    rx = this.rulesArrayThisGroup.length-1
    //if (rx>0){this.ruleRowHead='and rule:'} 
    this.setRuleRowForEditWithDelay(rx) // hack to force delay
  }  // end newRuleClick
  
  setNewAccumName(){
    for (let i = 0; i < this.rulesArrayThisGroup.length; i++) { 
      if(this.rulesArrayThisGroup[i].subset == this.subsetIn
      && this.rulesArrayThisGroup[i].accum ==  this.newAccumName) 
      {  
         let cci = parseInt(this.newAccumName.substring(8, 11)) + 1
         let ccs = '0' + cci.toString()
         this.newAccumName = 'newAccum' + ccs }
    }
  } // end setNewAccumName

  ruleClick(r,rx){
    //console.log('running ruleClick')
    this.ruleChkBlur()
    //accum is like a key to the rule rec.
    // get here if he clicked an existing rule,
    // or he is trying to add a new rule.
    //  might be a rules record,
    //  might be a literal 'new'.
    if (typeof(r) == 'object') {
      this.hisChosenRule = r.accum
      //alert('hisChosenRule'+this.hisChosenRule)
    }
    if (typeof(r) == 'string') {
      this.hisChosenRule = 'new'
    }
    //this.heWantsToWorkOnRule = true
    this.setRuleRowForEdit(rx)
  } // end ruleClick

  ruleSaveClick(rx){
    console.log('hey lets save the rule rec from array to db')
    // after successful save (.then) we want to show the checkmark:
    let elId = 'saveCheckMark' + rx
    let el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.remove("is-invisible") }
    this.newRuleButDisabledYn = false
    this.setRuleRowForNoEdit(rx)
    //alert()
  } // end ruleSaveClick

  ruleChkBlur(){
    // get here when ya click something.
    // if he blurred out of a rule,
    // then we already set ruleRowThatWasBlurred.
    // check it here, and set rule for noEdit.
    console.log('ruleChkBlur:', this.ruleRowThatWasBlurred)
    if (this.ruleRowThatWasBlurred > -1) {
      this.setRuleRowForNoEdit(this.ruleRowThatWasBlurred)
    }
    this.ruleRowThatWasBlurred = -1
  } // end ruleChkBlur

  ruleDeleteClick(rx){
    //alert('hey lets delete the rule rec from array & db')

    this.ruleChkBlur()
    let accumThisGroup = this.rulesArrayThisGroup[rx].accum
    this.rulesArrayThisGroup.splice(rx,1) //delete rule from rulesArrayThisGroup
    for (let i = 0; i < this.rulesIn.length; i++) { 
      if(this.rulesIn[i].subset == this.subsetIn
      && this.rulesIn[i].accum == accumThisGroup) 
      { 
        this.rulesIn.splice(i,1) //delete rule from rulesIn
      } //end if

    } // end for
    this.newRuleButDisabledYn = false
    this.ruleCountCheck()
  } // end ruleDeleteClick

  chkDeleteAllRules(yesNo){
    if (yesNo == 'yes') {
      this.deleteAllRules()
      this.setRadioWithDelay('always') //hack wake up
    }else{
      this.setRadioWithDelay('sometimes') //hack wake up
    }
    this.showDeleteRulesButTf = false
    this.ruleChkBlur()
  } // end chkDeleteAllRules

  deleteAllRules(){
    console.log('running deleteAllRules')
    this.rulesArrayThisGroup = []
    // now delete all rules for this subset in rulesIn
    let subsetTempVar = this.subsetIn,
       rulesTempArray = this.rulesIn
         .filter(function(r){
           return r.subset != subsetTempVar
         }) // end .filter
    this.rulesIn = rulesTempArray
  } // end deleteAllRules

  ruleCountCheck(){
    //alert('running ruleCountCheck')
    let c = this.rulesArrayThisGroup.length
    if (c > 0){
    }else{
    }
  } // end ruleCountCheck

  showHideHelp(){
    alert(
    'running showHideHelp in qncwwg.component.ts'+ "\r\n"
+ ' we are working with a specific group'+ "\r\n"
+ ' we want to tie the group to scoreboard(s)'+ "\r\n"
+ ' we want to see the group+scoreboard relationship'+ "\r\n"
+ ' we want to edit the rule (scoreboard-oper-thresh)'+ "\r\n"
+ ' we want him to notice that this controls'+ "\r\n"
+ ' whether this specific group of questions will be asked (rule).'+ "\r\n"
+ ' Capabilities:'+ "\r\n"
+ '  add a new rule. (and give it a name)'+ "\r\n"
+ '    delete a new rule.'+ "\r\n"
+ '    edit a rule. '+ "\r\n"
+ '  save subset info to database.'+ "\r\n"
+ '  save rule info to database.'+ "\r\n"
    )
    this.ruleChkBlur()
  } // end showHideHelp

  initRulesArrayThisGroup(){
    //alert('running initRulesArrayThisGroup')
    if (typeof(this.rulesIn) == 'string'){
      // rulesIn is text like 'NewGroupName1' 
    }else{
      // rulesIn is an array that may contain rules
      // clever way to pass subsetTempVar into .filter  (comma!)
      let subsetTempVar = this.subsetIn,
         rulesTempArray = this.rulesIn
         .filter(function(r){
           return r.subset == subsetTempVar
         }) // end .filter
      //rulesTempArray might have rules now, might be empty or undefined.
      if(typeof rulesTempArray == 'undefined'){
        this.rulesArrayThisGroup = []
        //alert('rules array is undefined')
      }else{
        this.rulesArrayThisGroup = rulesTempArray
      } // end if typeof
    }
  } // end initRulesArrayThisGroup

  changeRulesForThisGroupToNewGroupName(subsetWas){
    console.log('running wwg changeRulesForThisGroupToNewGroupName')
    // get here cuz he renamed a group.
    // look for any rules for the old group name.
    // if found, then rename the subset name to the new name.
    if(this.rulesArrayThisGroup.length > 0){
      //alert('yes, we have rules for that old subset')
      // replace all rulesIn with new name.
      for (let i = 0; i < this.rulesIn.length; i++) { 
        this.rulesIn[i].subset = this.subsetIn
        // console.log(this.rulesIn[i].subset)   
        // console.log(this.rulesIn[i].accum) 
      } // end for
    } // end if ruleArray length

    this.initRulesArrayThisGroup() //re-establish rulesArrayThisGroup

  } // end changeRulesForThisGroupToNewGroupName

  changeQuestionsForThisGroupToNewGroupName(subsetWas){
    console.log('running wwg  changeQuestionsForThisGroupToNewGroupName')
    // get here cuz he renamed a group.
    // look for  questions for the old group name.
    // if found, then rename the subset name to the new name.
    if(this.questionsIn.length > 0){ 
      //alert('yes, we have questions for that old subset')
      // replace all questions with new name.
      for (let i = 0; i < this.questionsIn.length; i++) { 
        if(this.questionsIn[i].subset==subsetWas){
          this.questionsIn[i].subset = this.subsetIn
          console.log('quest subset change to:',this.questionsIn[i].subset)
        }   
      } // end for
    } // end if questionsIn length

    this.initRulesArrayThisGroup() //re-establish rulesArrayThisGroup

  } // end changeQuestionsForThisGroupToNewGroupName

  radioButHit(rHit){
    console.log('running radioButHit ' +rHit)
    this.ruleChkBlur()
    if (rHit == 'noRules') {
      this.newRuleButDisabledYn = true
      this.setRadio('always')
      if(this.rulesArrayThisGroup.length>0){
        this.wordsThatPrefaceRules = 'rules for '
      }else{
        this.wordsThatPrefaceRules = 'no rules (always ask questions for)'
      }
      if (this.rulesArrayThisGroup.length>0){
        this.showDeleteRulesButTf = true
      }
    }
    
    if (rHit == 'yesRules') {
      this.newRuleButDisabledYn = false
      this.showDeleteRulesButTf = false
      this.setRadio('sometimes')

      if(this.rulesArrayThisGroup.length > 0){
        this.wordsThatPrefaceRules = 
          "here are conditional rules that influence asking "
      }else{
        this.wordsThatPrefaceRules = 
        "let's setup conditional rules that influence asking "

      }
    }
  } // end radioButHit

  radioAnyRulesFocused(){
    console.log('running radioAnyRulesFocused')
    this.ruleChkBlur()
  } // end radioAnyRulesFocused

  radioAnyRulesBlurred(){
    //console.log('running radioAnyRulesBlurred')
    this.showDeleteRulesButTf = false
  } // end radioAnyRulesBlurred

  async setRadioWithDelay(sometimesOrAlways)  {
    // hack to wait for a bit before setting radio
    await new Promise(resolve => setTimeout(()=>resolve(), 100))
    .then(()=>this.setRadio(sometimesOrAlways));
  } // end setRadioWithDelay

  setRadio(sometimesOrAlways){
    console.log('running setRadio to' + sometimesOrAlways)
    //let elId1 = 'htmlIdCheckboxNoRules'
    let el1: HTMLInputElement = 
      document.getElementById('htmlIdCheckboxNoRules') as HTMLInputElement
    //let elId2 = 'htmlIdCheckboxYesRules'
    let el2: HTMLInputElement = 
      document.getElementById('htmlIdCheckboxYesRules') as HTMLInputElement

    if(sometimesOrAlways == 'sometimes'){
      this.anyRulesNo = false 
      this.anyRulesYes = true
      el1.checked=false 
      el2.checked=true 
    }else{
      this.anyRulesNo = true 
      this.anyRulesYes = false
      el1.checked=true 
      el2.checked=false 
    }
  } // end setRadio

  async setRuleRowForEditWithDelay(rx) {
    // hack to wait a bit before calling setRuleRowForEdit
    await new Promise(resolve => setTimeout(()=>resolve(), 100))
    .then(()=>this.setRuleRowForEdit(rx))
  } // end setRuleRowForEditWithDelay

  setRuleRowForEdit(rx){
    console.log('running setRuleRowForEdit')
    // make a rule row appear edit-able by removing is-info class.
    let elId = 'accum' + rx
    let el: HTMLInputElement = 
    document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.remove("is-info") }
    elId = 'oper' + rx
    el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.remove("is-info") }
    elId = 'thresh' + rx
    el = document.getElementById(elId)as HTMLInputElement
    if (el) {  el.classList.remove("is-info") }

    elId = 'saveRuleBut' + rx
    el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.disabled = false     }

    elId = 'saveCheckMark' + rx
    el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.add("is-invisible") }

    if (this.newRuleClicked) {
      // when adding a new rule, put the cursor in accum rx
      elId = 'accum' + rx
      el = document.getElementById(elId) as HTMLInputElement
      el.focus()
      this.newRuleClicked = false //reset
    }
    // duznt work:
    this.anyRulesNo = false //tied to radio button
    this.anyRulesYes = true //tied to radio button
    this.showDeleteRulesButTf = false
    //this.radioSet('sometimes')
    // alert('done setRuleRowForEdit ')

  } // end   setRuleRowForEdit 

  ruleBlur(rx){
    console.log('he blurred a rule row  '+ rx)
    //this.setRuleRowForNoEdit(rx)
    this.ruleRowThatWasBlurred = rx
  } // end ruleBlur


   setRuleRowForNoEdit(rx){
    console.log('running setRuleRowForNoEdit')
    // make it look like the rule row is not editable.
    let elId = 'accum' + rx
    let el: HTMLInputElement = 
    document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.add("is-info") }
    elId = 'oper' + rx
    el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.add("is-info") }
    elId = 'thresh' + rx
    el = document.getElementById(elId) as HTMLInputElement
    if (el) {  el.classList.add("is-info") }

    elId = 'saveRuleBut' + rx
    //alert('ready to check elId:'+ elId )
    el = document.getElementById(elId) as HTMLInputElement
    if (el) { 
      //alert('ready to disable el for'+ elId)
      el.disabled = true   
    }  

   } // end setRuleRowForNoEdit

  accumChange(ev,rx){
   //alert('running accumChange on ' +rx)
   let oldAccum = this.rulesArrayThisGroup[rx].accum
   let newAccum = ev.target.value
   this.rulesArrayThisGroup[rx].accum = newAccum
   this.updateRulesIn(oldAccum,newAccum,rx)  
  } // end accumChange

  operChange(ev,rx){
    //alert('running operChange on ' +rx)
    let newOper = ev.target.value
    let oldAccum = this.rulesArrayThisGroup[rx].accum
    let newAccum = this.rulesArrayThisGroup[rx].accum
    this.rulesArrayThisGroup[rx].oper = newOper
    this.updateRulesIn(oldAccum,newAccum,rx)
  } // end operChange

  threshChange(ev,rx){
    //alert('running threshChange on ' +rx)
    let newThresh = ev.target.value
    let oldAccum = this.rulesArrayThisGroup[rx].accum
    let newAccum = this.rulesArrayThisGroup[rx].accum
    this.rulesArrayThisGroup[rx].thresh = newThresh
    this.updateRulesIn(oldAccum,newAccum,rx)
  } // end threshChange

  updateRulesIn(oldAccum,newAccum,rx){
     //alert('running updateRule '+ oldAccum)
     //alert(this.rulesIn[0].accum) // why is this the new value?
     for (let i = 0; i < this.rulesIn.length; i++) { 
      if(this.rulesIn[i].subset == this.subsetIn
      && this.rulesIn[i].accum == oldAccum) 
        { 
          //alert('gonna replace some rulesIn fields')
          //alert('replacing existing accum: ' + this.rulesIn[i].accum)
          this.rulesIn[i].accum = newAccum
          this.rulesIn[i].thresh = this.rulesArrayThisGroup[rx].thresh
          this.rulesIn[i].oper = this.rulesArrayThisGroup[rx].oper
        } //end if
     } // end for
  }  // end updateRulesIn

  doneWwg(){
    console.log('doneWwg')
    this.doneQncWwgOut.emit()
    this.rulesQncWwgOut.emit(this.rulesIn)
  } // end doneWwg

} // end export class
