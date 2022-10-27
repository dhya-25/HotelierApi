import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereFactureComponent } from './genere-facture.component';

describe('GenereFactureComponent', () => {
  let component: GenereFactureComponent;
  let fixture: ComponentFixture<GenereFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenereFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenereFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
