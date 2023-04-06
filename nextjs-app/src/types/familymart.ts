export type FamilymartData = {
  id: string; // "https://as.chizumaru.com/famima/detailMap?account=famima&bid=73361 のbidの部分(73361)",
  account: string; // "https://as.chizumaru.com/famima/detailMap?account=famima&bid=73361 のaccountの部分(famima)",
  name: string;
  address: string;
  telephone: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};
