export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  productName: string;
  brand: string;
  model: string;
  power: string;
  adapter: string;
  timeIsBattery: string;
  timeIsUse: string;
  manySpeaker: string;
  manyBass: string;
  treble: string;
  connectWireless: string;
  connectMicroWireless: string;
  connectOther: string;
  portWiredMicro: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  material: string;
  colorImg: string;
  frequency: string;
  price: number;
  quantity: number;
  status: StatusProduct["id"];
  image: Image["url"];
};

export type Image = {
  id: string;
  url: string;
};

export type SizeProduct = {
  id: string;
  nameSize: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  createdAt: string;
};

export type StatusProduct = {
  id: string;
  nameStatus: string;
  createdAt: string;
};
