import { AlertCircle } from "lucide-react";

const NoProducts = () => {
  return (

     <div className="col-span-full min-h-screen flex items-start justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-6 text-center">
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-black text-red-500 tracking-tight">
              ¡OOPS!
            </h1>
          </div>

          <div className="p-8 text-center">

            <div className="font-semibold space-y-4 mb-8 text-gray-500">
               <span >
                elputooutlet tiene problemas
              </span>
             <p>
                esto no mola 😒😒 pero lo vamos a arreglar 😎
              </p>
              
              <p className="font-semibold text-gray-700">
                porque somos losputosamos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProducts;
