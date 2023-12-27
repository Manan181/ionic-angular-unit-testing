import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ProductsService', () => {
    let service: ProductsService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ProductsService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an API call', () => {
        const mockResponse = [
            {
                id: 1,
                title: 'Simons Product',
                price: 42.99,
                description: 'Epic product test'
            }
        ];

        service.getProducts().subscribe((res) => {
            expect(res).toBeTruthy();
            expect(res).toHaveSize(1);
            const product = res[0];
            expect(product).toBe(mockResponse[0]);
        });

        const mockRequest = httpTestingController.expectOne('https://fakestoreapi.com/products');

        expect(mockRequest.request.method).toEqual('GET');

        // Resolve with our mock data
        mockRequest.flush(mockResponse);
    });
});
