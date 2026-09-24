const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/backend-api";

export async function getSports() {
  try {
    
    const isServer = typeof window === "undefined";
    const url = isServer
      ? `https://sport-api.eunglyzhia.com/api/v1/sports` 
      : `${BASE_URL}/sports`; 
    const response = await fetch(url, {
      cache: "no-store", 
    });

    if (!response.ok) {
      console.error(`Failed to fetch sports, status: ${response.status}`);
      return []; 
    }

    const data = await response.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching sports:", error);
    return [];
  }
}