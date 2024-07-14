import Spinner from "../components/other/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import { useQuery } from "@apollo/client";
import { FETCH_BOOKS_QUERY } from "../queries/Home";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { loading, data } = useQuery(FETCH_BOOKS_QUERY);
  console.log("All Books", JSON.stringify(data));

  const { user } = useContext(AuthContext);

  if (data) {
    const { getBooks: books = [] } = data;
    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">
            Books List For {user ? user.username : "Jane Doe"}
          </h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? <Spinner /> : <BooksTable books={books} />}
      </div>
    );
  }

  return <Spinner />;
};

export default Home;
