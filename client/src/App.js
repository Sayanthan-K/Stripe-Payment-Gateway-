import "./App.css";
import { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const notify = () => toast("Wow so easy!");
  const [product] = useState({
    name: "Sample Book",
    price: 120,
    description: "This is a sample book",
  });

  // const handleToken = (token, addresses) => {
  //   const response = axios.post("http://localhost:8080/checkout", {
  //     token,
  //     product,
  //   });
  //   console.log(response.status);

  //   if (response.status === 200) {
  //     console.log("Success! Check email for details");
  //     toast("Success! Check email for details", { type: "success" });
  //     <ToastContainer />;
  //   } else {
  //     console.log("Something went wrong");
  //     toast("Something went wrong", { type: "error" });
  //     <ToastContainer />;
  //   }
  // };

  const handleToken = (token) => {
    axios
      .post("http://localhost:8080/checkout", { token, product })
      .then((res) => {
        if (res.status === 200) {
          toast("Success! Check email for details", { type: "success" });
          <ToastContainer />;
        } else {
          toast("Something went wrong", { type: "error" });
          <ToastContainer />;
        }
      })
      .catch((er) => {});
  };

  return (
    <div className="App">
      <div className="container">
        <br />
        <br />
        <h1 className="text-center">Stripe Checkout</h1>
        <br />
        <h2 className="text-center">Product Info</h2>
        <h3 className="text-center">Product Name: {product.name}</h3>
        <h3 className="text-center">Product Price: {product.price}</h3>
        <h3 className="text-center">
          Product Description: {product.description}
        </h3>
        <br />
        <div className="form-group container">
          <button onClick={notify}>Notify!</button>
          <ToastContainer />
          <br />
          <StripeCheckout
            description="Big Data Stuff"
            className="center"
            stripeKey="pk_test_51Kx6nmHWfJlN8CzRecv6ZVWZWpauup5Fo4deEtHS1bwcyp5SU1uI88kZL8cEl8GMwTN78m1xM5YJfasV02lsUAPA001KzQi2bZ"
            token={handleToken}
            amount={product.price * 200}
            name="Sample Book"
            email="project2020sliit@gmail.com"
            // billingAddress
            // shippingAddress
          />
        </div>
      </div>
    </div>
  );
}

export default App;
