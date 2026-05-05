export function useChooseRole() {
  const handleCustomerPress = () => {
    console.log('Customer selected');
  };

  const handleRestaurantPress = () => {
    console.log('Restaurant selected');
  };

  return {
    handleCustomerPress,
    handleRestaurantPress,
  };
}