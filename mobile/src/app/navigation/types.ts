import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  ChooseRole: undefined;
  CustomerRegister: undefined;
  RestaurantRegister: undefined;
  Login: undefined;
};

export type MainStackParamList = {
  CustomerDashboard: undefined;
  RestaurantDashboard: undefined;
  AdminDashboard: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
};