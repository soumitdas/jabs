import React, { useEffect } from "react";

const CardModal = ({ handleClose, children }) => {
  useEffect(() => {
    document.documentElement.classList.toggle("is-clipped");
    return () => document.documentElement.classList.toggle("is-clipped");
  }, []);

  // <div className="modal is-active">
  //     <div className="modal-background" onClick={handleClose}></div>
  //     <div className="modal-card" style={{ width }}>
  //       {children}
  //     </div>
  //   </div>

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleClose}></div>
      {children}
    </div>
  );
};

// const CardModal = ({
//   title,
//   handleClose,
//   width = "640px",
//   submitText = "Save",
//   submitOnClick,
//   cancelText = "Cancel",
//   children,
// }) => {
//   useEffect(() => {
//     document.documentElement.classList.toggle("is-clipped");
//     return () => document.documentElement.classList.toggle("is-clipped");
//   }, []);

//   return (
//     <div className="modal is-active">
//       <div className="modal-background" onClick={handleClose}></div>
//       <div className="modal-card" style={{ width }}>
//         <header className="modal-card-head">
//           <p className="modal-card-title">{title}</p>
//           <button
//             onClick={handleClose}
//             className="delete"
//             aria-label="close"
//           ></button>
//         </header>
//         <form>
//           <section className="modal-card-body">{children}</section>
//           <footer className="modal-card-foot">
//             <button onClick={submitOnClick} className="button is-success">
//               {submitText}
//             </button>
//             <button onClick={handleClose} className="button">
//               {cancelText}
//             </button>
//           </footer>
//         </form>
//       </div>
//     </div>
//   );
// };

// const CardModal = ({
//   isOpen: open,
//   handleClose,
//   title,
//   width = "640px",
//   children,
// }) => {
//   const [open, setOpen] = useState(show);
//   toggleModal = () => {
//     document.documentElement.classList.toggle("is-clipped");
//     setOpen(!open);
//   };
//   return (
// <div className={open ? "modal is-active" : "modal"}>
//   <div className="modal-background" onClick={handleClose}></div>
//   <div className="modal-card" style={{ width }}>
//     <header className="modal-card-head">
//       <p className="modal-card-title">{title}</p>
//       <button
//         onClick={handleClose}
//         className="delete"
//         aria-label="close"
//       ></button>
//     </header>
//     <section className="modal-card-body">{open && children}</section>
//     <footer className="modal-card-foot">
//       <button className="button is-success">Save changes</button>
//       <button onClick={handleClose} className="button">
//         Cancel
//       </button>
//     </footer>
//   </div>
// </div>
//   );
// };

export default CardModal;
