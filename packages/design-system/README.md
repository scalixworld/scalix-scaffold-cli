# @scalix-world/design-system

**The Most Comprehensive Design System for Scalix World Applications**

A production-ready design system featuring **385 colors** across **35 palettes**, **80+ icons**, **50+ design tokens**, and **6 complete themes** - the official design system powering Scalix World scaffold templates.

## 🌟 **Key Highlights**
- **🎨 35 Unique Color Palettes** (385 individual colors) across 7 categories
- **🎯 80+ Curated Icons** organized by function and purpose
- **📏 50+ Design Tokens** for spacing, typography, shadows, and more
- **🎭 6 Complete Themes** including light, dark, and industry-specific
- **🔧 Advanced Utilities** for color manipulation, theme management, and accessibility
- **📦 Production Ready** with TypeScript, tree shaking, and zero runtime dependencies
- **🏢 Scalix World Branded** - Official design system for all Scalix World applications

## 🚀 Features

### **🎨 Modern Color System**
- **Semantic Colors**: Primary, secondary, accent, success, warning, error, info
- **Color Scales**: 11-step scales (50-950) for fine-grained control
- **Theme Support**: Light, dark, and app-specific themes
- **Accessibility**: WCAG compliant color combinations
- **Utility Functions**: Color manipulation and contrast checking

### **🎯 Comprehensive Icon Library**
- **80+ Icons**: Curated selection from Lucide React
- **Organized Categories**: Navigation, business, actions, status, content
- **Consistent Sizing**: Standardized icon sizes and weights
- **Type-Safe**: Full TypeScript support with proper typing
- **Utility Functions**: Icon search, categorization, and helpers

### **📏 Design Tokens**
- **Spacing Scale**: 16-step spacing system (0-64)
- **Typography**: Font sizes, weights, line heights, letter spacing
- **Border Radius**: Consistent corner rounding (none, sm, md, lg, xl, 2xl, 3xl, full)
- **Shadows**: 6 shadow levels (none, sm, md, lg, xl, 2xl, inner)
- **Z-Index**: Proper layering with 10 levels

### **🎭 Theme Management**
- **Multiple Themes**: Light, dark, business, consumer, ecommerce, analytics
- **CSS Variables**: Automatic CSS custom property generation
- **System Integration**: Respects user's system dark mode preference
- **Runtime Switching**: Dynamic theme switching without page reload
- **Persistent Settings**: Theme preferences stored in localStorage

## 📦 Installation

```bash
# Install the design system package
npm install @scalix/design-system

# Peer dependencies (already included in templates)
npm install react lucide-react
```

## 🎨 Usage

### **Colors**

```typescript
import { modernColors, semanticColors, themeColors } from '@scalix/design-system'

// Access color scales
const primaryColor = modernColors.blue[500]        // #3b82f6
const errorColor = semanticColors.error[500]       // #f43f5e

// Use theme colors
const backgroundColor = themeColors.business.background  // Professional theme
```

### **Icons**

```typescript
import { icons, Icon, iconUtils } from '@scalix/design-system'

// Direct icon usage
const HomeIcon = icons.home

// Icon component with props
<Icon name="search" size={20} className="text-blue-500" />

// Icon utilities
const navIcons = iconUtils.getNavigationIcons()
const statusIcons = iconUtils.getStatusIcons()
```

### **Design Tokens**

```typescript
import { spacing, fontSize, borderRadius, shadows } from '@scalix/design-system'

// Use in components
<div style={{
  padding: spacing[4],           // 1rem
  fontSize: fontSize.lg,         // 1.125rem
  borderRadius: borderRadius.md, // 0.375rem
  boxShadow: shadows.md
}}>
  Content
</div>
```

### **Themes**

```typescript
import { themes, themeUtils } from '@scalix/design-system'

// Apply a theme
themeUtils.applyTheme('dark')

// Get current theme
const currentTheme = themeUtils.getPreferredTheme()

// Generate CSS variables
const cssVars = themeUtils.generateCSSVariables(themes.business)
// Apply to document root or use in CSS-in-JS
```

