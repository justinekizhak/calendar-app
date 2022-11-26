import { ISlot, ISlotMap, ISlots, IUserData } from "~/interfaces/calendar";

const user1: IUserData = {
  start: 8,
  end: 20,
  meetings: [
    [9, 10],
    [14, 16],
    [18, 19],
  ],
};

const user2: IUserData = {
  start: 10,
  end: 21,
  meetings: [
    [11, 13.5],
    [14, 15],
    [18.5, 19.5],
  ],
};

function add(slot1: ISlot, slot2: ISlot): ISlot {
  if (slot1[1] < slot2[0] || slot2[1] < slot1[0]) {
    throw Error("Slot 1 is not overlapping with slot 2");
  }
  const start = Math.min(slot1[0], slot2[0]);
  const end = Math.max(slot1[1], slot2[1]);
  return [start, end];
}

function intersection(slot1: ISlot, slot2: ISlot): ISlot {
  const start = Math.max(slot1[0], slot2[0]);
  const end = Math.min(slot1[1], slot2[1]);
  if (end < start) {
    throw Error("Slot 1 is not overlapping with slot 2");
  }
  return [start, end];
}

function combineMeetingSlots(slots1: ISlots, slots2: ISlots): ISlots {
  const output: ISlots = [];

  const slot1Map: ISlotMap = {};
  const slot2Map: ISlotMap = {};

  slots1.forEach((slot1) => {
    slots2.forEach((slot2) => {
      try {
        const unionOfSlot = add(slot1, slot2);
        const key1 = createSlotKey(slot1);
        const key2 = createSlotKey(slot2);
        slot1Map[key1] = true;
        slot2Map[key2] = true;
        output.push(unionOfSlot);
      } catch {
        // output.push(slot1, slot2)
      }
    });
  });

  slots1.forEach((slot) => {
    const key = createSlotKey(slot);
    if (!slot1Map[key]) {
      output.push(slot);
    }
  });

  slots2.forEach((slot) => {
    const key = createSlotKey(slot);
    if (!slot2Map[key]) {
      output.push(slot);
    }
  });

  output.sort((a, b) => a[0] - b[0]);

  return output;
}

function createSlotKey(slot: ISlot): string {
  return `${slot[0]}_${slot[1]}`;
}

function getTotalFreeTime(user1: IUserData, user2: IUserData): ISlot {
  const user1FreeSlot: ISlot = [user1.start, user1.end];
  const user2FreeSlot: ISlot = [user2.start, user2.end];
  const output = intersection(user1FreeSlot, user2FreeSlot);
  return output;
}

export function calculateFreeSlots(user1: IUserData, user2: IUserData): ISlots {
  const output: ISlots = [];
  const occupiedSlot = combineMeetingSlots(user1.meetings, user2.meetings);
  const totalFreeSlot = getTotalFreeTime(user1, user2);
  const inBetweenSlots: ISlots = [];

  const startSlot: ISlot = [totalFreeSlot[0], occupiedSlot[0][0]];
  if (isSlotValid(startSlot)) {
    output.push(startSlot);
  }

  const totalOccupiedSlotsCount = occupiedSlot.length;

  for (let i = 0; i < totalOccupiedSlotsCount - 1; i++) {
    const curr = occupiedSlot[i];
    const next = occupiedSlot[i + 1];
    const newSlot: ISlot = [curr[1], next[0]];
    inBetweenSlots.push(newSlot);
  }

  output.push(...inBetweenSlots);

  const endSlot: ISlot = [
    occupiedSlot[totalOccupiedSlotsCount - 1][1],
    totalFreeSlot[1],
  ];
  if (isSlotValid(endSlot)) {
    output.push(endSlot);
  }

  // Subtract that from the intersection of the total time
  // The remaining list will the list of free slots
  return output;
}

function isSlotValid(slot: ISlot): boolean {
  if (slot[0] < slot[1]) {
    return true;
  }
  return false;
}
