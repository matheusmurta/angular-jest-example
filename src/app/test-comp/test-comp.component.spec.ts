import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from '../login.service';

import { TestCompComponent } from './test-comp.component';

describe('TestCompComponent', () => {
  let component: TestCompComponent;
  let fixture: ComponentFixture<TestCompComponent>;
  let loginService: LoginService;  
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ TestCompComponent ], 
      providers: [ LoginService ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from the API', () => {
    const testData = {
      id: 1,
      name: 'Test Data'
    };

    component.login();

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);

    expect(component.data).toEqual(testData);
  });
  
  it('should handle error responses', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };
    const dummyData = { message: 'This should not be returned' };

    loginService.login("teste","teste").subscribe({
      next: (data)=> { []},
      error: (err)=> { 
        expect(err.com).toEqual(404);
        expect(err.statusText).toEqual('Not Found');
       },
      complete:()=> { console.log('complete') }
    });

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');

    req.flush(dummyData, errorResponse);
  });

  

});
