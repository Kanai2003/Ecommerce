const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
// "catchAsyncErrors" is for error handlling for "async"
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



// create product -- Admin
exports.createProduct = catchAsyncErrors(      
    async (req, res, next) => {
        req.body.user = req.user.id; 
        const product = await Product.create(req.body);
    
        res.status(201).json({  //201 means product was created
            success:true,
            product 
        });
    }
);


// get all products
exports.getAllProducts = catchAsyncErrors(
    async (req,res) => {

        const resultPerPage = 5;

        const productsCount = await Product.countDocuments();

        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFeatures.query;
        
        res.status(200).json({  //200 means everything is ok
            success:true,
            products,
            productsCount
        })
    }
)


// get  product details
exports.getProductDetails = catchAsyncErrors(
    async (req,res,next) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
          
        res.status(200).json({
            success: true,
            product, 
        })
    }
)


// update product -- Admin
exports.updateProduct = catchAsyncErrors(
    async (req,res,next) => {
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success: true,
            product
        })
    }
)


// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(
    async (req,res,next) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
        await product.deleteOne();
        res.status(200).json({
            success: true,
            message:"Product deleted successfully" 
        })
    }
)


// Create & update Review 
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});

// Get all reviews of a product 
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 401));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// Delete review
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 401));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );
   
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId, 
        {
            reviews,
            ratings,
            numOfReviews,
        },{
            new: true,
            runValidators: false,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
    });
}) 






