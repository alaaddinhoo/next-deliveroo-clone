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

interface SearchParams {
  query?: string;
  filters?: string;
  hitsPerPage?: number;
  page?: number;
}

export async function searchRestaurants(options: SearchParams = {}) {
  const { query = "*", filters = "", hitsPerPage = 18, page = 0 } = options;

  const requestUrl = `https://VVWOVRO2RI-dsn.algolia.net/1/indexes/restaurants?query=${query}&hitsPerPage=${hitsPerPage}&page=${page}&attributesToRetrieve=name,rating,coverImage,onlyOnDeliveroo,deliveryFee,open&attributesToHighlight=%5B%5D&filters=${filters}`;
  console.log(requestUrl);

  try {
    const response = await fetch(requestUrl, {
      headers: new Headers({
        "X-Algolia-API-Key": "3820ce633e4c4abb9400dfb74df646be",
        "X-Algolia-Application-Id": "VVWOVRO2RI",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
