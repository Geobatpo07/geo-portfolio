# Portfolio Additions Integration Guide

I've added several new components and features to your project. Here is how to use them.

## 1. Hero Variants
You have 3 new Hero components in `src/components/hero/`:
- `HeroMinimal`: Clean, Vercel-style.
- `HeroGradient`: Modern, 3D text with gradients.
- `HeroData`: Interactive particle background.

**To use one:**
Open `src/app/page.tsx` and import the desired variant:

```tsx
import { HeroData } from "@/components/hero/HeroData"

export default function Home() {
  return (
    <main>
      <HeroData /> 
      {/* ... rest of your page */}
    </main>
  )
}
```

## 2. Skills Section
The interactive skills section is in `src/components/skills/SkillsSection.tsx`.
Add it to your `About` page or `Home` page:

```tsx
import { SkillsSection } from "@/components/skills/SkillsSection"

<SkillsSection />
```

## 3. MDX Case Studies
New case studies live in `src/content/projects/`.
- Template: `src/content/projects/templates/case-study.mdx`
- Example: `src/content/projects/recommender-system.mdx`

To create a new one, copy the template and fill it out.

## 4. Data Visualizations
Interactive charts are in `src/components/visualizations/`.
You can embed them in MDX files using the `<InteractiveChart />` or `<CycloneChart />` components (ensure they are added to `mdx-components.tsx` if you want to use them directly in MDX).

**Example usage in React:**
```tsx
import { TextSimilarityDemo } from "@/components/visualizations/TextSimilarityDemo"

<TextSimilarityDemo />
```
