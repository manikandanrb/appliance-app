import { Appliances, Header } from '@/components';
import { useAppliances } from '@/hooks/useAppliances';
import { DOWNLOADSTATUSCOLOR } from '@/utils/constants';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { appliances, deviceDownloadStatuses } = useAppliances();
  return (
    <div className="h-vh">
      <Header />
      <main className="flex flex-col gap-4 p-5">
        <div className="flex p-4 bg-white rounded-lg gap-4">
          {deviceDownloadStatuses &&
            Object.keys(deviceDownloadStatuses).map((status: string) => (
              <div key={`index-${status}`} className="flex flex-row gap-2 items-center">
                <div className={`w-2.5 h-2.5 rounded ${DOWNLOADSTATUSCOLOR[status]}`}></div>
                <div className="text-sm">
                  {deviceDownloadStatuses[status]} {status}
                </div>
              </div>
            ))}
        </div>
        <Appliances appliances={appliances || []} />
      </main>
    </div>
  );
}
