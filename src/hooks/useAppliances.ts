import { apiClient } from '@/api';
import { Appliance } from '@/api/services/appliances';
import { useQuery } from '@tanstack/react-query';

const useAppliances = () => {
  const getAppliances = async () => {
    return await apiClient().getAppliances();
  };

  const { data } = useQuery({ queryKey: ['appliances'], queryFn: getAppliances, refetchOnWindowFocus: false });

  const deviceDownloadStatuses = data?.reduce(
    (acc: Record<string, number>, curr: Appliance) => {
      if (acc[curr.downloadStatus]) {
        acc[curr.downloadStatus] += 1;
      } else {
        acc[curr.downloadStatus] = 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    appliances: data,
    deviceDownloadStatuses,
  };
};

export { useAppliances };
