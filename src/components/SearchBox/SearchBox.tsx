import {ChangeEvent, FC, JSX} from 'react';
import {Box, TextField} from "@mui/material";

interface SearchBoxProps {
  handlerSearch: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({handlerSearch}):JSX.Element => {
  const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    handlerSearch(event.target.value)
  }

  return (
    <Box sx={{mt:2, p:1, width: '100%', display: 'block'}}>
      <TextField sx={{width: '100%'}} label="Поиск" placeholder="Введите название заметки..." onChange={onSearch}/>
    </Box>
  );
};

export default SearchBox;