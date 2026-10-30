import { Component, Input } from '@angular/core';

import { ICategory } from '../../models/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: false,
})
export class CategoryComponent {

  @Input({ required: true }) category!: ICategory;
}
