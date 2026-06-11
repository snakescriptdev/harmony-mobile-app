import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_BUBBLE_WIDTH = SCREEN_WIDTH * 0.75;

// Change this to your machine's local IP when running on a real device
const API_BASE = 'http://192.168.1.67:5001';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  showConfirm?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hi, I'm Harmony. How can I help you today?",
  },
];

const SUGGESTION_CHIPS = ['Combine Multiple Orders', 'Create Group Order', 'Join Nearby Orders'];

function TypingIndicator() {
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const bounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -6, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 280, useNativeDriver: true }),
          Animated.delay(600),
        ])
      );

    const anims = [bounce(dots[0], 0), bounce(dots[1], 160), bounce(dots[2], 320)];
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);

  return (
    <View style={styles.botRow}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.botAvatar}
      >
        <Ionicons name="sparkles" size={12} color="#FFFFFF" />
      </LinearGradient>
      <View style={[styles.botBubble, styles.typingBubble]}>
        {dots.map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.typingDot, { transform: [{ translateY: dot }] }]}
          />
        ))}
      </View>
    </View>
  );
}

export default function HarmonyScreen() {
  const router = useRouter();
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const streamingContentRef = useRef('');

  if (!chatStarted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.landingWrap}>
          {/* Avatar */}
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.landingAvatar}
          >
            <Ionicons name="sparkles" size={36} color="#FFFFFF" />
          </LinearGradient>

          <Text style={styles.landingTitle}>Harmony</Text>
          <Text style={styles.landingSubtitle}>Your AI delivery assistant</Text>

          {/* Feature highlights */}
          <View style={styles.landingFeatures}>
            {[
              { icon: 'layers-outline' as const, label: 'Combine Multiple Orders' },
              { icon: 'people-outline' as const, label: 'Create Group Orders' },
              { icon: 'git-merge-outline' as const, label: 'Join Nearby Routes' },
            ].map((f) => (
              <View key={f.label} style={styles.landingFeatureRow}>
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.landingFeatureIcon}
                >
                  <Ionicons name={f.icon} size={16} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.landingFeatureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.startButtonWrap}
            onPress={() => setChatStarted(true)}
          >
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButton}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Start Chatting</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setStreaming(true);
    scrollToBottom();

    // Insert an empty bot bubble immediately — we'll stream text into it
    const botMsgId = `bot-${Date.now()}`;
    streamingContentRef.current = '';
    setMessages((prev) => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);

    const apiMessages = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data: { reply: string }) => {
        const raw = data.reply;
        const showConfirm = raw.includes('[CONFIRM_ORDER]');
        const fullText = raw.replace('[CONFIRM_ORDER]', '').trimEnd();
        let charIndex = 0;

        // Reveal 2 characters every 18ms — feels like real LLM streaming (~110 chars/sec)
        const timer = setInterval(() => {
          charIndex = Math.min(charIndex + 2, fullText.length);
          const snapshot = fullText.slice(0, charIndex);
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, content: snapshot } : m))
          );
          scrollToBottom();
          if (charIndex >= fullText.length) {
            clearInterval(timer);
            if (showConfirm) {
              setMessages((prev) =>
                prev.map((m) => (m.id === botMsgId ? { ...m, showConfirm: true } : m))
              );
            }
            setStreaming(false);
          }
        }, 18);
      })
      .catch(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? { ...m, content: "Sorry, I'm having trouble connecting right now. Please try again." }
              : m
          )
        );
        setStreaming(false);
      });
  };

  const handleChipPress = (chip: string) => {
    sendMessage(chip);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((msg, index) => {
            if (msg.role === 'assistant') {
              // Empty content means the TypingIndicator is handling this slot
              if (!msg.content) return null;
              return (
                <View key={msg.id}>
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
                      <Text style={styles.botText}>{msg.content}</Text>
                    </View>
                  </View>

                  {/* Show chips only after first welcome message */}
                  {index === 0 && (
                    <View style={styles.chipsContainer}>
                      {SUGGESTION_CHIPS.map((chip) => (
                        <TouchableOpacity
                          key={chip}
                          style={styles.chip}
                          onPress={() => handleChipPress(chip)}
                        >
                          <Text style={styles.chipText}>{chip}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Confirm Order button */}
                  {msg.showConfirm && (
                    <TouchableOpacity
                      style={styles.confirmButtonWrap}
                      activeOpacity={0.85}
                      onPress={() => router.push('/combine-orders')}
                    >
                      <LinearGradient
                        colors={[Colors.gradientStart, Colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.confirmButton}
                      >
                        <Ionicons name="layers" size={16} color="#FFFFFF" />
                        <Text style={styles.confirmButtonText}>Confirm Order</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }

            return (
              <View key={msg.id} style={styles.userRow}>
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.userBubble}
                >
                  <Text style={styles.userText}>{msg.content}</Text>
                </LinearGradient>
              </View>
            );
          })}

          {streaming && messages[messages.length - 1]?.content === '' && (
            <TypingIndicator />
          )}

          <View style={styles.chatBottomSpacer} />
        </ScrollView>

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
              onSubmitEditing={() => sendMessage(inputText)}
            />
            <TouchableOpacity
              style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
              activeOpacity={0.7}
              onPress={() => sendMessage(inputText)}
              disabled={streaming}
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
    height: 24,
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
    minWidth: 48,
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

  confirmButtonWrap: {
    marginLeft: 36,
    marginTop: 6,
    marginBottom: 4,
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 5,
    minWidth: 64,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textTertiary,
  },

  /* Landing screen */
  landingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 0,
  },
  landingAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  landingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  landingSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  landingFeatures: {
    width: '100%',
    gap: 14,
    marginBottom: 48,
  },
  landingFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  landingFeatureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingFeatureLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  startButtonWrap: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
    borderRadius: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
