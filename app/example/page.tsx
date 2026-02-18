/**
 * Example Page
 * 
 * This page demonstrates the usage of the example domain.
 * Page files should be thin and declarative - no business logic here.
 * All business logic is handled by the domain hook via the component.
 */

import { ExampleComponent } from '@/domains/example';

export default function ExamplePage() {
  return <ExampleComponent />;
}

