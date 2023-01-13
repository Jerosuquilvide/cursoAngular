import { Component, OnInit , Input, Output, EventEmitter , OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input()  img : string = '';

  @Output() loaded = new EventEmitter<string>();



  imgDefault : string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg';
  constructor() {
    //before render
    //NoAsync -- once time
    console.log('Constructor / Img value =>' , this.img);
    
   }

  ngOnChanges(){
    //Before & during render
   // Any times, objetive => update inputs 
   console.log('ngOnChanges / Img value =>' , this.img);
  }

  ngOnInit(): void {
    //before render
    //YES Async - fetch
    //Run one time
    console.log('ngOnInit / Img value =>' , this.img);
  }

  ngAfterViewInit(): void {
    //After render
    //handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Delete
     console.log('ngOnDestroy');
  }
  imgError(){
    this.img = this.imgDefault;
  }

  imgLoad(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
