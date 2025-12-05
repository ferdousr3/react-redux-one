// Example page demonstrating the new shadcn import pattern
// This file shows how to use the centralized UI exports

import * as ui from '@/components/shadcn/ui';

export function ExamplePage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">UI Components Example</h1>

      {/* Using ui.Component pattern */}
      <ui.Card className="mb-6">
        <ui.CardHeader>
          <ui.CardTitle>Card Title</ui.CardTitle>
          <ui.CardDescription>This card uses the ui.Card pattern</ui.CardDescription>
        </ui.CardHeader>
        <ui.CardContent>
          <p>All components are imported via: import * as ui from '@/components/shadcn/ui'</p>
        </ui.CardContent>
      </ui.Card>

      {/* Form example */}
      <ui.Card>
        <ui.CardHeader>
          <ui.CardTitle>Form Example</ui.CardTitle>
        </ui.CardHeader>
        <ui.CardContent className="space-y-4">
          <div className="space-y-2">
            <ui.Label htmlFor="name">Name</ui.Label>
            <ui.Input id="name" placeholder="Enter your name" />
          </div>

          <div className="space-y-2">
            <ui.Label htmlFor="message">Message</ui.Label>
            <ui.Textarea id="message" placeholder="Enter your message" />
          </div>

          <ui.Button>Submit</ui.Button>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
}
