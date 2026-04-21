// Theme System for Scalix Design System
// Light and dark mode configurations with semantic color mappings

import { modernColors, semanticColors, colorUtils } from '../colors'
import { spacing, fontSize, fontWeight, lineHeight, borderRadius, shadows } from '../tokens'

export interface ThemeColors {
  // Base colors
  background: string
  foreground: string
  surface: string
  surfaceSecondary: string

  // Semantic colors
  primary: {
    50: string
    100: string
    500: string
    600: string
    900: string
  }
  secondary: {
    50: string
    100: string
    500: string
    600: string
    900: string
  }
  accent: {
    50: string
    100: string
    500: string
    600: string
    900: string
  }

  // Status colors
  success: string
  warning: string
  error: string
  info: string

  // Text colors
  text: {
    primary: string
    secondary: string
    tertiary: string
    inverse: string
  }

  // Border colors
  border: {
    light: string
    medium: string
    dark: string
  }
}

export interface Theme {
  name: string
  colors: ThemeColors
  spacing: typeof spacing
  fontSize: typeof fontSize
  fontWeight: typeof fontWeight
  lineHeight: typeof lineHeight
  borderRadius: typeof borderRadius
  shadows: typeof shadows
  mode: 'light' | 'dark' | 'auto'
}

// Light Theme
export const lightTheme: Theme = {
  name: 'Light',
  mode: 'light',
  colors: {
    background: modernColors.slate[50],
    foreground: modernColors.slate[900],
    surface: '#ffffff',
    surfaceSecondary: modernColors.slate[100],

    primary: {
      50: semanticColors.primary[50],
      100: semanticColors.primary[100],
      500: semanticColors.primary[500],
      600: semanticColors.primary[600],
      900: semanticColors.primary[900]
    },
    secondary: {
      50: semanticColors.secondary[50],
      100: semanticColors.secondary[100],
      500: semanticColors.secondary[500],
      600: semanticColors.secondary[600],
      900: semanticColors.secondary[900]
    },
    accent: {
      50: semanticColors.accent[50],
      100: semanticColors.accent[100],
      500: semanticColors.accent[500],
      600: semanticColors.accent[600],
      900: semanticColors.accent[900]
    },

    success: semanticColors.success[500],
    warning: semanticColors.warning[500],
    error: semanticColors.error[500],
    info: semanticColors.info[500],

    text: {
      primary: modernColors.slate[900],
      secondary: modernColors.slate[600],
      tertiary: modernColors.slate[400],
      inverse: '#ffffff'
    },

    border: {
      light: modernColors.slate[200],
      medium: modernColors.slate[300],
      dark: modernColors.slate[400]
    }
  },
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  shadows
}

// Dark Theme
export const darkTheme: Theme = {
  name: 'Dark',
  mode: 'dark',
  colors: {
    background: modernColors.slate[900],
    foreground: modernColors.slate[50],
    surface: modernColors.slate[800],
    surfaceSecondary: modernColors.slate[700],

    primary: {
      50: colorUtils.darken(semanticColors.primary[500], 20),
      100: colorUtils.darken(semanticColors.primary[400], 10),
      500: semanticColors.primary[400],
      600: semanticColors.primary[300],
      900: semanticColors.primary[200]
    },
    secondary: {
      50: colorUtils.darken(semanticColors.secondary[500], 20),
      100: colorUtils.darken(semanticColors.secondary[400], 10),
      500: semanticColors.secondary[400],
      600: semanticColors.secondary[300],
      900: semanticColors.secondary[200]
    },
    accent: {
      50: colorUtils.darken(semanticColors.accent[500], 20),
      100: colorUtils.darken(semanticColors.accent[400], 10),
      500: semanticColors.accent[400],
      600: semanticColors.accent[300],
      900: semanticColors.accent[200]
    },

    success: semanticColors.success[400],
    warning: semanticColors.warning[400],
    error: semanticColors.error[400],
    info: semanticColors.info[400],

    text: {
      primary: modernColors.slate[50],
      secondary: modernColors.slate[300],
      tertiary: modernColors.slate[400],
      inverse: modernColors.slate[900]
    },

    border: {
      light: modernColors.slate[700],
      medium: modernColors.slate[600],
      dark: modernColors.slate[500]
    }
  },
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  shadows
}

// Business Theme (Professional, corporate feel)
export const businessTheme: Theme = {
  ...lightTheme,
  name: 'Business',
  colors: {
    ...lightTheme.colors,
    primary: {
      50: modernColors.blue[50],
      100: modernColors.blue[100],
      500: modernColors.blue[500],
      600: modernColors.blue[600],
      900: modernColors.blue[900]
    },
    secondary: {
      50: modernColors.slate[50],
      100: modernColors.slate[100],
      500: modernColors.slate[500],
      600: modernColors.slate[600],
      900: modernColors.slate[900]
    },
    accent: {
      50: modernColors.teal[50],
      100: modernColors.teal[100],
      500: modernColors.teal[500],
      600: modernColors.teal[600],
      900: modernColors.teal[900]
    }
  }
}

// Consumer Theme (Vibrant, engaging feel)
export const consumerTheme: Theme = {
  ...darkTheme,
  name: 'Consumer',
  colors: {
    ...darkTheme.colors,
    primary: {
      50: modernColors.purple[50],
      100: modernColors.purple[100],
      500: modernColors.purple[500],
      600: modernColors.purple[600],
      900: modernColors.purple[900]
    },
    secondary: {
      50: modernColors.rose[50],
      100: modernColors.rose[100],
      500: modernColors.rose[500],
      600: modernColors.rose[600],
      900: modernColors.rose[900]
    },
    accent: {
      50: modernColors.emerald[50],
      100: modernColors.emerald[100],
      500: modernColors.emerald[500],
      600: modernColors.emerald[600],
      900: modernColors.emerald[900]
    }
  }
}

