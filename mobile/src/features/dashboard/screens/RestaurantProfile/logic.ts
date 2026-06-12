import { useEffect, useMemo, useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import {
  CommonActions,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type DayHours = Record<DayKey, string>;

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
  monday_hours?: string;
  tuesday_hours?: string;
  wednesday_hours?: string;
  thursday_hours?: string;
  friday_hours?: string;
  saturday_hours?: string;
  sunday_hours?: string;
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

type TimePickerType = {
  day: DayKey;
  part: 'start' | 'end';
} | null;

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

export const DAYS: { key: DayKey; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
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
    if (Array.isArray(field)) return field.length > 0;
    return field && field.trim().length > 0;
  }).length;

  return Math.round((completedFields / fields.length) * 100);
};

const getDefaultHours = (restaurant?: RestaurantProfile) =>
  restaurant?.working_hours || '09:00 - 23:00';

const buildInitialDayHours = (restaurant?: RestaurantProfile): DayHours => {
  const defaultHours = getDefaultHours(restaurant);

  return {
    monday: restaurant?.monday_hours || defaultHours,
    tuesday: restaurant?.tuesday_hours || defaultHours,
    wednesday: restaurant?.wednesday_hours || defaultHours,
    thursday: restaurant?.thursday_hours || defaultHours,
    friday: restaurant?.friday_hours || defaultHours,
    saturday: restaurant?.saturday_hours || defaultHours,
    sunday: restaurant?.sunday_hours || defaultHours,
  };
};

