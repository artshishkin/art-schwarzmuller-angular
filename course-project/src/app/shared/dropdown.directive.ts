import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  private isOpen = false;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen)
      this.renderer.addClass(this.elRef.nativeElement, "open");
    else
      this.renderer.removeClass(this.elRef.nativeElement, "open");
  }

}
