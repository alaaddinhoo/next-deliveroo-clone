import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  setFilterString: (value: string) => void;
  filterString: string;
}

// Define the types for filterObject
interface FilterObject {
  offers: string[];
  dietary: string[];
  cuisines: string[];
}

export default function Sidebar({ setFilterString, filterString }: Props) {
  const [filterObject, setFilterObject] = useState<FilterObject>({
    offers: [],
    dietary: [],
    cuisines: [],
  });

  // Synchronize local state with filterString from props
  useEffect(() => {
    const parsedFilters: FilterObject = {
      offers: [],
      dietary: [],
      cuisines: [],
    };

    const regex = /(offers|cuisines|dietary):"(.*?)"/g;
    let match;
    while ((match = regex.exec(filterString)) !== null) {
      const type = match[1] as keyof FilterObject;
      const value = match[2];
      parsedFilters[type].push(value);
    }

    setFilterObject(parsedFilters);
  }, [filterString]);

  // Function to determine if a checkbox should be checked based on current state
  const isCheckboxChecked = (type: keyof FilterObject, value: string) => {
    return filterObject[type].includes(value);
  };

  const handleFormChange = (
    type: "offers" | "dietary" | "cuisines",
    event: FormEvent<HTMLFormElement>
  ) => {
    const form = event.currentTarget;
    const target = event.target as HTMLInputElement;

    if (target.type !== "checkbox") return;

    const formData = new FormData(form);

    // Get selected values
    const selectedValues: string[] = [];
    formData.forEach((value, key) => {
      if (value === "on") {
        selectedValues.push(key);
      }
    });

    // Update the corresponding field in the filterObject
    setFilterObject((prev) => {
      const updatedFilterObject = {
        ...prev,
        [type]: selectedValues,
      };

      // Build the filter string
      const filterStringParts: string[] = [];
      Object.entries(updatedFilterObject).forEach(([key, values]) => {
        if (values.length > 0) {
          filterStringParts.push(
            values.map((value) => `${key}:"${value}"`).join(" AND ")
          );
        }
      });

      const filterString = filterStringParts.join(" AND ");
      setFilterString(filterString);

      return updatedFilterObject;
    });
  };

  return (
    <div className="mr-[24px] h-full space-y-6 sticky top-[80px] max-h-[90vh] overflow-auto no-scrollbar">
      <div className="flex gap-24">
        <div className="flex gap-4">
          <Image
            src="https://dbhq-deliveroo-riders-website.cdn.prismic.io/dbhq-deliveroo-riders-website/2a9890a1-027e-4017-9954-01954dc5fa3c_new-riders.svg"
            alt="rider"
            width="36"
            height="36"
          ></Image>
          <div>
            <div className="text-[#585C5C] text-[12px] font-normal">Now</div>
            <div>Al Musalla</div>
          </div>
        </div>
        <div className="text-[#00b8a9] text-[14px] self-center">Change</div>
      </div>

      <div className="w-full border-b border-[#eee]"></div>

      <div className="space-y-6 h-[100%] overflow-auto">
        <RadioGroup defaultValue="option-one" className="pt-4 pl-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Pickup</Label>
          </div>
        </RadioGroup>

        <div className="w-full border-b border-[#eee]"></div>

        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="text-[#2e3333] text-[14px]">Sort</p>
            </AccordionTrigger>
            <AccordionContent>
              <form>
                <RadioGroup defaultValue="distance" className="pt-4 pl-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="distance" id="distance" />
                    <Label htmlFor="distance">Distance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="quickestDelivery"
                      id="quickestDelivery"
                    />
                    <Label htmlFor="quickestDelivery">Quickest delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recommended" id="recommended" />
                    <Label htmlFor="recommended">Recommended</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="topRated" id="topRated" />
                    <Label htmlFor="topRated">Top-rated</Label>
                  </div>
                </RadioGroup>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="w-full border-b border-[#eee]"></div>

        <Accordion type="single" collapsible defaultValue="item-2">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <p className="text-[#2e3333] text-[14px]">Offers</p>
            </AccordionTrigger>
            <AccordionContent>
              <form onChange={(e) => handleFormChange("offers", e)}>
                <div className="pt-4 pl-2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="offers1"
                      name="Buy 1 get 1"
                      checked={isCheckboxChecked("offers", "Buy 1 get 1")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="offers1">Buy 1 get 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="offers2"
                      name="Free delivery"
                      checked={isCheckboxChecked("offers", "Free delivery")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="offers2">Free delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="offers3"
                      name="Top daily deals"
                      checked={isCheckboxChecked("offers", "Top daily deals")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="offers3">Top daily deals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="offers4"
                      name="Grocery deals"
                      checked={isCheckboxChecked("offers", "Grocery deals")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="offers4">Grocery deals</Label>
                  </div>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full border-b border-[#eee]"></div>

        <Accordion type="single" collapsible defaultValue="item-3">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <p className="text-[#2e3333] text-[14px]">Dietary</p>
            </AccordionTrigger>
            <AccordionContent>
              <form onChange={(e) => handleFormChange("dietary", e)}>
                <div className="pt-4 pl-2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dietary1"
                      name="Gluten Free"
                      checked={isCheckboxChecked("dietary", "Gluten Free")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="dietary1">Gluten Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dietary2"
                      name="Halal"
                      checked={isCheckboxChecked("dietary", "Halal")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="dietary2">Halal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dietary3"
                      name="Organic"
                      checked={isCheckboxChecked("dietary", "Organic")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="dietary3">Organic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dietary4"
                      name="Paleo"
                      checked={isCheckboxChecked("dietary", "Paleo")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="dietary4">Paleo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dietary5"
                      name="Vegan Friendly"
                      checked={isCheckboxChecked("dietary", "Vegan Friendly")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="Vegan Friendly">Vegan Friendly</Label>
                  </div>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full border-b border-[#eee]"></div>

        <Accordion type="single" collapsible defaultValue="item-4">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <p className="text-[#2e3333] text-[14px]">Cuisines</p>
            </AccordionTrigger>
            <AccordionContent>
              <form onChange={(e) => handleFormChange("cuisines", e)}>
                <div className="pt-4 pl-2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines1"
                      name="American"
                      checked={isCheckboxChecked("cuisines", "American")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="cuisines1">American</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines2"
                      name="Arabic"
                      checked={isCheckboxChecked("cuisines", "Arabic")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="cuisines2">Arabic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines3"
                      name="Asian"
                      checked={isCheckboxChecked("cuisines", "Asian")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="cuisines3">Asian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines4"
                      name="Breakfast"
                      checked={isCheckboxChecked("cuisines", "Breakfast")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="dietary4">Breakfast</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines5"
                      name="Cafe"
                      checked={isCheckboxChecked("cuisines", "Cafe")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="cuisines5">Cafe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cuisines6"
                      name="Chinese"
                      checked={isCheckboxChecked("cuisines", "Chinese")}
                      className="checkbox-custom"
                    />
                    <Label htmlFor="cuisines6">Chinese</Label>
                  </div>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
