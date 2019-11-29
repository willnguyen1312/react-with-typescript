import { shouldMock } from "./getFactor";

jest.mock("./getFactor");

describe("Sample test", () => {
  beforeEach(() => jest.clearAllMocks());
  it("should work first", () => {
    (shouldMock as jest.Mock).mockReturnValue(30);
    console.log(shouldMock());
    const { shouldNotMock } = jest.requireMock("./getFactor.ts");
    console.log(shouldNotMock());
  });
});
