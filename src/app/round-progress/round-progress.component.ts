import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-progress',
  templateUrl: './round-progress.component.html',
  styleUrls: ['./round-progress.component.less']
})
export class RoundProgressComponent implements OnInit {

  current = 75;
  max = 100;

  constructor() { }

  ngOnInit() {
  }

}
