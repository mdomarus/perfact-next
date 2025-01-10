import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default function DateComponent({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString} className="text-base italic">
      {format(new Date(dateString), "dd LLL yyyy", { locale: pl })}
    </time>
  );
}
