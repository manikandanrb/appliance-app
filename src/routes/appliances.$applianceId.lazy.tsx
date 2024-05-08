import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/appliances/$applianceId')({
  component: ApplianceView,
});

function ApplianceView() {
  const { applianceId } = Route.useParams();
  console.log(applianceId);
  return <div>View</div>;
}
