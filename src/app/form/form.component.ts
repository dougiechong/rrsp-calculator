import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formControl = new FormControl('');
  bioSection = new FormGroup({
    income: new FormControl(100000),
    contribution: new FormControl(10000),
    gains: new FormControl(4),
    ageStarted: new FormControl(''),
    retirementBracket: new FormControl(''),
    workingTaxBracket: new FormControl(''),
    avgRealizedGains: new FormControl(''),
    ageRetirement: new FormControl(''),
    retirementWithdrawal: new FormControl(''),
    rrspBonus: new FormControl('')
  });
}


