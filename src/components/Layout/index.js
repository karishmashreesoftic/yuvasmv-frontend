import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../main/Navbar";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const loginRoute =
    pathname.toLowerCase() === "/signup" || pathname.toLowerCase() === "/" || pathname.toLowerCase() === "/forgotpassword";
  return (
    <div className="container">
      {!loginRoute && <Navbar />}
      {children}
    </div>
  );
}

// function Test({ children }) {
//   return (
//     <div>
//       <br />
//       title: fgjsdfh
//       <br />
//       {children}
//       <br />
//       description: "sdfffffffffa"
//       <br />
//       <br />
//     </div>
//   );
// }

// const TestWrapper = () => {
//   return (
//     <>
//       <Test>
//         <span>sdfgdf</span>
//       </Test>
//       <Test>
//         <h2>dsfgidfjg</h2>
//       </Test>
//       <Test>
//         <h1>dfgjdhfgkj</h1>
//       </Test>
//     </>
//   );
// };
