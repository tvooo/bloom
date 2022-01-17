import { format, isBefore, isSameDay, isSameWeek, isTomorrow, nextMonday, nextSaturday, nextSunday, startOfDay } from "date-fns";
import { Task } from "model/task";
import { ensureDate } from "utils/filters";

const groupByDate = (items: Task[]): Array<{ label: string; items: Task[] }> => {
    const result: Record<string, Task[]> = {};
    items.forEach(item => {
      let label: null | string = "Later";
      if (item.scheduled) {
        if (isSameWeek(nextMonday(new Date()), ensureDate(item.scheduled))) {
          label = "Next week";
        }
        if (isSameDay(nextSaturday(new Date()), ensureDate(item.scheduled))) {
          label = "Weekend";
        }
        if (isSameDay(nextSunday(new Date()), ensureDate(item.scheduled))) {
          label = "Weekend";
        }
        if (isBefore(ensureDate(item.scheduled), nextSaturday(new Date()))) {
          label = format(startOfDay(ensureDate(item.scheduled)), "EEE, d MMM yyyy");
        }
        if (isTomorrow(ensureDate(item.scheduled))) {
          label = "Tomorrow";
        }
      } else {
        label = '';
      }
      result[label] = result[label] ? [...result[label], item] : [item];
    });
    return Object.keys(result).map(dt => ({ label: dt, items: result[dt] }));
  }

  export default groupByDate;