export const darkMode = 'class';
export const content = [
  './src/**/*.{js,jsx,ts,tsx}'
];
export const theme = {
  extend: {
    boxShadow: {
      'datagrid': '0 0 20px 1px rgba(0, 0, 0, 0.05)',
    },
    colors: {
      'sea-green': "#09814A",
      'pink-magenta': "#cf4464",
      'licorice': "#2e0624"
    },
  },
  
};
export const plugins = [
];

export const corePlugins= {
  preflight: false,
}

export const important = '#root';