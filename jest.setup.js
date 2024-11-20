import { expect } from '@jest/globals';

global.expect = expect;

// Mock global objects or APIs that might not be available in the test environment
global.fetch = require('jest-fetch-mock');

// Import @testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock browser APIs that might not be available in Node.js environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Set up any global variables or configurations for your tests
global.IS_REACT_ACT_ENVIRONMENT = true;

// You can add more setup code here as needed for your specific project
