import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTabPage } from './issue-tab.page';

describe('IssueTabPage', () => {
  let component: IssueTabPage;
  let fixture: ComponentFixture<IssueTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
