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

interface Participant {
  initial: string;
  name: string;
  color: string;
  items: number;
  amount: number;
  status: 'ready' | 'adding';
}

const PARTICIPANTS: Participant[] = [
  { initial: 'A', name: 'Ahmed', color: Colors.red, items: 3, amount: 65, status: 'ready' },
  { initial: 'S', name: 'Sara', color: Colors.orange, items: 2, amount: 38, status: 'ready' },
  { initial: 'Ab', name: 'Abdulaziz', color: Colors.info, items: 4, amount: 72, status: 'adding' },
  { initial: 'B', name: 'Buthaina', color: Colors.green, items: 1, amount: 25, status: 'ready' },
  { initial: 'N', name: 'Noura', color: '#8B5CF6', items: 2, amount: 45, status: 'ready' },
];

const FEATURES = [
  'Shared Cart',
  'Bill Splitting',
  'Delivery Coordination',
  'Multi-Restaurant Support',
];

function ParticipantRow({ participant }: { participant: Participant }) {
  const isReady = participant.status === 'ready';

  return (
    <View style={styles.participantRow}>
      <View style={[styles.participantAvatar, { backgroundColor: participant.color + '18' }]}>
        <Text style={[styles.participantInitial, { color: participant.color }]}>
          {participant.initial}
        </Text>
      </View>
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{participant.name}</Text>
        <Text style={styles.participantDetails}>
          {participant.items} {participant.items === 1 ? 'item' : 'items'} {'·'}{' '}
          {participant.amount} SAR
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: isReady ? Colors.green + '14' : Colors.orange + '14' },
        ]}
      >
        {isReady ? (
          <>
            <Text style={[styles.statusText, { color: Colors.green }]}>Ready</Text>
            <Ionicons name="checkmark" size={14} color={Colors.green} />
          </>
        ) : (
          <Text style={[styles.statusText, { color: Colors.orange }]}>Adding items...</Text>
        )}
      </View>
    </View>
  );
}

export default function GroupOrderScreen() {
  const router = useRouter();

  const totalItems = PARTICIPANTS.reduce((sum, p) => sum + p.items, 0);
  const subtotal = PARTICIPANTS.reduce((sum, p) => sum + p.amount, 0);
  const deliveryFee = 15;
  const perPerson = Math.round(deliveryFee / PARTICIPANTS.length);
  const total = subtotal + deliveryFee;

  const hasAdding = PARTICIPANTS.some((p) => p.status === 'adding');

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
          <Text style={styles.headerTitle}>Group Order</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Shareable Link Card */}
        <View style={styles.linkCard}>
          <Text style={styles.linkCardTitle}>Group Order Link</Text>
          <View style={styles.linkRow}>
            <View style={styles.linkField}>
              <Ionicons name="link-outline" size={16} color={Colors.textTertiary} />
              <Text style={styles.linkText}>harmony.app/g/family-6</Text>
            </View>
            <Pressable style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </Pressable>
          </View>
          <Text style={styles.linkSubtext}>
            Family joined {'·'} adding from 3 restaurants
          </Text>
        </View>

        {/* Participants */}
        <Text style={styles.sectionTitle}>Participants ({PARTICIPANTS.length})</Text>
        <View style={styles.participantsCard}>
          {PARTICIPANTS.map((participant, index) => (
            <React.Fragment key={participant.name}>
              <ParticipantRow participant={participant} />
              {index < PARTICIPANTS.length - 1 && <View style={styles.participantDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Shared Cart Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Shared Cart Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>{totalItems}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{subtotal} SAR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>{deliveryFee} SAR</Text>
          </View>
          <View style={styles.splitRow}>
            <Text style={styles.splitText}>
              Split {PARTICIPANTS.length} ways = {perPerson} SAR each
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total} SAR</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          {FEATURES.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.green} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.placeOrderButton}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.placeOrderText}>Place Group Order</Text>
              {hasAdding && (
                <Text style={styles.placeOrderSubtext}>Waiting for Abdulaziz...</Text>
              )}
            </View>
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

  // Link Card
  linkCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  linkCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  linkField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  copyButton: {
    backgroundColor: Colors.primary + '14',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  linkSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },

  // Participants
  participantsCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantInitial: {
    fontSize: 15,
    fontWeight: '800',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  participantDetails: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  participantDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 6,
  },

  // Summary
  summaryCard: {
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
  splitRow: {
    paddingVertical: 4,
  },
  splitText: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 8,
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

  // Features
  featuresCard: {
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
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
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
  placeOrderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 16,
  },
  buttonContent: {
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textLight,
  },
  placeOrderSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});
