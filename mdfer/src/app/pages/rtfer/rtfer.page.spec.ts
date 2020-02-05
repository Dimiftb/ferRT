import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtferPage } from './rtfer.page';

describe('RtferPage', () => {
  let component: RtferPage;
  let fixture: ComponentFixture<RtferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
