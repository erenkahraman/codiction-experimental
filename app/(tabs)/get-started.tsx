import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Dimensions,
  View,
  Text 
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

interface ShortcutButtonProps {
  shortcut: string;
  onPress: (value: string) => void;
}

function ShortcutButton({ shortcut, onPress }: ShortcutButtonProps) {
  return (
    <TouchableOpacity
      style={styles.shortcutButton}
      onPress={() => onPress(shortcut)}
      activeOpacity={0.7}
    >
      <Text style={styles.shortcutText}>{shortcut}</Text>
    </TouchableOpacity>
  );
}

function ProgressDots() {
  const dots = Array.from({ length: 10 }, (_, i) => i);
  
  return (
    <View style={styles.progressContainer}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index === 0 ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
}

export default function GetStartedScreen() {
  const router = useRouter();
  const [showTask, setShowTask] = useState(true);
  const [code, setCode] = useState('print("Hello, world!")');
  const [output, setOutput] = useState('Hello, world!');

  const shortcutKeys = ['()', '{}', '[]', '""', "''", ':', ','];

  const insertShortcut = (value: string) => {
    setCode(code + value);
  };

  const handleRun = () => {
    // Simple simulation of running Python code
    if (code.includes('print(') && code.includes('Hello, world!')) {
      setOutput('Hello, world!');
    } else {
      setOutput('Error: Check your code syntax');
    }
  };

  const handleSubmit = () => {
    // TODO: Navigate to next challenge or show success
    console.log('Code submitted:', code);
  };

  const handleNextChallenge = () => {
    // TODO: Navigate to next challenge
    console.log('Next challenge');
  };

  const taskOpacity = useSharedValue(showTask ? 1 : 0);
  const taskAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(taskOpacity.value, { duration: 300 }),
      transform: [{ 
        translateY: withTiming(showTask ? 0 : -10, { duration: 300 }) 
      }],
    };
  });

  React.useEffect(() => {
    taskOpacity.value = showTask ? 1 : 0;
  }, [showTask]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#0f172a']}
        style={styles.backgroundGradient}
      >
        <ThemedView style={styles.content}>
          {/* Top Navigation */}
          <View style={styles.topNav}>
            <View style={styles.levelInfo}>
              <ProgressDots />
              <ThemedText style={styles.levelText}>Level 1: Print Your First Line</ThemedText>
            </View>
            <ThemedText style={styles.xpText}>XP: 0</ThemedText>
          </View>

          {/* Task & Assistant */}
          {showTask && (
            <Animated.View style={[styles.taskCard, taskAnimatedStyle]}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTask(false)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={16} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
              
              <View style={styles.taskContent}>
                <Text style={styles.teacherEmoji}>👩‍🏫</Text>
                <View style={styles.taskText}>
                  <ThemedText style={styles.taskTitle}>Let&apos;s Start with Printing</ThemedText>
                  <ThemedText style={styles.taskDescription}>
                    Welcome to your first challenge! Let&apos;s write your first line of Python code. 
                    Print the sentence: <Text style={styles.codeHighlight}>Hello, world!</Text>
                  </ThemedText>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Code Editor */}
          <View style={styles.editorCard}>
            <ThemedText style={styles.sectionLabel}>Code Editor</ThemedText>
            
            <TextInput
              value={code}
              onChangeText={setCode}
              style={styles.codeInput}
              multiline
              placeholder="Type your Python code here..."
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />

            {/* Mobile Shortcut Toolbar */}
            <View style={styles.shortcutToolbar}>
              {shortcutKeys.map((key) => (
                <ShortcutButton
                  key={key}
                  shortcut={key}
                  onPress={insertShortcut}
                />
              ))}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.runButton]}
                onPress={handleRun}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.actionButtonText}>Run</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.submitButton]}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.actionButtonText}>Submit</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Console Output */}
          <View style={styles.consoleCard}>
            <ThemedText style={styles.sectionLabel}>Console Output</ThemedText>
            <View style={styles.consoleOutput}>
              <Text style={styles.outputText}>{output}</Text>
            </View>
          </View>

          {/* Bottom Navigation */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextChallenge}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4f46e5', '#3b82f6']}
              style={styles.nextButtonGradient}
            >
              <ThemedText style={styles.nextButtonText}>Next Challenge</ThemedText>
              <MaterialIcons name="chevron-right" size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 32,
    gap: 24,
    backgroundColor: 'transparent',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelInfo: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#facc15',
  },
  inactiveDot: {
    backgroundColor: '#334155',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  xpText: {
    fontSize: 12,
    color: '#64748b',
  },
  taskCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  taskContent: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  teacherEmoji: {
    fontSize: 32,
  },
  taskText: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  codeHighlight: {
    color: '#22c55e',
    fontFamily: 'monospace',
  },
  editorCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    gap: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  codeInput: {
    backgroundColor: '#0f172a',
    color: '#22c55e',
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 16,
    borderRadius: 8,
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  shortcutToolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  shortcutButton: {
    backgroundColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  shortcutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  runButton: {
    backgroundColor: '#22c55e',
  },
  submitButton: {
    backgroundColor: '#2563eb',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  consoleCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  consoleOutput: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  outputText: {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
}); 