## 🎨 Comprehensive Color System

### **📊 Scale Statistics**
- **🎨 35 Unique Color Palettes** across 7 categories
- **🎯 385 Individual Colors** (35 palettes × 11 shades each)
- **🏷️ 7 Organized Collections** (Primary, Trends, Industries, Nature, Brands, Emotions, Specialty)
- **♿ Accessibility Compliant** (4.5:1 contrast ratios)
- **📱 Responsive Design** ready

### **🏗️ Color Collections**

#### **Primary Working Palettes** (Core colors for most apps)
```typescript
// Professional & Trustworthy
modernColors.blue[500]     // #3b82f6 - Primary actions, links
modernColors.purple[500]   // #a855f7 - Secondary elements
modernColors.teal[500]     // #14b8a6 - Accent features
modernColors.emerald[500]  // #10b981 - Success states
```

#### **Industry-Specific Palettes** (Tailored for business types)
```typescript
// Technology/SaaS
colorCollections.industries.tech[500]     // #0ea5e9

// Finance & Banking
colorCollections.industries.finance[500]  // #22c55e

// Healthcare & Medical
colorCollections.industries.health[500]   // #ec4899

// Education & Learning
colorCollections.industries.education[500] // #eab308

// E-commerce & Retail
colorCollections.industries.retail[500]   // #ef4444

// Entertainment & Media
colorCollections.industries.entertainment[500] // #d946ef
```

#### **Trend & Style Palettes** (Modern design trends)
```typescript
// Neon/Cyberpunk (2024 Trend)
modernColors.neon[500]    // #0ea5e9 - Electric blue
modernColors.neon[400]    // #38bdf8 - Bright cyan

// Pastel/Dreamy (Soft & approachable)
modernColors.pastel[500]  // #d946ef - Soft magenta
modernColors.pastel[300]  // #f0abfc - Light lavender

// Monochromatic (Minimal & elegant)
modernColors.mono[500]    // #737373 - Balanced gray
modernColors.mono[200]    // #e5e5e5 - Light neutral

// Luxury/Premium (High-end feel)
modernColors.luxury[500]  // #d946ef - Rich purple
modernColors.luxury[700]  // #a21caf - Deep plum
```

#### **Nature & Environmental Palettes** (Organic & calming)
```typescript
// Forest & Growth
modernColors.forest[500]  // #22c55e - Fresh green
modernColors.forest[600]  // #16a34a - Deep forest

// Ocean & Calm
modernColors.ocean[500]   // #0ea5e9 - Ocean blue
modernColors.ocean[400]   // #38bdf8 - Sky blue

// Sunset & Warmth
modernColors.sunset[500]  // #f97316 - Warm orange
modernColors.sunset[600]  // #ea580c - Deep sunset

// Earth & Grounded
modernColors.earth[500]   // #78716c - Warm stone
modernColors.earth[600]   // #57534e - Deep earth
```

#### **Brand-Inspired Palettes** (Familiar & trustworthy)
```typescript
// Google Material Design
modernColors.google[500]  // #ff9800 - Google Orange
modernColors.google[700]  // #f57c00 - Deep Orange

// Apple iOS
modernColors.apple[500]   // #64748b - Apple Gray
modernColors.apple[600]   // #475569 - Deep Gray

// Microsoft Fluent
modernColors.microsoft[500] // #a19f9d - Neutral Gray
modernColors.microsoft[600] // #797775 - Dark Gray
```

