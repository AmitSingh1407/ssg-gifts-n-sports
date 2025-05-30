
import { useNavigate } from 'react-router-dom';

export const useHeaderNavigation = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    scrollToSection('products');
  };

  const goToDelivery = () => {
    navigate('/delivery');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToCustomerLogin = () => {
    navigate('/customer/login');
  };

  const goToAdminLogin = () => {
    navigate('/admin/login');
  };

  const goToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    scrollToSection,
    handleShopNow,
    goToDelivery,
    goToCart,
    goToCustomerLogin,
    goToAdminLogin,
    goToHome
  };
};
