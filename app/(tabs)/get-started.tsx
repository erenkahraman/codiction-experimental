import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  View,
  Text 
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function GetStarted() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    'print("Hello, world!")',
    'echo "Hello, world!"',
    'printf("Hello, world!")',
    'print(Hello, world!)'
  ];

  const correctAnswer = 'print("Hello, world!")';

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => setShowResult(true), 300);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resultOpacity = useSharedValue(0);

  React.useEffect(() => {
    resultOpacity.value = withTiming(showResult ? 1 : 0, { duration: 400 });
  }, [showResult]);

  const resultAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: resultOpacity.value,
      transform: [{
        translateY: withTiming(showResult ? 0 : 10, { duration: 300 })
      }]
    };
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#0f172a']}
        style={styles.backgroundGradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heroTitle}>⚡ CodeQuest: Terminal Trials</Text>
            <Text style={styles.heroSubtitle}>
              Master Python and fix corrupted systems — one function at a time.
            </Text>
          </View>

          {/* Mission Brief */}
          <View style={styles.briefCard}>
            <Text style={styles.briefTitle}>🎮 Mission Briefing</Text>
            <Text style={styles.briefText}>
              Systems are crashing. To restore balance, you must learn Python syntax and execute critical commands correctly.
            </Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionTitle}>Quick Challenge</Text>
            <Text style={styles.questionText}>
              Which of the following prints <Text style={styles.codeHighlight}>Hello, world!</Text> correctly in Python?
            </Text>
            
            {/* Options */}
            <View style={styles.optionsContainer}>
              {options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === correctAnswer;
                const showFeedback = showResult && isSelected;
                
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswerSelect(option)}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOption,
                      showFeedback && isCorrect && styles.correctOption,
                      showFeedback && !isCorrect && styles.incorrectOption,
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionLabel}>
                        <Text style={styles.optionLabelText}>{String.fromCharCode(65 + index)}</Text>
                      </View>
                      <Text style={styles.optionText}>{option}</Text>
                      {showFeedback && (
                        <MaterialIcons 
                          name={isCorrect ? "check-circle" : "cancel"} 
                          size={20} 
                          color={isCorrect ? "#22c55e" : "#ef4444"} 
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Result */}
          {showResult && (
            <Animated.View style={[styles.resultCard, resultAnimatedStyle]}>
              <View style={styles.resultContent}>
                <MaterialIcons 
                  name={selectedAnswer === correctAnswer ? "celebration" : "lightbulb-outline"} 
                  size={28} 
                  color={selectedAnswer === correctAnswer ? "#22c55e" : "#f59e0b"} 
                />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultTitle}>
                    {selectedAnswer === correctAnswer ? "Perfect! 🎉" : "Almost there!"}
                  </Text>
                  <Text style={styles.resultDescription}>
                    {selectedAnswer === correctAnswer 
                      ? "You nailed it! print() is Python's built-in function for displaying text."
                      : "The correct answer is A. In Python, we use print() function with quotes and parentheses."
                    }
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {!showResult ? (
              <View style={styles.hintContainer}>
                <MaterialIcons name="lightbulb-outline" size={16} color="#64748b" />
                <Text style={styles.hintText}>💡 Think about Python's print function syntax</Text>
              </View>
            ) : (
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.tryAgainButton} onPress={resetQuiz}>
                  <Text style={styles.tryAgainText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton}>
                  <LinearGradient
                    colors={['#4f46e5', '#6366f1']}
                    style={styles.continueGradient}
                  >
                    <Text style={styles.continueText}>Continue</Text>
                    <MaterialIcons name="arrow-forward" size={18} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Tip */}
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Pro Tip</Text>
            <Text style={styles.tipText}>
              In Python, print() is a function. Always remember to use parentheses and quotes for strings!
            </Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  briefCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  briefTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  briefText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
    marginBottom: 20,
  },
  codeHighlight: {
    color: '#22c55e',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#0f172a',
    borderWidth: 2,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 16,
  },
  selectedOption: {
    borderColor: '#6366f1',
    backgroundColor: '#1e1b4b',
  },
  correctOption: {
    borderColor: '#22c55e',
    backgroundColor: '#064e3b',
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: '#450a0a',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: 'white',
    fontFamily: 'monospace',
  },
  resultCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  actionSection: {
    marginBottom: 24,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hintText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  tryAgainButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#374151',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  tryAgainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d1d5db',
  },
  continueButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  tipCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
}); 