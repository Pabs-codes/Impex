import express from "express";
import fileUpload from "express-fileupload";
import productsRouter from "./routes/products.js";
import productImagesRouter from "./routes/productImages.js";
import categoryRouter from "./routes/category.js";
import mainImageRouter from "./routes/mainImages.js";
import userRouter from "./routes/users.js";
import searchRouter from "./routes/search.js";
import orderRouter from "./routes/customer_orders.js";
import orderProductRouter from "./routes/customer_order_product.js";
import slugRouter from "./routes/slugs.js";
import wishlistRouter from "./routes/wishlist.js";
import cors from "cors";
import logger from "morgan";
import {globalErrorHandler} from "./utills/helpers.js";

const app = express();

app.use(express.json(), logger("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(fileUpload({ createParentPath: true }));

app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", productImagesRouter);
app.use("/api/main-image", mainImageRouter);
app.use("/api/users", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/orders", orderRouter);
app.use('/api/order-product', orderProductRouter);
app.use("/api/slugs", slugRouter);
app.use("/api/wishlist", wishlistRouter);

app.use(globalErrorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
