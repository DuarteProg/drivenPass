import { ApplicationError } from "@/protocols";

export function hasnoid(): ApplicationError {
  return {
    name: "HasNoId",
    message: "withoutId",
  };
}
