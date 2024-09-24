import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { B as BadgeOnline } from "./BadgeOnline-Crz2lS8N.js";
import { b as useChatMessageContext, c as CHAT_TYPE, d as useModalContext, e as deleteFileInChat, f as existingMedia, g as existingFiles, h as formatFileSize, i as useAppContext, j as isImageLinkValid, u as useChatContext, s as saveContact, k as fetchMessagesInPaginate, l as saveMessage, m as existingLinks, n as unblockContact } from "./SidebarMini-Di7pOyuz.js";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { BsXLg, BsThreeDots, BsTrash, BsX, BsFileEarmarkText, BsBan, BsCheckCircle, BsArrowClockwise, BsPlusLg, BsEmojiSmile, BsChevronDown, BsChevronRight, BsRecordCircle, BsLink45Deg } from "react-icons/bs";
import { FaArrowLeft, FaInfoCircle, FaCircleNotch } from "react-icons/fa";
import { Fragment, useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import EmojiPicker from "emoji-picker-react";
import { BiSend } from "react-icons/bi";
import { Transition, Tab, Dialog } from "@headlessui/react";
import ImageGallery from "react-image-gallery";
function ChatHeader({
  onDrop,
  closeOnPreview
}) {
  const { user, toggleSidebarRight, showSidebarRight } = useChatMessageContext();
  return /* @__PURE__ */ jsxs("div", { className: "flex h-14 items-center justify-between border-b border-secondary p-2 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("chats.index"),
          className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary sm:hidden",
          children: /* @__PURE__ */ jsx(FaArrowLeft, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: user.avatar,
            alt: user.name,
            className: "h-10 w-10 rounded-full border border-secondary"
          }
        ),
        user.is_online && /* @__PURE__ */ jsx(BadgeOnline, { className: "!right-0" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "leading-4", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium", children: user.name }),
        user.chat_type === CHAT_TYPE.CHATS && /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary-foreground", children: user.is_online ? "Online" : moment(user.last_seen).isAfter("2000-01-01") ? moment(user.last_seen).format("DD/MM/YY H:mm") : "Last seen a long time ago" })
      ] })
    ] }),
    onDrop ? /* @__PURE__ */ jsx(
      "button",
      {
        className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary",
        onClick: closeOnPreview,
        children: /* @__PURE__ */ jsx(BsXLg, {})
      }
    ) : /* @__PURE__ */ jsx(
      "button",
      {
        className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary",
        onClick: toggleSidebarRight,
        children: showSidebarRight ? /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "rounded-full p-0.5 text-sm text-white",
              !user.message_color && "bg-primary"
            ),
            style: { background: user.message_color },
            children: /* @__PURE__ */ jsx(BsThreeDots, {})
          }
        ) : /* @__PURE__ */ jsx(BsThreeDots, {})
      }
    )
  ] });
}
function DeleteMessage({
  message,
  className
}) {
  const { openModal } = useModalContext();
  const deleteConfirmation = () => {
    openModal({
      view: "DELETE_MESSAGE_CONFIRMATION",
      size: "lg",
      payload: message
    });
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "invisible flex flex-shrink-0 gap-2 group-hover:visible group-focus:visible",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-secondary rounded-full p-2",
          onClick: deleteConfirmation,
          children: /* @__PURE__ */ jsx(BsTrash, {})
        }
      )
    }
  );
}
function DeleteSelectedFileInChat({
  message,
  attachment
}) {
  const { messages, setMessages, reloadMedia, reloadFiles, user } = useChatMessageContext();
  const deleteSelectedFile = () => {
    deleteFileInChat(message, attachment).then(() => {
      const updatedAttachments = message.attachments.filter(
        (a) => a.file_name !== attachment.file_name
      );
      setMessages(
        messages.map((m) => {
          if (m.id === message.id) {
            m.attachments = updatedAttachments;
          }
          return m;
        })
      );
      existingMedia(message.attachments) && reloadMedia(user);
      existingFiles(message.attachments) && reloadFiles(user);
    });
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "absolute right-1 top-1 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover/attachment:flex",
      onClick: deleteSelectedFile,
      children: /* @__PURE__ */ jsx(BsX, {})
    }
  );
}
function ChatMessageAttachment({
  message,
  messageWithImages,
  messageWithFiles,
  dir = "ltr",
  className,
  gridClassName,
  deleteMessageClassName
}) {
  var _a;
  const { setSelectedMedia } = useChatMessageContext();
  const downloadFile = (attachment) => {
    window.open(`${attachment.file_path}/${attachment.file_name}`);
  };
  return ((_a = message.attachments) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "group relative flex gap-1", children: [
    /* @__PURE__ */ jsxs("div", { className: clsx("flex max-w-xs flex-col", className), children: [
      messageWithImages.length > 0 && /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "grid",
            gridClassName,
            messageWithImages.length >= 3 ? "w-[300px] grid-cols-3" : `w-[${messageWithImages.length * 100}px] grid-cols-${messageWithImages.length}`
          ),
          dir,
          children: messageWithImages.map((attachment) => {
            var _a2;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group/attachment relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl p-1 transition-all hover:bg-secondary",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${attachment.file_path}/${attachment.file_name}`,
                      alt: attachment.original_name,
                      className: "h-full rounded-lg object-cover",
                      onClick: () => setSelectedMedia(attachment)
                    }
                  ),
                  ((_a2 = message.attachments) == null ? void 0 : _a2.length) > 1 && /* @__PURE__ */ jsx(
                    DeleteSelectedFileInChat,
                    {
                      message,
                      attachment
                    }
                  )
                ]
              },
              attachment.file_name
            );
          })
        }
      ),
      messageWithFiles.length > 0 && /* @__PURE__ */ jsx("div", { className: "ml-auto grid max-w-xs grid-cols-1 gap-1", children: messageWithFiles.map((attachment) => {
        var _a2;
        return /* @__PURE__ */ jsx("div", { className: "group/attachment", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative flex w-full cursor-pointer items-center gap-2 rounded-xl bg-secondary/70 p-2 text-foreground transition-all hover:bg-secondary",
            onClick: () => downloadFile(attachment),
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white", children: /* @__PURE__ */ jsx(BsFileEarmarkText, { className: "text-xl" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden", children: [
                /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: attachment.original_name }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2 text-xs", children: [
                  /* @__PURE__ */ jsx("span", { children: formatFileSize(attachment.file_size) }),
                  /* @__PURE__ */ jsx("span", { className: "ml-auto text-secondary-foreground", children: moment(message.created_at).format("H:mm") })
                ] })
              ] }),
              ((_a2 = message.attachments) == null ? void 0 : _a2.length) > 1 && /* @__PURE__ */ jsx(
                DeleteSelectedFileInChat,
                {
                  message,
                  attachment
                }
              )
            ]
          }
        ) }, attachment.file_name);
      }) })
    ] }),
    !message.body && /* @__PURE__ */ jsx(
      DeleteMessage,
      {
        message,
        className: clsx("my-auto ml-auto mr-2", deleteMessageClassName)
      }
    )
  ] });
}
function ChatMessages() {
  const { auth } = useAppContext();
  const { messages, paginate, user } = useChatMessageContext();
  const sortedAndFilteredMessages = messages.sort((a, b) => a.sort_id - b.sort_id).filter((message, index) => {
    if (message.chat_type === CHAT_TYPE.GROUP_CHATS && index === 0) {
      return false;
    }
    return true;
  }).filter((message) => {
    var _a;
    return message.body || ((_a = message.attachments) == null ? void 0 : _a.length) > 0;
  });
  return /* @__PURE__ */ jsx("div", { className: "relative flex flex-1 flex-col gap-[3px] overflow-x-hidden", children: sortedAndFilteredMessages.map((message, index) => {
    var _a, _b, _c, _d;
    const isFirstMessage = index === 0;
    const date = moment(message.created_at);
    const prevDate = (_a = sortedAndFilteredMessages[index - 1]) == null ? void 0 : _a.created_at;
    const isDifferentDate = !date.isSame(prevDate, "date");
    const messageWithImages = message.attachments.filter(
      (attachment) => isImageLinkValid(attachment.original_name)
    );
    const messageWithFiles = message.attachments.filter(
      (attachment) => !isImageLinkValid(attachment.original_name)
    );
    const showProfile = message.chat_type === CHAT_TYPE.GROUP_CHATS && ((_b = messages[index]) == null ? void 0 : _b.from_id) !== message.from_id || message.chat_type === CHAT_TYPE.GROUP_CHATS && index === 0;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      (isFirstMessage || isDifferentDate) && /* @__PURE__ */ jsx("p", { className: "p-4 text-center text-xs text-secondary-foreground sm:text-sm", children: date.format("DD MMMM YYYY") }),
      message.from_id === user.id && message.from_id !== auth.id || message.chat_type === CHAT_TYPE.GROUP_CHATS && message.from_id !== auth.id ? /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-start", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground", children: [
        message.body && /* @__PURE__ */ jsxs("div", { className: "group relative flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            showProfile && /* @__PURE__ */ jsxs("div", { className: "mb-1 mt-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: message.from.avatar,
                  alt: message.from.name,
                  className: "h-6 w-6 rounded-full border border-secondary"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: message.from.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl bg-secondary py-2 pl-2 pr-4 text-sm lg:max-w-md", children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  dangerouslySetInnerHTML: { __html: message.body },
                  className: "my-auto overflow-auto"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "-mt-4 ml-auto text-xs text-secondary-foreground", children: date.format("H:mm") })
            ] })
          ] }),
          /* @__PURE__ */ jsx(DeleteMessage, { message })
        ] }),
        message.body && ((_c = message.attachments) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsx("div", { className: "my-[3px]" }),
        /* @__PURE__ */ jsx(
          ChatMessageAttachment,
          {
            message,
            messageWithImages,
            messageWithFiles,
            dir: "ltr"
          }
        )
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-end", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-white", children: [
        message.body && /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-row-reverse items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl py-2 pl-4 pr-2 lg:max-w-md",
                !user.message_color && "bg-primary"
              ),
              style: {
                background: user.message_color ? user.message_color : ""
              },
              children: [
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    dangerouslySetInnerHTML: { __html: message.body },
                    className: "my-auto overflow-auto"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "-mt-4 ml-auto text-xs text-white/80", children: date.format("H:mm") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(DeleteMessage, { message })
        ] }),
        message.body && ((_d = message.attachments) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ jsx("div", { className: "my-[3px]" }),
        /* @__PURE__ */ jsx(
          ChatMessageAttachment,
          {
            message,
            messageWithImages,
            messageWithFiles,
            dir: "rtl",
            className: "order-2 justify-end",
            gridClassName: "ml-auto",
            deleteMessageClassName: "order-1 flex-row-reverse"
          }
        )
      ] }) })
    ] }, `message-${message.id}`);
  }) });
}
function SaveOrBlockContact() {
  const { auth } = useAppContext();
  const { chats, setChats } = useChatContext();
  const { user, setUser, messages } = useChatMessageContext();
  const { openModal } = useModalContext();
  const blockContactConfirmation = () => {
    openModal({
      view: "BLOCK_CONTACT_CONFIRMATION",
      size: "lg",
      payload: user
    });
  };
  const handleSaveContact = () => {
    saveContact(user.id).then(() => {
      setUser({
        ...user,
        is_contact_saved: true
      });
      setChats(
        chats.map((c) => {
          if (c.id === user.id) {
            c.is_contact_saved = true;
          }
          return c;
        })
      );
    });
  };
  return user.chat_type === CHAT_TYPE.CHATS && messages.length > 0 && !user.is_contact_saved && !user.is_contact_blocked && auth.id !== user.id && /* @__PURE__ */ jsxs("div", { className: "my-2 flex flex-col items-center justify-between gap-2", children: [
    /* @__PURE__ */ jsx("p", { className: "text-center", children: "This contact not saved, would you like to save it?" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "btn btn-danger flex items-center gap-2 rounded-full",
          onClick: blockContactConfirmation,
          children: [
            /* @__PURE__ */ jsx(BsBan, {}),
            " Block"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "btn btn-success flex items-center gap-2 rounded-full",
          onClick: handleSaveContact,
          children: [
            /* @__PURE__ */ jsx(BsCheckCircle, {}),
            " OK"
          ]
        }
      )
    ] })
  ] });
}
function ChatBody({
  chatContainerRef,
  bottomRef,
  scrollToBottom,
  onDrop
}) {
  const { auth } = useAppContext();
  const { user, messages, setMessages, paginate, setPaginate, isTyping } = useChatMessageContext();
  const { ref: loadMoreRef, inView } = useInView();
  useEffect(() => {
    const inViewObserver = setTimeout(() => {
      if (inView && loadMoreRef.length > 0) {
        if (paginate.next_page_url) {
          fetchMessagesInPaginate(paginate.next_page_url).then((response) => {
            if (chatContainerRef.current) {
              const {
                scrollHeight: prevScrollHeight,
                scrollTop: prevScrollTop
              } = chatContainerRef.current;
              setPaginate(response.data.data);
              setMessages([...messages, ...response.data.data.data]);
              setTimeout(() => {
                if (chatContainerRef.current) {
                  const { scrollHeight } = chatContainerRef.current;
                  const newScrollHeight = scrollHeight - prevScrollHeight;
                  chatContainerRef.current.scrollTop = newScrollHeight + prevScrollTop;
                }
              }, 100);
            }
          });
        }
      }
    }, 500);
    return () => {
      clearTimeout(inViewObserver);
    };
  }, [inView, paginate]);
  return !onDrop && /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative max-h-[100vh_-_120px] flex-1 overflow-auto p-2 pt-8",
      ref: chatContainerRef,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "picture", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: user.avatar,
              alt: user.name,
              className: "h-12 w-12 rounded-full border border-secondary"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "mt-1 text-lg font-medium", children: user.name }),
            user.chat_type === CHAT_TYPE.GROUP_CHATS ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-secondary-foreground", children: [
              auth.id === user.creator_id ? "You " : `${user.creator.name} `,
              'created group "',
              user.name,
              '" ',
              /* @__PURE__ */ jsx("br", {}),
              "on ",
              moment(user.created_at).format("DD/MM/YY "),
              "at ",
              moment(user.created_at).format("H:mm")
            ] }) : /* @__PURE__ */ jsxs("p", { className: "text-sm text-secondary-foreground", children: [
              "Join ",
              /* @__PURE__ */ jsx("br", {}),
              " on ",
              moment(user.created_at).format("DD/MM/YY "),
              "at ",
              moment(user.created_at).format("H:mm")
            ] })
          ] })
        ] }),
        paginate.next_page_url && /* @__PURE__ */ jsx("button", { className: "mx-auto mt-4 flex", ref: loadMoreRef, children: /* @__PURE__ */ jsx(BsArrowClockwise, { className: "animate-spin text-2xl text-secondary-foreground" }) }),
        /* @__PURE__ */ jsx(ChatMessages, {}),
        user.chat_type === CHAT_TYPE.CHATS && user.id !== auth.id && isTyping && /* @__PURE__ */ jsx("div", { className: "my-[3px] flex flex-row justify-start", children: /* @__PURE__ */ jsxs("div", { className: "typing relative flex gap-1 rounded-3xl bg-secondary px-4 py-3", children: [
          /* @__PURE__ */ jsx("div", { className: "animate-typing h-2 w-2 rounded-full bg-secondary-foreground/50" }),
          /* @__PURE__ */ jsx("div", { className: "animate-typing h-2 w-2 rounded-full bg-secondary-foreground/50" }),
          /* @__PURE__ */ jsx("div", { className: "animate-typing h-2 w-2 rounded-full bg-secondary-foreground/50" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { ref: bottomRef, className: "h-0" }),
        /* @__PURE__ */ jsx(SaveOrBlockContact, {})
      ]
    }
  );
}
function ChatFooter({
  scrollToBottom,
  attachments,
  closeOnPreview,
  onSelectOrPreviewFiles
}) {
  const { theme, auth } = useAppContext();
  const { chats, setChats, refetchChats } = useChatContext();
  const {
    user,
    setUser,
    messages,
    setMessages,
    reloadMedia,
    reloadFiles,
    reloadLinks
  } = useChatMessageContext();
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(48);
  const [processing, setProcessing] = useState(false);
  const textareaRef = useRef(null);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    var _a;
    (_a = textareaRef.current) == null ? void 0 : _a.focus();
  }, []);
  useEffect(() => {
    const channel = window.Echo.private(
      `user-typing-${auth.id}-to-${user.id}`
    );
    if (message.length > 0 && !isTyping) {
      channel.whisper(".typing", {
        from: auth,
        to: user,
        oldMessage: chats.find((c) => c.id === user.id)
      });
      setIsTyping(true);
    }
  }, [message]);
  useEffect(() => {
    if (isTyping) {
      setTimeout(() => {
        setIsTyping(false);
        setTimeout(scrollToBottom, 300);
      }, 1e4);
    }
  }, [isTyping]);
  const onSelectFile = (e) => {
    onSelectOrPreviewFiles(e.target.files);
  };
  const handleOnKeyDown = (e) => {
    const onPressBackspace = e.key === "Backspace";
    const onPressEnter = e.key === "Enter";
    if (onPressEnter && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit(e);
    }
    if (onPressBackspace) {
      const target = e.target;
      const lines = target.value.split("\n");
      if (target.offsetHeight > 48) {
        if (lines[lines.length - 1] === "") {
          setTextareaHeight((prev) => prev - 24);
        }
      }
    }
  };
  const handleOnChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      const { scrollHeight, clientHeight } = textareaRef.current;
      if (scrollHeight !== clientHeight) {
        setTextareaHeight(scrollHeight + 4);
      }
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0 && attachments.length === 0 || processing) {
      return;
    }
    setProcessing(true);
    saveMessage({ user, message, attachments }).then((response) => {
      var _a;
      closeOnPreview();
      setMessage("");
      setTextareaHeight(48);
      setIsOpenEmoji(false);
      (_a = textareaRef.current) == null ? void 0 : _a.focus();
      const data = response.data.data;
      setMessages([...messages, data]);
      refetchChats();
      existingMedia(data.attachments) && reloadMedia(user);
      existingFiles(data.attachments) && reloadFiles(user);
      existingLinks(data.links) && reloadLinks(user);
      setTimeout(scrollToBottom, 300);
    }).finally(() => setProcessing(false));
  };
  const toggleEmoji = () => {
    setIsOpenEmoji(!isOpenEmoji);
  };
  const handleOnEmojiClick = (emoji) => {
    setMessage((prevMsg) => prevMsg + emoji);
  };
  const handleUnblockContact = () => {
    unblockContact(user.id).then(() => {
      setChats(
        chats.map((c) => {
          if (c.id === user.id) {
            c.is_contact_blocked = false;
          }
          return c;
        })
      );
      setUser({ ...user, is_contact_blocked: false });
    });
  };
  if (user.is_contact_blocked) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-2 border-t border-secondary py-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center", children: "Can't send a message to blocked contact" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "btn btn-success flex items-center gap-2 rounded-full",
          onClick: handleUnblockContact,
          children: [
            /* @__PURE__ */ jsx(BsBan, {}),
            " Unblock"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "flex items-end gap-2 bg-background p-2 text-foreground",
      onSubmit: handleOnSubmit,
      children: [
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "file",
            className: "mb-1 cursor-pointer rounded-full p-2 text-primary transition-all hover:bg-secondary focus:bg-secondary",
            children: [
              /* @__PURE__ */ jsx(BsPlusLg, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  className: "hidden",
                  id: "file",
                  multiple: true,
                  onChange: onSelectFile
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 items-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute right-2 mb-3 text-primary",
              onClick: toggleEmoji,
              children: /* @__PURE__ */ jsx(BsEmojiSmile, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute bottom-14 right-0 z-10",
                isOpenEmoji ? "block" : "hidden"
              ),
              children: /* @__PURE__ */ jsx(
                EmojiPicker,
                {
                  theme: theme === "system" ? "auto" : theme,
                  skinTonesDisabled: true,
                  height: 400,
                  onEmojiClick: ({ emoji }) => handleOnEmojiClick(emoji)
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              placeholder: "Aa",
              className: "max-h-[7.5rem] w-full resize-none rounded-xl border border-secondary bg-secondary pr-10 text-foreground focus:border-transparent focus:ring-transparent",
              value: message,
              onKeyDown: handleOnKeyDown,
              onChange: handleOnChange,
              ref: textareaRef,
              style: {
                height: `${textareaHeight}px`
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: clsx(
              "mb-1 flex rounded-full p-2 text-primary transition-all disabled:cursor-not-allowed",
              message.trim().length === 0 && "hover:bg-secondary focus:bg-secondary",
              message.trim().length > 0 && !processing && "bg-primary !text-white"
            ),
            disabled: processing,
            children: /* @__PURE__ */ jsx(BiSend, { className: "h-6 w-6" })
          }
        )
      ]
    }
  );
}
function DragFileOverlay({
  onDrag,
  onDrop
}) {
  return /* @__PURE__ */ jsx(
    Transition,
    {
      show: onDrag,
      enter: "ease-out duration-300",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in duration-100",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0",
      children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 top-0 z-20 flex w-full items-center justify-center bg-secondary/60 text-2xl text-foreground/25 sm:text-3xl", children: /* @__PURE__ */ jsx(
        "p",
        {
          className: clsx(
            "-mt-[52px] rounded-lg px-4 py-2",
            onDrop ? "bg-secondary/25" : "bg-secondary"
          ),
          children: "Drag file here"
        }
      ) })
    }
  );
}
function PreviewOnDropFile({
  onDrop,
  closeOnPreview,
  selectedPreview,
  setSelectedPreview,
  attachments,
  setAttachments
}) {
  const changeSelectedImage = (file) => {
    setSelectedPreview(file);
  };
  const removeAttachment = (file) => {
    setAttachments(attachments.filter((f) => f.preview !== file.preview));
    const removedIndex = attachments.findIndex(
      (f) => f.preview === file.preview
    );
    if (removedIndex === 0) {
      setSelectedPreview(attachments[removedIndex + 1]);
    } else if (removedIndex > 0 && file.preview === selectedPreview.preview) {
      setSelectedPreview(attachments[removedIndex - 1]);
    }
    if (attachments.length - 1 === 0)
      closeOnPreview();
  };
  return onDrop && /* @__PURE__ */ jsxs("div", { className: "relative flex h-full max-h-[100vh_-_120px] flex-1 flex-col overflow-auto p-2 pt-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-full flex-1 items-center justify-center overflow-hidden p-2", children: isImageLinkValid(selectedPreview.name) ? /* @__PURE__ */ jsx(
      "img",
      {
        src: selectedPreview.preview,
        alt: "",
        className: "max-h-full object-contain"
      }
    ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary", children: /* @__PURE__ */ jsx(BsFileEarmarkText, { className: "text-3xl" }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium", children: selectedPreview.name }),
        /* @__PURE__ */ jsx("span", { className: "text-xs", children: formatFileSize(selectedPreview.size) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-auto flex gap-1 overflow-auto", children: attachments.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: clsx(
            "flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary transition-all hover:border-primary focus:border-primary",
            selectedPreview.preview === file.preview ? "border-primary" : "border-transparent"
          ),
          onClick: () => changeSelectedImage(file),
          children: isImageLinkValid(file.name) ? /* @__PURE__ */ jsx(
            "img",
            {
              src: file.preview,
              alt: "",
              className: "max-h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("span", { className: "flex h-[56px] w-[56px] shrink-0 items-center justify-center", children: /* @__PURE__ */ jsx(BsFileEarmarkText, { className: "text-3xl" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute right-1 top-1 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover:flex",
          onClick: () => removeAttachment(file),
          children: /* @__PURE__ */ jsx(BsX, {})
        }
      )
    ] }, `${file.name}-${index}`)) })
  ] });
}
function Content() {
  const { auth } = useAppContext();
  const { showSidebarRight, messages, user, isTyping, setIsTyping } = useChatMessageContext();
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [onDrag, setOnDrag] = useState(false);
  const [onDrop, setOnDrop] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState();
  useEffect(() => {
    window.Echo.private(
      `user-typing-${user.id}-to-${auth.id}`
    ).listenForWhisper(
      ".typing",
      (data) => {
        if (data.to.id === auth.id && data.from.id === user.id) {
          setIsTyping(true);
          setTimeout(scrollToBottom, 300);
        }
      }
    );
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    isTyping && setTimeout(() => setIsTyping(false), 1e4);
  }, [isTyping]);
  const scrollToBottom = () => {
    if (bottomRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = bottomRef.current.offsetTop;
    }
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return setOnDrag(false);
    }
    onSelectOrPreviewFiles(files);
  };
  const onSelectOrPreviewFiles = (files) => {
    if (!files)
      return;
    const droppedFiles = Array.from(files).map(
      (file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setAttachments([...attachments, ...droppedFiles]);
    setSelectedPreview(droppedFiles[0]);
    setOnDrag(false);
    setOnDrop(true);
  };
  const closeOnPreview = () => {
    setOnDrop(false);
    setAttachments([]);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "relative order-3 h-full w-full flex-1 flex-col justify-between overflow-x-hidden border-secondary sm:border-l",
        showSidebarRight ? "hidden lg:flex" : "flex"
      ),
      tabIndex: 0,
      onDragEnter: () => setOnDrag(true),
      onDragExit: () => setOnDrag(false),
      onDragOver: (e) => e.preventDefault(),
      onDrop: handleOnDrop,
      children: [
        /* @__PURE__ */ jsx(ChatHeader, { onDrop, closeOnPreview }),
        /* @__PURE__ */ jsx(
          ChatBody,
          {
            chatContainerRef,
            bottomRef,
            scrollToBottom,
            onDrop
          }
        ),
        /* @__PURE__ */ jsx(
          PreviewOnDropFile,
          {
            onDrop,
            closeOnPreview,
            selectedPreview,
            setSelectedPreview,
            attachments,
            setAttachments
          }
        ),
        /* @__PURE__ */ jsx(DragFileOverlay, { onDrag, onDrop }),
        /* @__PURE__ */ jsx(
          ChatFooter,
          {
            scrollToBottom,
            attachments,
            closeOnPreview,
            onSelectOrPreviewFiles
          }
        )
      ]
    }
  );
}
function ProfileInformation({
  toggleCustomizeChat,
  toggleShowMedia,
  setToggleCustomizeChat,
  setToggleShowMedia
}) {
  const { user, setUser, showSidebarRight, toggleSidebarRight } = useChatMessageContext();
  const { openModal } = useModalContext();
  const customizeChat = () => {
    openModal({
      view: "CUSTOMIZE_CHAT",
      size: "sm",
      payload: {
        dispatchOnCanceled: () => setUser({ ...user })
      }
    });
  };
  const editGroup = () => {
    openModal({
      view: "EDIT_GROUP",
      size: "lg",
      payload: user
    });
  };
  return /* @__PURE__ */ jsxs(
    Transition,
    {
      show: !toggleShowMedia,
      enter: "transition-transform duration-300 ease-out",
      enterFrom: "transform opacity-0 translate-x-[-100%]",
      enterTo: "transform opacity-100 translate-x-0",
      leave: "transition-transform duration-300 ease-out",
      leaveFrom: "transform opacity-100 translate-x-0",
      leaveTo: "transform opacity-0 translate-x-[-100%]",
      className: clsx(
        "w-full flex-col gap-4 lg:flex",
        showSidebarRight ? "flex" : "hidden"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "visible flex h-14 items-center border-b border-secondary bg-background px-2 lg:invisible", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary",
            onClick: toggleSidebarRight,
            children: /* @__PURE__ */ jsx(BsXLg, {})
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex flex-col gap-3 px-2 py-4 text-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: user.avatar,
              alt: user.name,
              className: "mx-auto h-20 w-20 rounded-full border border-secondary"
            }
          ),
          /* @__PURE__ */ jsx("h5", { className: "font-medium", children: user.name }),
          user.chat_type === CHAT_TYPE.GROUP_CHATS && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-secondary-foreground", children: [
              "Group . ",
              user.members_count,
              " members"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-secondary-foreground", children: user.description }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn btn-secondary btn-close rounded-full text-base focus:ring-0",
                onClick: editGroup,
                children: /* @__PURE__ */ jsx(
                  FaInfoCircle,
                  {
                    className: clsx(!user.message_color && "!text-primary"),
                    style: { color: user.message_color }
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary focus:bg-secondary",
              onClick: () => setToggleCustomizeChat(!toggleCustomizeChat),
              children: [
                /* @__PURE__ */ jsx("span", { children: "Customize chat" }),
                toggleCustomizeChat ? /* @__PURE__ */ jsx(BsChevronDown, {}) : /* @__PURE__ */ jsx(BsChevronRight, {})
              ]
            }
          ),
          toggleCustomizeChat && /* @__PURE__ */ jsxs(
            "button",
            {
              className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary focus:bg-secondary",
              onClick: customizeChat,
              children: [
                /* @__PURE__ */ jsx(
                  BsRecordCircle,
                  {
                    className: clsx(!user.message_color && "!text-primary"),
                    style: { color: user.message_color }
                  }
                ),
                "Change Theme"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary focus:bg-secondary",
              onClick: () => setToggleShowMedia(!toggleShowMedia),
              children: [
                /* @__PURE__ */ jsx("span", { children: "Media, files and links" }),
                /* @__PURE__ */ jsx(BsChevronRight, {})
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Attachments({
  toggleShowMedia,
  setToggleShowMedia
}) {
  const { showSidebarRight, media, setSelectedMedia, files, links } = useChatMessageContext();
  const downloadFile = (url) => {
    window.open(url);
  };
  const openPopupGallery = (image) => {
    setSelectedMedia(image);
  };
  return /* @__PURE__ */ jsxs(
    Transition,
    {
      show: toggleShowMedia,
      enter: "transition-transform duration-300 ease-out",
      enterFrom: "transform opacity-0 -translate-x-[-100%]",
      enterTo: "transform opacity-100 translate-x-0",
      leave: "transition-transform duration-300 ease-out",
      leaveFrom: "transform opacity-100 translate-x-0",
      leaveTo: "transform opacity-0 -translate-x-[-100%]",
      className: clsx(
        "absolute top-0 w-full flex-col lg:flex",
        showSidebarRight ? "flex" : "hidden"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "sticky top-0 flex h-14 items-center gap-2 border-b border-secondary bg-background px-2 lg:shadow-sm", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary",
              onClick: () => setToggleShowMedia(!toggleShowMedia),
              children: /* @__PURE__ */ jsx(FaArrowLeft, {})
            }
          ),
          /* @__PURE__ */ jsx("h5", { className: "font-medium", children: "Media, files and links" })
        ] }),
        /* @__PURE__ */ jsxs(Tab.Group, { children: [
          /* @__PURE__ */ jsxs(Tab.List, { className: "mx-2 mb-2 mt-4 flex rounded-full border border-secondary", children: [
            /* @__PURE__ */ jsx(Tab, { as: Fragment, children: ({ selected }) => /* @__PURE__ */ jsx(
              "button",
              {
                className: clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary"
                ),
                children: "Media"
              }
            ) }),
            /* @__PURE__ */ jsx(Tab, { as: Fragment, children: ({ selected }) => /* @__PURE__ */ jsx(
              "button",
              {
                className: clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary"
                ),
                children: "Files"
              }
            ) }),
            /* @__PURE__ */ jsx(Tab, { as: Fragment, children: ({ selected }) => /* @__PURE__ */ jsx(
              "button",
              {
                className: clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary"
                ),
                children: "Links"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Tab.Panels, { className: "h-[calc(100vh_-_120px)]", children: [
            /* @__PURE__ */ jsx(Tab.Panel, { className: "flex h-full flex-col", children: media.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 overflow-auto p-2", children: media.sort((a, b) => b.created_at.localeCompare(a.created_at)).map((image) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex h-24 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary",
                onClick: () => openPopupGallery(image),
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${image.file_path}/${image.file_name}`,
                    alt: image.original_name,
                    className: "h-full object-cover"
                  }
                )
              },
              image.file_name
            )) }) : /* @__PURE__ */ jsx("div", { className: "my-auto text-center", children: "No media" }) }),
            /* @__PURE__ */ jsx(Tab.Panel, { className: "flex h-full flex-col", children: files.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 overflow-auto p-2", children: files.sort((a, b) => b.created_at.localeCompare(a.created_at)).map((file) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex cursor-pointer items-center gap-2",
                onClick: () => downloadFile(`${file.file_path}/${file.file_name}`),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary", children: /* @__PURE__ */ jsx(BsFileEarmarkText, { className: "text-xl" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
                    /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: file.original_name }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs", children: formatFileSize(file.file_size) })
                  ] })
                ]
              },
              file.file_name
            )) }) : /* @__PURE__ */ jsx("div", { className: "my-auto text-center", children: "No files" }) }),
            /* @__PURE__ */ jsx(Tab.Panel, { className: "flex h-full flex-col", children: links.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 overflow-auto p-2", children: links.map((link, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex cursor-pointer items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary", children: /* @__PURE__ */ jsx(BsLink45Deg, { className: "text-2xl" }) }),
                  /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("h5", { className: "truncate font-medium", children: link }) })
                ]
              },
              `link-` + index
            )) }) : /* @__PURE__ */ jsx("div", { className: "my-auto text-center", children: "No links" }) })
          ] })
        ] })
      ]
    }
  );
}
function SidebarRight() {
  const { showSidebarRight } = useChatMessageContext();
  const [toggleCustomizeChat, setToggleCustomizeChat] = useState(false);
  const [toggleShowMedia, setToggleShowMedia] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "relative order-4 h-full overflow-x-hidden border-secondary sm:flex-1 sm:border-l lg:w-[320px] lg:flex-initial xl:w-[360px]",
        showSidebarRight ? "flex" : "hidden"
      ),
      children: [
        /* @__PURE__ */ jsx(
          ProfileInformation,
          {
            toggleCustomizeChat,
            toggleShowMedia,
            setToggleCustomizeChat,
            setToggleShowMedia
          }
        ),
        /* @__PURE__ */ jsx(
          Attachments,
          {
            toggleShowMedia,
            setToggleShowMedia
          }
        )
      ]
    }
  );
}
function PopupGallery() {
  const { media, selectedMedia, setSelectedMedia, clearSelectedMedia } = useChatMessageContext();
  const [isLoading, setIsLoading] = useState(true);
  const refGallery = useRef(null);
  useEffect(() => {
    var _a;
    if (refGallery.current) {
      const currentIndex = media.findIndex(
        (image) => image.file_name === (selectedMedia == null ? void 0 : selectedMedia.file_name)
      );
      (_a = refGallery.current) == null ? void 0 : _a.slideToIndex(currentIndex);
    }
  }, [selectedMedia]);
  if (!selectedMedia)
    return;
  const handleOnSlide = (currentIndex) => {
    setSelectedMedia(media[currentIndex]);
  };
  return /* @__PURE__ */ jsx(
    Transition,
    {
      show: typeof selectedMedia !== void 0,
      as: Fragment,
      leave: "duration-200",
      children: /* @__PURE__ */ jsxs(
        Dialog,
        {
          as: "div",
          id: "modal",
          className: "fixed inset-0 z-50 flex transform items-center overflow-hidden transition-all",
          onClose: clearSelectedMedia,
          children: [
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0",
                enterTo: "opacity-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100",
                leaveTo: "opacity-0",
                children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-full w-full bg-black/90" })
              }
            ),
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                enterTo: "opacity-100 translate-y-0 sm:scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                children: /* @__PURE__ */ jsxs(Dialog.Panel, { className: "relative z-30 flex h-screen w-screen transform flex-col transition-all", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex w-full items-center justify-between px-4 py-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: selectedMedia.sent_by.avatar,
                          alt: selectedMedia.sent_by.name,
                          className: "h-10 w-10 rounded-full"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { className: "leading-4", children: [
                        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-50", children: selectedMedia.sent_by.name }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: moment(selectedMedia.created_at).format("DD/MM/YYYY H:mm") })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "flex items-center justify-center rounded-lg border-2 border-secondary/25 p-1 text-xl text-gray-50 transition-all hover:scale-105 hover:border-primary hover:text-primary focus-visible:outline-none dark:border-secondary/75 dark:hover:border-primary",
                        onClick: clearSelectedMedia,
                        children: /* @__PURE__ */ jsx(BsXLg, {})
                      }
                    )
                  ] }),
                  isLoading && /* @__PURE__ */ jsxs("div", { className: "image-gallery-loader-wrapper", children: [
                    /* @__PURE__ */ jsx("div", { className: "image-gallery-loader-original m-auto", children: /* @__PURE__ */ jsx(FaCircleNotch, { className: "animate-spin" }) }),
                    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-1 flex", children: media.map((_, index) => /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "image-gallery-thumbnail image-gallery-loader-thumbnail",
                        children: /* @__PURE__ */ jsx(FaCircleNotch, { className: "animate-spin" })
                      },
                      index
                    )) })
                  ] }),
                  /* @__PURE__ */ jsx(
                    ImageGallery,
                    {
                      ref: refGallery,
                      showFullscreenButton: false,
                      showPlayButton: false,
                      infinite: false,
                      additionalClass: isLoading ? "hidden" : "m-auto w-full lg:w-[80%] xl:w-[70%] z-[60]",
                      items: media.sort((a, b) => a.created_at.localeCompare(b.created_at)).map((image) => {
                        return {
                          thumbnail: `${image.file_path}/${image.file_name}`,
                          original: `${image.file_path}/${image.file_name}`
                        };
                      }),
                      onImageLoad: () => setIsLoading(false),
                      onErrorImageURL: "The image could not be loaded",
                      onSlide: handleOnSlide
                    }
                  )
                ] })
              }
            )
          ]
        }
      )
    }
  );
}
export {
  Content as C,
  PopupGallery as P,
  SidebarRight as S
};
