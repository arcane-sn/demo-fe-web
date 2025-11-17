import { getDummyProductsServer } from "../actions/server.actions";
import { QueryRequestProvider } from "../providers/QueryRequestProvider";
import { DummyListContentClient } from "./dummy-list-content-client";

interface DummyListContentServerProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function DummyListContentServer({
  searchParams,
}: DummyListContentServerProps) {
  // Convert searchParams to filters
  const filters = {
    category: searchParams.category as string,
    brand: searchParams.brand as string,
    search: searchParams.search as string,
    priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
    priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
    rating: searchParams.rating ? Number(searchParams.rating) : undefined,
    limit: searchParams.limit ? Number(searchParams.limit) : 10,
    skip: searchParams.skip ? Number(searchParams.skip) : 0,
  };

  // Fetch data server-side (no network request visible to client)
  const result = await getDummyProductsServer(filters);

  return (
    <QueryRequestProvider initialParams={filters}>
      <DummyListContentClient
        initialData={result.success ? result.data : null}
        initialError={result.success ? null : result.error || null}
      />
    </QueryRequestProvider>
  );
}
