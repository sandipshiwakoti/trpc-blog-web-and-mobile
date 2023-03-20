import React from "react";
import { Center, Spinner, type ISpinnerProps } from "native-base";

type FullSpinnerProps = ISpinnerProps;

const FullSpinner: React.FC<FullSpinnerProps> = ({ ...props }) => {
  return (
    <Center flex={1}>
      <Spinner size="lg" {...props} />
    </Center>
  );
};

export default FullSpinner;
