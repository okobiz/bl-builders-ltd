// import { useForm } from "react-hook-form";
// import { useAddContactMutation } from "../../../redux/features/contact/contactApi";
// import toast from "react-hot-toast";

// const ServiceContact = () => {
//   const [addContact] = useAddContactMutation();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = async (data) => {
//     try {
//       const response = await addContact(data).unwrap(); // Ensure promise resolves
//       if (response) {
//         toast.success("Your message has been sent successfully!", {
//           position: "top-right",
//           style: {
//             background: "#244436",
//             color: "#fff",
//           },
//         });
//         // Optional: Reset form fields
//         reset();
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.", {
//         position: "top-right",
//         style: {
//           background: "#F56565",
//           color: "#fff",
//         },
//       });
//     }
//   };
//   return (
//     <div className="border border-[#F5FDF8] rounded px-4 py-4">
//       <h2 className="text-base font-medium">Add Your Information</h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-4 flex flex-col gap-3"
//       >
//         <div>
//           <input
//             {...register("name", { required: true })}
//             className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
//             type="text"
//             placeholder="Name"
//           />
//           {errors.name && (
//             <span className="text-[red]">Name field is required</span>
//           )}
//         </div>

//         <div>
//           <input
//             {...register("phone", {
//               required: true,
//               pattern: /^[0-9]{11}$/,
//             })}
//             className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
//             type="tel"
//             placeholder="Phone"
//           />
//           {errors.phone && errors.phone.type === "required" && (
//             <span className="text-[red]">Phone field is required</span>
//           )}
//           {errors.phone && errors.phone.type === "pattern" && (
//             <span className="text-[red]">
//               Phone number must be exactly 11 digits
//             </span>
//           )}
//         </div>

//         <div>
//           <input
//             {...register("email", {
//               required: true,
//               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             })}
//             className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
//             type="email"
//             placeholder="Email"
//           />
//           {errors.email && errors.email.type === "required" && (
//             <span className="text-[red]">Email field is required</span>
//           )}
//           {errors.email && errors.email.type === "pattern" && (
//             <span className="text-[red]">
//               Please enter a valid email (must contain @ and .com)
//             </span>
//           )}
//         </div>

//         <div>
//           <textarea
//             {...register("message", { required: true })}
//             className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
//             placeholder="Your messages"
//             cols="30"
//             rows="6"
//           ></textarea>
//           {errors.message && (
//             <span className="text-[red]">Message field is required</span>
//           )}
//         </div>

//         <div>
//           <input
//             className="px-2 py-2 border bg-[#244436] hover:bg-[#4eb67d] duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
//             type="submit"
//             value="GET QUOTE"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ServiceContact;

import { useForm } from "react-hook-form";
import { useAddContactMutation } from "../../../redux/features/contact/contactApi";
import toast from "react-hot-toast";
import { useState } from "react";

const ServiceContact = () => {
  const [addContact] = useAddContactMutation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await addContact(data).unwrap(); // Ensure promise resolves
      if (response) {
        toast.success("Your message has been sent successfully!", {
          position: "top-right",
          style: {
            background: "#244436",
            color: "#fff",
          },
        });
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        style: {
          background: "#F56565",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-[#F5FDF8] rounded px-4 py-4">
      <h2 className="text-base font-medium">Add Your Information</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-3"
      >
        {loading ? (
          <div className="animate-pulse flex flex-col gap-3">
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-400 rounded"></div>
          </div>
        ) : (
          <>
            <div>
              <input
                {...register("name", { required: true })}
                className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-[red]">Name field is required</span>
              )}
            </div>

            <div>
              <input
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]{11}$/,
                })}
                className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
                type="tel"
                placeholder="Phone"
              />
              {errors.phone && errors.phone.type === "required" && (
                <span className="text-[red]">Phone field is required</span>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <span className="text-[red]">
                  Phone number must be exactly 11 digits
                </span>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
                type="email"
                placeholder="Email"
              />
              {errors.email && errors.email.type === "required" && (
                <span className="text-[red]">Email field is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-[red]">
                  Please enter a valid email (must contain @ and .com)
                </span>
              )}
            </div>

            <div>
              <textarea
                {...register("message", { required: true })}
                className="px-2 py-2 border border-[#244436] rounded bg-[#F5FDF8] outline-none w-full"
                placeholder="Your messages"
                cols="30"
                rows="6"
              ></textarea>
              {errors.message && (
                <span className="text-[red]">Message field is required</span>
              )}
            </div>

            <div>
              <input
                className="px-2 py-2 border bg-[#244436] hover:bg-[#4eb67d] duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
                type="submit"
                value="GET QUOTE"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ServiceContact;
