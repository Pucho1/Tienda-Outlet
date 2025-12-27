import { Product } from "../interfaces/product";

const useMapers = () => {

	/**
	 * Mapea los datos del producto a los tipos correctos
	 * @param productData datos del producto sin mapear
	 * @returns los datos del producto mapeados correctamente
	 */
	const mapDataToProduct = (productData: Product): Product => {
		const newProduct = {
			...productData, 
			price: Number(productData?.price),
			quantity: Number(productData?.quantity),
			category: Number(productData?.category),
		};
		return newProduct as Product;
	};

	/**
	 * Normaliza los datos de respuesta del servidor.
	 * @param data 
	 * @returns 
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const normalizedDataResponse = (data: any) => {

		if(!data || !Array.isArray(data) || data.length <= 0){
			return data;
		}

		const fieldsToCheck = ['price'];

		const mapedData = [ ...data]

		fieldsToCheck.forEach( field => {
			mapedData.forEach( item => {
				if(item[field] && typeof item[field] === 'string') {
					item[field] = parseFloat(item[field]);
				}
			})
		})

		mapedData.forEach((item) => {
			item['images'] = item['images'].map((image: string) =>{ 
				return { original: image}
			})
		})

		return mapedData;
	};

  return {mapDataToProduct, normalizedDataResponse};
};

export default useMapers;
