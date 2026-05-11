import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  ChooseRole: undefined;
  CustomerRegister: undefined;
  RestaurantRegister: undefined;
  Login: undefined;
};

export type MainStackParamList = {
   CustomerDashboard: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      role: string;
      status: string;
    };
  };
  RestaurantDashboard: undefined;
  AdminDashboard: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
};