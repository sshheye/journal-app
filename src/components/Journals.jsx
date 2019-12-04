import React from "react";
import Parser from "html-react-parser";
import "../styles/components/journals.scss";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
const Journals = props => {
  return (
    <div>
      {Object.keys(props.journals).map(key => (
        <Card key={key}>
          <Card.Body>
            {props.journals[key].journalContent
              ? Parser(props.journals[key].journalContent)
              : ""}
            {props.journals[key].journalDate}
            <DropdownButton
              id="dropdown-item-button"
              title="Dropdown button"
              size="sm"
            >
              <Dropdown.Item
                as="button"
                eventKey="1"
                onClick={() => props.handleEdit(props.journals[key].id)}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => props.handleDelete(props.journals[key].id)}
              >
                Delete
              </Dropdown.Item>
            </DropdownButton>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Journals;
