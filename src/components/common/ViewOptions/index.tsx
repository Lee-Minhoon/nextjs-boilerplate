import { ViewQueries } from "@/constants";
import { useSafePush } from "@/hooks";
import { capitalize } from "@/utils";
import { Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const options = [
  {
    label: capitalize(ViewQueries.Table),
    query: {
      view: ViewQueries.Table,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: capitalize(ViewQueries.List),
    query: {
      view: ViewQueries.List,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
];

const ViewOptions = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

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
        push({
          query: { ...router.query, ...options[Number(e.target.value)].query },
        })
      }
    >
      {options.map((option, idx) => (
        <option key={option.label} value={idx}>
          {t(option.label)}
        </option>
      ))}
    </Select>
  );
};

export default ViewOptions;
