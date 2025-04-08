
import React from "react";
import PriceCalculator from "@/components/PriceCalculator";
import { ArrowLeft, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> العودة للوحة التحكم
            </Button>
          </Link>
          <div className="flex items-center">
            <CalcIcon className="mr-2 h-6 w-6 text-calculator" />
            <h1 className="text-2xl font-bold">حاسبة الأسعار</h1>
          </div>
        </header>
        <PriceCalculator />
      </div>
    </div>
  );
};

export default Calculator;
