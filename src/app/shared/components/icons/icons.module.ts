import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubComponent } from './github/github.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GithubComponent,
  ],
  exports: [
    GithubComponent
  ]
})
export class IconsModule { }
