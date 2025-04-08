
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // For now, just show a toast notification since there's no backend
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "سيتم توفير التحقق من الهوية قريبًا",
    });

    // Navigate to calculator page (would be handled by auth in the future)
    window.location.href = "/calculator";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-right">تسجيل الدخول</CardTitle>
          <p className="text-sm text-muted-foreground text-right">
            أدخل بيانات الدخول للوصول إلى لوحة التحكم
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              <div className="flex justify-between">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
                <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
              </div>
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
              <LogIn className="mr-2 h-4 w-4" /> تسجيل الدخول
            </Button>
            <div className="text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="text-primary hover:underline">
                إنشاء حساب جديد
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
