import { access, readFile } from "fs/promises";
import { join } from "path";

interface ValidatePackageLockParams {
  version: number;
  cwd?: string;
}
export const validatePackageLock = async ({
  version,
  cwd = process.cwd(),
}: ValidatePackageLockParams): Promise<void> => {
  const pathToPackageLock = join(cwd, "package-lock.json");
  await access(pathToPackageLock);
  const packageLockContentsRaw = await readFile(pathToPackageLock, "utf-8");
  const packageLockContents = JSON.parse(packageLockContentsRaw);
  const packageLockVersion = packageLockContents.lockfileVersion;
  if (packageLockVersion !== version) {
    throw new Error(
      `Expected version "${version}" in ${pathToPackageLock} but got "${packageLockVersion}"`
    );
  }
};
