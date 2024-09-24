import { jsxs, jsx } from "react/jsx-runtime";
function ContentEmpty() {
  return /* @__PURE__ */ jsxs("div", { className: "order-3 hidden h-screen w-full flex-1 flex-col items-center justify-center gap-4 border-l border-secondary sm:flex", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/message-empty.png",
        alt: "message-empty.png",
        className: "w-[245px]"
      }
    ),
    /* @__PURE__ */ jsx("h5", { className: "text-xl font-medium", children: "No chats selected" })
  ] });
}
export {
  ContentEmpty as C
};
