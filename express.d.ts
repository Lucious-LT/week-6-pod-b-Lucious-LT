import { Request } from "express";
export interface AuthenticatedRequest extends Request{
    user?: { AuthorId: number}; // Adjust the properties according to your user object
  }