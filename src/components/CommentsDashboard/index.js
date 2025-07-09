
// import React, { useState, useEffect } from "react";
// import Header from "../Header";
// import { FaSearch } from "react-icons/fa";
// import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
// import "./index.css"

// const PAGE_SIZES = [10, 50, 100];
// const SORT_CYCLE = ["none", "asc", "desc"];
// const SORTABLE_FIELDS = ["postId", "name", "email"];

// function CommentsDashboard() {
//   const [allComments, setAllComments] = useState([]);
//   const [filteredComments, setFilteredComments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
//   const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("currentPage")) || 1);
//   const [pageSize, setPageSize] = useState(Number(localStorage.getItem("pageSize")) || 10);
//   const [sortConfig, setSortConfig] = useState(
//     JSON.parse(localStorage.getItem("sortConfig")) || { field: "", order: "none" }
//   );

//   // Fetch data
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/comments")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllComments(data);
//       });
//   }, []);

//   // Filter, Sort, Save State
//   useEffect(() => {
//     let filtered = [...allComments];

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.body.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (sortConfig.field && sortConfig.order !== "none") {
//       filtered.sort((a, b) => {
//         const valA = a[sortConfig.field].toString().toLowerCase();
//         const valB = b[sortConfig.field].toString().toLowerCase();
//         if (valA < valB) return sortConfig.order === "asc" ? -1 : 1;
//         if (valA > valB) return sortConfig.order === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredComments(filtered);

//     // Save state
//     localStorage.setItem("searchTerm", searchTerm);
//     localStorage.setItem("currentPage", currentPage);
//     localStorage.setItem("pageSize", pageSize);
//     localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
//   }, [allComments, searchTerm, sortConfig, currentPage, pageSize]);

//   const handleSort = (field) => {
//     setSortConfig((prev) => {
//       const nextOrder =
//         prev.field === field
//           ? SORT_CYCLE[(SORT_CYCLE.indexOf(prev.order) + 1) % SORT_CYCLE.length]
//           : "asc";
//       return { field, order: nextOrder };
//     });
//   };

//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const totalItems = filteredComments.length;
//   const totalPages = Math.ceil(totalItems / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = filteredComments.slice(startIndex, startIndex + pageSize);

//   const startItemNum = totalItems === 0 ? 0 : startIndex + 1;
//   const endItemNum = Math.min(startIndex + pageSize, totalItems);

//   return (
//     <div>
//       <Header />
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <ul className="flex gap-4 font-semibold">
//             {SORTABLE_FIELDS.map((field) => (
//               <li
//                 key={field}
//                 className="cursor-pointer hover:underline"
//                 onClick={() => handleSort(field)}
//               >
//                 Sort {field} ({sortConfig.field === field ? sortConfig.order : "none"})
//               </li>
//             ))}
//           </ul>
//           <div className="flex items-center border px-2 rounded">
//             <FaSearch className="mr-2" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search name, email, comment"
//               className="outline-none"
//             />
//           </div>
//         </div>

//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Post ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Comment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((comment) => (
//               <tr key={comment.id}>
//                 <td className="border p-2">{comment.postId}</td>
//                 <td className="border p-2">{comment.name}</td>
//                 <td className="border p-2">{comment.email}</td>
//                 <td className="border p-2">{comment.body}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-between items-center mt-4">
//           <p>
//             {startItemNum} - {endItemNum} of {totalItems} Items
//           </p>
//           <div className="flex items-center gap-2">
//             <RiArrowLeftSLine
//               className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//             />

//             {/* Dynamic Pagination Buttons */}
//             {(() => {
//               let pageButtons = [];

//               if (totalPages <= 1) return null;

//               if (currentPage === 1) {
//                 pageButtons = [1, 2].filter((n) => n <= totalPages);
//               } else if (currentPage === totalPages) {
//                 pageButtons = [totalPages - 1, totalPages].filter((n) => n >= 1);
//               } else {
//                 pageButtons = [currentPage - 1, currentPage, currentPage + 1];
//               }

//               return pageButtons.map((pageNum) => (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-2 py-1 border rounded ${
//                     currentPage === pageNum ? "bg-blue-500 text-white" : ""
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               ));
//             })()}

