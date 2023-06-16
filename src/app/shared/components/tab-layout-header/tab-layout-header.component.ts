import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-layout-header',
  templateUrl: './tab-layout-header.component.html',
  styleUrls: ['./tab-layout-header.component.scss'],
})
export class TabLayoutHeaderComponent  implements OnInit {

  @Input() name = '';

  constructor() { }

  ngOnInit() {}

}
