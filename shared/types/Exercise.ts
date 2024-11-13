export type Exercise = {
  id: string;
  name: string;
  instructions: string;
  expected?: string;
  language: "javascript" | "typescript";
};
