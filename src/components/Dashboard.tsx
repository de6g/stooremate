
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { MoreVertical, ChevronRight, ChevronDown, Phone, Lock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";

// Mock data for the chart
const chartData = [
  { name: 'Jun 1', value: 20000, value2: 18000 },
  { name: 'Jun 2', value: 35000, value2: 30000 },
  { name: 'Jun 3', value: 25000, value2: 22000 },
  { name: 'Jun 4', value: 38000, value2: 32000 },
  { name: 'Jun 5', value: 30000, value2: 27000 },
  { name: 'Jun 6', value: 45000, value2: 38000 },
  { name: 'Jun 7', value: 40000, value2: 35000 },
  { name: 'Jun 8', value: 50000, value2: 42000 },
];

// Mock data for orders
const orders = [
  { 
    id: 'N° 854323', 
    customer: 'Tommy Hatcher', 
    avatar: '/lovable-uploads/bd1c241f-7769-4d97-b9ad-77cde0601ff4.png', 
    date: 'Jun 23, 2019', 
    amount: '$165.32', 
    paymentMethod: 'PayPal' 
  },
  { 
    id: 'N° 854324', 
    customer: 'Lisa Ashton', 
    avatar: '/lovable-uploads/bd1c241f-7769-4d97-b9ad-77cde0601ff4.png', 
    date: 'Jun 24, 2019', 
    amount: '$332.45', 
    paymentMethod: 'VISA' 
  },
  { 
    id: 'N° 854325', 
    customer: 'Bob Morrison', 
    avatar: '/lovable-uploads/bd1c241f-7769-4d97-b9ad-77cde0601ff4.png', 
    date: 'Jun 25, 2019', 
    amount: '$165.90', 
    paymentMethod: 'PayPal' 
  },
];

// Mock data for recent orders
const recentOrders = [
  { price: '$165.32', item: 'Nike Air Max', icon: <Lock /> },
  { price: '$290.60', item: 'Purse', icon: <Lock /> },
  { price: '$830.00', item: 'Jacket Louis Vuitton', icon: <Lock /> },
  { price: '$90.10', item: 'New Balance 574', icon: <Lock /> },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <div className="flex">
        {/* Side Nav */}
        <div className="w-16 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-8">
          <div className="bg-blue-600 p-2 rounded-md">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
          </div>
          <div className="text-gray-500 p-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-8">
            <div className="text-gray-500">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            </div>
            <div className="text-gray-500">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path></svg>
            </div>
            <div className="text-gray-500">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b border-gray-800">
            <h1 className="text-xl font-medium">Dashboard</h1>
            <div className="flex items-center space-x-6">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">Account</button>
                <button className="text-gray-400 hover:text-white">Order History</button>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg">
                +
              </div>
            </div>
          </header>
          
          <div className="flex">
            {/* Main Dashboard */}
            <div className="flex-1 p-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-gray-800 border-gray-700 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">$1032.43</h2>
                      <p className="text-gray-400 text-sm">Daily revenue</p>
                    </div>
                    <div className="bg-green-800 bg-opacity-30 text-green-400 text-sm px-2 rounded">
                      +11%
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gray-800 border-gray-700 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">$12230.400</h2>
                      <p className="text-gray-400 text-sm">Total revenue</p>
                    </div>
                    <div className="bg-green-800 bg-opacity-30 text-green-400 text-sm px-2 rounded">
                      +22%
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gray-800 border-gray-700 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">732</h2>
                      <p className="text-gray-400 text-sm">Total customers</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Chart Section */}
              <Card className="mb-6 bg-gray-800 border-gray-700 text-white">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Revenue</h3>
                      <span className="text-xs text-gray-400">this week</span>
                    </div>
                    <div className="text-lg font-medium flex items-center space-x-2">
                      <div>Jun 6</div>
                      <MoreVertical size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold">$23,342</div>
                    <div className="text-2xl font-bold">$23,342</div>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid vertical={false} stroke="#444" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999' }} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 0 }} 
                          activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke="#6b7280" 
                          strokeWidth={2} 
                          strokeDasharray="3 3" 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Chart Details */}
                <div className="border-t border-gray-700 p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8 bg-gray-700">
                      <img src="/lovable-uploads/bd1c241f-7769-4d97-b9ad-77cde0601ff4.png" alt="Tim Snider" />
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span>Tim Snider</span>
                        <ChevronDown size={16} className="ml-2" />
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-400">$1230.400</span>
                        <span className="text-green-400 ml-2">+11%</span>
                      </div>
                      <span className="text-gray-400 text-xs">revenue</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-medium">14</div>
                    <div className="flex items-center text-sm">
                      <span className="text-red-400">-14%</span>
                    </div>
                    <span className="text-gray-400 text-xs">Processed applications</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Jun 5</span>
                    <button className="bg-blue-600 p-2 rounded-md">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </Card>
              
              {/* Orders Table */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium flex items-center">
                    Last orders
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </h3>
                  <MoreVertical size={20} className="text-gray-400" />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Order</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Sum</TableHead>
                      <TableHead className="text-gray-400">Payment method</TableHead>
                      <TableHead></TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, index) => (
                      <TableRow key={index} className="border-gray-700">
                        <TableCell className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8 bg-gray-700">
                            <img src={order.avatar} alt={order.customer} />
                          </Avatar>
                          <span>{order.customer}</span>
                        </TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>
                          <Phone size={16} className="text-green-400" />
                        </TableCell>
                        <TableCell>
                          <MoreVertical size={16} className="text-gray-400" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
            
            {/* Right Sidebar */}
            <div className="w-80 min-h-screen bg-gray-800 border-l border-gray-700 p-4">
              {/* User Profile */}
              <div className="mb-8">
                <div className="flex justify-end mb-4">
                  <button className="bg-gray-700 p-1 rounded text-xs px-2">Edit</button>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-14 w-14">
                    <img src="/lovable-uploads/bd1c241f-7769-4d97-b9ad-77cde0601ff4.png" alt="Tim Harrison" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Tim Harrison</h3>
                    <p className="text-gray-400 text-sm">Chicago, IL</p>
                  </div>
                  <Phone size={16} className="ml-auto text-green-400" />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Spend in total:</h3>
                    <MoreVertical size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold">$15,342</h2>
                    <ChevronDown size={16} className="ml-2" />
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Last orders</h3>
                    <button className="text-blue-400 text-sm">View all</button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="bg-gray-700 rounded-md p-3 flex items-center justify-between">
                        <div>
                          {order.icon}
                        </div>
                        <div className="flex-1 px-4">
                          <div className="font-medium">{order.price}</div>
                          <div className="text-sm text-gray-400">{order.item}</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
