import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { usePredictionDetails } from './logic';
import { styles } from './styles';

const formatRiskLevel = (risk: string) => {
  if (!risk) return 'Low';

  return risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase();
};

function PredictionDetails(): React.JSX.Element {
  const {
    reservation,
    riskLevel,
    riskPercentage,
    factors,
    explanation,
    updatedAt,
    handleBack,
  } = usePredictionDetails();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Prediction Details</Text>

        <Text style={styles.subtitle}>
          No-show prediction based on customer reservation history.
        </Text>

        <View style={styles.riskCard}>
          <Text style={styles.riskLabel}>Predicted No-Show Risk</Text>

          <Text style={styles.riskValue}>
            {formatRiskLevel(riskLevel)}
          </Text>

          <Text style={styles.riskPercentage}>
            {riskPercentage}%
          </Text>

        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reservation</Text>

          <Text style={styles.infoText}>
            Customer: {reservation?.full_name || '-'}
          </Text>

          <Text style={styles.infoText}>
            Date: {reservation?.reservation_date || '-'}
          </Text>

          <Text style={styles.infoText}>
            Time: {reservation?.reservation_time || '-'}
          </Text>

          <Text style={styles.infoText}>
            Guests: {reservation?.guests_count || '-'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Factors</Text>

          {factors.length === 0 ? (
            <Text style={styles.infoText}>
              No prediction factors available.
            </Text>
          ) : (
            factors.map((factor: string, index: number) => (
              <View key={`${factor}-${index}`} style={styles.factorRow}>
                <Text style={styles.factorBullet}>•</Text>
                <Text style={styles.factorText}>{factor}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Explanation</Text>

          <Text style={styles.explanationText}>
            {explanation}
          </Text>
        </View>

        {updatedAt ? (
          <Text style={styles.updatedText}>
            Last updated: {new Date(updatedAt).toLocaleString()}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default PredictionDetails;