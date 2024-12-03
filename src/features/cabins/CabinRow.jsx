import styled from "styled-components";
import { formatCurrency } from "../.././utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  width: 6.5rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

//// if you delete the cabin w/o invalidating the cache/data then ui will not update, and you can not delete the cabin which has id stored in the bookings table
// function CabinRow({ cabin }) {
//   const [showForm, setShowForm] = useState(false);
//   const { deleteCabin, isDeleting } = useDeleteCabin();
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name}</Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         <Discount>{formatCurrency(discount)}</Discount>
//         <Row type="horizontal">
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <button onClick={() => setShowForm((prev) => !prev)}>
//             <HiPencil />
//           </button>
//           <button
//             size="small"
//             onClick={() => deleteCabin(cabinId)}
//             disabled={isDeleting}
//           >
//             <HiTrash />
//           </button>
//         </Row>
//       </TableRow>
//       {showForm && <CreateCabinForm cabinToEdit={cabin} />}
//     </>
//   );
// }

// export default CabinRow;

////*************  Lets re-use the modal for the editing/deleting

// function CabinRow({ cabin }) {
//   const { deleteCabin, isDeleting } = useDeleteCabin();
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name}</Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         <Discount>{formatCurrency(discount)}</Discount>
//         <Row type="horizontal">
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>
//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>
//             <Modal.Open>
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>
//             <Modal.Window>
//               <ConfirmDelete
//                 resourseName="cabin"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//         </Row>
//       </TableRow>
//     </>
//   );
// }

// export default CabinRow;

////*************************************************** Building Reusable context menu
// Now, just like before with the modal, We will have many of these menus on the page and therefore many toggles and many lists. And so therefore, we will have to connect this toggle with this list again so that we know that this exact toggle should then open up this list.
// So previously we used the name and the opens prop, but here let's make it a bit more simple and simply use an ID.
// Go to menus.jsx implement all these

// function CabinRow({ cabin }) {
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <Table.Row>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Open opens="delete">
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="cabin"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={cabinId} />
//             <Menus.List id={cabinId}>
//               <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
//                 Duplicate
//               </Menus.Button>
//               <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
//               <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//             </Menus.List>
//           </Menus.Menu>
//         </div>
//       </Table.Row>
//     </>
//   );
// }

// export default CabinRow;

////************************* lets handle edit/delete

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      regularPrice,
      maxCapacity,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name} </Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
