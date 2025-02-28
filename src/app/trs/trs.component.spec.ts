import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrsComponent } from './trs.component';

describe('TrsComponent', () => {
  let component: TrsComponent;
  let fixture: ComponentFixture<TrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrsComponent]
    });
    fixture = TestBed.createComponent(TrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
