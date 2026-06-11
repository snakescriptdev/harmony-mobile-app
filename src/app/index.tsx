import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const dividerScale = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(20);
  const poweredOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);

  useEffect(() => {
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));
    titleTranslateY.value = withDelay(300, withSpring(0, { damping: 14, stiffness: 90 }));

    dividerScale.value = withDelay(700, withSpring(1, { damping: 12, stiffness: 100 }));

    messageOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    messageTranslateY.value = withDelay(900, withSpring(0, { damping: 14, stiffness: 90 }));

    poweredOpacity.value = withDelay(1300, withTiming(1, { duration: 500 }));

    buttonOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));
    buttonTranslateY.value = withDelay(1500, withSpring(0, { damping: 12, stiffness: 80 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const dividerStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: dividerScale.value }],
    opacity: dividerScale.value,
  }));

  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  const poweredStyle = useAnimatedStyle(() => ({
    opacity: poweredOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(232,67,42,0.06)', 'rgba(245,166,35,0.04)', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.blobTopRight}
      />
      <LinearGradient
        colors={['rgba(245,166,35,0.06)', 'rgba(232,67,42,0.04)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.blobBottomLeft}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.topSpacer} />

          <View style={styles.heroSection}>
            <Animated.View style={[styles.logoContainer, titleStyle]}>
              <Image
                source={require('@/assets/images/harmony-logo-full.jpeg')}
                style={styles.logoImage}
                contentFit="contain"
              />
            </Animated.View>
            <Animated.View style={[styles.divider, dividerStyle]} />
            <Animated.Text style={[styles.heroMessage, messageStyle]}>
              Food delivery has optimized restaurants.{'\n'}
              It's time to optimize people.
            </Animated.Text>
          </View>

          <View style={styles.bottomSection}>
            <Animated.Text style={[styles.poweredBy, poweredStyle]}>
              Powered by ✨ Harmony
            </Animated.Text>

            <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
              <Pressable
                onPress={() => router.replace('/(tabs)')}
                style={({ pressed }) => [pressed && styles.buttonPressed]}
              >
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  blobTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  topSpacer: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 280,
    height: 180,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: Colors.secondary,
    borderRadius: 2,
    marginVertical: 32,
    opacity: 0.5,
  },
  heroMessage: {
    fontSize: 17,
    lineHeight: 26,
    color: Colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  bottomSection: {
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  poweredBy: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  button: {
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textLight,
    letterSpacing: 0.3,
  },
});
