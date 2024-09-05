import { AlertsService } from '../../services/generic/alerts.service';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { IMembership } from '../../interfaces/home';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipCardComponent } from './membership-card/membership-card.component';
import { HomeSkeletonComponent } from './home-skeleton/home-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MembershipCardComponent, HomeSkeletonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private subscriptions: Subscription[] = [];

  isLoadingMemberships: boolean = false;
  memberships: IMembership[] = [];

  constructor(
    private alertsService: AlertsService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getMemberships();
  }

  getMemberships(): void {
    this.isLoadingMemberships = true;
    let homeDataSubscription = this.homeService?.getMembershipsData()?.pipe(
      tap((res: any) => {
        if (res) {
          this.memberships = res.data;
        } else {
          this.handleError(res?.message);
        }
      }),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingMemberships = false)
    ).subscribe();

    this.subscriptions.push(homeDataSubscription);
  }

  handleError(err: any): any {
    this.alertsService?.openToast('error', err || 'An error occurred');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