#### **Emotional & Psychological Palettes** (User experience driven)
```typescript
// Trust & Security (Banking, Finance)
modernColors.trust[500]   // #0ea5e9 - Reliable blue

// Energy & Action (Fitness, Social)
modernColors.action[500]  // #ef4444 - Motivating red

// Growth & Success (Business, Education)
modernColors.growth[500]  // #22c55e - Positive green

// Creativity & Innovation (Design, Creative)
modernColors.creative[500] // #d946ef - Inspiring purple

// Calm & Focus (Productivity, Health)
modernColors.calm[500]    // #64748b - Peaceful gray

// Joy & Celebration (Gaming, Social)
modernColors.joy[500]     // #eab308 - Happy yellow
```

#### **Specialty Palettes** (Accessibility & edge cases)
```typescript
// High Contrast (Accessibility)
modernColors.contrast[900]  // #000000 - Pure black
modernColors.contrast[50]   // #ffffff - Pure white

// Color Blind Friendly
modernColors.accessible[500] // #0ea5e9 - Blue (universally visible)

// Warm Neutrals (Cozy, inviting)
modernColors.warm[500]    // #b08968 - Warm taupe

// Cool Neutrals (Modern, clean)
modernColors.cool[500]    // #4a5d7a - Cool slate

// Minimalist (Clean, distraction-free)
modernColors.minimal[500] // #d4d4d4 - Soft gray

// Zen/Calming (Meditation, wellness)
modernColors.zen[500]     // #64748b - Tranquil gray
```

### **Semantic Color Usage**

```typescript
// Use semantic colors for consistent theming
const buttonStyles = {
  primary: {
    backgroundColor: semanticColors.primary[500],
    color: 'white'
  },
  secondary: {
    backgroundColor: semanticColors.secondary[100],
    color: semanticColors.secondary[900],
    borderColor: semanticColors.secondary[300]
  },
  success: {
    backgroundColor: semanticColors.success[500],
    color: 'white'
  },
  error: {
    backgroundColor: semanticColors.error[500],
    color: 'white'
  }
}
```

### **Theme-Specific Colors**

```typescript
// Business applications (professional)
themeColors.business.primary    // Blue tones
themeColors.business.secondary  // Slate grays
themeColors.business.accent     // Teal accents

// Consumer applications (vibrant)
themeColors.consumer.primary    // Purple tones
themeColors.consumer.secondary  // Rose pinks
themeColors.consumer.accent     // Emerald greens

// E-commerce applications (trust-building)
themeColors.ecommerce.primary   // Emerald greens
themeColors.ecommerce.secondary // Teal blues
themeColors.ecommerce.accent    // Amber warnings

// Analytics applications (data-focused)
themeColors.analytics.primary   // Teal blues
themeColors.analytics.secondary // Blue tones
themeColors.analytics.accent    // Amber highlights
```

## 🎯 Icon Library

### **Icon Categories**

#### **Navigation & UI**
```typescript
icons.home           // Home page
icons.menu           // Mobile menu
icons.close          // Close modal
icons.chevronLeft    // Back navigation
icons.search         // Search functionality
```

#### **Business & Analytics**
```typescript
icons.barChart       // Data visualization
icons.pieChart       // Pie charts
icons.trendingUp     // Growth indicators
icons.dollar         // Financial data
icons.target         // Goals/KPIs
icons.activity       // Real-time metrics
```

#### **Actions**
```typescript
icons.plus           // Add/Create
icons.edit           // Modify
icons.delete         // Remove
icons.save           // Persist changes
icons.download       // Export data
icons.refresh        // Reload/Update
```

#### **Status & Feedback**
```typescript
icons.checkCircle    // Success states
icons.alertTriangle  // Warnings
icons.xCircle        // Error states
icons.info           // Information
icons.star           // Ratings/Favorites
```

#### **Content & Media**
```typescript
icons.image          // Photos/Images
icons.video          // Videos
icons.file           // Documents
icons.camera         // Photography
icons.music          // Audio content
```

### **Icon Component Usage**

```tsx
// Basic usage
<Icon name="search" />

// With custom props
<Icon
  name="heart"
  size={24}
  color="#ef4444"
  className="hover:scale-110 transition-transform"
/>

// Conditional rendering
{isLoading ? (
  <Icon name="refresh" className="animate-spin" />
) : (
  <Icon name="checkCircle" />
)}
```

