import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Preferences } from '@capacitor/preferences';

describe('ApiService', () => {
    let service: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(async () => {
        await Preferences.clear();
        service = null;
    });

    it('should return an empty array', async () => {
        const value = await service.getStoredTodos();
        expect(value).toEqual([]);
    });

    it('should return the new item', async () => {
        await service.addTodo('buy milk');
        const updated = await service.getStoredTodos();
        expect(updated).toEqual(['buy milk']);
    });

    it('should remove an item', async () => {
        await service.addTodo('buy milk');
        await service.addTodo('buy coffee');
        await service.addTodo('buy ionic');

        const updated = await service.getStoredTodos();
        expect(updated).toEqual(['buy milk', 'buy coffee', 'buy ionic']);

        await service.removeTodo(1);

        const newValue = await service.getStoredTodos();
        expect(newValue).toEqual(['buy milk', 'buy ionic']);
    });
});
