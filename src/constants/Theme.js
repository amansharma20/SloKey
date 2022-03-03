/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import {Responsive} from './Layout';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#430000',
  secondary: '#FFFFFF',
  white: '#FFFFFF',
  background: '#8c1f00',
  headerBackground: '#282B2F',
  textGrey: '#BABCC6',
  black: '#000000',
  olive: '#4E5851',
  switchBackground: '#3A3B3C',
  blackOverlay: 'rgba(0,0,0,0.5)',
  orange: '#F38022',
  darkBlue: '#133FF6',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  paddingExtraLarge: 48,
  paddingLarge: 34,
  padding1: 24,
  padding2: 22,
  padding3: 18,
  padding4: 16,
  padding5: 12,
  padding6: 10,
  paddingHorizontal: 16,

  // font sizes
  largeTitle: Responsive.font(36),
  header: Responsive.font(24),
  buttonText: Responsive.font(22),
  h1: Responsive.font(24),
  h2: Responsive.font(22),
  h3: Responsive.font(18),
  h4: Responsive.font(16),
  h5: Responsive.font(12),
  h6: Responsive.font(10),

  // app dimensions
  width,
  height,
};
export const FONTS = {};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
