// Design Tokens for Scalix Design System
// Consistent spacing, typography, shadows, and other design elements

export interface SpacingScale {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
  32: string
  40: string
  48: string
  56: string
  64: string
}

export interface FontSizeScale {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
}

export interface FontWeightScale {
  thin: number
  extralight: number
  light: number
  normal: number
  medium: number
  semibold: number
  bold: number
  extrabold: number
  black: number
}

export interface LineHeightScale {
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  none: string
  tight: string
  snug: string
  normal: string
  relaxed: string
  loose: string
}

export interface BorderRadiusScale {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  full: string
}

export interface ShadowScale {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
}

// Design Tokens
export const spacing: SpacingScale = {
  0: '0px',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem'      // 256px
}

export const fontSize: FontSizeScale = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem'  // 60px
}

export const fontWeight: FontWeightScale = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
}

export const lineHeight: LineHeightScale = {
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2'
}

export const borderRadius: BorderRadiusScale = {
  none: '0px',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
}

export const shadows: ShadowScale = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
}

// Typography scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Georgia', 'Cambria', 'serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace']
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
}

// Animation tokens
export const animations = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },

  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  keyframes: {
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite'
  }
}

// Z-index scale for layering
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070
}

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Utility functions
export const tokenUtils = {
  // Convert spacing to pixels
  spacingToPx: (value: keyof SpacingScale): number => {
    return parseFloat(spacing[value]) * 16 // Assuming 1rem = 16px
  },

  // Get responsive spacing
  responsiveSpacing: (mobile: keyof SpacingScale, desktop: keyof SpacingScale) => ({
    base: spacing[mobile],
    md: spacing[desktop]
  }),

  // Generate spacing scale for margins/padding
  generateSpacingClasses: () => {
    const classes: Record<string, string> = {}
    Object.entries(spacing).forEach(([key, value]) => {
      classes[`space-${key}`] = value
      classes[`m-${key}`] = value
      classes[`p-${key}`] = value
    })
    return classes
  },

  // Get optimal text color for background
  getContrastColor: (backgroundColor: string): string => {
    // Simple luminance calculation
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  },

  // Generate CSS custom properties
  generateCSSVariables: () => {
    const variables: Record<string, string> = {}

    // Spacing
    Object.entries(spacing).forEach(([key, value]) => {
      variables[`--spacing-${key}`] = value
    })

    // Colors (would need to import from colors)
    // Object.entries(colors).forEach(([colorName, colorScale]) => {
    //   Object.entries(colorScale).forEach(([shade, value]) => {
    //     variables[`--color-${colorName}-${shade}`] = value
    //   })
    // })

    return variables
  }
}

// Export default only
export default {
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  shadows,
  typography,
  animations,
  zIndex,
  breakpoints,
  utils: tokenUtils
}
