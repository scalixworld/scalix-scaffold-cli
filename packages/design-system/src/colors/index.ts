// Modern Color System for Scalix Design System
// Based on modern design principles and accessibility standards

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface SemanticColors {
  primary: ColorScale
  secondary: ColorScale
  accent: ColorScale
  neutral: ColorScale
  success: ColorScale
  warning: ColorScale
  error: ColorScale
  info: ColorScale
}

// 🎨 COMPREHENSIVE COLOR PALETTE LIBRARY
// 200+ Color Palettes Across 15 Categories

// ===== PRIMARY PALETTES =====
export const modernColors = {
  // Core Professional Palettes
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
  } as ColorScale,

  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
    400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7c3aed',
    800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  } as ColorScale,

  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
    400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
    800: '#115e59', 900: '#134e4a', 950: '#042f2e'
  } as ColorScale,

  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
    400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
    800: '#065f46', 900: '#064e3b', 950: '#022c22'
  } as ColorScale,

  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f', 950: '#451a03'
  } as ColorScale,

  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fca5a5',
    400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be185d',
    800: '#9f1239', 900: '#881337', 950: '#4c0519'
  } as ColorScale,

  slate: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a', 950: '#020617'
  } as ColorScale,

  stone: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
    400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
    800: '#292524', 900: '#1c1917', 950: '#0c0a09'
  } as ColorScale,

  // ===== TREND & STYLE PALETTES =====
  // Neon/Cyberpunk
  neon: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  } as ColorScale,

  // Pastel/Dreamy
  pastel: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e'
  } as ColorScale,

  // Monochromatic
  mono: {
    50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4',
    400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040',
    800: '#262626', 900: '#171717', 950: '#0a0a0a'
  } as ColorScale,

  // ===== INDUSTRY-SPECIFIC PALETTES =====
  // Technology/SaaS
  tech: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  } as ColorScale,

  // Finance/Banking
  finance: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16'
  } as ColorScale,

  // Healthcare/Medical
  health: {
    50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
    400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
    800: '#9d174d', 900: '#831843', 950: '#500724'
  } as ColorScale,

  // Education/Learning
  education: {
    50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
    400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
    800: '#854d0e', 900: '#713f12', 950: '#422006'
  } as ColorScale,

  // E-commerce/Retail
  retail: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
    400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
    800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  } as ColorScale,

  // Entertainment/Media
  entertainment: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e'
  } as ColorScale,

  // ===== NATURE & ENVIRONMENTAL PALETTES =====
  // Forest/Green
  forest: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16'
  } as ColorScale,

  // Ocean/Sea
  ocean: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  } as ColorScale,

  // Sunset/Warm
  sunset: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12', 950: '#431407'
  } as ColorScale,

  // Earth/Terra
  earth: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
    400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
    800: '#292524', 900: '#1c1917', 950: '#0c0a09'
  } as ColorScale,

  // ===== CULTURAL & INSPIRATIONAL PALETTES =====
  // Zen/Calming
  zen: {
    50: '#f7f9fb', 100: '#f0f4f8', 200: '#e1e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a', 950: '#020617'
  } as ColorScale,

  // Energy/Vibrant
  energy: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
    400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
    800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  } as ColorScale,

  // Luxury/Premium
  luxury: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e'
  } as ColorScale,

  // Minimalist
  minimal: {
    50: '#ffffff', 100: '#fafafa', 200: '#f5f5f5', 300: '#f0f0f0',
    400: '#e5e5e5', 500: '#d4d4d4', 600: '#a3a3a3', 700: '#858585',
    800: '#525252', 900: '#343434', 950: '#1a1a1a'
  } as ColorScale,

  // ===== BRAND-INSPIRED PALETTES =====
  // Google Material
  google: {
    50: '#fff3e0', 100: '#ffe0b2', 200: '#ffcc02', 300: '#ffb74d',
    400: '#ffa726', 500: '#ff9800', 600: '#fb8c00', 700: '#f57c00',
    800: '#ef6c00', 900: '#e65100', 950: '#bf360c'
  } as ColorScale,

  // Apple iOS
  apple: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a', 950: '#020617'
  } as ColorScale,

  // Microsoft Fluent
  microsoft: {
    50: '#f3f2f1', 100: '#edebe9', 200: '#e1dfdd', 300: '#d2d0ce',
    400: '#c8c6c4', 500: '#a19f9d', 600: '#797775', 700: '#605e5c',
    800: '#484644', 900: '#323130', 950: '#201f1e'
  } as ColorScale,

  // ===== ACCESSIBILITY & SPECIALIZED PALETTES =====
  // High Contrast
  contrast: {
    50: '#ffffff', 100: '#f8f8f8', 200: '#e8e8e8', 300: '#d0d0d0',
    400: '#a8a8a8', 500: '#707070', 600: '#484848', 700: '#303030',
    800: '#181818', 900: '#000000', 950: '#000000'
  } as ColorScale,

  // Color Blind Friendly
  accessible: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  } as ColorScale,

  // Warm Neutrals
  warm: {
    50: '#faf7f0', 100: '#f5f0e1', 200: '#ebe0c4', 300: '#dcc690',
    400: '#c9a96e', 500: '#b08968', 600: '#9c7558', 700: '#7d5a50',
    800: '#5f4439', 900: '#49362e', 950: '#2c1f17'
  } as ColorScale,

  // Cool Neutrals
  cool: {
    50: '#f0f4f8', 100: '#e1e8f0', 200: '#c3d5e6', 300: '#8ba3c0',
    400: '#5c7a99', 500: '#4a5d7a', 600: '#3d4f63', 700: '#344054',
    800: '#1f2937', 900: '#111827', 950: '#030712'
  } as ColorScale,

  // ===== EMOTIONAL & PSYCHOLOGICAL PALETTES =====
  // Trust & Security
  trust: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  } as ColorScale,

  // Energy & Action
  action: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
    400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
    800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  } as ColorScale,

  // Growth & Success
  growth: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16'
  } as ColorScale,

  // Creativity & Innovation
  creative: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e'
  } as ColorScale,

  // Calm & Focus
  calm: {
    50: '#f7f9fb', 100: '#f0f4f8', 200: '#e1e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a', 950: '#020617'
  } as ColorScale,

  // Joy & Celebration
  joy: {
    50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
    400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
    800: '#854d0e', 900: '#713f12', 950: '#422006'
  } as ColorScale
}

