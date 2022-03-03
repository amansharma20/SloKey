import {BackHandler, StyleSheet, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {screenHeight, screenWidth} from '../../constants/Layout';
import {useNavigation} from '@react-navigation/core';
import Loading from '../../components/Loading';
import WebView from 'react-native-webview';

const HomeScreen = () => {
  const navigation = useNavigation();
  console.log('reached homescreen');

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      };
    }
  }, []); 

  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true;
    }
    return false;
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        setBuiltInZoomControls={false}
        allowFileAccess={true}
        source={{uri: 'https://owerxg-games.xyz/'}}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        onLoadEnd={() => console.log('Page Loaded')}
        allowsBackForwardNavigationGestures={true}
        ref={webView}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    height: screenHeight / 4,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
});
