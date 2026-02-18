# Project Folder Structure

```
triathlon-client/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Route pages (thin, declarative)
│   ├── layout.tsx               # Layouts
│   ├── loading.tsx              # Loading UI (optional)
│   ├── error.tsx                # Error UI (optional)
│   └── not-found.tsx            # 404 UI (optional)
│
├── domains/                      # Domain-Driven Design
│   └── example/                 # Example domain (template)
│       ├── types/
│       │   └── example.types.ts    # Domain types & interfaces
│       ├── services/
│       │   └── example.api.ts      # HTTP/API calls only
│       ├── store/
│       │   └── example.store.ts    # Zustand store (state only)
│       ├── hooks/
│       │   └── useExample.ts       # Business logic hook
│       ├── components/
│       │   └── ExampleComponent.tsx # Domain-specific components
│       ├── index.ts                 # Public API exports
│       └── README.md                # Domain documentation
│
├── components/                   # Shared components
│   └── shared/
│       └── Button/
│           ├── Button.tsx          # Component implementation
│           └── index.ts            # Exports
│
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── cursorrules                  # Project rules
├── README.md                    # Main README
├── README-DOMAIN-STRUCTURE.md   # DDD architecture guide
└── STRUCTURE.md                 # This file
```

## Quick Reference

### When to create a new domain?
- When you have a distinct business feature/concept
- When the feature has its own data, logic, and components
- Examples: `user`, `order`, `product`, `training`, `race`

### When to create a shared component?
- When a component is reused across multiple domains
- When it's purely presentational (no business logic)
- Examples: `Button`, `Input`, `Card`, `Modal`, `LoadingSpinner`

### File Responsibilities

| File Type | Responsibility | Can Do | Cannot Do |
|-----------|---------------|--------|-----------|
| `types/*` | Type definitions | Define interfaces, DTOs | Business logic |
| `services/*` | API calls | HTTP requests | Business logic, state |
| `store/*` | State management | Hold state, update state | API calls, business logic |
| `hooks/*` | Business logic | Call services, update store, orchestrate | Direct DOM manipulation |
| `components/*` | UI rendering | Render UI, handle interactions, call hooks | API calls, direct store access |
| `page.tsx` | Routes | Render domain components | Business logic |

