import {Component, OnInit, Input, Output} from '@angular/core'
import {EventEmitter} from '@angular/core'

@Component({
  selector: 'app-qncmen',
  templateUrl: './qncmen.component.html'
})
export class QncmenComponent implements OnInit {
  constructor() { }
  @Input()  authIn
  @Input()  showMenButsIn
  @Input()  compTitleIn
  @Output() wwgJumpOut = new EventEmitter()
  @Output() wwqJumpOut = new EventEmitter()
  @Output() wwrJumpOut = new EventEmitter()
  @Output() wwiJumpOut = new EventEmitter()
  @Output() wwqdJumpOut = new EventEmitter()
  @Output() wwuJumpOut  = new EventEmitter()
  @Output() wwsJumpOut  = new EventEmitter()
  @Output() proJumpOut  = new EventEmitter()
  //profileMenButTxt = 'login' //always profile
  // 
  // need new Log Out button
  //  set authIn to false
  //  somehow set wws showSignHtml on (hint: In)
  //  show wws


  //menuOptionTitle = 'Qnc men'  
  msg1 = ''
  showMsg1 = false
  //showMenButs = false
  ngOnInit() {
    console.log('running men ngOnInit===')
    //console.log('authIn:',this.authIn)
    // if (this.authIn){
    //   this.showMenButs = true
    // }
  }  // end ngOnInit

  jumpToWwg(){
    this.setMenuHighlight('groups')
    this.wwgJumpOut.emit()
  }
  jumpToWwq(){
    this.setMenuHighlight('questions')
    this.wwqJumpOut.emit()
  } 
  jumpToWwr(){ 
    this.setMenuHighlight('rules')
    this.wwrJumpOut.emit()
  } 
  jumpToWwi(){     
    this.setMenuHighlight('invitations')
    this.wwiJumpOut.emit()
  } 
  jumpToWwu(){
    if(this.authIn){
      this.showMsg1 = false
      this.setMenuHighlight('users')
      this.wwuJumpOut.emit()
    } else {
      this.showMsg1 = true
      this.msg1 = 'login first, pal. hey?'
    }
  } 
  jumpToWws(){ 
    this.setMenuHighlight('logout')
    this.wwsJumpOut.emit()
  } 
  jumpToPro(){ 
    this.setMenuHighlight('profile')
    this.proJumpOut.emit()
  } 

  showHideHelp(){alert('show help for '+ this.compTitleIn)}

  // setMenuOptionsOff(){
  //   let el = document.getElementById('profile')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light')  
  //   el = document.getElementById('questions')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light') 
  //   el = document.getElementById('groups')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light') 
  //   el = document.getElementById('rules')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light') 
  //   el = document.getElementById('invitations')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light') 
  //   el = document.getElementById('users')
  //   el.classList.add("has-background-grey")  
  //   el.classList.add('has-text-grey-light') 
  // } // end setMenuOptionsOff
  // setMenuOptionsOn(){
  //   let el = document.getElementById('profile')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light')  
  //   el = document.getElementById('questions')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light') 
  //   el = document.getElementById('groups')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light') 
  //   el = document.getElementById('rules')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light') 
  //   el = document.getElementById('invitations')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light') 
  //   el = document.getElementById('users')
  //   el.classList.remove("has-background-grey")  
  //   el.classList.remove('has-text-grey-light') 
    
  // } // end setMenuOptionsOn


  setMenuHighlight(mel){
    console.log('running setMenuHighlight')
    // first make all menu options not-selected
    let el = document.getElementById('profile')
    el.classList.remove("has-background-primary")  
    el = document.getElementById('questions')
    el.classList.remove("has-background-primary") 
    el = document.getElementById('groups')
    el.classList.remove("has-background-primary")
    el = document.getElementById('invitations')
    el.classList.remove("has-background-primary") 
    el = document.getElementById('users')
    el.classList.remove("has-background-primary") 
    el = document.getElementById('groups')
    el.classList.remove("has-background-primary") 
    el = document.getElementById('rules')
    el.classList.remove("has-background-primary") 
    el = document.getElementById('logout')
    el.classList.remove("has-background-primary") 

    // now highlight the selected menu option
    el = document.getElementById(mel)  
    el.classList.add("has-background-primary")
  } // end setMenuHighlight

} // end export
