import { Component, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/core/models/roles';
import { MatxPassToggleVisibilityModule } from 'src/app/shared/components/matx-pass-toggle-visibility/matx-pass-toggle-visibility.module';
import { SharedCdkModule } from 'src/app/shared/shared.cdk.module';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';

interface CreateUserDialogData {
    roles: Roles;
}

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatxPassToggleVisibilityModule,
        SharedMaterialModule,
        SharedCdkModule,
    ],
})
export class CreateUserComponent {
    protected form: FormGroup;
    protected roles: Roles;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: CreateUserDialogData,
        private fb: FormBuilder
    ) {
        this.roles = data.roles ?? [];
        console.log(this.roles);
        this.form = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            roles: [[], [Validators.required]],
        });
    }

    confirm(): void {
        // console.log(this.form.value);
        // this.dialogRef.close();
    }

    onNoClick(): void {
        // this.dialogRef.close();
    }
}
