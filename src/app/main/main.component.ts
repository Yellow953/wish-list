import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishItem } from '../../shared/models/wishItem';
import { WishListComponent } from '../wish-list/wish-list.component';
import { AddWishFormComponent } from '../add-wish-form/add-wish-form.component';
import { WishFilterComponent } from '../wish-filter/wish-filter.component';
import { EventService } from '../../shared/services/EventService';
import { WishService } from '../../shared/services/wish.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main',
  imports: [WishListComponent, AddWishFormComponent, WishFilterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  items!: WishItem[];

  constructor(
    events: EventService,
    private wishService: WishService,
    private auth: AuthService,
    private router: Router
  ) {
    events.listen('removeWish', (wish: any) => {
      let index = this.items.indexOf(wish);
      this.items.splice(index, 1);
    });
  }

  ngOnInit(): void {
    this.wishService.getWishes().subscribe((data: any) => {
      this.items = data;
    });
  }

  filter: any;

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.auth.clearUser();
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.auth.clearUser();
        this.router.navigate(['/login']);
      },
    });
  }
}
