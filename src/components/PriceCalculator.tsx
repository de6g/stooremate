
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calculator } from 'lucide-react';

const PriceCalculator = () => {
  const { toast } = useToast();
  const [productPrice, setProductPrice] = useState<string>('');
  const [shippingCost, setShippingCost] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<string>('');
  const [taxPercentage, setTaxPercentage] = useState<string>('');
  
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  
  // Calculation logic
  useEffect(() => {
    try {
      const price = parseFloat(productPrice) || 0;
      const shipping = parseFloat(shippingCost) || 0;
      const discount = parseFloat(discountPercentage) || 0;
      const tax = parseFloat(taxPercentage) || 0;
      
      // Calculate price after discount
      const priceAfterDiscount = price * (1 - discount / 100);
      setDiscountedPrice(priceAfterDiscount);
      
      // Calculate tax
      const taxValue = priceAfterDiscount * (tax / 100);
      setTaxAmount(taxValue);
      
      // Calculate final total
      const total = priceAfterDiscount + taxValue + shipping;
      setFinalTotal(total);
      
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check the entered values",
        variant: "destructive",
      });
    }
  }, [productPrice, shippingCost, discountPercentage, taxPercentage, toast]);
  
  // Format number for display
  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-calculator-light">
      <CardHeader className="bg-gradient-to-r from-calculator to-calculator-dark text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">E-commerce Price Calculator</CardTitle>
          <Calculator size={28} />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productPrice">Product Price</Label>
          <Input
            id="productPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="shippingCost">Shipping Cost</Label>
          <Input
            id="shippingCost"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter shipping cost"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
          <Input
            id="discountPercentage"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter discount percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
          <Input
            id="taxPercentage"
            type="number"
            min="0"
            step="0.1"
            placeholder="Enter tax percentage"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-6 flex flex-col space-y-2">
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-600">Total after discount:</span>
          <span className="font-semibold">{formatNumber(discountedPrice)}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-600">Tax amount:</span>
          <span className="font-semibold">{formatNumber(taxAmount)}</span>
        </div>
        <div className="w-full flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
          <span className="text-lg font-bold text-calculator-dark">Final total:</span>
          <span className="text-lg font-bold text-calculator">{formatNumber(finalTotal)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
