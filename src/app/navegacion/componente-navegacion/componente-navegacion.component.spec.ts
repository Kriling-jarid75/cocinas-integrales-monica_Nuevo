import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteNavegacionComponent } from './componente-navegacion.component';

describe('ComponenteNavegacionComponent', () => {
  let component: ComponenteNavegacionComponent;
  let fixture: ComponentFixture<ComponenteNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteNavegacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
