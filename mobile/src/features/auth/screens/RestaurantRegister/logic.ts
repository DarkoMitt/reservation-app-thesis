import { useState } from 'react';
import { appAlert as Alert } from '../../../../shared/services/appAlert';
import { useNavigation } from '@react-navigation/native';

type RestaurantRegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  restaurantName: string;
  city: string;
  streetAddress: string;
  phoneNumber: string;
  restaurantType: string;
  cuisineType: string;
  description: string;
  maxGuests: string;
  workingHoursWeekdaysFrom: string;
  workingHoursWeekdaysTo: string;
  workingHoursWeekendFrom: string;
  workingHoursWeekendTo: string;
  businessRegistrationNumber: string;
};

type RestaurantRegisterErrors = Partial<RestaurantRegisterForm>;

export const MACEDONIAN_CITIES = [
  'Skopje',
  'Kriva Palanka',
  'Bitola',
  'Ohrid',
  'Prilep',
  'Tetovo',
  'Kumanovo',
  'Strumica',
  'Veles',
  'Shtip',
  'Gostivar',
  'Kavadarci',
  'Gevgelija',
  'Kochani',
  'Kicevo',
  'Struga',
];

export const RESTAURANT_TYPES = [
  'Restaurant',
  'Lounge Bar',
  'Cafe',
  'Club',
  'Event Venue',
];

const CUISINE_OPTIONS_BY_TYPE: Record<string, string[]> = {
  Restaurant: ['Traditional', 'Balkan', 'Italian', 'Mediterranean', 'Asian', 'Fast Food', 'Mixed'],
  'Lounge Bar': ['Balkan', 'Mediterranean', 'Mixed', 'Snacks'],
  Cafe: ['Coffee & Desserts', 'Bakery', 'Snacks', 'Mixed'],
  Club: ['Drinks', 'Snacks', 'Mixed'],
  'Event Venue': ['Traditional', 'Balkan', 'Mediterranean', 'Catering', 'Mixed'],
};

const initialForm: RestaurantRegisterForm = {
  email: '',
  password: '',
  confirmPassword: '',
  restaurantName: '',
  city: '',
  streetAddress: '',
  phoneNumber: '+389',
  restaurantType: '',
  cuisineType: '',
  description: '',
  maxGuests: '',
  workingHoursWeekdaysFrom: '',
  workingHoursWeekdaysTo: '',
  workingHoursWeekendFrom: '',
  workingHoursWeekendTo: '',
  businessRegistrationNumber: '',
};

