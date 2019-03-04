import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssuePage } from './create-issue.page';

describe('CreateIssuePage', () => {
  let component: CreateIssuePage;
  let fixture: ComponentFixture<CreateIssuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIssuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
