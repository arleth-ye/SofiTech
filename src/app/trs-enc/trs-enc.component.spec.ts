import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrsEncComponent } from './trs-enc.component';

describe('TrsEncComponent', () => {
  let component: TrsEncComponent;
  let fixture: ComponentFixture<TrsEncComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrsEncComponent]
    });
    fixture = TestBed.createComponent(TrsEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
