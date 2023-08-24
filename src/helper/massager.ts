import { ApiResponse, Carpark, LotInfo, CarparkSize } from '../data/types';

/**
 * Massage data fetched from API
 */
export default function massageApiData(apiResponse: ApiResponse): Carpark[] {
  // Perform early return (runtime checking)
  if (
    !apiResponse ||
    !apiResponse.items ||
    !apiResponse.items.length ||
    !apiResponse.items[0].carpark_data ||
    !apiResponse.items[0].carpark_data.length
  ) {
    return [];
  }

  const rawDataArray = apiResponse.items[0].carpark_data;

  /**
   * Parse and massage data using Map
   *
   * Note:
   * There might be duplicated carpark objects.
   * When duplication is found, merge the lot info.
   */
  const dataMap = new Map<string, Carpark>();
  for (const rawData of rawDataArray) {
    // construct a new lot info
    const newLotInfo = rawData.carpark_info.map<LotInfo>((infoObject) => {
      return {
        totalLot: parseInt(infoObject.total_lots),
        lotsAvailable: parseInt(infoObject.lots_available),
        lotType: infoObject.lot_type,
      };
    });

    // construct a new carpark object
    const newCarpark: Carpark = {
      carparkNumber: rawData.carpark_number,
      lotInfo: newLotInfo,
      updatedDate: rawData.update_datetime,
      aggregatedAvailable: 0,
      aggregatedTotal: 0,
      category: null,
    };

    // merge carpark lot info by their lot type when duplication is found
    const isDuplicated = dataMap.has(newCarpark.carparkNumber);
    if (isDuplicated === false) {
      dataMap.set(rawData.carpark_number, newCarpark);
      categorizeCarpark(newCarpark);
    } else {
      const existingCarpark = dataMap.get(rawData.carpark_number) as Carpark;
      const existingTypes = existingCarpark.lotInfo.map((lot) => lot.lotType);

      newCarpark.lotInfo.forEach((newLot) => {
        if (existingTypes.includes(newLot.lotType) === false) {
          existingCarpark.lotInfo.push(newLot);
        }
      });

      categorizeCarpark(existingCarpark);
    }
  }

  // converts Map values to an array
  return Array.from(dataMap.values());
}

// compute aggregated lot counts
function categorizeCarpark(carpark: Carpark): Carpark {
  carpark.aggregatedTotal = carpark.lotInfo.reduce((prev, curr) => {
    return prev + curr.totalLot;
  }, 0);

  carpark.aggregatedAvailable = carpark.lotInfo.reduce((prev, curr) => {
    return prev + curr.lotsAvailable;
  }, 0);

  carpark.category = getCarparkCategory(carpark.aggregatedTotal);
  return carpark;
}

function getCarparkCategory(totalLot: number): CarparkSize {
  switch (true) {
    case totalLot >= 400:
      return CarparkSize.LARGE;
    case totalLot >= 300:
      return CarparkSize.BIG;
    case totalLot >= 100:
      return CarparkSize.MEDIUM;
    default:
      return CarparkSize.SMALL;
  }
}
