import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { ApiTestingModule } from 'src/app/core/testings';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { PageHeaderComponent, TagComponent } from 'src/app/shared/components';
import { RouterModule, provideRouter } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { LocalStorageService } from 'src/app/core/services';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ApiTestingModule,
                RouterModule,
                SharedMaterialModule,
                SharedPipesModule,

                PageHeaderComponent,

                TagComponent,
                UserListComponent,
            ],
            providers: [
                provideRouter([]),
                LocalStorageService,
                SettingsService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
