import { useState } from 'react';
import { Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

type Restaurant = {
  id: number;
  name: string;
  type: string;
  city: string;
  address: string;
  rating: number;
  foodType: string;
  status: string;
};

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Pelister',
    type: 'Restaurant',
    city: 'Skopje',
    address: 'Macedonia Square',
    rating: 4.7,
    foodType: 'Traditional • Grill • Wine',
    status: '🟢 Open now',
  },
  {
    id: 2,
    name: 'Public Room',
    type: 'Cafe',
    city: 'Skopje',
    address: '50 Divizija',
    rating: 4.6,
    foodType: 'Cafe • Brunch • Cocktails',
    status: '🟢 Open now',
  },
  {
    id: 3,
    name: 'Skopski Merak',
    type: 'Restaurant',
    city: 'Skopje',
    address: 'Debar Maalo',
    rating: 4.8,
    foodType: 'Macedonian • Grill • Traditional',
    status: '🟠 Busy',
  },
  {
    id: 4,
    name: 'Event Garden',
    type: 'Event Venue',
    city: 'Skopje',
    address: 'Aerodrom',
    rating: 4.5,
    foodType: 'Events • Catering • Celebration',
    status: '🔴 Fully booked',
  },
];

export function useCustomerDashboard() {
  const navigation = useNavigation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Best Match');

  const filters = [
    'Best Match',
    'Open Now',
    'Highest Rated',
    'Most Visited',
    'Nearest',
    'Trending',
  ];

  const restaurants = mockRestaurants.filter(restaurant => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    return (
      restaurant.name.toLowerCase().includes(searchValue) ||
      restaurant.city.toLowerCase().includes(searchValue) ||
      restaurant.address.toLowerCase().includes(searchValue) ||
      restaurant.foodType.toLowerCase().includes(searchValue) ||
      restaurant.type.toLowerCase().includes(searchValue)
    );
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            }),
          );
        },
      },
    ]);
  };

  return {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    filters,
    restaurants,
    handleLogout,
  };
}