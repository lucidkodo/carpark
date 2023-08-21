import { useState, useEffect } from 'react';
import { ApiResponse, Carpark } from './data/types';
import fetchCarparkData from './helper/fetcher';
import massageApiData from './helper/massager';

import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

/* Constants */
const pollDelayMs: number = 60000; // one minute
const oneSecond: number = 1000; // one second

export default function App() {
  const [carparkData, setCarparkData] = useState<Carpark[]>([]);
  const [pollerTimerId, setPollerTimerId] = useState<number>(0);

  // count down in ms till next poll
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const [countDownTimerId, setCountDownTimerId] = useState<number>(0);

  function initializePolling() {
    const timerId = setInterval(fetchData, pollDelayMs);
    // Store timer id to identify in useEffect
    setPollerTimerId(timerId);
  }

  function fetchData() {
    fetchCarparkData()
      .then((data: ApiResponse) => {
        const massagedData = massageApiData(data);
        setCarparkData(massagedData);
        restartCountDown();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function restartCountDown() {
    const newCountDownId = setInterval(countDown, oneSecond);

    setCountDownTimerId((prevTimerId: number) => {
      clearInterval(prevTimerId);
      setRemainingMs(pollDelayMs);
      return newCountDownId;
    });
  }

  function countDown() {
    setRemainingMs((remaining: number) => {
      if (remaining <= 0) {
        return pollDelayMs;
      }

      return remaining - oneSecond;
    });
  }

  /**
   * On component mount:
   *
   * 1. Fetch for the first time
   * 2. Initiate timer
   */
  useEffect(() => {
    console.log('app mounted');

    fetchData();
    initializePolling();
  }, []);

  return (
    <Box>
      <Header tillNextPoll={remainingMs} />
      <Content carparks={carparkData} />
      <Footer />
    </Box>
  );
}
