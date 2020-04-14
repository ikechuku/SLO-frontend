import React from 'react';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

export default function CustomSelect(props) {
  return (
    <Select2
      name={props.name}
      className="form-control"
      multiple={false}
      data={props.optionList}
      // onOpen={() => console.log('onOpen')}
      // onClose={() => console.log('onClose')}
      // onSelect={() => console.log('onSelect')}
      onChange={props.handleChange}
      defaultValue={props.defaultValue}
      value={props.value}
      // onUnselect={() => console.log('onUnselect')}
      options={{
        placeholder: `${props.placeHolder}`,
        tags: true
      }}
    />
  )
}
