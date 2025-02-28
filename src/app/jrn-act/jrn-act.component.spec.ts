import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JrnActComponent } from './jrn-act.component';

describe('JrnActComponent', () => {
  let component: JrnActComponent;
  let fixture: ComponentFixture<JrnActComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JrnActComponent]
    });
    fixture = TestBed.createComponent(JrnActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
