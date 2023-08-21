export interface ApiResponse {
  items: Array<{
    timestamp: string;
    carpark_data: RawCarpark[];
  }>;
}

export interface RawCarpark {
  carpark_info: RawLotInfo[];
  carpark_number: string; // carpark identifier
  update_datetime: string; // to be transformed
}

export interface RawLotInfo {
  total_lots: string; // to be transformed to number type
  lot_type: string;
  lots_available: string; // to be transformed to number type
}

/**
 * Following are interfaces after data transformation.
 * Not using `Omit<>` or `Pick<>` because:
 * 1. preference for camelCase
 * 2. type change would make them redundant and hard to read.
 */
export interface Carpark {
  carparkNumber: string;
  category: CarparkSize | null;
  lotInfo: LotInfo[];
  updatedDate: string;
  aggregatedTotal: number;
  aggregatedAvailable: number;
}

export interface LotInfo {
  totalLot: number;
  lotType: string;
  lotsAvailable: number;
}

export enum CarparkSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  BIG = 'BIG',
  LARGE = 'LARGE',
}
