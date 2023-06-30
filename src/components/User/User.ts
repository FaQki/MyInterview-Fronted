import { Schema, Types } from "mongoose";

export interface User {
  createdAt?: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  email: string;
  updatedAt?: string;
  password: string;
  videos?: [];
  _id?: string;
  roles?: [
    {
      ref: "Rol";
      type: Schema.Types.ObjectId;
    }
  ];
}
