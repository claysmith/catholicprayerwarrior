import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, FadeIn, Keyframe, ZoomIn } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const DURATION = 1600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const overlayKeyframe = new Keyframe({
    0: {
      opacity: 1,
    },
    55: {
      opacity: 1,
    },
    100: {
      opacity: 0,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/splash-icon.png')} />;

  return animate ? (
    <Animated.View
      entering={overlayKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      <Animated.View
        entering={ZoomIn.duration(600).springify().damping(14).stiffness(120).delay(100)}
        style={styles.iconWrapper}>
        {image}
      </Animated.View>
      <Animated.View
        entering={FadeIn.duration(500).delay(450)}
        style={styles.divider}
      />
      <Animated.Text
        entering={FadeIn.duration(600).delay(550)}
        style={styles.title}>
        Catholic Prayer Warrior
      </Animated.Text>
      <Animated.Text
        entering={FadeIn.duration(600).delay(750)}
        style={styles.subtitle}>
        Pray without ceasing
      </Animated.Text>
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: '#C5A55A',
    marginTop: 28,
    marginBottom: 20,
    borderRadius: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#C5A55A',
    marginTop: 8,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#8B1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
