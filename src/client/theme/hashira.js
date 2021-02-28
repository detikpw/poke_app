
const breakpoints = ['22.5em', '40em', '60em', '90em'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const hashira = {
  breakpoints,
  colors: {
    'primary': '#657b83',
    'secondary': '#93a1a1',
    'alt-1': '#586e75',
    'alt-2': '#b58900',
    'alt-3': '#cb4b16',
    'alt-4': '#dc322f',
    'bg-1': '#fdf6e3',
    'bg-2': '#eee8d5',
    // Default theme ui / rebasss
    text: '#000',
    background: '#fff',
    primary: '#000',
  },
  space: [
    0, 4, 8, 12, 16, 20, 24, 28, 32
  ],
  fonts: {
    vt323: 'VT323, monospace',
    ps2p: '"Press Start 2P", cursive',
  },
  fontSizes: [
    10, 12, 14, 16, 20, 24, 32, 48, 60, 96
  ],
  zIndices: [0, 100, 200],
  lineHeights: ['120%', '140%', '150%'],
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
};

export default hashira
