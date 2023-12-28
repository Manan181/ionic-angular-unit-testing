// Importing necessary modules for testing
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

// Importing the ProductsService for testing
import { ProductsService } from './products.service';

// Describing a test suite for the ProductsService
describe('ProductsService', () => {
    // Declaring variables to hold instances of the ProductsService, HttpClient, and HttpTestingController
    let service: ProductsService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    // Setting up the testing environment before each test
    beforeEach(() => {
        // Configuring the TestBed with HttpClientTestingModule to mock HTTP requests
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        // Injecting instances of ProductsService, HttpClient, and HttpTestingController for testing
        service = TestBed.inject(ProductsService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    // Verifying that there are no outstanding HTTP requests after each test
    afterEach(() => {
        httpTestingController.verify();
    });

    // A basic test to check if the ProductsService is created successfully
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Testing if the 'getProducts' method makes an API call and handles the response correctly
    it('should make an API call', () => {
        // Mock response data from the API
        const mockResponse = [
            {
                id: 1,
                title: 'Simons Product',
                price: 42.99,
                description: 'Epic product test'
            }
        ];

        // Subscribing to the 'getProducts' method and checking the response
        service.getProducts().subscribe((res) => {
            expect(res).toBeTruthy();
            expect(res).toHaveSize(1);
            const product = res[0];
            expect(product).toBe(mockResponse[0]);
        });

        // Expecting an HTTP request to the specified API endpoint
        const mockRequest = httpTestingController.expectOne('https://fakestoreapi.com/products');

        // Expecting the HTTP request to be a GET request
        expect(mockRequest.request.method).toEqual('GET');

        // Resolve with our mock data
        mockRequest.flush(mockResponse);
    });
});
