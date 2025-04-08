
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // For now, just show a toast notification since there's no backend
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "سيتم توفير التحقق من الهوية قريبًا",
    });

    // Navigate to calculator page (would be handled by auth in the future)
    window.location.href = "/calculator";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-right">إنشاء حساب جديد</CardTitle>
          <p className="text-sm text-muted-foreground text-right">
            أدخل بياناتك لإنشاء حساب جديد لمتجرك
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-right">
              <Label htmlFor="store-name" className="text-right block">اسم المتجر</Label>
              <Input
                id="store-name"
                placeholder="اسم متجرك الإلكتروني"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                dir="rtl"
                required
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email" 
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="rtl"
                required
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="rtl"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> إنشاء حساب
            </Button>
            <div className="text-center text-sm">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
