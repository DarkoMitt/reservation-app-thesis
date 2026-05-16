import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  ChooseRole: undefined;
  CustomerRegister: undefined;
  RestaurantRegister: undefined;
  Login: undefined;
};

export type AppUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  rejection_reason?: string | null;
};

export type MainStackParamList = {
  CustomerDashboard: {
    user: AppUser;
  };

  RestaurantDashboard: {
    user: AppUser;
  };

  AdminDashboard: {
    user?: AppUser;
  };

  RestaurantProfile: {
    restaurant: any;
    user?: AppUser;
  };

  RestaurantDetails: {
    restaurant: any;
    user: AppUser;
  };

  ReservationForm: {
    restaurant: any;
    user: AppUser;
  };

  MyReservations: {
    user: AppUser;
  };

  ReservationDetails: {
    reservation: any;
    user: AppUser;
  };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
};