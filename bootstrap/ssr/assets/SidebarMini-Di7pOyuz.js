import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { usePage, useForm, router, Link, Head } from "@inertiajs/react";
import clsx from "clsx";
import { createContext, useContext, useReducer, useState, useEffect, Fragment, forwardRef, useRef, useImperativeHandle } from "react";
import { Combobox, Transition, Switch } from "@headlessui/react";
import { BsX, BsChevronExpand, BsCheck, BsCamera, BsCircleHalf, BsChevronDown, BsAppIndicator, BsChat, BsPeople, BsArchive, BsGear, BsPersonCircle, BsBoxArrowRight } from "react-icons/bs";
import moment from "moment";
import { M as Modal$1 } from "./Modal-DiCRk7y7.js";
import { I as InputLabel } from "./InputLabel-BGYyLxCX.js";
import { I as InputError, T as TextInput } from "./InputError-DMEJWwuX.js";
const fetchChats = (query) => {
  return window.axios.get(`${route("chats.users")}?query=${query || ""}`);
};
const fetchArchivedChats = () => {
  return window.axios.get(`${route("chats.users")}?archived_chats=true`);
};
const fetchNotification = () => {
  return window.axios.get(route("chats.notification"));
};
const fetchChatsInPaginate = (url) => {
  return window.axios.get(url);
};
const markAsRead = (chat) => {
  return window.axios.post(route("chats.mark_as_read", chat.id));
};
const markAsUnread = (chat) => {
  return window.axios.post(route("chats.mark_as_unread", chat.id));
};
const archiveChat = (chat) => {
  return window.axios.post(route("chats.archive", chat.id));
};
const unarchiveChat = (chat) => {
  return window.axios.post(route("chats.unarchive", chat.id));
};
const deleteChat = (chat) => {
  return window.axios.delete(route("chats.destroy_all", chat.id));
};
const customizeChat = (user, message_color) => {
  return window.axios.post(route("chats.customize_chat", user.id), {
    message_color
  });
};
const InitialPaginate = {
  data: [],
  current_page: 1,
  per_page: 0,
  last_page: 1,
  from: 0,
  to: 0,
  total: 0,
  first_page_url: "",
  last_page_url: "string",
  next_page_url: "string",
  prev_page_url: "string"
};
const initialState$4 = {
  chats: [],
  paginate: InitialPaginate,
  setChats: () => {
  },
  setPaginate: () => {
  },
  refetchChats: () => {
  }
};
const reducer$4 = (state, action) => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        chats: action.payload
      };
    case "SET_PAGINATE":
      return {
        ...state,
        paginate: action.payload
      };
  }
};
const ChatContext = createContext(initialState$4);
const useChatContext = () => useContext(ChatContext);
const ChatProvider = ({ children }) => {
  const props = usePage().props;
  const [state, dispatch] = useReducer(reducer$4, initialState$4);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const setChats = (value2) => dispatch({ type: "SET_CHATS", payload: value2 });
  const setPaginate = (value2) => dispatch({ type: "SET_PAGINATE", payload: value2 });
  const refetchChats = async () => {
    const lastSync = localStorage.getItem("last-sync-chats");
    const currentTime = moment();
    if (lastSync && currentTime.diff(moment(parseInt(lastSync))) < 3e3)
      return;
    localStorage.setItem("last-sync-chats", currentTime.valueOf().toString());
    if (route().current("chats.*")) {
      return fetchChats().then((response) => setChats(response.data.data.data));
    }
    if (route().current("archived_chats.*")) {
      return fetchArchivedChats().then(
        (response) => setChats(response.data.data.data)
      );
    }
  };
  useEffect(() => {
    setIsFirstLoading(false);
    setChats(props.chats.data);
    setPaginate(props.chats);
    window.Echo.channel(`user-activity`).listen(
      ".user-activity",
      (data) => {
        if (Array.isArray(data.user)) {
          refetchChats();
        } else {
          const chats = state.chats.length > 0 ? state.chats : props.chats.data;
          const existingChat = chats.find(
            (chat) => chat.id === data.user.id
          );
          existingChat && refetchChats();
        }
      }
    );
    window.Echo.channel(`send-message-${props.auth.id}`).listen(
      ".send-message",
      refetchChats
    );
  }, []);
  const value = {
    ...state,
    chats: isFirstLoading ? props.chats.data : state.chats,
    paginate: isFirstLoading ? props.chats : state.paginate,
    setChats,
    setPaginate,
    refetchChats
  };
  return /* @__PURE__ */ jsx(ChatContext.Provider, { value, children });
};
const Modal = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("div", { className: clsx("flex flex-col gap-4 p-4 text-foreground", className), children });
};
const Header = ({ title, onClose }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: title }),
    /* @__PURE__ */ jsx("button", { className: "btn btn-secondary btn-close ml-auto", onClick: onClose, children: /* @__PURE__ */ jsx(BsX, {}) })
  ] });
};
const Body = ({
  className,
  as: Component = "div",
  children
}) => {
  return Component === Fragment ? /* @__PURE__ */ jsx(Fragment, { children }) : /* @__PURE__ */ jsx(Component, { className, children });
};
const Footer = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("div", { className, children });
};
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
const TextArea = forwardRef(function TextInput2({
  type = "text",
  className = "",
  isFocused = false,
  ...props
}, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ...props,
      className: "form-control " + className,
      ref: localRef
    }
  );
});
const useDebounce = (value, delay) => {
  const [debouncedValue, setdebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return [debouncedValue];
};
function ComboBox({
  url,
  onChange: updateData,
  initialSelected,
  refId,
  disabled
}) {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [selectedPerson, setSelectedPerson] = useState(initialSelected);
  useEffect(() => {
    if (query.length === 0) {
      return setPeople([]);
    }
    window.axios.get(`${url}?query=${query}`).then((response) => {
      setPeople(
        response.data.data.filter(
          (person) => selectedPerson.find((selected) => selected.id === person.id) === void 0
        )
      );
    });
  }, [debouncedQuery]);
  const filteredPeople = query === "" ? people : people.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });
  const handleOnChange = (value) => {
    updateData(value.map((val) => val.id));
    setSelectedPerson(value);
  };
  const removeSelectedPerson = (person) => {
    const filteredPerson = selectedPerson.filter(
      (selected) => selected.id !== person.id
    );
    setSelectedPerson(filteredPerson);
    updateData(filteredPerson.map((val) => val.id));
  };
  return /* @__PURE__ */ jsxs(Combobox, { value: selectedPerson, onChange: handleOnChange, multiple: true, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "form-control combobox relative h-full w-full cursor-default overflow-hidden",
        "aria-disabled": disabled,
        tabIndex: -1,
        children: [
          selectedPerson.length > 0 && /* @__PURE__ */ jsx("ul", { className: "m-2 flex flex-wrap gap-1 text-xs", children: selectedPerson.map((person) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-center justify-between gap-2 rounded-full bg-primary px-2 py-1 text-white",
              children: [
                /* @__PURE__ */ jsx("span", { children: person.name }),
                !disabled && /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "flex h-3 w-3 items-center rounded-full bg-white text-sm text-black",
                    type: "button",
                    onClick: () => removeSelectedPerson(person),
                    tabIndex: -1,
                    children: /* @__PURE__ */ jsx(BsX, {})
                  }
                )
              ]
            },
            person.id
          )) }),
          /* @__PURE__ */ jsx(
            Combobox.Input,
            {
              onChange: (event) => setQuery(event.target.value),
              displayValue: (person) => person.name,
              className: clsx(
                "w-full border-none py-2 pl-3 pr-10 leading-5 text-foreground outline-none focus:ring-0",
                disabled ? "bg-transparent" : "bg-background"
              ),
              id: refId,
              tabIndex: 0,
              "aria-disabled": disabled
            }
          ),
          /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(BsChevronExpand, { className: "h-5 w-5 text-gray-400" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment,
        leave: "transition ease-in duration-100",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        afterLeave: () => setQuery(""),
        children: /* @__PURE__ */ jsx(
          Combobox.Options,
          {
            className: clsx(
              "absolute mt-1 max-h-60 w-full overflow-auto rounded-md border-gray-200 bg-background text-base shadow-lg focus:outline-none dark:border-gray-500/25 sm:text-sm",
              (query.length > 0 || filteredPeople.length > 0) && "border"
            ),
            children: filteredPeople.length === 0 && query.length > 0 ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none px-4 py-2 text-foreground", children: "Nothing found." }) : filteredPeople.map((person) => /* @__PURE__ */ jsx(
              Combobox.Option,
              {
                value: person,
                className: ({ active }) => clsx(
                  "relative cursor-default select-none px-4 py-2",
                  active ? "bg-secondary" : "text-foreground"
                ),
                children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: clsx(
                        "block truncate",
                        selected ? "font-medium" : "font-normal"
                      ),
                      children: person.name
                    }
                  ),
                  selected && /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 right-2 flex items-center pl-3 text-foreground", children: /* @__PURE__ */ jsx(BsCheck, { className: "h-5 w-5" }) })
                ] })
              },
              person.id
            ))
          }
        )
      }
    )
  ] });
}
function AddNewGroup() {
  const { closeModal } = useModalContext();
  const avatarRef = useRef(null);
  const { data, setData, post, errors, processing } = useForm({
    _method: "POST",
    name: "",
    description: "",
    avatar: null,
    group_members: []
  });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (processing)
      return;
    post(route("group.store"), {
      onSuccess: (response) => {
        const props = response.props;
        router.get(route("chats.show", props.user.id));
        closeModal();
      }
    });
  };
  const changeAvatar = (e) => {
    var _a;
    const files = e.target.files;
    if (files && files.length > 0) {
      setData("avatar", files[0]);
      const imageUrl = window.URL.createObjectURL(files[0]);
      (_a = avatarRef.current) == null ? void 0 : _a.setAttribute("src", imageUrl);
      return () => {
        window.URL.revokeObjectURL(imageUrl);
      };
    }
  };
  const addMembers = (value) => {
    setData("group_members", value);
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleOnSubmit, className: "space-y-4", children: /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "New Group", onClose: closeModal }),
    /* @__PURE__ */ jsxs(Modal.Body, { as: Fragment, children: [
      /* @__PURE__ */ jsxs("div", { className: "picture relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/group-avatar.png",
            alt: "group-avatar.png",
            className: "mx-auto h-20 w-20 rounded-full border border-secondary",
            ref: avatarRef
          }
        ),
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "avatar",
            className: "btn btn-primary absolute left-1/2 top-6 flex translate-x-5 cursor-pointer items-center justify-center rounded-full px-2",
            tabIndex: 0,
            children: [
              /* @__PURE__ */ jsx(BsCamera, {}),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  onChange: changeAvatar,
                  id: "avatar",
                  className: "hidden"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2 text-center", message: errors.avatar })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Subject" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            type: "text",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
        /* @__PURE__ */ jsx(
          TextArea,
          {
            id: "description",
            className: "mt-1 block w-full",
            value: data.description,
            onChange: (e) => setData("description", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "group_members", value: "Add members" }),
        /* @__PURE__ */ jsx(
          ComboBox,
          {
            url: route("users.index"),
            onChange: addMembers,
            initialSelected: [],
            refId: "group_members"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.group_members })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary flex-1", disabled: processing, children: "Save" })
    ] })
  ] }) });
}
const fetchContacts = (query) => {
  return window.axios.get(`${route("contacts.data")}?query=${query || ""}`);
};
const fetchContactsInPaginate = (url) => {
  return window.axios.get(url);
};
const saveContact = (userId) => {
  return window.axios.post(route("contacts.save", userId));
};
const blockContact = (userId) => {
  return window.axios.post(route("contacts.block", userId));
};
const unblockContact = (userId) => {
  return window.axios.post(route("contacts.unblock", userId));
};
const deleteContact = (userId) => {
  return window.axios.delete(route("contacts.destroy", userId));
};
const saveMessage = ({
  user,
  message,
  attachments
}) => {
  return window.axios.post(
    route("chats.store"),
    {
      to_id: user.id,
      body: message,
      attachments
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
const deleteMessage = (message) => {
  return window.axios.delete(route("chats.destroy", message.id));
};
const deleteFileInChat = (message, attachment) => {
  return window.axios.delete(
    route("chats.delete_file", [message.id, attachment.file_name])
  );
};
const fetchMessages = (user) => {
  return window.axios.get(route("chats.messages", user.id));
};
const fetchMessagesInPaginate = (url) => {
  return window.axios.get(url);
};
const fetchMedia = (user) => {
  return window.axios.get(route("chats.media", user.id));
};
const fetchFiles = (user) => {
  return window.axios.get(route("chats.files", user.id));
};
const fetchLinks = (user) => {
  return window.axios.get(route("chats.links", user.id));
};
var CHAT_TYPE = /* @__PURE__ */ ((CHAT_TYPE2) => {
  CHAT_TYPE2["CHATS"] = "chats";
  CHAT_TYPE2["GROUP_CHATS"] = "group_chats";
  return CHAT_TYPE2;
})(CHAT_TYPE || {});
const relativeTime = (time) => {
  time = moment(time).startOf("second").fromNow();
  return time.replace(
    /(\d+)\s*(minute?|hour?|day?|week?|month?|year?)s?/,
    (match, p1, p2) => {
      switch (p2) {
        case "minute":
          return p1 + "m";
        case "hour":
          return p1 + "h";
        case "day":
          return p1 + "d";
        case "week":
          return p1 + "w";
        case "month":
          return p1 + "M";
        case "year":
          return p1 + "y";
        default:
          return match;
      }
    }
  ).replace(" ago", "");
};
const isImageLinkValid = (name) => {
  var _a;
  if (!name)
    return false;
  const validExtensions = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"];
  const extension = ((_a = name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) ?? "";
  return validExtensions.includes(extension);
};
const formatFileSize = (size) => {
  if (size < 1024) {
    return size.toFixed(2) + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};
const existingMedia = (attachments) => {
  return attachments.some((media) => isImageLinkValid(media.original_name));
};
const existingFiles = (attachments) => {
  return attachments.some((media) => !isImageLinkValid(media.original_name));
};
const existingLinks = (links) => {
  return links && links.length > 0;
};
const replaceBadgeNotificationCount = (notification) => {
  const title = document.title;
  const pattern = /\(\d+\)/;
  if (pattern.test(title)) {
    let newTitle = title.replace(pattern, `(${notification})`);
    if (notification === 0) {
      newTitle = newTitle.replace("(0) ", "");
    }
    document.title = newTitle;
  } else if (notification > 0) {
    const newTitle = `(${notification}) ${title}`;
    document.title = newTitle;
  }
};
const initialState$3 = {
  user: {
    id: "",
    name: "",
    email: "",
    email_verified_at: "",
    avatar: "",
    active_status: false,
    is_online: false,
    last_seen: "",
    chat_type: CHAT_TYPE.CHATS,
    message_color: "",
    is_contact_saved: false,
    is_contact_blocked: false,
    description: "",
    creator_id: "",
    creator: {
      id: "",
      name: ""
    },
    members_count: 0
  },
  messages: [],
  paginate: InitialPaginate,
  media: [],
  selectedMedia: void 0,
  files: [],
  links: [],
  showSidebarRight: false,
  isTyping: false,
  setUser: () => {
  },
  setMessages: () => {
  },
  setPaginate: () => {
  },
  setMedia: () => {
  },
  setSelectedMedia: () => {
  },
  clearSelectedMedia: () => {
  },
  setFiles: () => {
  },
  setLinks: () => {
  },
  reloadMedia: () => {
  },
  reloadFiles: () => {
  },
  reloadLinks: () => {
  },
  toggleSidebarRight: () => {
  },
  setIsTyping: () => {
  }
};
const reducer$3 = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "TOGGLE_SIDEBAR_RIGHT":
      const value = localStorage.getItem("toggle-sidebar-right") === "true";
      localStorage.setItem("toggle-sidebar-right", String(!value));
      return {
        ...state,
        showSidebarRight: !value
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload
      };
    case "SET_PAGINATE":
      return {
        ...state,
        paginate: action.payload
      };
    case "SET_MEDIA":
      return {
        ...state,
        media: action.payload
      };
    case "SET_SELECTED_MEDIA":
      return {
        ...state,
        selectedMedia: action.payload
      };
    case "SET_FILES":
      return {
        ...state,
        files: action.payload
      };
    case "SET_LINKS":
      return {
        ...state,
        links: action.payload
      };
    case "SET_IS_TYPING":
      return {
        ...state,
        isTyping: action.payload
      };
  }
};
const ChatMessageContext = createContext(initialState$3);
const useChatMessageContext = () => useContext(ChatMessageContext);
const ChatMessageProvider = ({ children }) => {
  const props = usePage().props;
  const [state, dispatch] = useReducer(reducer$3, initialState$3);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const setUser = (value2) => dispatch({ type: "SET_USER", payload: value2 });
  const setMessages = (value2) => dispatch({ type: "SET_MESSAGES", payload: value2 });
  const setPaginate = (value2) => dispatch({ type: "SET_PAGINATE", payload: value2 });
  const setMedia = (value2) => dispatch({ type: "SET_MEDIA", payload: value2 });
  const setSelectedMedia = (value2) => dispatch({ type: "SET_SELECTED_MEDIA", payload: value2 });
  const clearSelectedMedia = () => dispatch({ type: "SET_SELECTED_MEDIA", payload: void 0 });
  const setFiles = (value2) => dispatch({ type: "SET_FILES", payload: value2 });
  const setLinks = (value2) => dispatch({ type: "SET_LINKS", payload: value2 });
  const reloadMedia = (user) => {
    fetchMedia(user).then((response) => setMedia(response.data.data));
  };
  const reloadFiles = (user) => {
    fetchFiles(user).then((response) => setFiles(response.data.data));
  };
  const reloadLinks = (user) => {
    fetchLinks(user).then((response) => setLinks(response.data.data));
  };
  const toggleSidebarRight = () => dispatch({ type: "TOGGLE_SIDEBAR_RIGHT" });
  const setIsTyping = (value2) => dispatch({ type: "SET_IS_TYPING", payload: value2 });
  const refetchMessages = () => {
    fetchMessages(props.user).then((response) => {
      setPaginate(response.data.data);
      setMessages(response.data.data.data);
    });
  };
  const syncAll = (data) => {
    refetchMessages();
    existingMedia(data.chat.attachments) && reloadMedia(props.user);
    existingFiles(data.chat.attachments) && reloadFiles(props.user);
    existingLinks(data.chat.links) && reloadLinks(props.user);
  };
  useEffect(() => {
    setIsFirstLoading(false);
    setUser(props.user);
    setMessages(props.messages.data);
    setPaginate(props.messages);
    setMedia(props.media);
    setFiles(props.files);
    setLinks(props.links);
    window.Echo.channel(`user-activity`).listen(
      ".user-activity",
      (data) => {
        const user = state.user.id ? state.user : props.user;
        user.id === data.user.id && setUser({ ...user, is_online: data.user.is_online });
      }
    );
    window.Echo.channel(
      `send-message-${props.user.id}-to-${props.auth.id}`
    ).listen(".send-message", syncAll);
    window.Echo.channel(`send-group-message-${props.user.id}`).listen(
      ".send-group-message",
      syncAll
    );
  }, []);
  const value = {
    ...state,
    user: isFirstLoading ? props.user : state.user,
    messages: isFirstLoading ? props.messages.data : state.messages,
    paginate: isFirstLoading ? props.messages : state.paginate,
    media: isFirstLoading ? props.media : state.media,
    files: isFirstLoading ? props.files : state.files,
    links: isFirstLoading ? props.links : state.links,
    showSidebarRight: localStorage.getItem("toggle-sidebar-right") === "true",
    setUser,
    setMessages,
    setPaginate,
    setMedia,
    setSelectedMedia,
    clearSelectedMedia,
    setFiles,
    setLinks,
    reloadMedia,
    reloadFiles,
    reloadLinks,
    toggleSidebarRight,
    setIsTyping
  };
  return /* @__PURE__ */ jsx(ChatMessageContext.Provider, { value, children });
};
const initialState$2 = {
  contacts: [],
  paginate: InitialPaginate,
  setContacts: () => {
  },
  setPaginate: () => {
  }
};
const reducer$2 = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload
      };
    case "SET_PAGINATE":
      return {
        ...state,
        paginate: action.payload
      };
  }
};
const ContactContext = createContext(initialState$2);
const useContactContext = () => useContext(ContactContext);
const ContactProvider = ({ children }) => {
  const props = usePage().props;
  const [state, dispatch] = useReducer(reducer$2, initialState$2);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const setContacts = (value2) => dispatch({ type: "SET_CONTACTS", payload: value2 });
  const setPaginate = (value2) => dispatch({ type: "SET_PAGINATE", payload: value2 });
  useEffect(() => {
    setIsFirstLoading(false);
    setContacts(props.contacts.data);
    setPaginate(props.contacts);
    window.Echo.channel(`user-activity`).listen(
      ".user-activity",
      (data) => {
        const contacts = state.contacts.length > 0 ? state.contacts : props.contacts.data;
        if (Array.isArray(data.user)) {
          const users = data.user;
          setContacts(
            contacts.map((contact) => {
              const user = users.find((user2) => user2.id === contact.id);
              if (user)
                contact.is_online = user.is_online;
              return contact;
            })
          );
        } else {
          const user = data.user;
          setContacts(
            contacts.map((contact) => {
              if (contact.id === user.id) {
                contact.is_online = user.is_online;
              }
              return contact;
            })
          );
        }
      }
    );
  }, []);
  const value = {
    ...state,
    contacts: isFirstLoading ? props.contacts.data : state.contacts,
    paginate: isFirstLoading ? props.contacts : state.paginate,
    setContacts,
    setPaginate
  };
  return /* @__PURE__ */ jsx(ContactContext.Provider, { value, children });
};
function BlockContactConfirmation() {
  const { closeModal, data: chat } = useModalContext();
  const { chats, setChats } = useChatContext();
  const { contacts, setContacts } = useContactContext();
  const { user, setUser } = useChatMessageContext();
  if (!chat)
    return;
  const handleblockContact = () => {
    blockContact(chat.id).then(() => {
      if (route().current("chats.*") || route().current("archived_chats.*")) {
        setChats(
          chats.map((c) => {
            if (c.id === chat.id) {
              c.is_contact_blocked = true;
            }
            return c;
          })
        );
        if ((user == null ? void 0 : user.id) === chat.id) {
          setUser({ ...user, is_contact_blocked: true });
        }
      } else {
        setContacts(
          contacts.map((c) => {
            if (c.id === chat.id) {
              c.is_contact_blocked = true;
            }
            return c;
          })
        );
      }
      closeModal();
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Block Contact?", onClose: closeModal }),
    /* @__PURE__ */ jsx(Modal.Body, { as: Fragment, children: /* @__PURE__ */ jsx("p", { children: "This contact will be removed from your contacts. You can save the contact once you open again the block." }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-danger flex-1", onClick: handleblockContact, children: "Block" })
    ] })
  ] });
}
function CustomizeChat() {
  const { closeModal, dispatchOnCanceled } = useModalContext();
  const { user, setUser } = useChatMessageContext();
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = [
    "#2863EB",
    "#2196F3",
    "#00BCD4",
    "#3F51B5",
    "#673AB7",
    "#9C27B0",
    "#F25C55",
    "#FFC107",
    "#FF9800",
    "#ff2522",
    "#4CAF50",
    "#ED9F9B"
  ];
  const changeMessageColor = (color) => {
    setSelectedColor(color);
    setUser({ ...user, message_color: color });
  };
  const saveMessageColor = () => {
    customizeChat(user, selectedColor).then(() => {
      closeModal();
    });
  };
  const handleOnClose = () => {
    if (dispatchOnCanceled && typeof dispatchOnCanceled === "function") {
      dispatchOnCanceled();
    }
    closeModal();
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Themes", onClose: handleOnClose }),
    /* @__PURE__ */ jsx(Modal.Body, { className: "grid grid-cols-4 gap-2", children: colors.map((color, index) => /* @__PURE__ */ jsx(
      "button",
      {
        className: clsx(
          "flex h-20 w-20 items-center justify-center rounded-2xl p-2 hover:bg-secondary focus:bg-secondary",
          color === selectedColor && "bg-secondary"
        ),
        onClick: () => changeMessageColor(color),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "inline-block h-16 w-16 shrink-0 rounded-full",
            style: { background: color }
          }
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: handleOnClose, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary flex-1", onClick: saveMessageColor, children: "Save" })
    ] })
  ] });
}
function DeleteChatConfirmation() {
  const { closeModal, data: chat } = useModalContext();
  const { chats, setChats } = useChatContext();
  if (!chat)
    return;
  const handleDeleteChat = () => {
    deleteChat(chat).then(() => {
      if (route().current("chats.index") || route().current("archived_chats.index")) {
        closeModal();
        setChats([...chats.filter((c) => c.id !== chat.id)]);
        return;
      }
      route().current("chats.*") ? router.replace(route("chats.index")) : router.replace(route("archived_chats.index"));
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Delete Chat?", onClose: closeModal }),
    /* @__PURE__ */ jsx(Modal.Body, { as: Fragment, children: /* @__PURE__ */ jsx("p", { children: "This chat will be removed for you, including the files. Others in the chat will still be able to see it." }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-danger flex-1", onClick: handleDeleteChat, children: "Delete for me" })
    ] })
  ] });
}
function DeleteContactConfirmation() {
  const { closeModal, data: contact } = useModalContext();
  const { contacts, setContacts } = useContactContext();
  if (!contact)
    return;
  const handleDeleteContact = () => {
    deleteContact(contact.id).then(() => {
      closeModal();
      setContacts([...contacts.filter((c) => c.id !== contact.id)]);
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Delete Contact?", onClose: closeModal }),
    /* @__PURE__ */ jsx(Modal.Body, { as: Fragment, children: /* @__PURE__ */ jsx("p", { children: "This contact will be removed for you. It will not appear in your contact list." }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-danger flex-1", onClick: handleDeleteContact, children: "Delete contact" })
    ] })
  ] });
}
function DeleteMessageConfirmation() {
  var _a;
  const { closeModal, data: message } = useModalContext();
  const { refetchChats } = useChatContext();
  const { messages, setMessages, user, reloadMedia, reloadFiles, reloadLinks } = useChatMessageContext();
  if (!message)
    return;
  const handleDeleteMessage = () => {
    deleteMessage(message).then(() => {
      refetchChats();
      setMessages([...messages.filter((m) => m.id !== message.id)]);
      existingMedia(message.attachments) && reloadMedia(user);
      existingFiles(message.attachments) && reloadFiles(user);
      existingLinks(message.links) && reloadLinks(user);
      closeModal();
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Delete Message?", onClose: closeModal }),
    /* @__PURE__ */ jsxs(Modal.Body, { as: Fragment, children: [
      /* @__PURE__ */ jsx("p", { children: "This message will be removed for you. Others in the chat will still be able to see it." }),
      ((_a = message.attachments) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("p", { children: [
        message.attachments.length,
        " files will be removed for you."
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-danger flex-1", onClick: handleDeleteMessage, children: "Delete for me" })
    ] })
  ] });
}
const fetchMembers = (user) => {
  return window.axios.get(route("group.members", user.id));
};
const exitGroup = (chat) => {
  return window.axios.delete(route("group.exit", chat.id));
};
function Alert({ message, className }) {
  const { setErrorMsg, setSuccessMsg } = useAppContext();
  const closeAlert = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-16 left-2 right-2 z-[60] sm:bottom-auto sm:top-2", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center gap-2 rounded-lg p-4 text-sm sm:ml-auto sm:max-w-lg",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("p", { children: message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "ml-auto text-xl opacity-70 transition-all hover:opacity-100",
            onClick: closeAlert,
            children: /* @__PURE__ */ jsx(BsX, {})
          }
        )
      ]
    }
  ) });
}
const initialState$1 = {
  theme: localStorage.getItem("theme") || "system",
  auth: {
    id: "",
    name: "",
    email: "",
    email_verified_at: "",
    avatar: "",
    active_status: false,
    is_online: false,
    last_seen: "",
    is_contact_blocked: false,
    is_contact_saved: false
  },
  notificationCount: 0,
  setTheme: () => {
  },
  setAuth: () => {
  },
  setErrorMsg: () => {
  },
  setSuccessMsg: () => {
  },
  syncNotification: () => {
  }
};
const reducer$1 = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      const theme = action.payload;
      const html = document.documentElement;
      if (html) {
        html.classList.remove("dark");
        html.classList.remove("light");
      }
      switch (theme) {
        case "system":
          window.matchMedia("(prefers-color-scheme: dark)").matches ? html.classList.add("dark") : html.classList.add("light");
          break;
        case "dark":
          html.classList.add("dark");
          break;
        case "light":
          html.classList.add("light");
      }
      localStorage.setItem("theme", theme);
      return {
        ...state,
        theme
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload
      };
    case "SET_ERROR_MSG":
      return {
        ...state,
        errorMsg: action.payload
      };
    case "SET_SUCCESS_MSG":
      return {
        ...state,
        successMsg: action.payload
      };
    case "SET_NOTIFICATION_COUNT":
      return {
        ...state,
        notificationCount: action.payload
      };
  }
};
const AppContext = createContext(initialState$1);
const useAppContext = () => useContext(AppContext);
const AppProvider = ({ children }) => {
  const props = usePage().props;
  const [state, dispatch] = useReducer(reducer$1, initialState$1);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const notificationRef = useRef(null);
  const setTheme = (value2) => dispatch({ type: "SET_THEME", payload: value2 });
  const setAuth = (value2) => dispatch({ type: "SET_AUTH", payload: value2 });
  const setErrorMsg = (value2) => dispatch({ type: "SET_ERROR_MSG", payload: value2 });
  const setSuccessMsg = (value2) => dispatch({ type: "SET_SUCCESS_MSG", payload: value2 });
  const setNotificationCount = (value2) => dispatch({ type: "SET_NOTIFICATION_COUNT", payload: value2 });
  const syncNotification = async () => {
    const lastSync = localStorage.getItem("last-sync-notification");
    const currentTime = moment();
    if (lastSync && currentTime.diff(moment(parseInt(lastSync))) < 3e3)
      return;
    localStorage.setItem(
      "last-sync-notification",
      currentTime.valueOf().toString()
    );
    return await fetchNotification().then((response) => {
      setNotificationCount(response.data.data.notification_count);
    });
  };
  useEffect(() => {
    setAuth(props.auth);
    setNotificationCount(props.notification_count);
    setIsFirstLoading(false);
    if (props.error_msg)
      setErrorMsg(props.error_msg);
    if (props.success_msg)
      setSuccessMsg(props.success_msg);
    window.Echo.channel(`send-message-${props.auth.id}`).listen(
      ".send-message",
      () => {
        syncNotification().then(() => {
          var _a;
          (_a = notificationRef.current) == null ? void 0 : _a.play();
        });
      }
    );
  }, []);
  useEffect(() => {
    if (state.errorMsg)
      setTimeout(() => setErrorMsg(null), 5e3);
    if (state.successMsg)
      setTimeout(() => setSuccessMsg(null), 5e3);
  }, [state.errorMsg, state.successMsg]);
  useEffect(() => {
    !isFirstLoading && replaceBadgeNotificationCount(state.notificationCount);
  }, [state.notificationCount]);
  const value = {
    ...state,
    theme: localStorage.getItem("theme") || "system",
    auth: isFirstLoading ? props.auth : state.auth,
    notificationCount: isFirstLoading ? props.notification_count : state.notificationCount,
    setTheme,
    setAuth,
    setErrorMsg,
    setSuccessMsg,
    syncNotification
  };
  return /* @__PURE__ */ jsxs(AppContext.Provider, { value, children: [
    children,
    state.errorMsg && /* @__PURE__ */ jsx(Alert, { message: state.errorMsg, className: "bg-danger text-white" }),
    state.successMsg && /* @__PURE__ */ jsx(Alert, { message: state.successMsg, className: "bg-success text-white" }),
    /* @__PURE__ */ jsxs("audio", { controls: true, className: "hidden", ref: notificationRef, children: [
      /* @__PURE__ */ jsx("source", { src: "/audios/notification.mp3", type: "audio/mpeg" }),
      "Your browser does not support the audio element."
    ] })
  ] });
};
function EditGroup() {
  const { auth } = useAppContext();
  const { closeModal, data: user } = useModalContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialSelected, setInitialSelected] = useState([]);
  const avatarRef = useRef(null);
  const { data, setData, post, errors, processing } = useForm({
    _method: "PATCH",
    name: user == null ? void 0 : user.name,
    description: user == null ? void 0 : user.description,
    avatar: null,
    group_members: []
  });
  useEffect(() => {
    fetchMembers(user).then((response) => {
      const initialMembers = response.data.data.map((member) => {
        return { id: member.id, name: member.name };
      });
      setInitialSelected(initialMembers);
      setIsLoaded(true);
      setData(
        "group_members",
        initialMembers.map((member) => member.id)
      );
    });
  }, []);
  const isCreator = auth.id === (user == null ? void 0 : user.creator_id);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (processing || !isCreator)
      return;
    post(route("group.update", user == null ? void 0 : user.id), {
      onSuccess: (response) => {
        const props = response.props;
        router.get(route("chats.show", props.user.id));
        closeModal();
      }
    });
  };
  const changeAvatar = (e) => {
    var _a;
    const files = e.target.files;
    if (files && files.length > 0) {
      setData("avatar", files[0]);
      const imageUrl = window.URL.createObjectURL(files[0]);
      (_a = avatarRef.current) == null ? void 0 : _a.setAttribute("src", imageUrl);
      return () => {
        window.URL.revokeObjectURL(imageUrl);
      };
    }
  };
  const addMembers = (value) => {
    setData("group_members", value);
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleOnSubmit, className: "space-y-4", children: /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Group Detail", onClose: closeModal }),
    /* @__PURE__ */ jsx(Modal.Body, { as: Fragment, children: isLoaded ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs("div", { className: "picture relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: user == null ? void 0 : user.avatar,
            alt: user == null ? void 0 : user.name,
            className: "mx-auto h-20 w-20 rounded-full border border-secondary",
            ref: avatarRef
          }
        ),
        isCreator && /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "avatar",
            className: "btn btn-primary absolute left-1/2 top-6 flex translate-x-5 cursor-pointer items-center justify-center rounded-full px-2",
            tabIndex: 0,
            children: [
              /* @__PURE__ */ jsx(BsCamera, {}),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  onChange: changeAvatar,
                  id: "avatar",
                  className: "hidden"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            className: "mt-2 text-center",
            message: errors.avatar
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Subject" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            type: "text",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            disabled: !isCreator
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
        /* @__PURE__ */ jsx(
          TextArea,
          {
            id: "description",
            className: "mt-1 block w-full",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            disabled: !isCreator
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative space-y-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "group_members", value: "Add members" }),
        /* @__PURE__ */ jsx(
          ComboBox,
          {
            url: route("users.index"),
            onChange: addMembers,
            initialSelected,
            refId: "group_members",
            disabled: !isCreator
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.group_members })
      ] })
    ] }) : /* @__PURE__ */ jsx("p", { className: "p-4", children: "Loading..." }) }),
    isCreator && /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary flex-1", disabled: processing, children: "Save" })
    ] })
  ] }) });
}
function ExitGroupConfirmation() {
  const { closeModal, data: chat } = useModalContext();
  const { chats, setChats } = useChatContext();
  const handleExitContact = () => {
    exitGroup(chat).then(() => {
      setChats(chats.filter((c) => c.id !== (chat == null ? void 0 : chat.id)));
      closeModal();
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(
      Modal.Header,
      {
        title: `Exit "${chat == null ? void 0 : chat.name}" group?`,
        onClose: closeModal
      }
    ),
    /* @__PURE__ */ jsx(Modal.Body, { as: Fragment, children: /* @__PURE__ */ jsx("p", { children: "This group will be removed for you. You can not see anything in this group." }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-secondary flex-1", onClick: closeModal, children: "Cancel" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-danger flex-1", onClick: handleExitContact, children: "Exit group" })
    ] })
  ] });
}
const DropDownContext = createContext({
  open: false,
  setOpen: () => {
  },
  toggleOpen: () => {
  }
});
const useDropdownContext = () => useContext(DropDownContext);
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-background",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "origin-top-left end-0 sm:start-0 mt-2";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right end-0 mt-2";
  } else if (align === "top-left") {
    alignmentClasses = "origin-bottom-left bottom-0 end-0 sm:start-0 mb-2";
  } else if (align === "top-right") {
    alignmentClasses = "origin-bottom-right bottom-0 end-0 mb-2";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      as: Fragment,
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-lg bg-background !p-2 shadow-md ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-5 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-foreground transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none " + className,
      children
    }
  );
};
const DropdownButton = ({
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: "block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-foreground transition duration-150 ease-in-out hover:bg-secondary focus:bg-secondary focus:outline-none " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;
const Dropdown$1 = Dropdown;
const updateUser = (user, data) => {
  return window.axios.patch(route("users.update", user.id), {
    email: user.email,
    name: user.name,
    ...data
  });
};
function Preferences() {
  const { theme, auth, setTheme, setAuth } = useAppContext();
  const { closeModal } = useModalContext();
  const toggleActiveStatus = (status) => {
    updateUser(auth, { active_status: status }).then(() => {
      setAuth({ ...auth, active_status: status });
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { title: "Preferences", onClose: closeModal }),
    /* @__PURE__ */ jsxs(Modal.Body, { className: "flex", as: Fragment, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(BsCircleHalf, {}),
          "Theme"
        ] }),
        /* @__PURE__ */ jsxs(Dropdown$1, { children: [
          /* @__PURE__ */ jsx(Dropdown$1.Trigger, { children: /* @__PURE__ */ jsxs("button", { className: "btn btn-secondary flex items-center gap-2", children: [
            theme.charAt(0).toUpperCase() + theme.slice(1),
            /* @__PURE__ */ jsx(BsChevronDown, {})
          ] }) }),
          /* @__PURE__ */ jsxs(Dropdown$1.Content, { children: [
            /* @__PURE__ */ jsx(Dropdown$1.Button, { onClick: () => setTheme("system"), children: "System" }),
            /* @__PURE__ */ jsx(Dropdown$1.Button, { onClick: () => setTheme("dark"), children: "Dark" }),
            /* @__PURE__ */ jsx(Dropdown$1.Button, { onClick: () => setTheme("light"), children: "Light" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(BsAppIndicator, {}),
          "Active Status"
        ] }),
        /* @__PURE__ */ jsxs(
          Switch,
          {
            checked: auth.active_status,
            onChange: toggleActiveStatus,
            className: clsx(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              auth.active_status ? "bg-primary" : "bg-secondary"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Enable active status" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `${auth.active_status ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
const initialState = {
  isOpen: false,
  openModal: () => {
  },
  closeModal: () => {
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        view: action.view,
        size: action.size,
        data: action.payload,
        isOpen: true,
        dispatchOnCanceled: action.payload && action.payload.dispatchOnCanceled && action.payload.dispatchOnCanceled
      };
    case "CLOSE":
      return {
        ...state,
        view: void 0,
        size: void 0,
        data: void 0,
        isOpen: false,
        dispatchOnCanceled: void 0
      };
  }
};
const ModalContext = createContext(initialState);
function useModalContext() {
  return useContext(ModalContext);
}
const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  const openModal = ({ view, size, payload }) => dispatch({ type: "OPEN", view, size, payload });
  const closeModal = () => dispatch({ type: "CLOSE" });
  const value = {
    ...state,
    openModal,
    closeModal
  };
  return /* @__PURE__ */ jsxs(ModalContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(ModalChildren, {})
  ] });
};
const ModalChildren = () => {
  const { isOpen, view, size, closeModal, dispatchOnCanceled } = useModalContext();
  const handleOnClose = () => {
    if (dispatchOnCanceled && typeof dispatchOnCanceled === "function") {
      dispatchOnCanceled();
    }
    closeModal();
  };
  return /* @__PURE__ */ jsxs(Modal$1, { show: isOpen, onClose: handleOnClose, maxWidth: size, children: [
    view === "PREFERENCES" && /* @__PURE__ */ jsx(Preferences, {}),
    view === "DELETE_MESSAGE_CONFIRMATION" && /* @__PURE__ */ jsx(DeleteMessageConfirmation, {}),
    view === "DELETE_CHAT_CONFIRMATION" && /* @__PURE__ */ jsx(DeleteChatConfirmation, {}),
    view === "BLOCK_CONTACT_CONFIRMATION" && /* @__PURE__ */ jsx(BlockContactConfirmation, {}),
    view === "CUSTOMIZE_CHAT" && /* @__PURE__ */ jsx(CustomizeChat, {}),
    view === "ADD_NEW_GROUP" && /* @__PURE__ */ jsx(AddNewGroup, {}),
    view === "EDIT_GROUP" && /* @__PURE__ */ jsx(EditGroup, {}),
    view === "EXIT_GROUP_CONFIRMATION" && /* @__PURE__ */ jsx(ExitGroupConfirmation, {}),
    view === "DELETE_CONTACT_CONFIRMATION" && /* @__PURE__ */ jsx(DeleteContactConfirmation, {})
  ] });
};
function AppLayout({
  title,
  children
}) {
  const { notification_count } = usePage().props;
  return /* @__PURE__ */ jsxs(AppProvider, { children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: clsx(notification_count > 0 && `(${notification_count})`, title)
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex h-screen flex-col overflow-hidden bg-background text-foreground sm:flex-row", children })
  ] });
}
function BadgeNotification() {
  return /* @__PURE__ */ jsx("span", { className: "absolute -mr-5 -mt-5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white sm:right-2.5 sm:top-2.5 sm:mr-0 sm:mt-0" });
}
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return screenSize;
};
function SidebarMini() {
  const { auth, notificationCount } = useAppContext();
  const { openModal } = useModalContext();
  const { width } = useScreenSize();
  const openPreferences = () => {
    openModal({ view: "PREFERENCES", size: "lg" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "order-2 mt-auto flex-row justify-between bg-background sm:order-1 sm:mt-0 sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-2",
        route().current("chats.show") ? "hidden" : "flex"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("chats.index"),
            className: clsx(
              "relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
              route().current("chats.*") && "bg-secondary"
            ),
            children: [
              /* @__PURE__ */ jsx(BsChat, { className: "h-6 w-6" }),
              notificationCount > 0 && /* @__PURE__ */ jsx(BadgeNotification, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("contacts.index"),
            className: clsx(
              "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
              route().current("contacts.*") && "bg-secondary"
            ),
            children: /* @__PURE__ */ jsx(BsPeople, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("archived_chats.index"),
            className: clsx(
              "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
              route().current("archived_chats.*") && "bg-secondary"
            ),
            children: /* @__PURE__ */ jsx(BsArchive, { className: "h-6 w-6" })
          }
        ),
        width <= 640 ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("preferences.index"),
            className: clsx(
              "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
              route().current("preferences.index") && "bg-secondary"
            ),
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: auth.avatar,
                alt: "",
                className: "h-8 w-8 rounded-full border border-secondary sm:h-10 sm:w-10"
              }
            )
          }
        ) : /* @__PURE__ */ jsx("div", { className: "relative flex flex-1 cursor-pointer items-center justify-center rounded-lg px-3 transition-all hover:bg-secondary sm:mt-auto sm:flex-initial sm:px-0 sm:hover:bg-transparent", children: /* @__PURE__ */ jsxs(Dropdown$1, { children: [
          /* @__PURE__ */ jsx(Dropdown$1.Trigger, { children: /* @__PURE__ */ jsx(
            "img",
            {
              src: auth.avatar,
              alt: "",
              className: "h-8 w-8 rounded-full border border-secondary sm:h-10 sm:w-10"
            }
          ) }),
          /* @__PURE__ */ jsxs(Dropdown$1.Content, { align: "top-left", contentClasses: "mb-12 sm:mb-10", children: [
            /* @__PURE__ */ jsx(Dropdown$1.Button, { onClick: openPreferences, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BsGear, {}),
              "Preferences"
            ] }) }),
            /* @__PURE__ */ jsx(Dropdown$1.Link, { href: route("profile.edit"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BsPersonCircle, {}),
              "Profile"
            ] }) }),
            /* @__PURE__ */ jsx(Dropdown$1.Link, { href: route("logout"), method: "post", as: "button", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BsBoxArrowRight, {}),
              "Log out"
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AppLayout as A,
  fetchContacts as B,
  ChatProvider as C,
  Dropdown$1 as D,
  fetchContactsInPaginate as E,
  ContactProvider as F,
  useScreenSize as G,
  updateUser as H,
  ModalProvider as M,
  SidebarMini as S,
  ChatMessageProvider as a,
  useChatMessageContext as b,
  CHAT_TYPE as c,
  useModalContext as d,
  deleteFileInChat as e,
  existingMedia as f,
  existingFiles as g,
  formatFileSize as h,
  useAppContext as i,
  isImageLinkValid as j,
  fetchMessagesInPaginate as k,
  saveMessage as l,
  existingLinks as m,
  unblockContact as n,
  useDebounce as o,
  fetchChats as p,
  useDropdownContext as q,
  markAsRead as r,
  saveContact as s,
  markAsUnread as t,
  useChatContext as u,
  archiveChat as v,
  unarchiveChat as w,
  fetchChatsInPaginate as x,
  relativeTime as y,
  useContactContext as z
};
