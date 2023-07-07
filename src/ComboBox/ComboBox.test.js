import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ComboBox from "./ComboBox";

const options = [
  { id: "1", name: "Antelope" },
  { id: "2", name: "Barnacle" },
  { id: "3", name: "Caterpillar" },
  { id: "4", name: "Dimorphodon" },
  { id: "5", name: "Echidna" },
  { id: "6", name: "Frilled-neck Lizard" },
];

const TestComboBox = ({ value }) => {
  const [_value, setValue] = useState(value);
  const onChange = (newValue) => setValue(newValue);

  return <ComboBox {...{ options, onChange }} value={_value} />;
};

describe(`<ComboBox onChange={() => {}} options={[...]} value="..." />`, () => {
  it(`sets active options as "active"`, async () => {
    const user = userEvent.setup();
    render(<TestComboBox value="1" />);

    // open the dropdown
    await user.click(screen.getByRole("button"));
    await user.hover(screen.getAllByRole("option")[3]);

    // the active option should have the active class
    expect(screen.getAllByRole("option")[3]).toHaveClass(
      "combo-box__option--active"
    );

    // only one option should be active
    expect(document.querySelectorAll(".combo-box__option--active").length).toBe(
      1
    );
  });
});
