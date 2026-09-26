const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/backend-api";

export const authService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); 

    const response = await fetch(`${API_BASE_URL}/upload-file/upload-image`, {
      method: "POST",
      // បន្ថែម Headers ដើម្បីការពារបញ្ហា CORS ពី phía Server
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    const responseText = await response.text();
    
    // Kiểm traមើលថាតើ Server ឆ្លើយតបមកជា JSON ឬអត់ មុនពេល Parse
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error(responseText || "Failed to upload image due to server response format");
    }

    if (!response.ok) {
      throw new Error(result.message || "Failed to upload image");
    }

    return result.url || result.imageUrl || result.data || result;
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      throw new Error(responseText || "Registration failed due to server error");
    }

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }
    return result;
  },
};