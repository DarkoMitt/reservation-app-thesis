import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../../app/navigation/types';

type ChooseRoleNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ChooseRole'
>;

export function useChooseRole() {
  const navigation = useNavigation<ChooseRoleNavigationProp>();

  const handleCustomerPress = () => {
    navigation.navigate('CustomerRegister');
  };

  const handleRestaurantPress = () => {
    navigation.navigate('RestaurantRegister');
  };

  const handleLoginPress = () => {
  navigation.navigate('Login');
  };

  return {
    handleCustomerPress,
    handleRestaurantPress,
    handleLoginPress,
  };
}