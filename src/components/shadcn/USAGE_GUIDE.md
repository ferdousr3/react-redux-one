# shadcn UI Components - Usage Guide

## ✅ CSS Connection

The CSS is properly connected in `src/main.tsx`:
```typescript
import './index.css'  // Line 4 - Tailwind CSS and component styles
```

This imports all Tailwind directives and shadcn/ui component styles.

---

## 📁 New Folder Structure

```
src/
├── components/
│   ├── shadcn/              # ✨ NEW - Centralized UI exports
│   │   ├── index.ts         # Named exports: import { Button } from '@/components/shadcn'
│   │   ├── ui.ts            # Namespace export: import * as ui from '@/components/shadcn/ui'
│   │   ├── README.md        # Documentation
│   │   └── USAGE_GUIDE.md   # This file
│   ├── ui/                  # Original shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── sonner.tsx
│   │   └── textarea.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
```

---

## 🎯 Import Patterns

### Pattern 1: Namespace Import (Recommended) ⭐

**Best for:** Pages with many UI components

```typescript
import * as ui from '@/components/shadcn/ui';

function MyPage() {
  return (
    <ui.Card>
      <ui.CardHeader>
        <ui.CardTitle>Title</ui.CardTitle>
        <ui.CardDescription>Description</ui.CardDescription>
      </ui.CardHeader>
      <ui.CardContent>
        <ui.Label>Name</ui.Label>
        <ui.Input placeholder="Enter name" />
        <ui.Button>Submit</ui.Button>
      </ui.CardContent>
    </ui.Card>
  );
}
```

**Benefits:**
- ✅ Single import line
- ✅ Clear component origin (ui.Button vs Button)
- ✅ No naming conflicts
- ✅ Great autocomplete support

---

### Pattern 2: Named Imports

**Best for:** Components using few UI elements

```typescript
import { Button, Card, CardHeader, CardTitle, Input } from '@/components/shadcn';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <Input />
      <Button>Submit</Button>
    </Card>
  );
}
```

**Benefits:**
- ✅ Cleaner JSX (no ui. prefix)
- ✅ Familiar pattern
- ✅ Tree-shaking friendly

---

### Pattern 3: Direct Import (Legacy)

**Best for:** Backwards compatibility

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
```

**Note:** This still works but is not recommended for new code.

---

## 📝 Complete Examples

### Example 1: Login Form (Namespace Pattern)

```typescript
import * as ui from '@/components/shadcn/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth.schema';

export function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <ui.Card className="w-full max-w-md">
      <ui.CardHeader>
        <ui.CardTitle>Login</ui.CardTitle>
        <ui.CardDescription>Enter your credentials</ui.CardDescription>
      </ui.CardHeader>
      <ui.CardContent>
        <ui.Form {...form}>
          <form className="space-y-4">
            <ui.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <ui.FormItem>
                  <ui.FormLabel>Email</ui.FormLabel>
                  <ui.FormControl>
                    <ui.Input {...field} type="email" />
                  </ui.FormControl>
                  <ui.FormMessage />
                </ui.FormItem>
              )}
            />
            <ui.Button type="submit">Login</ui.Button>
          </form>
        </ui.Form>
      </ui.CardContent>
    </ui.Card>
  );
}
```

### Example 2: Dashboard Card (Named Pattern)

```typescript
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/shadcn';

export function DashboardCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your stats here</p>
        <Button>View Details</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🔄 Migration Guide

### Before (Old Pattern):
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Name</Label>
        <Input />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### After (New Pattern):
```typescript
import * as ui from '@/components/shadcn/ui';

function MyPage() {
  return (
    <ui.Card>
      <ui.CardHeader>
        <ui.CardTitle>Form</ui.CardTitle>
      </ui.CardHeader>
      <ui.CardContent>
        <ui.Label>Name</ui.Label>
        <ui.Input />
        <ui.Button>Submit</ui.Button>
      </ui.CardContent>
    </ui.Card>
  );
}
```

**Result:** 5 import lines → 1 import line ✨

---

## 📦 Available Components

All components are fully typed and support all original props:

- **ui.Button** - Button with variants (default, destructive, outline, secondary, ghost, link)
- **ui.Card** - Card container
  - ui.CardHeader
  - ui.CardFooter
  - ui.CardTitle
  - ui.CardDescription
  - ui.CardContent
- **ui.Checkbox** - Checkbox input
- **ui.DropdownMenu** - Dropdown menu with all sub-components
- **ui.Form** - Form components
  - ui.FormField
  - ui.FormItem
  - ui.FormLabel
  - ui.FormControl
  - ui.FormDescription
  - ui.FormMessage
- **ui.Input** - Text input field
- **ui.Label** - Form label
- **ui.Select** - Select dropdown with all sub-components
- **ui.Textarea** - Multi-line text input
- **ui.Toaster** - Toast notification component

---

## 🎨 Styling

All components use Tailwind CSS classes. The theme is configured in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS variables and base styles

You can customize colors, radius, and other design tokens in these files.

---

## 🚀 Quick Start

1. **Import the namespace:**
   ```typescript
   import * as ui from '@/components/shadcn/ui';
   ```

2. **Use components with ui. prefix:**
   ```typescript
   <ui.Button>Click me</ui.Button>
   ```

3. **Enjoy autocomplete and type safety!** 🎉

---

## 💡 Tips

1. **Use namespace import for pages** - Keeps imports clean
2. **Use named imports for small components** - Less verbose JSX
3. **Leverage TypeScript** - All components are fully typed
4. **Check ExamplePage.tsx** - See working examples
5. **Use className prop** - All components support Tailwind classes

---

## ❓ FAQ

**Q: Can I still use the old import pattern?**
A: Yes! The old pattern (`import { Button } from '@/components/ui/button'`) still works.

**Q: Which pattern should I use?**
A: For new code, use the namespace pattern (`import * as ui`). It's cleaner and more maintainable.

**Q: Do I need to change existing code?**
A: No, but you can gradually migrate to the new pattern for better organization.

**Q: Is the CSS properly connected?**
A: Yes! It's imported in `src/main.tsx` line 4.

**Q: Where can I see examples?**
A: Check `src/pages/ExamplePage.tsx` for a working example.

---

## 📚 Resources

- **shadcn/ui Documentation**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

---

**Happy coding! 🎉**
