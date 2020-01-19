import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rrsp-calculator';
  messageToSendP: any = ['hiii'];

  clickTest(count){
    console.log("yyeess");
    console.log(count);
    this.messageToSendP = count;
    /*this.messageToSendP = [
      { 'p_value': '1', 'contributions': 'Scrfsgfs'},
      { 'p_value': '2', 'contributions': 'Nut Volt'}
    ];*/
  }
}
