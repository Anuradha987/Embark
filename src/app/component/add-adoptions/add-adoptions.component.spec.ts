import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdoptionsComponent } from './add-adoptions.component';

describe('AddAdoptionsComponent', () => {
  let component: AddAdoptionsComponent;
  let fixture: ComponentFixture<AddAdoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
