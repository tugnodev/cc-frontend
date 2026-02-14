enum address {
  UADB = "UADB",
  UGB = "UGB",
  UCAD = "UCAD",
  UT = "UT",
  UASZ = "UASZ",
}

export interface createUserDto {
  name: string;
  email: string;
  password: string;
  address: address;
}

export interface turnToAdminDto {
  id: string;
  address: address;
  vendeur: boolean;
  code: number;
}

export interface updateUserDto {
  id: string;
  name?: string;
  email?: string;
  vendeur?: boolean;
  code?: number;
  address: address;
  image?: string;
}

export interface userDto {
  id: string;
  name: string;
  email: string;
  vendeur?: boolean;
  code?: number | null;
  address?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface userLoginDto {
  email: string;
  password: string;
}

export interface authPack {
  token: string | null;
  user: userDto;
}
