import Modal from "@/components/Modals";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface Props {
  setFilterString: (value: string) => void;
  filterString: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const FilterModal = ({
  setFilterString,
  filterString,
  openModal,
  setOpenModal,
}: Props) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Sidebar
        setFilterString={setFilterString}
        filterString={filterString}
        modal={true}
      />
    </Modal>
  );
};

export default FilterModal;
