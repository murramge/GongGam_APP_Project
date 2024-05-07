import {useState} from 'react';

// 탭 이동 로직

const useTabSelection = initialTab => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const selectTab = tab => {
    setSelectedTab(tab);
  };

  return [selectedTab, selectTab];
};

export default useTabSelection;
