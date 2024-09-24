import { jsx, jsxs } from "react/jsx-runtime";
import { A as ApplicationLogo } from "./ApplicationLogo-ChmsOzt0.js";
import { Link } from "@inertiajs/react";
function Guest({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen flex-col items-center justify-center bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "flex w-11/12 max-w-md flex-col space-y-6 overflow-hidden rounded-lg bg-background p-6 shadow-md", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "mx-auto w-20", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }),
    children
  ] }) });
}
export {
  Guest as G
};