export function useRestaurantRegister() {
  const navigation = useNavigation();
  const [form, setForm] = useState<RestaurantRegisterForm>(initialForm);
  const [errors, setErrors] = useState<RestaurantRegisterErrors>({});
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isRestaurantTypeOpen, setIsRestaurantTypeOpen] = useState(false);
  const [isCuisineTypeOpen, setIsCuisineTypeOpen] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [activeTimeField, setActiveTimeField] =
    useState<keyof RestaurantRegisterForm | null>(null);

  const cuisineOptions = form.restaurantType
    ? CUISINE_OPTIONS_BY_TYPE[form.restaurantType]
    : [];

  const handleChange = (field: keyof RestaurantRegisterForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleCitySelect = (city: string) => {
    handleChange('city', city);
    setIsCityOpen(false);
  };

  const handleRestaurantTypeSelect = (type: string) => {
    setForm(prev => ({
      ...prev,
      restaurantType: type,
      cuisineType: '',
    }));

    setErrors(prev => ({
      ...prev,
      restaurantType: undefined,
      cuisineType: undefined,
    }));

    setIsRestaurantTypeOpen(false);
    setIsCuisineTypeOpen(false);
  };

  const handleCuisineTypeSelect = (cuisine: string) => {
    handleChange('cuisineType', cuisine);
    setIsCuisineTypeOpen(false);
  };

  const openTimePicker = (field: keyof RestaurantRegisterForm) => {
    setActiveTimeField(field);
    setIsTimePickerVisible(true);
  };

  const handleTimeChange = (_event: unknown, selectedDate?: Date) => {
    setIsTimePickerVisible(false);

    if (!selectedDate || !activeTimeField) {
      setActiveTimeField(null);
      return;
    }

    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');

    handleChange(activeTimeField, `${hours}:${minutes}`);
    setActiveTimeField(null);
  };

  const validate = () => {
    const nextErrors: RestaurantRegisterErrors = {};

    if (!form.restaurantName.trim()) nextErrors.restaurantName = 'Restaurant name is required.';
    if (!form.city.trim()) nextErrors.city = 'City is required.';
    if (!form.streetAddress.trim()) nextErrors.streetAddress = 'Street address is required.';
    const phoneWithoutPrefix = form.phoneNumber
      .replace('+389', '')
      .replace(/\D/g, '');
    if (!form.phoneNumber.trim() || !phoneWithoutPrefix) {
      nextErrors.phoneNumber = 'Phone number is required.';
    } else if (phoneWithoutPrefix.length < 7) {
      nextErrors.phoneNumber = 'Enter a valid phone number.';
    }
    if (!form.restaurantType.trim()) nextErrors.restaurantType = 'Restaurant type is required.';
    if (!form.cuisineType.trim()) nextErrors.cuisineType = 'Cuisine type is required.';
    if (!form.maxGuests.trim()) nextErrors.maxGuests = 'Max guests is required.';

    if (!form.workingHoursWeekdaysFrom.trim()) {
      nextErrors.workingHoursWeekdaysFrom = 'Opening time is required.';
    }

    if (!form.workingHoursWeekdaysTo.trim()) {
      nextErrors.workingHoursWeekdaysTo = 'Closing time is required.';
    }

    if (!form.workingHoursWeekendFrom.trim()) {
      nextErrors.workingHoursWeekendFrom = 'Opening time is required.';
    }

    if (!form.workingHoursWeekendTo.trim()) {
      nextErrors.workingHoursWeekendTo = 'Closing time is required.';
    }

    if (!form.businessRegistrationNumber.trim()) {
      nextErrors.businessRegistrationNumber = 'Business registration number is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{9,}$/;
    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(form.password)) {
      nextErrors.password =
        'Password must be longer than 8 characters, include one uppercase letter and one special character.';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    const maxGuestsNumber = Number(form.maxGuests);
    if (form.maxGuests && (Number.isNaN(maxGuestsNumber) || maxGuestsNumber <= 0)) {
      nextErrors.maxGuests = 'Enter a valid number of guests.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      Alert.alert('Validation error', 'Please check all fields and try again.');
      return;
    }

    const workingHours = `Weekdays: ${form.workingHoursWeekdaysFrom} - ${form.workingHoursWeekdaysTo}, Weekend: ${form.workingHoursWeekendFrom} - ${form.workingHoursWeekendTo}`;

    try {
      const response = await fetch(
        'http://10.0.2.2/reservation-api/auth/register-restaurant.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantName: form.restaurantName,
            restaurantType: form.restaurantType,
            cuisineType: form.cuisineType,
            city: form.city,
            address: form.streetAddress,
            phone: form.phoneNumber,
            email: form.email,
            password: form.password,
            description: form.description,
            maxGuests: form.maxGuests,
            workingHours,
            businessRegistrationNumber: form.businessRegistrationNumber,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Request submitted',
          'Your restaurant registration was submitted and is waiting for admin approval.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      } else {
        Alert.alert('Registration failed', data.message || 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Check your connection.');
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleRegister,
    MACEDONIAN_CITIES,
    RESTAURANT_TYPES,
    cuisineOptions,
    isCityOpen,
    setIsCityOpen,
    handleCitySelect,
    isRestaurantTypeOpen,
    setIsRestaurantTypeOpen,
    handleRestaurantTypeSelect,
    isCuisineTypeOpen,
    setIsCuisineTypeOpen,
    handleCuisineTypeSelect,
    isTimePickerVisible,
    openTimePicker,
    handleTimeChange,
  };
}