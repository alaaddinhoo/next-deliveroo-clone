import { CartItem } from "@/utils/typesFirebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  getDocumentById,
  getMenuByRestaurantID,
} from "@/utils/firebase/firebase";
import { doc, getDoc } from "@firebase/firestore";

export function useCartData() {
  const [user, loading, error] = useAuthState(auth);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.cart) {
              const cartItemsData: CartItem[] = userData.cart;
              setCartItems(cartItemsData);
            } else {
              console.log("No cart data found for the user.");
            }
          } else {
            console.log("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, []);

  return { cartItems, setCartItems };
}
