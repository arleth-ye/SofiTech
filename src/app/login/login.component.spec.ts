import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ] // Importation nécessaire pour ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher une alerte si les identifiants sont incorrects', () => {
    spyOn(window, 'alert');
    component.username = 'wrong';
    component.password = 'wrong';
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Identifiants incorrects.');
  });

  it('devrait afficher une alerte si les identifiants sont corrects', () => {
    spyOn(window, 'alert');
    component.username = 'admin';
    component.password = 'admin';
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Connexion réussie !');
  });
});
