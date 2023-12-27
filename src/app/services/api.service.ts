import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor() {}

    async getStoredTodos(): Promise<any[]> {
        const data = await Preferences.get({ key: 'mytodos' });

        if (data.value && data.value !== '') {
            return JSON.parse(data.value);
        } else {
            return [];
        }
    }

    async addTodo(todo) {
        const todos = await this.getStoredTodos();
        todos.push(todo);
        return await Preferences.set({ key: 'mytodos', value: JSON.stringify(todos) });
    }

    async removeTodo(index) {
        const todos = await this.getStoredTodos();
        todos.splice(index, 1);
        return await Preferences.set({ key: 'mytodos', value: JSON.stringify(todos) });
    }
}
