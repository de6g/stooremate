
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Store, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [storeMode, setStoreMode] = useState<"online" | "offline">("online");
  
  const settingsSections = [
    {
      id: "profile",
      title: "الحساب الشخصي",
      description: "إدارة معلومات الحساب الشخصي",
      icon: User,
      color: "bg-blue-100"
    },
    {
      id: "store",
      title: "إعدادات المتجر",
      description: "تخصيص إعدادات المتجر والعرض",
      icon: Store,
      color: "bg-green-100"
    },
    {
      id: "notifications",
      title: "الإشعارات",
      description: "إدارة تفضيلات الإشعارات",
      icon: Bell,
      color: "bg-yellow-100"
    },
    {
      id: "security",
      title: "الأمان والخصوصية",
      description: "إدارة كلمة المرور وخيارات الأمان",
      icon: Shield,
      color: "bg-red-100"
    },
    {
      id: "billing",
      title: "الفواتير والمدفوعات",
      description: "إدارة طرق الدفع والاشتراكات",
      icon: CreditCard,
      color: "bg-purple-100"
    },
    {
      id: "help",
      title: "المساعدة والدعم",
      description: "الحصول على المساعدة واستكشاف الأخطاء",
      icon: HelpCircle,
      color: "bg-gray-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">إعدادات النظام</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-right">لوحة الإعدادات</CardTitle>
                <CardDescription className="text-right">إدارة جميع إعدادات المتجر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {settingsSections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className="w-full justify-between text-right flex-row-reverse"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`p-2 rounded-md ${section.color}`}>
                          <section.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {section.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            {/* Store Settings Preview */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex-grow text-right">
                    <CardTitle className="text-xl">حالة المتجر</CardTitle>
                    <CardDescription>التحكم في وضع عرض المتجر</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-1 text-right mr-2">
                    <div className="text-sm font-medium leading-none">
                      {storeMode === "online" ? "متاح للزيارة" : "غير متاح حالياً"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {storeMode === "online" ? "المتجر مفتوح للزوار والمبيعات" : "المتجر مغلق للصيانة"}
                    </div>
                  </div>
                  <Switch
                    checked={storeMode === "online"}
                    onCheckedChange={() =>
                      setStoreMode(storeMode === "online" ? "offline" : "online")
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Settings Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-right">إعدادات الحساب الشخصي</CardTitle>
                <CardDescription className="text-right">تحديث معلومات الملف الشخصي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-row-reverse justify-between">
                    <Label htmlFor="fullName" className="text-right">الاسم الكامل</Label>
                  </div>
                  <Input
                    id="fullName"
                    placeholder="أدخل اسمك الكامل"
                    className="text-right"
                    defaultValue="محمد أحمد"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-row-reverse justify-between">
                    <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="text-right"
                    defaultValue="example@email.com"
                  />
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button>حفظ التغييرات</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
