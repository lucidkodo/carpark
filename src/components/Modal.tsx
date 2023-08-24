import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';
import { Carpark } from '../data/types';

export default function ViewAllModal(props: any) {
  const isModalOpen = props.isModalOpen as boolean;
  const closeModal = props.closeModal as () => void;
  const modalData = props.modalData as Carpark[];

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalData.length} {modalData[0].category} Carparks
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH={500} overflowY="scroll" color="GrayText">
          <OrderedList pl={5}>
            {modalData.map((data) => (
              <ListItem key={data.carparkNumber}>
                {data.carparkNumber} ({data.aggregatedAvailable} lots available)
              </ListItem>
            ))}
          </OrderedList>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
