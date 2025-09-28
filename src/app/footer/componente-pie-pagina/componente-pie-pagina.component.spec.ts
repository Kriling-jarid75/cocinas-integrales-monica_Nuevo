import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePiePaginaComponent } from './componente-pie-pagina.component';

describe('ComponentePiePaginaComponent', () => {
  let component: ComponentePiePaginaComponent;
  let fixture: ComponentFixture<ComponentePiePaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentePiePaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentePiePaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
