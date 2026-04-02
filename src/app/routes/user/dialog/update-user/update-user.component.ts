import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IUser } from 'src/app/core/models';
import { Roles } from 'src/app/core/models/roles';

interface UpdateUserDialogData {
    roles: Roles;
    user: IUser;
}

@Component({
    selector: 'app-update-user',
   imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
    private data = inject<UpdateUserDialogData>(MAT_DIALOG_DATA);
    private fb = inject(FormBuilder);

    protected form: FormGroup;
    protected roles: Roles;
    protected user: IUser;

    constructor() {
        const data = this.data;

        this.roles = data.roles ?? [];
        this.user = data.user;
        this.form = this.fb.group({
            username: [{ value: this.user.username, disabled: true }, [Validators.required]],
            // password: [this.user, [Validators.required]],
            roles: [this.user.roles.map((r) => r.name), [Validators.required]],
        });
    }
}
