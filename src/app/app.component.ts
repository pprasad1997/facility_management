import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from "./app.service";
import { bookedData } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'facility-management';
  today = new Date();
  bookedData: bookedData[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(){
    // this.bookedData = this.appService.getData();
    this.appService.bookedUpdated.subscribe(data => {
      this.bookedData = data;
    });
  }

  onBooking(form: NgForm){
    console.log(form);
    this.appService.addData(form.value.facility, form.value.fromTime, form.value.toTime);

  }
}
