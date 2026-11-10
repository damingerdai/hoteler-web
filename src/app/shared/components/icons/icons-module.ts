import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Github } from './github/github';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Github,
  ],
  exports: [
    Github
  ]
})
export class IconsModule { }
