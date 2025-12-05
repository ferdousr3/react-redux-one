# shadcn UI Components Structure

This folder contains centralized exports for all shadcn/ui components, providing a clean and organized import pattern.

## Import Patterns

### Pattern 1: Namespace Import (Recommended)
```typescript
import * as ui from '@/components/shadcn/ui';

// Usage
<ui.Button>Click me</ui.Button>
<ui.Card>
  <ui.CardHeader>
    <ui.CardTitle>Title</ui.CardTitle>
  </ui.CardHeader>
</ui.Card>
```

### Pattern 2: Named Imports
```typescript
import { Button, Card, CardHeader, CardTitle } from '@/components/shadcn';

// Usage
<Button>Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

### Pattern 3: Direct UI Import (Legacy)
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## Available Components

- **Button** - Button component with variants
- **Card** - Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
- **Checkbox** - Checkbox input
- **DropdownMenu** - Dropdown menu with all sub-components
- **Form** - Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField
- **Input** - Input field
- **Label** - Label component
- **Select** - Select dropdown with all sub-components
- **Textarea** - Textarea input
- **Toaster** - Toast notification component (from Sonner)

## File Structure

```
src/components/
├── shadcn/
│   ├── index.ts       # Central exports (Pattern 2)
│   ├── ui.ts          # Namespace exports (Pattern 1)
│   └── README.md      # This file
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── checkbox.tsx
    ├── dropdown-menu.tsx
    ├── form.tsx
    ├── input.tsx
    ├── label.tsx
    ├── select.tsx
    ├── sonner.tsx
    └── textarea.tsx
```

## Benefits

1. **Cleaner Imports**: Single import line instead of multiple
2. **Better Organization**: All UI components in one namespace
3. **Type Safety**: Full TypeScript support maintained
4. **Flexibility**: Multiple import patterns supported
5. **Discoverability**: Easy to see all available components via autocomplete

## Migration Guide

### Before:
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
```

### After (Namespace):
```typescript
import * as ui from '@/components/shadcn/ui';
```

### After (Named):
```typescript
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from '@/components/shadcn';
```
