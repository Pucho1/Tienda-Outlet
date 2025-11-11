
import React from 'react';
import { User, Mail,  AtSign, VenusAndMars, UserCircle  } from 'lucide-react';

import Error from '../../components/Error';
import useUserPage from './useUserPage';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';

const UserPage: React.FC = () => {

  // const [showPassword, setShowPassword] = useState(false);
  const { t }  = useTranslation();
 
  const { userData, isLoading, error } = useUserPage();

  if (isLoading)  return ( <Loading /> );

  if (error) return ( <Error /> );

  if (!userData) return (<Error />);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 sm:p-6 lg:p-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 items-start">

        {/* Profile Summary */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full ring-4 ring-white/30">
              <User className="h-20 w-20 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">{userData.username} {t('PROFILE')}</h2>
            <p className="text-purple-200 mt-1 text-sm">{t('ACOUNT_OVERVIEW')}</p>
          </div>
          <div className="bg-gray-50 px-6 py-4 text-center text-gray-500 text-sm">
          {t('LAST_UPDATED')}: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-6">

          {/* User ID */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-600 font-semibold">{t('USER_ID')}</span>
              <span className="text-lg font-bold text-purple-800">#{userData.id}</span>
            </div>
          </div>

          {/* Full name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
              <UserCircle className="h-4 w-4 mr-2 text-purple-500" />
              {t('FULL_NAME')}
            </label>
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-gray-800">
              {userData.firstName} {userData.lastName}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
              <AtSign className="h-4 w-4 mr-2 text-purple-500" />
              {t('USER_NAME')}
            </label>
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-gray-800">
              {userData.username}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
              <Mail className="h-4 w-4 mr-2 text-purple-500" />
              {t('EMAIL_ADDRES')}
            </label>
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-gray-800">
              {userData.email}
            </div>
          </div>

          

          {/* GENDER */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
              <VenusAndMars  className="h-4 w-4 mr-2 text-purple-500" />
              {t('GENDER')}
            </label>
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-gray-800">
              {userData.gender}
            </div>
          </div>

          {/* Password */}
          {/* <div>
            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
              <Key className="h-4 w-4 mr-2 text-purple-500" />
              {t('PASSWORD')}
            </label>
            <div className="relative bg-white rounded-lg px-4 py-3 shadow-sm text-gray-800">
              {showPassword ? userData.password : '••••••••'}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
