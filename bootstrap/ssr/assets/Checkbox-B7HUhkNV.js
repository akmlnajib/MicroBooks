import { jsx } from "react/jsx-runtime";
function Checkbox({
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsx("input", { ...props, type: "checkbox", className: "checkbox " + className });
}
export {
  Checkbox as C
};
