import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  });
  describe('using before each', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should use username from the service', () => {
      const userService = fixture.debugElement.injector.get(UserService);
      expect(component.user.name).toEqual(userService.user.name);
    });

    it('should display the username if the user is logged in', function () {
      component.isLoggedIn = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('p').textContent).toEqual('User is: Kate');
    });

    it("shouldn't display the username if the user is not logged in", function () {
      component.isLoggedIn = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('p').textContent).not.toContain('User is:');
    });

    it('should not fetch data successfully if not called asynchronously', function () {
      const dataService = fixture.debugElement.injector.get(DataService);
      const spy = spyOn(dataService, "getDetails")
        .and.returnValue(Promise.resolve("Dummy Data"));
      fixture.detectChanges();
      expect(component.data).toBe(undefined);
    });
  });

  it('should fetch data successfully if called asynchronously', waitForAsync(() => {

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);

    const spy = spyOn(dataService, "getDetails")
      .and.returnValue(Promise.resolve("Dummy Data"));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe("Dummy Data");
    });
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);

    const spy = spyOn(dataService, "getDetails")
      .and.returnValue(Promise.resolve("Dummy Data"));

    fixture.detectChanges();
    tick();
    expect(component.data).toBe("Dummy Data");
  }));

});
