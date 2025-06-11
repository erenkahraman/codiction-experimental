import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}

function FeatureCard({ title, description, icon, color, delay }: FeatureCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.featureCard, animatedStyle]}>
      <ThemedView style={styles.featureCardContent}>
        <ThemedView style={styles.featureHeader}>
          <ThemedText style={styles.featureIcon}>{icon}</ThemedText>
          <ThemedText style={[styles.featureTitle, { color }]}>{title}</ThemedText>
        </ThemedView>
        <ThemedText style={styles.featureDescription}>{description}</ThemedText>
      </ThemedView>
    </Animated.View>
  );
}

function CTAButton() {
  const router = useRouter();
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(300, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    scale.value = withDelay(300, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    router.push('/(tabs)/get-started');
  };

  return (
    <Animated.View style={[styles.ctaContainer, animatedStyle]}>
      <TouchableOpacity style={styles.ctaButton} onPress={handlePress} activeOpacity={0.8}>
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          style={styles.ctaGradient}
        >
          <ThemedText style={styles.ctaText}>Get Started</ThemedText>
          <MaterialIcons name="chevron-right" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    heroTranslateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) });
  }, []);

  const heroAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: heroOpacity.value,
      transform: [{ translateY: heroTranslateY.value }],
    };
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.backgroundGradient}
      >
        <ThemedView style={styles.content}>
          {/* Hero Section */}
          <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
            <ThemedText style={styles.heroTitle}>
              Learn to Code.{'\n'}Build your logic muscle.
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Start with Python. Progress through mini challenges. Unlock real coding skills, one level at a time.
            </ThemedText>
          </Animated.View>

          {/* CTA Button */}
          <CTAButton />

          {/* Feature Cards */}
          <ThemedView style={styles.featuresSection}>
            <FeatureCard
              title="Path-Based Learning"
              description="Follow a clear path from basics to advanced algorithms. Every level builds real coding intuition."
              icon="🏁"
              color="#22c55e"
              delay={500}
            />
            <FeatureCard
              title="Interactive AI Mentor"
              description="Stuck? Ask your assistant. It's not just chat—it understands your level and gives contextual guidance."
              icon="💬"
              color="#facc15"
              delay={600}
            />
            <FeatureCard
              title="Mini Challenges"
              description="Solve real coding puzzles. Syntax, logic, and algorithmic thinking—all built-in."
              icon="🧠"
              color="#3b82f6"
              delay={700}
            />
            <FeatureCard
              title="App-First Experience"
              description="Designed natively for mobile interaction. Swipe, tap, solve—no clunky interfaces."
              icon="📱"
              color="#ec4899"
              delay={800}
            />
          </ThemedView>
        </ThemedView>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  backgroundGradient: {
    minHeight: height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 64,
    paddingTop: 96,
    backgroundColor: 'transparent',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    lineHeight: 52,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 24,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 64,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  featuresSection: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    backgroundColor: 'transparent',
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  featureCardContent: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
    gap: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
});
