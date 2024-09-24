import { jsxs, jsx } from "react/jsx-runtime";
import { G as Guest } from "./GuestLayout-Bxy73AWW.js";
import { T as TextInput, I as InputError } from "./InputError-DMEJWwuX.js";
import { P as PrimaryButton } from "./PrimaryButton-D0lSb-cF.js";
import { useForm, Head } from "@inertiajs/react";
import { F as FormAlert } from "./FormAlert-DNVw3iG1.js";
import "./ApplicationLogo-ChmsOzt0.js";
import "react";
import "clsx";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-foreground", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx(FormAlert, { message: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "w-full", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
export {
  ForgotPassword as default
};
