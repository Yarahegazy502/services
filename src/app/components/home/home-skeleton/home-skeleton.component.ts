import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home-skeleton',
  standalone: true,
  imports: [SkeletonModule, CommonModule],
  templateUrl: './home-skeleton.component.html',
  styleUrl: './home-skeleton.component.scss'
})
export class HomeSkeletonComponent {
  @Input() type: any;

}
