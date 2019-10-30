import { run } from "./sample";
import { getFactor } from "./getFactor";

jest.mock("./getFactor");

describe("Sample test", () => {
  it("should work", () => {
    (getFactor as jest.Mock<any>).mockReturnValueOnce(20);
    expect(run()).toBe(20);
  });
});
