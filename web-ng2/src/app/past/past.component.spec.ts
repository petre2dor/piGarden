/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PastComponent } from './past.component';

describe('PastComponent', () => {
  let component: PastComponent;
  let fixture: ComponentFixture<PastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
