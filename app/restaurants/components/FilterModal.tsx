import Modal from "@/components/Modals";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface Props {
  setFilterString: (value: string) => void;
  filterString: string;
  openFilterModal: boolean;
  setFilterModal: (value: boolean) => void;
}

const FilterModal = ({
  setFilterString,
  filterString,
  openFilterModal,
  setFilterModal,
}: Props) => {
  return (
    <Modal open={openFilterModal} onClose={() => setFilterModal(false)}>
      <Sidebar
        setFilterString={setFilterString}
        filterString={filterString}
        modal={true}
      />
    </Modal>
  );
};

export default FilterModal;
