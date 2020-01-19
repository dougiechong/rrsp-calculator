import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

import {EventEmitter, Output } from '@angular/core';
import { max, round } from 'mathjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  formControl = new FormControl('');
  inputs = new FormGroup({
    income: new FormControl(100000),
    contribution: new FormControl(10000),
    gains: new FormControl(4),
    ageStarted: new FormControl(25),
    retirementBracket: new FormControl(''),
    workingTaxBracket: new FormControl(0.5),
    avgRealizedGains: new FormControl(''),
    ageRetirement: new FormControl(''),
    retirementWithdrawal: new FormControl('')
  });

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  onSubmit() {
    //console.log('hi');
    console.log(this.inputs.value);
    var inputs = this.inputs.value;
    var contribution = inputs["contribution"];
    var workingTaxBracket = inputs["workingTaxBracket"];
    var ageStarted = inputs["ageStarted"];
    var rrspBonus = contribution * workingTaxBracket;
    var percent_gains = inputs["gains"];

    //console.log(total_contributions);
    var total_array = [];
    var portfolio_value = 0;
    for(var i=ageStarted; i<=30; i++){
      var curr_contribution = this.calcContribution(i, 30, contribution, rrspBonus);
      var p_value2 = portfolio_value + curr_contribution;
      var gains = this.calcGains(p_value2, percent_gains );
      var p_value3 = round(p_value2 + gains, 2);
      var curr_hash = {
        age: i,
        p_value: portfolio_value,
        contributions: curr_contribution,
        p_value2: p_value2,
        gains: gains,
        p_value3: p_value3
      };
      portfolio_value = p_value3;
      total_array.push(curr_hash);
    };

    //console.log(total_contributions_array);
    this.valueChange.emit(total_array);
  }

  calcContribution(age, retirement_age, contribution, bonus_contribution){
    if (age < retirement_age) {
      return(contribution + bonus_contribution);
    } else {
      return(0);
    }
  }

  calcGains(curr_value, percent_gains){
    return(max(0, round(curr_value*percent_gains/100, 2)));
  }
}



