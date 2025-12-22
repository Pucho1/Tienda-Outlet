import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const GoBackBtn = () => {

  const navigate = useNavigate();

    const goBack = (): void => { navigate(-1) };
  return (
    <button
        onClick={goBack}
        className="flex px-6 items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
      </button>
  );
};

export default GoBackBtn;