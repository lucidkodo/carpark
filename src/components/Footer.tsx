import { Container, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Container maxWidth="2xl" paddingY={30} textAlign="center">
      <Link href="https://github.com/lucidkodo/carpark">Source code</Link>
    </Container>
  );
}
