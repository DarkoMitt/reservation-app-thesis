import { useEffect, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
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

type RatingSummary = {
  total_reviews: number;
  overall_rating: number;
  food_rating: number;
  service_rating: number;
  atmosphere_rating: number;
  most_common_price_per_person: number | null;
};

type TimePickerType =
  | 'monThuStart'
  | 'monThuEnd'
  | 'friSunStart'
  | 'friSunEnd'
  | null;

  export const cuisineOptions = [
  'Traditional',
  'Balkan',
  'Italian',
  'Mediterranean',
  'Asian',
  'Fast Food',
  'Mixed',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten-free',
  'Seafood',
];

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
    if (Array.isArray(field)) {
      return field.length > 0;
    }

    return field && field.trim().length > 0;
  }).length;

  return Math.round((completedFields / fields.length) * 100);
};

export function useRestaurantProfile() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const restaurant = route.params?.restaurant as RestaurantProfile;

  const [cuisineType, setCuisineType] = useState(restaurant?.cuisine_type || '');

  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);

  const handleSelectCuisineType = (selectedCuisineType: string) => {
    setCuisineType(selectedCuisineType);
    setIsCuisineDropdownOpen(false);
  };

  const [address, setAddress] = useState(restaurant?.address || '');
  const [city, setCity] = useState(restaurant?.city || '');
  const [phone, setPhone] = useState(restaurant?.phone || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [maxGuests, setMaxGuests] = useState(String(restaurant?.max_guests || ''));

  const [monThuHours, setMonThuHours] = useState(
    restaurant?.mon_thu_hours || '09:00 - 23:00',
  );

  const [friSunHours, setFriSunHours] = useState(
    restaurant?.fri_sun_hours || '09:00 - 23:00',
  );

  const [activeTimePicker, setActiveTimePicker] =
    useState<TimePickerType>(null);

  const [timePickerDate, setTimePickerDate] = useState(new Date());

  const getTimeFromHours = (
    currentValue: string,
    type: 'start' | 'end',
  ) => {
    const [start = '09:00', end = '23:00'] = currentValue.split(' - ');
    const selected = type === 'start' ? start : end;

    const [hours, minutes] = selected.split(':').map(Number);

    const date = new Date();
    date.setHours(Number.isNaN(hours) ? 9 : hours);
    date.setMinutes(Number.isNaN(minutes) ? 0 : minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  const openTimePicker = (picker: TimePickerType) => {
    setActiveTimePicker(picker);

    if (picker === 'monThuStart') {
      setTimePickerDate(getTimeFromHours(monThuHours, 'start'));
    }

    if (picker === 'monThuEnd') {
      setTimePickerDate(getTimeFromHours(monThuHours, 'end'));
    }

    if (picker === 'friSunStart') {
      setTimePickerDate(getTimeFromHours(friSunHours, 'start'));
    }

    if (picker === 'friSunEnd') {
      setTimePickerDate(getTimeFromHours(friSunHours, 'end'));
    }
  };

  const updateWorkingHours = (
    currentValue: string,
    selectedTime: string,
    type: 'start' | 'end',
  ) => {
    const [start = '09:00', end = '23:00'] = currentValue.split(' - ');

    if (type === 'start') {
      return `${selectedTime} - ${end}`;
    }

    return `${start} - ${selectedTime}`;
  };

  const handleTimePickerChange = (_event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setActiveTimePicker(null);
      return;
    }

    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
    const selectedTime = `${hours}:${minutes}`;

    if (activeTimePicker === 'monThuStart') {
      setMonThuHours(updateWorkingHours(monThuHours, selectedTime, 'start'));
    }

    if (activeTimePicker === 'monThuEnd') {
      setMonThuHours(updateWorkingHours(monThuHours, selectedTime, 'end'));
    }

    if (activeTimePicker === 'friSunStart') {
      setFriSunHours(updateWorkingHours(friSunHours, selectedTime, 'start'));
    }

    if (activeTimePicker === 'friSunEnd') {
      setFriSunHours(updateWorkingHours(friSunHours, selectedTime, 'end'));
    }

    setActiveTimePicker(null);
  };

  const [restaurantImages, setRestaurantImages] = useState<string[]>(
    parseImages(restaurant?.restaurant_images),
  );

  const [menuImages, setMenuImages] = useState<string[]>(
    parseImages(restaurant?.menu_images),
  );

  const [hasSmokingArea, setHasSmokingArea] = useState(
    Boolean(Number(restaurant?.has_smoking_area)),
  );

  const [hasOutdoorSeating, setHasOutdoorSeating] = useState(
    Boolean(Number(restaurant?.has_outdoor_seating)),
  );

  const [hasParking, setHasParking] = useState(
    Boolean(Number(restaurant?.has_parking)),
  );

  const [hasWifi, setHasWifi] = useState(Boolean(Number(restaurant?.has_wifi)));

  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(null);
  const [showRatingDetails, setShowRatingDetails] = useState(false);

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

  const fetchRatingSummary = async () => {
    if (!restaurant?.restaurant_id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-restaurant-rating-summary.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: restaurant.restaurant_id,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setRatingSummary(data.summary);
      }
    } catch {
      setRatingSummary(null);
    }
  };

  useEffect(() => {
    fetchRatingSummary();
  }, []);

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

    const assets = result.assets || [];
    const allowedTypes = ['image/jpeg', 'image/png'];

    const validImages = assets
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
            workingHours: `${monThuHours} | ${friSunHours}`,
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
        const updatedCompletion = calculateCompletion([
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
        ]);

        setProfileCompletion(updatedCompletion);

        Alert.alert('Success', 'Restaurant profile updated successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile.');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    cuisineType,
    cuisineOptions,
    isCuisineDropdownOpen,
    setIsCuisineDropdownOpen,
    handleSelectCuisineType,
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

    activeTimePicker,
    timePickerDate,
    openTimePicker,
    handleTimePickerChange,

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
    ratingSummary,
    showRatingDetails,
    setShowRatingDetails,
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