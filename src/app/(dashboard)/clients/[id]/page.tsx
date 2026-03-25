import { ClientDetail } from "@/components/clients/ClientDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;
  return <ClientDetail clientId={id} />;
}