// E-commerce Theme (Trust-building, conversion-focused)
export const ecommerceTheme: Theme = {
  ...lightTheme,
  name: 'E-commerce',
  colors: {
    ...lightTheme.colors,
    primary: {
      50: modernColors.emerald[50],
      100: modernColors.emerald[100],
      500: modernColors.emerald[500],
      600: modernColors.emerald[600],
      900: modernColors.emerald[900]
    },
    secondary: {
      50: modernColors.teal[50],
      100: modernColors.teal[100],
      500: modernColors.teal[500],
      600: modernColors.teal[600],
      900: modernColors.teal[900]
    },
    accent: {
      50: modernColors.amber[50],
      100: modernColors.amber[100],
      500: modernColors.amber[500],
      600: modernColors.amber[600],
      900: modernColors.amber[900]
    }
  }
}

// Analytics Theme (Data-focused, insightful)
export const analyticsTheme: Theme = {
  ...lightTheme,
  name: 'Analytics',
  colors: {
    ...lightTheme.colors,
    primary: {
      50: modernColors.teal[50],
      100: modernColors.teal[100],
      500: modernColors.teal[500],
      600: modernColors.teal[600],
      900: modernColors.teal[900]
    },
    secondary: {
      50: modernColors.blue[50],
      100: modernColors.blue[100],
      500: modernColors.blue[500],
      600: modernColors.blue[600],
      900: modernColors.blue[900]
    },
    accent: {
      50: modernColors.amber[50],
      100: modernColors.amber[100],
      500: modernColors.amber[500],
      600: modernColors.amber[600],
      900: modernColors.amber[900]
    }
  }
}

// Theme registry
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  business: businessTheme,
  consumer: consumerTheme,
  ecommerce: ecommerceTheme,
  analytics: analyticsTheme
} as const

export type ThemeName = keyof typeof themes

// Theme utilities
export const themeUtils = {
  // Get theme by name
  getTheme: (name: ThemeName): Theme => themes[name],

  // Get all available themes
  getAllThemes: (): Theme[] => Object.values(themes),

  // Generate CSS custom properties for a theme
  generateCSSVariables: (theme: Theme): Record<string, string> => {
    const variables: Record<string, string> = {}

    // Colors
    variables['--background'] = theme.colors.background
    variables['--foreground'] = theme.colors.foreground
    variables['--surface'] = theme.colors.surface
    variables['--surface-secondary'] = theme.colors.surfaceSecondary

    variables['--primary-50'] = theme.colors.primary[50]
    variables['--primary-100'] = theme.colors.primary[100]
    variables['--primary-500'] = theme.colors.primary[500]
    variables['--primary-600'] = theme.colors.primary[600]
    variables['--primary-900'] = theme.colors.primary[900]

    variables['--secondary-50'] = theme.colors.secondary[50]
    variables['--secondary-100'] = theme.colors.secondary[100]
    variables['--secondary-500'] = theme.colors.secondary[500]
    variables['--secondary-600'] = theme.colors.secondary[600]
    variables['--secondary-900'] = theme.colors.secondary[900]

    variables['--accent-50'] = theme.colors.accent[50]
    variables['--accent-100'] = theme.colors.accent[100]
    variables['--accent-500'] = theme.colors.accent[500]
    variables['--accent-600'] = theme.colors.accent[600]
    variables['--accent-900'] = theme.colors.accent[900]

    variables['--success'] = theme.colors.success
    variables['--warning'] = theme.colors.warning
    variables['--error'] = theme.colors.error
    variables['--info'] = theme.colors.info

    variables['--text-primary'] = theme.colors.text.primary
    variables['--text-secondary'] = theme.colors.text.secondary
    variables['--text-tertiary'] = theme.colors.text.tertiary
    variables['--text-inverse'] = theme.colors.text.inverse

    variables['--border-light'] = theme.colors.border.light
    variables['--border-medium'] = theme.colors.border.medium
    variables['--border-dark'] = theme.colors.border.dark

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      variables[`--space-${key}`] = value
    })

    // Font sizes
    Object.entries(theme.fontSize).forEach(([key, value]) => {
      variables[`--font-${key}`] = value
    })

    // Border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      variables[`--radius-${key}`] = value
    })

    return variables
  },

  // Apply theme to document
  applyTheme: (themeName: ThemeName): void => {
    const theme = themes[themeName]
    const variables = themeUtils.generateCSSVariables(theme)

    // Apply to document root
    Object.entries(variables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })

    // Set data attribute for theme
    document.documentElement.setAttribute('data-theme', themeName)
  },

  // Get theme from user preferences
  getPreferredTheme: (): ThemeName => {
    if (typeof window === 'undefined') return 'light'

    const saved = localStorage.getItem('scalix-theme') as ThemeName
    if (saved && themes[saved]) return saved

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  },

  // Watch for system theme changes
  watchSystemTheme: (callback: (theme: ThemeName) => void): (() => void) => {
    if (typeof window === 'undefined') return () => {}

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'dark' : 'light'
      callback(theme)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }
}

// Export default only
export default themes
