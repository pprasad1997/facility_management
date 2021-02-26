import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { bookedData } from "./data.model";

@Injectable({providedIn: 'root'})
export class AppService{

  bookedData: bookedData[] = [];
  exists: boolean = false;
  bookedUpdated = new Subject<bookedData[]>();

  addData(facility:string, fromTime: Date, toTime: Date){
    fromTime = new Date(fromTime);
    toTime = new Date(toTime);

    var diff =(toTime.getTime() - fromTime.getTime()) / 1000;
    diff /= 60;

    if(diff <=0){
      alert("Please pick Time correctly");
      return;
    }
    let fromTimeMinutes = fromTime.getMinutes() < 10 ? '0' : '';
    let fromTimeHours = fromTime.getHours() < 10 ? '0' : '';
    let toTimeMinutes = fromTime.getMinutes() < 10 ? '0' : '';
    let toTimeHours = fromTime.getHours() < 10 ? '0' : '';

    let fromTimeNew = fromTime.getDate()+"/"+fromTime.getMonth()+"/"+ fromTime.getFullYear() + " "+ fromTimeHours + fromTime.getHours() + ":" + fromTimeMinutes+fromTime.getMinutes()
    let toTimeNew = toTime.getDate()+"/"+toTime.getMonth()+"/"+ toTime.getFullYear() + " "+ toTimeHours + toTime.getHours() + ":" + toTimeMinutes+toTime.getMinutes()

    for(let i=0;i<this.bookedData.length;i++){
      if(this.bookedData[i].facility === facility &&
        this.bookedData[i].fromTime.getTime() <= fromTime.getTime() &&
        this.bookedData[i].toTime.getTime() > fromTime.getTime()){
        this.exists = true;
        break;
      }
    }
    let cost: number;

    if(facility == 'tennis'){
      cost = Math.abs(Math.round((50/60)*diff));
    } else {
      if(fromTime.getHours() >= 10 && toTime.getHours() <= 16){
        cost = Math.abs(Math.round((100/60)*diff));
      } else {
        cost = Math.abs(Math.round((500/60)*diff));
      }
    }
    let newData;
    if(!this.exists || this.bookedData.length == 0){
      newData = new bookedData (
        facility,
        fromTime,
        toTime,
        cost,
        fromTimeNew,
        toTimeNew,
        true
      );
    } else {
      newData = new bookedData (
        facility,
        fromTime,
        toTime,
        0,
        fromTimeNew,
        toTimeNew,
        false
      );
    }
    this.bookedData.push(newData);
    this.bookedUpdated.next(this.bookedData.slice());
    this.exists = false;
  }

  getData(){
    return this.bookedData.slice();
  }
}
