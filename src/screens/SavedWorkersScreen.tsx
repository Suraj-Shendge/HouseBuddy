import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { Header, WorkerCard, EmptyState } from '../components';
import { RootStackParamList, Worker } from '../types';

type SavedWorkersNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SavedWorkersScreen: React.FC = () => {
  const navigation = useNavigation<SavedWorkersNavigationProp>();
  const { workers, savedWorkers } = useApp();

  const savedWorkerList = workers.filter(w => savedWorkers.includes(w.id));

  const handleWorkerPress = (worker: Worker) => {
    navigation.navigate('WorkerProfile', { workerId: worker.id });
  };

  return (
    <View style={styles.container}>
      <Header title="Saved Workers" />
      <FlatList
        data={savedWorkerList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkerCard worker={item} onPress={() => handleWorkerPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="❤️"
            title="No Saved Workers"
            message="Save workers you trust to quickly access them later."
            actionLabel="Find Workers"
            onAction={() => navigation.navigate('MainTabs')}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