### **Icon Utilities**

```typescript
// Get icons by category
const navIcons = iconUtils.getNavigationIcons()
const actionIcons = iconUtils.getActionIcons()
const statusIcons = iconUtils.getStatusIcons()

// Search icons
const searchResults = iconUtils.searchIcons('arrow')

// Get specific icon
const HomeIcon = iconUtils.getIcon('home')
```

## 📏 Design Tokens

### **Spacing Scale**
```typescript
spacing[0]   // 0px
spacing[1]   // 0.25rem (4px)
spacing[2]   // 0.5rem (8px)
spacing[4]   // 1rem (16px)
spacing[8]   // 2rem (32px)
spacing[16]  // 4rem (64px)
spacing[32]  // 8rem (128px)
```

### **Typography Scale**
```typescript
fontSize.xs    // 0.75rem (12px)
fontSize.sm    // 0.875rem (14px)
fontSize.base  // 1rem (16px)
fontSize.lg    // 1.125rem (18px)
fontSize.xl    // 1.25rem (20px)
fontSize['2xl'] // 1.5rem (24px)
fontSize['3xl'] // 1.875rem (30px)

fontWeight.light     // 300
fontWeight.normal    // 400
fontWeight.medium    // 500
fontWeight.semibold  // 600
fontWeight.bold      // 700
```

### **Border Radius**
```typescript
borderRadius.none   // 0px
borderRadius.sm     // 0.125rem (2px)
borderRadius.md     // 0.375rem (6px)
borderRadius.lg     // 0.5rem (8px)
borderRadius.xl     // 0.75rem (12px)
borderRadius['2xl'] // 1rem (16px)
borderRadius.full   // 9999px
```

### **Shadows**
```typescript
shadows.none    // No shadow
shadows.sm      // Subtle shadow
shadows.md      // Medium shadow
shadows.lg      // Large shadow
shadows.xl      // Extra large shadow
shadows['2xl']  // Maximum shadow
shadows.inner   // Inner shadow
```

## 🎭 Theme System

### **Available Themes**
```typescript
import { themes } from '@scalix/design-system'

themes.light      // Clean, bright theme
themes.dark       // Dark mode theme
themes.business   // Professional, corporate
themes.consumer   // Vibrant, engaging
themes.ecommerce  // Trust-building
themes.analytics  // Data-focused
```

### **Theme Application**
```typescript
// Apply theme globally
themeUtils.applyTheme('dark')

// React to system changes
useEffect(() => {
  const handleThemeChange = (theme: string) => {
    themeUtils.applyTheme(theme as ThemeName)
  }

  const unsubscribe = themeUtils.watchSystemTheme(handleThemeChange)
  return unsubscribe
}, [])

// Generate CSS variables
const cssVariables = themeUtils.generateCSSVariables(themes.business)
// Use in CSS-in-JS or apply to document
```

### **Custom Theme Creation**
```typescript
const customTheme: Theme = {
  name: 'Custom',
  mode: 'light',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
    surface: '#f8fafc',
    surfaceSecondary: '#f1f5f9',
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a'
    },
    // ... other color definitions
  },
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  shadows
}
```

## 🔧 Utility Functions

### **Color Utilities**
```typescript
import { colorUtils } from '@scalix/design-system'

// Add opacity to colors
const transparentBlue = colorUtils.withOpacity('#3b82f6', 0.5)

// Lighten/darken colors
const lighterBlue = colorUtils.lighten('#3b82f6', 20)
const darkerBlue = colorUtils.darken('#3b82f6', 20)

// Get contrast color
const textColor = colorUtils.getContrastColor('#3b82f6') // Returns white

// Check contrast ratio
const hasGoodContrast = colorUtils.meetsContrastRatio('#000000', '#ffffff', 4.5)
```

