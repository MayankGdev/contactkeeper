import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filtered, clearFilter, filterContacts } = contactContext;

  const text = useRef("");
  useEffect(() => {
    if (filtered === "") {
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='filter contacts.....'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
