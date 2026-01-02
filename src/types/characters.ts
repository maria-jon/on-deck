export type Character = {
  id: string;
  name: string;
  initiative: number | "";
  hp: number | "";
  ac: number | "";
  type: "pc" | "monster";
  hasActed: boolean;
};