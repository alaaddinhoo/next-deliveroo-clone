import { X } from "lucide-react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
interface Props {
  filterString: string;
  setFilterString: (value: string) => void;
}

export const FiltersList = ({ setFilterString, filterString }: Props) => {
  // Function to extract values from the filter string
  const extractValues = (filterStr: string) => {
    const regex = /(offers|cuisines|dietary):"(.*?)"/g;
    const values: { type: string; value: string }[] = [];
    let match;
    while ((match = regex.exec(filterStr)) !== null) {
      values.push({ type: match[1], value: match[2] });
    }
    return values;
  };

  // Function to remove a filter from the filter string
  const removeFilter = (type: string, value: string) => {
    const regex = new RegExp(`${type}:"${value}"`, "g");
    let newFilterString = filterString.replace(regex, "").trim();

    // Remove any leading or trailing 'AND' and fix multiple 'AND's
    newFilterString = newFilterString.replace(/AND\s*AND/g, "AND").trim();
    if (newFilterString.startsWith("AND ")) {
      newFilterString = newFilterString.substring(4);
    }
    if (newFilterString.endsWith(" AND")) {
      newFilterString = newFilterString.substring(
        0,
        newFilterString.length - 4
      );
    }

    setFilterString(newFilterString);
  };

  // Extract values from the filterString
  const values = extractValues(filterString);

  return (
    <Splide
      options={{
        rewind: true,
        autoWidth: true,
        gap: "8px",
        drag: "free",
        pagination: false,
        arrows: false,
      }}
    >
      {values.map((item, index) => (
        <SplideSlide
          key={index}
          className="bg-[#00ccbb] text-white p-2 text-sm flex gap-2 items-center"
        >
          <div>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}:{" "}
            {item.value}
          </div>
          <X
            onClick={() => removeFilter(item.type, item.value)}
            size={18}
            className="cursor-pointer"
          />
        </SplideSlide>
      ))}

      <SplideSlide>
        {filterString != "" && (
          <button
            className="p-2 font-normal text-md text-[#00ccbb]"
            onClick={() => setFilterString("")}
          >
            Clear filters
          </button>
        )}
      </SplideSlide>
    </Splide>
  );
};
