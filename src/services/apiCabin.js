import supabase, { supabaseUrl } from "./supabase";

// get all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// delete a cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

// // create a newCabin
// export async function createNewCabin(newCabin) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([newCabin])
//     .select();
//   if (error) {
//     console.log(error);
//     throw new Error("Cabin could not be created");
//   }
//   return data;
// }

////*************** create a newCabin + image, upload image to storage
// // we need to create unique name of image that we are storing, rememeber any "/" will create a new directory so replace slashes
// // https://fgaiufdkufonrcaudzlm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-10-13T14%3A34%3A41.112Z
// // upload(imageName, newCabin.image): Works correctly because the actual image file is being uploaded.
// // upload(imageName, imagePath): Fails because it tries to upload a URL string, not the file data

// export async function createNewCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

//   // create cabin, single will be needed to get the object as return data instead of an array
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ newCabin, image: imagePath }])
//     .select()
//     .single();
//   if (error) {
//     console.log(error);
//     throw new Error("Cabin could not be created");
//   }

//   console.log("newCabinImage", newCabin.image);

//   // upload an image in storage
//   const { error: storageError } = await supabase.storage
//     .from("cabins-image")
//     .upload(imageName, newCabin.image);

//   // delete the cabin if image is not uploaded
//   if (error) {
//     console.log(storageError);
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error("Image could not be uploaded hence cabin was not created");
//   }

//   return data;
// }

////******************* Create/Edit cabin
// during edit we get url image and durimg create new cabin we get Filelist

export async function createEditCabin(newCabin, id) {
  // check if it is a string or file
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // create/edit
  let query = supabase.from("cabins");

  // create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit, update
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // edit/create, single will be needed to get the object as return data instead of an array
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  console.log("newCabinImage", newCabin.image);

  // upload an image in storage
  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);

  // delete the cabin if image is not uploaded
  if (error) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded hence cabin was not created");
  }

  return data;
}
