import { jsxs, jsx } from "react/jsx-runtime";
import { T as TextInput, I as InputError } from "./InputError-DMEJWwuX.js";
import { I as InputLabel } from "./InputLabel-BGYyLxCX.js";
import { P as PrimaryButton } from "./PrimaryButton-D0lSb-cF.js";
import { usePage, useForm, Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useRef } from "react";
import { BsCamera } from "react-icons/bs";
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth;
  const avatarRef = useRef(null);
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    _method: "PATCH",
    name: user.name,
    email: user.email,
    avatar: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("profile.update"));
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
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-secondary-foreground", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "picture relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: user.avatar,
            alt: user.name,
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
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-foreground", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "btn btn-secondary",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-success", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdateProfileInformation as default
};
