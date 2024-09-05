import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Links } from '../../../interfaces/public';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, TranslateModule, CommonModule, LanguageSelectorComponent, UserInfoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  page: string = '';

  collapse: boolean = false;
  displayMenu: boolean = false;
  isVisitMegaMenuVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  navAllLinks: Links[] = [];
  @HostListener("window:scroll", ["$event"])
  handleScroll(event: Event) {
    this.handleKeyDown();
  }
  ngAfterViewInit() {
    this.handleKeyDown();
  }
  handleKeyDown() {
    if (isPlatformBrowser(this.platformId)) {
      let element: any = document.querySelector(".navbar") as HTMLElement;
      if (element) {
        if (window.pageYOffset > 30) {
          element ? element.classList.add("headerScroll") : '';
        } else {
          element ? element.classList.remove("headerScroll") : '';
        }
      } else {
        console.error("Element with class 'navbar' not found");
      }
    }
  }

  onHoverMegaMenu(): void {
    this.isVisitMegaMenuVisible = true;
  }
  onLeaveMegaMenu(): void {
    this.isVisitMegaMenuVisible = false;
  }
  stopClickPropagation(event: Event): void {
    event.stopPropagation();
  }

  openPlace(): void {
    this.collapse = false;
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.page = 'home';
    this.navAllLinks = [
      { title: 'home', name: 'nav.home', route: '/Home' },
      { title: 'about', name: 'nav.about', route: '/about' },
      { title: 'blogs', name: 'nav.blogs', route: '/blogs' },
      { title: 'contact', name: 'nav.contact', route: '/contact' },
    ];
  }

  ngOnInit(): void {
  }


  login(): void {
  }
}
