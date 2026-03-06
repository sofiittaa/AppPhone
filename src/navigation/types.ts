import { Product } from "../../services/ShopServices";

export type AppNavigationParamList = {
  Casa: undefined;
  Productos: undefined;
  Carrito: undefined;
  Perfil: undefined;
  vista: { product: Product };
  
};
