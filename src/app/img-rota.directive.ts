import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgRota]'
})
export class ImgRotaDirective {
  constructor(private elemntRef:ElementRef) { }
  @HostListener('error')
  cargarImagenRota(){
    let img=this.elemntRef.nativeElement
    img.src="assets/images/default.png"
  }
}
