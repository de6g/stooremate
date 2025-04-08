
import { PriceCalculator } from "@/components/PriceCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-calculator-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-calculator-dark mb-2">حاسبة المتجر الإلكتروني</h1>
          <p className="text-gray-600" dir="rtl">أداة بسيطة لحساب السعر النهائي للمنتجات تشمل الخصومات والضرائب والشحن</p>
        </header>
        
        <div className="mx-auto">
          <PriceCalculator />
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 حاسبة المتجر الإلكتروني - تعمل بدون اتصال بالإنترنت</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
