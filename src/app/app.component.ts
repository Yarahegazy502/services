import { NavbarMobileComponent } from './shared/components/navbar-mobile/navbar-mobile.component';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { CommonModule, DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { keys } from './shared/configs/localstorage-key';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterOutlet,
    ToastModule,

    NavbarMobileComponent,
    ScrollTopComponent,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  shouldRender: boolean = false;
  isServer: boolean = true;
  languages = ['en', 'ar'];;
  browserLang: any;
  currentTheme: any;
  favIcon: HTMLLinkElement | any;
  platform: any;
  currentLanguage: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isServer = false;
      });
    }
    this.setupRouterEvents();
    this.setupTranslations();
  }

  private setupRouterEvents(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.extractDataFromRoute(this.activatedRoute))
    ).subscribe((data: any) => {
      if (data) {
        // subscribe data
      }
    });
  }
  private extractDataFromRoute(route: ActivatedRoute): any {
    let child = route?.firstChild;
    while (child) {
      if (child?.firstChild) {
        child = child.firstChild;
      } else if (child?.snapshot?.data) {
        return child.snapshot.data;
      } else {
        return null;
      }
    }
    return null;
  }
  private setupTranslations(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.platform = 'Browser';
      this.translateService.addLangs(this.languages);
      this.setupLanguage();
      this.translateService.stream('primeng').subscribe((data: any) => {
        this.primengConfig?.setTranslation(data);
      });
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'Server';
    } else {
      this.platform = 'Unknown';
    }
  }
  private setupLanguage(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    if (this.currentLanguage !== null && this.currentLanguage !== undefined && this.currentLanguage !== '') {
      this.translateService.use(this.currentLanguage);
      const direction = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
      this.setLanguage(direction);
    } else {
      this.handleDefaultLanguage();
    }
  }
  private handleDefaultLanguage(): void {
    this.browserLang = this.translateService.getBrowserLang();
    if (isPlatformBrowser(this.platformId)) {
      this.platform = 'Browser';
      localStorage.setItem(keys.language, this.browserLang);
      this.translateService.use(this.browserLang);
      this.translateService.setDefaultLang(this.browserLang);
      window.location.reload();
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'Server';
    } else {
      this.platform = 'Unknown';
    }
  }
  setLanguage(direction: string): void {
    this.renderer.setAttribute(this.document.documentElement, 'dir', direction);
    this.renderer.setAttribute(this.document.documentElement, 'lang', this.currentLanguage);
    this.renderer.setAttribute(this.document.documentElement, 'class', this.currentLanguage);
  }

  ngDoCheck(): void {
    this.renderCheck();
  }
  renderCheck(): void {
    if (
      this.router.url.includes('Error')
    ) {
      this.shouldRender = false;
    } else {
      this.shouldRender = true;
    }
  }
}
