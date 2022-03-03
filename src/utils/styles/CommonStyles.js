import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Responsive, statusbarHeight, screenHeight} from '../layouts/Layout';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerText: {
    fontSize: 34,
    color: COLORS.white,
    fontWeight: '700',
  },
  h1Text: {
    fontSize: SIZES.h1,
    color: COLORS.white,
    fontWeight: '500',
  },
  h2Text: {
    fontSize: SIZES.h2,
    color: COLORS.white,
    fontWeight: '500',
  },
  h3Text: {
    color: COLORS.black,
    fontSize: SIZES.h3,
    fontWeight: '500',
  },
  h4Text: {
    color: COLORS.black,
    fontSize: SIZES.h4,
    fontWeight: '500',
  },
  h4TextWhite: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: '500',
  },
  h5Text: {
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  headerIcons: {
    width: Responsive.width(30),
    height: Responsive.height(30),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  shadow: {
    elevation: 10,
    shadowColor: COLORS.white,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    marginHorizontal: 10,
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  gradient: ['#972400', '#430000'],
});

export default commonStyles;
