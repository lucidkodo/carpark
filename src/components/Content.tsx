import { useEffect, useState } from 'react';
import { Container, Text, SimpleGrid, Box, Link } from '@chakra-ui/react';
import { Carpark, CarparkSize as Size } from '../data/types';
import CarparkCard from './CarparkCard';
import ViewAllModal from './Modal';

/* Constants */
const cpSizes = Object.values(Size);

export default function Content(props: any) {
  const carparks = props.carparks as Carpark[];

  const [smallCarparks, setSmallCarparks] = useState<Carpark[]>([]);
  const [mediumCarparks, setMediumCarparks] = useState<Carpark[]>([]);
  const [bigCarparks, setBigCarparks] = useState<Carpark[]>([]);
  const [largeCarparks, setLargeCarparks] = useState<Carpark[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Carpark[]>([]);

  function filterAndSortCarpark() {
    if (carparks.length === 0) {
      return;
    }

    const smallCp: Carpark[] = [];
    const mediumCp: Carpark[] = [];
    const bigCp: Carpark[] = [];
    const largeCp: Carpark[] = [];

    for (const carpark of carparks) {
      switch (true) {
        case carpark.category === Size.SMALL:
          smallCp.push(carpark);
          break;
        case carpark.category === Size.MEDIUM:
          mediumCp.push(carpark);
          break;
        case carpark.category === Size.BIG:
          bigCp.push(carpark);
          break;
        default:
          largeCp.push(carpark);
          break;
      }
    }

    // sort array by available lots
    smallCp.sort((a, b) => {
      return b.aggregatedAvailable - a.aggregatedAvailable;
    });

    mediumCp.sort((a, b) => {
      return b.aggregatedAvailable - a.aggregatedAvailable;
    });

    bigCp.sort((a, b) => {
      return b.aggregatedAvailable - a.aggregatedAvailable;
    });

    largeCp.sort((a, b) => {
      return b.aggregatedAvailable - a.aggregatedAvailable;
    });

    setSmallCarparks(smallCp);
    setMediumCarparks(mediumCp);
    setBigCarparks(bigCp);
    setLargeCarparks(largeCp);
  }

  function openModal(size: Size) {
    console.log(size);
    switch (size) {
      case Size.SMALL:
        setModalData(smallCarparks);
        break;
      case Size.MEDIUM:
        setModalData(mediumCarparks);
        break;
      case Size.BIG:
        setModalData(bigCarparks);
        break;
      default:
        setModalData(largeCarparks);
        break;
    }

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    console.log('content mount');
    filterAndSortCarpark();
  }, [carparks]);

  return (
    <Container maxWidth="2xl" color="GrayText">
      <SimpleGrid columns={{ '2xl': 2, xl: 2, md: 2, sm: 1 }} gap={3}>
        {[smallCarparks, mediumCarparks, bigCarparks, largeCarparks].map(
          (cp, index) => (
            <CarparkCard key={index} carparks={cp} category={cpSizes[index]}>
              {carparks.length && (
                <Link
                  onClick={() => openModal(cpSizes[index])}
                  fontSize="xs"
                  colorScheme="purple"
                >
                  View all {cp.length} carparks
                </Link>
              )}
            </CarparkCard>
          )
        )}
        {isModalOpen && (
          <ViewAllModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            modalData={modalData}
          />
        )}
      </SimpleGrid>
    </Container>
  );
}
