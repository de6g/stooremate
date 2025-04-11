
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
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [storeMode, setStoreMode] = useState<"online" | "offline">("online");
  const [activeTab, setActiveTab] = useState<string>("profile");
  const { toast } = useToast();
  
  const settingsSections = [
    {
      id: "profile",
      title: "Profile",
      description: "Manage your account information",
      icon: User,
      color: "bg-blue-100"
    },
    {
      id: "store",
      title: "Store Settings",
      description: "Customize store settings and display",
      icon: Store,
      color: "bg-green-100"
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage notification preferences",
      icon: Bell,
      color: "bg-yellow-100"
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Manage password and security options",
      icon: Shield,
      color: "bg-red-100"
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "Manage payment methods and subscriptions",
      icon: CreditCard,
      color: "bg-purple-100"
    },
    {
      id: "help",
      title: "Help & Support",
      description: "Get help and troubleshooting",
      icon: HelpCircle,
      color: "bg-gray-100"
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveTab(sectionId);
    toast({
      title: `Opened ${settingsSections.find(section => section.id === sectionId)?.title} section`,
      description: "Settings loaded successfully",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Changes saved",
      description: "Your profile information has been updated successfully",
    });
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
            <h1 className="text-2xl font-bold ml-4">System Settings</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Settings Panel</CardTitle>
                <CardDescription>Manage all store settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {settingsSections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={`w-full justify-between ${activeTab === section.id ? 'bg-muted' : ''}`}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-md ${section.color}`}>
                          <section.icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {section.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Profile</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="fullName">Full Name</Label>
                      </div>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        defaultValue="John Smith"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        defaultValue="example@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="phone">Phone Number</Label>
                      </div>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        defaultValue="+1 234 567 8900"
                      />
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="store">
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">Store Status</CardTitle>
                        <CardDescription>Control your store's display mode</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1 mr-2">
                        <div className="text-sm font-medium leading-none">
                          {storeMode === "online" ? "Available for visitors" : "Currently unavailable"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {storeMode === "online" ? "Store is open for visitors and sales" : "Store is closed for maintenance"}
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
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Store Settings</CardTitle>
                    <CardDescription>Customize your store settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="storeName">Store Name</Label>
                      </div>
                      <Input
                        id="storeName"
                        placeholder="Enter store name"
                        defaultValue="My E-commerce Store"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Store Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Notification Settings</CardTitle>
                    <CardDescription>Customize your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">New Order Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications for new orders
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Security & Privacy</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="currentPassword">Current Password</Label>
                      </div>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="newPassword">New Password</Label>
                      </div>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button>Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Billing & Payments</CardTitle>
                    <CardDescription>Manage payment methods and subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No payment methods added yet</p>
                      <Button className="mt-4">Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="help">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Help & Support</CardTitle>
                    <CardDescription>Get help and troubleshooting assistance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      <p className="text-muted-foreground">Find answers to common questions about using the system</p>
                      <Button variant="outline" className="w-full justify-start">View FAQs</Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Contact Us</h3>
                      <p className="text-muted-foreground">Reach out to our support team for assistance</p>
                      <Button variant="outline" className="w-full justify-start">Open Support Ticket</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
