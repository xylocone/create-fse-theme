import mock from "mock-fs";

// Internal dependencies
import { deletePath } from "../deletePath.js";

describe("deletePath", () => {
  beforeEach(() => {
    mock({
      "file.file": "Some random file content",
      "empty-folder": {},
      "non-empty-folder": {
        "filter.file": "Some contents",
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should delete a file", async () => {
    expect(deletePath("file.file")).resolves.not.toThrowError();
  });

  it("should delete an empty folder", async () => {
    expect(deletePath("empty-folder")).resolves.not.toThrowError();
  });

  it("should delete a non-empty folder", async () => {
    expect(deletePath("non-empty-folder")).resolves.not.toThrowError();
  });

  it("should throw an error for a path that does not exist", async () => {
    expect(deletePath("file-does-not-exist")).resolves.toThrowError();
  });
});
