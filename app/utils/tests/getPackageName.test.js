import { getPackageName } from "../getPackageName.js";

describe("getPackageName", () => {
  it("should get the package name of CWD", async () => {
    expect(await getPackageName()).toBe("create-fse-theme");
  });
});
