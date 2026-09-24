const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/backend-api";

// Helper Function ដើម្បីទាញយក Token ឱ្យបានច្បាស់លាស់ពី LocalStorage
const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    // ឆែកមើលគ្រប់ Key ដែលអាចរក្សាទុក Token
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("bearer_token");

    if (token) {
      // ត្រូវប្រាកដថា Token មិនមានពាក្យ Bearer ជាន់គ្នា
      const cleanToken = token.replace(/^Bearer\s+/i, "");
      headers["Authorization"] = `Bearer ${cleanToken}`;
    }
  }

  return headers;
};

// 1. Get Comments
export const getCommentsByEvent = async (eventUuid: string) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/events/${eventUuid}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch comments");
    return await res.json();
  } catch (error) {
    console.error("getCommentsByEvent error:", error);
    throw error;
  }
};

// 2. Create Comment
export const createComment = async (data: { eventUuid: string; content: string }) => {
  try {
    const headers = getAuthHeaders();

    // បើគ្មាន Token ទេ ឱ្យវារាយការណ៍ប្រាប់ភ្លាមៗ
    if (!headers["Authorization"]) {
      alert("Please! Login accounnt.!");
      throw new Error("Missing Authentication Token");
    }

    const res = await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        eventUuid: data.eventUuid,
        content: data.content,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend Error Response:", errorData);
      throw new Error(errorData.message || `Error status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("createComment error:", error);
    throw error;
  }
};

// 3. Delete Comment
export const deleteComment = async (commentUuid: string) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${commentUuid}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Failed to delete comment");
    return await res.json();
  } catch (error) {
    console.error("deleteComment error:", error);
    throw error;
  }
};