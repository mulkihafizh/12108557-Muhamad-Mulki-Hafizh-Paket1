export const getCategory = async () => {
  const { data: kategori } = await useFetch(
    "http://localhost:5000/api/category"
  );
  return kategori.value;
};

export const logout = async () => {
  const { data: user } = await useFetch("http://localhost:5000/api/user/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      cookie: `token=${useCookie("token").value}`,
    },
  });

  return user.value;
};

export const getLending = async () => {
  const { data: lending } = await useFetch(
    "http://localhost:5000/api/lending",
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  return lending.value;
};

export const getBookById = async (id: string) => {
  const { data: book } = await useFetch(
    `http://localhost:5000/api/book/${id}`,
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (book.value === null) {
    throw createError({
      statusCode: 404,
      message: "Buku tidak ditemukan",
    });
  }
  return book.value;
};

export const getCategoryById = async (id: string) => {
  const { data: category } = await useFetch(
    `http://localhost:5000/api/category/${id}`,
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (category.value === null) {
    throw createError({
      statusCode: 404,
      message: "Kategori tidak ditemukan",
    });
  }
  return category.value;
};

export const getUserById = async (id: string) => {
  const { data: user } = await useFetch(
    `http://localhost:5000/api/user/${id}`,
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (user.value === null) {
    throw createError({
      statusCode: 404,
      message: "User tidak ditemukan",
    });
  }
  return user.value;
};

export const deleteBook = async (id: string) => {
  const { data: book } = await useFetch(
    `http://localhost:5000/api/book/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (book.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return book.value;
};

export const deleteCategory = async (id: string) => {
  const { data: category } = await useFetch(
    `http://localhost:5000/api/category/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (category.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return category.value;
};

export const deleteLending = async (id: string) => {
  const { data: lending } = await useFetch(
    `http://localhost:5000/api/lending/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (lending.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return lending.value;
};

export const getUsers = async () => {
  const { data: users } = await useFetch("http://localhost:5000/api/user", {
    credentials: "include",
    headers: {
      cookie: `token=${useCookie("token").value}`,
    },
  });
  if (users.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return users.value;
};

export const getBooks = async () => {
  const { data: books } = await useFetch("http://localhost:5000/api/book", {
    credentials: "include",
    headers: {
      cookie: `token=${useCookie("token").value}`,
    },
  });
  if (books.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return books.value;
};

export const getUserLending = async () => {
  const { data: userLending } = await useFetch(
    "http://localhost:5000/api/lending/user",
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );
  if (userLending.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return userLending.value;
};

export const getCollections = async () => {
  const { data: collections } = await useFetch(
    "http://localhost:5000/api/collection",
    {
      credentials: "include",
      headers: {
        cookie: `token=${useCookie("token").value}`,
      },
    }
  );

  if (collections.value == null) {
    logout();
    throw createError({
      statusCode: 403,
      message: "Harap Login Kembali!",
    });
  }
  return collections.value;
};
