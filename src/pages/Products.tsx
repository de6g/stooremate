
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search, Tag, Package, Trash2, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddProductDialog from "@/components/AddProductDialog";
import { toast } from "sonner";

// Mock data for products
const initialProducts = [
  {
    id: "1",
    name: "T-shirt - Cotton Classic",
    price: 29.99,
    category: "Clothing",
    stock: 42,
    status: "In Stock"
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    stock: 18,
    status: "In Stock"
  },
  {
    id: "3",
    name: "Professional Camera Lens",
    price: 349.99,
    category: "Photography",
    stock: 5,
    status: "Low Stock"
  },
  {
    id: "4",
    name: "Fitness Smartwatch",
    price: 199.99,
    category: "Wearables",
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "5",
    name: "Notebook - Premium",
    price: 14.99,
    category: "Stationery",
    stock: 120,
    status: "In Stock"
  }
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const handleAddProduct = (productData: {
    name: string;
    price: number;
    category: string;
    stock: number;
  }) => {
    const newProduct = {
      id: `${products.length + 1}`,
      ...productData,
      status: productData.stock === 0 ? "Out of Stock" : productData.stock < 10 ? "Low Stock" : "In Stock"
    };
    setProducts([...products, newProduct]);
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
            <h1 className="text-2xl font-bold ml-4">Product Management</h1>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </header>

        {/* Product statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                across {Array.from(new Set(products.map(p => p.category))).length} categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.stock > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.stock < 10 && p.stock > 0).length} products low in stock
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.stock === 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need attention soon
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Products table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Product Inventory</div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          <Tag className="mr-1 h-3 w-3" />
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            product.status === "In Stock" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : product.status === "Low Stock" 
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No products found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <AddProductDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default Products;
