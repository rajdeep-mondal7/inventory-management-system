import { usePreferences } from '../context/PreferencesContext';

// SVG fills and Recharts props need concrete colours per theme; CSS vars alone
// don't cover gradient stops reliably across browsers.
const mix = (a, b, t) => {
  const pa = a.match(/\w\w/g).map((x) => parseInt(x, 16));
  const pb = b.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
};

export default function useChartTheme() {
  const { prefs } = usePreferences();
  const dark = prefs.darkMode;
  const navy = dark ? '#8da3cc' : '#1c263b';
  const rose = dark ? '#c98a95' : '#945661';
  const surface = dark ? '#181e2b' : '#faf7f2';
  const line = dark ? '#293245' : '#e3dbd0';
  return {
    dark,
    navy,
    rose,
    grid: line,
    tick: dark ? '#b5aea6' : '#5c544e',
    cursor: dark ? '#11151e' : '#f5efe6',
    tooltip: {
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 10,
      fontSize: 12,
      color: dark ? '#f5efe6' : '#1c263b',
    },
    // Donut/series tints derived from navy and rosewood, blended toward the surface.
    series: [navy, rose, mix(navy, surface, 0.45), mix(rose, surface, 0.45), mix(navy, surface, 0.7), mix(rose, surface, 0.7)],
  };
}