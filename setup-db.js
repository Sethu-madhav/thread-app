// Drop existing collections if they exist
db.users.drop();
db.products.drop();
db.categories.drop();
db.orders.drop();
db.carts.drop();
db.reviews.drop();
db.payments.drop();
db.wishlists.drop();
db.promotions.drop();
db.inventory.drop();

// Create collections
db.createCollection("users");
db.createCollection("products");
db.createCollection("categories");
db.createCollection("orders");
db.createCollection("carts");
db.createCollection("reviews");
db.createCollection("payments");
db.createCollection("wishlists");
db.createCollection("promotions");
db.createCollection("inventory");

// Insert categories
db.categories.insertMany([
  {
    name: "Men's Clothing",
    description: "Clothing for men",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Women's Clothing",
    description: "Clothing for women",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Kids' Clothing",
    description: "Clothing for kids",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Accessories",
    description: "Fashion accessories",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Footwear",
    description: "Shoes and sandals",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sportswear",
    description: "Sports and activewear",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Outerwear",
    description: "Jackets and coats",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Formal Wear",
    description: "Formal clothing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Casual Wear",
    description: "Casual clothing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Swimwear",
    description: "Swimwear and beachwear",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Insert products
db.products.insertMany([
  {
    name: "Slim Fit Jeans",
    description: "Comfortable slim fit jeans for men",
    price: 49.99,
    salePrice: 39.99,
    category: "Men's Clothing",
    subCategory: "Jeans",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black", "Grey"],
    images: ["slim-fit-jeans-1.jpg", "slim-fit-jeans-2.jpg"],
    stock: 100,
    tags: ["denim", "casual", "men"],
    brand: "ZaraClone",
    material: "98% Cotton, 2% Elastane",
    careInstructions: "Machine wash cold",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Classic White Shirt",
    description: "A timeless white shirt for all occasions.",
    price: 29.99,
    salePrice: 24.99,
    category: "Men's Clothing",
    subCategory: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    images: ["classic-white-shirt-1.jpg", "classic-white-shirt-2.jpg"],
    stock: 50,
    tags: ["classic", "formal", "men"],
    brand: "ZaraClone",
    material: "100% Cotton",
    careInstructions: "Machine wash warm",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress.",
    price: 39.99,
    salePrice: 29.99,
    category: "Women's Clothing",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Yellow"],
    images: ["summer-dress-1.jpg", "summer-dress-2.jpg"],
    stock: 75,
    tags: ["summer", "casual", "women"],
    brand: "ZaraClone",
    material: "100% Cotton",
    careInstructions: "Machine wash cold",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add 17 more products with similar structure
]);

// Insert a user
db.users.insertOne({
  email: "bruce.wayne@example.com",
  password: "hashed_password_here",
  firstName: "Bruce",
  lastName: "Wayne",
  address: {
    street: "1007 Mountain Drive",
    city: "Gotham",
    state: "NJ",
    zipCode: "07001",
    country: "USA",
  },
  phoneNumber: "+1234567890",
  dateOfBirth: new Date("1980-02-19"),
  gender: "Male",
  preferences: {
    newsletter: true,
    language: "English",
    currency: "USD",
  },
  stripeCustomerId: "cus_987654321",
  loyaltyPoints: 200,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert a cart for the user
let userId = db.users.findOne({ email: "bruce.wayne@example.com" })._id;
let productId = db.products.findOne({ name: "Slim Fit Jeans" })._id;

db.carts.insertOne({
  userId: userId,
  items: [
    {
      productId: productId,
      quantity: 1,
      price: 39.99,
      size: "32",
      color: "Blue",
    },
  ],
  totalAmount: 39.99,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert an order for the user
db.orders.insertOne({
  userId: userId,
  orderNumber: "ORD-" + Date.now(),
  items: [
    {
      productId: productId,
      quantity: 1,
      price: 39.99,
      size: "32",
      color: "Blue",
    },
  ],
  totalAmount: 39.99,
  subtotal: 39.99,
  tax: 3.2,
  shippingCost: 5.0,
  discount: 0,
  shippingAddress: {
    street: "1007 Mountain Drive",
    city: "Gotham",
    state: "NJ",
    zipCode: "07001",
    country: "USA",
  },
  billingAddress: {
    street: "1007 Mountain Drive",
    city: "Gotham",
    state: "NJ",
    zipCode: "07001",
    country: "USA",
  },
  status: "processing",
  paymentMethod: "credit_card",
  paymentStatus: "paid",
  shippingMethod: "standard",
  estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert a review
db.reviews.insertOne({
  userId: userId,
  productId: productId,
  rating: 4,
  comment: "Great jeans, very comfortable!",
  title: "Comfortable and stylish",
  helpfulVotes: 5,
  verifiedPurchase: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert a payment
db.payments.insertOne({
  userId: userId,
  orderId: db.orders.findOne({ userId: userId })._id,
  amount: 39.99,
  currency: "USD",
  stripePaymentIntentId: "pi_123456789",
  stripeChargeId: "ch_123456789",
  status: "succeeded",
  paymentMethod: {
    type: "credit_card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2024,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert a wishlist
db.wishlists.insertOne({
  userId: userId,
  items: [productId],
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert promotions
db.promotions.insertMany([
  {
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    minPurchase: 100,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    usageLimit: 1000,
    usageCount: 0,
    appliesTo: {
      categories: ["Men's Clothing", "Women's Clothing"],
      excludedProducts: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "FREESHIP",
    type: "free_shipping",
    minPurchase: 50,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    usageLimit: null,
    usageCount: 0,
    appliesTo: {
      countries: ["USA", "Canada"],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Insert inventory records
db.inventory.insertOne({
  productId: productId,
  warehouseId: "WH001",
  quantity: 100,
  reservedQuantity: 5,
  lastStockUpdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Insert additional products
db.products.insertMany([
  {
    name: "Leather Jacket",
    description: "Stylish leather jacket for men.",
    price: 99.99,
    salePrice: 79.99,
    category: "Men's Clothing",
    subCategory: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    images: ["leather-jacket-1.jpg", "leather-jacket-2.jpg"],
    stock: 30,
    tags: ["leather", "jacket", "men"],
    brand: "ZaraClone",
    material: "100% Leather",
    careInstructions: "Dry clean only",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Floral Dress",
    description: "Beautiful floral dress for women.",
    price: 49.99,
    salePrice: 39.99,
    category: "Women's Clothing",
    subCategory: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
    images: ["floral-dress-1.jpg", "floral-dress-2.jpg"],
    stock: 60,
    tags: ["floral", "dress", "women"],
    brand: "ZaraClone",
    material: "100% Cotton",
    careInstructions: "Machine wash cold",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for all activities.",
    price: 59.99,
    salePrice: 49.99,
    category: "Footwear",
    subCategory: "Shoes",
    sizes: ["8", "9", "10", "11"],
    colors: ["Black", "White", "Grey"],
    images: ["running-shoes-1.jpg", "running-shoes-2.jpg"],
    stock: 80,
    tags: ["shoes", "running", "footwear"],
    brand: "ZaraClone",
    material: "Synthetic",
    careInstructions: "Wipe clean",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add 15 more products with similar structure
]);

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ stripeCustomerId: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ tags: 1 });
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ orderNumber: 1 }, { unique: true });
db.carts.createIndex({ userId: 1 }, { unique: true });
db.payments.createIndex({ stripePaymentIntentId: 1 }, { unique: true });
db.payments.createIndex({ orderId: 1 });
db.promotions.createIndex({ code: 1 }, { unique: true });
db.inventory.createIndex({ productId: 1, warehouseId: 1 }, { unique: true });

print("Enhanced database setup completed successfully!");
