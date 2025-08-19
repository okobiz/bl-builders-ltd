// /* eslint-disable no-unused-vars */
// import { useParams } from "react-router-dom";
// import PagesHead from "../../utilits/PagesHead";
// import TabTitle from "../../utilits/TabTitle";
// import { useGetSingleCareerQuery } from "../../redux/features/career/careerApi";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import { useAddApplicationMutation } from "../../redux/features/applied/appliedApi";

// const AppiliedPage = () => {
//   const [addApplication] = useAddApplicationMutation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const id = useParams();
//   const { data: info } = useGetSingleCareerQuery(id);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = async (data) => {
//     try {
//       const response = await addApplication(data).unwrap();
//       if (response) {
//         toast.success("Your message has been sent successfully!", {
//           position: "top-right",
//           style: {
//             background: "#244436",
//             color: "#fff",
//           },
//         });
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
//     <div>
//       <TabTitle title={info?.data?.title || "Loading..."} />
//       <PagesHead
//         title={info?.data?.title || "Loading..."}
//         subTitle={info?.data?.title || "Loading..."}
//       />

//       <div className="container">
//         <h2 className="text-2xl font-semibold text-[#262626]/90">
//           Job title : {info?.data?.title}
//         </h2>

//         <div className="mt-10">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col gap-4"
//           >
//             <div>
//               <input
//                 {...register("name", { required: true })}
//                 className="px-4 py-2 border rounded outline-none w-full"
//                 type="text"
//                 placeholder="Name"
//               />
//               {errors.name && (
//                 <span className="text-[red]">Name field is required</span>
//               )}
//             </div>
//             <div>
//               <input
//                 {...register("email", {
//                   required: true,
//                   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 })}
//                 className="px-4 py-2 border rounded outline-none w-full"
//                 type="email"
//                 placeholder="Email"
//               />
//               {errors.email && errors.email.type === "required" && (
//                 <span className="text-[red]">Email field is required</span>
//               )}
//               {errors.email && errors.email.type === "pattern" && (
//                 <span className="text-[red]">
//                   Please enter a valid email (must contain @ and .com)
//                 </span>
//               )}
//             </div>
//             <div>
//               <input
//                 {...register("phone", {
//                   required: true,
//                   pattern: /^[0-9]{11}$/,
//                 })}
//                 className="px-2 py-2 border rounded outline-none w-full"
//                 type="tel"
//                 placeholder="Phone"
//               />
//               {errors.phone && errors.phone.type === "required" && (
//                 <span className="text-[red]">Phone field is required</span>
//               )}
//               {errors.phone && errors.phone.type === "pattern" && (
//                 <span className="text-[red]">
//                   Phone number must be exactly 11 digits
//                 </span>
//               )}
//             </div>

//             <div>
//               <label>Upload Resume/CV</label>
//               <input
//                 {...register("pdf[0]", { required: true })}
//                 type="file"
//                 className="px-2 py-2 border rounded outline-none w-full mt-1"
//                 accept="application/pdf"
//               />
//               {errors.pdf && (
//                 <span className="text-[red]">Resume/Cv is required</span>
//               )}
//             </div>

//             <div>
//               <input
//                 className="px-2 py-2 border bg-[#244436] hover:bg-[#4eb67d] duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
//                 type="submit"
//                 value="Send Resume/CV"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppiliedPage;

/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import PagesHead from "../../utilits/PagesHead";
import TabTitle from "../../utilits/TabTitle";
import { useGetSingleCareerQuery } from "../../redux/features/career/careerApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAddApplicationMutation } from "../../redux/features/applied/appliedApi";

const AppliedPage = () => {
  const [addApplication] = useAddApplicationMutation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const { data: info } = useGetSingleCareerQuery(id || "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("pdf", data.pdf[0]);

    try {
      const response = await addApplication(formData).unwrap();
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
    }
  };
  return (
    <div>
      <TabTitle title={info?.data?.title || "Loading..."} />
      <PagesHead
        title={info?.data?.title || "Loading..."}
        subTitle={info?.data?.title || "Loading..."}
      />

      <div className="container">
        <h2 className="text-2xl font-semibold text-[#262626]/90">
          Job title : {info?.data?.title}
        </h2>

        <div className="mt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            encType="multipart/form-data"
          >
            <div>
              <input
                {...register("name", { required: true })}
                className="px-4 py-2 border rounded outline-none w-full"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-[red]">Name field is required</span>
              )}
            </div>
            <div>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                className="px-4 py-2 border rounded outline-none w-full"
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
              <input
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]{11}$/,
                })}
                className="px-2 py-2 border rounded outline-none w-full"
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
              <label>Upload Resume/CV</label>
              <input
                {...register("pdf", { required: true })}
                type="file"
                className="px-2 py-2 border rounded outline-none w-full mt-1"
                accept="application/pdf"
              />
              {errors.pdf && (
                <span className="text-[red]">Resume/CV is required</span>
              )}
            </div>

            <div>
              <input
                className="px-2 py-2 border bg-[#244436] hover:bg-[#4eb67d] duration-300 rounded outline-none w-full text-[#fff] cursor-pointer"
                type="submit"
                value="Send Resume/CV"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppliedPage;
