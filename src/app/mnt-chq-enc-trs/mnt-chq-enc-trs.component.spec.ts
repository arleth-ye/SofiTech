import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntChqEncTrsComponent } from './mnt-chq-enc-trs.component';

describe('MntChqEncTrsComponent', () => {
  let component: MntChqEncTrsComponent;
  let fixture: ComponentFixture<MntChqEncTrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MntChqEncTrsComponent]
    });
    fixture = TestBed.createComponent(MntChqEncTrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
