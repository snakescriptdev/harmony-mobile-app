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

const EVENT_TYPES = ['Ramadan', 'Eid', 'Birthday', 'Corporate', 'Office Lunch'];
const SELECTED_EVENT = 'Ramadan';

interface MenuItem {
  category: string;
  name: string;
  qty: number;
  price: number;
}

const MENU_ITEMS: MenuItem[] = [
  { category: 'Main', name: 'Mixed Grill Platter', qty: 4, price: 260 },
  { category: 'Side', name: 'Hummus & Bread', qty: 6, price: 60 },
  { category: 'Side', name: 'Fattoush Salad', qty: 4, price: 64 },
  { category: 'Drinks', name: 'Arabic Coffee', qty: 20, price: 100 },
  { category: 'Dessert', name: 'Kunafa', qty: 4, price: 88 },
];

interface Vendor {
  name: string;
  description: string;
  price: number;
  initial: string;
  color: string;
}

const VENDORS: Vendor[] = [
  {
    name: 'Mastoor Kitchen',
    description: 'Main dishes & sides',
    price: 384,
    initial: 'M',
    color: Colors.orange,
  },
  {
    name: "Barn's Cafe",
    description: 'Coffee & desserts',
    price: 188,
    initial: 'B',
    color: Colors.red,
  },
];

const FEATURES = [
  'Quantity Estimation',
  'Budget Estimation',
  'Vendor Recommendations',
  'Multi-Restaurant Coordination',
  'Delivery Scheduling',
];

export default function EventPlannerScreen() {
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
          <Text style={styles.headerTitle}>Event Planner</Text>
        </View>

        {/* Harmony Event Card */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.harmonyCard}
        >
          <Text style={styles.harmonyLabel}>
            {'✨ Let Harmony plan your event'}
          </Text>
          <Text style={styles.harmonyText}>
            Tell me the occasion, guest count, and budget — I'll handle the
            rest.
          </Text>
        </LinearGradient>

        {/* Event Setup Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Event Details</Text>

          {/* Event Type Selector */}
          <Text style={styles.fieldLabel}>Event Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillRow}
          >
            {EVENT_TYPES.map((type) => (
              <View
                key={type}
                style={[
                  styles.pill,
                  type === SELECTED_EVENT && styles.pillSelected,
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    type === SELECTED_EVENT && styles.pillTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Guest Count */}
          <Text style={styles.fieldLabel}>Guest Count</Text>
          <View style={styles.fieldValueRow}>
            <Ionicons name="people-outline" size={20} color={Colors.primary} />
            <Text style={styles.fieldValue}>20 guests</Text>
          </View>

          {/* Budget */}
          <Text style={styles.fieldLabel}>Budget</Text>
          <View style={styles.fieldValueRow}>
            <Ionicons name="wallet-outline" size={20} color={Colors.primary} />
            <Text style={styles.fieldValue}>SAR 500 - 800</Text>
          </View>

          {/* Dietary Preferences */}
          <Text style={styles.fieldLabel}>Dietary Preferences</Text>
          <View style={styles.fieldValueRow}>
            <Ionicons name="leaf-outline" size={20} color={Colors.primary} />
            <View style={styles.dietTag}>
              <Text style={styles.dietTagText}>Mixed</Text>
            </View>
          </View>
        </View>

        {/* Harmony's Plan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Harmony's Recommendation</Text>

          {/* Suggested Menu */}
          <Text style={styles.subTitle}>Suggested Menu</Text>
          {MENU_ITEMS.map((item) => (
            <View key={item.name} style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuCategory}>{item.category}</Text>
                <Text style={styles.menuName}>
                  {item.name} x{item.qty}
                </Text>
              </View>
              <Text style={styles.menuPrice}>{item.price} SAR</Text>
            </View>
          ))}

          {/* Summary */}
          <View style={styles.summaryDivider} />
          <Text style={styles.subTitle}>Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estimated Total</Text>
              <Text style={styles.summaryValue}>572 SAR</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Per Guest</Text>
              <Text style={styles.summaryValue}>~29 SAR</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Serves</Text>
              <Text style={styles.summaryValue}>20 guests</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Vendors</Text>
              <Text style={styles.summaryValue}>2 restaurants</Text>
            </View>
          </View>

          {/* Delivery Schedule */}
          <View style={styles.summaryDivider} />
          <Text style={styles.subTitle}>Delivery Schedule</Text>
          <View style={styles.deliveryRow}>
            <Ionicons name="car-outline" size={18} color={Colors.primary} />
            <Text style={styles.deliveryText}>Food arrives: 7:30 PM</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Ionicons name="construct-outline" size={18} color={Colors.orange} />
            <Text style={styles.deliveryText}>Setup time: 15 min</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Ionicons name="flag-outline" size={18} color={Colors.green} />
            <Text style={styles.deliveryText}>Event starts: 8:00 PM</Text>
          </View>
        </View>

        {/* Recommended Vendors */}
        <Text style={styles.sectionTitle}>Recommended Vendors</Text>
        {VENDORS.map((vendor) => (
          <View key={vendor.name} style={styles.vendorCard}>
            <View style={[styles.vendorAvatar, { backgroundColor: vendor.color }]}>
              <Text style={styles.vendorInitial}>{vendor.initial}</Text>
            </View>
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <Text style={styles.vendorDesc}>{vendor.description}</Text>
            </View>
            <Text style={styles.vendorPrice}>{vendor.price} SAR</Text>
          </View>
        ))}

        {/* Features */}
        <View style={styles.card}>
          {FEATURES.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Bottom Button */}
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomButton}
          >
            <Text style={styles.bottomButtonText}>Create Event Plan</Text>
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

  // Form Fields
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 14,
  },
  fieldValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },

  // Pills
  pillRow: {
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  pillSelected: {
    backgroundColor: Colors.primary,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  pillTextSelected: {
    color: Colors.textLight,
  },

  // Diet Tag
  dietTag: {
    backgroundColor: Colors.green + '14',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dietTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.green,
  },

  // Menu
  subTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  menuLeft: {
    flex: 1,
  },
  menuCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  menuName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  // Summary
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    width: '46%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },

  // Delivery
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 4,
  },

  // Vendor Card
  vendorCard: {
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
  vendorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vendorInitial: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textLight,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  vendorDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  vendorPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  // Features
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
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
