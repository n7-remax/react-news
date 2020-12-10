import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const NewsSelector = (props) => {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="category-native-simple">Category</InputLabel>
        <Select
          native
          value={props.category}
          onChange={props.selectCategoryHandler}
          inputProps={{
            name: "Category",
            id: "category-native-simple",
          }}
        >
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
        </Select>
      </FormControl>
    </>
  );
};

export default NewsSelector;
