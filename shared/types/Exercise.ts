export type Exercise = {
  id: string;
  name: string;
  instruction: string;
  answer?: string;
  defaultCode: string;
  language: "javascript" | "typescript";
};
