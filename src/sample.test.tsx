import { run } from "./sample";
import { getFactor } from "./getFactor";

jest.mock("./getFactor");

describe("Sample test", () => {
  it("should work first", () => {
    (getFactor as jest.Mock).mockReturnValueOnce(20);
    expect(run()).toBe(20);
  });

  it("should work second", () => {
    (getFactor as jest.Mock).mockReturnValueOnce(30);
    expect(run()).toBe(30);
  });

  it("should work last", () => {
    (getFactor as jest.Mock).mockReturnValueOnce(100);
    expect(run()).toBe(100);
  });
});