export function useRestaurantProfile() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const restaurant = route.params?.restaurant as RestaurantProfile;
  const user = route.params?.user;

  const [cuisineType, setCuisineType] = useState(restaurant?.cuisine_type || '');
  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);

  const [address, setAddress] = useState(restaurant?.address || '');
  const [city, setCity] = useState(restaurant?.city || '');
  const [phone, setPhone] = useState(restaurant?.phone || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [maxGuests, setMaxGuests] = useState(String(restaurant?.max_guests || ''));

  const [dayHours, setDayHours] = useState<DayHours>(
    buildInitialDayHours(restaurant),
  );

  const [activeTimePicker, setActiveTimePicker] = useState<TimePickerType>(null);
  const [timePickerDate, setTimePickerDate] = useState(new Date());

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
    ...Object.values(buildInitialDayHours(restaurant)),
    parseImages(restaurant?.restaurant_images),
    parseImages(restaurant?.menu_images),
  ]);

  const [profileCompletion, setProfileCompletion] = useState(initialCompletion);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectCuisineType = (selectedCuisineType: string) => {
    setCuisineType(selectedCuisineType);
    setIsCuisineDropdownOpen(false);
  };

  const getTimeFromHours = (currentValue: string, type: 'start' | 'end') => {
    const safeValue =
      !currentValue || currentValue === 'Closed'
        ? '09:00 - 23:00'
        : currentValue;

    const [start = '09:00', end = '23:00'] = safeValue.split(' - ');
    const selected = type === 'start' ? start : end;
    const [hours, minutes] = selected.split(':').map(Number);

    const date = new Date();
    date.setHours(Number.isNaN(hours) ? 9 : hours);
    date.setMinutes(Number.isNaN(minutes) ? 0 : minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  const openTimePicker = (day: DayKey, part: 'start' | 'end') => {
    setActiveTimePicker({ day, part });
    setTimePickerDate(getTimeFromHours(dayHours[day], part));
  };

  const updateWorkingHours = (
    currentValue: string,
    selectedTime: string,
    type: 'start' | 'end',
  ) => {
    const safeValue =
      !currentValue || currentValue === 'Closed'
        ? '09:00 - 23:00'
        : currentValue;

    const [start = '09:00', end = '23:00'] = safeValue.split(' - ');
    return type === 'start' ? `${selectedTime} - ${end}` : `${start} - ${selectedTime}`;
  };

  const handleTimePickerChange = (_event: any, selectedDate?: Date) => {
    if (!selectedDate || !activeTimePicker) {
      setActiveTimePicker(null);
      return;
    }

    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
    const selectedTime = `${hours}:${minutes}`;

    setDayHours(prev => ({
      ...prev,
      [activeTimePicker.day]: updateWorkingHours(
        prev[activeTimePicker.day],
        selectedTime,
        activeTimePicker.part,
      ),
    }));

    setActiveTimePicker(null);
  };

  const toggleClosedDay = (day: DayKey) => {
    setDayHours(prev => ({
      ...prev,
      [day]: prev[day] === 'Closed' ? '09:00 - 23:00' : 'Closed',
    }));
  };

  const fetchRatingSummary = async () => {
    if (!restaurant?.restaurant_id) return;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/ratings/get-restaurant-rating-summary.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId: restaurant.restaurant_id }),
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

  const uploadImageToBackend = async (
    imageBase64: string,
    imageType: string | undefined,
    fileName: string | undefined,
    type: 'restaurant' | 'menu',
  ) => {
    if (!restaurant?.restaurant_id) {
      throw new Error('Restaurant ID is missing.');
    }

    const endpoint =
      type === 'restaurant'
        ? 'upload-restaurant-image.php'
        : 'upload-menu-image.php';

    const response = await fetch(
      `http://10.0.2.2/reservation-api/restaurant/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: restaurant.restaurant_id,
          imageBase64,
          imageType: imageType || 'image/jpeg',
          fileName: fileName || `${type}_${Date.now()}.jpg`,
        }),
      },
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Image upload failed.');
    }

    return data.imageUrl as string;
  };

  const pickImages = async (type: 'restaurant' | 'menu') => {
    if (!restaurant?.restaurant_id) {
      Alert.alert('Error', 'Restaurant profile is missing.');
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
      includeBase64: true,
    });

    if (result.didCancel) return;

    const assets = result.assets || [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const validImages = assets.filter(asset => {
      if (!asset.base64) return false;
      if (!asset.type) return true;
      return allowedTypes.includes(asset.type);
    });

    if (validImages.length === 0) {
      Alert.alert('Invalid File', 'Only JPG and PNG images are allowed.');
      return;
    }

    try {
      setIsSaving(true);

      const uploadedUrls: string[] = [];

      for (const asset of validImages) {
        const uploadedUrl = await uploadImageToBackend(
          asset.base64 as string,
          asset.type,
          asset.fileName,
          type,
        );

        uploadedUrls.push(uploadedUrl);
      }

      if (type === 'restaurant') {
        setRestaurantImages(prev => [...prev, ...uploadedUrls]);
      } else {
        setMenuImages(prev => [...prev, ...uploadedUrls]);
      }

      Alert.alert('Success', 'Images uploaded successfully.');
    } catch (error: any) {
      Alert.alert(
        'Upload Error',
        error?.message || 'Something went wrong while uploading images.',
      );
    } finally {
      setIsSaving(false);
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId: restaurant.restaurant_id,
            cuisineType,
            address,
            city,
            phone,
            description,
            maxGuests: Number(maxGuests),
            workingHours: dayHours.monday,
            mondayHours: dayHours.monday,
            tuesdayHours: dayHours.tuesday,
            wednesdayHours: dayHours.wednesday,
            thursdayHours: dayHours.thursday,
            fridayHours: dayHours.friday,
            saturdayHours: dayHours.saturday,
            sundayHours: dayHours.sunday,
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
          ...Object.values(dayHours),
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenImagePreview = (imageUri: string) => {
    setPreviewImageUri(imageUri);
  };

  const handleCloseImagePreview = () => {
    setPreviewImageUri(null);
  };

  const handleOpenHome = () => {
    navigation.navigate('RestaurantDashboard', { user });
  };

  const handleOpenRestaurantReviews = () => {
    navigation.navigate('RestaurantReviews', { restaurant, user });
  };

  const handleOpenVisitedCustomers = () => {
    navigation.navigate('VisitedCustomers', { restaurant, user });
  };

  const handleOpenProfile = () => {
    navigation.navigate('RestaurantProfile', { restaurant, user });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
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
      ],
    );
  };

  const bottomNavItems = useMemo(
    () => [
      {
        key: 'home',
        label: 'Home',
        icon: '⌂',
        onPress: handleOpenHome,
      },
      {
        key: 'reviews',
        label: 'Reviews',
        icon: '★',
        onPress: handleOpenRestaurantReviews,
      },
      {
        key: 'visited',
        label: 'Visited',
        icon: '•',
        onPress: handleOpenVisitedCustomers,
      },
      {
        key: 'profile',
        label: 'Profile',
        icon: '◉',
        isActive: true,
        onPress: handleOpenProfile,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: '↩',
        onPress: handleLogout,
      },
    ],
    [restaurant, user],
  );

  return {
    cuisineType,
    setCuisineType,
    cuisineOptions,
    isCuisineDropdownOpen,
    setIsCuisineDropdownOpen,
    handleSelectCuisineType,

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

    DAYS,
    dayHours,
    openTimePicker,
    toggleClosedDay,
    activeTimePicker,
    timePickerDate,
    handleTimePickerChange,

    restaurantImages,
    menuImages,
    previewImageUri,
    handleOpenImagePreview,
    handleCloseImagePreview,

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
    bottomNavItems,
  };
}