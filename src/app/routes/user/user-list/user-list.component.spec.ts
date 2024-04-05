import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { ApiTestingModule } from 'src/app/core/testings';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { PageHeaderComponent, TagComponent } from 'src/app/shared/components';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        SharedMaterialModule,
        SharedPipesModule,

        PageHeaderComponent,
        TagComponent,
        UserListComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
