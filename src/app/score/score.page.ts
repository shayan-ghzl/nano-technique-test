import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSegment } from '../shared/components/segment/segment.component';
import { IonContent } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  @ViewChild(IonContent) content!: IonContent;

  scoreForm = new FormGroup({
    pImage : new FormControl({value: [], disabled: false}, { validators: [Validators.required] }),
    servicerPointOfService : new FormControl({disabled: false}, { validators: [Validators.required] }),
    servicerPointOfClientLearning : new FormControl({disabled: false}, { validators: [Validators.required] }),
    servicerPointOfClientSatisfy : new FormControl({disabled: false}, { validators: [Validators.required] }),
  });

  showSpinner = false;
  avoidRepetition = false;
  segmentValue = '1';

  segment: AppSegment[] = [
    {
      label: 'شرح پروژه',
      value: '1'
    },
    {
      label: 'امتیازها',
      value: '2'
    },
    {
      label: 'تصاویر',
      value: '3'
    },
  ];

  constructor() { }

  ngOnInit() {

  }

  segmentChanged() {
    this.content.scrollToTop(500);
  }

  submit(){
    if (this.scoreForm.invalid) {
      return;
    }
    console.log(this.scoreForm.value);
  }

}
