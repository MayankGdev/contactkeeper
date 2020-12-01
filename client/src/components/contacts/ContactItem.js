import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, clearCurrent, setCurrent } = contactContext;
  const { name, email, phone, type, _id } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name} {""}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-sm btn-dark'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-sm btn-danger' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
