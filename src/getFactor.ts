export const shouldMock = () => {
  console.log("should Mock");
  return 10;
};
export const shouldNotMock = () => {
  console.log("Run");

  return shouldMock();
};
