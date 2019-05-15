import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { ICommandName } from 'selenium-webdriver';
import { IComment, IProduct } from 'src/app/models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private provider: ProviderService,private router: Router) { }

  username: string;
  password: string;
  public logged=false;
  public search_list='';
  public search='';
  public comments:IComment[]=[];
  public curList:IProduct;
  public products:IProduct[]=[];



  ngOnInit() {
    const token=localStorage.getItem('token');
    if(token){
      this.logged=true;
    }

  }

  filter(){
    this.provider.getTasksByName(this.provider.curList,this.search).then(res=>{
      this.comments=res;
      console.log(this.comments);
    });
  }

  logout() {
    this.provider.logout().then(res => {
      localStorage.removeItem('token');
      this.provider.logged = false;
      this.router.navigateByUrl('').then();
    });
  }

}
