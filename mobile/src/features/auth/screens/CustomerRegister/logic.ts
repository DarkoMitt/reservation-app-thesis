import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


type CustomerRegisterForm = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  age: string;
  preferences: string;
  password: string;
  confirmPassword: string;
};

type CustomerRegisterErrors = Partial<CustomerRegisterForm>;

export const FOOD_PREFERENCES = [
  'No preferences',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten-free',
  'Dairy-free',
  'Seafood',
  'No pork',
  'No spicy food',
  'Healthy food',
];

export const COUNTRIES = [
  'North Macedonia',
  'Serbia',
  'Croatia',
  'Bosnia and Herzegovina',
  'Slovenia',
  'Bulgaria',
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'North Macedonia': ['Skopje', 'Bitola', 'Ohrid', 'Prilep', 'Tetovo', 'Kumanovo', 'Strumica'],
  Serbia: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica'],
  Croatia: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Dubrovnik'],
  'Bosnia and Herzegovina': ['Sarajevo', 'Banja Luka', 'Mostar', 'Tuzla', 'Zenica'],
  Slovenia: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper'],
  Bulgaria: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'],
};

export const PHONE_PREFIX_BY_COUNTRY: Record<string, string> = {
  'North Macedonia': '+389',
  Serbia: '+381',
  Croatia: '+385',
  'Bosnia and Herzegovina': '+387',
  Slovenia: '+386',
  Bulgaria: '+359',
};

const initialForm: CustomerRegisterForm = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  phone: '',
  email: '',
  age: '',
  preferences: '',
  password: '',
  confirmPassword: '',
};

export function useCustomerRegister() {
  const [form, setForm] = useState<CustomerRegisterForm>(initialForm);
  const [errors, setErrors] = useState<CustomerRegisterErrors>({});
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const navigation = useNavigation();

const handlePreferenceSelect = (preference: string) => {
  handleChange('preferences', preference);
  setIsPreferencesOpen(false);
};

const handleCountrySelect = (country: string) => {
  const phonePrefix = PHONE_PREFIX_BY_COUNTRY[country];

  setForm(prev => ({
    ...prev,
    country,
    city: '',
    phone: phonePrefix,
  }));

  setErrors(prev => ({
    ...prev,
    country: undefined,
    city: undefined,
    phone: undefined,
  }));

  setIsCountryOpen(false);
  setIsCityOpen(false);
};

const handleCitySelect = (city: string) => {
  handleChange('city', city);
  setIsCityOpen(false);
};

  const handleChange = (field: keyof CustomerRegisterForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: CustomerRegisterErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }

    if (!form.country.trim()) {
      nextErrors.country = 'Country is required.';
    }

    if (!form.city.trim()) {
      nextErrors.city = 'City is required.';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const ageNumber = Number(form.age);
    if (!form.age.trim()) {
      nextErrors.age = 'Age is required.';
    } else if (Number.isNaN(ageNumber) || ageNumber < 13) {
      nextErrors.age = 'Enter a valid age.';
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

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async () => {
  const isValid = validate();

if (!isValid) {
  Alert.alert('Validation error', 'Please check all fields and try again.');
  return;
}

  try {
    const response = await fetch(
      'http://10.0.2.2/reservation-api/auth/register-customer.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          country: form.country,
          city: form.city,
          phone: form.phone,
          email: form.email,
          age: form.age,
          preferences: form.preferences,
          password: form.password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
  Alert.alert(
    'Success',
    'Account created successfully! Please login.',
    [
      {
        text: 'Proceed to Login',
        onPress: () => navigation.navigate('Login' as never),
      },
    ],
  );
} else {
      Alert.alert('Registration failed',data.message);
    }
  } catch (error) {
    Alert.alert('Something went wrong. Check your connection.');
  }
};

  return {
    form,
    errors,
    handleChange,
    handleRegister,
    FOOD_PREFERENCES,
    isPreferencesOpen,
    setIsPreferencesOpen,
    handlePreferenceSelect,
    COUNTRIES,
    CITIES_BY_COUNTRY,
    isCountryOpen,
    setIsCountryOpen,
    handleCountrySelect,
    isCityOpen,
    setIsCityOpen,
    handleCitySelect,
  };
}