### **Token Utilities**
```typescript
import { tokenUtils } from '@scalix/design-system'

// Convert spacing to pixels
const spacingInPx = tokenUtils.spacingToPx(4) // 64

// Generate responsive spacing
const responsiveSpacing = tokenUtils.responsiveSpacing(2, 4) // { base: '0.5rem', md: '1rem' }

// Generate CSS variables
const cssVars = tokenUtils.generateCSSVariables()
// Apply to your CSS framework
```

## 🎯 Integration Examples

### **With Tailwind CSS**
```javascript
// tailwind.config.js
const { modernColors, spacing, fontSize } = require('@scalix/design-system')

module.exports = {
  theme: {
    extend: {
      colors: modernColors,
      spacing,
      fontSize
    }
  }
}
```

### **With Styled Components**
```tsx
import styled from 'styled-components'
import { modernColors, spacing, borderRadius } from '@scalix/design-system'

const Button = styled.button`
  background-color: ${modernColors.blue[500]};
  color: white;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.md};
  border: none;

  &:hover {
    background-color: ${modernColors.blue[600]};
  }
`
```

### **With CSS Modules**
```css
/* styles.module.css */
@import '@scalix/design-system/colors.css';

.button {
  background-color: var(--blue-500);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
}

.button:hover {
  background-color: var(--blue-600);
}
```

## 📊 Comprehensive Design System Stats

### **🎨 Massive Color Library: 35 Unique Palettes**
- **🎨 35 Unique Color Palettes** across 7 organized categories
- **🎯 385 Individual Colors** (35 palettes × 11 shades = 385 colors)
- **🏷️ 7 Color Collections**: Primary, Trends, Industries, Nature, Brands, Emotions, Specialty
- **♿ Accessibility Compliant**: All palettes meet WCAG AA contrast requirements
- **📱 Responsive Design**: Optimized for all screen sizes and devices
- **🏢 Industry-Specific**: Tech, finance, healthcare, education, retail palettes
- **🌟 Trend-Driven**: Neon, pastel, monochromatic, luxury color schemes
- **🏷️ Brand-Inspired**: Google, Apple, Microsoft color philosophies

### **🎯 Icons: 80+ Icons in Organized Categories**
- **🧭 Navigation**: Home, menu, arrows, search, back/forward (10 icons)
- **💼 Business**: Charts, analytics, finance, commerce icons (15 icons)
- **⚡ Actions**: Add, edit, delete, save, download, upload (12 icons)
- **📊 Status**: Success, error, warning, info, loading states (10 icons)
- **📱 Content**: Images, video, audio, documents, media (8 icons)
- **🔧 Development**: Code, terminal, tools, settings (8 icons)
- **🌿 Nature**: Environment, weather, organic elements (6 icons)
- **🔐 Security**: Locks, shields, authentication (5 icons)
- **🎨 Type-Safe**: Full TypeScript support with Lucide React
- **🔍 Searchable**: Programmatic icon access and categorization

### **📏 Tokens: 50+ Design Tokens**
- **📐 Spacing**: 16-step scale (0px to 256px) for consistent layouts
- **📝 Typography**: 8 font sizes, 9 weights, 6 line heights for hierarchy
- **🔲 Border Radius**: 8 radius options (none to 3xl) for modern corners
- **🎭 Shadows**: 6 shadow depths (none to 2xl + inner) for depth perception
- **📊 Z-Index**: 10 layering levels for complex component stacking
- **📱 Breakpoints**: 5 responsive breakpoints (sm to 2xl) for all devices
- **⏱️ Animations**: 3 durations, 3 easing functions, 3 keyframes for motion
- **🔧 Utility Functions**: Spacing conversion, CSS generation, validation

