import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/models';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public listOfProducts: IProduct[]=[];


  constructor(private provider: ProviderService, router: Router) { }

  ngOnInit() {
  }

  // addProduct(){
  //   if(this)
  // }

}
