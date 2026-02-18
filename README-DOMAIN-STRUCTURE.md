# Domain-Driven Design (DDD) Structure

This project follows Domain-Driven Design principles with a clear separation of concerns.

## Project Structure

```
triathlon-client/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Route files (thin, declarative)
│   └── layout.tsx         # Layouts
│
├── domains/               # Domain-driven organization
│   └── example/          # Example domain (template)
│       ├── types/        # Domain types
│       ├── services/     # API calls
│       ├── store/        # Zustand stores (one per domain)
│       ├── hooks/        # Business logic hooks
│       ├── components/   # Domain-specific components
│       └── README.md     # Domain documentation
│
└── components/           # Shared components
    └── shared/          # Reusable UI components
        └── Button/      # Example shared component
```

## Architecture Rules

### 1. Domain Organization
- Code organized by **domain**, not technical layers
- Each domain is self-contained and loosely coupled
- Domains encapsulate: types, services, store, hooks, components

### 2. Hooks-First Architecture
- All business logic accessed through **custom hooks**
- Components **never**:
  - Call API services directly
  - Access Zustand stores directly
- Hooks orchestrate: services, state, loading/error states

### 3. Separation of Concerns

#### Components
- **Responsibility**: UI rendering and user interactions
- **Can do**: Call hooks, handle form inputs, display data
- **Cannot do**: API calls, direct store access, business logic

#### Hooks
- **Responsibility**: Business logic orchestration
- **Can do**: Call services, update store, handle loading/error states
- **Cannot do**: Direct DOM manipulation (except via components)

#### Services
- **Responsibility**: HTTP calls only
- **Can do**: Make API requests, handle request/response
- **Cannot do**: Business logic, state management

#### Store (Zustand)
- **Responsibility**: State storage only
- **Can do**: Hold state, provide state update functions
- **Cannot do**: Business logic, API calls

### 4. Data Flow

```
Component → Hook → Service → API
              ↓
           Store (Zustand)
```

1. Component calls hook
2. Hook calls service (HTTP request)
3. Hook updates store with response
4. Component re-renders with updated state

## Example Usage

See `domains/example/` for a complete working example.

## Creating a New Domain

1. Copy `domains/example/` to `domains/your-domain/`
2. Rename files and update content
3. Follow the same structure and patterns
4. Update this README if needed

## Shared Components

Components in `components/shared/` are:
- UI-only (presentational)
- No domain-specific logic
- Reusable across all domains

Use these for common UI elements like buttons, inputs, cards, etc.

