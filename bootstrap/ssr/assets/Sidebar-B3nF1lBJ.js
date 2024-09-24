import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { u as useChatContext, o as useDebounce, p as fetchChats, d as useModalContext } from "./SidebarMini-Di7pOyuz.js";
import { BiSearch } from "react-icons/bi";
import { C as ChatList } from "./ChatList-CHzDh_U2.js";
import clsx from "clsx";
function ChatListSearch({
  search,
  setSearch
}) {
  const { setChats, setPaginate } = useChatContext();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [debouncedSearch] = useDebounce(search, 300);
  useEffect(() => {
    setIsFirstLoading(false);
    if (!isFirstLoading) {
      fetchChats(debouncedSearch).then((response) => {
        setChats(response.data.data.data);
        setPaginate(response.data.data);
      });
    }
  }, [debouncedSearch]);
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center px-2 py-0", children: [
    /* @__PURE__ */ jsx("span", { className: "absolute left-5", children: /* @__PURE__ */ jsx(BiSearch, { className: "text-2xl text-secondary-foreground" }) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Search Messenger",
        className: "w-full rounded-lg border-secondary bg-background pl-10 focus:border-secondary focus:ring-transparent",
        value: search,
        onChange: handleOnChange
      }
    )
  ] });
}
function Sidebar() {
  const { chats } = useChatContext();
  const { openModal } = useModalContext();
  const [search, setSearch] = useState("");
  const addNewGroup = () => {
    openModal({
      view: "ADD_NEW_GROUP",
      size: "lg"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "order-1 flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]",
        route().current("chats.show") ? "hidden" : "flex"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2 pt-2 sm:pb-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Chats" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white",
              onClick: addNewGroup,
              children: /* @__PURE__ */ jsx(FaUsers, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ChatListSearch, { search, setSearch }),
        /* @__PURE__ */ jsx(ChatList, { search, href: "chats.show" }),
        chats.length === 0 && search.length > 0 && /* @__PURE__ */ jsx("p", { className: "flex h-full flex-1 items-center justify-center", children: "User not found" }),
        chats.length === 0 && search.length === 0 && /* @__PURE__ */ jsx("p", { className: "flex h-full flex-1 items-center justify-center", children: "No chat yet" })
      ]
    }
  );
}
export {
  Sidebar as S
};
