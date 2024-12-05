import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoleDisplayPipe } from '../core/pipes';

@NgModule({
    imports: [CommonModule, UserRoleDisplayPipe],
    exports: [UserRoleDisplayPipe],
})
export class SharedPipesModule {}
