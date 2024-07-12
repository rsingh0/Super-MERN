import { useParams } from "react-router-dom";
import BackButton from "../components/other/BackButton";
import Spinner from "../components/other/Spinner";
import { useQuery } from "@apollo/client";
import { FETCH_BOOK_BY_ID_QUERY } from "../queries/Home";

const ShowBook = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(FETCH_BOOK_BY_ID_QUERY, {
    variables: { bookId: id },
  });

  if (data) {
    const { getBook: book = {} } = data;
    return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <BackButton />
      <Spinner />
    </div>
  );
};

export default ShowBook;
