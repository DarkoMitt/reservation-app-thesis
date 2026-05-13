import { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

type RestaurantProfile = {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_type: string;
  cuisine_type: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  max_guests: number;
  working_hours: string;
  has_smoking_area?: number;
  has_outdoor_seating?: number;
  has_parking?: number;
  has_wifi?: number;
  restaurant_image?: string;
  menu_image?: string;
  email: string;
};

export function useRestaurantProfile() {
  const route = useRoute<any>();
  const restaurant = route.params?.restaurant as RestaurantProfile;

  const navigation = useNavigation();

const handleGoBack = () => {
  navigation.goBack();
};
  const [cuisineType, setCuisineType] = useState(restaurant?.cuisine_type || '');
  const [address, setAddress] = useState(restaurant?.address || '');
  const [city, setCity] = useState(restaurant?.city || '');
  const [phone, setPhone] = useState(restaurant?.phone || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [maxGuests, setMaxGuests] = useState(String(restaurant?.max_guests || ''));
  const [workingHours, setWorkingHours] = useState(restaurant?.working_hours || '');
  const [hasSmokingArea, setHasSmokingArea] = useState(Boolean(Number(restaurant?.has_smoking_area)));
  const [hasOutdoorSeating, setHasOutdoorSeating] = useState(Boolean(Number(restaurant?.has_outdoor_seating)));
  const [hasParking, setHasParking] = useState(Boolean(Number(restaurant?.has_parking)));
  const [hasWifi, setHasWifi] = useState(Boolean(Number(restaurant?.has_wifi)));
  const [restaurantImage, setRestaurantImage] = useState(restaurant?.restaurant_image || '');
  const [menuImage, setMenuImage] = useState(restaurant?.menu_image || '');
  const [isSaving, setIsSaving] = useState(false);

  const completionFields = [
    cuisineType,
    address,
    city,
    phone,
    description,
    maxGuests,
    workingHours,
    restaurantImage,
    menuImage,
  ];

  const completedFields = completionFields.filter(field => field && field.trim().length > 0).length;
  const profileCompletion = Math.round((completedFields / completionFields.length) * 100);

  const handleSave = async () => {
    if (!restaurant?.restaurant_id) {
      Alert.alert('Error', 'Restaurant profile is missing.');
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(
        'http://10.0.2.2/reservation-api/restaurant/update-restaurant-profile.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: restaurant.restaurant_id,
            cuisineType,
            address,
            city,
            phone,
            description,
            maxGuests,
            workingHours,
            hasSmokingArea: hasSmokingArea ? 1 : 0,
            hasOutdoorSeating: hasOutdoorSeating ? 1 : 0,
            hasParking: hasParking ? 1 : 0,
            hasWifi: hasWifi ? 1 : 0,
            restaurantImage,
            menuImage,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Restaurant profile updated successfully.');
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    restaurant,
    cuisineType,
    setCuisineType,
    address,
    setAddress,
    city,
    setCity,
    phone,
    setPhone,
    description,
    setDescription,
    maxGuests,
    setMaxGuests,
    workingHours,
    setWorkingHours,
    hasSmokingArea,
    setHasSmokingArea,
    hasOutdoorSeating,
    setHasOutdoorSeating,
    hasParking,
    setHasParking,
    hasWifi,
    setHasWifi,
    restaurantImage,
    setRestaurantImage,
    menuImage,
    setMenuImage,
    profileCompletion,
    isSaving,
    handleSave,
    handleGoBack,
  };
}