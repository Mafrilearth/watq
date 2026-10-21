import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  calculateJungianScores,
  JUNGIAN_QUESTIONS,
  LikertValue,
  AssessmentResult,
} from '@watq/core';

type ScreenState = 'WELCOME' | 'ASSESSMENT' | 'RESULT';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('WELCOME');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, LikertValue>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQuestion = JUNGIAN_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / JUNGIAN_QUESTIONS.length) * 100);

  const handleSelectAnswer = (value: LikertValue) => {
    const updated = { ...responses, [currentQuestion.id]: value };
    setResponses(updated);

    if (currentIndex < JUNGIAN_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all 24 questions! Compute result via @watq/core
      const finalResult = calculateJungianScores(updated);
      setResult(finalResult);
      setScreen('RESULT');
    }
  };

  const handleReset = () => {
    setResponses({});
    setCurrentIndex(0);
    setResult(null);
    setScreen('WELCOME');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Universal Top Brand Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>W</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>WATQ</Text>
              <Text style={styles.brandSubtitle}>Personality Decoded</Text>
            </View>
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>v1.0.1 Native</Text>
          </View>
        </View>

        {/* SCREEN 1: WELCOME */}
        {screen === 'WELCOME' && (
          <ScrollView contentContainerStyle={styles.centerContent} showsVerticalScrollIndicator={false}>
            <View style={styles.heroCard}>
              <Text style={styles.heroBadge}>Jungian 1921 Cognitive Typology</Text>
              <Text style={styles.heroHeading} accessibilityRole="header">
                Decode Your Cognitive Wiring.
              </Text>
              <Text style={styles.heroDescription}>
                A deterministic psychometric instrument evaluating 4 bipolar cognitive axes across 24 calibrated Likert items.
              </Text>

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>24</Text>
                  <Text style={styles.metricLabel}>Items</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>3 min</Text>
                  <Text style={styles.metricLabel}>Duration</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>16</Text>
                  <Text style={styles.metricLabel}>Archetypes</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => setScreen('ASSESSMENT')}
              >
                <Text style={styles.primaryButtonText}>Start Assessment →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* SCREEN 2: ASSESSMENT RUNNER */}
        {screen === 'ASSESSMENT' && (
          <View style={styles.assessmentContainer}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  Question {currentIndex + 1} of {JUNGIAN_QUESTIONS.length}
                </Text>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              </View>
            </View>

            {/* Question Card */}
            <ScrollView contentContainerStyle={styles.questionCard} showsVerticalScrollIndicator={false}>
              <View style={styles.dimensionTag}>
                <Text style={styles.dimensionTagText}>Axis: {currentQuestion.dimension}</Text>
              </View>

              <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
              <Text style={styles.questionTarget}>{currentQuestion.target}</Text>

              {/* Likert Scale 1-5 */}
              <View style={styles.likertContainer}>
                {[
                  { val: 1 as LikertValue, label: 'Strongly Disagree' },
                  { val: 2 as LikertValue, label: 'Disagree' },
                  { val: 3 as LikertValue, label: 'Neutral' },
                  { val: 4 as LikertValue, label: 'Agree' },
                  { val: 5 as LikertValue, label: 'Strongly Agree' },
                ].map((opt) => {
                  const isSelected = responses[currentQuestion.id] === opt.val;
                  return (
                    <TouchableOpacity
                      key={opt.val}
                      style={[
                        styles.likertOption,
                        isSelected && styles.likertOptionActive,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => handleSelectAnswer(opt.val)}
                    >
                      <View style={[styles.likertRadio, isSelected && styles.likertRadioActive]}>
                        <Text style={[styles.likertRadioNum, isSelected && styles.likertRadioNumActive]}>
                          {opt.val}
                        </Text>
                      </View>
                      <Text style={[styles.likertLabel, isSelected && styles.likertLabelActive]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Navigation Back */}
              {currentIndex > 0 && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setCurrentIndex(currentIndex - 1)}
                >
                  <Text style={styles.backButtonText}>← Previous Question</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}

        {/* SCREEN 3: DIAGNOSIS & VOCATIONAL REPORT */}
        {screen === 'RESULT' && result && (
          <ScrollView contentContainerStyle={styles.resultContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.resultHeaderCard}>
              <Text style={styles.resultSub}>Cognitive Typology Report</Text>
              <Text style={styles.resultTypeCode}>{result.typeCode}</Text>
              <Text style={styles.resultTitle}>{result.archetypeTitle}</Text>
              <Text style={styles.resultSummary}>{result.summary}</Text>
            </View>

            {/* Polarity Breakdown */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionCardHeading}>Cognitive Polarity Dimensions</Text>
              
              <View style={styles.axisRow}>
                <Text style={styles.axisLabel}>Extraversion (E) {result.scores.E}%</Text>
                <Text style={styles.axisLabel}>Introversion (I) {result.scores.I}%</Text>
              </View>
              <View style={styles.axisBarTrack}>
                <View style={[styles.axisBarFill, { width: `${result.scores.E}%` }]} />
              </View>

              <View style={[styles.axisRow, { marginTop: 12 }]}>
                <Text style={styles.axisLabel}>Sensing (S) {result.scores.S}%</Text>
                <Text style={styles.axisLabel}>Intuition (N) {result.scores.N}%</Text>
              </View>
              <View style={styles.axisBarTrack}>
                <View style={[styles.axisBarFill, { width: `${result.scores.S}%` }]} />
              </View>

              <View style={[styles.axisRow, { marginTop: 12 }]}>
                <Text style={styles.axisLabel}>Thinking (T) {result.scores.T}%</Text>
                <Text style={styles.axisLabel}>Feeling (F) {result.scores.F}%</Text>
              </View>
              <View style={styles.axisBarTrack}>
                <View style={[styles.axisBarFill, { width: `${result.scores.T}%` }]} />
              </View>

              <View style={[styles.axisRow, { marginTop: 12 }]}>
                <Text style={styles.axisLabel}>Judging (J) {result.scores.J}%</Text>
                <Text style={styles.axisLabel}>Perceiving (P) {result.scores.P}%</Text>
              </View>
              <View style={styles.axisBarTrack}>
                <View style={[styles.axisBarFill, { width: `${result.scores.J}%` }]} />
              </View>
            </View>

            {/* Vocational Alignment */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionCardHeading}>Target Career Trajectories (ISCO-08)</Text>
              {result.careers.map((career, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.listBullet}>•</Text>
                  <Text style={styles.listText}>{career}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Retake Assessment</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 20,
  },
  brandTitle: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  badgePill: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  badgePillText: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '600',
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  heroBadge: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroHeading: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 12,
  },
  heroDescription: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
  },
  metricLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  assessmentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  progressPercent: {
    color: '#818CF8',
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  questionCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  dimensionTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 12,
  },
  dimensionTagText: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '600',
  },
  questionPrompt: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 8,
  },
  questionTarget: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 20,
  },
  likertContainer: {
    gap: 10,
  },
  likertOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  likertOptionActive: {
    backgroundColor: '#1E1B4B',
    borderColor: '#4F46E5',
  },
  likertRadio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  likertRadioActive: {
    backgroundColor: '#4F46E5',
  },
  likertRadioNum: {
    color: '#94A3B8',
    fontWeight: '700',
    fontSize: 13,
  },
  likertRadioNumActive: {
    color: '#FFFFFF',
  },
  likertLabel: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
  },
  likertLabelActive: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  resultContainer: {
    paddingVertical: 20,
    gap: 16,
  },
  resultHeaderCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  resultSub: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  resultTypeCode: {
    color: '#F9FAFB',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
  },
  resultTitle: {
    color: '#A5B4FC',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },
  resultSummary: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  sectionCardHeading: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  axisLabel: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  axisBarTrack: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 999,
    overflow: 'hidden',
  },
  axisBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  listBullet: {
    color: '#818CF8',
    fontSize: 16,
  },
  listText: {
    color: '#D1D5DB',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  resetButtonText: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '600',
  },
});
