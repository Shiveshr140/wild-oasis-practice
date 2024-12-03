import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabin";
import Spinner from "../.././ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// function CabinTable() {
//   const {
//     data: cabins,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

//   console.log("data", cabins);
//   console.log("isLoadng", isLoading);
//   console.log("error", error);

//   if (isLoading) return <Spinner />;

//   return (
//     <Table role="table">
//       <TableHeader>
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </TableHeader>
//       {cabins.map((cabin) => (
//         <CabinRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   );
// }

// export default CabinTable;

////******************************************************* Building Reusable Table
// So basically, right now, this table is really not reusable, like we have, for example, like, these grid columns hardcoded right in the header, and I guess also in the row.So here we have the exact same columns again, so in both places and they are really this hardcoded. So this is going to make it really hard to reuse this table
// for something else. For example, for the bookings. So instead of having this table here, instead it would be really nice to simply pass the column definition like this one into the table, and then all of the rows in there, and also the header would automatically get access to the size of the columns.
// So how could we do something like this? Well, we can actually once again use a compound component. So as I have mentioned earlier, once you know about this pattern, you will start seeing use cases for it everywhere.
// First see Table.jsx export it, comment above table style

////************* Applying the Render Props Pattern
// Small use case of render props pattern is to implement table body which was left above
// we can do something like this
{
  /* <Table.Body>
  {cabins.map((cabin) => (
    <CabinRow cabin={cabin} key={cabin.id} />
  ))}
</Table.Body>; */
}

// Now, we could use this table body just like this, so we can do table.body and then place all the content in there. So, that would definitely be an option, and then in here, simply render the children prop. However, this is kind of ugly, I would say, and we can do it any much better way. So instead, what we want to do is, not this, but actually have this as a self-closing element. And then we simply want to pass in the cabins data. So here, let's say that the data is cabins
// and then we also need to pass in basically the instructions on how this table.body should actually render the data. And so that's where the render prop pattern comes into play. So again, right now we are passing the data into this table.body but it doesn't really know what to do with this data, right? I mean, it might know or it will know that this is an array,
// and so it'll probably loop over that array, but then it doesn't know what to do with it. And so again, here we can now specify the render prop. And so this is where we then tell the component what to do with each cabin. And so that's essentially this part right here. So, let's grab that and then we can get rid of this, and then I think that this looks a lot nicer, and a lot cleaner as well. So a lot more reusable even.

// function CabinTable() {
//   const {
//     data: cabins,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

//   if (isLoading) return <Spinner />;

//   return (
//     <Menus>
//       <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
//         <Table.Header>
//           <div></div>
//           <div>Cabin</div>
//           <div>Capacity</div>
//           <div>Price</div>
//           <div>Discount</div>
//           <div></div>
//         </Table.Header>
//         <Table.Body
//           data={cabins}
//           render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
//         />
//       </Table>
//     </Menus>
//   );
// }

// export default CabinTable;

////************************************ Filter/Sort

function CabinTable() {
  const [searchParams] = useSearchParams();
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  // 1.) filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2.) sort
  const sortValue = searchParams.get("sortBy") || "name-asc";
  let sortedCabins;
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
