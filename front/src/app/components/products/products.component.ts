import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategory, IProduct } from '../../models/models';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false,
})
export class ProductsComponent implements OnInit {

  category: ICategory | null = null;
  products: IProduct[] = [];
  error = '';

  constructor(private route: ActivatedRoute, private provider: ProviderService) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      [this.category, this.products] = await Promise.all([
        this.provider.getCategory(id),
        this.provider.getProducts(id),
      ]);
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    }
  }
}
