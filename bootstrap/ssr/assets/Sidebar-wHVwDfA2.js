import { jsxs, jsx } from "react/jsx-runtime";
import { C as ChatList } from "./ChatList-CHzDh_U2.js";
import { u as useChatContext } from "./SidebarMini-Di7pOyuz.js";
import clsx from "clsx";
function Sidebar() {
  const { chats } = useChatContext();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "order-1 flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]",
        route().current("archived_chats.show") ? "hidden" : "flex"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-2 pt-2 sm:pb-0", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Archived Chats" }) }),
        /* @__PURE__ */ jsx(ChatList, { search: "", href: "archived_chats.show" }),
        chats.length === 0 && /* @__PURE__ */ jsx("p", { className: "flex h-full flex-1 items-center justify-center", children: "No archived chat yet" })
      ]
    }
  );
}
export {
  Sidebar as S
};
