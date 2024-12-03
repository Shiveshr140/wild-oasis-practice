import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// // Instead of using tradition way of handling form I'm using React-Hook-Form
// // getValues will get the current value
// function CreateCabinForm() {
//   const { register, handleSubmit, reset, formState, getValues } = useForm();
//   const { errors } = formState;
//   // console.log("fserror", errors);

//   const queryClient = useQueryClient();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: createNewCabin,
//     onSuccess: () => {
//       alert("hi");
//       toast.success("New cabin successfully created");
//       reset();
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   function onSubmit(data) {
//     console.log("createCabinData", data);
//     mutate(data);
//   }

//   // Just to know, second arg(onError) will run if any of the validations fails, to get these error into application we have formState, errors from above and this error is same object
//   function onError(error) {
//     console.log("error", error);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//         />
//         {errors?.name?.message && <Error>{errors.name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Price should be atleast Rs500",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) => {
//               value <= getValues().regularPrice ||
//                 "Discount should be less than regular price";
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Edit cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////*********************** So many repeated things lets refactor it

// function CreateCabinForm() {
//   const { register, handleSubmit, reset, formState, getValues } = useForm();
//   const { errors } = formState;
//   // console.log("fserror", errors);

//   const queryClient = useQueryClient();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: createNewCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       reset();
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   function onSubmit(data) {
//     console.log("createCabinData", data);
//     // console.log("cabinImage", data.image[0]);
//     mutate({ data, image: data.image[0] });
//   }

//   // Just to know, second arg(onError) will run if any of the validations fails, to get these error into application we have formState, errors from above and this error is same object
//   function onError(error) {
//     console.log("error", error);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 500,
//               message: "Price should be atleast 500",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description" error={errors?.description?.message}>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Edit cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////*****************  Lets reuse createCabinForm for EditCabin also selectively
// // first modify the apiCabin
// // How to get data into the inputs there is a easy way using defaultValues in useForm

// function CreateCabinForm({ cabinToEdit = {} }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);

//   const { register, handleSubmit, reset, formState, getValues } = useForm({
//     defaultValues: isEditSession ? editValues : {},
//   });
//   const { errors } = formState;
//   // console.log("fserror", errors);

//   const queryClient = useQueryClient();
//   const { mutate: createCabin, isLoading: isCreating } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       reset();
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });
//   const { mutate: editCabin, isLoading: isEditing } = useMutation({
//     mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
//     onSuccess: () => {
//       toast.success("Cabin successfully edit");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       reset();
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   const isWorking = isEditing || isCreating;

//   // Now it's time to again account for the fact that the image can either be this string right here or it can be this object
//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     if (isEditSession) {
//       editCabin({ newCabinData: { ...data, image }, id: editId });
//     } else {
//       createCabin({ ...data, image: image });
//     }
//   }

//   // Just to know, second arg(onError) will run if any of the validations fails, to get these error into application we have formState, errors from above and this error is same object
//   function onError(error) {
//     console.log("error", error);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 500,
//               message: "Price should be atleast 500",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description" error={errors?.description?.message}>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditSession ? false : "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isWorking} type="submit">
//           {isEditSession ? "Edit cabin" : "Create new cabin"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////******************************* createCustom hooks
// useCreateCabin.jsx, only problem is with reset but react query has its sollution we can place this on success handler function not only right there but also right in the function where the mutation actually happens so all we need to do is to pass in an object of options and so then there we can do on success and then here we can very simply call the reset function
// and also this call back right here actually gets access to the data that the mutation function returns or in other words we can here get access to this new cabin data that we return right here

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log("fserror", errors);

  const isWorking = isEditing || isCreating;

  // Now it's time to again account for the fact that the image can either be this string right here or it can be this object
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // Just to know, second arg(onError) will run if any of the validations fails, to get these error into application we have formState, errors from above and this error is same object
  function onError(error) {
    console.log("error", error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 500,
              message: "Price should be atleast 500",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
