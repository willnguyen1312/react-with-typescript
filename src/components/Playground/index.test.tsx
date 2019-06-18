import React from 'react'
import {useMousePosition} from './useMousePosition'
import 'jest-dom/extend-expect'
import Mouse from ".";
import { render } from "@testing-library/react";

jest.mock('./useMousePosition.tsx', () => ({
  useMousePosition: jest.fn()
}))

test("Mouse component should work", () => {
  const xPosition = 5;
  const yPosition = 6;
  (useMousePosition as jest.Mock).mockReturnValueOnce({x: xPosition, y: yPosition})
  const {getByTestId, container} = render(<Mouse />);

  // expect(getByTestId('xPosition').innerText).toBe(xPosition)
  expect(getByTestId('xPosition')).toHaveTextContent(xPosition.toString())
  expect(getByTestId('yPosition')).toHaveTextContent(yPosition.toString())
});
