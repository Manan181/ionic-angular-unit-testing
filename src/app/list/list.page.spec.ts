import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonCard, IonicModule, IonItem } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ListPage } from './list.page';

describe('ListPage', () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;
    let service: ApiService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject(ApiService);
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* This test case is checking if the `loadStorageTodos()` method in the `ListPage` component
    correctly loads async todos from the `ApiService`. */
    it('should load async todos', (done) => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        component.loadStorageTodos();

        spy.calls.mostRecent().returnValue.then(() => {
            expect(component.todos).toBe(arr);
            done();
        });
    });

    it('waitForAsync should load async todos', waitForAsync(() => {
        const arr = [1, 2, 3];
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        component.loadStorageTodos();

        fixture.whenStable().then(() => {
            expect(component.apiService.getStoredTodos).toHaveBeenCalled();
            expect(component.todos).toBe(arr);
        });
    }));

    it('fakeAsync should load async todos', fakeAsync(() => {
        const arr = [1, 2];
        const spy = spyOn(service, 'getStoredTodos').and.returnValue(Promise.resolve(arr));
        component.loadStorageTodos();
        tick();
        expect(component.todos).toBe(arr);
    }));
    
    it('should pass below tests', () => {
        let array = [1, 2, 3];
        let member = 3;
        let instance = { a: 'Apple', b: 'Banana'};
        let mixed = component.mixed;
        let number = 7;
        
        expect(instance).toBe(instance);
        expect(member).toBeDefined();
        expect(mixed).toBeFalsy();
        expect(number).toBeGreaterThan(--number);
        expect(number).toBeLessThan(++number);
        expect(null).toBeNull();
        expect(array).toContain(member);
        expect(mixed).toEqual(mixed);
    })
});
