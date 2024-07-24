 import { Link, useNavigate } from "react-router-dom";
 import { useState } from "react";
 import { Button } from "./ui/button";
 import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
 } from "./ui/card";
 import { Input } from "./ui/input";
 import { Label } from "./ui/label";

 export function Register() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState(""); 
   const [description, setDescription] = useState("");
   const [telephone, settelephone] = useState("");
   const [cv, setCv] = useState(null);
   const [image, setImage] = useState(null);
   const [message, setMessage] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (event) => {
     event.preventDefault();

     const formData = new FormData();
     formData.append("first_name", firstName);
     formData.append("last_name", lastName);
     formData.append("email", email);
     formData.append("password", password);
     formData.append("confirm_password", confirmPassword); // Ajouté
     formData.append("description", description);
     formData.append("telephone", telephone);
     if (cv) {
       formData.append("cv", cv);
     }
     if (image) {
      formData.append("image", image); // Append image to form data
    }
     try {
       const response = await fetch("http://localhost:8000/register/", {
         method: "POST",
         body: formData,
       });

       if (!response.ok) {
         const errorData = await response.json();
         setMessage("Error: " + JSON.stringify(errorData));
         return;
       }

       const data = await response.json();
       if (data.success) {
         navigate("/login");
       } else {
         setMessage("Error: " + JSON.stringify(data.errors));
       }
     } catch (error) {
       setMessage("Error during request: " + error.message);
     }
   };

   return (
     <div className="mt-10">
       {" "}
       {}
       <Card className="mx-auto max-w-sm">
         <form onSubmit={handleSubmit}>
           <CardHeader>
             <CardTitle className="text-xl">Sign Up</CardTitle>
             <CardDescription>
               Enter your information to create an account
             </CardDescription>
           </CardHeader>
           <CardContent>
             <div className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label htmlFor="first-name">First name</Label>
                   <Input
                     id="first-name"
                     placeholder="First Name"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     required
                   />
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="last-name">Last name</Label>
                   <Input
                     id="last-name"
                     placeholder="Last Name"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                   />
                 </div>
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="email">Email</Label>
                 <Input
                   id="email"
                   type="email"
                   placeholder="m@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="password">Password</Label>
                 <Input
                   id="password"
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
               </div>
              <div className="grid gap-2">
                 <Label htmlFor="confirm-password">Confirm Password</Label>{" "}
                 {/* Ajouté */}
                 <Input
                   id="confirm-password"
                   type="password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   required
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="description">Description</Label>
                 <Input
                   id="description"
                   placeholder="Enter your description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="Telephone">Telephone</Label>
                 <Input
                   id="telephone"
                   placeholder="Enter your phone number"
                   value={telephone}
                   onChange={(e) => settelephone(e.target.value)}
                 />
               </div>
               
               <div className="grid gap-2">
                 <Label htmlFor="cv">Upload CV</Label>
                 <Input
                   id="cv"
                   type="file"
                   onChange={(e) => setCv(e.target.files[0])}
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="image">Upload Image</Label>
                 <Input
                   id="image"
                   type="file"
                   onChange={(e) => setImage(e.target.files[0])}
                 />
               </div>
               <Button type="submit" className="w-full">
                 Create an account
               </Button>
             </div>
             <div className="mt-4 text-center text-sm">
               Already have an account?{" "}
               <Link to="/login" className="underline">
                 Sign in
               </Link>
             </div>
             {message && <p className="text-danger mt-3">{message}</p>}
           </CardContent>
         </form>
       </Card>
     </div>
   );
 }

 export default Register;