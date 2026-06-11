import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface RouteStep {
  label: string;
  time: string;
  color: string;
}

const ROUTE_STEPS: RouteStep[] = [
  { label: "Pick up from Barn's Cafe", time: '2 min', color: Colors.red },
  { label: 'Pick up from Mastoor Kitchen', time: '5 min', color: Colors.orange },
  { label: 'Deliver to Customer 1', time: '8 min', color: Colors.green },
  { label: 'Deliver to Customer 2', time: '3 min', color: Colors.green },
];

export default function RouteMapScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Route Optimization</Text>
        </View>

        {/* Map Visualization */}
        <View style={styles.mapContainer}>
          {/* Grid lines */}
          <View style={[styles.gridLineH, { top: '25%' }]} />
          <View style={[styles.gridLineH, { top: '50%' }]} />
          <View style={[styles.gridLineH, { top: '75%' }]} />
          <View style={[styles.gridLineV, { left: '25%' }]} />
          <View style={[styles.gridLineV, { left: '50%' }]} />
          <View style={[styles.gridLineV, { left: '75%' }]} />

          {/* Route lines — restaurant to hub */}
          <View style={styles.routeLineRestaurant1} />
          <View style={styles.routeLineRestaurant2} />
          {/* Route lines — hub to customers */}
          <View style={styles.routeLineCustomer1} />
          <View style={styles.routeLineCustomer2} />

          {/* Delivery Hub — center */}
          <View style={[styles.pin, styles.pinHub]}>
            <Ionicons name="location" size={16} color={Colors.textLight} />
          </View>
          <Text style={[styles.pinLabel, styles.pinHubLabel]}>Hub</Text>

          {/* Barn's — top-left */}
          <View style={[styles.pin, styles.pinBarns]}>
            <Text style={styles.pinText}>B</Text>
          </View>
          <Text style={[styles.pinLabel, styles.pinBarnsLabel]}>Barn's</Text>

          {/* Mastoor — top-right */}
          <View style={[styles.pin, styles.pinMastoor]}>
            <Text style={styles.pinText}>M</Text>
          </View>
          <Text style={[styles.pinLabel, styles.pinMastoorLabel]}>Mastoor</Text>

          {/* Customer 1 — bottom-left */}
          <View style={[styles.pin, styles.pinCustomer1]}>
            <Text style={styles.pinText}>1</Text>
          </View>
          <Text style={[styles.pinLabel, styles.pinCustomer1Label]}>Customer 1</Text>

          {/* Customer 2 — bottom-center */}
          <View style={[styles.pin, styles.pinCustomer2]}>
            <Text style={styles.pinText}>2</Text>
          </View>
          <Text style={[styles.pinLabel, styles.pinCustomer2Label]}>Customer 2</Text>

          {/* Label */}
          <View style={styles.mapLabel}>
            <Text style={styles.mapLabelText}>
              Multiple routes merged into one
            </Text>
          </View>
        </View>

        {/* Harmony Analysis */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.harmonyCard}
        >
          <Text style={styles.harmonyLabel}>{'✨ Route Analysis'}</Text>
          <Text style={styles.harmonyText}>
            This optimized route saves 15 SAR and reduces delivery distance by
            30%
          </Text>
        </LinearGradient>

        {/* Route Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: Colors.green }]}>
            <Text style={[styles.statValue, { color: Colors.green }]}>
              15 SAR
            </Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: Colors.info }]}>
            <Text style={[styles.statValue, { color: Colors.info }]}>30%</Text>
            <Text style={styles.statLabel}>Less Distance</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: Colors.orange }]}>
            <Text style={[styles.statValue, { color: Colors.orange }]}>
              12 min
            </Text>
            <Text style={styles.statLabel}>Faster</Text>
          </View>
        </View>

        {/* Route Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Route Details</Text>
          {ROUTE_STEPS.map((step, index) => (
            <View key={step.label} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: step.color },
                  ]}
                />
                {index < ROUTE_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      { backgroundColor: step.color + '40' },
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStepLabel}>Step {index + 1}</Text>
                <Text style={styles.timelineLabel}>{step.label}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
          <View style={styles.totalTimeRow}>
            <Ionicons name="time-outline" size={18} color={Colors.primary} />
            <Text style={styles.totalTimeText}>
              Total time: 18 min{' '}
              <Text style={styles.totalTimeCompare}>
                (vs 32 min separate)
              </Text>
            </Text>
          </View>
        </View>

        {/* Efficiency Comparison */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Efficiency Comparison</Text>

          {/* Separate Deliveries */}
          <View style={styles.compRow}>
            <View style={styles.compHeader}>
              <View style={[styles.compDot, { backgroundColor: Colors.red }]} />
              <Text style={styles.compTitle}>Separate Deliveries</Text>
            </View>
            <View style={styles.compDetails}>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Trips</Text>
                <Text style={styles.compValue}>3</Text>
              </View>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Time</Text>
                <Text style={styles.compValue}>32 min</Text>
              </View>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Fees</Text>
                <Text style={styles.compValue}>45 SAR</Text>
              </View>
            </View>
          </View>

          <View style={styles.compDivider} />

          {/* Optimized Route */}
          <View style={styles.compRow}>
            <View style={styles.compHeader}>
              <View
                style={[styles.compDot, { backgroundColor: Colors.green }]}
              />
              <Text style={styles.compTitle}>Optimized Route</Text>
            </View>
            <View style={styles.compDetails}>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Trips</Text>
                <Text style={[styles.compValue, { color: Colors.green }]}>
                  1
                </Text>
              </View>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Time</Text>
                <Text style={[styles.compValue, { color: Colors.green }]}>
                  18 min
                </Text>
              </View>
              <View style={styles.compItem}>
                <Text style={styles.compLabel}>Fees</Text>
                <Text style={[styles.compValue, { color: Colors.green }]}>
                  15 SAR
                </Text>
              </View>
            </View>
          </View>

          {/* Savings */}
          <View style={styles.savingsRow}>
            <Ionicons name="trending-down" size={18} color={Colors.green} />
            <Text style={styles.savingsText}>
              You save 30 SAR, 14 min, and 2 trips
            </Text>
          </View>
        </View>

        {/* Bottom Button */}
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomButton}
          >
            <Text style={styles.bottomButtonText}>
              Confirm Optimized Route
            </Text>
          </LinearGradient>
        </Pressable>

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
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.7,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },

  // Map
  mapContainer: {
    height: 280,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E0E0E0',
  },

  // Route lines
  routeLineRestaurant1: {
    position: 'absolute',
    top: 70,
    left: 68,
    width: 100,
    height: 3,
    backgroundColor: Colors.red + '60',
    borderRadius: 2,
    transform: [{ rotate: '35deg' }],
  },
  routeLineRestaurant2: {
    position: 'absolute',
    top: 70,
    right: 68,
    width: 100,
    height: 3,
    backgroundColor: Colors.orange + '60',
    borderRadius: 2,
    transform: [{ rotate: '-35deg' }],
  },
  routeLineCustomer1: {
    position: 'absolute',
    top: 150,
    left: 80,
    width: 90,
    height: 3,
    backgroundColor: Colors.green + '60',
    borderRadius: 2,
    transform: [{ rotate: '30deg' }],
  },
  routeLineCustomer2: {
    position: 'absolute',
    top: 155,
    left: 155,
    width: 70,
    height: 3,
    backgroundColor: Colors.green + '60',
    borderRadius: 2,
    transform: [{ rotate: '60deg' }],
  },

  // Pins
  pin: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  pinText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textLight,
  },
  pinLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  pinHub: {
    backgroundColor: Colors.text,
    top: 115,
    left: '50%',
    marginLeft: -18,
  },
  pinHubLabel: {
    top: 153,
    left: '50%',
    marginLeft: -10,
  },

  pinBarns: {
    backgroundColor: Colors.red,
    top: 30,
    left: 30,
  },
  pinBarnsLabel: {
    top: 68,
    left: 26,
  },

  pinMastoor: {
    backgroundColor: Colors.orange,
    top: 30,
    right: 30,
  },
  pinMastoorLabel: {
    top: 68,
    right: 18,
  },

  pinCustomer1: {
    backgroundColor: Colors.green,
    bottom: 50,
    left: 50,
  },
  pinCustomer1Label: {
    bottom: 34,
    left: 34,
  },

  pinCustomer2: {
    backgroundColor: Colors.green,
    bottom: 50,
    left: '50%',
    marginLeft: 10,
  },
  pinCustomer2Label: {
    bottom: 34,
    left: '50%',
    marginLeft: 0,
  },

  mapLabel: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mapLabelText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Harmony Card
  harmonyCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  harmonyLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textLight,
    marginBottom: 8,
  },
  harmonyText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 21,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 3,
    fontWeight: '500',
  },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 14,
  },

  // Timeline
  timelineRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  timelineStepLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  timelineLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  timelineTime: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  totalTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },
  totalTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  totalTimeCompare: {
    color: Colors.textSecondary,
    fontWeight: '400',
  },

  // Comparison
  compRow: {
    marginBottom: 4,
  },
  compHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  compDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  compTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  compDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  compItem: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  compLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  compValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  compDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 16,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.green + '0D',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
    flex: 1,
  },

  // Bottom Button
  bottomButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  bottomButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textLight,
  },

  bottomSpacer: {
    height: 40,
  },
});
