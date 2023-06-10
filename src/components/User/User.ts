import { Schema, Types } from "mongoose";

export interface User {
  createdAt?: string;
  username: string;
  email: string;
  updatedAt?: string;
  password: string;
  _id?: string;
  roles?: [
    {
      ref: "Rol";
      type: Schema.Types.ObjectId;
    }
  ];
}
