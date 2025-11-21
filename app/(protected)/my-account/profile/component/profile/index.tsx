import { useFormik } from "formik";
import { useRef } from "react";
import ProfileNavigation from "../navigation-tab/profile-navigation";
import GeneralProfile from "./component/general-profile/index";
import AccountRole from "./component/account-role/index";
import AccountLog from "./component/account-log/index";

const Profile = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const formik = useFormik({
    initialValues: {
      status: "Active",
      userID: "1234567890",
      clientID: "1234567890",
      userName: "John Doe",
      fullName: "",
      dialCode: "+62",
      phoneNumber: "85156075344",
      email: "",
      photo: "",
      role: "",
      accessLevel: "",
      createdDate: "",
      createdBy: "",
      updatedDate: "",
      updatedBy: "",
      lastLogin: "",
      lastLoginIP: "",
      lastLoginDevice: "",
      lastLoginLocation: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const sections = [
    { id: "general-profile", title: "General Profile" },
    { id: "account-role", title: "Account Role" },
    { id: "account-log", title: "Account Log" },
  ];

  const setValue = async (label: string, value: any) => {
    await formik.setValues({
      ...formik.values,
      [label]: value,
    });
  };

  return (
    <div className="flex flex-1 min-h-0 bg-white rounded-lg overflow-hidden max-h-[calc(100vh-200px)]">
      {/* Left Sidebar - Navigation */}
      <div className="hidden lg:block flex-shrink-0">
        <div className="h-full pr-8">
          <ProfileNavigation
            sections={sections}
            targetRef={scrollContainerRef}
          />
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
        <div className="py-6 px-6">
          <div className="max-w-4xl space-y-8">
            {/* General Profile */}
            <div id="general-profile">
              <GeneralProfile formik={formik} setValue={setValue} />
            </div>

            {/* Account Role */}
            <div id="account-role">
              <AccountRole formik={formik} setValue={setValue} />
            </div>

            {/* Account Log */}
            <div id="account-log">
              <AccountLog formik={formik} setValue={setValue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
