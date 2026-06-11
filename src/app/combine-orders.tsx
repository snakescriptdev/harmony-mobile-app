import React, { useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAP_PADDING = 20;
const MAP_INNER_PADDING = 16;
const MAP_WIDTH = SCREEN_WIDTH - MAP_PADDING * 2 - MAP_INNER_PADDING * 2;
const MAP_HEIGHT = MAP_WIDTH * 0.85;

const PIN_B = { x: MAP_WIDTH * 0.2, y: MAP_HEIGHT * 0.15 };
const PIN_M = { x: MAP_WIDTH * 0.75, y: MAP_HEIGHT * 0.18 };
const PIN_A = { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.55 };
const HUB = { x: MAP_WIDTH * 0.5, y: MAP_HEIGHT * 0.48 };
const PIN_C = { x: MAP_WIDTH * 0.48, y: MAP_HEIGHT * 0.88 };

function getLineProps(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return { length, angle, x: from.x, y: from.y };
}

interface RestaurantItem {
  name: string;
  price: number;
}

interface Restaurant {
  letter: string;
  color: string;
  name: string;
  cuisine: string;
  items: RestaurantItem[];
}

const RESTAURANTS: Restaurant[] = [
  {
    letter: 'B',
    color: Colors.red,
    name: "Barn's Cafe",
    cuisine: 'Cafe & Bakery',
    items: [
      { name: 'Arabic Coffee', price: 18 },
      { name: 'Dates Box', price: 25 },
      { name: 'Kunafa', price: 22 },
    ],
  },
  {
    letter: 'M',
    color: Colors.orange,
    name: 'Mastoor Kitchen',
    cuisine: 'Traditional',
    items: [
      { name: 'Lentil Soup', price: 15 },
      { name: 'Sambousa x3', price: 12 },
    ],
  },
  {
    letter: 'A',
    color: Colors.green,
    name: 'Al Baik',
    cuisine: 'Fried Chicken',
    items: [
      { name: 'Broasted Chicken', price: 28 },
      { name: 'Garlic Sauce', price: 3 },
    ],
  },
];

const BENEFITS = [
  'Single Checkout',
  'Optimized Delivery Plan',
  'Lower Delivery Fees',
  'Unified Tracking',
];

function getSubtotal(restaurant: Restaurant): number {
  return restaurant.items.reduce((sum, item) => sum + item.price, 0);
}

function AnimatedRouteLine({
  from,
  to,
  color,
  delay,
  duration = 600,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  delay: number;
  duration?: number;
}) {
  const { length, angle, x, y } = getLineProps(from, to);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    width: length * progress.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          height: 3,
          backgroundColor: color,
          borderRadius: 2,
          transform: [{ rotate: `${angle}deg` }],
          transformOrigin: 'left center',
        },
        animStyle,
      ]}
    />
  );
}

function StaticPin({
  position,
  color,
  label,
  isIcon,
}: {
  position: { x: number; y: number };
  color: string;
  label: string;
  isIcon?: boolean;
}) {
  return (
    <View
      style={{ position: 'absolute', left: position.x - 14, top: position.y - 14, alignItems: 'center' }}
    >
      <View style={[styles.pinHead, { backgroundColor: color }]}>
        {isIcon ? (
          <Ionicons name="home" size={12} color="#FFF" />
        ) : (
          <Text style={styles.pinLetter}>{label}</Text>
        )}
      </View>
      <View style={[styles.pinTail, { borderTopColor: color }]} />
    </View>
  );
}

function StaticHub() {
  return (
    <View
      style={{
        position: 'absolute',
        left: HUB.x - 8,
        top: HUB.y - 8,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#2D3436',
      }}
    />
  );
}

function RouteMap() {
  const gridLines = 8;

  return (
    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.mapContainer}>
      <View style={[styles.mapGrid, { width: MAP_WIDTH, height: MAP_HEIGHT }]}>
        {Array.from({ length: gridLines }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: (MAP_HEIGHT / (gridLines - 1)) * i,
              height: 1,
              backgroundColor: '#E5E5E5',
            }}
          />
        ))}
        {Array.from({ length: gridLines }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: (MAP_WIDTH / (gridLines - 1)) * i,
              width: 1,
              backgroundColor: '#E5E5E5',
            }}
          />
        ))}

        {/* Lines render first (behind) */}
        <AnimatedRouteLine from={PIN_B} to={HUB} color={Colors.red} delay={500} duration={800} />
        <AnimatedRouteLine from={PIN_M} to={HUB} color={Colors.orange} delay={500} duration={800} />
        <AnimatedRouteLine from={PIN_A} to={HUB} color={Colors.green} delay={500} duration={800} />
        <AnimatedRouteLine from={HUB} to={PIN_C} color={Colors.darkGreen} delay={1500} duration={700} />

        {/* Pins and hub render last (on top) */}
        <StaticHub />
        <StaticPin position={PIN_B} color={Colors.red} label="B" />
        <StaticPin position={PIN_M} color={Colors.orange} label="M" />
        <StaticPin position={PIN_A} color={Colors.green} label="A" />
        <StaticPin position={PIN_C} color={Colors.darkGreen} label="" isIcon />
      </View>
      <Text style={styles.mapLabel}>One optimized delivery route</Text>
    </Animated.View>
  );
}

