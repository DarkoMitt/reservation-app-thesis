import { useNavigation, useRoute } from '@react-navigation/native';

export function usePredictionDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const reservation = route.params?.reservation;

  const handleBack = () => {
    navigation.goBack();
  };

  const riskLevel = reservation?.no_show_risk || 'low';
  const riskPercentage = Number(reservation?.risk_percentage || 0);
  const factors = Array.isArray(reservation?.prediction_factors)
    ? reservation.prediction_factors
    : [];

  const explanation =
    reservation?.prediction_explanation ||
    'The prediction is based on the customer reservation history, trust score and previous attendance behaviour.';

  const updatedAt = reservation?.prediction_updated_at || null;

  return {
    reservation,
    riskLevel,
    riskPercentage,
    factors,
    explanation,
    updatedAt,
    handleBack,
  };
}