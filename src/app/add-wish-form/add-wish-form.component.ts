import { Component, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishService } from '../../shared/services/wish.service';

@Component({
  selector: 'add-wish-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-wish-form.component.html',
  styleUrl: './add-wish-form.component.css',
})
export class AddWishFormComponent {
  newWishText = '';

  @Output() addWish = new EventEmitter<WishItem>();

  constructor(private wishService: WishService) {}

  submitWish() {
    const text = this.newWishText.trim();
    if (!text) return;

    this.wishService.createWish({ wishText: text }).subscribe({
      next: (newWish) => {
        this.addWish.emit(newWish);
        this.newWishText = '';
      },
      error: (err) => {
        console.error('Error adding wish', err);
      },
    });
  }
}
