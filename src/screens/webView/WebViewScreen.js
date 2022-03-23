import {BackHandler, Keyboard, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import commonStyles from '../../utils/styles/CommonStyles';
import {COLORS} from '../../constants';
import Loading from '../../components/Loading';
import {getModel, getUniqueId} from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import DeviceCountry, {
  TYPE_ANY,
  TYPE_TELEPHONY,
  TYPE_CONFIGURATION,
} from 'react-native-device-country';

const WebViewScreen = ({value}) => {
  const [webViewUrl, setWebViewUrl] = useState();
  console.log('webViewUrl :', webViewUrl);

  const navigation = useNavigation();

  console.log('value :', value);
  const propValue = value;
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState();
  console.log('apiUrl :', apiUrl);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [countryCode, setCountryCode] = useState();
  console.log('countryCode :', countryCode);

  DeviceCountry.getCountryCode(TYPE_TELEPHONY)
    .then(result => {
      console.log('result :', result);
      setCountryCode(result.code);
    })
    .catch(e => {
      console.log(e);
    });

  useEffect(() => {
    async function getLinkLocal() {
      const model = await getModel();

      const geo = await RNLocalize.getCountry();

      const androidId = await getUniqueId();

      // const tempUrl = value + '?' + model + '?' + geo + '?' + androidId;
      // const tempUrl = value + '?' + model + '?' + countryCode + '?' + androidId;

      const tempUrl =
        value +
        '?' +
        `device=` +
        model +
        '&' +
        `country=` +
        countryCode +
        '&' +
        `bid=` +
        androidId;

      console.log('tempUrl :', tempUrl);
      setApiUrl(tempUrl);
    }
    if (value !== null || value !== undefined) {
      getLinkLocal();
    }
    console.log('error');
  }, [propValue, countryCode]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          console.log('response :', response.data.banner_url);
          setWebViewUrl(response.data.banner_url);
          console.log('webViewUrl in :', webViewUrl);
          setIsLoading(false);

          {
            webViewUrl == ''
              ? navigation.navigate('HomeScreen')
              : console.log('webViewUrl is not null');
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled');
        } else {
          setIsLoading(false);
          console.log('else condition');
        }
      }
    };
    fetchApiData();
  }, [apiUrl, webViewUrl]);

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      console.log(webView);
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
    <View style={commonStyles.container}>
      <StatusBar
        backgroundColor={COLORS.background}
        hidden={!isKeyboardVisible}
      />
      {webViewUrl === undefined ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View style={{flex: 1}}>
            <WebView
              allowsBackForwardNavigationGestures={true}
              thirdPartyCookiesEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              setBuiltInZoomControls={false}
              allowFileAccess={true}
              source={{uri: webViewUrl}}
              startInLoadingState={true}
              renderLoading={() => <Loading />}
              onLoadEnd={() => console.log('Page Loaded')}
              ref={webView}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
