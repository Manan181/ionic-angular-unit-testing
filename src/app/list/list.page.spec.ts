// Importing necessary modules and components for testing
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonCard, IonicModule, IonItem } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ListPage } from './list.page';

// Describing a test suite for the ListPage component
describe('ListPage', () => {
    // Declaring variables to hold an instance of the component, its fixture, and a service
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;
    let service: ApiService;

    // Setting up the testing environment before each test
    beforeEach(waitForAsync(() => {
        // Configuring the TestBed with necessary declarations and imports
        TestBed.configureTestingModule({
            declarations: [ListPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        // Creating a fixture and getting the component instance
        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;

        // Detecting changes to the component
        fixture.detectChanges();

        // Injecting the ApiService for testing
        service = TestBed.inject(ApiService);
    }));

    // A basic test to check if the component is created successfully
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* This test case is checking if the `loadStorageTodos()` method in the `ListPage` component
    correctly loads async todos from the `ApiService`. */
    it('should load async todos', (done) => {
        // Mocking an array of todos
        const arr = [1, 2, 3, 4, 5];
        // Spying on the 'getStoredTodos' method of the ApiService and returning a resolved promise with the mock array
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        // Calling the 'loadStorageTodos' method of the component
        component.loadStorageTodos();

        // Handling the asynchronous resolution of the spy's promise
        spy.calls.mostRecent().returnValue.then(() => {
            // Expecting that the 'todos' property of the component is equal to the mock array
            expect(component.todos).toBe(arr);
            // Signaling that the asynchronous test is complete
            done();
        });
    });

    // Testing using the 'waitForAsync' utility to handle asynchronous code
    it('waitForAsync should load async todos', waitForAsync(() => {
        // Mocking an array of todos
        const arr = [1, 2, 3];
        // Spying on the 'getStoredTodos' method of the ApiService and returning a resolved promise with the mock array
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        component.loadStorageTodos();

        // Waiting for the fixture to become stable (no more asynchronous tasks pending)
        fixture.whenStable().then(() => {
            // Expecting that the 'getStoredTodos' method of the ApiService has been called
            expect(component.apiService.getStoredTodos).toHaveBeenCalled();
            // Expecting that the 'todos' property of the component is equal to the mock array
            expect(component.todos).toBe(arr);
        });
    }));

    // Testing using 'fakeAsync' to simulate the passage of time
    it('fakeAsync should load async todos', fakeAsync(() => {
        const arr = [1, 2];
        // Spying on the 'getStoredTodos' method of the ApiService and returning a resolved promise with the mock array
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        component.loadStorageTodos();
        // Simulating the passage of time
        tick();
        // Expecting that the 'todos' property of the component is equal to the mock array
        expect(component.todos).toBe(arr);
    }));

    // Additional tests for various expectations
    it('should pass below tests', () => {
        let array = [1, 2, 3];
        let member = 3;
        let instance = { a: 'Apple', b: 'Banana' };
        let mixed = component.mixed;
        let number = 7;

        // Various expectations to test different conditions
        expect(instance).toBe(instance);
        expect(member).toBeDefined();
        expect(mixed).toBeFalsy();
        expect(number).toBeGreaterThan(--number);
        expect(number).toBeLessThan(++number);
        expect(null).toBeNull();
        expect(array).toContain(member);
        expect(mixed).toEqual(mixed);
    });
});
