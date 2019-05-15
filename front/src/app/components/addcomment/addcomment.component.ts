import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';
import { IComment, IProduct } from 'src/app/models/models';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {

  constructor(private provider: ProviderService, private router: Router) { }

  public commentList: IComment[]=[];
  public currentProduct: IProduct;
  public content:any='';
  public name:any='';
  public rating:any='';
  public product:any;


  hide = () => {
    this.router.navigateByUrl('');
   }

  ngOnInit() {
  }


   addComment(){
     this.provider.createComment(this.provider.curList.id, this.content, this.rating, this.name).then(res=>{
       console.log(this.product)
       this.content='';
       this.rating='';
       this.name='';
       this.commentList.push(res);
       alert(res.name + ", thank you for adding a comment!")
       this.router.navigateByUrl('');
     })
   }

}