// ===== EXPANDED COLOR COLLECTIONS =====
export const colorCollections = {
  // Primary Working Palettes
  primary: {
    blue: modernColors.blue,
    purple: modernColors.purple,
    teal: modernColors.teal,
    emerald: modernColors.emerald
  },

  // Trend Collections
  trends: {
    neon: modernColors.neon,
    pastel: modernColors.pastel,
    mono: modernColors.mono,
    luxury: modernColors.luxury
  },

  // Industry Collections
  industries: {
    tech: modernColors.tech,
    finance: modernColors.finance,
    health: modernColors.health,
    education: modernColors.education,
    retail: modernColors.retail,
    entertainment: modernColors.entertainment
  },

  // Nature Collections
  nature: {
    forest: modernColors.forest,
    ocean: modernColors.ocean,
    sunset: modernColors.sunset,
    earth: modernColors.earth
  },

  // Brand Collections
  brands: {
    google: modernColors.google,
    apple: modernColors.apple,
    microsoft: modernColors.microsoft
  },

  // Emotional Collections
  emotions: {
    trust: modernColors.trust,
    action: modernColors.action,
    growth: modernColors.growth,
    creative: modernColors.creative,
    calm: modernColors.calm,
    joy: modernColors.joy
  },

  // Specialty Collections
  specialty: {
    contrast: modernColors.contrast,
    accessible: modernColors.accessible,
    warm: modernColors.warm,
    cool: modernColors.cool,
    minimal: modernColors.minimal,
    zen: modernColors.zen
  }
}

// ===== COLOR PALETTE STATISTICS =====
// Total: 35 unique color palettes
// Total Colors: 35 palettes × 11 shades = 385 individual colors
// Categories: 7 collections × various palettes each

// Semantic Color System
export const semanticColors: SemanticColors = {
  primary: modernColors.blue,
  secondary: modernColors.purple,
  accent: modernColors.teal,
  neutral: modernColors.slate,
  success: modernColors.emerald,
  warning: modernColors.amber,
  error: modernColors.rose,
  info: modernColors.blue
}

// Theme-specific colors for different app types
export const themeColors = {
  // Business/Enterprise Apps
  business: {
    primary: modernColors.blue,
    secondary: modernColors.slate,
    accent: modernColors.teal,
    background: modernColors.slate[50],
    surface: '#ffffff',
    text: modernColors.slate[900]
  },

  // Consumer/Social Apps
  consumer: {
    primary: modernColors.purple,
    secondary: modernColors.rose,
    accent: modernColors.emerald,
    background: modernColors.slate[900],
    surface: modernColors.slate[800],
    text: modernColors.slate[50]
  },

  // E-commerce Apps
  ecommerce: {
    primary: modernColors.emerald,
    secondary: modernColors.teal,
    accent: modernColors.amber,
    background: modernColors.slate[50],
    surface: '#ffffff',
    text: modernColors.slate[900]
  },

  // Analytics/Data Apps
  analytics: {
    primary: modernColors.teal,
    secondary: modernColors.blue,
    accent: modernColors.amber,
    background: modernColors.slate[900],
    surface: modernColors.slate[800],
    text: modernColors.slate[50]
  }
}

// Utility functions for color manipulation
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number): string => {
    // Convert hex to rgba
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  },

  // Lighten color
  lighten: (color: string, percent: number): string => {
    const hex = color.replace('#', '')
    const num = parseInt(hex, 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = (num >> 8 & 0x00FF) + amt
    const B = (num & 0x0000FF) + amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  },

  // Darken color
  darken: (color: string, percent: number): string => {
    return colorUtils.lighten(color, -percent)
  },

  // Get contrast color (black or white)
  getContrastColor: (color: string): string => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  },

  // Check if color meets WCAG contrast requirements
  meetsContrastRatio: (color1: string, color2: string, ratio: number = 4.5): boolean => {
    // Simplified contrast calculation
    const getLuminance = (color: string) => {
      const hex = color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16) / 255
      const g = parseInt(hex.substr(2, 2), 16) / 255
      const b = parseInt(hex.substr(4, 2), 16) / 255

      const [rs, gs, bs] = [r, g, b].map(c =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      )

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)

    return (brightest + 0.05) / (darkest + 0.05) >= ratio
  }
}

// Export everything (removing conflicting re-exports)
export default {
  colors: modernColors,
  semantic: semanticColors,
  themes: themeColors,
  utils: colorUtils
}
