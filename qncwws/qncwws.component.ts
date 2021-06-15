import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core' 
import api from 'src/utils/api'

@Component({
  selector: 'app-qncwws',
  templateUrl: './qncwws.component.html'
})
export class QncwwsComponent implements OnInit {
  //componentTitle = 'login or logout wws'
  msg1 = '?'
  constructor() {}
  @Input() authIn 
  @Input() firstLoginIn 
  @Output() proJumpOut = new EventEmitter()
  @Output() qncSetAuthOnOut = new EventEmitter()
  showSignHtml = true
  showProfileHtml = false
  passEnc = ''
  passDec = ''
  passInput = ''
  passInput2 = ''
  firstNameInput = ''
  lastNameInput = ''
  ngOnInit(){
    console.log('running wws ngOnInit =====')
    console.log('are you starting up or logging off?')
    console.log('firstLoginIn: ',this.firstLoginIn)
    window.scrollTo(0, 0)
    if (this.firstLoginIn == true) {
      this.msg1 = 'Welcome to Qnc.' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + ' Please Login.'
    }
    if (this.firstLoginIn == false) {
      this.msg1 = 'You are now logged out.'
    }
  }

  custChg(ev){
    // he entered cust id on the login screen
    console.log('running custChg')
  }


  // firstNameChg(ev){
  //   console.log('running firstNameChg')
  //   this.firstNameInput = ev.target.value[0].toUpperCase() + ev.target.value.substring(1)
  // }
  // lastNameChg(ev){
  //   console.log('running lastNameChg')
  //   this.lastNameInput = ev.target.value[0].toUpperCase() + ev.target.value.substring(1)
  // }
  // phoneChg(){
  //   console.log('running phoneChg')
  // }
  // passChg2(ev){
  //   // use this func for user changing his password.
  //   console.log('running passChg2')
  //   this.passInput2 = ev.target.value
  //   // console.log(this.passInput2)
  // }

  passChg(ev){
    // he entered pass on the login screen
    console.log('running passChg')
    this.passInput = ev.target.value
    console.log('he entered pass:',this.passInput)
  }

  doSign(){
    console.log('running wws doSign')
    this.msg1 = 'attempting login ...'
    this.enc()
    this.dec()
    // billy cheat and force success. 
    // later, hit the db with his info
    this.authIn = true
    this.showSignHtml = false
    this.showProfileHtml = true
    //this.componentTitle = 'wws login/logout'
    this.msg1 = 'fake login complete. '
    // tell app component we are now authorized.
    // app component will then do auth stuff.
    this.qncSetAuthOnOut.emit()
    this.proJumpOut.emit()

  }

  //jumpToQnc(){this.qncJumpOut.emit()}
  showHideHelp(){alert('help for login')}

  enc(){
    console.log('running enc')
    let myChar = 's'
    // billy, maybe put this string into fauna, as the decoder key:
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]}\|;:,<.>/?'
    let j = 0
    let k = ''
    let n = ''
    for (let i = 0; i < this.passInput.length; i++) {
      j = i + 1
      myChar =  this.passInput.substring(i, j);
      //k = a.indexOf(myChar)
      k = a.indexOf(myChar).toString().padStart(2, '0')
      n = n + k 
    } // end for
    this.passEnc = n
    console.log('passEnc:',this.passEnc)
  } // end enc

  dec(){
    console.log('running dec')
    let positionNbr = 0
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]}\|;:,<.>/?'
    let k = ''
    let n = ''
    for (let i = 0; i < this.passEnc.length; i+=2) {
      positionNbr  =  parseInt(this.passEnc.slice(i, i+2))
      k = a.slice(positionNbr,positionNbr+1)
      n = n + k
    } // end for
    this.passDec = n
    console.log('passDec:',this.passDec)

  } // end dec

  passMod(){
    if (this.passInput != this.passInput2) {
      this.msg1 = 'password must match confirm password.'
    }
  }

// doWukka(){
//   this.msg1 = 'tell mama to draw the menu'
//   this.qncSetAuthOnOut.emit()
//   this.jumpToQnc()
// }

} // end export QncwwsComponent
