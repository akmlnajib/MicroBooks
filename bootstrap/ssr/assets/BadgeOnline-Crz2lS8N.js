import { jsx } from "react/jsx-runtime";
import clsx from "clsx";
function BadgeOnline({ className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute bottom-1 right-1 h-2 w-2 rounded-full bg-success ring-2 ring-white dark:bg-success-dark dark:ring-gray-200",
        className
      )
    }
  );
}
export {
  BadgeOnline as B
};
