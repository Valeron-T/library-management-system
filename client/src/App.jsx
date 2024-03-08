import './App.css'
import Sidebar, { SidebarItem } from './components/Navbar'
import { FaUsers, FaBook, FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdAnalytics } from "react-icons/md";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Members from './pages/Members';
import MemberForm from './pages/MemberForm';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import ImportForm from './pages/ImportForm';
import Import from './pages/Import';
import Transactions from './pages/Transactions';
import TransactionForm from './pages/TransactionForm';
import IssueBookForm from './pages/IssueBookForm';
import Reports from './pages/Reports';

function App() {

  return (
    <>
      <div className='flex flex-col sm:flex-row'>

        {/* Navbar */}
        <Sidebar>
          <NavLink to={"/"}>
            {({ isActive }) => (<SidebarItem icon={<FaHome />} text={"Home"} active={isActive} />)}
          </NavLink>

          <NavLink to={"/books"}>
            {({ isActive }) => (<SidebarItem icon={<FaBook />} text={"Books"} active={isActive} />)}
          </NavLink>

          <NavLink to={"/members"}>
            {({ isActive }) => (<SidebarItem icon={<FaUsers />} text={"Members"} active={isActive} />)}
          </NavLink>

          <NavLink to={"/transactions"}>
            {({ isActive }) => (<SidebarItem icon={<GrTransaction />} text={"Transactions"} active={isActive} />)}
          </NavLink>

          <NavLink to={"/reports"}>
            {({ isActive }) => (<SidebarItem icon={<MdAnalytics />} text={"Reports"} active={isActive} />)}
          </NavLink>

        </Sidebar>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/members/:id" element={<MemberForm operationToPerform="Update" />} />
          <Route path="/members/:id/details" element={<MemberForm operationToPerform="Details of" view={true} />} />
          <Route path="/members/new" element={<MemberForm operationToPerform="Create" />} />
          <Route path="/members" element={<Members />} />
          <Route path="/books/:id/details" element={<BookForm operationToPerform="Details of" view={true} />} />
          <Route path="/books/:id" element={<BookForm operationToPerform="Update" />} />
          <Route path="/books/new" element={<BookForm operationToPerform="Create" />} />
          <Route path="/books/search" element={<ImportForm operationToPerform="Search" />} />
          <Route path="/books/import" element={<Import />} />
          <Route path="/books" element={<Books />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<IssueBookForm operationToPerform={"Issue"} />} />
          <Route path="/transactions/:id/return" element={<TransactionForm operationToPerform={"Return"} />} />
        </Routes>

      </div>


    </>
  )
}

export default App