//             <RiArrowRightSLine
//               className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
//             />
//             <select value={pageSize} onChange={handlePageSizeChange} className="border p-1 rounded">
//               {PAGE_SIZES.map((size) => (
//                 <option key={size} value={size}>
//                   {size} / Page
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommentsDashboard;



import React, { useState, useEffect } from "react";
import Header from "../Header";
import { FaSearch } from "react-icons/fa";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Spinner from "../Spinner"; // adjust the path if needed
import "./index.css";

const PAGE_SIZES = [10, 50, 100];
const SORT_CYCLE = ["none", "asc", "desc"];
const SORTABLE_FIELDS = ["postId", "name", "email"];

function CommentsDashboard() {
  const [allComments, setAllComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("currentPage")) || 1);
  const [pageSize, setPageSize] = useState(Number(localStorage.getItem("pageSize")) || 10);
  const [sortConfig, setSortConfig] = useState(
    JSON.parse(localStorage.getItem("sortConfig")) || { field: "", order: "none" }
  );
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setAllComments(data);
        setLoading(false);
      });
  }, []);

  // Filter, Sort, Save State
  useEffect(() => {
    let filtered = [...allComments];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.field && sortConfig.order !== "none") {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.field].toString().toLowerCase();
        const valB = b[sortConfig.field].toString().toLowerCase();
        if (valA < valB) return sortConfig.order === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredComments(filtered);

    // Save state
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [allComments, searchTerm, sortConfig, currentPage, pageSize]);

  const handleSort = (field) => {
    setSortConfig((prev) => {
      const nextOrder =
        prev.field === field
          ? SORT_CYCLE[(SORT_CYCLE.indexOf(prev.order) + 1) % SORT_CYCLE.length]
          : "asc";
      return { field, order: nextOrder };
    });
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalItems = filteredComments.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredComments.slice(startIndex, startIndex + pageSize);
  const startItemNum = totalItems === 0 ? 0 : startIndex + 1;
  const endItemNum = Math.min(startIndex + pageSize, totalItems);

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-top">
          <ul className="sort-list">
            {SORTABLE_FIELDS.map((field) => (
              <li
                key={field}
                className="sort-item"
                onClick={() => handleSort(field)}
              >
                Sort {field} ({sortConfig.field === field ? sortConfig.order : "none"})
              </li>
            ))}
          </ul>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search name, email, comment"
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <Spinner />
          ) : (
            <table className="comments-table">
              <thead>
                <tr>
                  <th>Post ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.postId}</td>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && (
          <div className="pagination-bar">
            <p>
              {startItemNum} - {endItemNum} of {totalItems} Items
            </p>
            <div className="pagination-controls">
              <button
                className={`arrow-button ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              >
                <RiArrowLeftSLine />
              </button>

              {/* Dynamic Pagination Buttons */}
              {(() => {
                let pageButtons = [];

                if (totalPages <= 1) return null;

                if (currentPage === 1) {
                  pageButtons = [1, 2].filter((n) => n <= totalPages);
                } else if (currentPage === totalPages) {
                  pageButtons = [totalPages - 1, totalPages].filter((n) => n >= 1);
                } else {
                  pageButtons = [currentPage - 1, currentPage, currentPage + 1];
                }

                return pageButtons.map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`page-button ${currentPage === pageNum ? "current" : ""}`}
                  >
                    {pageNum}
                  </button>
                ));
              })()}

              <button
                className={`arrow-button ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              >
                <RiArrowRightSLine />
              </button>

              <select value={pageSize} onChange={handlePageSizeChange} className="page-size-select">
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size} / Page
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsDashboard;
