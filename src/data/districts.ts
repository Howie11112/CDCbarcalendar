export interface District {
  zh: string;
  en: string;
}

export const districts: District[] = [
  { zh: '锦江区', en: 'Jinjiang District' },
  { zh: '青羊区', en: 'Qingyang District' },
  { zh: '金牛区', en: 'Jinniu District' },
  { zh: '武侯区', en: 'Wuhou District' },
  { zh: '成华区', en: 'Chenghua District' },
  { zh: '高新区', en: 'High-tech Zone' },
  { zh: '温江区', en: 'Wenjiang District' },
  { zh: '郫都区', en: 'Pidu District' },
  { zh: '龙泉驿区', en: 'Longquanyi District' },
  { zh: '青白江区', en: 'Qingbaijiang District' },
  { zh: '新都区', en: 'Xindu District' }
];

export function getDistrictTranslation(districtZh: string): string {
  const district = districts.find(d => d.zh === districtZh);
  return district ? district.en : districtZh;
}

export function getDistrictTranslationZh(districtEn: string): string {
  const district = districts.find(d => d.en === districtEn);
  return district ? district.zh : districtEn;
} 