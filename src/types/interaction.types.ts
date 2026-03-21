export interface Interaction {
  id: string;
  type: "call" | "meeting" | "message";
  summary: string;
  date: string;
  createdAt: string;
  clientId: string;
}
