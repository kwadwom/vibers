import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Credit: undefined;
  SmartPurse: {
    initialSection?: 'budget' | 'savings' | 'transactions';
  };
  Menu: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 