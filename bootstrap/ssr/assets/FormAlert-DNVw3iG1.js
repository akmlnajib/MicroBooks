import { jsx } from "react/jsx-runtime";
import clsx from "clsx";
function FormAlert({ message, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "rounded-lg bg-success/25 px-4 py-3 font-medium text-success-dark dark:bg-success/10",
        className
      ),
      children: message
    }
  );
}
export {
  FormAlert as F
};
