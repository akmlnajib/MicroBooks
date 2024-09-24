import { jsx, jsxs } from "react/jsx-runtime";
import { A as ApplicationLogo } from "./ApplicationLogo-ChmsOzt0.js";
import { Link, Head } from "@inertiajs/react";
import { BsBoxArrowRight } from "react-icons/bs";
import DeleteUserForm from "./DeleteUserForm-DgsezsiF.js";
import UpdatePasswordForm from "./UpdatePasswordForm-UTJAhHpA.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-OPx4pzlQ.js";
import "react";
import "./InputError-DMEJWwuX.js";
import "./InputLabel-BGYyLxCX.js";
import "./Modal-DiCRk7y7.js";
import "@headlessui/react";
import "./PrimaryButton-D0lSb-cF.js";
function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-primary text-foreground focus:border-primary " : "border-transparent text-foreground hover:border-secondary hover:text-secondary-foreground focus:border-secondary focus:text-secondary-foreground ") + className,
      children
    }
  );
}
function Authenticated({
  user,
  header,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsx("nav", { className: "border-b border-secondary bg-background", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto" }) }) }),
        /* @__PURE__ */ jsx(NavLink, { href: route("chats.index"), active: false, children: "Chats" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("logout"),
          as: "button",
          method: "post",
          className: "btn btn-secondary flex items-center gap-2 whitespace-nowrap border-none",
          children: [
            /* @__PURE__ */ jsx(BsBoxArrowRight, {}),
            "Log out"
          ]
        }
      ) })
    ] }) }) }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-background shadow", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl p-4 sm:p-6", children: header }) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
function Edit({
  auth,
  mustVerifyEmail,
  status
}) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth,
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-foreground", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-4 sm:py-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-4 px-4 sm:space-y-6 sm:px-6", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-background p-4 shadow sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-background p-4 shadow sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-background p-4 shadow sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
