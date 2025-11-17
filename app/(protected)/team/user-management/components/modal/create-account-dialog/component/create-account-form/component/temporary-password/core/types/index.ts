export interface TemporaryPasswordProps {
  groupValue: {
    passwordField: boolean;
    password: string;
    passwordConfirm: string;
  };
  setValue: (
    label: keyof TemporaryPasswordProps["groupValue"],
    value: any
  ) => void;
}
