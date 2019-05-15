import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ICategory } from 'src/app/models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private provider: ProviderService) { }
  public categories: ICategory[] = [];

  ngOnInit() {
    this.provider.getCategories().then( res => {
      this.categories = res;
    });
  }

}
