import fetch from "unfetch";

const getData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data || []);

export default getData;
