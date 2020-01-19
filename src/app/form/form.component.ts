import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

import {EventEmitter, Output } from '@angular/core';
import {min, max, round } from 'mathjs';
import { IfStmt, ReturnStatement } from '@angular/compiler';
import { ElementFinder } from 'protractor';

const rifMinimums = [0.0333,0.0345,0.0357,0.037,0.0385,
  0.04,0.0417,0.0435,0.0455,0.0476,0.05,0.0528,0.054,0.0553,0.0567,
  0.0582,0.0598,0.0617,0.0636,0.0658,0.0682,0.0708,0.0738,0.0771,0.0808,
  0.0851,0.0899,0.0955,0.1021,0.1099,0.1192,0.1306,0.1449,0.1634,0.1879];

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
    retirementTaxBracket: new FormControl(0.3),
    workingTaxBracket: new FormControl(0.5),
    avgRealizedGains: new FormControl(''),
    ageRetirement: new FormControl(30),
    retirementWithdrawal: new FormControl(40000)
  });


  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    //console.log('hi');
    console.log(this.inputs.value);
    var inputs = this.inputs.value;
    var contribution = inputs["contribution"];
    var workingTaxBracket = inputs["workingTaxBracket"];
    var retirementTaxBracket = inputs["retirementTaxBracket"];
    var ageStarted = inputs["ageStarted"];
    var ageRetirement = inputs["ageRetirement"];
    var rrspBonus = contribution * workingTaxBracket;
    var percentGains = inputs["gains"];
    var retirementWithdrawal = inputs["retirementWithdrawal"];

    //console.log(total_contributions);
    var totalArray = [];
    var portfolioValue = 0;
    for(var i=ageStarted; i<=ageRetirement; i++){
      var currContribution = this.calcContribution(i, ageRetirement, contribution, rrspBonus);
      var pValue2 = portfolioValue + currContribution;
      var gains = this.calcGains(pValue2, percentGains );
      var pValue3 = round(pValue2 + gains, 2);
      var riffMin = this.calcRiffMin(i, portfolioValue);
      var currWithdrawalAmt = this.calcWithdrawal(ageRetirement, i, pValue3, retirementWithdrawal, riffMin);
      var pValue4 = pValue3 - currWithdrawalAmt;
      var tax = this.calcTax(i, ageRetirement, retirementTaxBracket, workingTaxBracket, currWithdrawalAmt);
      var pValue5 = pValue4 - tax;

      var currHash = {
        age: i,
        pValue: portfolioValue,
        contributions: currContribution,
        pValue2: pValue2,
        gains: gains,
        pValue3: pValue3,
        riffMin: riffMin,
        withdrawal: currWithdrawalAmt,
        pValue4: pValue4,
        tax: tax,
        pValue5: pValue5
      };
      portfolioValue = pValue5;
      totalArray.push(currHash);
    };

    //console.log(total_contributions_array);
    this.valueChange.emit(totalArray);
  }

  calcContribution(age, retirementAge, contribution, bonusContributions){
    if (age < retirementAge) {
      return(contribution + bonusContributions);
    } else {
      return(0);
    }
  }

  calcGains(currValue, percentGains){
    return(max(0, round(currValue*percentGains/100, 2)));
  }

  calcRiffMin(age: number, amt: number){
    if (age<60) {
      var rifMinPct = 1/(90-age);
    } else if (age>=95) {
      var rifMinPct =0.2
    } else {
      var rifMinPct = rifMinimums[age-60]
    }
    return(round(rifMinPct * amt, 2));
  }

  calcWithdrawal(retirementAge: number, age, currPValue, retirementWithdrawal, riffMin){
    //=MAX(0, IF(A13<$B$8, 0, MIN(E13, MAX($B$9, F13)) ))
    if (age < retirementAge) {
      return(0);
    } else {
      var withdrawalAmt = max(retirementWithdrawal, riffMin);
      return(min(withdrawalAmt, currPValue))
    }
  }

  calcTax(age, retirementAge, retirementTaxRate, workingTaxRate, amt){
    // TODO: make this calculate actual taxes based on income
    if(age >= retirementAge){
      var tax = retirementTaxRate * amt;
    } else{
      var tax = workingTaxRate * amt;
    }

    return(round(tax, 2));
  }
}



