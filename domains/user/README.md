# Example Domain

This is an example domain following the DDD (Domain-Driven Design) pattern. Use this as a template when creating new domains.

## Structure

```
domains/example/
├── types/           # Domain types (interfaces, DTOs)
├── services/        # API calls (HTTP requests)
├── store/           # Zustand store (state only, no logic)
├── hooks/           # Business logic hooks (main interface)
├── components/      # Domain-specific components
└── README.md        # Domain documentation
```

## How It Works

### 1. Types (`types/example.types.ts`)
- Define all domain-specific types
- Use explicit, strict TypeScript
- No `any` types

### 2. Services (`services/example.api.ts`)
- **Only** HTTP calls live here
- No business logic
- Pure API communication

### 3. Store (`store/example.store.ts`)
- Zustand store for state management
- **Only** state and state updates
- No business logic
- One store per domain

### 4. Hooks (`hooks/useExample.ts`)
- **Main interface** for components
- Orchestrates services and store
- Contains business logic
- Handles loading/error states

### 5. Components (`components/ExampleComponent.tsx`)
- UI rendering and interactions only
- Uses hooks (never API services or store directly)
- Domain-specific (not shared)

## Usage Pattern

```tsx
// ✅ GOOD: Component uses hook
import { useExample } from '@/domains/example/hooks/useExample';

export function MyComponent() {
  const { items, fetchItems, createItem, isLoading } = useExample();
  // Component logic here
}

// ❌ BAD: Component calls API directly
import { getExampleItems } from '@/domains/example/services/example.api';
// Don't do this!

// ❌ BAD: Component accesses store directly
import { useExampleStore } from '@/domains/example/store/example.store';
// Don't do this!
```

## Key Rules

1. **Components** → Use hooks only
2. **Hooks** → Use services and store
3. **Services** → Make HTTP calls only
4. **Store** → Hold state only
5. **Types** → Define domain types

## Creating a New Domain

1. Copy this example domain folder
2. Rename `example` to your domain name
3. Update all file contents to match your domain
4. Update imports and exports
5. Follow the same structure and patterns

