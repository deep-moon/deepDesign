import { render } from "@testing-library/react";
import Button from "./button";

test("first react test case", () => {
  const wrapper = render(<Button>hello</Button>);
  const element = wrapper.queryByText('hello')
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
});

describe('test Button component',() => {
  it('should render the correct default button')
})
