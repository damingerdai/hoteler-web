import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PageHeaderComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('header title should be \'hello\'', () => {
    component.title = 'hello';
    fixture.detectChanges();
    const h1El = fixture.debugElement.query(By.css('h1'));
    expect(h1El).toBeTruthy();
    expect((h1El.nativeElement as HTMLHeadElement).textContent).toContain('hello');
  });
});
