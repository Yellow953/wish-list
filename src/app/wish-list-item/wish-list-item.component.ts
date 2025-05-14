import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from './../../shared/services/EventService';
import { WishItem } from '../../shared/models/wishItem';
import { WishService } from '../../shared/services/wish.service';

@Component({
  selector: 'wish-list-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css',
})
export class WishListItemComponent implements OnInit {
  @Input() wish!: WishItem;

  constructor(private events: EventService, private wishService: WishService) {}

  ngOnInit(): void {}

  get cssClasses() {
    return { 'strikeout text-muted': this.wish.isComplete };
  }

  toggleFulfilled() {
    this.wishService.updateWish(this.wish).subscribe({
      next: () => {
        this.wish.isComplete = !this.wish.isComplete;
      },
      error: () => {},
    });
  }

  remove(wish: WishItem) {
    if (!wish.id) return;

    this.wishService.deleteWish(wish.id).subscribe({
      next: () => {
        this.events.emit('removeWish', wish);
      },
      error: (err) => {
        console.error('Failed to delete wish', err);
      },
    });
  }
}
