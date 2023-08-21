import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import { Carpark, CarparkSize } from '../data/types';

interface CardProp {
  carparks: Carpark[];
  category: CarparkSize;
  children: any;
}

export default function CarparkCard({
  carparks,
  category,
  children,
}: CardProp) {
  function getLast3(): Carpark[] {
    return carparks.slice(-3).sort((a, b) => {
      return a.aggregatedAvailable - b.aggregatedAvailable;
    });
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md" textTransform="capitalize">
          {category}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Highest available:
            </Heading>
            <Text pt="2" fontSize="sm">
              {carparks.length
                ? `${carparks[0].carparkNumber} (${carparks[0].aggregatedAvailable} lots)`
                : '-'}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Lowest available:
            </Heading>
            <Text pt="2" fontSize="sm">
              {getLast3().length &&
                getLast3()
                  .map(
                    (cp) =>
                      `${cp.carparkNumber} (${cp.aggregatedAvailable} lots)`
                  )
                  .join(', ')}
            </Text>
          </Box>
          <Box>{children}</Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
