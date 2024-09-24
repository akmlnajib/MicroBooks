import Dropdown from "@/components/Dropdown";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { AppProvider, useAppContext } from "@/contexts/app-context";
import { PageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import { FaHamburger, FaTimes } from "react-icons/fa";

export default function AppLayout({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  const { auth } = useAppContext();
  const { notification_count } = usePage<PageProps>().props;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <AppProvider>
      <Head
        title={clsx(notification_count > 0 && `(${notification_count})`, title)}
      />
      <div className="min-h-screen bg-background">
        <nav className="border-b border-secondary bg-background mb-3">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <div className="flex">
                <div className="shrink-0 flex items-center mt-2">
                  <Link href={route('dashboard')}>
                    <img src="/images/logo.png" alt="Logo" className="w-40" />
                  </Link>
                </div>
                {/* {route("dashboard")} active={false} */}
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink href={route("dashboard")} active={false}>
                    <div className="bg-gradient-to-b from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-lg font-semibol">Dash</div>
                    <div className="bg-gradient-to-b from-indigo-400 to-cyan-600 bg-clip-text text-transparent text-lg font-semibol">board</div>
                  </NavLink>
                  <NavLink href={route("chats.index")} active={false}>
                    <div className="bg-gradient-to-b from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-lg font-semibol">Ch</div>
                    <div className="bg-gradient-to-b from-indigo-400 to-cyan-600 bg-clip-text text-transparent text-lg font-semibol">ats</div>
                  </NavLink>
                </div>
              </div>
              <div className="hidden sm:flex sm:items-center sm:ms-6">
                <div className="me-12 relative">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-background hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                          {auth.name}
                          <FaHamburger className="ms-2 -me-0.5 h-4 w-4" />
                        </button>
                      </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                      <Dropdown.Link href={route('logout')} method="post" as="button">
                        Log Out
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>
              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() => setShowingNavigationDropdown(prev => !prev)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-foreground hover:bg-background focus:outline-none focus:bg-background focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  {showingNavigationDropdown ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaHamburger className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
              </ResponsiveNavLink>
              <ResponsiveNavLink href={route('chats.index')} active={route().current('chats.index')}>
                Chats
              </ResponsiveNavLink>
            </div>
            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="px-4">
                <div className="font-medium text-base text-gray-800">
                  {auth.avatar}
                </div>
                <div className="font-medium text-sm text-gray-500">{auth.email}</div>
              </div>
            </div>
          </div>
        </nav>

      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground sm:flex-row">
        {children}
      </div>
      </div>
    </AppProvider>
  );
}
