import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

//import { FormGroup, FormControl } from '@angular/forms';
//import { delay, scan, tap, filter } from 'rxjs/operators';
//import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  secondsPerSolution1 = 0;
  secondsPerSoulution2 = 0;

  mathForm2 = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  mathForm1 = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  constructor() {}

  get a2() {
    return this.mathForm.value.a;
  }
  get b2() {
    return this.mathForm.value.b;
  }

  get a1() {
    return this.mathForm.value.a;
  }
  get b1() {
    return this.mathForm.value.b;
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit() {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(1000),
        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved;

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });

    console.log('TheEnd');

    /* 
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        this.mathForm.setValue({
          a: this.randomNumber1(),
          b: this.randomNumber(),
        });
      });



   
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
      */
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  randomNumber1() {
    return Math.floor(Math.random() * 10);
  }

  randomNumber2() {
    return Math.floor(Math.random() * 10);
  }
}
