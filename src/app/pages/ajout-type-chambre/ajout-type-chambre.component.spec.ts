import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeChambreComponent } from './ajout-type-chambre.component';

describe('AjoutTypeChambreComponent', () => {
  let component: AjoutTypeChambreComponent;
  let fixture: ComponentFixture<AjoutTypeChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutTypeChambreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