function RestaurantCard({ restaurant, index }: { restaurant: Restaurant; index: number }) {
  const subtotal = getSubtotal(restaurant);

  return (
    <Animated.View entering={FadeInDown.delay(300 + index * 120).duration(400)} style={styles.restaurantCard}>
      <View style={styles.restaurantHeader}>
        <View style={[styles.restaurantAvatar, { backgroundColor: restaurant.color + '18' }]}>
          <Text style={[styles.restaurantAvatarLetter, { color: restaurant.color }]}>
            {restaurant.letter}
          </Text>
        </View>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
        </View>
      </View>
      {restaurant.items.map((item) => (
        <View key={item.name} style={styles.itemRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} SAR</Text>
        </View>
      ))}
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotalValue}>{subtotal} SAR</Text>
      </View>
    </Animated.View>
  );
}

export default function CombineOrdersScreen() {
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const totalSubtotal = RESTAURANTS.reduce((sum, r) => sum + getSubtotal(r), 0);
  const originalDelivery = 45;
  const combinedDelivery = 15;
  const savings = originalDelivery - combinedDelivery;
  const total = totalSubtotal + combinedDelivery;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Combine Orders</Text>
          <Ionicons name="sparkles" size={22} color={Colors.orange} />
        </Animated.View>

        {/* Harmony Suggestion Banner */}
        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <LinearGradient
            colors={[Colors.orange + '18', Colors.red + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.suggestionBanner}
          >
            <Text style={styles.suggestionText}>
              {'✨'} Harmony found the optimal route for your combined order
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Route Map */}
        <RouteMap />

        {/* Restaurant Cards */}
        {RESTAURANTS.map((restaurant, index) => (
          <RestaurantCard key={restaurant.name} restaurant={restaurant} index={index} />
        ))}

        {/* Order Summary */}
        <Animated.View entering={FadeInDown.delay(700).duration(400)} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{totalSubtotal} SAR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Original Delivery (3 separate)</Text>
            <Text style={styles.summaryStrikethrough}>{originalDelivery} SAR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Combined Delivery</Text>
            <Text style={styles.summaryValue}>{combinedDelivery} SAR</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.savingsLabel}>You Save</Text>
            <Text style={styles.savingsValue}>{savings} SAR</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total} SAR</Text>
          </View>
        </Animated.View>

        {/* Benefits */}
        <Animated.View entering={FadeInDown.delay(850).duration(400)} style={styles.benefitsCard}>
          {BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.green} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Button */}
      <Animated.View entering={FadeInDown.delay(1000).duration(500)} style={styles.bottomBar}>
        {orderPlaced ? (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
            <Text style={styles.successText}>Order Combined Successfully!</Text>
          </View>
        ) : (
          <Pressable
            onPress={() => setOrderPlaced(true)}
            style={({ pressed }) => [pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          >
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.placeOrderButton}
            >
              <Ionicons name="layers" size={20} color={Colors.textLight} />
              <Text style={styles.placeOrderText}>Place Combined Order</Text>
            </LinearGradient>
          </Pressable>
        )}
      </Animated.View>
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

  suggestionBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },

  mapContainer: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 16,
    padding: MAP_INNER_PADDING,
    paddingBottom: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  mapGrid: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },

  pinHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pinLetter: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },

  restaurantCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  restaurantAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantAvatarLetter: {
    fontSize: 18,
    fontWeight: '800',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  restaurantCuisine: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemName: {
    fontSize: 14,
    color: Colors.text,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  subtotalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  subtotalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },

  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  summaryStrikethrough: {
    fontSize: 14,
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 8,
  },
  savingsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.green,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },

  benefitsCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
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

  bottomSpacer: {
    height: 100,
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
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 16,
  },
  placeOrderText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textLight,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.green + '18',
    borderWidth: 1.5,
    borderColor: Colors.green,
  },
  successText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.green,
  },
});
