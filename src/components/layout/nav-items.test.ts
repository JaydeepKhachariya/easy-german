import { isActive } from "./nav-items";

describe("isActive", () => {
  it("matches the section and its children", () => {
    expect(isActive("/learn", "/learn/")).toBe(true);
    expect(isActive("/learn/modal-verbs", "/learn/")).toBe(true);
    expect(isActive("/my-lessons/edit", "/my-lessons/")).toBe(true);
  });

  it("does not match a different section with a shared prefix", () => {
    expect(isActive("/learning", "/learn/")).toBe(false);
    expect(isActive("/", "/learn/")).toBe(false);
  });
});
