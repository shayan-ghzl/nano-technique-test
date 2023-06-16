import { Component, OnInit } from '@angular/core';
import { AppSegment } from '../shared/components/segment/segment.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

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
}
