import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  @Input()  img : string = '';

  @Output() loaded = new EventEmitter<string>();

  imgDefault : string = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg';
  constructor() { }

  ngOnInit(): void {
  }
  imgError(){
    this.img = this.imgDefault;
  }

  imgLoad(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
