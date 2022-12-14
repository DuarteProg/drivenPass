import { ApplicationError } from "@/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
};


export function duplicatedtitleError(): ApplicationError {
  return {
    name: "DuplicatedtitleError",
    message: "There is already an user with given title",
  };
}
