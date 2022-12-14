import { ApplicationError } from "@/protocols";

export function conflictError(name: string, message: string): ApplicationError {
  return {
    name: "ConflictError",
    message: "You already have a credential",
  };
}
