import { useQuery } from '@tanstack/react-query';
import useInitMap from 'hooks/map/useInitMap';
import { getBuildings } from 'apis/api';
import Tab from 'components/pages/map/Tab';

const Map = () => {
  const { data: buildings } = useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildings,
  });

  useInitMap(buildings);

  return (
    <div className='relative flex h-[calc(100dvh-72px)] w-screen justify-end overflow-hidden'>
      <Tab />
      <div id='map' className='h-full w-full' />
    </div>
  );
};

export default Map;
