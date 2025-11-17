import { SidebarNavigation } from "@/app/(protected)/merchant/components/shared/sidebar-navigation";
import Password from "./component/password";
import Pin from "./component/pin";
import DeleteAccount from "./component/delete-account";

const MyAccountSecurityPage = () => {
  const sections = [
    { id: "password", title: "Password" },
    { id: "pin", title: "PIN" },
    { id: "delete-account", title: "Delete Account" },
  ];

  return (
    <div className="flex flex-1 min-h-0 bg-white rounded-lg">
      {/* Left Sidebar - Navigation */}
      <div className="hidden lg:block flex-shrink-0">
        <div className="h-full pr-8">
          <SidebarNavigation sections={sections} />
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-6 px-6">
          <div className="max-w-4xl space-y-8">
            {/* Password Section */}
            <div id="password">
              <Password />
            </div>

            {/* PIN Section */}
            <div id="pin">
              <Pin />
            </div>

            {/* Delete Account Section */}
            <div id="delete-account">
              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountSecurityPage;
