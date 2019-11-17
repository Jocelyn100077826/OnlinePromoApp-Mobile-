import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmodalPage } from './aboutmodal.page';

describe('AboutmodalPage', () => {
  let component: AboutmodalPage;
  let fixture: ComponentFixture<AboutmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
