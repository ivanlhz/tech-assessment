export const colors = {
    // Primary Colors
    primary: {
      main: '#0ABB87',
      light: '#4DCEA7',
      dark: '#08956B',
      contrastText: '#FFFFFF'
    },
    
    // Secondary Colors
    secondary: {
      main: '#262D34',
      light: '#4A5158',
      dark: '#1A1F24',
      contrastText: '#FFFFFF'
    },
    
    // Neutral/Gray Scale
    neutral: {
      white: '#FFFFFF',
      gray50: '#F9FAFB',
      gray100: '#F3F4F6',
      gray200: '#E5E7EB',
      gray300: '#D1D5DB',
      gray400: '#9CA3AF',
      gray500: '#6B7280',
      gray600: '#4B5563',
      gray700: '#374151',
      gray800: '#1F2937',
      gray900: '#111827',
      black: '#000000'
    },
    
    // Status Colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#E36058', // Button Red
      info: '#3B82F6'
    },
    
    // Component specific colors
    switch: {
      active: '#0ABB87',
      inactive: '#CAD6DC',
      label: '#000000'
    },
    
    // Table & Pagination
    table: {
      text: '#262D34',
      currentPageBorder: '#0ABB87',
      currentPageText: '#0ABB87',
      selectorBorder: '#CAD6DC',
      selectorBg: '#FFFFFF',
      selectorText: '#262D34'
    },
    
    // Section
    section: {
      titleBorder: '#0ABB87',
      titleText: '#262D34'
    },
    
    // Background Colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      card: '#FFFFFF',
      disabled: '#F3F4F6'
    },
    
    // Text Colors
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      inverse: '#FFFFFF',
      link: '#3B82F6'
    },
    
    // Border Colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF'
    }
  } as const;
  
  // Type helper for colors
  export type Colors = typeof colors;
  export type ColorKey = keyof Colors;
  export type PrimaryColorKey = keyof Colors['primary'];
  export type SecondaryColorKey = keyof Colors['secondary'];
  export type NeutralColorKey = keyof Colors['neutral'];
  export type StatusColorKey = keyof Colors['status'];