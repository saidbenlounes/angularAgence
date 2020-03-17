export interface Property {
  title: string;
  category:string;
  surface: string;
  rooms: string;
  description?:string; //? n'est pas obligatoire
  price: string;
  sold: boolean;
  photos?: any[];
}
