function usePaymentConfirmation() {
    const getPaymentStatus = () => {
      if (typeof window !== "undefined") {
        const savedPaymentStatus = localStorage.getItem("paymentConfirmed");
        return savedPaymentStatus === "true"; 
      }
      return false; 
    };
  
    const confirmPayment = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("paymentConfirmed", "true"); 
      }
    };
  
    const resetPaymentConfirmation = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("paymentConfirmed"); 
      }
    };
  
  
  
    return {
      getPaymentStatus,
      confirmPayment,
      resetPaymentConfirmation,
    };
  }
  
  export default usePaymentConfirmation;