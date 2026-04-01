const theme = {
  colors: {
    primary: "#6366F1",          // Main accent - Indigo
    primaryHover: "#4F46E5",     // Primary hover state
    secondary: "#06B6D4",        // Secondary accent - Cyan
    secondaryHover: "#0891B2",   // Secondary hover state
    background: "#F9FAFB",       // Page background
    surface: "#FFFFFF",          // Card / form background
    textPrimary: "#111827",      // Main text
    textSecondary: "#6B7280",    // Muted text
    textLight: "#9CA3AF",        // Placeholder text
    success: "#10B981",          // Complete task - Green
    successBg: "#D1FAE5",        // Success background
    danger: "#EF4444",           // Delete button - Red
    dangerHover: "#DC2626",      // Danger hover
    dangerBg: "#FEE2E2",         // Danger background
    warning: "#F59E0B",          // Warning - Amber
    warningBg: "#FEF3C7",        // Warning background
    border: "#E5E7EB",           // Default border
    borderFocus: "#6366F1",      // Input focus border
  },

  fonts: {
    main: "'Inter', sans-serif",
    sizes: {
      xs: "11px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "20px",
      xxl: "24px",
      heading: "28px",
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    }
  },

  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 8px 24px rgba(0,0,0,0.10)",
  },

  transitions: {
    fast: "all 0.15s ease",
    normal: "all 0.25s ease",
    slow: "all 0.4s ease",
  },
};

export default theme;