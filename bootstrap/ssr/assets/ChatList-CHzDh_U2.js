import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { B as BadgeOnline } from "./BadgeOnline-Crz2lS8N.js";
import clsx from "clsx";
import { D as Dropdown, i as useAppContext, u as useChatContext, b as useChatMessageContext, d as useModalContext, q as useDropdownContext, c as CHAT_TYPE, r as markAsRead, t as markAsUnread, v as archiveChat, w as unarchiveChat, n as unblockContact, x as fetchChatsInPaginate, y as relativeTime } from "./SidebarMini-Di7pOyuz.js";
import { useRef, useEffect } from "react";
import { BsThreeDots, BsCheck2, BsArchive, BsXLg, BsBan, BsBoxArrowRight, BsArrowClockwise } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
function BadgeChatNotification() {
  return /* @__PURE__ */ jsx("span", { className: "absolute right-3 h-2.5 w-2.5 rounded-full bg-primary" });
}
function ChatListAction({ chat }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute right-8 shrink-0", children: /* @__PURE__ */ jsx(Dropdown, { children: /* @__PURE__ */ jsx(Action, { chat }) }) });
}
const Action = ({ chat }) => {
  var _a;
  const { auth, syncNotification } = useAppContext();
  const { chats, setChats, refetchChats } = useChatContext();
  const { user, setUser } = useChatMessageContext();
  const { openModal } = useModalContext();
  const { open } = useDropdownContext();
  const dropdownRef = useRef(null);
  const dropdownPosition = (((_a = dropdownRef.current) == null ? void 0 : _a.getBoundingClientRect().bottom) || 0) < window.innerHeight - 100;
  const handleMarkAsRead = () => {
    markAsRead(chat).then(() => {
      setChats(
        chats.map((c) => {
          if (c.id === chat.id) {
            c.is_read = true;
          }
          return c;
        })
      );
      syncNotification();
    });
  };
  const handleMarkAsUnread = () => {
    markAsUnread(chat).then(() => {
      setChats(
        chats.map((c) => {
          if (c.id === chat.id) {
            c.is_read = false;
          }
          return c;
        })
      );
      syncNotification();
    });
  };
  const handleArchiveChat = () => {
    archiveChat(chat).then(() => {
      refetchChats();
      syncNotification();
    });
  };
  const handleUnarchiveChat = () => {
    unarchiveChat(chat).then(() => {
      refetchChats();
      syncNotification();
    });
  };
  const deleteChatConfirmation = () => {
    openModal({
      view: "DELETE_CHAT_CONFIRMATION",
      size: "lg",
      payload: chat
    });
  };
  const blockContactConfirmation = () => {
    openModal({
      view: "BLOCK_CONTACT_CONFIRMATION",
      size: "lg",
      payload: chat
    });
  };
  const handleUnblockContact = () => {
    unblockContact(chat.id).then(() => {
      setChats(
        chats.map((c) => {
          if (c.id === chat.id) {
            c.is_contact_blocked = false;
          }
          return c;
        })
      );
      if ((user == null ? void 0 : user.id) === chat.id) {
        setUser({ ...user, is_contact_blocked: false });
      }
    });
  };
  const exitGroupConfirmation = () => {
    openModal({
      view: "EXIT_GROUP_CONFIRMATION",
      size: "lg",
      payload: chat
    });
  };
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: clsx(
          "rounded-full border border-secondary bg-background p-1.5 shadow-sm group-hover:visible group-hover:flex",
          open ? "visible" : "invisible"
        ),
        children: /* @__PURE__ */ jsx(BsThreeDots, { className: "text-secondary-foreground" })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      Dropdown.Content,
      {
        align: dropdownPosition ? "right" : "top-right",
        contentClasses: dropdownPosition ? "" : "mb-7",
        children: [
          auth.id !== chat.id && auth.id !== chat.from_id && /* @__PURE__ */ jsx(
            Dropdown.Button,
            {
              onClick: chat.is_read ? handleMarkAsUnread : handleMarkAsRead,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(BsCheck2, { className: "-ml-1 text-lg" }),
                "Mark as ",
                chat.is_read ? "Unread" : "Read"
              ] })
            }
          ),
          route().current("chats.*") ? /* @__PURE__ */ jsx(Dropdown.Button, { onClick: handleArchiveChat, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BsArchive, {}),
            "Archive Chat"
          ] }) }) : /* @__PURE__ */ jsx(Dropdown.Button, { onClick: handleUnarchiveChat, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BsArchive, {}),
            "Unarchive Chat"
          ] }) }),
          /* @__PURE__ */ jsx(Dropdown.Button, { onClick: deleteChatConfirmation, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BsXLg, {}),
            "Delete Chat"
          ] }) }),
          auth.id !== chat.id && chat.chat_type === CHAT_TYPE.CHATS && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("hr", { className: "my-2 border-secondary" }),
            /* @__PURE__ */ jsx(
              Dropdown.Button,
              {
                onClick: chat.is_contact_blocked ? handleUnblockContact : blockContactConfirmation,
                children: chat.is_contact_blocked ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-success", children: [
                  /* @__PURE__ */ jsx(BsBan, {}),
                  "Unblock Contact"
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-danger", children: [
                  /* @__PURE__ */ jsx(BsBan, {}),
                  "Block Contact"
                ] })
              }
            )
          ] }),
          auth.id !== chat.id && chat.chat_type === CHAT_TYPE.GROUP_CHATS && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("hr", { className: "my-2 border-secondary" }),
            /* @__PURE__ */ jsx(Dropdown.Button, { onClick: exitGroupConfirmation, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-danger", children: [
              /* @__PURE__ */ jsx(BsBoxArrowRight, {}),
              "Exit Group"
            ] }) })
          ] })
        ]
      }
    )
  ] });
};
function ChatList({ search, href, className }) {
  const { syncNotification } = useAppContext();
  const { chats, setChats, paginate, setPaginate } = useChatContext();
  const { ref: loadMoreRef, inView } = useInView();
  useEffect(() => {
    if (inView && loadMoreRef.length > 0) {
      if (paginate.next_page_url) {
        fetchChatsInPaginate(paginate.next_page_url).then((response) => {
          setPaginate(response.data.data);
          setChats([...chats, ...response.data.data.data]);
        });
      }
    }
  }, [inView, paginate]);
  const handleMarkAsRead = (chat) => {
    if (!chat.is_read) {
      markAsRead(chat).then(syncNotification);
    }
  };
  if (chats.length === 0)
    return;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "relative max-h-[calc(100vh_-_158px)] flex-1 overflow-y-auto px-2 sm:max-h-max sm:pb-2",
        className
      ),
      children: [
        chats.sort((a, b) => {
          var _a;
          if (search.length === 0)
            return (_a = b.created_at) == null ? void 0 : _a.localeCompare(a.created_at);
          return a.name.localeCompare(b.name);
        }).map((chat) => /* @__PURE__ */ jsxs("div", { className: "group relative flex items-center", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route(href, chat.id),
              as: "button",
              onClick: () => handleMarkAsRead(chat),
              className: clsx(
                "relative flex w-full flex-1 items-center gap-3 rounded-lg p-3 text-left transition-all group-hover:bg-secondary",
                route().current(href, chat.id) && "bg-secondary",
                chat.is_contact_blocked && "opacity-25"
              ),
              children: search.length === 0 && chat.created_at ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: chat.avatar,
                      alt: chat.name,
                      className: "h-12 w-12 rounded-full border border-secondary"
                    }
                  ),
                  chat.is_online && /* @__PURE__ */ jsx(BadgeOnline, {})
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
                  /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: chat.name }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-secondary-foreground", children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: clsx(
                          "truncate",
                          !chat.is_read && "font-medium text-foreground",
                          route().current(href, chat.id) && "!text-foreground"
                        ),
                        dangerouslySetInnerHTML: { __html: chat.body }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "mx-1", children: "." }),
                    /* @__PURE__ */ jsx("span", { className: "shrink-0", children: relativeTime(chat.created_at) })
                  ] })
                ] })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: chat.avatar,
                      alt: chat.name,
                      className: "h-10 w-10 rounded-full border border-secondary"
                    }
                  ),
                  chat.is_online && /* @__PURE__ */ jsx(BadgeOnline, {})
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: chat.name }) })
              ] })
            }
          ),
          chat.body && /* @__PURE__ */ jsx(ChatListAction, { chat }),
          !chat.is_read && /* @__PURE__ */ jsx(BadgeChatNotification, {})
        ] }, chat.id)),
        paginate.next_page_url && /* @__PURE__ */ jsx("button", { className: "mx-auto mt-4 flex", ref: loadMoreRef, children: /* @__PURE__ */ jsx(BsArrowClockwise, { className: "animate-spin text-2xl text-secondary-foreground" }) })
      ]
    }
  );
}
export {
  ChatList as C
};
