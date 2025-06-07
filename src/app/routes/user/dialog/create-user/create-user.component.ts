import { Component, inject } from '@angular/core';
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
    imports: [
        ReactiveFormsModule,
        MatxPassToggleVisibilityModule,
        SharedMaterialModule,
        SharedCdkModule,
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
