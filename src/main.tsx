// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './helper/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>
);
