import { jsxs, jsx } from "react/jsx-runtime";
import { z as useContactContext, o as useDebounce, B as fetchContacts, D as Dropdown, d as useModalContext, q as useDropdownContext, n as unblockContact, E as fetchContactsInPaginate, A as AppLayout, F as ContactProvider, M as ModalProvider, S as SidebarMini } from "./SidebarMini-Di7pOyuz.js";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { BiSearch } from "react-icons/bi";
import { Link } from "@inertiajs/react";
import { B as BadgeOnline } from "./BadgeOnline-Crz2lS8N.js";
import { useInView } from "react-intersection-observer";
import { BsThreeDots, BsXLg, BsBan, BsArrowClockwise } from "react-icons/bs";
import { C as ContentEmpty } from "./ContentEmpty-C19tKPhS.js";
import "@headlessui/react";
import "moment";
import "./Modal-DiCRk7y7.js";
import "./InputLabel-BGYyLxCX.js";
import "./InputError-DMEJWwuX.js";
function ContactListSearch({
  search,
  setSearch
}) {
  const { setContacts, setPaginate } = useContactContext();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [debouncedSearch] = useDebounce(search, 300);
  useEffect(() => {
    setIsFirstLoading(false);
    if (!isFirstLoading) {
      fetchContacts(debouncedSearch).then((response) => {
        setContacts(response.data.data.data);
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
function ContactListAction({ contact }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute right-8 shrink-0", children: /* @__PURE__ */ jsx(Dropdown, { children: /* @__PURE__ */ jsx(Action, { contact }) }) });
}
const Action = ({ contact }) => {
  var _a;
  const { contacts, setContacts } = useContactContext();
  const { openModal } = useModalContext();
  const { open } = useDropdownContext();
  const dropdownRef = useRef(null);
  const dropdownPosition = (((_a = dropdownRef.current) == null ? void 0 : _a.getBoundingClientRect().bottom) || 0) < window.innerHeight - 100;
  const deleteContactConfirmation = () => {
    openModal({
      view: "DELETE_CONTACT_CONFIRMATION",
      size: "lg",
      payload: contact
    });
  };
  const blockContactConfirmation = () => {
    openModal({
      view: "BLOCK_CONTACT_CONFIRMATION",
      size: "lg",
      payload: contact
    });
  };
  const handleUnblockContact = () => {
    unblockContact(contact.id).then(() => {
      setContacts(
        contacts.map((c) => {
          if (c.id === contact.id) {
            c.is_contact_blocked = false;
          }
          return c;
        })
      );
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
          /* @__PURE__ */ jsx(Dropdown.Button, { onClick: deleteContactConfirmation, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BsXLg, {}),
            "Delete Contact"
          ] }) }),
          /* @__PURE__ */ jsx(
            Dropdown.Button,
            {
              onClick: contact.is_contact_blocked ? handleUnblockContact : blockContactConfirmation,
              children: contact.is_contact_blocked ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-success", children: [
                /* @__PURE__ */ jsx(BsBan, {}),
                "Unblock Contact"
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-danger", children: [
                /* @__PURE__ */ jsx(BsBan, {}),
                "Block Contact"
              ] })
            }
          )
        ]
      }
    )
  ] });
};
function ContactList() {
  const { contacts, setContacts, paginate, setPaginate } = useContactContext();
  const { ref: loadMoreRef, inView } = useInView();
  useEffect(() => {
    if (inView && loadMoreRef.length > 0) {
      if (paginate.next_page_url) {
        fetchContactsInPaginate(paginate.next_page_url).then((response) => {
          setPaginate(response.data.data);
          setContacts([...contacts, ...response.data.data.data]);
        });
      }
    }
  }, [inView, paginate]);
  if (contacts.length === 0)
    return;
  return /* @__PURE__ */ jsxs("div", { className: "relative max-h-[calc(100vh_-_158px)] flex-1 overflow-y-auto px-2 sm:max-h-max sm:pb-2", children: [
    contacts.sort((a, b) => a.name.localeCompare(b.name)).sort(
      (a, b) => a.is_online === b.is_online ? 0 : a.is_online ? -1 : 1
    ).map((contact) => /* @__PURE__ */ jsxs("div", { className: "group relative flex items-center", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("chats.show", contact.id),
          as: "button",
          className: clsx(
            "relative flex w-full flex-1 items-center gap-3 rounded-lg p-3 text-left transition-all group-hover:bg-secondary",
            contact.is_contact_blocked && "opacity-25"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: contact.avatar,
                  alt: contact.name,
                  className: "h-10 w-10 rounded-full border border-secondary"
                }
              ),
              contact.is_online && /* @__PURE__ */ jsx(BadgeOnline, {})
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: contact.name }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(ContactListAction, { contact })
    ] }, contact.id)),
    paginate.next_page_url && /* @__PURE__ */ jsx("button", { className: "mx-auto mt-4 flex", ref: loadMoreRef, children: /* @__PURE__ */ jsx(BsArrowClockwise, { className: "animate-spin text-2xl text-secondary-foreground" }) })
  ] });
}
function Sidebar() {
  const { contacts } = useContactContext();
  const [search, setSearch] = useState("");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "order-1 flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]",
        route().current("chats.show") ? "hidden" : "flex"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2 pt-2 sm:pb-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "People" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Active contacts (",
            contacts.filter((contact) => contact.is_online === true).length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ContactListSearch, { search, setSearch }),
        /* @__PURE__ */ jsx(ContactList, {}),
        contacts.length === 0 && search.length > 0 && /* @__PURE__ */ jsx("p", { className: "flex h-full flex-1 items-center justify-center", children: "Contact not found" }),
        contacts.length === 0 && search.length === 0 && /* @__PURE__ */ jsx("p", { className: "flex h-full flex-1 items-center justify-center", children: "No contact saved yet" })
      ]
    }
  );
}
function Contacts() {
  return /* @__PURE__ */ jsx(AppLayout, { title: "People", children: /* @__PURE__ */ jsx(ContactProvider, { children: /* @__PURE__ */ jsxs(ModalProvider, { children: [
    /* @__PURE__ */ jsx(SidebarMini, {}),
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx(ContentEmpty, {})
  ] }) }) });
}
export {
  Contacts as default
};
