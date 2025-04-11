
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpDown,
  Users,
  UserCheck,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialCustomers = [
  {
    id: 1,
    name: "Ahmed Mohammed",
    email: "ahmed@example.com",
    phone: "966-55-123-4567",
    location: "Riyadh",
    status: "Active",
    orders: 12,
    lastPurchase: "2025-03-15",
  },
  {
    id: 2,
    name: "Sara Ali",
    email: "sara@example.com",
    phone: "966-50-987-6543",
    location: "Jeddah",
    status: "Active",
    orders: 8,
    lastPurchase: "2025-04-02",
  },
  {
    id: 3,
    name: "Mohammed Khalid",
    email: "mohammed@example.com",
    phone: "966-54-111-2222",
    location: "Dammam",
    status: "Inactive",
    orders: 3,
    lastPurchase: "2025-01-20",
  },
  {
    id: 4,
    name: "Fatima Abdullah",
    email: "fatima@example.com",
    phone: "966-56-333-4444",
    location: "Mecca",
    status: "Active",
    orders: 15,
    lastPurchase: "2025-03-28",
  },
  {
    id: 5,
    name: "Omar Saeed",
    email: "omar@example.com",
    phone: "966-59-555-6666",
    location: "Medina",
    status: "Inactive",
    orders: 0,
    lastPurchase: "-",
  },
];

const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  location: z.string().min(2, { message: "Location is required" }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<typeof initialCustomers[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      icon: <Users className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Active Customers",
      value: customers.filter(c => c.status === "Active").length,
      icon: <UserCheck className="h-4 w-4 text-green-500" />,
      color: "bg-green-50"
    },
    {
      title: "New Customers (This Month)",
      value: 3,
      icon: <UserPlus className="h-4 w-4 text-purple-500" />,
      color: "bg-purple-50"
    },
  ];

  const onSubmit = (data: CustomerFormValues) => {
    const newCustomer = {
      id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      status: "Active",
      orders: 0,
      lastPurchase: "-",
    };
    
    setCustomers([...customers, newCustomer]);
    toast({
      title: "Customer Added",
      description: "Customer has been added successfully",
    });
    setIsAddCustomerOpen(false);
    form.reset();
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: "Customer Deleted",
      description: "Customer has been deleted successfully",
    });
  };

  const handleViewCustomer = (customer: typeof initialCustomers[0]) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

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
            <h1 className="text-2xl font-bold ml-4">Customer Management</h1>
          </div>
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
                <CardTitle>Customer List</CardTitle>
                <CardDescription>View and manage all customers</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search customers"
                    className="pl-8 pr-4 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => setIsAddCustomerOpen(true)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add Customer</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center justify-end">
                        <span>Orders</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No customers found
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
                          <Badge variant={customer.status === "Active" ? "default" : "outline"}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-right">
                            <div>{customer.orders}</div>
                            <div className="text-xs text-gray-500">
                              Last order: {customer.lastPurchase}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewCustomer(customer)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              Delete
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

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Customer information and purchase history
              </DialogDescription>
            </DialogHeader>
            
            {selectedCustomer && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between gap-2 items-center">
                          <span className="font-bold">{selectedCustomer.name}</span>
                          <Badge variant={selectedCustomer.status === "Active" ? "default" : "outline"}>
                            {selectedCustomer.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Purchase Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{selectedCustomer.orders}</span>
                          <span className="text-gray-600">Number of Orders</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{selectedCustomer.lastPurchase}</span>
                          <span className="text-gray-600">Last Order</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">$950</span>
                          <span className="text-gray-600">Average Order Value</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedCustomer.orders > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>#1089</TableCell>
                            <TableCell>2025-03-15</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>$850</TableCell>
                            <TableCell>
                              <Badge>Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>#1045</TableCell>
                            <TableCell>2025-02-28</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>$1,200</TableCell>
                            <TableCell>
                              <Badge>Completed</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>#1023</TableCell>
                            <TableCell>2025-02-10</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>$750</TableCell>
                            <TableCell>
                              <Badge>Completed</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No previous orders for this customer
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex justify-start mt-2">
                  <Button 
                    onClick={() => setIsDetailsOpen(false)}
                    variant="outline"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter the details of the new customer
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddCustomerOpen(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Customer</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Customers;
