import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  showImg = true;

  onLoad(img : string) {
    console.log('log del padre', img);
    
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }
}
