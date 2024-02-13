import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoperComponent } from './stoper.component';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
