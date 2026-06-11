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

interface TimeSlot {
  time: string;
  label: string;
  color: string;
  highlighted?: boolean;
}

const TIME_SLOTS: TimeSlot[] = [
  { time: '6 PM', label: 'Low demand', color: Colors.green },
  { time: '7 PM', label: 'Medium demand', color: Colors.warning },
  { time: '7:12 PM', label: 'Recommended', color: Colors.green, highlighted: true },
  { time: '8 PM', label: 'Peak demand', color: Colors.red },
  { time: '9 PM', label: 'High demand', color: Colors.orange },
];

interface ScheduledOrder {
  title: string;
  time: string;
  restaurant: string;
  recurring: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const SCHEDULED_ORDERS: ScheduledOrder[] = [
  {
    title: 'Weekly Breakfast',
    time: 'Every Sun, 9 AM',
    restaurant: "Barn's Cafe",
    recurring: true,
    icon: 'cafe-outline',
  },
  {
    title: 'Team Lunch',
    time: 'Thu, 12:30 PM',
    restaurant: 'Mastoor',
    recurring: false,
    icon: 'people-outline',
  },
  {
    title: 'Family Dinner',
    time: 'Fri, 8 PM',
    restaurant: 'Al Reef',
    recurring: true,
    icon: 'home-outline',
  },
];

const FEATURES = [
  'Scheduled Orders',
  'Recurring Orders',
  'Smart Reminders',
  'AI Optimized Timing',
];

export default function SchedulingScreen() {
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
          <Text style={styles.headerTitle}>Smart Scheduling</Text>
        </View>

        {/* Harmony Suggestion Card */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.harmonyCard}
        >
          <Text style={styles.harmonyLabel}>
            {'✨ Harmony analyzed your patterns'}
          </Text>
          <Text style={styles.harmonyText}>
            You usually order dinner around 8 PM. I recommend placing
            tomorrow's order at 7:12 PM to avoid peak demand and save 5 SAR.
          </Text>
        </LinearGradient>

        {/* Schedule New Order */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule an Order</Text>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleIconWrap}>
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleLabel}>Date</Text>
              <Text style={styles.scheduleValue}>Tomorrow, June 12</Text>
            </View>
          </View>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleIconWrap}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleLabel}>Time</Text>
              <View style={styles.timeRow}>
                <Text style={styles.scheduleValueStrike}>8:00 PM</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.textTertiary} />
                <Text style={styles.scheduleValue}>7:12 PM</Text>
                <View style={styles.optimalBadge}>
                  <Text style={styles.optimalBadgeText}>Optimal</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleIconWrap}>
              <Ionicons name="restaurant-outline" size={20} color={Colors.primary} />
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleLabel}>Restaurant</Text>
              <Text style={styles.schedulePlaceholder}>Choose restaurant...</Text>
            </View>
          </View>
        </View>

        {/* AI Timing Analysis */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI Timing Analysis</Text>
          {TIME_SLOTS.map((slot) => (
            <View
              key={slot.time}
              style={[
                styles.timeSlotRow,
                slot.highlighted && styles.timeSlotHighlighted,
              ]}
            >
              <View
                style={[styles.timeSlotDot, { backgroundColor: slot.color }]}
              />
              <Text
                style={[
                  styles.timeSlotTime,
                  slot.highlighted && styles.timeSlotTimeHighlighted,
                ]}
              >
                {slot.time}
              </Text>
              <Text
                style={[
                  styles.timeSlotLabel,
                  slot.highlighted && styles.timeSlotLabelHighlighted,
                ]}
              >
                {slot.label}
              </Text>
            </View>
          ))}
          <View style={styles.timingNote}>
            <Ionicons name="information-circle" size={16} color={Colors.green} />
            <Text style={styles.timingNoteText}>
              Ordering at 7:12 PM saves 5 SAR and arrives 10 min faster
            </Text>
          </View>
        </View>

        {/* Scheduled Orders */}
        <Text style={styles.sectionTitle}>Your Scheduled Orders</Text>
        {SCHEDULED_ORDERS.map((order) => (
          <View key={order.title} style={styles.scheduledCard}>
            <View style={styles.scheduledIconWrap}>
              <Ionicons name={order.icon} size={22} color={Colors.primary} />
            </View>
            <View style={styles.scheduledInfo}>
              <Text style={styles.scheduledTitle}>{order.title}</Text>
              <Text style={styles.scheduledTime}>
                {order.time} — {order.restaurant}
              </Text>
            </View>
            <View
              style={[
                styles.typeBadge,
                {
                  backgroundColor: order.recurring
                    ? Colors.info + '14'
                    : Colors.orange + '14',
                },
              ]}
            >
              <Text
                style={[
                  styles.typeBadgeText,
                  {
                    color: order.recurring ? Colors.info : Colors.orange,
                  },
                ]}
              >
                {order.recurring ? 'Recurring 🔄' : 'One-time'}
              </Text>
            </View>
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
            <Text style={styles.bottomButtonText}>Schedule Order</Text>
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

  // Schedule Form
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  scheduleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  scheduleValueStrike: {
    fontSize: 15,
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  schedulePlaceholder: {
    fontSize: 15,
    color: Colors.textTertiary,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optimalBadge: {
    backgroundColor: Colors.green + '14',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  optimalBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.green,
  },

  // Timing Analysis
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 2,
  },
  timeSlotHighlighted: {
    backgroundColor: Colors.green + '0D',
  },
  timeSlotDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  timeSlotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    width: 70,
  },
  timeSlotTimeHighlighted: {
    color: Colors.green,
    fontWeight: '700',
  },
  timeSlotLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  timeSlotLabelHighlighted: {
    color: Colors.green,
    fontWeight: '600',
  },
  timingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: Colors.green + '0D',
    borderRadius: 10,
    padding: 12,
  },
  timingNoteText: {
    fontSize: 13,
    color: Colors.green,
    fontWeight: '500',
    flex: 1,
    lineHeight: 19,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 4,
  },

  // Scheduled Orders
  scheduledCard: {
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
  scheduledIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduledInfo: {
    flex: 1,
  },
  scheduledTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  scheduledTime: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  typeBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
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
