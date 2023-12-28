// Importing necessary modules for testing
import { TestBed } from '@angular/core/testing';

// Importing the ApiService and Preferences modules for testing
import { ApiService } from './api.service';
import { Preferences } from '@capacitor/preferences';

// Describing a test suite for the ApiService
describe('ApiService', () => {
    // Declaring a variable to hold an instance of the ApiService
    let service: ApiService;

    // Setting up the testing environment before each test
    beforeEach(() => {
        // Configuring the TestBed without any specific configuration
        TestBed.configureTestingModule({});
        // Injecting an instance of the ApiService for testing
        service = TestBed.inject(ApiService);
    });

    // A basic test to check if the ApiService is created successfully
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Cleaning up after each test by clearing Preferences and setting the service instance to null
    afterEach(async () => {
        // Clearing preferences (a mock for Capacitor's storage)
        await Preferences.clear();
        service = null;
    });

    // Testing if the 'getStoredTodos' method returns an empty array
    it('should return an empty array', async () => {
        // Calling the 'getStoredTodos' method and expecting the result to be an empty array
        const value = await service.getStoredTodos();
        expect(value).toEqual([]);
    });

    // Testing if the 'addTodo' method adds a new item to the stored todos
    it('should return the new item', async () => {
        // Adding a new todo item
        await service.addTodo('buy milk');
        // Getting the updated list of todos
        const updated = await service.getStoredTodos();
        // Expecting the updated list to contain the added item
        expect(updated).toEqual(['buy milk']);
    });

    // Testing if the 'removeTodo' method removes an item from the stored todos
    it('should remove an item', async () => {
        // Adding multiple todo items
        await service.addTodo('buy milk');
        await service.addTodo('buy coffee');
        await service.addTodo('buy ionic');

        // Getting the initial list of todos
        const updated = await service.getStoredTodos();
        // Expecting the initial list to contain all added items
        expect(updated).toEqual(['buy milk', 'buy coffee', 'buy ionic']);

        // Removing a todo item at index 1
        await service.removeTodo(1);

        // Getting the updated list after removal
        const newValue = await service.getStoredTodos();
        // Expecting the updated list to have the specified item removed
        expect(newValue).toEqual(['buy milk', 'buy ionic']);
    });
});
