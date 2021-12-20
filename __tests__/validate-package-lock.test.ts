import { expect, it } from "@jest/globals";
import { join } from "path";
import { validatePackageLock } from "../src/validate-package-lock";

it("does not throw for lockfile with matching version", async () => {
  const fixturePath = join(__dirname, "__fixtures__", "v2");

  await expect(
    validatePackageLock({ version: 2, cwd: fixturePath })
  ).resolves.not.toThrow("Expected version");
});

it("throws for lockfile without matching version", async () => {
  const fixturePath = join(__dirname, "__fixtures__", "v1");
  expect.assertions(1);

  await expect(
    validatePackageLock({ version: 2, cwd: fixturePath })
  ).rejects.toThrow("Expected version ");
});
