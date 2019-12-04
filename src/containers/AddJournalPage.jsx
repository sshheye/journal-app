import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RichEditor from "../components/RichEditor";
import { connect } from "react-redux";
import { postJournal } from "../actions";
function AddJournal(props) {
  const [journalContent, editJournalContent] = useState("");
  const handleEditorChange = data => {
    editJournalContent(data);
  };
  return (
    <Formik
      initialValues={{ date: "" }}
      onSubmit={(values, { setSubmitting }) => {
        props.postJournal({
          title: "test",
          journalContent: journalContent,
          journalDate: values.date,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label>Date</label>
          <Field type="date" name="date" />
          <ErrorMessage name="date" component="div" />
          <RichEditor onChange={data => handleEditorChange(data)} />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = { postJournal };

export default connect(mapStateToProps, mapDispatchToProps)(AddJournal);
