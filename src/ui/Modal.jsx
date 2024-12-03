import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// React portal is a feature that essentially allows us to render an element outside of the parent component's DOM structure while still keeping the element in the original position of the component tree.
// So in other words, with a portal we can basically render a component in any place that we want inside the DOM tree but still leave the component at the same place in the React component tree.
// And so then things like props keep working normally. And so this is great and generally used for all elements that we want to stay on top of other elements. So things like modal windows, tool tips, menus and so on.

// So how we do it, So instead of just returning this JSX here we return the results of calling createPortal. So, createPortal. And this one is actually not part of React but of React DOM, which actually makes sense because this really is about placing some JSX in the DOM. Now then this function here receives as the first argument
// the JSX that we want to render. And then as the second argument, a DOM note where we want to render this JSX. And so let's just do this in the document body. And so that we can select
// simply by writing document.body. All right. But it could of course be also any other element as well and we could select it, for example, using document.querySelector or any other way. But anyway, let's now go back to just attaching this to the document body,
// even though some developers say that this is not ideal, but actually it does work just fine.

// now notice how the modal window is actually a direct child element of the body element. And so that's because we selected that body right here. And so the reason for that is that here we selected that body element to be the parent element of whatever we want to render.
// But now you might be wondering, this worked really great already in the beginning with just regular CSS positioning, so without the portal. And so why do we even need to use this portal? Well, the main reason why a portal becomes necessary
// is in order to avoid conflicts with the CSS property overflow set to hidden. So many times we build a component like a modal and it works just fine, but then some other developer will reuse it somewhere else and that somewhere else might be a place where the modal will get cut off
// by a overflow hidden set on the parent. So this is basically all about reusability and making sure that the component will never be cut off by an overflow property set to hidden on some parent element. So in order to avoid this kind of situation we simply render the modal completely outside of the rest of the DOM.

// function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={() => onClose}>
//           <HiXMark />
//         </Button>
//         {children}
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

////*************************************** Converting Modal into compound component & Detecting outside click
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

// one way of stop propogating the event ad event is also attached to the docs
// function Open({ children, opens: opensWithWindow }) {
//   const { open } = useContext(ModalContext);
//   return cloneElement(children, {
//     onClick: (e) => {
//       e.stopPropagation();
//       open(opensWithWindow);
//     },
//   });
// }
// other was to capture it in capturing phase which I am using
// Detail explaination of why we handled it in capturing phase so every event has three phases capture, target and bubble up so when we click add new cabin then w/o true then it is capturing phase it travel from root to target element that is button and event attached to button(onClick) will run it will open the modal window then event come in buble phase that it will travel from target to root then at rrot if condition will run as button is not the part styledModal so modal will closs immediately
// now with true then event will run in capture phase modal will not open then event travel to target onClick open the window then in bubble phase at the event is already removed it will not run again.

// // create context
// const ModalContext = createContext();

// // create parent
// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");
//   const close = () => setOpenName("");
//   const open = setOpenName;
//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// // create children
// function Open({ children, opens: opensWithWindow }) {
//   const { open } = useContext(ModalContext);
//   return cloneElement(children, {
//     onClick: () => open(opensWithWindow),
//   });
// }

// function Window({ children, name }) {
//   const { close, openName } = useContext(ModalContext);
//   const ref = useRef();
//   useEffect(
//     function () {
//       function handleClick(e) {
//         if (ref.current && !ref.current.contains(e.target)) {
//           console.log("clicked outside");
//           close();
//         }
//       }
//       document.addEventListener("click", handleClick, true);
//       return () => {
//         document.removeEventListener("click", handleClick, true);
//       };
//     },
//     [close]
//   );
//   if (name !== openName) return;
//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// // attach children to parent to achieve desire result
// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;

//// ********************* refactoring

// create context
const ModalContext = createContext();

// create parent
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// create children
function Open({ children, opens: opensWithWindow }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWithWindow),
  });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useClickOutside(close);
  if (name !== openName) return;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// attach children to parent to achieve desire result
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
