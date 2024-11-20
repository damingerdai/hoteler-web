import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/core/models';
import { Roles } from 'src/app/core/models/roles';
import { SharedCdkModule } from 'src/app/shared/shared.cdk.module';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';

interface UpdateUserDialogData {
  roles: Roles;
  user: IUser;
}

@Component({
    selector: 'app-update-user',
    imports: [
        ReactiveFormsModule,
        SharedMaterialModule,
        SharedCdkModule,
    ],
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  protected form: FormGroup;
  protected roles: Roles;
  protected user: IUser;

  constructor(@Inject(MAT_DIALOG_DATA) private data: UpdateUserDialogData,
    private fb: FormBuilder) {
    this.roles = data.roles ?? [];
    this.user = data.user;
    this.form = this.fb.group({
      username: [this.user.username, [Validators.required]],
      // password: [this.user, [Validators.required]],
      roles: [this.user.roles.map(r => r.name), [Validators.required]],
    });

  }

}
