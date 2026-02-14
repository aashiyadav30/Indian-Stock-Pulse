# 🔄 Migration Notes: Lovable (Vite + React Router) → Next.js 14

This document outlines all the key changes made during the conversion from the original Lovable project to Next.js 14.

---

## 📊 Summary of Changes

| Aspect | Lovable (Original) | Next.js (Converted) | Why Changed |
|--------|-------------------|---------------------|-------------|
| **Framework** | Vite + React | Next.js 14 | Built-in SSR, better SEO, routing |
| **Routing** | React Router v6 | Next.js App Router | File-based routing, better DX |
| **SEO** | react-helmet-async | Metadata API | Native Next.js feature |
| **Entry Point** | main.tsx → App.tsx | app/layout.tsx | Next.js convention |
| **Components** | All client-side | Server + Client split | Performance optimization |
| **Build Tool** | Vite | Next.js/Webpack | Integrated in Next.js |
| **Links** | `<Link to="">` | `<Link href="">` | Next.js API |
| **Navigation** | useNavigate hook | useRouter hook | Next.js API |

---

## 🔀 Code Migration Examples

### 1. Routing

#### Before (React Router)
```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/stocks/:symbol" element={<StockDetail />} />
    <Route path="/sectors/:sector" element={<SectorPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

#### After (Next.js App Router)
```
app/
├── page.tsx                    → / (homepage)
├── stocks/[symbol]/page.tsx   → /stocks/:symbol
├── sectors/[sector]/page.tsx  → /sectors/:sector
└── not-found.tsx              → 404 page
```

**Key Changes:**
- File-based routing instead of route definitions
- Dynamic routes use `[param]` syntax
- No need for BrowserRouter wrapper

---

### 2. Links and Navigation

#### Before (React Router)
```tsx
import { Link, useNavigate } from "react-router-dom";

// Link
<Link to="/stocks/reliance">View Stock</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate(`/stocks/${slug}`);
```

#### After (Next.js)
```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

// Link
<Link href="/stocks/reliance">View Stock</Link>

// Programmatic navigation
const router = useRouter();
router.push(`/stocks/${slug}`);
```

**Key Changes:**
- Import from `next/link` instead of `react-router-dom`
- Use `href` prop instead of `to`
- `useRouter` from `next/navigation` instead of `react-router-dom`
- `router.push()` instead of `navigate()`

---

### 3. SEO / Meta Tags

#### Before (react-helmet-async)
```tsx
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Stock Name - Share Price</title>
  <meta name="description" content="..." />
  <script type="application/ld+json">
    {JSON.stringify(jsonLd)}
  </script>
</Helmet>
```

#### After (Next.js Metadata API)
```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Name - Share Price",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
  },
};

// For JSON-LD, add in the component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Key Changes:**
- Export metadata object from page.tsx
- No need for Helmet component
- Built-in type safety with Metadata type
- Can generate dynamic metadata with `generateMetadata()` function

---

### 4. Page Structure

#### Before (Pages as Components)
```tsx
// pages/Index.tsx
const Index = () => {
  return (
    <main>
      <h1>Homepage</h1>
      {/* content */}
    </main>
  );
};

export default Index;
```

#### After (Split into Server + Client)
```tsx
// app/page.tsx (Server Component)
import HomePage from "@/components/HomePage";

export const metadata = { /* ... */ };

export default function Page() {
  return <HomePage />;
}

// components/HomePage.tsx (Client Component)
"use client";

export default function HomePage() {
  return (
    <main>
      <h1>Homepage</h1>
      {/* content with animations, state, etc. */}
    </main>
  );
}
```

**Key Changes:**
- Separate server and client concerns
- Metadata in server component
- Interactive logic in client component
- Use `"use client"` directive for client components

---

### 5. Layout / Wrapper

#### Before (App.tsx as Wrapper)
```tsx
// App.tsx
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>{/* routes */}</Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
```

#### After (Separate Layout and Providers)
```tsx
// app/layout.tsx (Server Component)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// app/providers.tsx (Client Component)
"use client";

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

**Key Changes:**
- `layout.tsx` wraps entire app
- Providers moved to separate client component
- No need for BrowserRouter (routing is built-in)
- Can have nested layouts per route

---

### 6. Dynamic Routes with Params

#### Before (React Router)
```tsx
import { useParams } from "react-router-dom";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const stock = getStockBySlug(symbol || "");
  
  return <div>{stock?.name}</div>;
};
```

#### After (Next.js)
```tsx
// app/stocks/[symbol]/page.tsx
type Props = {
  params: { symbol: string };
};

