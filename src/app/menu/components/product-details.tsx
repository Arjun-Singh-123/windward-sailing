import React from "react";

const ProductDetail = ({ product }) => {
  console.log("product.......", product);
  if (!Array.isArray(product) || product.length === 0) {
    return <div>No product details available.</div>;
  }

  return (
    <div className="space-y-10">
      {product?.map((product) => (
        <div key={product.id} className="max-w-screen-lg mx-auto p-6 space-y-6">
          {/* Hero Image */}
          <div>
            <img
              src={product.hero_image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Title, Subtitle, Description */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <h2 className="text-xl text-gray-600">{product.subtitle}</h2>
            <p className="text-lg">{product.description}</p>
          </div>

          {/* Icon and Amenities */}
          <div className="flex justify-center items-center space-x-4">
            <img src={product.icon} alt="Product Icon" className="w-12 h-12" />
            <div>
              <h3 className="font-bold">Amenities:</h3>
              <ul className="list-disc pl-6">
                {product.amenities?.features.map((feature, index) => (
                  <li key={index}>
                    {feature.key}: {feature.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-center font-bold mb-4">
              Exterior and Interior Images
            </h3>
            <div className="flex space-x-4 justify-center">
              {product.images?.exterior.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Exterior ${index}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
            <div className="flex space-x-4 justify-center mt-4">
              {product.images?.interior.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Interior ${index}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-bold text-center">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(
                ([specType, specDetails], index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{specType}:</h4>
                    {Object.entries(specDetails).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
