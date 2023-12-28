// Importing necessary modules and components for testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    // Setting up the testing environment before each test
    beforeEach(waitForAsync(() => {
        // Configuring the TestBed with necessary declarations and imports
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        // Creating a fixture and getting the component instance
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        
        // Detecting changes to the component
        fixture.detectChanges();
    }));

    // Cleaning up after each test by removing an item from the localStorage and setting the component instance to null
    afterEach(() => {
        localStorage.removeItem('todos');
        component = null;
    });

    // A basic test to check if the component is created successfully
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Testing the 'loadTodos' method when it's expected to return an empty array
    it('get an empty array', () => {
        // Calling the 'loadTodos' method
        component.loadTodos();
        // Expecting that the 'todos' property of the component is an empty array
        expect(component.todos).toEqual([]);
    });

    // Testing the 'loadTodos' method when it's expected to return an array with objects
    it('set an array with objects', () => {
        const arr = [1, 2, 3, 4, 5];
        // Setting the 'todos' property in the localStorage with the stringified array
        localStorage.setItem('todos', JSON.stringify(arr));
        // Calling the 'loadTodos' method
        component.loadTodos();
        // Expecting that the 'todos' property of the component is equal to the original array
        expect(component.todos).toEqual(arr);
        // Expecting that the 'todos' property has the same length as the original array
        expect(component.todos).toHaveSize(arr.length);
    });
});
