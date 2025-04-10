
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpDown,
  Users,
  UserCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "966-55-123-4567",
    location: "الرياض",
    status: "نشط",
    orders: 12,
    lastPurchase: "2025-03-15",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@example.com",
    phone: "966-50-987-6543",
    location: "جدة",
    status: "نشط",
    orders: 8,
    lastPurchase: "2025-04-02",
  },
  {
    id: 3,
    name: "محمد خالد",
    email: "mohammed@example.com",
    phone: "966-54-111-2222",
    location: "الدمام",
    status: "غير نشط",
    orders: 3,
    lastPurchase: "2025-01-20",
  },
  {
    id: 4,
    name: "فاطمة عبدالله",
    email: "fatima@example.com",
    phone: "966-56-333-4444",
    location: "مكة",
    status: "نشط",
    orders: 15,
    lastPurchase: "2025-03-28",
  },
  {
    id: 5,
    name: "عمر سعيد",
    email: "omar@example.com",
    phone: "966-59-555-6666",
    location: "المدينة",
    status: "غير نشط",
    orders: 0,
    lastPurchase: "-",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats cards data
  const stats = [
    {
      title: "إجمالي العملاء",
      value: customers.length,
      icon: <Users className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "العملاء النشطين",
      value: customers.filter(c => c.status === "نشط").length,
      icon: <UserCheck className="h-4 w-4 text-green-500" />,
      color: "bg-green-50"
    },
    {
      title: "عملاء جدد (هذا الشهر)",
      value: 3,
      icon: <UserPlus className="h-4 w-4 text-purple-500" />,
      color: "bg-purple-50"
    },
  ];

  // Handle deleting a customer
  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: "تم حذف العميل",
      description: "تم حذف العميل بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-right">إدارة العملاء</h1>
          <p className="text-gray-600 text-right">إدارة وعرض بيانات عملاء المتجر</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>قائمة العملاء</CardTitle>
                <CardDescription>عرض وإدارة جميع العملاء</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="بحث عن عميل"
                    className="pl-8 pr-4 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>إضافة عميل</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">الاسم</TableHead>
                    <TableHead>معلومات الاتصال</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end">
                        <span>الطلبات</span>
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        لم يتم العثور على عملاء
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{customer.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.status === "نشط" ? "default" : "outline"}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-right">
                            <div>{customer.orders}</div>
                            <div className="text-xs text-gray-500">
                              آخر طلب: {customer.lastPurchase}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              حذف
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customers;
