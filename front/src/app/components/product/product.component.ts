import { Component, Input } from '@angular/core';

import { IProduct } from '../../models/models';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: false,
})
export class ProductComponent {

  @Input({ required: true }) product!: IProduct;

  constructor(private provider: ProviderService) {}

  remember(): void {
    this.provider.lastProduct = this.product;
  }
}
