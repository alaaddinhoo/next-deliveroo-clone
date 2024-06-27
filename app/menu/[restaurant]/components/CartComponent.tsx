import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/utils/typesFirebase"; // Assuming you have a CartItem type or interface defined
import { ShoppingBasket } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase/firebase";
import {
  collection,
  getDoc,
  doc,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";

interface Props {
  cartItems: CartItem[];
  setCartItems: (x: CartItem[]) => void;
}

const CartComponent = ({ cartItems, setCartItems }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  //   const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const cartData: CartItem[] = userData.cart.map((item: any) => ({
              restaurantID: item.restaurantID || "",
              category: item.category || "",
              name: item.name || "",
              image: item.image || "",
              subTitle: item.subTitle || "",
              description: item.description || "",
              price: item.price || 0,
              quantity: item.quantity || 0,
              addons: item.addons || [],
            }));

            setCartItems(cartData);
            console.log(cartData);
          } else {
            console.log("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, [cartItems]);

  const handleClearCart = async () => {
    if (!user) {
      console.log("User not authenticated.");
      return;
    }

    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      // Clear the cart field in Firestore document
      await updateDoc(userDocRef, {
        cart: [],
      });

      // Update local state to reflect cleared cart
      setCartItems([]);

      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Handle error state or notification to user
    }
  };

  return (
    <div className="flex flex-col self-start grow items-center p-12 bg-white shadow-sm sticky top-[18vh]">
      {cartItems.length === 0 ? (
        <>
          <ShoppingBasket color="#abadad" size={36} />
          <div className="font-normal text-sm text-[#abadad] mt-2">
            Your basket is empty
          </div>
          <button
            className="w-full py-4 mt-6 text-white bg-[#00ccbb] disabled:bg-[#e1e5e6] disabled:text-[#a6b1b3] disabled:cursor-not-allowed"
            disabled={true}
          >
            Go to checkout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Your Basket</h2>
          <div className="w-full space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-[#f9fbfa] rounded-md shadow-sm"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt="Product image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 font-normal">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400">
                      {item.description}
                    </div>
                    <div className="text-sm">AED {item.price}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-lg font-semibold">
                    {item.quantity + "x"}
                  </div>
                  <div className="ml-4 font-normal">
                    {item.addons.map((addon, addonIndex) => (
                      <div key={addonIndex}>
                        {addon.items.map((addonItem, itemIndex) => (
                          <div key={itemIndex} className="flex items-center">
                            <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                            <div className="text-xs">{addonItem.name}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 mt-6 text-white bg-[#00ccbb]">
            Go to checkout
          </button>
          <button
            className="w-full py-4 mt-2 font-normal text-primary border border-[#00ccbb]"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartComponent;
