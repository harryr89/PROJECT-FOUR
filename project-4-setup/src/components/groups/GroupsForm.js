import React from 'react';

import Select from 'react-select';

//import BackButton from '../utility/BackButton';

const GroupsForm = ({ handleSubmit, handleChange, group, selectedOptions, handleUser}) => {
  //const usersForSelect = members.map(member => ({ value: member.id, label: member.username }));

  return (
    <div className="row">

      { group && <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="name"> Name </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={group.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme"> Theme </label>
          <input
            type="text"
            className="form-control"
            id="theme"
            name="theme"
            onChange={handleChange}
            value={group.theme}
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination"> Destination </label>
          <input
            type="text"
            className="form-control"
            id="destination"
            name="destination"
            onChange={handleChange}
            value={group.destination}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date"> Date </label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            onChange={handleChange}
            value={group.date}
          />
        </div>

        <div>
          <button className="save-button">Save</button>
        </div>

        <div className="form-group">
          <Select
            multi={true}
            name="form-field-name"
            value={selectedOptions}
            onChange={handleUser}
          />
        </div>
      </form> }
    </div>
  );
};

export default GroupsForm;
