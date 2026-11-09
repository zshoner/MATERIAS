import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaMaterias } from './lista-materias';

describe('ListaMaterias', () => {
  let component: ListaMaterias;
  let fixture: ComponentFixture<ListaMaterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMaterias],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMaterias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
