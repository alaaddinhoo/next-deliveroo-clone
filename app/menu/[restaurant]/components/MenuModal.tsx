import Modal from "@/components/Modals";
import { Item } from "@/utils/typesFirebase";
import { MinusCircle, PlusCircle } from "lucide-react";
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
              <div>
                <div>{i.title}</div>
                <div className="text-sm font-thin text-slate-500 mt-1">
                  Choose any one
                </div>

                <div className="mt-4 space-y-2">
                  {i.items.map((x) => (
                    <div className="flex gap-4">
                      <div className="flex gap-2 justify-center items-center">
                        {/* <MinusCircle size={24} className="text-slate-300" />
                        <div className="text-md font-thin">{1}</div> */}
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
          <MinusCircle size={20} className="text-slate-300" />
          <div className="text-xl">{1}</div>
          <PlusCircle size={20} className="text-primary" />
        </div>
        <button className="w-full py-4 bg-primary text-white">
          Add for AED {menuItem.price}
        </button>
      </div>
    </Modal>
  );
};

export default MenuModal;
