const defaultTheme = require('tailwindcss/defaultTheme');

export const darkMode = 'selector';
export const content = [
  './src/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  extend: {
    boxShadow: {
      'soft': '0 0 20px 1px rgba(0, 0, 0, 0.05)',
    },
    colors: {
      'sea-green': "#09814A",
      'dark-gray': "#353334",
      'light-gray': "#4D4949",
      'pink-magenta': "#cf4464",
      'pink-magenta-light': "#fce1e9",
      'licorice': "#2e0624",
      'white': '#fafafa',
    },
    fontFamily: {
      poppins: ["Poppins", ...defaultTheme.fontFamily.sans]
    }
  },
  
};
export const plugins = [
];

export const corePlugins= {
  preflight: false,
}

// export const important = '#root';