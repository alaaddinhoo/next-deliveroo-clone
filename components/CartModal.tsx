import CartComponent from "@/app/menu/[restaurant]/components/CartComponent";
import Modal from "./Modals";
import { CartItem } from "@/utils/typesFirebase";
import React from "react";

interface Props {
  cartItems: CartItem[];
  setCartItems: (value: CartItem[]) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const CartModal = ({
  openModal,
  setOpenModal,
  cartItems,
  setCartItems,
}: Props) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <CartComponent cartItems={cartItems} setCartItems={setCartItems} />
    </Modal>
  );
};

export default CartModal;
