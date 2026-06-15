import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
// 1. Zaimportuj oficjalny pakiet ze zmiennymi globalnymi
import globals from 'globals';

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended, 
  
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    // 2. Nowy sposób na definiowanie środowiska i zmiennych globalnych:
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // To zastępuje dawne "env": { "browser": true }
        ...globals.browser, 
        
        // To zastępuje dawne "globals": { "SVGAltGlyphElement": false }
        // W nowym formacie "readonly" oznacza false (zmienna tylko do odczytu)
        SVGAltGlyphElement: 'readonly', 
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off',
    },
  },
];
