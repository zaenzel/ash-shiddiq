/**
 * Example Domain Public API
 * 
 * Export all public interfaces for this domain.
 * Components outside this domain should import from here.
 */

export { useExample } from './hooks/useExample';
export { ExampleComponent } from './components/ExampleComponent';
export type {
  ExampleItem,
  CreateExampleItemDto,
  UpdateExampleItemDto,
} from './types/example.types';

