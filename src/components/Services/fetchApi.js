import axios from 'axios';

const API_KEY = "32800349-9138a81e452acda0408289a03";

const fetchApi = async (search, page) => {
  return await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default fetchApi;
