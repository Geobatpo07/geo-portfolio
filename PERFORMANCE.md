# Performance Optimization Checklist

## 1. Images & Media
- [ ] Use `next/image` for all static images.
- [ ] Enable `priority` prop for LCP images (e.g., Hero image).
- [ ] Use SVG for icons (Lucide React is already optimized).

## 2. Code Splitting & Imports
- [ ] Use `dynamic()` imports for heavy interactive components (Charts, Maps).
- [ ] Lazy load components below the fold.

```tsx
import dynamic from 'next/dynamic'
const CycloneChart = dynamic(() => import('@/components/visualizations/CycloneChart'), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false // If using browser-only APIs
})
```

## 3. Fonts
- [ ] Use `next/font` (already configured with Inter).
- [ ] Ensure `display: swap` is used to prevent FOIT.

## 4. React Best Practices
- [ ] Use `useCallback` and `useMemo` for expensive calculations (e.g., filtering lists).
- [ ] Avoid large layout shifts (CLS) by setting explicit dimensions on containers.

## 5. Build & Deploy
- [ ] Run `npm run build` to check for static generation errors.
- [ ] Analyze bundle size with `@next/bundle-analyzer` if needed.
