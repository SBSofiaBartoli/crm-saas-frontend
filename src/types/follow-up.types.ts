export interface FollowUp {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  clientId: string;
  client?: {
    id: string;
    name: string;
    company: string | null;
  };
}
