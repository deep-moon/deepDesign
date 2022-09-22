test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(1);
});

test("test to be or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(1);
  expect(2).toBeLessThan(5);
});

test("test object", () => {
  expect({
    test: "test",
  }).toEqual({
    test: "test",
  });
});
