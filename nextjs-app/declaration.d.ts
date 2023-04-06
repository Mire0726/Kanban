import PaletteColorOptions from "@mui/material/styles/createPalette";

type Color = {
  light?: string;
  main: string;
  dark?: string;
  contrastText: string;
};

declare module "@mui/material/styles" {
  interface Palette {
    link: Color;
    border: Color;
  }
  interface PaletteOptions {
    link?: Color;
    border?: Color;
  }
  interface TypographyVariants {
    span: React.CSSProperties;
    strong: React.CSSProperties;
    small: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    span?: React.CSSProperties;
    strong?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    link: true;
    border: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    link: true;
    border: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    link: true;
    border: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    span: true;
    button: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    overline: false;
    caption: false;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    default: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    widescreen: true;
    fullscreen: true;
  }
}

export {};
