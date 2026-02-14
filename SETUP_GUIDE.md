# 📘 Complete Setup Guide - Indian Stock Pulse Next.js

This guide will walk you through setting up the project from scratch.

## ⚡ Quick Start (TL;DR)

```bash
# 1. Navigate to project directory
cd indian-stock-pulse-next

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser at http://localhost:3000
```

---

## 📋 Detailed Setup Instructions

### Step 1: Prerequisites Check

Before starting, ensure you have:

✅ **Node.js** (v18.17 or later)
```bash
node --version  # Should be v18.17+
```

✅ **npm** (comes with Node.js)
```bash
npm --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/)

---

### Step 2: Project Setup

#### Option A: From Provided Files

1. **Extract/Copy the project folder**
   ```bash
   cd indian-stock-pulse-next
   ```

2. **Verify folder structure**
   ```bash
   ls -la
   # You should see: app/, components/, lib/, package.json, etc.
   ```

#### Option B: Clone from Git (if applicable)

```bash
git clone <repository-url>
cd indian-stock-pulse-next
```

---

### Step 3: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI components
- React Query
- Recharts
- And 50+ other packages

⏱️ **Installation time**: 2-5 minutes depending on your internet speed

---

### Step 4: Start Development Server

```bash
npm run dev
```

You should see output like:
```
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

🎉 **Success!** Open `http://localhost:3000` in your browser.

---

### Step 5: Verify Everything Works

Check these pages:

✅ **Homepage**: `http://localhost:3000`
   - Should show stock market dashboard
   - Animated ticker at top
   - Top gainers and losers
   - All stocks grid

✅ **Stock Detail**: `http://localhost:3000/stocks/reliance`
   - Should show Reliance stock details
   - Interactive chart
   - Key metrics

✅ **Sector Page**: `http://localhost:3000/sectors/it-stocks`
   - Should show IT sector stocks

✅ **Search**: Click search icon in navbar
   - Type "TCS" or "Reliance"
   - Should show search results

---

## 🔧 Available Scripts

### Development
```bash
npm run dev
```
Starts development server on port 3000 with hot reload.

### Production Build
```bash
npm run build
```
Creates optimized production build in `.next/` folder.

### Production Server
```bash
npm run start
```
Runs the production build (must run `npm run build` first).

### Linting
```bash
npm run lint
```
Checks code for errors using ESLint.

---

## 🗂️ Project File Structure Explained

```
indian-stock-pulse-next/
│
├── 📁 app/                        # Next.js App Router (main folder)
│   ├── layout.tsx                # Root layout (wraps all pages)
│   ├── page.tsx                  # Homepage (/)
│   ├── providers.tsx             # React Query & UI providers
│   ├── globals.css               # Global CSS & Tailwind
│   ├── not-found.tsx             # 404 page
│   │
│   ├── 📁 stocks/[symbol]/       # Dynamic routes for stocks
│   │   └── page.tsx              # /stocks/reliance, /stocks/tcs, etc.
│   │
│   └── 📁 sectors/[sector]/      # Dynamic routes for sectors
│       └── page.tsx              # /sectors/it-stocks, etc.
│
├── 📁 components/                 # React components
│   ├── Navbar.tsx                # Top navigation with search
│   ├── Footer.tsx                # Bottom footer
│   ├── HomePage.tsx              # Homepage content (client)
│   ├── StockCard.tsx             # Individual stock card
│   ├── StockChart.tsx            # Price chart (Recharts)
│   ├── StockDetailPage.tsx       # Stock detail content
│   ├── SectorPageComponent.tsx   # Sector page content
│   ├── PriceChangeBadge.tsx      # +/- price indicator
│   │
│   └── 📁 ui/                    # shadcn/ui components (50+)
│       ├── button.tsx
│       ├── card.tsx
│       ├── tooltip.tsx
│       └── ... (more)
│
├── 📁 lib/                        # Utility functions & data
│   ├── utils.ts                  # Helper functions (cn, etc.)
│   └── stockData.ts              # Mock stock data
│
├── 📁 hooks/                      # Custom React hooks
│   ├── use-mobile.tsx            # Detect mobile devices
│   └── use-toast.ts              # Toast notifications
│
├── 📁 public/                     # Static files (images, etc.)
│
├── 📄 package.json                # Dependencies & scripts
├── 📄 tsconfig.json               # TypeScript config
├── 📄 tailwind.config.ts          # Tailwind CSS config
├── 📄 next.config.js              # Next.js config
├── 📄 postcss.config.js           # PostCSS config
├── 📄 .eslintrc.json              # ESLint config
└── 📄 README.md                   # Documentation
```