export default function Page({ params }: Props) {
  const stock = getStockBySlug(params.symbol);
  
  return <div>{stock?.name}</div>;
}

// Generate static params at build time
export async function generateStaticParams() {
  return stocks.map((stock) => ({
    symbol: stock.slug,
  }));
}
```

**Key Changes:**
- Params passed as props instead of hook
- Can pre-generate static pages with `generateStaticParams()`
- Better type safety with Props type
- Faster page loads (static generation)

---

### 7. Client-Side Interactivity

#### Components That Need "use client"

These components MUST have `"use client"` directive:

✅ **When to use "use client":**
- useState, useEffect, or other React hooks
- Event handlers (onClick, onChange, etc.)
- Framer Motion animations
- useRouter from "next/navigation"
- Browser APIs (window, document, localStorage)
- Third-party libraries that use browser APIs

❌ **Don't need "use client":**
- Static content
- Data fetching (can use Server Components)
- Metadata
- SEO-related code

**Example:**
```tsx
"use client";  // ← Required for animations and state

import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <motion.div animate={{ opacity: 1 }}>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </motion.div>
  );
}
```

---

## 📁 File Structure Comparison

### Before (Lovable/Vite)
```
src/
├── App.tsx              # App wrapper with routes
├── main.tsx             # Entry point
├── index.css            # Global styles
├── pages/               # Page components
│   ├── Index.tsx
│   ├── StockDetail.tsx
│   └── SectorPage.tsx
├── components/          # Shared components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/
└── lib/
    └── stockData.ts
```

### After (Next.js)
```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Homepage
├── providers.tsx        # Client providers
├── globals.css          # Global styles
├── not-found.tsx        # 404
├── stocks/[symbol]/
│   └── page.tsx         # Dynamic stock page
└── sectors/[sector]/
    └── page.tsx         # Dynamic sector page

components/              # React components
├── HomePage.tsx         # Client component for homepage
├── StockDetailPage.tsx  # Client component for stock detail
├── Navbar.tsx
├── Footer.tsx
└── ui/

lib/
└── stockData.ts
```

---

## 🎯 Benefits of Next.js Version

### 1. **Better SEO**
- Server-side rendering
- Meta tags generated on server
- Faster initial page load
- Search engines can easily crawl

### 2. **Improved Performance**
- Static page generation
- Automatic code splitting
- Optimized images (if using next/image)
- Smaller JavaScript bundles

### 3. **Better Developer Experience**
- File-based routing (no route config)
- Built-in TypeScript support
- Hot module replacement
- Easy deployment (Vercel)

### 4. **Production Ready**
- Built-in caching
- API routes (if needed)
- Middleware support
- Edge functions

---

## ⚠️ Breaking Changes to Watch For

### 1. Import Paths
❌ **Won't work:**
```tsx
import { Link } from "react-router-dom";
```

✅ **Correct:**
```tsx
import Link from "next/link";
```

### 2. Link Props
❌ **Won't work:**
```tsx
<Link to="/page">Link</Link>
```

✅ **Correct:**
```tsx
<Link href="/page">Link</Link>
```

### 3. Router Hook
❌ **Won't work:**
```tsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/page");
```

✅ **Correct:**
```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/page");
```

### 4. Client Components
❌ **Won't work (if uses hooks):**
```tsx
// No "use client" directive
export default function Component() {
  const [state, setState] = useState(0); // ERROR!
  // ...
}
```

✅ **Correct:**
```tsx
"use client";  // ← Add this!

export default function Component() {
  const [state, setState] = useState(0); // OK
  // ...
}
```

---

## 🔍 What Stayed the Same

✅ **No changes needed:**
- UI Components (shadcn/ui)
- Tailwind CSS classes
- Framer Motion animations
- React Query usage
- Component logic and state
- Styling and design tokens
- Data structures (stockData.ts)

---

## 🚀 Migration Checklist

If migrating another Lovable project:

- [ ] Create Next.js project structure
- [ ] Move pages to `app/` directory
- [ ] Split server and client components
- [ ] Convert React Router Links to Next.js Links
- [ ] Replace useNavigate with useRouter
- [ ] Convert Helmet to Metadata API
- [ ] Add "use client" to interactive components
- [ ] Update import paths
- [ ] Copy UI components (they work as-is)
- [ ] Copy global styles
- [ ] Test all routes
- [ ] Test all interactive features
- [ ] Build and verify production build

---

## 📚 Additional Resources

- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [React Router to Next.js](https://nextjs.org/docs/app/building-your-application/routing)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**Migration Complete! 🎉**

All functionality preserved, with improved SEO, performance, and developer experience.
