// import CreateAccountForm from "../component/create-account-form";

interface CreateAccountStep {
  // component: (closeDialog: any) => JSX.Element;
  title: string;
  sections: Array<{ id: string; title: string }>;
}

const createAccountStep: CreateAccountStep[] = [
  {
    title: "Business Info",
    sections: [
      { id: "general-profile", title: "General Profile" },
      { id: "account-role", title: "Account Role" },
      { id: "temporary-password", title: "Temporary Password" },
    ],
  },
];

export { createAccountStep, type CreateAccountStep };
