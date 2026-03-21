export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  _count?: {
    interactions: number;
    followUps: number;
  };
}
