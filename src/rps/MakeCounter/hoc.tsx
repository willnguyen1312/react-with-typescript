import React from "react";
import { Subtract, Omit } from "utility-types";
import MakeCounter, { MakeCounterProps, InjectedCounterProps } from ".";

type MakeCounterHocProps = Omit<MakeCounterProps, "children">;

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
): React.SFC<Subtract<P, InjectedCounterProps> & MakeCounterHocProps> => ({
  minValue,
  maxValue,
  ...props
}: MakeCounterHocProps) => (
  <MakeCounter minValue={minValue} maxValue={maxValue}>
    {injectedProps => <Component {...(props as P)} {...injectedProps} />}
  </MakeCounter>
);
