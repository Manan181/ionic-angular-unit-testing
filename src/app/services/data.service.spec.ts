import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataService);
    });

    afterEach(() => {
        service = null;
        localStorage.removeItem('todos');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('return an empty array', () => {
        expect(service.getTodos()).toEqual([]);
    });

    it('return an array with one object', () => {
        const arr = ['First Todo'];
        localStorage.setItem('todos', JSON.stringify(arr));
        expect(service.getTodos()).toEqual(arr);
        expect(service.getTodos()).toHaveSize(1);
    });
    
    it('return the correct array size', () => {
        const arr = [1, 2, 3, 4, 5];
        localStorage.setItem('todos', JSON.stringify(arr));

        expect(service.getTodos()).toHaveSize(arr.length);
    });
});
