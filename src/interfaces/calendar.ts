export type ISlot = [number, number];

export type ISlots = Array<ISlot>;

export interface IUserData {
  start: number;
  end: number;
  meetings: ISlots;
}

export interface ISlotMap {
  [key: string]: boolean;
}
