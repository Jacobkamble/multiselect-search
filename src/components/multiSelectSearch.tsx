import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Chip from "./chip";
import SuggestionList from "./suggestionList";

export interface SuggestionsType {
  id: number;
  title: string;
  thumbnail: string;
}

const URL = `https://dummyjson.com/products/search?q=`;

const MultiSelectDropdown: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<
    SuggestionsType[]
  >([]);
  const [selectedSuggestionSet, setSelectedSuggestionSet] = useState(new Set());

  useEffect(() => {
    fetchSuggestion(URL);
  }, [searchTerm]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const fetchSuggestion = async (url: string) => {
    if (searchTerm) {
      try {
        setIsLoading(true);
        const res = await fetch(`${url + searchTerm}`);

        const json = await res.json();

        setSuggestions(json.products);
        setIsLoading(false);
      } catch (error) {
        console.log("error");
      }
    }
  };

  const selectSuggestion = useCallback(
    (suggestion: SuggestionsType) => {
      const updated = [...selectedSuggestion, suggestion];
      setSelectedSuggestion(updated);

      setSelectedSuggestionSet(
        new Set([...selectedSuggestionSet, suggestion.id])
      );
      setSearchTerm("");
      setSuggestions([]);
    },
    [searchTerm]
  );

  const removeSuggestion = (id: number) => {
    const updatedSuggestions = selectedSuggestion.filter(s => s.id !== id);
    setSelectedSuggestion(updatedSuggestions);
    setSelectedSuggestionSet(new Set(updatedSuggestions.map(s => s.id)));
  };

  return (
    <>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedSuggestion?.map(({id,title,thumbnail}) => {
          return (
            <Chip
              key={id}
              text={title}
              image={thumbnail}
              handleClose={() => removeSuggestion(id)}
            />
          );
        })}
      </div>

      <ul>
        {!isLoading &&
          suggestions?.map(({ id, title, thumbnail }) => {
            return !selectedSuggestionSet.has(id) ? (
              <SuggestionList
                key={id}
                title={title}
                thumbnail={thumbnail}
                selectSuggestion={() =>
                  selectSuggestion({ id, title, thumbnail })
                }
              />
            ) : (
              ""
            );
          })}

        {isLoading && <h4>Loading...</h4>}
      </ul>
    </>
  );
};

export default MultiSelectDropdown;
