/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PresentComponent } from './present.component';

describe('PresentComponent', () => {
  let component: PresentComponent;
  let fixture: ComponentFixture<PresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
