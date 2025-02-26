import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-spacing-2 border-collapse">
      <thead>
        <tr className="border border-slate-600 rounded-md">
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publish Year</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books &&
          books.map((book, index) => (
            <tr key={book.id} className="h-8">
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{book.title}</td>
              <td className="text-center max-md:hidden">{book.author}</td>
              <td className="text-center max-md:hidden">{book.publishYear}</td>
              <td className=" text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book.id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book.id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book.id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
