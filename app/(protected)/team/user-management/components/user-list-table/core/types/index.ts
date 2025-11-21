export interface UserData {
  id: string;
  [key: string]: any;
  userID: string;
  name: string;
  email: string;
  userName: string;
  phoneNumber: string;
  accessLevel: string;
  role: string;
  clientID: string;
  accountStatus: "active" | "inactive";
  failedLoginAttempt: number;
  loginDate: string;
  createdDate: string;
  updateDate: string;
}
