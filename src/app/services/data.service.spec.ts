// Importing necessary modules for testing
import { TestBed } from '@angular/core/testing';

// Importing the DataService for testing
import { DataService } from './data.service';

// Describing a test suite for the DataService
describe('DataService', () => {
    // Declaring a variable to hold an instance of the DataService
    let service: DataService;

    // Setting up the testing environment before each test
    beforeEach(() => {
        // Configuring the TestBed without any specific configuration
        TestBed.configureTestingModule({});
        // Injecting an instance of the DataService for testing
        service = TestBed.inject(DataService);
    });

    // Cleaning up after each test by setting the service instance to null and removing an item from localStorage
    afterEach(() => {
        // Setting the service instance to null
        service = null;
        // Removing an item from localStorage
        localStorage.removeItem('todos');
    });

    // A basic test to check if the DataService is created successfully
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Testing if the 'getTodos' method returns an empty array when localStorage is empty
    it('return an empty array', () => {
        expect(service.getTodos()).toEqual([]);
    });

    // Testing if the 'getTodos' method returns an array with one object when localStorage has one item
    it('return an array with one object', () => {
        // Mocking an array with one item
        const arr = ['First Todo'];
        // Setting the 'todos' property in localStorage with the stringified array
        localStorage.setItem('todos', JSON.stringify(arr));
        // Expecting the 'getTodos' method to return the same array
        expect(service.getTodos()).toEqual(arr);
        // Expecting the 'getTodos' method to return an array of size 1
        expect(service.getTodos()).toHaveSize(1);
    });

    // Testing if the 'getTodos' method returns the correct array size when localStorage has multiple items
    it('return the correct array size', () => {
        // Mocking an array with multiple items
        const arr = [1, 2, 3, 4, 5];
        // Setting the 'todos' property in localStorage with the stringified array
        localStorage.setItem('todos', JSON.stringify(arr));

        // Expecting the 'getTodos' method to return an array of the same size as the mock array
        expect(service.getTodos()).toHaveSize(arr.length);
    });
});
