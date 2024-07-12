import React from "react";
import BackButton from "../components/other/BackButton";
import Spinner from "../components/other/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK_MUTATION, FETCH_BOOKS_QUERY } from "../queries/Home";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK_MUTATION, {
    refetchQueries: [{ query: FETCH_BOOKS_QUERY }],
  });

  const handleDeleteBook = async () => {
    try {
      const result = await deleteBook({ variables: { deleteBookId: id } });
      console.log("Book Deleted", result);

      if (result && result.data && result.data.deleteBook) {
        enqueueSnackbar(result.data.deleteBook, { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Error Occured while deleting book", {
          variant: "error",
        });
        console.log(error);
      }
    } catch (err) {
      enqueueSnackbar("Error Occured while deleting book", {
        variant: "error",
      });
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      {error &&
        enqueueSnackbar("Error Occured while deleting book", {
          variant: "error",
        })}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
