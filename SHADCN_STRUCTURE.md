# Quick Reference - shadcn UI Structure

## ✅ What Changed

1. **New `shadcn` folder** created at `src/components/shadcn/`
2. **Centralized exports** for all UI components
3. **Two import patterns** available

## 🚀 Quick Start

### Recommended Pattern (Namespace):
```typescript
import * as ui from '@/components/shadcn/ui';

<ui.Button>Click</ui.Button>
<ui.Card>
  <ui.CardHeader>
    <ui.CardTitle>Title</ui.CardTitle>
  </ui.CardHeader>
</ui.Card>
```

### Alternative Pattern (Named):
```typescript
import { Button, Card, CardHeader, CardTitle } from '@/components/shadcn';

<Button>Click</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

## 📁 Structure

```
src/components/
├── shadcn/
│   ├── index.ts          # Named exports
│   ├── ui.ts             # Namespace export
│   ├── README.md         # Full documentation
│   └── USAGE_GUIDE.md    # Complete guide
└── ui/                   # Original components (don't modify)
```

## ✅ CSS Connection

CSS is properly connected in `src/main.tsx`:
```typescript
import './index.css'  // Line 4
```

## 📝 Example Files

- **Example Page**: `src/pages/ExamplePage.tsx`
- **Updated App**: `src/App.tsx` (uses new Toaster import)

## 🔗 Full Documentation

See `USAGE_GUIDE.md` for complete examples and migration guide.
