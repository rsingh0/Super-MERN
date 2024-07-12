import React, { useState } from "react";
import BackButton from "../components/other/BackButton";
import Spinner from "../components/other/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK_MUTATION, FETCH_BOOKS_QUERY } from "../queries/Home";

const CreateBook = () => {
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    publishYear: 0,
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK_MUTATION, {
    refetchQueries: [{ query: FETCH_BOOKS_QUERY }],
  });

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
      const result = await createBook({ variables: { input: bookForm } });
      console.log("Book Created", result);
      if (
        result &&
        result.data &&
        result.data.createBook &&
        result.data.createBook.id
      ) {
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Error", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Book</h1>
        {loading ? <Spinner /> : ""}
        {error && <div>An error happened. Please Check console</div>}
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
            Add Book
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBook;
