
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ShoppingBag, Settings, Users, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const features = [
    {
      title: "Price Calculator",
      icon: Calculator,
      description: "Calculate product prices with taxes, shipping, and discounts",
      link: "/calculator",
      color: "bg-blue-100"
    },
    {
      title: "Products",
      icon: ShoppingBag,
      description: "Manage products and inventory",
      link: "/products",
      color: "bg-green-100"
    },
    {
      title: "Customers",
      icon: Users,
      description: "Customer database and relationship management",
      link: "/customers",
      color: "bg-purple-100"
    },
    {
      title: "Settings",
      icon: Settings,
      description: "Store settings and user account",
      link: "/settings",
      color: "bg-gray-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">StoreMate</h1>
            <p className="text-gray-600">Your complete store management system</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </Link>
          </div>
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
