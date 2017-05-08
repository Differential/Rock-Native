import registry, { loader } from "../index.browser.js";
import Junction from "../../../junction";

describe("loader", () => {
  it("uses the lifecycle hoc", () => {
    const WithLoader = loader(() => null);
    expect(typeof WithLoader).toBe("function");
    expect(WithLoader.displayName).toBe("lifecycle(Component)");
  });
});

describe("registry", () => {
  it("should wrap with junction", () => {
    expect(registry).toBeInstanceOf(Junction);
  });

  it("should be wrapped with correct hoc's", () => {
    const component = registry.render(<div />);
    // displayName is generated by recompose
    expect(component.displayName).toBe(
      "withState(lifecycle(branch(Component)))",
    );
  });
});
