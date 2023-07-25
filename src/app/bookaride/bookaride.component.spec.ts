import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookarideComponent } from './bookaride.component';

describe('BookarideComponent', () => {
  let component: BookarideComponent;
  let fixture: ComponentFixture<BookarideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookarideComponent]
    });
    fixture = TestBed.createComponent(BookarideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
