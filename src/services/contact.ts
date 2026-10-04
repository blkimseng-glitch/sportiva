// Define interface សម្រាប់ Data
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Function សម្រាប់ call ទៅកាន់ Next.js Route Handler
export const sendContactMessage = async (data: ContactFormData) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to send message");
  }

  return result;
};