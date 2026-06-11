import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ImpactStat {
  value: string;
  label: string;
  accentColor: string;
}

const IMPACT_STATS: ImpactStat[] = [
  { value: 'SAR 1,151', label: 'Money Saved', accentColor: Colors.green },
  { value: '127', label: 'Orders Combined', accentColor: Colors.red },
  { value: '43', label: 'Group Orders', accentColor: Colors.orange },
  { value: '38', label: 'Shared Deliveries', accentColor: Colors.info },
  { value: '12', label: 'Events Organized', accentColor: Colors.gold },
  { value: '2.4 kg', label: 'Carbon Reduced', accentColor: Colors.green },
];

interface Achievement {
  icon: string;
  title: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: '\u{1F9E0}', title: 'Smart Orderer', description: 'Combined 100+ orders' },
  { icon: '\u{1F5FA}️', title: 'Route Optimizer', description: 'Optimized 50+ routes' },
  { icon: '\u{1F4B0}', title: 'Community Saver', description: 'Saved SAR 1,000+' },
  { icon: '\u{1F389}', title: 'Event Pro', description: 'Planned 10+ events' },
];

interface Activity {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  description: string;
  time: string;
}

const RECENT_ACTIVITIES: Activity[] = [
  {
    icon: 'layers-outline',
    iconColor: Colors.red,
    description: "Combined order from Barn's & Mastoor",
    time: '2 hours ago',
  },
  {
    icon: 'git-merge-outline',
    iconColor: Colors.green,
    description: 'Joined shared route — saved 12 SAR',
    time: 'Yesterday',
  },
  {
    icon: 'people-outline',
    iconColor: Colors.info,
    description: 'Group order with family — 5 participants',
    time: '2 days ago',
  },
  {
    icon: 'time-outline',
    iconColor: Colors.orange,
    description: 'Scheduled weekly breakfast order',
    time: '3 days ago',
  },
  {
    icon: 'calendar-outline',
    iconColor: Colors.gold,
    description: 'Organized team lunch event',
    time: '5 days ago',
  },
];

function StatCard({ stat }: { stat: ImpactStat }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statAccent, { backgroundColor: stat.accentColor }]} />
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <View style={styles.achievementCard}>
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
      <Text style={styles.achievementDesc}>{achievement.description}</Text>
      <View style={styles.earnedTag}>
        <Ionicons name="checkmark-circle" size={12} color={Colors.green} />
        <Text style={styles.earnedText}>Earned</Text>
      </View>
    </View>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityIconCircle, { backgroundColor: activity.iconColor + '14' }]}>
        <Ionicons name={activity.icon} size={18} color={activity.iconColor} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityDescription}>{activity.description}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Profile */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarCircle}
          >
            <Text style={styles.avatarInitials}>AH</Text>
          </LinearGradient>
          <Text style={styles.profileName}>Ahmed Hassan</Text>
          <Text style={styles.profileEmail}>ahmed.hassan@email.com</Text>
          <View style={styles.memberBadge}>
            <Ionicons name="calendar-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.memberBadgeText}>Member since 2024</Text>
          </View>
        </View>

        {/* Impact Stats Grid */}
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <View style={styles.statsGrid}>
          {IMPACT_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsRow}
        >
          {ACHIEVEMENTS.map((a) => (
            <AchievementBadge key={a.title} achievement={a} />
          ))}
        </ScrollView>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {RECENT_ACTIVITIES.map((activity, index) => (
            <React.Fragment key={activity.description}>
              <ActivityItem activity={activity} />
              {index < RECENT_ACTIVITIES.length - 1 && <View style={styles.activityDivider} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textLight,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  memberBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 4,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47.5%' as any,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statAccent: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Achievements
  achievementsRow: {
    gap: 12,
    paddingBottom: 4,
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  earnedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.green + '14',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  earnedText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.green,
  },

  // Recent Activity
  activityCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  activityIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  activityDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginLeft: 50,
  },

  bottomSpacer: {
    height: 24,
  },
});
