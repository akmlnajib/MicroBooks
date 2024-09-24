import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { C as Checkbox } from "./Checkbox-B7HUhkNV.js";
import { T as TextInput, I as InputError } from "./InputError-DMEJWwuX.js";
import { P as PrimaryButton } from "./PrimaryButton-D0lSb-cF.js";
import { useForm, Link } from "@inertiajs/react";
import { A as ApplicationLogo } from "./ApplicationLogo-ChmsOzt0.js";
import moment from "moment";
import { BsHeartFill } from "react-icons/bs";
function Welcome({
  canResetPassword,
  appName
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-6 font-['Inter'] text-foreground sm:gap-12 sm:p-8", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-10" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "my-auto grid grid-cols-1 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 sm:w-11/12 sm:space-y-12", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold sm:text-5xl lg:text-7xl", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent", children: "Hang out" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent", children: "anytime," }),
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent", children: " anywhere" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl", children: "Messenger makes it easy and fun to stay close to your favorite people." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4 lg:w-3/4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "w-full border-secondary bg-secondary dark:border-secondary",
                autoComplete: "username",
                isFocused: true,
                onChange: (e) => setData("email", e.target.value),
                placeholder: "Enter your email address"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "w-full border-secondary bg-secondary dark:border-secondary",
                autoComplete: "current-password",
                onChange: (e) => setData("password", e.target.value),
                placeholder: "Enter your password"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  name: "remember",
                  checked: data.remember,
                  onChange: (e) => setData("remember", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-foreground", children: "Remember me" })
            ] }),
            canResetPassword && /* @__PURE__ */ jsx(Link, { href: route("password.request"), className: "btn-link", children: "Forgot your password?" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "w-full", disabled: processing, children: "Log in" }) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: route("register"), className: "btn-link", children: "Don't have an account?" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center sm:mt-0", children: /* @__PURE__ */ jsx("img", { src: "/images/vector.png", alt: "vector.png" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto flex gap-2", children: [
      /* @__PURE__ */ jsxs(Link, { className: "font-medium", href: "/", children: [
        "© ",
        appName,
        " ",
        moment().format("Y"),
        "."
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-secondary-foreground", children: [
        "Built with ",
        /* @__PURE__ */ jsx(BsHeartFill, { className: "text-sm text-danger" }),
        " By Nursandi"
      ] })
    ] })
  ] });
}
export {
  Welcome as default
};
