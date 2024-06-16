import { fontFamily } from 'tailwindcss/defaultTheme';
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		extend: {
			textShadow: {
				sm: '0px 4px 4px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			boxShadow: {
				claymorphism:
					'inset -12px -8px 16px rgba(0, 0, 0, 0.225), inset 12px 8px 16px rgba(255, 255, 255, 0.1), 24px 24px 48px rgba(0, 0, 0, 0.25)',
				'claymorphism-noshadow':
					'inset -12px -8px 16px rgba(0, 0, 0, 0.225), inset 12px 8px 16px rgba(255, 255, 255, 0.1)',
				'claymorphism-2':
					'inset -10px -10px 14px rgba(0, 0, 0, 0.3), inset 10px 10px 12px rgba(255, 255, 255, 0.35), 0px 10px 48px rgba(173, 173, 173, 0.15)',
				neon: '0px 0px 15px var(--tw-shadow)',
				'inner-sm': 'inset 0px 0px 2px var(--tw-shadow)',
				'inner-md': 'inset 0px 4px 12px var(--tw-shadow)',
				'custom-lg': '0 2px 16px var(--tw-shadow-color)',
			},
			colors: {
				'c-primary': '#5B5F97',
				'c-secondary': '#E8AEB7',
				'c-tertiary': '#CCF5AC',
				'c-background': '#221627',
				'c-darker-background': '#222222',
				'c-body-text': '#111',
				'c-body-text-light': '#f7f7f7',

				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			screens: {
				xs: '414px',
				'2xl': '1400px',
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				title: ['montserrat', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@xpd/tailwind-3dtransforms'),
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities({
				'text-shadow': (value) => ({
					textShadow: value,
				}),
			});
		}),
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'translate-z': (value) => ({
						'--tw-translate-z': value,
						transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
					}), // this is actual CSS
				},
				{ values: theme('translate'), supportsNegativeValues: true },
			);
		}),
	],
};

export default config;
