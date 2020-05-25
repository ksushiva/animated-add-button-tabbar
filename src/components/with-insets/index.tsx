/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType } from 'react';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

export type withInsetsProps = {
  insets: {
    bottom: number,
  }
};

const withInsets = (BaseComponent: ComponentType<any>) => (props: any) => (
  <SafeAreaConsumer>
    {(insets) => (
      <BaseComponent
        insets={{ bottom: insets?.bottom }}
        {...props}
      />
    )}
  </SafeAreaConsumer>
);

export default withInsets;
