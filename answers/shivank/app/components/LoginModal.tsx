// "use client"
// import LoginBtn from "./client/LoginBtn";
// import UserLogin from "./client/UserLogin"
// import logo from "./logo.png";
// import React from "react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import { log } from "console";
// import Image from 'next/image'
// import {Input} from "@nextui-org/react";
// import { useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBWmC2tyAXLqePImH1Z6Ew6jDtpwSKa6xM",
//   authDomain: "lightningnodes-assignment.firebaseapp.com",
//   projectId: "lightningnodes-assignment",
//   storageBucket: "lightningnodes-assignment.appspot.com",
//   messagingSenderId: "754244979264",
//   appId: "1:754244979264:web:1c35935bda038c0e6f2da5",
//   measurementId: "G-53W4GG2E4G"
// };


// const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);




// export default function LoginModal() {
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// const handleSignIn = async (e) => {
//   e.preventDefault();
//   try {
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((err) => {
//       console.log(err.code);
//       console.log(err.message);
//     });
//     console.log("success");
//   } catch (error) {
//     console.log(error);
//   }
// };

  
  
//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 max-h-screen">
//     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//         <Image
//           className="w-8 h-8 mr-2"
//           src={logo}
//           alt="logo"
//           width={30}
//         />

//         LightningNodes

//         </a>
//         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                     Sign in to your account
//                 </h1>
//                 <form className="space-y-4 md:space-y-6 "onSubmit={handleSignIn}>
//                     <div>
//                         <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                         <Input type="email" name="email" id="email" classNameName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => setEmail(e.target.value)}/>
                      
//                     </div>
//                     <div>
//                         <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                         <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  onChange={(e) => setPassword(e.target.value)}/>
//                     </div>
//                     <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

//                     <div className="flex items-center justify-between">
                        
//                         <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        
//                     </div>
//                 </form>
//                 <LoginBtn />
//             </div>
//         </div>
//     </div>
//   </section>

//   );
// }


"use client"
import LoginBtn from "./client/LoginBtn";
import UserLogin from "./client/UserLogin"
import logo from "./logo.png";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { log } from "console";
import Image from 'next/image'
import {Input} from "@nextui-org/react";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { GetUserToken } from "@/app/libs/firebase/init";
import { CreateFirebaseSession } from "@/app/libs/firebase/server_apps/session_gen";

const firebaseConfig = {
  apiKey: "AIzaSyBWmC2tyAXLqePImH1Z6Ew6jDtpwSKa6xM",
  authDomain: "lightningnodes-assignment.firebaseapp.com",
  projectId: "lightningnodes-assignment",
  storageBucket: "lightningnodes-assignment.appspot.com",
  messagingSenderId: "754244979264",
  appId: "1:754244979264:web:1c35935bda038c0e6f2da5",
  measurementId: "G-53W4GG2E4G"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);




export default function LoginModal() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const User_Token = userCredential.user;
      // console.log(user);
      CreateFirebaseSession(User_Token);
      // ...
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

  
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900 max-h-screen">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Image
          className="w-8 h-8 mr-2"
          src={logo}
          alt="logo"
          width={30}
        />

        LightningNodes

        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6 "onSubmit={handleSignIn}>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <Input type="email" name="email" id="email" classNameName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => setEmail(e.target.value)}/>
                      
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                    <div className="flex items-center justify-between">
                        
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        
                    </div>
                </form>
                <LoginBtn />
            </div>
        </div>
    </div>
  </section>

  );
}
