// Demo component showcasing the Scalix Design System
import React from 'react'
import { Icon } from './icons'
import { MetricCard } from './analytics/metricCard'
import { modernColors, semanticColors, themeColors, colorUtils } from './colors'
import { spacing, fontSize, borderRadius, shadows } from './tokens'
import { themes, themeUtils } from './themes'

export const DesignSystemDemo: React.FC = () => {
  return (
    <div style={{
      padding: spacing[8],
      backgroundColor: themeColors.business.background,
      color: themeColors.business.text.primary,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{
        fontSize: fontSize['4xl'],
        fontWeight: 'bold',
        marginBottom: spacing[8],
        color: themeColors.business.primary[500]
      }}>
        Scalix Design System Demo
      </h1>

      {/* Color Palette Demo */}
      <section style={{ marginBottom: spacing[12] }}>
        <h2 style={{
          fontSize: fontSize['2xl'],
          fontWeight: 'semibold',
          marginBottom: spacing[6],
          color: themeColors.business.text.primary
        }}>
          Color Palette
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing[4] }}>
          {Object.entries(modernColors).slice(0, 6).map(([colorName, colorScale]) => (
            <div key={colorName} style={{
              backgroundColor: themeColors.business.surface,
              borderRadius: borderRadius.lg,
              padding: spacing[4],
              boxShadow: shadows.sm
            }}>
              <h3 style={{
                fontSize: fontSize.lg,
                fontWeight: 'semibold',
                marginBottom: spacing[3],
                textTransform: 'capitalize'
              }}>
                {colorName}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[1] }}>
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: colorScale[shade as keyof typeof colorScale],
                    borderRadius: borderRadius.sm,
                    border: `1px solid ${themeColors.business.border.light}`,
                    cursor: 'pointer'
                  }}
                  title={`${colorName}-${shade}: ${colorScale[shade as keyof typeof colorScale]}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Icon Demo */}
      <section style={{ marginBottom: spacing[12] }}>
        <h2 style={{
          fontSize: fontSize['2xl'],
          fontWeight: 'semibold',
          marginBottom: spacing[6],
          color: themeColors.business.text.primary
        }}>
          Icon Library
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: spacing[4]
        }}>
          {[
            'home', 'search', 'settings', 'user', 'heart',
            'star', 'checkCircle', 'alertTriangle', 'info',
            'plus', 'edit', 'delete', 'download', 'upload'
          ].map((iconName) => (
            <div key={iconName} style={{
              backgroundColor: themeColors.business.surface,
              borderRadius: borderRadius.lg,
              padding: spacing[4],
              textAlign: 'center',
              boxShadow: shadows.sm
            }}>
              <Icon name={iconName as any} size={32} style={{
                color: themeColors.business.primary[500],
                marginBottom: spacing[2]
              }} />
              <div style={{
                fontSize: fontSize.sm,
                color: themeColors.business.text.secondary,
                textTransform: 'capitalize'
              }}>
                {iconName.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metric Cards Demo */}
      <section style={{ marginBottom: spacing[12] }}>
        <h2 style={{
          fontSize: fontSize['2xl'],
          fontWeight: 'semibold',
          marginBottom: spacing[6],
          color: themeColors.business.text.primary
        }}>
          Metric Cards
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: spacing[6]
        }}>
          <MetricCard metric={{
            id: 'revenue',
            name: 'Total Revenue',
            value: 284750,
            change: 15.9,
            changeType: 'increase',
            format: 'currency',
            icon: 'DollarSign'
          }} />

          <MetricCard metric={{
            id: 'users',
            name: 'Active Users',
            value: 12450,
            change: 4.7,
            changeType: 'increase',
            format: 'number',
            icon: 'Users'
          }} />

          <MetricCard metric={{
            id: 'conversion',
            name: 'Conversion Rate',
            value: 3.24,
            change: 0.26,
            changeType: 'increase',
            format: 'percentage',
            icon: 'TrendingUp'
          }} />
        </div>
      </section>

      {/* Theme Demo */}
      <section style={{ marginBottom: spacing[12] }}>
        <h2 style={{
          fontSize: fontSize['2xl'],
          fontWeight: 'semibold',
          marginBottom: spacing[6],
          color: themeColors.business.text.primary
        }}>
          Theme System
        </h2>

        <div style={{ display: 'flex', gap: spacing[4], flexWrap: 'wrap' }}>
          {Object.entries(themes).map(([themeName, theme]) => (
            <button
              key={themeName}
              onClick={() => themeUtils.applyTheme(themeName as any)}
              style={{
                padding: `${spacing[3]} ${spacing[4]}`,
                backgroundColor: theme.colors.primary[500],
                color: 'white',
                border: 'none',
                borderRadius: borderRadius.md,
                fontSize: fontSize.sm,
                fontWeight: 'medium',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {theme.name} Theme
            </button>
          ))}
        </div>

        <div style={{
          marginTop: spacing[6],
          padding: spacing[6],
          backgroundColor: 'var(--primary-100)',
          borderRadius: borderRadius.lg,
          border: '2px solid var(--primary-200)'
        }}>
          <p style={{
            fontSize: fontSize.base,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            This area uses CSS custom properties generated by the theme system.
            Click the theme buttons above to see the colors change dynamically!
          </p>
        </div>
      </section>

      {/* Design Tokens Demo */}
      <section>
        <h2 style={{
          fontSize: fontSize['2xl'],
          fontWeight: 'semibold',
          marginBottom: spacing[6],
          color: themeColors.business.text.primary
        }}>
          Design Tokens
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing[6] }}>
          {/* Spacing Demo */}
          <div style={{
            backgroundColor: themeColors.business.surface,
            borderRadius: borderRadius.lg,
            padding: spacing[6],
            boxShadow: shadows.sm
          }}>
            <h3 style={{
              fontSize: fontSize.lg,
              fontWeight: 'semibold',
              marginBottom: spacing[4],
              color: themeColors.business.text.primary
            }}>
              Spacing Scale
            </h3>
            {[1, 2, 4, 6, 8, 12].map((space) => (
              <div key={space} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: spacing[2]
              }}>
                <div style={{
                  width: spacing[space as keyof typeof spacing],
                  height: '8px',
                  backgroundColor: themeColors.business.primary[500],
                  borderRadius: borderRadius.sm,
                  marginRight: spacing[3]
                }} />
                <span style={{
                  fontSize: fontSize.sm,
                  color: themeColors.business.text.secondary
                }}>
                  {space} ({spacing[space as keyof typeof spacing]})
                </span>
              </div>
            ))}
          </div>

          {/* Typography Demo */}
          <div style={{
            backgroundColor: themeColors.business.surface,
            borderRadius: borderRadius.lg,
            padding: spacing[6],
            boxShadow: shadows.sm
          }}>
            <h3 style={{
              fontSize: fontSize.lg,
              fontWeight: 'semibold',
              marginBottom: spacing[4],
              color: themeColors.business.text.primary
            }}>
              Typography Scale
            </h3>
            {['xs', 'sm', 'base', 'lg', 'xl', '2xl'].map((size) => (
              <p key={size} style={{
                fontSize: fontSize[size as keyof typeof fontSize],
                marginBottom: spacing[2],
                color: themeColors.business.text.primary
              }}>
                {size}: The quick brown fox jumps over the lazy dog
              </p>
            ))}
          </div>

          {/* Border Radius Demo */}
          <div style={{
            backgroundColor: themeColors.business.surface,
            borderRadius: borderRadius.lg,
            padding: spacing[6],
            boxShadow: shadows.sm
          }}>
            <h3 style={{
              fontSize: fontSize.lg,
              fontWeight: 'semibold',
              marginBottom: spacing[4],
              color: themeColors.business.text.primary
            }}>
              Border Radius
            </h3>
            {['sm', 'md', 'lg', 'xl', '2xl', 'full'].map((radius) => (
              <div key={radius} style={{
                width: '48px',
                height: '48px',
                backgroundColor: themeColors.business.primary[500],
                borderRadius: borderRadius[radius as keyof typeof borderRadius],
                marginBottom: spacing[2],
                display: 'inline-block',
                marginRight: spacing[2]
              }}
              title={radius}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DesignSystemDemo
