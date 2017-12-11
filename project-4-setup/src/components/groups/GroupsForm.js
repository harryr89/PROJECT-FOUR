import React from 'react';

import Select from 'react-select';

//import BackButton from '../utility/BackButton';

function GroupsForm({ handleSubmit, handleChange, group, handleUser, members, selectedOptions }) {
  //const usersForSelect = members.map(member => ({ value: member.id, label: member.username }));
  console.log(members);
  return (
    <div className="row">

      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"


            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"

            onChange={handleChange}
          >
            <option value="" disabled>Please Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
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
      </form>
    </div>
  );
}

export default GroupsForm;
