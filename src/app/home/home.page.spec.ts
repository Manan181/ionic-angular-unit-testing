import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(waitForAsync (() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    
    afterEach(() => {
        localStorage.removeItem('todos');
        component = null;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('get an empty array', () => {
        component.loadTodos();
        expect(component.todos).toEqual([]);
    });

    it('set an array with objects', () => {
        const arr = [1, 2, 3, 4, 5];
        localStorage.setItem('todos', JSON.stringify(arr));
        component.loadTodos();
        expect(component.todos).toEqual(arr);
        expect(component.todos).toHaveSize(arr.length);
    });
});
