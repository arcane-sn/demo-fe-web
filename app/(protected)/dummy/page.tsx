import { Container } from "@/components/common/container";
import { DummyListContentServer } from "./components/dummy-list-content-server";

interface DummyPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const DummyPage = async ({ searchParams }: DummyPageProps) => {
  const params = await searchParams;
  return (
    <Container>
      <DummyListContentServer searchParams={params} />
    </Container>
  );
};

export default DummyPage;
