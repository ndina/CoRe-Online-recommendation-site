import { Component, OnInit } from '@angular/core';

import { ICategory } from '../../models/models';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: false,
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[] = [];
  error = '';

  constructor(private provider: ProviderService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.provider.getCategories();
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    }
  }
}
