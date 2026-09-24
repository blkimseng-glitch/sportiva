const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/backend-api";

export async function getAllSport() {
    const res =  await fetch (`${API_BASE_URL}/sports`,{cache:"no-store",});
    if(!res.ok){
        throw new Error(`Failed to fetch data form sport: ${res.status}`);
    } 
    return res.json();
}


export async function  getSportByUuid(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/sports/${uuid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sport detail: ${res.status}`);
  }

  return res.json();
}