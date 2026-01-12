
const useProducts = () => {

/**
 * 
 * @param index 
 * @param setValue 
 * @param watch 
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeImage = (index: any, setValue: any, watch: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("images", watch().images.filter((_: any, i: any) => i !== index));
  };

  /**
   * Me analiza si una URL es válida mediante el constructor URL.
   * @param url Url a analizar.
   * @returns Devulve a true si la imagen existe, false en caso contrario.
   */
  const isValidUrl = (url: string) => {
     try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Verifica si una imagen existe en la URL proporcionada.
   * @param url URL de la imagen a verificar.
   * @returns Promesa que resuelve a true si la imagen existe, false en caso contrario.
   */
  const imageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);

      img.src = url;
    });
  };

  return { removeImage, isValidUrl, imageExists };
};

export default useProducts;
