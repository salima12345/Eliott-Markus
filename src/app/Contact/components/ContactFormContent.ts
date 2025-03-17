import { Subject } from "@/types/enums";

export interface FormContent {
  title: string;
  messagePlaceholder: string;
}

export const getFormContent = (subject: Subject): FormContent => {
  switch (subject) {
    case Subject.Press:
      return {
        title: "Would you like to contact us?",
        messagePlaceholder: "Hi there! Would you like to write about us?",
      };
    case Subject.Hiring:
      return {
        title: "Join us",
        messagePlaceholder: "Tell us your story, your hobbies, your dreams...",
      };
    case Subject.Partnership: 
      return {
        title: "Let's Collaborate",
        messagePlaceholder: "Let's get to know each other better!",
      };
    case Subject.Project:
      return {
        title: "Tell Us About Your Project",
        messagePlaceholder: "Tell us about yourself!",
      };
    default:
      return {
        title: "Would you like to contact us?",
        messagePlaceholder: "How can we help you?",
      };
  }
};