import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFinalizadoPage } from './registro-finalizado.page';

describe('RegistroFinalizadoPage', () => {
  let component: RegistroFinalizadoPage;
  let fixture: ComponentFixture<RegistroFinalizadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroFinalizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
