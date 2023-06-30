import { Schema, Types } from "mongoose";

export interface User {
  createdAt?: string;
  firstName: string;
  lastName: string;
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
