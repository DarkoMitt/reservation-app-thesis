import { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

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
  mon_thu_hours?: string;
  fri_sun_hours?: string;
  restaurant_images?: string;
  menu_images?: string;
  has_smoking_area?: number;
  has_outdoor_seating?: number;
  has_parking?: number;
  has_wifi?: number;
  email: string;
};

const parseImages = (value?: string): string[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const calculateCompletion = (fields: Array<string | string[]>) => {
  const completedFields = fields.filter(field => {
    if (Array.isArray(field)) return field.length > 0;
    return field && field.trim().length > 0;
  }).length;

  return Math.round((completedFields / fields.length) * 100);
};

export function useRestaurantProfile() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const restaurant = route.params?.restaurant as RestaurantProfile;

  const [cuisineType, setCuisineType] = useState(restaurant?.cuisine_type || '');
  const [address, setAddress] = useState(restaurant?.address || '');
  const [city, setCity] = useState(restaurant?.city || '');
  const [phone, setPhone] = useState(restaurant?.phone || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [maxGuests, setMaxGuests] = useState(String(restaurant?.max_guests || ''));

  const [monThuHours, setMonThuHours] = useState(restaurant?.mon_thu_hours || '');
  const [friSunHours, setFriSunHours] = useState(restaurant?.fri_sun_hours || '');

  const [restaurantImages, setRestaurantImages] = useState<string[]>(
    parseImages(restaurant?.restaurant_images),
  );

  const [menuImages, setMenuImages] = useState<string[]>(
    parseImages(restaurant?.menu_images),
  );

  const [hasSmokingArea, setHasSmokingArea] = useState(Boolean(Number(restaurant?.has_smoking_area)));
  const [hasOutdoorSeating, setHasOutdoorSeating] = useState(Boolean(Number(restaurant?.has_outdoor_seating)));
  const [hasParking, setHasParking] = useState(Boolean(Number(restaurant?.has_parking)));
  const [hasWifi, setHasWifi] = useState(Boolean(Number(restaurant?.has_wifi)));

  const initialCompletion = calculateCompletion([
    restaurant?.cuisine_type || '',
    restaurant?.address || '',
    restaurant?.city || '',
    restaurant?.phone || '',
    restaurant?.description || '',
    String(restaurant?.max_guests || ''),
    restaurant?.mon_thu_hours || '',
    restaurant?.fri_sun_hours || '',
    parseImages(restaurant?.restaurant_images),
    parseImages(restaurant?.menu_images),
  ]);

  const [profileCompletion, setProfileCompletion] = useState(initialCompletion);
  const [isSaving, setIsSaving] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const pickImages = async (type: 'restaurant' | 'menu') => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 5,
    });

    if (result.didCancel) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const validImages = (result.assets || [])
      .filter(asset => asset.uri)
      .filter(asset => !asset.type || allowedTypes.includes(asset.type))
      .map(asset => asset.uri as string);

    if (validImages.length === 0) {
      Alert.alert('Invalid File', 'Only JPG and PNG images are allowed.');
      return;
    }

    if (type === 'restaurant') {
      setRestaurantImages(prev => [...prev, ...validImages]);
    } else {
      setMenuImages(prev => [...prev, ...validImages]);
    }
  };

  const removeRestaurantImage = (imageUri: string) => {
    setRestaurantImages(prev => prev.filter(image => image !== imageUri));
  };

  const removeMenuImage = (imageUri: string) => {
    setMenuImages(prev => prev.filter(image => image !== imageUri));
  };

  const handleSave = async () => {
    if (!restaurant?.restaurant_id) {
      Alert.alert('Error', 'Restaurant profile is missing.');
      return;
    }

    try {
      setIsSaving(true);

      const currentData = JSON.stringify({
  cuisineType,
  address,
  city,
  phone,
  description,
  maxGuests,
  monThuHours,
  friSunHours,
  hasSmokingArea,
  hasOutdoorSeating,
  hasParking,
  hasWifi,
  restaurantImages,
  menuImages,
});

const originalData = JSON.stringify({
  cuisineType: restaurant?.cuisine_type || '',
  address: restaurant?.address || '',
  city: restaurant?.city || '',
  phone: restaurant?.phone || '',
  description: restaurant?.description || '',
  maxGuests: String(restaurant?.max_guests || ''),
  monThuHours: restaurant?.mon_thu_hours || '',
  friSunHours: restaurant?.fri_sun_hours || '',
  hasSmokingArea: Boolean(Number(restaurant?.has_smoking_area)),
  hasOutdoorSeating: Boolean(Number(restaurant?.has_outdoor_seating)),
  hasParking: Boolean(Number(restaurant?.has_parking)),
  hasWifi: Boolean(Number(restaurant?.has_wifi)),
  restaurantImages: parseImages(restaurant?.restaurant_images),
  menuImages: parseImages(restaurant?.menu_images),
});

if (currentData === originalData) {
  Alert.alert(
    'No Changes',
    'You have not made any changes.',
  );

  return;
}

      const workingHours = `Mon - Thu: ${monThuHours}, Fri - Sun: ${friSunHours}`;

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
            maxGuests: Number(maxGuests),
            workingHours,
            monThuHours,
            friSunHours,
            hasSmokingArea: hasSmokingArea ? 1 : 0,
            hasOutdoorSeating: hasOutdoorSeating ? 1 : 0,
            hasParking: hasParking ? 1 : 0,
            hasWifi: hasWifi ? 1 : 0,
            restaurantImage: restaurantImages[0] || '',
            menuImage: menuImages[0] || '',
            restaurantImages: JSON.stringify(restaurantImages),
            menuImages: JSON.stringify(menuImages),
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setProfileCompletion(
          calculateCompletion([
            cuisineType,
            address,
            city,
            phone,
            description,
            maxGuests,
            monThuHours,
            friSunHours,
            restaurantImages,
            menuImages,
          ]),
        );

        Alert.alert('Success', 'Restaurant profile updated successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
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
    monThuHours,
    setMonThuHours,
    friSunHours,
    setFriSunHours,
    restaurantImages,
    menuImages,
    hasSmokingArea,
    setHasSmokingArea,
    hasOutdoorSeating,
    setHasOutdoorSeating,
    hasParking,
    setHasParking,
    hasWifi,
    setHasWifi,
    profileCompletion,
    isSaving,
    handleSave,
    handleGoBack,
    pickRestaurantImages: () => pickImages('restaurant'),
    pickMenuImages: () => pickImages('menu'),
    removeRestaurantImage,
    removeMenuImage,
  };
}