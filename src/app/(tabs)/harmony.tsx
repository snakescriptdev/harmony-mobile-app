import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_BUBBLE_WIDTH = SCREEN_WIDTH * 0.75;

export default function HarmonyScreen() {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <Image
              source={require('@/assets/images/harmony-icon.jpeg')}
              style={styles.harmonyIcon}
              contentFit="contain"
            />
            <Text style={styles.headerTitle}>Harmony</Text>
            <Text style={styles.sparkleEmoji}>{' ✨'}</Text>
          </View>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>online</Text>
          </View>
        </View>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Bot Message 1 */}
          <View style={styles.botRow}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.botAvatar}
            >
              <Ionicons name="sparkles" size={12} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.botBubble}>
              <Text style={styles.botText}>
                Hi, I'm Harmony. How can I help you today?
              </Text>
            </View>
          </View>

          {/* Suggestion Chips */}
          <View style={styles.chipsContainer}>
            {['Combine Multiple Orders', 'Create Group Order', 'Join Nearby Orders'].map(
              (chip) => (
                <TouchableOpacity key={chip} style={styles.chip}>
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* User Message */}
          <View style={styles.userRow}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.userBubble}
            >
              <Text style={styles.userText}>
                I want coffee & dates from Barn's, and soup & sambousa from
                Mastoor.
              </Text>
            </LinearGradient>
          </View>

          {/* Bot Message 2 */}
          <View style={styles.botRow}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.botAvatar}
            >
              <Ionicons name="sparkles" size={12} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.botBubble}>
              <Text style={styles.botText}>
                I found orders from two different stores. I can combine them into
                one delivery trip.
              </Text>
            </View>
          </View>

          {/* Bot Message 3 — Action Card */}
          <View style={styles.botRow}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.botAvatar}
            >
              <Ionicons name="sparkles" size={12} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.actionCard}>
              <Text style={styles.actionCardTitle}>Combined Order</Text>

              <View style={styles.restaurantItem}>
                <Ionicons
                  name="restaurant-outline"
                  size={16}
                  color={Colors.primary}
                />
                <Text style={styles.restaurantText}>
                  <Text style={styles.restaurantName}>Barn's</Text> — Arabic
                  Coffee, Dates
                </Text>
              </View>

              <View style={styles.restaurantItem}>
                <Ionicons
                  name="restaurant-outline"
                  size={16}
                  color={Colors.primary}
                />
                <Text style={styles.restaurantText}>
                  <Text style={styles.restaurantName}>Mastoor</Text> — Lentil
                  Soup, Sambousa
                </Text>
              </View>

              <View style={styles.divider} />

              {['Single Checkout', 'Optimized Route', 'Save 8 SAR on delivery'].map(
                (benefit) => (
                  <View key={benefit} style={styles.benefitRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={Colors.success}
                    />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                )
              )}

              <TouchableOpacity
                style={styles.combineButton}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.combineButtonGradient}
                >
                  <Text style={styles.combineButtonText}>Combine Orders</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom spacing for alert banner */}
          <View style={styles.chatBottomSpacer} />
        </ScrollView>

        {/* Proactive Alert Banner */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.alertBanner}
        >
          <View style={styles.alertTop}>
            <View style={styles.alertIconRow}>
              <View style={styles.alertIcon}>
                <Ionicons name="sparkles" size={12} color={Colors.primary} />
              </View>
              <Text style={styles.alertLabel}>Proactive Alert</Text>
            </View>
            <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
              <Text style={styles.joinButtonText}>Join the Route</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.alertMessage}>
            3 orders near you from the same restaurant. Join the route and save
            12 SAR!
          </Text>
        </LinearGradient>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask Harmony anything..."
              placeholderTextColor={Colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              returnKeyType="default"
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() ? styles.sendButtonActive : null,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-up"
                size={20}
                color={inputText.trim() ? '#FFFFFF' : Colors.textTertiary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.cardBorder,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  harmonyIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 8,
  },
  sparkleEmoji: {
    fontSize: 16,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 34,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 5,
  },
  onlineText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  headerRight: {
    width: 32,
  },

  /* Chat Area */
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  chatBottomSpacer: {
    height: 16,
  },

  /* Bot Messages */
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    maxWidth: MAX_BUBBLE_WIDTH + 36,
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  botBubble: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: MAX_BUBBLE_WIDTH,
  },
  botText: {
    fontSize: 15,
    lineHeight: 21,
    color: Colors.text,
  },

  /* User Messages */
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  userBubble: {
    borderRadius: 18,
    borderTopRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: MAX_BUBBLE_WIDTH,
  },
  userText: {
    fontSize: 15,
    lineHeight: 21,
    color: Colors.textLight,
  },

  /* Suggestion Chips */
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 36,
    marginBottom: 12,
    gap: 8,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },

  /* Action Card */
  actionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    maxWidth: MAX_BUBBLE_WIDTH,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  restaurantName: {
    fontWeight: '700',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    fontWeight: '500',
  },
  combineButton: {
    marginTop: 14,
    borderRadius: 12,
    overflow: 'hidden',
  },
  combineButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  combineButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textLight,
  },

  /* Proactive Alert Banner */
  alertBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  alertTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  alertLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textLight,
  },
  joinButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textLight,
  },
  alertMessage: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.92)',
  },

  /* Input Area */
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 0.5,
    borderTopColor: Colors.cardBorder,
    backgroundColor: Colors.background,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    maxHeight: 100,
    paddingVertical: 6,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
});
