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

const BENEFITS = [
  'Save 12 SAR',
  'Shared Route',
  'Reduced Delivery Cost',
  'Faster Delivery',
];

interface NearbyOrder {
  label: string;
  restaurant: string;
  distance?: string;
  time?: string;
  isYours?: boolean;
}

const NEARBY_ORDERS: NearbyOrder[] = [
  { label: 'Household #1', restaurant: 'Al Baik', distance: '0.3 km away', time: 'Ordered 5 min ago' },
  { label: 'Household #2', restaurant: 'Al Baik', distance: '0.5 km away', time: 'Ordered 8 min ago' },
  { label: 'Your Order', restaurant: 'Al Baik', isYours: true },
];

function MapPin({ color, label, top, left }: { color: string; label: string; top: number; left: number }) {
  return (
    <View style={[styles.mapPin, { top, left }]}>
      <View style={[styles.mapPinDot, { backgroundColor: color }]}>
        <Text style={styles.mapPinIcon}>
          {color === Colors.red ? '\u{1F4CD}' : '\u{1F3E0}'}
        </Text>
      </View>
      <Text style={styles.mapPinLabel}>{label}</Text>
    </View>
  );
}

function MapLine({ fromTop, fromLeft, toTop, toLeft, color }: {
  fromTop: number; fromLeft: number; toTop: number; toLeft: number; color: string;
}) {
  const length = Math.sqrt(Math.pow(toTop - fromTop, 2) + Math.pow(toLeft - fromLeft, 2));
  const angle = Math.atan2(toTop - fromTop, toLeft - fromLeft) * (180 / Math.PI);

  return (
    <View
      style={[
        styles.mapLine,
        {
          top: fromTop + 12,
          left: fromLeft + 12,
          width: length,
          transform: [{ rotate: `${angle}deg` }],
          backgroundColor: color + '40',
        },
      ]}
    />
  );
}

export default function JoinRouteScreen() {
  const router = useRouter();

  // Pin positions within the map area
  const restaurantPin = { top: 40, left: 130 };
  const household1Pin = { top: 130, left: 40 };
  const household2Pin = { top: 100, left: 240 };
  const deliveryPin = { top: 180, left: 150 };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Join the Route</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Proactive Alert Banner */}
        <LinearGradient
          colors={[Colors.orange + '20', Colors.red + '12']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.alertBanner}
        >
          <View style={styles.alertHeader}>
            <Ionicons name="sparkles" size={18} color={Colors.orange} />
            <Text style={styles.alertBadge}>Proactive Alert</Text>
          </View>
          <Text style={styles.alertText}>
            3 orders near you are from the same restaurant. Want to join the same route?
          </Text>
        </LinearGradient>

        {/* Map Visualization */}
        <View style={styles.mapContainer}>
          {/* Grid lines */}
          <View style={styles.mapGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <View key={`h${i}`} style={[styles.gridLineH, { top: i * 48 }]} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`v${i}`} style={[styles.gridLineV, { left: i * 48 }]} />
            ))}
          </View>

          {/* Route lines */}
          <MapLine
            fromTop={restaurantPin.top}
            fromLeft={restaurantPin.left}
            toTop={deliveryPin.top}
            toLeft={deliveryPin.left}
            color={Colors.red}
          />
          <MapLine
            fromTop={household1Pin.top}
            fromLeft={household1Pin.left}
            toTop={deliveryPin.top}
            toLeft={deliveryPin.left}
            color={Colors.green}
          />
          <MapLine
            fromTop={household2Pin.top}
            fromLeft={household2Pin.left}
            toTop={deliveryPin.top}
            toLeft={deliveryPin.left}
            color={Colors.green}
          />

          {/* Pins */}
          <MapPin color={Colors.red} label="Restaurant" top={restaurantPin.top} left={restaurantPin.left} />
          <MapPin color={Colors.green} label="Home 1" top={household1Pin.top} left={household1Pin.left} />
          <MapPin color={Colors.green} label="Home 2" top={household2Pin.top} left={household2Pin.left} />

          {/* Delivery point */}
          <View style={[styles.mapPin, { top: deliveryPin.top, left: deliveryPin.left }]}>
            <View style={[styles.deliveryPoint]}>
              <Ionicons name="navigate" size={16} color={Colors.primary} />
            </View>
            <Text style={styles.mapPinLabel}>Delivery</Text>
          </View>

          {/* Label */}
          <View style={styles.mapLabel}>
            <Ionicons name="git-merge-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.mapLabelText}>One optimized delivery route</Text>
          </View>
        </View>

        {/* Savings Card */}
        <View style={styles.savingsCard}>
          <Text style={styles.savingsTitle}>Potential Savings</Text>
          <Text style={styles.savingsAmount}>12 SAR</Text>
          <View style={styles.savingsBreakdown}>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Original fee</Text>
              <Text style={styles.savingsValue}>25 SAR</Text>
            </View>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Shared fee</Text>
              <Text style={styles.savingsValue}>13 SAR</Text>
            </View>
            <View style={styles.savingsDivider} />
            <View style={styles.savingsRow}>
              <Text style={styles.savingsHighlight}>You save</Text>
              <Text style={styles.savingsHighlightValue}>12 SAR</Text>
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          {BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.green} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Nearby Orders */}
        <Text style={styles.sectionTitle}>Nearby Orders</Text>
        {NEARBY_ORDERS.map((order) => (
          <View key={order.label} style={styles.nearbyCard}>
            <View style={styles.nearbyRow}>
              <View
                style={[
                  styles.nearbyIcon,
                  {
                    backgroundColor: order.isYours
                      ? Colors.primary + '14'
                      : Colors.green + '14',
                  },
                ]}
              >
                <Ionicons
                  name={order.isYours ? 'person' : 'home'}
                  size={18}
                  color={order.isYours ? Colors.primary : Colors.green}
                />
              </View>
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyLabel}>
                  {order.label}{' '}
                  <Text style={styles.nearbyRestaurant}>{'—'} {order.restaurant}</Text>
                </Text>
                <Text style={styles.nearbyMeta}>
                  {order.isYours ? 'Ready to join' : `${order.distance} · ${order.time}`}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.joinButton}
          >
            <Ionicons name="git-merge" size={20} color={Colors.textLight} />
            <Text style={styles.joinButtonText}>Join the Route</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },

  // Alert Banner
  alertBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  alertBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.orange,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 20,
  },

  // Map
  mapContainer: {
    height: 260,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.cardBorder,
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: Colors.cardBorder,
  },
  mapLine: {
    position: 'absolute',
    height: 2.5,
    borderRadius: 2,
    transformOrigin: 'left center',
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    width: 60,
  },
  mapPinDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPinIcon: {
    fontSize: 14,
  },
  mapPinLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 3,
  },
  deliveryPoint: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary + '18',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLabel: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  mapLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // Savings Card
  savingsCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  savingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.green,
    marginBottom: 16,
  },
  savingsBreakdown: {
    width: '100%',
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  savingsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  savingsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  savingsDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 6,
  },
  savingsHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.green,
  },
  savingsHighlightValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.green,
  },

  // Benefits
  benefitsCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },

  // Nearby Orders
  nearbyCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  nearbyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nearbyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  nearbyRestaurant: {
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  nearbyMeta: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 2,
  },

  // Bottom
  bottomSpacer: {
    height: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 36,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 16,
  },
  joinButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textLight,
  },
});
