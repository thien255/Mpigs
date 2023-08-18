interface User {
  Id?: number;
  UserName?: String;
  Password?: String;
  FullName?: String;
  FistName?: String;
  LastName?: String;
  Email?: String;
  EmailConfirmed?: Boolean;
  PhoneNumber?: number;
  PhoneNumberConfirmed?: Boolean;
  TwoFactorEnabled?: Boolean;
  LockoutEnabled?: Boolean;
  Culture?: String;
  IsActive?: Boolean;
  IsDelete?: Boolean;
  CreatedOn?: Date;
  CreatedBy?: String;
  LatestUpdatedOn?: Date;
  LatestUpdatedBy?: String;
}
export default User;
