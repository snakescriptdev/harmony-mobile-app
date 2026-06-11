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

interface BundleItem {
  name: string;
  restaurant: string;
  price: number;
}

const BUNDLE_ITEMS: BundleItem[] = [
  { name: 'Arabic Coffee', restaurant: "Barn's Cafe", price: 18 },
  { name: 'Fresh Orange Juice', restaurant: 'Juice World', price: 14 },
  { name: 'Fattoush Salad', restaurant: 'Mastoor', price: 16 },
];

interface Restaurant {
  name: string;
  rating: number;
  cuisine: string;
  badge: string;
  badgeColor: string;
  initial: string;
  initialBg: string;
}

const RESTAURANTS: Restaurant[] = [
  {
    name: "Barn's Cafe",
    rating: 4.8,
    cuisine: 'Coffee & Desserts',
    badge: 'Your favorite',
    badgeColor: Colors.red,
    initial: 'B',
    initialBg: Colors.red,
  },
  {
    name: 'Mastoor Kitchen',
    rating: 4.6,
    cuisine: 'Arabic Cuisine',
    badge: 'Trending',
    badgeColor: Colors.orange,
    initial: 'M',
    initialBg: Colors.orange,
  },
  {
    name: 'Juice World',
    rating: 4.5,
    cuisine: 'Fresh Juices',
    badge: 'New',
    badgeColor: Colors.green,
    initial: 'J',
    initialBg: Colors.green,
  },
];

interface MealPick {
  name: string;
  restaurant: string;
  price: number;
  note: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const TOP_PICKS: MealPick[] = [
  {
    name: 'Arabic Coffee & Dates',
    restaurant: "Barn's",
    price: 35,
    note: 'Ordered 12 times',
    icon: 'cafe-outline',
  },
  {
    name: 'Lentil Soup',
    restaurant: 'Mastoor',
    price: 15,
    note: "Perfect for today's weather",
    icon: 'restaurant-outline',
  },
  {
    name: 'Chicken Shawarma',
    restaurant: 'Shawarma House',
    price: 22,
    note: 'Popular nearby',
    icon: 'fast-food-outline',
  },
  {
    name: 'Mixed Grill Platter',
    restaurant: 'Al Reef',
    price: 65,
    note: 'Great for groups',
    icon: 'flame-outline',
  },
];

interface AlsoOrdered {
  name: string;
  price: number;
  icon: keyof typeof Ionicons.glyphMap;
}

const ALSO_ORDERED: AlsoOrdered[] = [
  { name: 'Mango Smoothie', price: 16, icon: 'nutrition-outline' },
  { name: 'Falafel Wrap', price: 18, icon: 'fast-food-outline' },
  { name: 'Kunafa', price: 22, icon: 'ice-cream-outline' },
];

export default function RecommendationsScreen() {
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
          <Text style={styles.headerTitle}>Smart Recommendations</Text>
          <Ionicons name="sparkles" size={22} color={Colors.orange} />
        </View>

        {/* Harmony Insight Card */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.harmonyCard}
        >
          <Text style={styles.harmonyLabel}>{'✨ Harmony says'}</Text>
          <Text style={styles.harmonyText}>
            Based on your previous orders and today's weather (32°C, sunny), I
            recommend refreshing drinks and light meals.
          </Text>
        </LinearGradient>

        {/* Personalized Bundle Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Personalized Bundle</Text>
          {BUNDLE_ITEMS.map((item) => (
            <View key={item.name} style={styles.bundleRow}>
              <View style={styles.bundleInfo}>
                <Text style={styles.bundleItemName}>{item.name}</Text>
                <Text style={styles.bundleItemRestaurant}>
                  {item.restaurant}
                </Text>
              </View>
              <Text style={styles.bundleItemPrice}>{item.price} SAR</Text>
            </View>
          ))}
          <View style={styles.bundleDivider} />
          <Text style={styles.bundleTotal}>
            Bundle Total: 48 SAR{' '}
            <Text style={styles.bundleSave}>(Save 7 SAR)</Text>
          </Text>
          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.9 }]}
          >
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.orderBundleBtn}
            >
              <Text style={styles.orderBundleBtnText}>Order Bundle</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Recommended Restaurants */}
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {RESTAURANTS.map((r) => (
            <View key={r.name} style={styles.restaurantCard}>
              <View style={[styles.restaurantAvatar, { backgroundColor: r.initialBg }]}>
                <Text style={styles.restaurantInitial}>{r.initial}</Text>
              </View>
              <Text style={styles.restaurantName}>{r.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color={Colors.orange} />
                <Text style={styles.ratingText}>{r.rating}</Text>
              </View>
              <Text style={styles.cuisineText}>{r.cuisine}</Text>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: r.badgeColor + '14' },
                ]}
              >
                <Text style={[styles.badgeText, { color: r.badgeColor }]}>
                  {r.badge}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Top Picks */}
        <Text style={styles.sectionTitle}>Top Picks For You</Text>
        {TOP_PICKS.map((meal) => (
          <View key={meal.name} style={styles.mealCard}>
            <View style={styles.mealIconWrap}>
              <Ionicons name={meal.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealRestaurant}>{meal.restaurant}</Text>
              <Text style={styles.mealNote}>{meal.note}</Text>
            </View>
            <Text style={styles.mealPrice}>{meal.price} SAR</Text>
          </View>
        ))}

        {/* People Like You */}
        <Text style={styles.sectionTitle}>People Like You Also Ordered</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {ALSO_ORDERED.map((item) => (
            <View key={item.name} style={styles.alsoOrderedCard}>
              <View style={styles.alsoOrderedIcon}>
                <Ionicons name={item.icon} size={22} color={Colors.orange} />
              </View>
              <Text style={styles.alsoOrderedName}>{item.name}</Text>
              <Text style={styles.alsoOrderedPrice}>{item.price} SAR</Text>
            </View>
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

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
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

  // Bundle
  bundleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  bundleInfo: {
    flex: 1,
  },
  bundleItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  bundleItemRestaurant: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bundleItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  bundleDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 12,
  },
  bundleTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 14,
  },
  bundleSave: {
    color: Colors.green,
    fontWeight: '600',
  },
  orderBundleBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  orderBundleBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textLight,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 4,
  },
  horizontalList: {
    gap: 12,
    paddingBottom: 4,
    marginBottom: 20,
  },

  // Restaurant Card
  restaurantCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  restaurantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  restaurantInitial: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textLight,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  cuisineText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Meal Card
  mealCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mealIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  mealRestaurant: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  mealNote: {
    fontSize: 12,
    color: Colors.orange,
    marginTop: 3,
    fontWeight: '500',
  },
  mealPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  // Also Ordered
  alsoOrderedCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  alsoOrderedIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.orange + '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  alsoOrderedName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  alsoOrderedPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },

  bottomSpacer: {
    height: 40,
  },
});