### **🎭 Themes: 6 Complete Theme Configurations**
- **💼 Business**: Professional, corporate theme for enterprise apps
- **👥 Consumer**: Vibrant, engaging theme for social/media apps
- **🛒 E-commerce**: Trust-building theme for online stores
- **📊 Analytics**: Data-focused theme for dashboards and BI tools
- **☀️ Light**: Clean, bright default theme for web applications
- **🌙 Dark**: Modern dark mode theme respecting system preferences
- **🎨 CSS Variables**: Automatic theme application with custom properties
- **🔄 Runtime Switching**: Dynamic theme changes without page reload

### **🔧 Utilities: Color Manipulation, Theme Management, Icon Helpers**
- **🎨 Color Utils**: Opacity adjustment, lighten/darken, contrast checking
- **🎭 Theme Utils**: Apply themes, detect preferences, generate CSS variables
- **🎯 Icon Utils**: Search icons, get by category, programmatic access
- **📏 Token Utils**: Spacing conversion, CSS generation, validation
- **♿ Accessibility**: Contrast ratio validation, readable color combinations
- **🔄 System Integration**: Automatic dark mode detection and switching
- **💾 Persistence**: Theme preferences stored in localStorage

## 📦 Performance & Bundle

- **Tree Shaking**: Only import what you use
- **Optimized Bundle**: Core system ~35KB gzipped (with comprehensive color library)
- **Zero Runtime Dependencies**: Only peer dependencies on React/Lucide
- **TypeScript Optimized**: Full type safety with minimal overhead
- **Lazy Loading Ready**: Components load on demand

## 🌟 Best Practices

### **Color Usage**
1. Use semantic colors for UI elements (buttons, links, status)
2. Use theme colors for consistent theming
3. Ensure 4.5:1 contrast ratio for accessibility
4. Test color combinations in both light and dark themes

### **Icon Usage**
1. Use consistent icon sizes within the same context
2. Choose icons that clearly communicate their purpose
3. Use icon utilities for programmatic icon selection
4. Consider accessibility with proper alt text

### **Token Usage**
1. Use spacing tokens for consistent layouts
2. Use typography tokens for readable text hierarchy
3. Use shadow tokens for consistent depth perception
4. Use border radius tokens for cohesive corner styles

### **Theme Usage**
1. Respect user's system theme preference
2. Provide manual theme switching options
3. Persist theme preferences across sessions
4. Test themes in all supported modes

## 🔄 Migration Guide

### **From Custom Design Systems**
```typescript
// Before
const colors = {
  primary: '#3b82f6',
  secondary: '#64748b'
}

// After
import { semanticColors } from '@scalix/design-system'
const colors = {
  primary: semanticColors.primary[500],
  secondary: semanticColors.secondary[500]
}
```

### **From Other Icon Libraries**
```typescript
// Before
import { Search, Heart } from 'react-feather'

// After
import { Icon } from '@scalix/design-system'
<Icon name="search" />
<Icon name="heart" />
```

## 📚 API Reference

### **Color Exports**
- `modernColors` - Raw color scales
- `semanticColors` - Semantic color mappings
- `themeColors` - Theme-specific color palettes
- `colorUtils` - Color manipulation functions

### **Icon Exports**
- `icons` - Flat icon registry
- `iconCategories` - Categorized icon groups
- `Icon` - React icon component
- `iconUtils` - Icon utility functions

### **Token Exports**
- `spacing` - Spacing scale
- `fontSize` - Font size scale
- `fontWeight` - Font weight scale
- `lineHeight` - Line height scale
- `borderRadius` - Border radius scale
- `shadows` - Shadow scale
- `typography` - Typography settings
- `zIndex` - Z-index scale
- `tokenUtils` - Token utility functions

### **Theme Exports**
- `themes` - Available themes
- `themeUtils` - Theme management functions
- `Theme` interface - Theme type definition

## 🤝 Contributing

1. Follow the established color naming conventions
2. Add icons to appropriate categories
3. Test color combinations for accessibility
4. Update documentation for new additions
5. Ensure TypeScript types are properly defined

---

**Built with ❤️ for the Scalix Scaffold System**

*Empowering developers to create beautiful, consistent, and accessible user interfaces.*
