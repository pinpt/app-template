const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
				'ping-large': 'ping-large 1s cubic-bezier(0, 0, 0.2, 1) infinite',
				autohide: 'autohide 500ms linear 3s forwards',
			},
			keyframes: {
				ping: {
					'0%': { transform: 'scale(1)', opacity: 1 },
					'75%, 100%': { transform: 'scale(1.4, 1.5)', opacity: 0 },
				},
				'ping-large': {
					'0%': { transform: 'scale(1)', opacity: 1 },
					'75%, 100%': { transform: 'scale(2)', opacity: 0 },
				},
				autohide: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
			},
			fontSize: {
				xxs: '.50rem',
			},
			maxWidth: {
				'8xl': '88rem',
			},
			spacing: {
				120: '30rem',
				128: '32rem',
			},
			borderWidth: {
				3: '3px',
			},
		},
		zIndex: {
			...defaultTheme.zIndex,
			60: '60',
			70: '70',
			80: '80',
			90: '90',
			100: '100',
		},
		colors: {
			...colors,
			gray: {
				...colors.gray,
				150: '#ECECEE',
				750: '#333338',
			},
			green: {
				...colors.green,
				950: '#0B301A',
			},
			indigo: {
				...colors.indigo,
				950: '#0F0E27',
			},
			red: {
				...colors.red,
				950: '#4E1213',
			},
			transparent: 'transparent',
			yellow: {
				...colors.yellow,
				950: '#4E2C0D',
			},
		},
		fontFamily: {
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace',
			],
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			serif: ['Podkova', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
		},
		maxHeight: (theme) => ({ ...defaultTheme.maxHeight(theme), 100: '26rem' }),
	},
	variants: {
		extend: {
			display: ['group-hover'],
			visibility: ['group-hover'],
			justifyContent: ['group-hover'],
			width: ['hover'],
			opacity: ['disabled'],
			borderWidth: ['last'],
			borderStyle: ['last'],
			margin: ['last'],
			padding: ['first', 'last'],
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
