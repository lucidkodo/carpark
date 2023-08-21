import { ApiResponse } from '../data/types';

/**
 * Fetch data using `window.fetch` from the specified endpoint.
 * Error handling should be done by the function consumer.
 *
 * @returns Promise<ApiResponse>
 */
export default function fetchCarparkData(): Promise<ApiResponse> {
  return window
    .fetch('https://api.data.gov.sg/v1/transport/carpark-availability')
    .then((res: Response) => {
      if (res.ok !== true || res.status !== 200) {
        throw new Error('Error fetching data from API.');
      }

      // forced casting
      return res.json() as unknown as ApiResponse;
    });
}
