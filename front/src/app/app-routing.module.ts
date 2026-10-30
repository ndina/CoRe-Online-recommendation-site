import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddcommentComponent } from './components/addcomment/addcomment.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// Ids live in the URL, so every page also works after a browser refresh.
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: ExperimentComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/:id/products', component: ProductsComponent },
      { path: 'products/:id/comments', component: CommentsComponent },
      { path: 'products/:id/comments/new', component: AddcommentComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignupComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
