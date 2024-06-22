import Modal from "@/components/modal";
import { Item } from "@/utils/typesFirebase";
import Image from "next/image";

interface Props {
  menuItem: Item | null;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
}

const MenuModal = ({ menuItem, openModal, setOpenModal }: Props) => {
  if (!menuItem) return null; // Handle null case
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div className="relative h-[350px]">
        <Image src={menuItem.image || ""} alt="product image" fill></Image>
      </div>

      <div>{menuItem.name}</div>
      <div>{menuItem.description}</div>
      <div className="bg-[#eee] h-[2px] w-full"></div>
      <div>Questions about allergens, ingredients or cooking methods?</div>
      <div>Please contact the restaurant.</div>
      <div className="bg-[#eee] h-[2px] w-full"></div>
      <div>
        {menuItem.addons.map((i) => (
          <div>
            <div>{i.title}</div>
            <div>Required</div>

            {i.items.map((x) => (
              <div>{x.name}</div>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default MenuModal;
