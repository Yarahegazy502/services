// navbar
export interface Links {
  id?: number | null;
  title: string | null;
  name: string;
  route: string | null;
}

// userInfo
export interface UserInfo {
  id?: number | null;
  photo: string;
  full_name: string;
}
