import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Combobox } from "@headlessui/react";

const ComboBox = (props) => {
  const { onChange, options, value } = props;
  const selectedOptions = options.find((option) => option.id === value) || [];

  const _onChange = (selected) => {
    onChange(selected.id);
  };

  return (
    <div className="combo-box">
      <Combobox by="id" onChange={_onChange} value={selectedOptions}>
        <Combobox.Input />
        <Combobox.Button as={Fragment}>
          {() => (
            <button className="combo-box__button" type="button">
              🔽
            </button>
          )}
        </Combobox.Button>
        <Combobox.Options as={Fragment}>
          {() => (
            <ul className="combo-box__options">
              {options.map(({ unavailable, irremovable, name }) => (
                <Combobox.Option as={Fragment} key={name} value={props}>
                  {({ active, selected }) => (
                    <li
                      className={[
                        "combo-box__option",
                        active ? "combo-box__option--active" : "",
                        selected ? "combo-box__option--selected" : "",
                      ].join(" ")}
                    >
                      {name}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </ul>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

ComboBox.defaultProps = {};

ComboBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default ComboBox;
