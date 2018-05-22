import { Component, OnInit, Inject,ViewChild,AfterViewInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-message-api',
  templateUrl: './message-api.component.html',
  styles: [`.text{color:white;font-weight:400;text-transform:uppercase;}`]
})
export class MessageApiComponent implements OnInit,AfterViewInit {
  @ViewChild('success') successTpl;
  @ViewChild('failure') failureTpl;
  @ViewChild('info') infoTpl;
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.successTpl,this.failureTpl);
  }
  getMessageTemplate(type:string) {
    let outTpl;
    switch(type.trim().toLowerCase()){
      case 'success': { outTpl=this.successTpl; break; }
      case 'failure': { outTpl=this.failureTpl; break; }
      default : { outTpl=this.infoTpl}
    }
    return outTpl;
  }
  getMessageContext(data) {
    return { outcome: data, $implicit: data };
  }
}