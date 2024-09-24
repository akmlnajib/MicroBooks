import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { C as Checkbox } from "./Checkbox-B7HUhkNV.js";
import { G as Guest } from "./GuestLayout-Bxy73AWW.js";
import { T as TextInput, I as InputError } from "./InputError-DMEJWwuX.js";
import { I as InputLabel } from "./InputLabel-BGYyLxCX.js";
import { P as PrimaryButton } from "./PrimaryButton-D0lSb-cF.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { F as FormAlert } from "./FormAlert-DNVw3iG1.js";
import "./ApplicationLogo-ChmsOzt0.js";
import "clsx";
function Login({
  status,
  canResetPassword
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
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx(FormAlert, { message: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
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
      /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "w-full", disabled: processing, children: "Log in" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: route("register"), className: "btn-link", children: "Don't have an account?" }) })
    ] })
  ] });
}
export {
  Login as default
};
