import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-avonale-cards',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() name?: string;
  @Input() img?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() created_at?: any;
  @Input() avatar_url?: string;
  @Input() stars: number = 0;
  @Input() private?: boolean;
  @Input() owner?: any;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() repoUrl?: string;
  @Output() userClicked = new EventEmitter<any>();

  openRepoUrl() {
    if (this.repoUrl) {
      window.open(this.repoUrl, '_blank');
    }
  }

  openUserModal() {
    if (this.owner) {
      this.userClicked.emit(this.owner);
    }
  }

  get starRatings(): number[] {
    if (!this.stars || this.stars <= 0) {
      return [0, 0, 0, 0, 0];
    }

    const maxGitHubStars = 10000;
    const filledStars = Math.round(
      (Math.min(this.stars, maxGitHubStars) / maxGitHubStars) * 5
    );
    const emptyStars = 5 - filledStars;

    return [...Array(filledStars).fill(1), ...Array(emptyStars).fill(0)];
  }
}
