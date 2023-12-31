import { ViewQueries } from "@/constants";
import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const options = [
  {
    label: "Page",
    query: {
      view: ViewQueries.Page,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: "Cursor(Button)",
    query: {
      view: ViewQueries.CursorButton,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: "Cursor(Observer)",
    query: {
      view: ViewQueries.CursorObserver,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
];

const ViewOptions = () => {
  const router = useRouter();

  const selectedIdx = useMemo(() => {
    return options.findIndex(
      (option) => option.query?.view === router.query?.view
    );
  }, [router.query?.view]);

  return (
    <Select
      w={"fit-content"}
      value={selectedIdx}
      onChange={(e) =>
        router.push({ query: options[Number(e.target.value)].query })
      }
    >
      {options.map((option, idx) => (
        <option key={option.label} value={idx}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default ViewOptions;
