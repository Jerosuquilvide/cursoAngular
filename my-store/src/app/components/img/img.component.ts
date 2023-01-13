import { Component, OnInit , Input, Output, EventEmitter , OnChanges, AfterViewInit, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img  =>' ,this.img);
    // code
  }


  @Output() loaded = new EventEmitter<string>();

  // sec = 0;
  // min = 0;
  // counterFn : number | undefined;
  imgDefault : string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg';
  constructor() {
    //before render
    //NoAsync -- once time
    console.log('Constructor / Img value =>' , this.img);
    
   }

  ngOnChanges(changes: SimpleChanges){
    //Before & during render
   // Any times, objetive => update inputs 
   console.log('ngOnChanges / Img value =>' , this.img);
   console.log('changes', changes);
   //code
  }

  ngOnInit(): void {
    //before render
    //YES Async - fetch
    //Run one time
    console.log('ngOnInit / Img value =>' , this.img);
  //  this.counterFn = window.setInterval(()=>{
  //     this.sec += 1;
  //     console.log(this.sec);
  //     if(this.sec === 60){
  //       this.sec = 0;
  //       this.min += 1;
  //     }
  //   }, 1000)
  }

  ngAfterViewInit(): void {
    //After render
    //handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Delete
     console.log('ngOnDestroy');
    //  window.clearInterval(this.counterFn);
  }
  imgError(){
    this.img = this.imgDefault;
  }

  imgLoad(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
