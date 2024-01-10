import { Request } from "express";
export interface AuthenticatedRequest extends Request{
    user?: string; // Adjust the properties according to your user object
  }