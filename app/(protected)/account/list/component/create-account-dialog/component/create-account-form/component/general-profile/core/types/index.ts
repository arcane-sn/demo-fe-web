export interface GeneralProfileProps {
  groupValue: {
    userName: string;
    fullName: string;
    dialCode: string;
    phoneNumber: string;
    email: string;
  };
  setValue: (
    label: keyof GeneralProfileProps["groupValue"],
    value: string
  ) => void;
}
