import { useMutation } from '@tanstack/react-query';
import { NO_IMAGE_URL } from 'constants/common';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useBuildingImageUrls from 'hooks/useBuildingImageUrls';
import { postLikeToggle } from 'apis/api';
import Tag from 'components/commons/Tag';
import { IconBlankLike, IconRedLike } from 'public/icons';

const ListBuildingCard = (props: {
  id: number;
  name: string;
  address: string;
  isours: boolean;
  tag?: string;
  cate: string;
  img?: string | StaticImport;
  latest_end_date: Date | string;
}) => {
  const { id, name, address, isours, tag, cate, latest_end_date } = props;

  const imageUrls = useBuildingImageUrls(address);

  const isPopup = new Date(latest_end_date ?? '') > new Date();
  const parsedTags = tag === 'NULL' ? [] : tag?.split(',');

  const [isLike, setIsLike] = useState(false);
  const likeMutation = useMutation({
    // TODO: 각각의 빌딩의 유저id와 빌딩id 넣기
    // TODO: 하트 상태 관리
    mutationFn: () => postLikeToggle(1, 57),
  });

  // TODO: 옵티미스틱 업데이트 추가
  const handleClickLikeButton = () => {
    setIsLike(!isLike);
    likeMutation.mutate();
  };

  return (
    <Link
      href={`/list/${id}`}
      className='relative flex w-396 cursor-pointer flex-col text-start'
    >
      <div className='relative mb-20 h-352 w-full overflow-hidden rounded-12'>
        <Image
          src={imageUrls[0] ?? NO_IMAGE_URL}
          fill
          className='object-cover '
          alt='빌딩 이미지'
          quality={100}
        />
      </div>
      <button
        className='absolute right-20 top-20'
        onClick={handleClickLikeButton}
      >
        {isLike ? <IconRedLike /> : <IconBlankLike />}
      </button>
      <Description name={name} address={address} />
      <div className='flex flex-wrap gap-8'>
        {Boolean(isours) && <Tag type='직영' />}
        {isPopup && <Tag type='팝업진행중' />}
        <Tag type='카테고리' text={cate} />
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
      <div className='flex flex-wrap gap-8'></div>
    </Link>
  );
};

export default ListBuildingCard;

const Description = (props: { name: string; address: string }) => {
  const { name, address } = props;

  return (
    <div className='mb-12 flex flex-col gap-4'>
      <h3 className='text-20 font-700'>{name}</h3>
      <span className='text-16 text-gray-400'>{address}</span>
    </div>
  );
};
