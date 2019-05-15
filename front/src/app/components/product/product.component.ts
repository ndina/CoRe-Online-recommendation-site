import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { IProduct, ICategory, IComment } from 'src/app/models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private provider: ProviderService, private router: Router) { }

  public categories:ICategory[]=[];
  public meals:IProduct[]=[];
  public current:ICategory;
  public showCat=true;
  @Input()
  public product: IProduct;

  ngOnInit() {

  }

  showCommentsOfProduct(product: IProduct){
    this.provider.setProductForComments(product);
    console.log(product);
  }

  // showProductsOfCategory(){
  //   this.provider.setCategoryForProducts(this.category);
  //   this.router.navigateByUrl('products');
  // }
}
