"use client";

import Modal from "@/components/Modals";
import { Item } from "@/utils/typesFirebase";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "@/utils/firebase/firebase";

interface Props {
  menuItem: Item | null;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  restaurantID: string;
  category: string;
}

const MenuModal = ({
  menuItem,
  openModal,
  setOpenModal,
  restaurantID,
  category,
}: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const [quantity, setQuantity] = useState(1); // State to manage item quantity
  const [chosenAddons, setChosenAddons] = useState<{ [key: string]: any[] }>(
    {}
  );

  if (!menuItem) return null; // Handle null case

  const handleAddonSelection = (addonTitle: string, item: any) => {
    setChosenAddons((prevState) => {
      const addonItems = prevState[addonTitle] || [];
      if (addonItems.includes(item)) {
        return {
          ...prevState,
          [addonTitle]: addonItems.filter((i) => i !== item),
        };
      } else {
        return {
          ...prevState,
          [addonTitle]: [...addonItems, item],
        };
      }
    });
  };

  const addToCart = async () => {
    if (!user) {
      // Handle case where user is not authenticated
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    const cartItem = {
      restaurantID: restaurantID || "", // Provide default values
      category: category || "", // Provide default values
      name: menuItem.name || "", // Provide default values
      image: menuItem.image || "", // Provide default values
      subTitle: menuItem.subTitle || "", // Provide default values
      description: menuItem.description || "", // Provide default values
      price: menuItem.price || 0, // Provide default values
      quantity: quantity,
      addons: Object.keys(chosenAddons).map((title) => ({
        title: title,
        items: chosenAddons[title].map((item) => ({
          name: item.name || "", // Provide default values
          type: item.type || "", // Provide default values
          price: item.price || 0, // Provide default values
        })),
      })),
    };

    console.log(cartItem); // Log the cartItem object for debugging

    try {
      await updateDoc(userDocRef, {
        cart: arrayUnion(cartItem),
      });
      alert("Item added to cart successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding item to cart: ", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div className="h-[70vh] overflow-auto font-normal">
        <div className="relative h-[350px]">
          <Image src={menuItem.image} alt="product image" fill></Image>
        </div>
        <div className="space-y-4 p-6">
          <div className="space-y-3">
            <div className="text-3xl font-bold">{menuItem.name}</div>
            <div className="font-thin text-sm text-slate-700">
              {menuItem.description}
            </div>
          </div>

          <div className="bg-[#eee] h-[2px] w-full"></div>
          <div className="space-y-1 text-[14px] font-thin">
            <div>
              Questions about allergens, ingredients or cooking methods?
            </div>
            <div className="text-primary">Please contact the restaurant.</div>
          </div>

          <div className="bg-[#eee] h-[2px] w-full"></div>
          <div>
            {menuItem.addons.map((i) => (
              <div key={i.title}>
                <div>{i.title}</div>
                <div className="text-sm font-thin text-slate-500 mt-1">
                  Choose any one
                </div>

                <div className="mt-4 space-y-2">
                  {i.items.map((x) => (
                    <div
                      className="flex gap-4 cursor-pointer"
                      key={x.name}
                      onClick={() => handleAddonSelection(i.title, x)}
                    >
                      <div className="flex gap-2 justify-center items-center">
                        <PlusCircle size={24} className="text-primary" />
                      </div>
                      <div>{x.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-[#eee] w-full"></div>

      <div className="space-y-6 my-4 p-6">
        <div className="flex gap-12 justify-center items-center">
          <MinusCircle
            size={20}
            className="text-slate-300"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          />
          <div className="text-xl">{quantity}</div>
          <PlusCircle
            size={20}
            className="text-primary"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
        <button
          className="w-full py-4 bg-primary text-white"
          onClick={addToCart}
        >
          Add for AED {menuItem.price * quantity}
        </button>
      </div>
    </Modal>
  );
};

export default MenuModal;
