import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from 'src/app/core/models/roles';
import { MatxPassToggleVisibilityModule } from 'src/app/shared/components/matx-pass-toggle-visibility/matx-pass-toggle-visibility.module';

interface CreateUserDialogData {
    roles: Roles;
}

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
    imports: [
        ReactiveFormsModule,
        MatxPassToggleVisibilityModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
    ],
})
export class CreateUserComponent {
    private data = inject<CreateUserDialogData>(MAT_DIALOG_DATA);
    private fb = inject(FormBuilder);

    protected form: FormGroup;
    protected roles: Roles;

    constructor() {
        const data = this.data;

        this.roles = data.roles ?? [];
        this.form = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            roles: [[], [Validators.required]],
        });
    }

    onNoClick(): void {
        // this.dialogRef.close();
    }
}
