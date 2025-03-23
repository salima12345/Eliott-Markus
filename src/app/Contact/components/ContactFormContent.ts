import { Subject } from "@/types/enums";

export interface FormContent {
  title: string;
  messagePlaceholder: string;
}

export const getFormContent = (subject: Subject): FormContent => {
  switch (subject) {
    case Subject.Presse:
      return {
        title: "Vous souhaitez nous contacter ?",
        messagePlaceholder: "Coucou! Vous voulez faire un papier sur nous ?",
      };
    case Subject.Recrutement:
      return {
        title: "Rejoignez-nous",
        messagePlaceholder: "Racontez-nous votre histoire,vos espoirs, vos rêves...",
      };
    case Subject.Partenariat: 
      return {
        title: "Vous souhaitez nous contacter ?",
        messagePlaceholder: "Faisons plus ample connaissance!",
      };
    case Subject.Projet:
      return {
        title: "Vous souhaitez nous contacter ?",
        messagePlaceholder: "Parlez-nous de vous!",
      };
    default:
      return {
        title: "Would you like to contact us?",
        messagePlaceholder: "How can we help you?",
      };
  }
};