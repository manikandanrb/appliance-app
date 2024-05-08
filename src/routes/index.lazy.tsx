import Header from '@/components/header';
import TailwindTable from '@/components/table';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <br />
      <main>
        <TailwindTable />
      </main>
    </>
  );
}
