import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

interface GridProps<ItemT> {
  gap?: number;
  width: number;
  numColumns?: number;
  data: ItemT[];
  renderItem: ({
    item,
    index,
  }: {
    item: ItemT;
    index: number;
  }) => React.JSX.Element;
}

const Grid = <ItemT,>({
  gap = 0,
  width,
  numColumns = 1,
  data,
  renderItem,
}: GridProps<ItemT>) => {
  useEffect(() => {
    console.log('render');
  }, []);

  const cellWidth = (width - gap * (numColumns - 1)) / numColumns;
  return (
    <View
      style={[
        gridStyles.container,
        {
          gap: gap,
        },
      ]}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            width: cellWidth,
            height: cellWidth / 2,
          }}>
          {renderItem({item, index})}
        </View>
      ))}
    </View>
  );
};

const gridStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Grid;
