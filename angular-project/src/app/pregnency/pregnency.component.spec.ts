import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnencyComponent } from './pregnency.component';

describe('PregnencyComponent', () => {
  let component: PregnencyComponent;
  let fixture: ComponentFixture<PregnencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregnencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregnencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
