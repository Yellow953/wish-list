import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../shared/models/wishItem';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete,
];

@Component({
  selector: 'wish-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.css',
})
export class WishFilterComponent implements OnInit {
  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.updateFilter(filters['0']);
  }

  listFilter: any = '0';

  updateFilter(value: any) {
    this.filter = filters[value];
    this.filterChange.emit(this.filter);
  }
}
