import React, { useEffect } from "react";
import Journals from "../components/Journals";
import { connect } from "react-redux";
import { loadJournal, postJournal, deleteJournal } from "../actions";
import AddJournalPage from "./AddJournalPage";

export const JournalsPage = props => {
  const { loadJournal } = props;
  useEffect(() => {
    loadJournal();
  }, [loadJournal]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 offset-2">
          <AddJournalPage />
          <Journals
            journals={props.journal}
            handleEdit={props.postJournal}
            handleDelete={props.deleteJournal}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { journal },
  } = state;

  return {
    journal,
  };
};
const mapDispatchToProps = { loadJournal, postJournal, deleteJournal };

export default connect(mapStateToProps, mapDispatchToProps)(JournalsPage);
