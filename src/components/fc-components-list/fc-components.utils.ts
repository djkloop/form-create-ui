import { ComponentsItem } from "@/interface/components";

export const generateUniqueKey = (list: ComponentsItem[], idx: number) => {
  const uniqueKey = list[idx].type + "__" + new Date().getTime();
  console.log(uniqueKey);
};
