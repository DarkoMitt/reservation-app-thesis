import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type BottomNavItem = {
  key: string;
  label: string;
  icon: string;
  isActive?: boolean;
  onPress: () => void;
};

type AppBottomNavProps = {
  items: BottomNavItem[];
};

function AppBottomNav({ items }: AppBottomNavProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          key={item.key}
          style={[styles.item, item.isActive && styles.activeItem]}
          activeOpacity={0.85}
          onPress={item.onPress}>
          <Text style={[styles.icon, item.isActive && styles.activeText]}>
            {item.icon}
          </Text>

          <Text style={[styles.label, item.isActive && styles.activeText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default AppBottomNav;