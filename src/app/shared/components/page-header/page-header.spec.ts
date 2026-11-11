import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { PageHeader } from './page-header';

describe('PageHeader', () => {
  let component: PageHeader;
  let fixture: ComponentFixture<PageHeader>;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PageHeader ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeader);
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
