import { Component, Input } from '@angular/core';
import { IMembership } from '../../../interfaces/home';

@Component({
  selector: 'app-membership-card',
  standalone: true,
  imports: [],
  templateUrl: './membership-card.component.html',
  styleUrl: './membership-card.component.scss'
})
export class MembershipCardComponent {
  @Input() item!: IMembership
}
