import { Directive, ElementRef, HostListener } from '@angular/core';
import { elementAt } from 'rxjs';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.background = 'red';
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.background = '';
  }  

  constructor(
    private  element : ElementRef) {
    // element.nativeElement.style.background = 'red';
   }


}
