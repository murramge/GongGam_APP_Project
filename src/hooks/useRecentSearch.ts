import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRecentSearch = (type: keyof typeof SearchTarget) => {
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);

  const MAX_RECENT_SEARCHES = 5;
  const RECENT_SEARCHES_KEY = `@recent${type}Searches`;

  useEffect(() => {
    initiate();

    async function initiate() {
      await loadRecentSearches();
    }
  }, []);

  const saveRecentSearch = async (searchTerm: string) => {
    try {
      let recentSearches: string[];
      const recentSearchItem = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (recentSearchItem) {
        recentSearches = JSON.parse(recentSearchItem);
        recentSearches = [
          searchTerm,
          ...recentSearches.filter(item => item !== searchTerm),
        ];
        recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);
      } else {
        recentSearches = [searchTerm];
      }

      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(recentSearches),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecentSearches = async (): Promise<void> => {
    try {
      const recentSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (recentSearches) {
        setRecentSearchList(JSON.parse(recentSearches));
        return;
      }
      setRecentSearchList([]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (error) {
      console.error(error);
    }
  };

  const removeRecentSearch = async (searchTerm: string) => {
    try {
      const recentSearchItem = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (!recentSearchItem) {
        return;
      }

      let recentSearches = JSON.parse(recentSearchItem) as string[];
      recentSearches = [...recentSearches.filter(item => item !== searchTerm)];
      recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);

      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(recentSearches),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    recentSearchList,
    saveRecentSearch,
    removeRecentSearch,
    loadRecentSearches,
    clearRecentSearches,
  };
};
const SearchTarget = {
  Performance: 'Performance',
  Meeting: 'Meeting',
} as const;
