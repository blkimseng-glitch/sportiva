import { adminRequest, firstString, unwrapList } from "@/services/adminApi";
import type { AdminComment } from "@/lib/adminTypes";

function normalizeComment(input: unknown): AdminComment {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const user = data.user && typeof data.user === "object" ? data.user as Record<string, unknown> : {};
  const event = data.event && typeof data.event === "object" ? data.event as Record<string, unknown> : {};

  return {
    uuid: firstString(data.uuid, data.id),
    eventUuid: firstString(data.eventUuid, data.eventId, event.uuid, event.id),
    comment: firstString(data.comment, data.text, data.content),
    userName: firstString(data.userName, data.username, data.authorName, user.name, user.username) || "អ្នកប្រើប្រាស់",
    userAvatar: firstString(data.userAvatar, data.avatar, user.avatar) || undefined,
    createdAt: firstString(data.createdAt, data.created_at, data.date) || null,
  };
}

export async function getAdminComments() {
  const payload = await adminRequest<unknown>("/comments");
  return unwrapList<unknown>(payload).map(normalizeComment).filter((item) => item.uuid || item.comment);
}

export async function deleteAdminComment(uuid: string) {
  await adminRequest<unknown>(`/comments/${encodeURIComponent(uuid)}`, {
    method: "DELETE",
  });
}
