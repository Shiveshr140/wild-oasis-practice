import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

// // lets create temprory state for show form
// function Cabins() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <Row>
//       <Row type="horizontal">
//         <Heading as="h1">All cabins</Heading>
//         <p>Filter/Sort</p>
//       </Row>
//       <CabinTable />
//       <Button onClick={() => setShowForm((prev) => !prev)}>Add to cabin</Button>
//       {showForm && <CreateCabinForm />}
//     </Row>
//   );
// }

// export default Cabins;

//// lets create AddCabin.jsx
// function Cabins() {
//   return (
//     <Row>
//       <Row type="horizontal">
//         <Heading as="h1">All cabins</Heading>
//         <p>Filter/Sort</p>
//       </Row>
//       <CabinTable />
//       <AddCabin />
//     </Row>
//   );
// }

// export default Cabins;

////****************************** Filter

function Cabins() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <CabinTable />
      <AddCabin />
    </Row>
  );
}

export default Cabins;
