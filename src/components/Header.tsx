import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  FormLabel,
  Switch,
  useColorMode,
  Spacer,
  Text,
} from '@chakra-ui/react';

export default function Header(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorMode === 'dark');

  useEffect(() => {
    setIsDarkMode(colorMode === 'dark');
  }, [colorMode]);

  return (
    <Container maxWidth="2xl">
      <Flex justifyContent="space-around" alignItems="center" paddingTop={10}>
        <Box>
          <Heading fontSize="xl">Carpark availability</Heading>
        </Box>
        <Spacer />
        <HStack spacing="0" alignItems="baseline">
          <FormLabel htmlFor="modeToggle" fontSize="20px">
            {isDarkMode ? '🌙' : '☀️'}
          </FormLabel>
          <Switch
            id="modeToggle"
            size="sm"
            marginLeft="-5px"
            onChange={toggleColorMode}
            isChecked={isDarkMode}
          />
        </HStack>
      </Flex>
      <Text noOfLines={1} as="i" pb={3} color="GreyText">
        Next poll in: {props.tillNextPoll / 1000}s
      </Text>
    </Container>
  );
}
