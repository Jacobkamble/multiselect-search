import React from "react";

interface SuggestionListProp {
  title: string;
  thumbnail: string;
  selectSuggestion: () => void;
}

const SuggestionList: React.FC<SuggestionListProp> = ({
  title,
  thumbnail,
  selectSuggestion,
}) => {
  return (
    <>
      <li onClick={selectSuggestion}>
        <div className="suggestionBox">
          <img width={"30px"} src={thumbnail} alt={title} /> {title}
        </div>{" "}
      </li>
    </>
  );
};

export default SuggestionList;
