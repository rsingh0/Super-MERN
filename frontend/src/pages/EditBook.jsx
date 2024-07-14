import React, { useState, useEffect } from "react";
import BackButton from "../components/other/BackButton";
import Spinner from "../components/other/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_BOOK_MUTATION,
  FETCH_BOOK_BY_ID_QUERY,
  FETCH_BOOKS_QUERY,
} from "../queries/Home";

const EditBook = () => {
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    publishYear: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, data, error } = useQuery(FETCH_BOOK_BY_ID_QUERY, {
    variables: { bookId: id },
  });
  const [updateBook, { loading: updatingBook }] = useMutation(
    UPDATE_BOOK_MUTATION,
    {
      refetchQueries: [{ query: FETCH_BOOKS_QUERY }],
    }
  );

  useEffect(() => {
    if (data && data.getBook) {
      const { getBook: book = {} } = data;
      const { title = "", author = "", publishYear = 0 } = book;

      // Doesn't work directly becaue data could be changing frequently depending on useQuery
      //   setBookForm(...book);
      setBookForm({ title, author, publishYear });
    }
  }, [data]);

  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookForm({
      ...bookForm,
      [name]: name === "publishYear"? parseInt(value): value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Book Submitted", bookForm);

    // Form Submit Logic
    try {
      const result = await updateBook({
        variables: { updateBookId: id, book: bookForm },
      });
      console.log("Book Updated", result);
      if (
        result &&
        result.data &&
        result.data.updateBook &&
        result.data.updateBook.id
      ) {
        enqueueSnackbar("Book Updated successfully", { variant: "success" });
        navigate("/home");
      } else {
        enqueueSnackbar("Error while updating book", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error while updating book", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Update Book</h1>
        {loading || updatingBook ? <Spinner /> : ""}
        {error ?
          enqueueSnackbar(`Error while loading book ${id}`, {
            variant: "error",
          }): ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={bookForm.title}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              name="author"
              value={bookForm.author}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              name="publishYear"
              value={bookForm.publishYear}
              onKeyUp={handleKeyPress}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" type="submit">
            {" "}
            Update Book
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBook;
