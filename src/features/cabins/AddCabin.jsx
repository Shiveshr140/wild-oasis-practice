import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((prev) => !prev)}>
//         Add new cabin
//       </Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default AddCabin;

////******************  Lets convert modal into commpound component
// If you see in AddCabin.jsx how can we connect that event handler now at button in <Modal.Open> <Button>
// so we need to solve this problem. So again, what we need to do is now a way of adding that open event handler to this button, so to the children prop of open. So basically adding this function here to the children. And the way we can do this is by using
// a pretty advanced React function called cloneElement. So first of all, here we see that cloneElement is pretty uncommon. And so one thing that's important to mention here is that you should not overuse the technique that we are going to implement here soon.
// But anyway, this technique can still be pretty useful because the clone elements basically allows us to create a new React element based on another one. So we in the element, and then we can pass in props,
// which will solve our problem here in our case. And it's the reason why we're going to use this. So instead of children, we will clone the children. So we will basically create a new version of the children but with new props. And so those props will contain the onClick prop.
// And then this onClick prop will become a function that actually opens a modal window. So this function will then call open with the opens prop. So let's actually maybe change this here
// to make it a bit more explicit. So opensWindowName.
// const clonedElement = cloneElement(element, props, ...children)

// You may notice styling is again off because remeber type prop in createcabinform i.e if onCloseModal then it is "modal"  otherwise "regular" as onCloseModal no longer exist
// fix this again with cloneElement

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
