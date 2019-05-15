import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/models/models';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private provider: ProviderService, private router: Router) { }

  @Input()
  public category: ICategory;

  ngOnInit() {
  }

  showProductsOfCategory(category: ICategory){
    this.provider.setCategoryForProducts(category);
  } 
}
