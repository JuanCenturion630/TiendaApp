import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerProductosPage } from './ver-productos.page';

describe('VerProductosPage', () => {
  let component: VerProductosPage;
  let fixture: ComponentFixture<VerProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
