import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'store';
import { getBuildingInfo } from 'apis/api';
import ImageLayout from 'components/commons/ImageLayout';
import PopupCard from './PopupCard';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
];

const BuildingTab = (props: { id: number }) => {
  const { id } = props;
  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
  }));

  const { data: buildingInfo } = useQuery({
    queryKey: ['buildingInfo', id],
    queryFn: () => getBuildingInfo(id),
  });

  useEffect(() => {
    if (!buildingInfo || !map) {
      return;
    }

    const coord = buildingInfo.coord.split(',');
    const position = new window.kakao.maps.LatLng(
      Number(coord[0]) + 0.0002,
      coord[1],
    );

    const bound = new window.kakao.maps.LatLngBounds();
    bound.extend(position);
    map.panTo(bound);

    const infoWindow = new window.kakao.maps.InfoWindow({
      map,
      position,
      content: buildingInfo.name,
    });

    return () => {
      infoWindow.close();
    };
  }, [map, buildingInfo]);

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-24'>
      <ImageLayout imageUrls={MOCK_BUILDING_IMAGE_URLS} />
      <h2 className='text-28 font-800'>{buildingInfo?.name}</h2>
    </div>
  );
};

export default BuildingTab;
