import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddcommentComponent } from './components/addcomment/addcomment.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ExperimentComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/products',
        component: ProductsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signUp',
        component: SignupComponent
      },
      {
        path:'categories/products/comments',
        component: CommentsComponent
      },
      {
        path:'categories/products/comments/addcomment',
        component:AddcommentComponent
      },{
        path:'templates',
        component:MainpageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
