
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ShoppingBag, Settings, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const features = [
    {
      title: "حاسبة الأسعار",
      icon: Calculator,
      description: "احسب أسعار منتجاتك مع الضرائب والشحن والخصومات",
      link: "/calculator",
      color: "bg-blue-100"
    },
    {
      title: "المنتجات",
      icon: ShoppingBag,
      description: "إدارة المنتجات والمخزون",
      link: "/products",
      color: "bg-green-100"
    },
    {
      title: "العملاء",
      icon: Users,
      description: "قاعدة بيانات العملاء وإدارة العلاقات",
      link: "/customers",
      color: "bg-purple-100"
    },
    {
      title: "الإعدادات",
      icon: Settings,
      description: "إعدادات المتجر وحساب المستخدم",
      link: "/settings",
      color: "bg-gray-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-right">لوحة تحكم المتجر</h1>
            <p className="text-gray-600 text-right">مرحبًا بك في نظام إدارة متجرك</p>
          </div>
          <Link to="/login">
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> تسجيل الخروج
            </Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className={`${feature.color} rounded-t-lg flex flex-row items-center justify-center p-6`}>
                  <feature.icon size={40} className="text-primary" />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
