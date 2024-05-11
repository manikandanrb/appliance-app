import { Breadcrumb, LoadingIndicator, Property, StatusButton } from '@/components';
import { useApplianceById } from '@/hooks/useApplinceById';
import { BreadcrumbItem, Button } from '@nextui-org/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Circle, PieChart } from 'lucide-react';

export const Route = createLazyFileRoute('/appliances/$applianceId')({
  component: ApplianceView,
});

function ApplianceView() {
  const { applianceId } = Route.useParams();
  const { appliance, isLoading } = useApplianceById(+applianceId);

  if (isLoading || !appliance) {
    return <LoadingIndicator />;
  }

  const properties = [
    {
      label: 'Device Serial',
      value: appliance?.serialNo,
    },
    {
      label: 'Location',
      value: appliance?.theatreName,
    },
    {
      label: 'City',
      value: `${appliance?.location?.city}, ${appliance?.location?.state}, ${appliance?.location?.country}`,
    },
    {
      label: 'ISP Payment Responsibility',
      value: 'Qube',
    },
    {
      label: 'Bandwidth',
      value: appliance?.bandwidth,
    },
    {
      label: 'Average Bandwidth',
      value: appliance?.avgBandwidth,
    },
    {
      label: 'Plan Start Date',
      value: '2021-09-01',
    },
    {
      label: 'Billing Cycle',
      value: 'Monthly',
    },
    {
      label: 'Download Status',
      value: appliance?.downloadStatus,
    },
    {
      label: 'OS Version',
      value: appliance?.osVersion,
    },
    {
      label: 'Storage Available',
      value: '828 GB',
    },
  ];

  return (
    <main className="h-screen">
      <Breadcrumb>
        <BreadcrumbItem classNames={{ item: ['text-md'] }} href="/">
          Devices
        </BreadcrumbItem>
        <BreadcrumbItem classNames={{ item: ['text-md'] }}>{appliance?.serialNo}</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex flex-col gap-3 bg-white p-6">
        <div className="flex flex-row justify-between">
          <div className="text-2xl text-[#2D3540]">{appliance?.serialNo}</div>
          <StatusButton />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[#2D3540]">{appliance?.theatreName}</div>
          <div className="text-[#69788C]">
            {appliance?.location?.city}, {appliance?.location?.state}, {appliance?.location?.country}
          </div>
        </div>
        <div className="flex gap-3 pb-5 border-b-2 border-b-[#F5F8FA]">
          <Button
            startContent={<Circle size={15} stroke="none" fill={appliance?.deviceStatus == 'Online' ? 'green' : 'red'} className="border-none" />}
            size="sm"
            radius="full"
            className="w-vw h-7 text-[#2D3540] bg-[#E6ECF0] font-medium"
          >
            {appliance?.deviceStatus}
          </Button>
          <Button startContent={<PieChart size={15} />} size="sm" radius="full" className="w-vw h-7 text-[#2D3540] bg-[#E6ECF0] font-medium">
            {appliance?.bandwidth}
          </Button>
        </div>
        <div className="flex flex-row gap-8 text-[#69788C]">
          <div>Details</div>
          <div>Content</div>
          <div>Bandwidth</div>
        </div>
      </div>
      <div className="m-6 p-6 bg-white">
        <div className="grid grid-cols-[repeat(auto-fill,330px)] gap-8">
          {properties.map((property, index) => (
            <div key={`property-${index}`}>
              <Property label={property?.label} value={property?.value} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
