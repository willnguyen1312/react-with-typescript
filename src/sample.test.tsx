const func = jest.fn();

describe("Sample test", () => {
  beforeAll(() => {
    func.mockReturnValue(10);
  });
  afterAll(() => jest.clearAllMocks());

  it("should work", () => {
    func.mockReturnValueOnce(9);
    expect(func()).toBe(9);
    expect(func()).toBe(10);
  });
});
