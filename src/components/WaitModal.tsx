import {
  Modal,
  ModalBody,
  Text,
  ModalContent,
  ModalOverlay,
  Progress,
  Image,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Donation from "./Donation";
type Props = {
  handleClose: () => void;
  isOpen: boolean;
  initCount: number;
  responseData: any;
  selectedTypes: string[];
  max: number;
  isFull: boolean;
};

const WaitModal = ({
  isOpen,
  handleClose,
  responseData,
  selectedTypes,
  initCount,
  isFull,
  max,
}: Props) => {
  const [countdown, setCountdown] = useState(initCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (responseData) {
          handleClose();
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [responseData, handleClose]);
  return (
    <Modal
      onClose={handleClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      isCentered
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent m={5} minW="25%">
        <ModalBody py={5} px={5}>
          <VStack align="center">
            <Text textAlign="center" fontSize="xl">
              Creating your {selectedTypes.join(", ")} now!
            </Text>
            <Text mb={2} textAlign="center" fontSize="sm" color="gray.500">
              Generation times may be slower because of the high volume of
              requests.
            </Text>
            <Progress
              w="100%"
              borderRadius={10}
              h={2}
              mb={4}
              colorScheme="blue"
              value={max - countdown}
              max={max}
            />
            <Donation width="100%" isFull={isFull} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WaitModal;
