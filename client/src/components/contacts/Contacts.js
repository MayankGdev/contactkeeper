import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { getContacts, loading, contacts, filtered } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-next-line-disable
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add Contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