---

## 🎨 Understanding the Tech Stack

### 1. **Next.js 14 (App Router)**
- Modern React framework
- Server & client components
- Built-in routing
- Optimized for SEO

### 2. **TypeScript**
- Type safety
- Better developer experience
- Catches errors at compile time

### 3. **Tailwind CSS**
- Utility-first CSS
- Custom design tokens
- Dark theme built-in

### 4. **Framer Motion**
- Smooth animations
- Page transitions
- Stagger effects

### 5. **shadcn/ui + Radix UI**
- Accessible components
- Customizable
- Production-ready

### 6. **React Query**
- Data fetching
- Caching
- Background updates

### 7. **Recharts**
- Stock price charts
- Interactive tooltips
- Responsive

---

## 🚀 Deployment Options

### Option 1: Vercel (Easiest - Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   
   ✨ Done! Your site will be live in ~2 minutes.

### Option 2: Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy `.next/` folder to Netlify

### Option 3: Self-Hosted

1. Build the project:
   ```bash
   npm run build
   ```

2. Run production server:
   ```bash
   npm run start
   ```

3. Use PM2 or similar to keep it running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "stock-app" -- start
   ```

---

## 🔄 Making Changes

### Add a New Stock

Edit `lib/stockData.ts`:

```typescript
export const stocks: Stock[] = [
  // ... existing stocks
  {
    symbol: "NEWSTOCK.NS",
    name: "New Stock Ltd",
    slug: "new-stock",
    price: 1000.00,
    change: 10.50,
    changePercent: 1.06,
    marketCap: "₹1L Cr",
    peRatio: 20.5,
    volume: "1M",
    weekHigh52: 1200.00,
    weekLow52: 800.00,
    sector: "Technology",
    sectorSlug: "it-stocks",
    overview: "Description here...",
    chartData: generateChartData(1000, true),
  },
];
```

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 160 84% 39%;  /* Change this */
  --background: 220 25% 6%;  /* Or this */
}
```

### Add a New Page

Create new file in `app/`:

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>About Us</h1>
    </main>
  );
}
```

Navigate to `/about` to see it.

---

## ❓ Troubleshooting Common Issues

### Issue 1: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

---

### Issue 2: Module Not Found Errors

**Error**: `Module not found: Can't resolve '@/components/...'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

### Issue 3: TypeScript Errors

**Error**: Various TypeScript errors

**Solution**:
```bash
# Check TypeScript config
cat tsconfig.json

# Restart TypeScript server in VSCode
# Press: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
# Type: "Restart TS Server"
```

---

### Issue 4: Styles Not Loading

**Error**: Page loads but looks broken (no styling)

**Solution**:
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev

# Clear Next.js cache
rm -rf .next
npm run dev
```

---

### Issue 5: Build Fails

**Error**: Build fails with errors

**Solution**:
```bash
# Check for TypeScript errors
npm run lint

# Try clean build
rm -rf .next
npm run build
```

---

## 🔐 Environment Variables (Optional)

If you want to add API keys or other secrets:

1. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=https://api.example.com
   SECRET_KEY=your-secret-key
   ```

2. Use in code:
   ```typescript
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   ```

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [React Query Docs](https://tanstack.com/query/latest)

---

## 🎓 Learning Path

If you're new to Next.js:

1. **Start here**: [Next.js Tutorial](https://nextjs.org/learn)
2. **Understand App Router**: [App Router Docs](https://nextjs.org/docs/app)
3. **Learn Tailwind**: [Tailwind Tutorial](https://tailwindcss.com/docs/utility-first)
4. **Practice**: Modify this project and experiment!

---

## 💡 Pro Tips

1. **Hot Reload**: Save any file and see changes instantly
2. **TypeScript**: Hover over variables to see types
3. **Tailwind IntelliSense**: Install VSCode extension for autocomplete
4. **Dev Tools**: Use React DevTools browser extension
5. **Git**: Commit often with descriptive messages

---

## ✅ Checklist

Before deploying:

- [ ] All pages load without errors
- [ ] Search functionality works
- [ ] Navigation works on mobile
- [ ] Charts render correctly
- [ ] Build completes successfully (`npm run build`)
- [ ] Environment variables configured (if needed)
- [ ] README updated with your info

---

**Need Help?** 

- Check the main README.md
- Review Next.js documentation
- Search for errors on Stack Overflow
- Review the original Lovable project for reference

**Happy Coding! 🎉**
