import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFinalizadoDatosPage } from './registro-finalizado-datos.page';

describe('RegistroFinalizadoDatosPage', () => {
  let component: RegistroFinalizadoDatosPage;
  let fixture: ComponentFixture<RegistroFinalizadoDatosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroFinalizadoDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
