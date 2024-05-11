import { apiClient } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useApplianceById = (applianceId: number) => {
  const getAppliances = async (applianceId: number) => {
    return await apiClient().getApplianceById(applianceId);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['appliances', applianceId],
    queryFn: () => getAppliances(applianceId),
    refetchOnWindowFocus: false,
  });

  return {
    appliance: data,
    isLoading,
  };
};

export { useApplianceById };
