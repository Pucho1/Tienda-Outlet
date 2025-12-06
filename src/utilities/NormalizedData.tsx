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

export default normalizedDataResponse;
