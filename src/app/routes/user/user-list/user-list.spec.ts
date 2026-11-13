import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserList } from './user-list';
import { ApiTestingModule } from 'src/app/core/testings';
import { SharedMaterialModule } from 'src/app/shared/shared-material-module';
import { SharedPipesModule } from 'src/app/shared/shared-pipes-module';
import { PageHeader, Tag } from 'src/app/shared/components';
import { RouterModule, provideRouter } from '@angular/router';
import { UserSession } from 'src/app/core/services/settings/user-session';
import { LocalStorage } from 'src/app/core/services/local-storage';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

describe('UserList', () => {
    let component: UserList;
    let fixture: ComponentFixture<UserList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ApiTestingModule,
                RouterModule,
                SharedMaterialModule,
                SharedPipesModule,

                PageHeader,

                Tag,
                UserList,
            ],
            providers: [
                provideRouter([]),
                LocalStorage,
                UserSession,
                provideHotToastConfig(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
