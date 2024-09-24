import { jsxs, jsx } from "react/jsx-runtime";
import { i as useAppContext, G as useScreenSize, D as Dropdown, H as updateUser, A as AppLayout, S as SidebarMini } from "./SidebarMini-Di7pOyuz.js";
import { C as ContentEmpty } from "./ContentEmpty-C19tKPhS.js";
import clsx from "clsx";
import { BsCircleHalf, BsChevronDown, BsAppIndicator, BsPersonCircle, BsChevronRight, BsKey, BsBan, BsBoxArrowRight } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import UpdateProfileInformation from "./UpdateProfileInformationForm-OPx4pzlQ.js";
import UpdatePasswordForm from "./UpdatePasswordForm-UTJAhHpA.js";
import DeleteUserForm from "./DeleteUserForm-DgsezsiF.js";
import { router, Link } from "@inertiajs/react";
import "moment";
import "./Modal-DiCRk7y7.js";
import "./InputLabel-BGYyLxCX.js";
import "./InputError-DMEJWwuX.js";
import "./PrimaryButton-D0lSb-cF.js";
function Content() {
  const { theme, setTheme, auth, setAuth } = useAppContext();
  const [toggles, setToggles] = useState({
    profile: true,
    password: false,
    deleteAccount: false
  });
  const { width } = useScreenSize();
  useEffect(() => {
    if (width > 640) {
      router.get(route("chats.index"));
    }
  }, [width]);
  const toggleActiveStatus = (status) => {
    updateUser(auth, { active_status: status }).then(() => {
      setAuth({ ...auth, active_status: status });
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "order-1 flex flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-2 pt-2 sm:pb-0", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Preferences" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full max-h-[calc(100vh_-_106px)] flex-col gap-2 overflow-x-auto p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(BsCircleHalf, {}),
          "Theme"
        ] }),
        /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("button", { className: "btn btn-secondary flex items-center gap-2", children: [
            theme.charAt(0).toUpperCase() + theme.slice(1),
            /* @__PURE__ */ jsx(BsChevronDown, {})
          ] }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(Dropdown.Button, { onClick: () => setTheme("system"), children: "System" }),
            /* @__PURE__ */ jsx(Dropdown.Button, { onClick: () => setTheme("dark"), children: "Dark" }),
            /* @__PURE__ */ jsx(Dropdown.Button, { onClick: () => setTheme("light"), children: "Light" })
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
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "my-2 border-secondary" }),
      toggles.profile && /* @__PURE__ */ jsx(UpdateProfileInformation, { mustVerifyEmail: true, className: "max-w-xl" }),
      toggles.password && /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }),
      toggles.deleteAccount && /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }),
      /* @__PURE__ */ jsx("div", { className: "my-1" }),
      !toggles.profile && /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-secondary",
          onClick: () => setToggles({
            profile: true,
            password: false,
            deleteAccount: false
          }),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(BsPersonCircle, {}),
            "Update profile",
            /* @__PURE__ */ jsx(BsChevronRight, { className: "ml-auto" })
          ] })
        }
      ),
      !toggles.password && /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-secondary",
          onClick: () => setToggles({
            profile: false,
            password: true,
            deleteAccount: false
          }),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(BsKey, {}),
            "Update password",
            /* @__PURE__ */ jsx(BsChevronRight, { className: "ml-auto" })
          ] })
        }
      ),
      !toggles.deleteAccount && /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-secondary",
          onClick: () => setToggles({
            profile: false,
            password: false,
            deleteAccount: true
          }),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(BsBan, {}),
            "Delete Account",
            /* @__PURE__ */ jsx(BsChevronRight, { className: "ml-auto" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("logout"),
          as: "button",
          method: "post",
          className: "btn btn-secondary flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(BsBoxArrowRight, {}),
            "Log out",
            /* @__PURE__ */ jsx(BsChevronRight, { className: "ml-auto" })
          ]
        }
      )
    ] })
  ] });
}
function Preferences() {
  return /* @__PURE__ */ jsxs(AppLayout, { title: "Preferences", children: [
    /* @__PURE__ */ jsx(SidebarMini, {}),
    /* @__PURE__ */ jsx(Content, {}),
    /* @__PURE__ */ jsx(ContentEmpty, {})
  ] });
}
export {
  Preferences as default
};
