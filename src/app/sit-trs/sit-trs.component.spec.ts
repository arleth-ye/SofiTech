import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitTrsComponent } from './sit-trs.component';

describe('SitTrsComponent', () => {
  let component: SitTrsComponent;
  let fixture: ComponentFixture<SitTrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitTrsComponent]
    });
    fixture = TestBed.createComponent(SitTrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
