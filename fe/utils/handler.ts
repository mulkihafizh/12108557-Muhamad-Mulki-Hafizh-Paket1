export const getKategori = async () => {
  const { data: kategori } = await useFetch(
    "http://localhost:5000/api/category"
  );
  return kategori.value;
};

export const getBooks = async () => {
  const { data: books } = await useFetch("http://localhost:5000/api/book", {
    credentials: "include",
    headers: {
      cookie: `token=${useCookie("token").value}`,
    },
  });
  return books.value;
};
