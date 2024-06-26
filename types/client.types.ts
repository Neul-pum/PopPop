export interface PopupType {
  name: string;
  date: string;
  type: string;
}

export interface BuildingType {
  _id: number;
  name: string;
  address: string;
  coord: string;
  popups: PopupType[];
  tag: string;
  cate: CategoryType;
  isours: boolean;
  latest_end_date: Date;
}

export type CategoryType =
  | '패션'
  | '뷰티'
  | 'F&B'
  | '캐릭터'
  | '미디어'
  | '기타';

export interface PopulationType {
  areaName: string;
  updateTime: string;
  areaState: string;
  areaCongestionMessage: string;
  maleRate: string;
  femaleRate: string;
  ageTeenager: string;
  ageTwenties: string;
  ageThirties: string;
  ageForties: string;
  ageFifties: string;
  ageSixties: string;
  residentRate: string;
  noneResidentRate: string;
}

export type PopulationKeysType = keyof PopulationType;

export type AsType = '지역명' | '빌딩명' | '팝업명';

export type OrderType = 'new' | 'popular' | 'likes';

export interface BuildingDataType {
  연면적: number | null;
  용적률: number | null;
  건폐율: number | null;
  사용승인일: string | null;
  승강기: number | null;
}
