interface AccountDetailsSection {
  // component: (closeDialog: any) => JSX.Element;
  title: string;
  sections: Array<{ id: string; title: string }>;
}

const accountDetailsSection: AccountDetailsSection[] = [
  {
    title: "Account Detail",
    sections: [
      { id: "general-profile", title: "General Profile" },
      { id: "account-role", title: "Account Role" },
      { id: "password", title: "Password" },
      { id: "pin", title: "6-Digit PIN" },
      { id: "account-log", title: "Account Log" },
      { id: "delete-account", title: "Delete Account" },
    ],
  },
];

export { accountDetailsSection, type AccountDetailsSection };
