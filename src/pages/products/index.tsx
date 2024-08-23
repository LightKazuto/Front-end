import React, { useEffect, useState } from "react";
import Modal from "../../components/popupCompenent";

const apiHeroku = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductData {
  id: number;
  image_url: string;
  product_name: string;
  price: number;
  stock: number;
  user_id: number;
  description: string;
  type: "standard" | "premium" | "eco_friendly";
}

interface ProductResponse {
  products: ProductData[];
}

export default function Products() {
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"user" | "seller" | "guest">(
    "guest"
  );
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<
    "standard" | "premium" | "eco_friendly" | "all"
  >("all");
  const [userId, setUserId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const getAllProducts = async () => {
    try {
      const response = await fetch(`${apiHeroku}/getallproduct`, {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API Products", result);
        setProducts(result);
      } else {
        throw new Error("Failed to get products!");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole") as
      | "user"
      | "seller"
      | "guest"
      | null;
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }

    const storedFromUserId = localStorage.getItem("fromUserId");
    if (storedFromUserId) {
      setUserId(Number(storedFromUserId));
    }
  }, []);

  const openModal = (product: ProductData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const createTransaction = () => {
    if (!selectedProduct) return null;

    return {
      id: selectedProduct.id,
      product_name: selectedProduct.product_name,
      to_user_id: localStorage.getItem("user_id"),
      from_user_id: selectedProduct.user_id,
      product_id: selectedProduct.id,
      product_quantity: 1,
      total_price: selectedProduct.price,
      status: "cart",
      type: selectedProduct.type,
    };
  };
  console.log(createTransaction());

  const filteredProducts = products?.products.filter(
    (product) => filterType === "all" || product.type === filterType
  );

  const formatPrice = (price: number) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) return "Invalid price";
    return numericPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    (filteredProducts?.length ?? 0) / productsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!products || !products.products) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full pt-10 bg-white relative inline-block pb-16">
      <div className="flex flex-col items-center gap-4 mb-6">
        <label htmlFor="filter" className="text-lg font-semibold">
          Filter by Type:
        </label>
        <select
          id="filter"
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value as "standard" | "premium" | "eco_friendly" | "all"
            )
          }
          className="px-4 py-2 w-40 rounded border border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500">
          <option value="all">All</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="eco_friendly">Eco Friendly</option>
        </select>
      </div>

      <div className="w-4/6 border-t-5 border-gray-300 shadow-2xl pt-10">
        <div className="bg-white w-4/4">
          <p className="text-3xl font-bold text-center text-gray-600 mt-[-20px]">
            Popular Products
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 p-10 mt-5">
          {currentProducts?.map((product) => (
            <div
              key={product.id}
              className={`bg-white shadow-xl rounded-lg transition-transform transform hover:scale-105 cursor-pointer relative`}
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
              onClick={() => product.stock > 0 && openModal(product)}>
              <img
                src={product.image_url}
                alt={product.product_name}
                className={`w-64 h-72 object-cover rounded-tr-custom-tr rounded-bl-custom-bl bg-custom-card ${
                  product.stock === 0 ? "filter grayscale" : ""
                }`}
              />
              {product.stock === 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Out of Stock
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-500 truncate">
                  {product.product_name}
                </h3>
                <p className="text-red-500 font-bold">
                  Rp {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        userRole={userRole}
      />
    </div>
  );
}
