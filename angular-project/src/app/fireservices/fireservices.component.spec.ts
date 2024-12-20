import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireservicesComponent } from './fireservices.component';

describe('FireservicesComponent', () => {
  let component: FireservicesComponent;
  let fixture: ComponentFixture<FireservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
