import { Accessor, createSignal, For } from "solid-js";
import { ISlot, ISlotMap } from "~/interfaces/calendar";
import { createSlotKey } from "~/utilities/calendar";

export default function DayView() {
  const SLOT_SIZE = 1 / 2; // in hour
  const START_TIME = 0; // in hour
  const END_TIME = 24; // in hour

  const NUMBER_OF_SLOTS = (END_TIME - START_TIME) / SLOT_SIZE;

  const [selectedSlots, setSelectedSlots] = createSignal<ISlotMap>({});

  const handleSlotClick = (index: Accessor<number>) => {
    const startTime = index() * SLOT_SIZE;
    const endTime = startTime + SLOT_SIZE;
    const newSlot: ISlot = [startTime, endTime];
    const slotKey = createSlotKey(newSlot);
    const newData = { ...selectedSlots() };
    if (newData[slotKey]) {
      newData[slotKey] = false;
    } else {
      newData[slotKey] = true;
    }

    setSelectedSlots(newData);
  };

  const handleClearSlots = () => {
    setSelectedSlots({});
  };

  return (
    <div class="bg-gray-200 w-30 rounded m-4 divide-y divide-gray-100">
      <button onClick={handleClearSlots}>Clear</button>
      <For each={Array(NUMBER_OF_SLOTS)}>
        {(item, index) => (
          <div
            class="p-2 hover:bg-gray-300"
            onClick={() => handleSlotClick(index)}
          >
            {index}
          </div>
        )}
      </For>
    </div>
  );
}
