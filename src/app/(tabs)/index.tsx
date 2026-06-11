import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_PADDING = 20;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_PADDING * 2 - CARD_GAP) / 2;

interface FeatureCard {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  iconBg: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Combine Orders',
    description: 'Order from multiple restaurants in one delivery',
    icon: 'layers-outline',
    route: '/combine-orders',
    iconBg: Colors.red,
  },
  {
    title: 'Group Ordering',
    description: 'Collaborative orders for family & friends',
    icon: 'people-outline',
    route: '/group-order',
    iconBg: Colors.info,
  },
  {
    title: 'Join the Route',
    description: 'Share delivery routes and save money',
    icon: 'git-merge-outline',
    route: '/join-route',
    iconBg: Colors.green,
  },
  {
    title: 'Smart Recommendations',
    description: 'AI-powered personalized suggestions',
    icon: 'bulb-outline',
    route: '/recommendations',
    iconBg: Colors.orange,
  },
  {
    title: 'Smart Scheduling',
    description: 'Schedule and optimize future orders',
    icon: 'time-outline',
    route: '/scheduling',
    iconBg: Colors.primary,
  },
  {
    title: 'Event Planner',
    description: 'Plan food for gatherings & events',
    icon: 'calendar-outline',
    route: '/event-planner',
    iconBg: Colors.gold,
  },
];

interface Metric {
  value: string;
  label: string;
  dotColor: string;
}

const METRICS: Metric[] = [
  { value: '127', label: 'Orders Combined', dotColor: Colors.red },
  { value: 'SAR 1,151', label: 'Money Saved', dotColor: Colors.green },
  { value: '43', label: 'Shared Deliveries', dotColor: Colors.orange },
  { value: '90', label: 'Routes Optimized', dotColor: Colors.text },
  { value: '12', label: 'Events Planned', dotColor: Colors.gold },
];

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  const router = useRouter();

  return (
    <Animated.View entering={FadeInDown.delay(200 + index * 80).duration(400).springify().damping(14)}>
      <Pressable
        style={({ pressed }) => [
          styles.featureCard,
          pressed && styles.featureCardPressed,
        ]}
        onPress={() => router.push(card.route as any)}
      >
        <View style={[styles.iconCircle, { backgroundColor: card.iconBg + '14' }]}>
          <Ionicons name={card.icon} size={22} color={card.iconBg} />
        </View>
        <Text style={styles.featureCardTitle}>{card.title}</Text>
        <Text style={styles.featureCardDesc}>{card.description}</Text>
      </Pressable>
    </Animated.View>
  );
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <Animated.View entering={FadeInRight.delay(600 + index * 100).duration(400)}>
      <View style={styles.metricCard}>
        <View style={[styles.metricDot, { backgroundColor: metric.dotColor }]} />
        <Text style={styles.metricValue}>{metric.value}</Text>
        <Text style={styles.metricLabel}>{metric.label}</Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View style={styles.headerRow}>
            <Image
              source={require('@/assets/images/harmony-icon.jpeg')}
              style={styles.headerIcon}
              contentFit="contain"
            />
            <View>
              <Text style={styles.logoText}>Harmony</Text>
              <Text style={styles.subtitle}>Join the Route</Text>
            </View>
          </View>
          <Text style={styles.greeting}>
            Good morning! Here's your delivery intelligence.
          </Text>
        </Animated.View>

        {/* Feature Cards Grid */}
        <View style={styles.grid}>
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCardItem key={card.route} card={card} index={index} />
          ))}
        </View>

        {/* Harmony AI Banner */}
        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] }]}
            onPress={() => router.push('/(tabs)/harmony')}
          >
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.harmonyBanner}
            >
              <View>
                <Text style={styles.harmonyTitle}>{'✨ Harmony'}</Text>
                <Text style={styles.harmonySubtitle}>
                  Your AI delivery assistant is ready
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Dashboard Metrics */}
        <Animated.Text entering={FadeInDown.delay(800).duration(400)} style={styles.sectionTitle}>
          Dashboard
        </Animated.Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsRow}
        >
          {METRICS.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CARD_PADDING,
  },

  header: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gold,
    marginTop: 2,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    marginBottom: 20,
  },
  featureCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.85,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  featureCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },

  harmonyBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  harmonyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textLight,
    marginBottom: 4,
  },
  harmonySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  metricsRow: {
    gap: 10,
    paddingBottom: 4,
  },
  metricCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  metricDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  bottomSpacer: {
    height: 110,
  },
});
