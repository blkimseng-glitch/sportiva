import { adminRequest, toImageUrls, unwrapEntity } from "@/services/adminApi";

export async function uploadAdminImages(files: File[]): Promise<string[]> {
  if (!files.length) return [];

  const formData = new FormData();
  if (files.length === 1) {
    formData.append("file", files[0]);
  } else {
    files.forEach((file) => formData.append("files", file));
  }

  const payload = await adminRequest<unknown>("/upload", {
    method: "POST",
    body: formData,
  });

  return toImageUrls(unwrapEntity<unknown>(payload))
    .concat(toImageUrls(payload))
    .filter((value, index, values) => value && values.indexOf(value) === index);
}
