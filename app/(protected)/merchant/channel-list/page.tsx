import { Container } from '@/components/common/container';
import { ChannelListContent } from './components/channel-list-content';

/**
 * Server Component Page
 * Wrapper for Channel List page - all interactive logic is in Client Component
 */
export default async function ChannelListPage() {
  return (
    <Container>
      <div className="py-6">
        <ChannelListContent />
      </div>
    </Container>
  );
}
