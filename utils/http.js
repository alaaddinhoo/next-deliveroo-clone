export async function getRestaurants() {
  const response = await fetch(
    "https://firestore.googleapis.com/v1/projects/nextjs-test-8e44c/databases/(default)/documents/restaurants?key=" +
      process.env.FIREBASE_API_KEY,
    {
      // cache: "no-store", // data shouldn't cache
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function searchRestaurants(query, filters) {
  const response = await fetch(
    `https://VVWOVRO2RI-dsn.algolia.net/1/indexes/restaurants?query=${query}&attributesToRetrieve=name,rating&attributesToHighlight=%5B%5D&filters=${filters}`,
    {
      // cache: "no-store", // data shouldn't cache
      headers: {
        "X-Algolia-API-Key": process.env.ALGOLIA_API_KEY,
        "X-Algolia-Application-Id": process.env.ALGOLIA_APPLICATION_ID,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
