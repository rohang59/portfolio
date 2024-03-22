import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  // @ViewChild('targetDiv') targetDiv!: ElementRef;
  @ViewChild('targetDiv', { read: ElementRef })
  public targetDiv!: ElementRef<any>;

  @ViewChild('contentSection', { static: true })
  contentSection!: ElementRef;

  isHorizontalScrollEnabled: boolean = false;
  element1InView: boolean = false;
  element2InView: boolean = false;
  element3InView: boolean = false;
  element4InView: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {}
  @HostListener('window:scroll', [])
  @HostListener('document:mousemove', ['$event'])

  onScroll(): void {
    
    this.element1InView = this.checkElementInView('#targetElement1');
    this.element2InView = this.checkElementInView('#targetElement2');
    this.element3InView = this.checkElementInView('#targetElement3');
    this.element4InView = this.checkElementInView('#targetElement4');
  }
  checkElementInView(selector: string): boolean {
    const element = this.elementRef.nativeElement.querySelector(selector);
    if (!element) return false; // Element not found

    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.top <= windowHeight - 86;
  }

  onMouseMove(event: MouseEvent) {
    const cards = this.elementRef.nativeElement.querySelectorAll('.cInfo');
    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  public scrollRight(): void {
    this.targetDiv.nativeElement.scrollTo({ left: (this.targetDiv.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.targetDiv.nativeElement.scrollTo({ left: (this.targetDiv.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }
}
